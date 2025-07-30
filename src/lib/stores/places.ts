// src/lib/stores/places.ts
import { dataset } from '$lib/ldoSvelte'
import { session } from '$lib/stores/session'
import {
  getStorageFromWebId,
  type SolidContainer,
  type SolidLeaf,
  type SolidLeafUri,
} from '@ldo/connected-solid'
import { derived } from 'svelte/store'

async function fetchPlaces(webId: string) {
  const storages = await getStorageFromWebId(webId as SolidLeafUri, dataset)
  if (storages.isError) throw storages
  if (!storages.storageContainers[0]) throw new Error('no containers')

  const placesContainer = storages.storageContainers[0].child('places/')
  const resultPC = await placesContainer.readIfUnfetched()
  if (resultPC.isError) throw resultPC

  const places = placesContainer.children()
  await Promise.all(places.map((p) => p.readIfUnfetched()))

  return places
}

// Reactive store that fetches places when webId changes
export const placeResources = derived(
  session,
  ($session, set) => {
    if (!$session.info.webId) {
      set([])
      return
    }

    fetchPlaces($session.info.webId)
      .then((places) => set(places))
      .catch((error) => {
        console.error('Error fetching places:', error)
        set([])
      })
  },
  [] as (SolidLeaf | SolidContainer)[], // initial value
)
