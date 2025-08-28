<script lang="ts">
  import { useResource, useSubject } from '$lib/ldoSvelte'
  import { X } from '@lucide/svelte'
  import { FoafProfileShapeType } from '../../.ldo/foafProfile.shapeTypes'
  import type { FoafProfile } from '../../.ldo/foafProfile.typings'

  let { webId, onClickRemove }: { webId: string; onClickRemove?: (person: FoafProfile) => void } =
    $props()

  useResource(webId)

  let person = useSubject(FoafProfileShapeType, webId)
</script>

<div class="tag">
  {$person.name}
  {#if onClickRemove}
    <button
      aria-label={`Remove ${$person.name}`}
      onclick={() => onClickRemove($person)}
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
    gap: 0.125rem;
  }
</style>
