import { dataset } from '$lib/ldoSvelte'
import { getStorageFromWebId, type SolidContainer, type SolidLeafUri } from '@ldo/connected-solid'
import { readable } from 'svelte/store'
import { session } from './session'

export const storages = readable<SolidContainer[]>([], (set) => {
  // Subscribe to the source store
  const unsubscribe = session.subscribe(async (session) => {
    if (!session.info.isLoggedIn) {
      set([])
      return
    }

    try {
      const result = await getStorageFromWebId(session.info.webId as SolidLeafUri, dataset)
      if (result.isError) throw result
      set(result.storageContainers)
    } catch (error) {
      console.error('Failed to get storage', error)
      set([])
    }
  })

  // Return cleanup function
  return unsubscribe
})
