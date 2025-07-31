<script lang="ts">
  import PlaceItem from '$lib/components/place-item.svelte'
  import { useMatchSubject } from '$lib/ldoSvelte'
  import { placeResources } from '$lib/stores/places'
  import { rdf, schema_https } from 'rdf-namespaces'
  import { PlaceShapeType } from '../../.ldo/place.shapeTypes'

  $: $placeResources

  // let places: (SolidContainer | SolidLeaf)[]

  // $: webId = $session.info.webId

  // const getPlaces = async (webId: string) => {
  //   const storages = await getStorageFromWebId(webId as SolidLeafUri, dataset)
  //   if (storages.isError) throw storages
  //   if (!storages.storageContainers[0]) throw new Error('no containers')

  //   const placesContainer = storages.storageContainers[0].child('places/')

  //   const resultPC = await placesContainer.readIfUnfetched()

  //   if (resultPC.isError) throw resultPC

  //   const places = placesContainer.children()
  //   const results = await Promise.all(places.map((p) => p.readIfUnfetched()))

  //   return places
  // }

  // $: {
  //   if (webId) {
  //     getPlaces(webId).then((p) => {
  //       places = p
  //     })
  //   }
  // }

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
