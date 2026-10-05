<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';

  type Props = {
    /** filter: toggles with a check; assist: action; tag: static label */
    kind?: 'filter' | 'assist' | 'tag';
    selected?: boolean;
    icon?: string;
    size?: 'sm' | 'md';
    onclick?: () => void;
    children: Snippet;
  };
  let { kind = 'tag', selected = false, icon, size = 'md', onclick, children }: Props = $props();
</script>

{#if kind === 'tag'}
  <span class="chip tag {size}">{#if icon}<Icon name={icon} size={18} />{/if}{@render children()}</span>
{:else}
  <button
    type="button"
    class="chip {kind} {size}"
    aria-pressed={kind === 'filter' ? selected : undefined}
    {onclick}
  >
    {#if kind === 'filter' && selected}<Icon name="check" size={18} />{:else if icon}<Icon name={icon} size={18} />{/if}
    {@render children()}
  </button>
{/if}

<style>
  .chip {
    display: inline-flex; align-items: center; gap: 6px; height: 32px; padding-inline: 12px;
    border-radius: var(--r-sm); border: 0; background: transparent;
    box-shadow: inset 0 0 0 1px var(--outline-v);
    color: var(--on-surface-v); font: 500 14px/1 var(--font-body); white-space: nowrap;
    transition: background-color .2s, border-radius .35s var(--spring-fast), color .2s;
  }
  .sm { height: 28px; font-size: 13px; padding-inline: 10px; }
  button.chip { cursor: pointer; }
  button.chip:hover { background: color-mix(in srgb, var(--on-surface) 6%, transparent); }
  .filter[aria-pressed='true'] { background: var(--secondary-c); color: var(--on-secondary-c); box-shadow: none; border-radius: var(--r-lg); }
  .assist { background: var(--sc-low); box-shadow: none; }
</style>
