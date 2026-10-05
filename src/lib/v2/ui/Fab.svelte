<script lang="ts">
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import Icon from './Icon.svelte';

  type Props = {
    icon: string;
    /** Visible text turns this into an extended FAB; otherwise used as aria-label. */
    label: string;
    extended?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'gradient' | 'tonal' | 'primary';
    href?: string;
    class?: string;
  } & Omit<HTMLButtonAttributes & HTMLAnchorAttributes, 'class' | 'children'>;

  let { icon, label, extended = false, size = 'sm', variant = 'gradient', href, class: cls = '', ...rest }: Props = $props();
  const classes = $derived(`fab ${size} ${variant} ${extended ? 'ext' : ''} ${cls}`);
</script>

{#snippet inner()}
  <Icon name={icon} />
  {#if extended}<span>{label}</span>{/if}
{/snippet}

{#if href}
  <a {href} class={classes} aria-label={extended ? undefined : label} title={extended ? undefined : label} {...rest as HTMLAnchorAttributes}>{@render inner()}</a>
{:else}
  <button type="button" class={classes} aria-label={extended ? undefined : label} title={extended ? undefined : label} {...rest as HTMLButtonAttributes}>{@render inner()}</button>
{/if}

<style>
  .fab {
    display: inline-grid; place-items: center; border: 0; cursor: pointer; text-decoration: none; flex-shrink: 0;
    width: 56px; height: 56px; border-radius: var(--r-lg);
    box-shadow: 0 3px 6px color-mix(in srgb, var(--shadow) 18%, transparent), 0 1px 2px color-mix(in srgb, var(--shadow) 14%, transparent);
    transition: border-radius .4s var(--spring-fast), transform .4s var(--spring-fast);
  }
  .fab:hover { border-radius: var(--r-xl); transform: rotate(-4deg); }
  .fab:active { transform: scale(.94); }
  .gradient { background: var(--grad); color: var(--hero-ink); }
  .tonal { background: var(--primary-c); color: var(--on-primary-c); }
  .primary { background: var(--primary); color: var(--on-primary); }
  .md { width: 80px; height: 80px; border-radius: var(--r-xl); }
  .md :global(.msr) { font-size: 28px; }
  .lg { width: 96px; height: 96px; border-radius: var(--r-xl-i); }
  .lg :global(.msr) { font-size: 36px; }
  .ext { width: auto; padding-inline: 20px 24px; display: inline-flex; gap: 12px; font: 600 16px/1 var(--font-body); }
  .ext:hover { transform: none; }
</style>
