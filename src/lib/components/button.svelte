<script lang="ts">
  import type { SvelteHTMLElements } from 'svelte/elements'

  type CustomProps<T extends 'button' | 'input'> = {
    as?: T
    variant?: 'primary' | 'secondary'
  }

  type ButtonProps = CustomProps<'button'> & SvelteHTMLElements['button']
  type InputProps = CustomProps<'input'> & SvelteHTMLElements['input']
  type Props = ButtonProps | InputProps

  const {
    as = 'button',
    variant = 'secondary',
    class: className,
    children,
    ...rest
  }: Props = $props()
</script>

<svelte:element this={as} class={[className, variant, 'button']} {...rest}>
  {@render children?.()}
</svelte:element>

<style>
  .button {
    cursor: pointer;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .button:disabled {
    cursor: not-allowed;
    filter: grayscale();
  }

  .primary {
    background-color: pink;
    border: 2px solid pink;
  }

  .secondary {
    border: 2px solid pink;
  }
</style>
