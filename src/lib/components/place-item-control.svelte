<script lang="ts">
  import { addToast, ToastType } from '$lib/components/toast.svelte'
  import type { PlaceData } from '$lib/data/validation/place'
  import { useLdo } from '$lib/ldoSvelte'
  import { session } from '$lib/stores/session'
  import { deleteResource, SolidLeaf } from '@ldo/connected-solid'
  import { set } from '@ldo/ldo'
  import { Pencil, Trash2, X } from '@lucide/svelte'
  import { createDialog } from '@melt-ui/svelte'
  import type { GeoCoordinates, Place } from '../../.ldo/place.typings'
  import AccessControl from './access-control.svelte'
  import PlaceForm from './place-form.svelte'

  const { place }: { place: Place } = $props()

  const { changeData, commitData, dataset } = useLdo()

  const {
    elements: { trigger, portalled, overlay, content, title, description, close },
    states: { open },
  } = createDialog()

  const handleUpdate = async (formData: PlaceData) => {
    const { name } = place
    const resource = dataset.getResource(place['@id']!)
    if (resource.isError) throw resource
    const newPlace = changeData(place, resource as SolidLeaf)
    newPlace.name = formData.name
    newPlace.description = formData.description
    newPlace.topic = set(...formData.topics.map((t) => ({ '@id': t })))
    const result = await commitData(newPlace)
    if (result.isError) throw result
    $open = false
    addToast({
      data: {
        title: 'Update successful',
        description: `Updated place ${name}`,
        type: ToastType.success,
      },
    })
  }

  const handleDelete = async () => {
    const { name } = place
    const result = globalThis.confirm(
      `Do you really want to delete place ${name} (${place['@id']})?`,
    )

    if (result) {
      const resource = dataset.getResource(place['@id']!)
      if (resource.isError) throw resource
      const deletionResult = await deleteResource(resource as SolidLeaf, {
        fetch: $session.fetch,
        dataset,
      })

      if (deletionResult.isError) {
        addToast({
          data: {
            type: ToastType.error,
            title: 'Deletion failed',
            description: deletionResult.name,
          },
        })
      } else {
        addToast({
          data: {
            type: ToastType.success,
            title: 'Deletion successful',
            description: `Deleted place ${name}`,
          },
        })
      }
    }
  }
</script>

<div class="controls">
  <AccessControl uri={place['@id']!} />
  <button aria-label="Edit place" {...$trigger} use:trigger>
    <Pencil aria-hidden="true" />
  </button>
  <button aria-label="Delete place" onclick={handleDelete}>
    <Trash2 aria-hidden="true" />
  </button>
</div>

{#if $open}
  <div {...$portalled} use:portalled>
    <div class="overlay" {...$overlay} use:overlay></div>
    <div class="content" {...$content} use:content>
      <h2 class="title" {...$title} use:title>Update Place</h2>
      <p {...$description} use:description>
        <!-- Make changes to your place here. Click "Update place" when you're finished. -->
      </p>
      {#snippet submit()}Update place{/snippet}
      <PlaceForm
        place={{
          name: place.name,
          description: place.description,
          latitude: (place.geo as GeoCoordinates).latitude,
          longitude: (place.geo as GeoCoordinates).longitude,
          topics: place.topic?.map((t) => t['@id']) ?? [],
        }}
        onsubmit={handleUpdate}
        {submit}
      />
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

  /* Combobox */
  .cb-menu {
    z-index: 1000;
    background-color: white;
    border: 10px solid pink;
  }
</style>
