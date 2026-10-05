<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import Icon from './Icon.svelte';

  type Props = {
    icon: string;
    /** Accessible name — icon buttons have no visible text. */
    label: string;
    variant?: 'standard' | 'filled' | 'tonal' | 'outlined';
    width?: 'narrow' | 'default' | 'wide';
    selected?: boolean;
    href?: string;
    class?: string;
  } & Omit<HTMLButtonAttributes & HTMLAnchorAttributes, 'class' | 'children'>;

  let { icon, label, variant = 'standard', width = 'default', selected, href, class: cls = '', ...rest }: Props = $props();
  const classes = $derived(`icon-btn ${variant} ${width} ${cls}`);
</script>

{#if href}
  <a {href} class={classes} aria-label={label} title={label} {...rest as HTMLAnchorAttributes}><Icon name={icon} fill={selected} /></a>
{:else}
  <button type="button" class={classes} aria-label={label} title={label} aria-pressed={selected} {...rest as HTMLButtonAttributes}><Icon name={icon} fill={selected} /></button>
{/if}

<style>
  .icon-btn {
    width: 40px; height: 40px; border-radius: var(--r-full); border: 0; cursor: pointer; padding: 0;
    display: inline-grid; place-items: center; background: transparent; color: var(--on-surface-v);
    text-decoration: none; flex-shrink: 0;
    transition: border-radius .35s var(--spring-fast), background-color .2s, width .35s var(--spring-fast);
  }
  .icon-btn:hover { background: color-mix(in srgb, var(--on-surface) 8%, transparent); }
  .icon-btn:active { border-radius: var(--r-md); }
  .narrow { width: 32px; }
  .wide { width: 52px; }
  .filled { background: var(--primary); color: var(--on-primary); }
  .filled:hover { background: color-mix(in srgb, var(--on-primary) 8%, var(--primary)); }
  .tonal { background: var(--secondary-c); color: var(--on-secondary-c); }
  .tonal:hover { background: color-mix(in srgb, var(--on-secondary-c) 8%, var(--secondary-c)); }
  .outlined { box-shadow: inset 0 0 0 1px var(--outline-v); }
  [aria-pressed='true'] { border-radius: var(--r-md); }
</style>
