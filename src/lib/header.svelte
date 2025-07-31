<script lang="ts">
  import ProviderForm from '$lib/provider-form.svelte'
  import { session } from '$lib/stores/session'
  import {
    CircleUserRound,
    House,
    List,
    LoaderCircle,
    LogIn,
    Map,
    Plus,
    Upload,
  } from '@lucide/svelte'
  import { createDropdownMenu } from '@melt-ui/svelte'
  import { onMount } from 'svelte'
  import UserMenu from './user-menu.svelte'

  const signIn = async (provider: string) => {
    await $session.login({
      oidcIssuer: provider,
      redirectUrl: globalThis.location.href,
    })
  }

  let redirectHandled = $state(false)

  onMount(async () => {
    await $session.handleIncomingRedirect({ restorePreviousSession: true })
    redirectHandled = true
  })

  let dialog: HTMLDialogElement

  const openDialog = () => {
    dialog.showModal()
  }

  type TriggerType = ReturnType<typeof createDropdownMenu>['elements']['trigger']
</script>

<nav class="header">
  <a href="/" aria-label="Home" title="Home"><House aria-hidden="true" /></a>
  <a href="map" aria-label="Map" title="Map"><Map aria-hidden="true" /></a>
  <a href="list" aria-label="List" title="List"><List aria-hidden="true" /></a>
  <div class="spacer"></div>
  <a href="add" aria-label="Add Place" title="Add Place"><Plus aria-hidden="true" /></a>
  <a href="import" aria-label="Import from GPX" title="Import from GPX"
    ><Upload aria-hidden="true" /></a
  >
  {#if !redirectHandled}
    <button disabled class="loading">
      <LoaderCircle aria-hidden="true" class="spinning" />
    </button>
  {:else if $session.info.isLoggedIn}
    <UserMenu>
      {#snippet children({ trigger }: { trigger: TriggerType })}
        <button {...trigger} use:trigger aria-label="User Menu" title="User Menu">
          <CircleUserRound aria-hidden="true" />
        </button>
      {/snippet}
    </UserMenu>
  {:else}
    <button onclick={openDialog}><LogIn aria-label="sign in" aria-hidden="true" /></button>
  {/if}
</nav>
<dialog bind:this={dialog}>
  <ProviderForm onsave={(data) => signIn(data.provider)} />
</dialog>

<!-- <pre>{JSON.stringify($session, null, 2)}</pre> -->

<style lang="scss">
  .header {
    padding: 0.25rem;

    display: flex;
    gap: 0.25rem;

    a,
    .loading,
    button {
      padding: 0.5rem;
      border-radius: 0.25rem;

      &:hover {
        background-color: lightpink;
      }
    }

    .spacer {
      flex-grow: 1;
    }
  }

  :global(.spinning) {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  dialog {
    all: revert;
  }
</style>
