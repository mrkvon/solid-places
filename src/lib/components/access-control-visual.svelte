<script lang="ts">
  import type { WacRule } from '@ldo/connected-solid'
  import { Earth, LoaderCircle, LockKeyhole, UsersRound, X } from '@lucide/svelte'
  import { createDialog } from '@melt-ui/svelte'
  import SelectPeople from './select-people.svelte'

  let {
    wac, // wac of the resource in LDO format
    onchangewac, // run when access control is updating
    self, // signed in user webId
  }: { wac?: WacRule; onchangewac: (wac?: WacRule) => Promise<void>; self: string } = $props()

  const {
    elements: { trigger, portalled, overlay, content, title, description, close },
    states: { open },
  } = createDialog()

  enum VisibilityOption {
    private = 'private',
    shared = 'shared',
    public = 'public',
  }

  let visibility: VisibilityOption | undefined = $derived(
    !wac
      ? undefined
      : wac.public.read
        ? VisibilityOption.public
        : Object.entries(wac.agent).some(([webId, rule]) => webId !== self && rule.read)
          ? VisibilityOption.shared
          : VisibilityOption.private,
  )

  const visibilityFormData = $state<{ visibility?: VisibilityOption; selected: string[] }>({
    visibility: undefined,
    selected: [],
  })

  $effect(() => {
    visibilityFormData.visibility = visibility
  })

  let isOwner = $derived(Boolean(wac?.agent[self].control))

  $effect(() => {
    if (!wac) return
    const sharedWith = Object.entries(wac.agent)
      .filter(([webId, rules]) => webId !== self && rules.read === true)
      .map(([webId]) => webId)

    visibilityFormData.selected = sharedWith
  })

  const handleUpdateVisibility = async (e: SubmitEvent) => {
    e.preventDefault()

    if (!wac) throw new Error()
    let updatedWac: WacRule | undefined = JSON.parse(JSON.stringify(wac))

    if (visibilityFormData.visibility === VisibilityOption.public) {
      updatedWac!.public.read = true
    } else if (
      visibilityFormData.visibility === VisibilityOption.shared &&
      visibilityFormData.selected.length > 0
    ) {
      updatedWac!.public.read = false
      for (let webId in updatedWac!.agent) {
        if (webId !== self) {
          updatedWac!.agent[webId].read = false
        }
      }
      visibilityFormData.selected.forEach((webId) => {
        updatedWac!.agent[webId] ??= { read: false, append: false, write: false, control: false }
        updatedWac!.agent[webId].read = true
      })
    } else {
      updatedWac = undefined
    }

    await onchangewac(updatedWac)

    // close the modal
    $open = false
  }
</script>

{#if wac}
  <button aria-label={`Privacy and sharing: ${visibility}`} {...$trigger} use:trigger>
    {#if visibility === VisibilityOption.private}
      <LockKeyhole aria-hidden="true" color={isOwner ? 'green' : 'black'} />
    {:else if visibility === VisibilityOption.shared}
      <UsersRound aria-hidden="true" color={isOwner ? 'green' : 'black'} />
    {:else if visibility === VisibilityOption.public}
      <Earth aria-hidden="true" color={isOwner ? 'green' : 'black'} />
    {/if}
  </button>
{:else}<LoaderCircle />
{/if}

{#if $open}
  <div {...$portalled} use:portalled>
    <div class="overlay" {...$overlay} use:overlay></div>
    <div class="content" {...$content} use:content>
      <h2 class="title" {...$title} use:title>Visibility</h2>
      <p {...$description} use:description></p>
      <form onsubmit={handleUpdateVisibility}>
        <div class="option">
          <input
            type="radio"
            name="visibility"
            value={VisibilityOption.private}
            id="private"
            bind:group={visibilityFormData.visibility}
          /><label for="private" aria-label="Private"><LockKeyhole aria-hidden="true" /></label>
        </div>
        <div class="option">
          <input
            type="radio"
            name="visibility"
            value={VisibilityOption.shared}
            id="shared"
            aria-label="Shared"
            bind:group={visibilityFormData.visibility}
          /><label for="shared" aria-label="Shared"><UsersRound aria-hidden="true" /></label>
          {#if visibilityFormData.visibility === VisibilityOption.shared}
            <SelectPeople
              bind:value={visibilityFormData.selected}
              disabled={visibilityFormData.visibility !== VisibilityOption.shared}
            />
          {/if}
        </div>
        <div class="option">
          <input
            type="radio"
            name="visibility"
            value={VisibilityOption.public}
            id="public"
            aria-label="Public"
            bind:group={visibilityFormData.visibility}
          /><label for="public" aria-label="Public"><Earth aria-hidden="true" /></label>
        </div>

        <button type="submit">Confirm</button>
      </form>
      <button class="close" {...$close} use:close><X /></button>
    </div>
  </div>
{/if}

<style>
  .controls {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* dialog styles (general) */
  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    inset: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 1000;
    max-height: 85vh;
    width: 90vw;
    max-width: 450px;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 0.25rem;
    background-color: white;
    padding: 1rem;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .close {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    border-radius: Infinity;
    padding: 0.5rem;
  }

  .title {
    font-weight: bold;
  }

  /* This form */

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  form .option {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  /* Combobox */
  .cb-menu {
    z-index: 1000;
    background-color: white;
    border: 10px solid pink;
  }
</style>
