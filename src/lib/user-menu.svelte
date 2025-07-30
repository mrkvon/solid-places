<script lang="ts">
  import { session } from '$lib/stores/session'
  import { logout } from '@inrupt/solid-client-authn-browser'
  import { createDropdownMenu } from '@melt-ui/svelte'
  import { FoafProfileShapeType } from '../.ldo/foafProfile.shapeTypes'
  import { dataset, useResource, useSubject } from './ldoSvelte'

  const {
    elements: { menu, item, trigger },
  } = createDropdownMenu()

  const signOut = async () => {
    await logout()
    globalThis.location.href = '/'
  }

  $: dataset.setContext('solid', { fetch: $session.fetch })

  const resource = useResource($session.info.webId)
  const profile = useSubject(FoafProfileShapeType, $session.info.webId)

  $: name = $profile?.name
</script>

<button {...$trigger} use:trigger>{name}</button>
<div {...$menu} use:menu class="menu">
  <div {...$item} use:item>{name}</div>
  <div {...$item} use:item on:m-click={signOut}>Sign out</div>
</div>

<style>
  .menu {
    z-index: 1000;
    background-color: white;
    width: 100%;
    position: absolute;
    /* top: 0 !important; */
    left: 0 !important;
    border: 5px solid green;
    box-sizing: border-box;
  }
</style>
