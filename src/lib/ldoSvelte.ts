import { solidConnectedPlugin } from '@ldo/connected-solid'
import { createLdoSvelteMethods } from '@ldo/svelte'

export const {
  dataset,
  useLdo,
  useMatchObject,
  useMatchSubject,
  useResource,
  useSubject,
  useSubscribeToResource,
  useLinkQuery,
} = createLdoSvelteMethods([solidConnectedPlugin])
