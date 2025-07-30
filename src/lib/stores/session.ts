// src/lib/stores/session.ts
import { dataset } from '$lib/ldoSvelte'
import { getDefaultSession } from '@inrupt/solid-client-authn-browser'
import { readable } from 'svelte/store'

export const session = readable(getDefaultSession(), (set) => {
  const solidSession = getDefaultSession()

  // Just update the store when session state changes
  const updateStore = () => {
    set(solidSession) // Same object, updated internal state
    dataset.setContext('solid', { fetch: solidSession.fetch })
  }

  // Initial value
  updateStore()

  // Listen to state changes
  solidSession.events.addListener('login', updateStore)
  solidSession.events.addListener('logout', updateStore)
  solidSession.events.addListener('sessionRestore', updateStore)
  solidSession.events.addListener('sessionExtended', updateStore)
  solidSession.events.addListener('sessionExpired', updateStore)
  solidSession.events.addListener('newTokens', updateStore)

  // Cleanup
  return () => {
    solidSession.events.removeListener('login', updateStore)
    solidSession.events.removeListener('logout', updateStore)
    solidSession.events.removeListener('sessionRestore', updateStore)
    solidSession.events.removeListener('sessionExtended', updateStore)
    solidSession.events.removeListener('sessionExpired', updateStore)
    solidSession.events.removeListener('newTokens', updateStore)
  }
})
