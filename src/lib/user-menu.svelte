<script lang="ts">
  import { session } from '$lib/stores/session'
  import { logout } from '@inrupt/solid-client-authn-browser'
  import { LogOut } from '@lucide/svelte'
  import { createDropdownMenu } from '@melt-ui/svelte'
  import { FoafProfileShapeType } from '../.ldo/foafProfile.shapeTypes'
  import { useResource, useSubject } from './ldoSvelte'

  let { children } = $props()

  const {
    elements: { menu, item, trigger },
  } = createDropdownMenu()

  const signOut = async () => {
    await logout()
    globalThis.location.href = '/'
  }

  const resource = useResource($session.info.webId)
  const profile = useSubject(FoafProfileShapeType, $session.info.webId)

  const name = $derived($profile?.name)
</script>

{@render children({ trigger })}

<div {...$menu} use:menu class="menu" aria-label="User menu">
  <div {...$item} use:item>{name}</div>
  <div {...$item} use:item on:m-click={signOut}><LogOut aria-hidden="true" /> Sign out</div>
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
