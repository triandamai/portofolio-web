<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    variant?: 'filled' | 'elevated' | 'outlined' | 'inverse' | 'tertiary' | 'gradient';
    /** Any border-radius value — M3 Expressive cards often use asymmetric corners. */
    radius?: string;
    href?: string;
    class?: string;
    children: Snippet;
  };
  let { variant = 'filled', radius, href, class: cls = '', children }: Props = $props();
</script>

{#if href}
  <a {href} class="card {variant} interactive {cls}" style:--card-r={radius}>{@render children()}</a>
{:else}
  <div class="card {variant} {cls}" style:--card-r={radius}>{@render children()}</div>
{/if}

<style>
  .card {
    --card-r: var(--r-xl);
    display: flex; flex-direction: column; min-width: 0; overflow: hidden;
    border-radius: var(--card-r); text-decoration: none; color: inherit;
    transition: border-radius .5s var(--spring), background-color .25s, transform .5s var(--spring);
  }
  .interactive:hover { border-radius: var(--r-xxl); }
  .interactive:active { transform: scale(.985); }
  .filled { background: var(--sc-low); }
  .filled.interactive:hover { background: var(--sc); }
  .elevated { background: var(--sc-low); box-shadow: 0 1px 3px color-mix(in srgb, var(--shadow) 18%, transparent); }
  .outlined { background: var(--surface); box-shadow: inset 0 0 0 1px var(--outline-v); }
  .inverse { background: var(--inverse-surface); color: var(--inverse-on-surface); }
  .tertiary { background: var(--tertiary-c); color: var(--on-tertiary-c); }
  .gradient { background: var(--grad); color: var(--hero-ink); }
</style>
