<script lang="ts">
  import { type PlaceData, placeSchema } from '$lib/data/validation/place'
  import { LoaderCircle } from '@lucide/svelte'
  import merge from 'lodash/merge'
  import type { Snippet } from 'svelte'
  import type { EventHandler } from 'svelte/elements'
  import z from 'zod'
  import Button from './button.svelte'
  import SelectWikidataTopics from './select-wikidata-topics.svelte'

  const {
    place,
    submit,
    onsubmit,
  }: { place: Partial<PlaceData>; submit: Snippet; onsubmit: (place: PlaceData) => Promise<void> } =
    $props()

  let submitting = $state(false)

  const formData = $state(merge({ topics: [] as string[] }, place))
  const validationStatus = $derived(placeSchema.safeParse(formData))
  const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
    submitting = true
    e.preventDefault()
    try {
      if (!validationStatus.success) throw new Error('invalid value')
      await onsubmit(validationStatus.data)
    } finally {
      submitting = false
    }
  }
  const errors = $derived(
    validationStatus.success ? undefined : z.treeifyError(validationStatus.error),
  )
</script>

{#snippet fieldError(prop: keyof PlaceData)}
  {#if errors?.properties?.[prop]}{errors.properties[prop].errors.join(', ')}{/if}
{/snippet}

<form onsubmit={handleSubmit}>
  <div class="field">
    <label for="name">Name</label>
    <input id="name" type="text" name="name" placeholder="name" bind:value={formData.name} />
    {@render fieldError('name')}
  </div>
  <div class="field">
    <label for="description">Description</label>
    <textarea
      id="description"
      name="description"
      placeholder="description"
      bind:value={formData.description}
    ></textarea>
    {@render fieldError('description')}
  </div>
  <div class="field">
    <label for="latitude">Latitude</label>
    <input
      type="number"
      step="any"
      id="latitude"
      name="latitude"
      placeholder="latitude"
      bind:value={formData.latitude}
    />
    {@render fieldError('latitude')}
  </div>
  <div class="field">
    <label for="longitude">Longitude</label>
    <input
      type="number"
      step="any"
      id="longitude"
      name="longitude"
      placeholder="longitude"
      bind:value={formData.longitude}
    />
    {@render fieldError('longitude')}
  </div>
  <SelectWikidataTopics bind:value={formData.topics} />
  {@render fieldError('topics')}
  <Button type="submit" variant="primary" disabled={!validationStatus.success || submitting}>
    {#if submitting}<LoaderCircle class="spinning" />{/if}
    {@render submit()}</Button
  >
  <Button type="reset">Cancel</Button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .field {
    display: flex;
    flex-direction: column;
  }
</style>
