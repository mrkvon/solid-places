<script lang="ts">
  import { type Topic, searchInterests } from '$lib/data/topics'
  import { createCombobox } from '@melt-ui/svelte'
  import { fly } from 'svelte/transition'
  import TopicTag from './topic-tag.svelte'

  let { value = $bindable(), disabled }: { value: string[]; disabled?: boolean } = $props()

  let selectedWebIds = $state<string[]>([])

  const {
    elements: { menu, input, option, label },
    states: { open, inputValue, touchedInput, selected },
    helpers: { isSelected, isHighlighted },
  } = createCombobox<string, true>({
    multiple: true,
    onSelectedChange: (event) => {
      const nextIds = event.next?.map((x) => x.value) ?? []
      selectedWebIds = nextIds
      value = nextIds
      $inputValue = ''
      $open = false
      return event.next
    },
  })

  $effect(() => {
    if (value.length === $selected?.length) return
    $selected = value.map((v) => ({
      value: v,
      label: '',
    }))
  })

  let debounceTimer: ReturnType<typeof setTimeout>

  const debounce = (callback: () => void) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(callback, 450)
  }

  let topicsFound = $state<Topic[]>([])

  let debouncedInputValue = $state('')

  $effect(() => {
    const val = $inputValue
    if ($touchedInput) {
      debounce(() => {
        debouncedInputValue = val
      })
    } else {
      debouncedInputValue = val
    }
  })

  $effect(() => {
    searchInterests(debouncedInputValue, 'en').then((results) => {
      topicsFound = results
    })
  })

  let options = $derived(
    topicsFound.filter(
      (f) =>
        f.label?.toLowerCase().includes($inputValue.toLowerCase()) ||
        f.aliases.some((alias) => alias.toLowerCase().includes($inputValue.toLowerCase())),
    ),
  )

  const handleClickRemove = (topic: Topic) => {
    console.log(topic.uri, '****')
    value = value.filter((uri) => uri !== topic.uri)
    value = value
  }
</script>

<div>
  <div>
    <div class="selected-topics">
      {#each selectedWebIds as uri (uri)}
        <TopicTag {uri} onClickRemove={handleClickRemove} />
      {/each}
    </div>
    <input
      {...$input}
      disabled={disabled || $input.disabled}
      use:input
      placeholder="Search topics"
    />
  </div>
</div>
{#if $open}
  <ul class="menu" {...$menu} use:menu transition:fly={{ duration: 150, y: -5 }}>
    {#each options as topic (topic.id)}
      <li
        {...$option({
          value: topic.uri,
          label: topic.label,
        })}
        use:option
      >
        <div>
          <span class="font-medium">
            {#if topic.image}
              <img src={topic.image} alt="" width="1rem" height="1rem" />
            {/if}
            {topic.label}
            {topic.image} ({topic.id})</span
          >
        </div>
      </li>
    {:else}
      <li>No results found</li>
    {/each}
    <!-- </div> -->
  </ul>
{/if}

<style>
  .check {
    color: pink;
    translate: 0 calc(-50% + 1px);
  }

  [data-highlighted] {
    background-color: lightgray;
  }

  [data-disabled] {
    font-style: italic;
    opacity: 0.5;
  }

  .menu {
    z-index: 1000;
    display: flex;
    max-height: 300px;
    flex-direction: column;
    overflow: hidden;
    border-radius: 0.5rem;
    background-color: white;
  }

  .selected-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
