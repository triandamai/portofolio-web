<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  import { isActive, type NavItem } from './nav';

  let { items, pathname, fab, footer }: { items: NavItem[]; pathname: string; fab?: Snippet; footer?: Snippet } = $props();
</script>

<nav class="rail" aria-label="Main">
  {#if fab}<div class="fab-slot">{@render fab()}</div>{/if}
  {#each items as item (item.href)}
    {@const active = isActive(item, pathname)}
    <a class="item" href={item.href} aria-current={active ? 'page' : undefined}>
      <span class="ind"><Icon name={item.icon} fill={active} /></span>
      {item.label}
    </a>
  {/each}
  <div class="spacer"></div>
  {#if footer}<div class="footer">{@render footer()}</div>{/if}
</nav>

<style>
  .rail {
    position: sticky; top: 0; height: 100vh; height: 100dvh;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding-block: calc(20px + env(safe-area-inset-top, 0px)) 20px;
  }
  .fab-slot { margin-bottom: 28px; }
  .item {
    display: flex; flex-direction: column; align-items: center; gap: 4px; width: 80px; padding-block: 6px;
    text-decoration: none; color: var(--on-surface-v); font: 600 12px/16px var(--font-body); letter-spacing: .02em;
  }
  .ind {
    width: 56px; height: 32px; border-radius: var(--r-full); display: grid; place-items: center;
    transition: background-color .35s var(--effects), width .5s var(--spring-fast);
  }
  .item:hover .ind { background: color-mix(in srgb, var(--on-surface) 8%, transparent); }
  .item[aria-current='page'] { color: var(--on-surface); }
  .item[aria-current='page'] .ind { background: var(--secondary-c); color: var(--on-secondary-c); }
  .item:active .ind { width: 48px; }
  .spacer { flex: 1; }
  .footer { display: flex; flex-direction: column; gap: 8px; align-items: center; }
</style>
