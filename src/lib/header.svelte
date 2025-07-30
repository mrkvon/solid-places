<script lang="ts">
  import ProviderForm from '$lib/provider-form.svelte'
  import { session } from '$lib/stores/session'
  import { handleIncomingRedirect, login } from '@inrupt/solid-client-authn-browser'
  import { onMount } from 'svelte'
  import UserMenu from './user-menu.svelte'

  const signIn = async (provider: string) => {
    await login({
      oidcIssuer: provider,
      redirectUrl: globalThis.location.href,
    })
  }

  onMount(async () => {
    await handleIncomingRedirect({ restorePreviousSession: true })
  })

  let dialog: HTMLDialogElement

  const openDialog = () => {
    dialog.showModal()
  }
</script>

<nav class="header">
  <a href="/">home</a>
  <a href="map">map</a>
  <a href="list">list</a>
  <a href="add">add</a>
  {#if !session}
    ...
  {:else if $session.info.isLoggedIn}
    <UserMenu />
  {:else}
    <button onclick={openDialog}>Sign in</button>
  {/if}
</nav>
<dialog bind:this={dialog}>
  <ProviderForm onsave={(data) => signIn(data.provider)} />
</dialog>
<pre>{JSON.stringify($session.info, null, 2)}</pre>

<style>
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>
