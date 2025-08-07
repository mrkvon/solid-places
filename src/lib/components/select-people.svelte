<script lang="ts">
  import { useLinkQuery, useMatchObject, useResource, useSubject } from '$lib/ldoSvelte'
  import { session } from '$lib/stores/session'
  import { createCombobox } from '@melt-ui/svelte'
  import { foaf, solid } from 'rdf-namespaces'
  import { fly } from 'svelte/transition'
  import { FoafProfileShapeType } from '../../.ldo/foafProfile.shapeTypes'
  import PersonTag from './person-tag.svelte'

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
  // let selectedPeople = $derived($selected?.map((s) => useSubject(FoafProfileShapeType, s.value)))

  $effect(() => {
    if (value.length === $selected?.length) return
    $selected = value.map((v) => ({
      value: v,
      label: '',
    }))
  })

  // $effect(() => {
  //   if (value.length === $selected?.length) return
  //   value = $selected?.map((s) => s.value) ?? []
  // })

  let debounceTimer: ReturnType<typeof setTimeout>

  const debounce = (callback: () => void) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(callback, 450)
  }

  let a = useLinkQuery(FoafProfileShapeType, $session.info.webId!, $session.info.webId!, {
    name: true,
    knows: { name: true },
  })

  let friends = useMatchObject(FoafProfileShapeType, $session.info.webId, foaf.knows)

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

  let options = $derived(
    $friends.filter(
      (f) =>
        f.name?.toLowerCase().includes($inputValue.toLowerCase()) ||
        f['@id']?.toLowerCase().includes($inputValue.toLowerCase()),
    ),
  )

  let personResourceResult = $derived(useResource(debouncedInputValue))

  let personByWebId = $derived(useSubject(FoafProfileShapeType, debouncedInputValue))
  let matched = $derived(
    useMatchObject(FoafProfileShapeType, debouncedInputValue, solid.oidcIssuer),
  )
</script>

<div class="flex flex-col gap-1">
  <!-- svelte-ignore a11y_label_has_associated_control - $label contains the 'for' attribute -->
  <!-- <label {...$label} use:label>
    <span class="text-sm font-medium text-magnum-900">Select people:</span>
  </label> -->

  <div class="relative">
    {#each selectedWebIds as webId (webId)}
      <PersonTag {webId} />{/each}
    <input
      {...$input}
      disabled={disabled || $input.disabled}
      use:input
      placeholder="Name or webId"
    />
  </div>
</div>
{#if $open}
  <ul class="menu" {...$menu} use:menu transition:fly={{ duration: 150, y: -5 }}>
    {#if $personByWebId?.['@id'] && !$personResourceResult?.isError}
      <li
        {...$option({
          value: $personByWebId['@id'],
          label: $personByWebId.name ?? $personByWebId['@id'],
          disabled: $personResourceResult.isPresent() !== true || $matched.size === 0,
        })}
        use:option
      >
        {$personByWebId.name ?? $personByWebId['@id']}
      </li>
    {/if}
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <!-- <div tabindex="0"> -->
    {#each options as person (person['@id'])}
      <li
        {...$option({
          value: person['@id'],
          label: person.name ?? person['@id'],
        })}
        use:option
      >
        <!-- {#if $isSelected(person['@id'])}
          <div class="check absolute left-2 top-1/2 z-10 text-magnum-900">
            <Check class="size-4" />
          </div>
        {:else}
          asdf
        {/if} -->
        <div class="pl-4">
          <span class="font-medium">{person.name ?? person['@id']}</span>
        </div>
      </li>
    {:else}
      <li
        class="relative cursor-pointer rounded-md py-1 pl-8 pr-4
        data-[highlighted]:bg-magnum-100 data-[highlighted]:text-magnum-700"
      >
        No results found
      </li>
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
</style>
