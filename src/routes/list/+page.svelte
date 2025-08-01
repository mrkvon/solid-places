<script lang="ts">
  import PlaceItem from '$lib/components/place-item.svelte'
  import { useMatchSubject } from '$lib/ldoSvelte'
  import { placeResources } from '$lib/stores/places'
  import { rdf, schema_https } from 'rdf-namespaces'
  import { PlaceShapeType } from '../../.ldo/place.shapeTypes'

  $: $placeResources

  let data = useMatchSubject(PlaceShapeType, rdf.type, schema_https.Place, null)
</script>

<ul>
  {#each $data as place}
    <li><PlaceItem {place} /></li>
  {/each}
</ul>
<!-- <ul>
  {#each $typedPlaces as place}
    <li>{place.name}</li>
  {/each}
</ul> -->
