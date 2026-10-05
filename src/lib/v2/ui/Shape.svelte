<script lang="ts">
  import type { Snippet } from 'svelte';
  import { clipPathFor, nextShape, type ShapeName } from '../shapes';

  type Props = {
    name?: ShapeName;
    /** CSS length for width & height. */
    size?: string;
    color?: string;
    /** Ambient motion applied to the shape. */
    motion?: 'none' | 'spin' | 'spin-reverse' | 'breathe' | 'bounce' | 'wobble';
    /** Seconds per motion cycle. */
    speed?: number;
    /** Clicking cycles through the shape library with a morph. */
    morphOnClick?: boolean;
    label?: string;
    class?: string;
    children?: Snippet;
  };

  let {
    name = 'cookie9',
    size = '48px',
    color = 'var(--primary-c)',
    motion = 'none',
    speed = 12,
    morphOnClick = false,
    label,
    class: cls = '',
    children
  }: Props = $props();

  let current = $state<ShapeName | null>(null);
  const shape = $derived(current ?? name);
  const clip = $derived(clipPathFor(shape));
</script>

{#if morphOnClick}
  <button
    type="button"
    class="shape {motion} {cls}"
    style:--size={size}
    style:--speed="{speed}s"
    aria-label={label ?? `Change shape (now ${shape})`}
    onclick={() => (current = nextShape(shape))}
  >
    <span class="fill" style:background={color} style:clip-path={clip}>{@render children?.()}</span>
  </button>
{:else}
  <span class="shape {motion} {cls}" style:--size={size} style:--speed="{speed}s" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'}>
    <span class="fill" style:background={color} style:clip-path={clip}>{@render children?.()}</span>
  </span>
{/if}

<style>
  .shape {
    width: var(--size); height: var(--size); flex-shrink: 0;
    display: inline-grid; padding: 0; border: 0; background: none; color: inherit;
  }
  button.shape { cursor: pointer; }
  .fill {
    display: grid; place-items: center; width: 100%; height: 100%;
    transition: clip-path .7s var(--spring), background-color .3s;
  }

  .spin .fill { animation: spin var(--speed) linear infinite; }
  .spin-reverse .fill { animation: spin var(--speed) linear infinite reverse; }
  .breathe .fill { animation: breathe var(--speed) var(--effects) infinite; }
  .bounce { animation: bounce var(--speed) infinite; }
  .bounce .fill { animation: squash var(--speed) infinite; transform-origin: 50% 100%; }
  .wobble .fill { animation: wobble var(--speed) var(--spring) infinite; }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes breathe {
    0%, 100% { transform: scale(.72) rotate(0deg); }
    50% { transform: scale(1.08) rotate(45deg); }
  }
  /* Ball-style bounce: ease-out going up, ease-in coming down, squash on contact */
  @keyframes bounce {
    0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(.2, .7, .4, 1); }
    50% { transform: translateY(-55%); animation-timing-function: cubic-bezier(.6, 0, .8, .3); }
  }
  @keyframes squash {
    0%, 100% { transform: scale(1.18, .8); }
    8%, 92% { transform: scale(.94, 1.06); }
    50% { transform: scale(1, 1); }
  }
  @keyframes wobble {
    0%, 100% { transform: rotate(-12deg) scale(1); }
    50% { transform: rotate(14deg) scale(.88); }
  }
</style>
