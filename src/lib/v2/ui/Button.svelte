<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import Icon from './Icon.svelte';

  export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated' | 'ink' | 'ink-outline';
  export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  type Props = {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** round = pill at rest; square = rounded-rect at rest. Both morph tighter on press. */
    shape?: 'round' | 'square';
    icon?: string;
    trailingIcon?: string;
    /** Toggle buttons: pass a boolean to render aria-pressed and the selected shape. */
    selected?: boolean;
    href?: string;
    class?: string;
    children?: Snippet;
  } & Omit<HTMLButtonAttributes & HTMLAnchorAttributes, 'class' | 'children'>;

  let {
    variant = 'filled',
    size = 'sm',
    shape = 'round',
    icon,
    trailingIcon,
    selected,
    href,
    class: cls = '',
    children,
    ...rest
  }: Props = $props();

  const classes = $derived(['btn', variant, size, shape, selected !== undefined && 'toggle', cls].filter(Boolean).join(' '));
</script>

{#snippet inner()}
  {#if icon}<Icon name={icon} fill={selected === true} />{/if}
  {#if children}<span class="label">{@render children()}</span>{/if}
  {#if trailingIcon}<Icon name={trailingIcon} />{/if}
{/snippet}

{#if href}
  <a {href} class={classes} {...rest as HTMLAnchorAttributes}>{@render inner()}</a>
{:else}
  <button type="button" class={classes} aria-pressed={selected} {...rest as HTMLButtonAttributes}>{@render inner()}</button>
{/if}

<style>
  .btn {
    --h: 40px; --pad: 16px; --fs: 14px; --rad: var(--r-full); --rad-press: var(--r-md);
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    height: var(--h); padding-inline: var(--pad);
    border: 0; border-radius: var(--rad); cursor: pointer;
    font: 600 var(--fs)/1 var(--font-body); letter-spacing: .01em; text-decoration: none;
    white-space: nowrap; position: relative; isolation: isolate; overflow: hidden;
    transition: border-radius .35s var(--spring-fast), background-color .2s, box-shadow .2s, color .2s;
  }
  .btn::after { content: ''; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity .2s; z-index: -1; }
  .btn:hover::after { opacity: .08; }
  .btn:active { border-radius: var(--rad-press); }
  .btn:active::after { opacity: .12; }
  .btn :global(.msr) { font-size: calc(var(--fs) * 1.43); }
  .btn[disabled] { opacity: .38; pointer-events: none; }

  .xs { --h: 32px; --pad: 12px; --rad-press: var(--r-sm); }
  .md { --h: 56px; --pad: 24px; --fs: 16px; --rad-press: var(--r-lg); }
  .lg { --h: 96px; --pad: 48px; --fs: 24px; --rad-press: var(--r-xl); }
  .xl { --h: 136px; --pad: 64px; --fs: 32px; --rad-press: var(--r-xxl); }
  .square { --rad: var(--r-md); --rad-press: var(--r-sm); }
  .md.square { --rad: var(--r-lg); --rad-press: var(--r-md); }
  .lg.square { --rad: var(--r-xl); --rad-press: var(--r-lg); }

  .filled { background: var(--primary); color: var(--on-primary); }
  .tonal { background: var(--secondary-c); color: var(--on-secondary-c); }
  .outlined { background: transparent; color: var(--on-surface-v); box-shadow: inset 0 0 0 1px var(--outline-v); }
  .text { background: transparent; color: var(--primary); padding-inline: 12px; }
  .elevated { background: var(--sc-low); color: var(--primary); box-shadow: 0 1px 2px color-mix(in srgb, var(--shadow) 25%, transparent), 0 1px 3px 1px color-mix(in srgb, var(--shadow) 12%, transparent); }
  .ink { background: var(--hero-ink); color: var(--hero-paper); }
  .ink-outline { background: transparent; color: var(--hero-ink); box-shadow: inset 0 0 0 1.5px var(--hero-ink); }

  .toggle[aria-pressed='false'] { background: var(--sc-high); color: var(--on-surface-v); box-shadow: none; }
  .toggle[aria-pressed='true'] { --rad: var(--r-md); background: var(--primary); color: var(--on-primary); }

  @media (max-width: 840px) {
    .lg { --h: 72px; --pad: 32px; --fs: 20px; }
    .xl { --h: 96px; --pad: 40px; --fs: 24px; }
  }
</style>
