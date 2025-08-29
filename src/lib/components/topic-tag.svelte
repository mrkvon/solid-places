<script lang="ts">
  import { readInterest, type Topic } from '$lib/data/topics'
  import { X } from '@lucide/svelte'
  import { createQuery } from '@tanstack/svelte-query'

  let { uri, onClickRemove }: { uri: string; onClickRemove?: (topic: Topic) => void } = $props()

  const query = createQuery({
    queryKey: ['topic', uri, 'en'],
    queryFn: () => readInterest(uri, 'en'),
    initialData: { uri, aliases: [], id: uri.split('/').pop() },
    initialDataUpdatedAt: 0,
    staleTime: 300_000,
  })
</script>

<div class="tag" data-testid="topic-tag">
  {#if $query.data.image}
    <img class="image" src={$query.data.image} alt={$query.data.label} />
  {/if}
  {$query.data.label ?? $query.data.id}
  {#if onClickRemove}
    <button
      aria-label={`Remove ${$query.data.label ?? ''}`}
      onclick={() => onClickRemove($query.data)}
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
