<script lang="ts" module>
  import { createToaster } from '@melt-ui/svelte'
  export enum ToastType {
    success = 'Success',
    error = 'Error',
    warning = 'Warning',
    info = 'Info',
  }

  export type ToastData = {
    title: string
    description: string
    type: ToastType
  }

  const {
    elements: { content, title, description, close },
    helpers,
    states: { toasts },
    actions: { portal },
  } = createToaster<ToastData>()

  export const addToast = helpers.addToast
</script>

<script lang="ts">
  import { X } from '@lucide/svelte'
  import { flip } from 'svelte/animate'
  import { fade } from 'svelte/transition'
</script>

<div use:portal class="toast-container" data-testid="toast-container">
  {#each $toasts as { id, data } (id)}
    <div
      {...$content(id)}
      use:content
      class="toast"
      animate:flip={{ duration: 300 }}
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      <div>
        <h3 {...$title(id)} use:title>
          {data.type}: {data.title}
        </h3>
        <div {...$description(id)} use:description>
          {data.description}
        </div>
      </div>
      <button {...$close(id)} use:close aria-label="close notification">
        <X aria-hidden="true" />
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    z-index: 1000;
    position: fixed;
    bottom: 0;
    right: 0;
    max-height: 100vh;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    pointer-events: none;
  }

  .toast {
    border: 0.25rem solid pink;
    border-radius: 0.5rem;
    background-color: white;
    padding: 0.5rem;
    display: flex;
    gap: 0.5rem;
    pointer-events: initial;
  }
</style>
