<script lang="ts">
  import Icon from './Icon.svelte';
  import { isActive, type NavItem } from './nav';

  let { items, pathname }: { items: NavItem[]; pathname: string } = $props();
</script>

<nav class="bar" aria-label="Main">
  {#each items as item (item.href)}
    {@const active = isActive(item, pathname)}
    <a class="item" href={item.href} aria-current={active ? 'page' : undefined}>
      <span class="ind"><Icon name={item.icon} fill={active} /></span>
      {item.label}
    </a>
  {/each}
</nav>

<style>
  .bar {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 40;
    display: flex; justify-content: space-around;
    background: var(--sc); padding: 12px 8px calc(12px + env(safe-area-inset-bottom, 0px));
  }
  .item {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
    text-decoration: none; color: var(--on-surface-v); font: 600 12px/16px var(--font-body);
  }
  .ind { width: 56px; height: 32px; border-radius: var(--r-full); display: grid; place-items: center; transition: background-color .35s var(--effects); }
  .item[aria-current='page'] { color: var(--on-surface); }
  .item[aria-current='page'] .ind { background: var(--secondary-c); color: var(--on-secondary-c); }
</style>
