<script lang="ts" generics="T extends string">
  import Icon from './Icon.svelte';

  type Option = { value: T; label: string; icon?: string };
  type Props = {
    options: Option[];
    value: T;
    label: string;
    size?: 'xs' | 'sm';
    onchange?: (value: T) => void;
  };

  let { options, value = $bindable(), label, size = 'xs', onchange }: Props = $props();

  function select(v: T) {
    value = v;
    onchange?.(v);
  }
</script>

<!-- Connected button group: single-select. The selected segment morphs to a full pill. -->
<div class="group {size}" role="group" aria-label={label}>
  {#each options as opt (opt.value)}
    <button type="button" aria-pressed={opt.value === value} onclick={() => select(opt.value)}>
      {#if opt.icon}<Icon name={opt.icon} fill={opt.value === value} size={20} />{/if}
      {opt.label}
    </button>
  {/each}
</div>

<style>
  .group { display: inline-flex; gap: 2px; flex-wrap: wrap; }
  button {
    display: inline-flex; align-items: center; gap: 6px;
    height: 40px; padding-inline: 16px; border: 0; cursor: pointer;
    font: 600 14px/1 var(--font-body);
    background: var(--sc-high); color: var(--on-surface-v);
    border-radius: var(--r-sm);
    transition: border-radius .4s var(--spring-fast), background-color .2s, color .2s;
  }
  .xs button { height: 32px; padding-inline: 12px; }
  button:first-child { border-radius: var(--r-full) var(--r-sm) var(--r-sm) var(--r-full); }
  button:last-child { border-radius: var(--r-sm) var(--r-full) var(--r-full) var(--r-sm); }
  button:hover { background: color-mix(in srgb, var(--on-surface) 8%, var(--sc-high)); }
  button:active { border-radius: var(--r-xs); }
  button[aria-pressed='true'] { border-radius: var(--r-full); background: var(--secondary); color: var(--on-secondary); }
</style>
