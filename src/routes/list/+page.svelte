<script lang="ts">
  import PlaceItemControl from '$lib/components/place-item-control.svelte'
  import PlaceItem from '$lib/components/place-item.svelte'
  import { runPlacesQuery } from '$lib/data/places'
  import { useMatchSubject } from '$lib/ldoSvelte'
  import { session } from '$lib/stores/session'
  import { rdf, schema_https } from 'rdf-namespaces'
  import { PlaceShapeType } from '../../.ldo/place.shapeTypes'

  $effect(() => {
    if ($session.info.webId)
      runPlacesQuery($session.info.webId, $session.fetch).then(() => {
        console.log('query run and finished')
      })
  })

  const places = useMatchSubject(PlaceShapeType, rdf.type, schema_https.Place)
</script>

<ul data-testid="place-list">
  {#each $places as place (place['@id'])}
    <li>
      <PlaceItem {place}>
        <PlaceItemControl {place} />
      </PlaceItem>
    </li>
  {/each}
</ul>
