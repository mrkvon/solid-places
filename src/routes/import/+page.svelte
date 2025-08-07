<script lang="ts">
  import { goto } from '$app/navigation'
  import PlaceItem from '$lib/components/place-item.svelte'
  import { useLdo, useMatchSubject } from '$lib/ldoSvelte'
  import { placeResources } from '$lib/stores/places'
  import { storages } from '$lib/stores/storages'
  import { set } from '@ldo/ldo'
  import { gpx } from '@tmcw/togeojson'
  import { DOMParser } from '@xmldom/xmldom'
  import haversine from 'haversine-distance'
  import { rdf, schema_https } from 'rdf-namespaces'
  import { PlaceShapeType } from '../../.ldo/place.shapeTypes'
  import type { GeoCoordinates, Place } from '../../.ldo/place.typings'

  $placeResources

  let savedPlaces = useMatchSubject(PlaceShapeType, rdf.type, schema_https.Place, null)

  let text = $state('<gpx />')

  const dom = $derived(new DOMParser().parseFromString(text, 'application/xml'))
  const result = $derived(gpx(dom))
  const places = $derived(
    result.features.map(
      (feature) =>
        ({
          type: set({ '@id': 'Place' }),
          geo: {
            type: set({ '@id': 'GeoCoordinates' }),
            latitude:
              feature.geometry.type === 'Point' ? feature.geometry.coordinates[1] : -Infinity,
            longitude:
              feature.geometry.type === 'Point' ? feature.geometry.coordinates[0] : -Infinity,
          },
          name: feature.properties?.name as string,
          description: feature.properties?.desc as string,
          created: feature.properties?.time as string,
        }) satisfies Place,
    ),
  )
  const formData = $derived(
    new Map<Place, boolean>(
      places.map((place, j, places) => [
        place,
        !places.some((p, i) => i < j && p !== place && haversine(p.geo, place.geo) < 50) &&
          !$savedPlaces.some((p) => haversine(p.geo as GeoCoordinates, place.geo) < 50),
      ]),
    ),
  )

  const handleFileChange = async (
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) => {
    const file = event.currentTarget.files?.[0]

    if (file) {
      text = await file.text()
      // console.log('File content:', text)
    }
  }

  const { createData, commitData } = useLdo()

  const handleConfirmImport = async () => {
    for (const [place, isSelected] of formData) {
      if (isSelected && $storages.length > 0) {
        const storage = $storages[0]
        const childResult = await storage.createChildIfAbsent('places/')
        if (childResult.isError) throw childResult
        const placeResult = await childResult.resource.createChildIfAbsent(
          `place-${crypto.randomUUID()}.ttl`,
        )
        if (placeResult.isError) throw placeResult
        const placeData = createData(
          PlaceShapeType,
          placeResult.uri + '#place',
          placeResult.resource,
        )

        Object.assign(placeData, place)

        await commitData(placeData)
      }
    }
    goto('map')
  }
</script>

<header>Import from GPX</header>

<input type="file" accept=".gpx" onchange={handleFileChange} />

<form onsubmit={handleConfirmImport}>
  {#if places.length}
    <button type="submit">
      Import ({Array.from(formData.values()).filter((v) => v === true).length}/{places.length})
    </button>
  {/if}
  <ul>
    {#each places as place, j}
      {@const duplicateOf = places.find(
        (p, i) => i < j && p !== place && haversine(p.geo, place.geo) < 50,
      )}
      <li>
        <PlaceItem {place}>
          <div class="controls">
            {#if duplicateOf}duplicate of {duplicateOf.name}{/if}
            <input
              type="checkbox"
              bind:checked={() => formData.get(place), (v) => formData.set(place, Boolean(v))}
            />
          </div>
        </PlaceItem>
      </li>
    {/each}
  </ul>
</form>

<style>
  .controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  input {
    width: 100%;
  }
</style>
