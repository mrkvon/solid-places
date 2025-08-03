<script lang="ts">
  import PlaceItemControl from '$lib/components/place-item-control.svelte'
  import PlaceItem from '$lib/components/place-item.svelte'
  import { useMatchSubject } from '$lib/ldoSvelte'
  import { placeResources } from '$lib/stores/places'
  import { rdf, schema_https } from 'rdf-namespaces'
  import { PlaceShapeType } from '../../.ldo/place.shapeTypes'

  $: $placeResources

  let data = useMatchSubject(PlaceShapeType, rdf.type, schema_https.Place, null)
</script>

<ul data-testid="place-list">
  {#each $data as place (place['@id'])}
    <li>
      <PlaceItem {place}>
        <PlaceItemControl {place} />
      </PlaceItem>
    </li>
  {/each}
</ul>
