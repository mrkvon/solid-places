<script lang="ts">
  import PlaceItem from '$lib/components/place-item.svelte'
  import { dataset, useMatchSubject } from '$lib/ldoSvelte'
  import { placeResources } from '$lib/stores/places'
  import { session } from '$lib/stores/session'
  import { deleteResource, SolidLeaf } from '@ldo/connected-solid'
  import { LockKeyhole, Pencil, Trash2 } from '@lucide/svelte'
  import { rdf, schema_https } from 'rdf-namespaces'
  import { PlaceShapeType } from '../../.ldo/place.shapeTypes'
  import type { Place } from '../../.ldo/place.typings'

  $: $placeResources

  let data = useMatchSubject(PlaceShapeType, rdf.type, schema_https.Place, null)

  const handleEdit = (place: Place) => {
    alert(`not implemented, editing ${place['@id']}`)
  }

  const handleDelete = async (place: Place) => {
    const result = globalThis.confirm(
      `Do you really want to delete place ${place.name} (${place['@id']})?`,
    )

    if (result) {
      const resource = dataset.getResource(place['@id']!)
      if (resource.isError) throw resource
      await deleteResource(resource as SolidLeaf, { fetch: $session.fetch, dataset })
    }
  }
</script>

<ul data-testid="place-list">
  {#each $data as place}
    <li>
      <PlaceItem {place}>
        <div class="controls">
          <button
            aria-label="Privacy and sharing: Private"
            onclick={() => {
              alert('privacy and sharing not implemented')
            }}
          >
            <LockKeyhole aria-disabled="true" />
          </button>
          <button aria-label="Edit place" onclick={() => handleEdit(place)}>
            <Pencil aria-disabled="true" />
          </button>
          <button aria-label="Delete place" onclick={() => handleDelete(place)}>
            <Trash2 aria-disabled="true" />
          </button>
        </div>
      </PlaceItem>
    </li>
  {/each}
</ul>

<style>
  .controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
