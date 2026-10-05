<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';

  type Props = {
    headline: string;
    supporting?: string;
    icon?: string;
    href?: string;
    trailing?: Snippet;
    external?: boolean;
    /** Full page load, needed when linking out of v2 into v1 routes. */
    reload?: boolean;
  };
  let { headline, supporting, icon, href, trailing, external = false, reload = false }: Props = $props();
</script>

{#snippet body()}
  {#if icon}<span class="lead"><Icon name={icon} /></span>{/if}
  <span class="tx"><b>{headline}</b>{#if supporting}<span>{supporting}</span>{/if}</span>
  {#if trailing}{@render trailing()}{:else if href}<Icon name={external ? 'north_east' : 'chevron_right'} />{/if}
{/snippet}

<li>
  {#if href}
    <a class="li" {href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} data-sveltekit-reload={reload ? '' : undefined}>{@render body()}</a>
  {:else}
    <div class="li">{@render body()}</div>
  {/if}
</li>

<style>
  .li {
    display: flex; gap: 14px; align-items: center; padding: 14px 16px;
    background: var(--sc-lowest); text-decoration: none; color: inherit;
    transition: background-color .2s;
  }
  a.li:hover { background: var(--sc-high); }
  .li > :global(.msr) { color: var(--on-surface-v); }
  .lead { width: 40px; height: 40px; border-radius: var(--r-md); background: var(--secondary-c); color: var(--on-secondary-c); display: grid; place-items: center; flex-shrink: 0; transition: border-radius .4s var(--spring-fast); }
  a.li:hover .lead { border-radius: var(--r-full); }
  .tx { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
  .tx b { font-weight: 600; font-size: 15px; }
  .tx span { color: var(--on-surface-v); font-size: 13px; }
</style>
