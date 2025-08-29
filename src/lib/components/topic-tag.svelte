<script lang="ts">
  import { readInterest, type Topic } from '$lib/data/topics'
  import { X } from '@lucide/svelte'

  let { uri, onClickRemove }: { uri: string; onClickRemove?: (topic: Topic) => void } = $props()

  let topic = $state<Topic>({ uri, id: uri.split('/').pop(), aliases: [] })

  $effect(() => {
    readInterest(uri, 'en').then((t) => {
      topic = t
    })
  })
</script>

<div class="tag" data-testid="topic-tag">
  {#if topic.image}
    <img class="image" src={topic.image} alt={topic.label} />
  {/if}
  {topic.label ?? topic.id}
  {#if onClickRemove}
    <button
      aria-label={`Remove ${topic.label ?? ''}`}
      onclick={() => onClickRemove(topic)}
      type="button"
    >
      <X aria-hidden="true" size="1.25rem" />
    </button>
  {/if}
</div>

<style>
  .tag {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .image {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.25rem;
    object-fit: cover;
  }
</style>
