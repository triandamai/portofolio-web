<script lang="ts">
  import Icon from './Icon.svelte';

  type Item = { label: string; href: string; icon?: string };
  type Props = { label: string; icon?: string; href: string; items: Item[]; menuLabel?: string; target?: string };

  let { label, icon, href, items, menuLabel = 'More options', target }: Props = $props();
  let open = $state(false);
  let root: HTMLDivElement;

  function onWindowClick(e: MouseEvent) {
    if (open && !root.contains(e.target as Node)) open = false;
  }
</script>

<svelte:window onclick={onWindowClick} onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<div class="split" bind:this={root}>
  <a class="lead" {href} {target} rel={target ? 'noopener noreferrer' : undefined}>
    {#if icon}<Icon name={icon} size={20} />{/if}{label}
  </a>
  <button class="trail" type="button" aria-label={menuLabel} aria-haspopup="menu" aria-expanded={open} onclick={() => (open = !open)}>
    <Icon name="keyboard_arrow_down" size={22} />
  </button>
  {#if open}
    <div class="menu" role="menu">
      {#each items as item (item.href)}
        <a role="menuitem" href={item.href} {target} rel={target ? 'noopener noreferrer' : undefined} onclick={() => (open = false)}>
          {#if item.icon}<Icon name={item.icon} size={20} />{/if}{item.label}
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .split { display: inline-flex; gap: 2px; position: relative; }
  .lead, .trail {
    height: 40px; display: inline-flex; align-items: center; gap: 8px; border: 0; cursor: pointer;
    background: var(--primary); color: var(--on-primary); text-decoration: none;
    font: 600 14px/1 var(--font-body);
    transition: border-radius .4s var(--spring-fast), filter .2s;
  }
  .lead { padding-inline: 16px; border-radius: var(--r-full) var(--r-xs) var(--r-xs) var(--r-full); }
  .trail { padding-inline: 10px 12px; border-radius: var(--r-xs) var(--r-full) var(--r-full) var(--r-xs); }
  .lead:hover, .trail:hover { filter: brightness(1.08); }
  .trail :global(.msr) { transition: transform .4s var(--spring-fast); }
  .trail[aria-expanded='true'] { border-radius: var(--r-full); }
  .trail[aria-expanded='true'] :global(.msr) { transform: rotate(180deg); }
  .menu {
    position: absolute; top: calc(100% + 6px); right: 0; z-index: 20; min-width: 220px;
    background: var(--sc); border-radius: var(--r-lg); padding: 6px; display: flex; flex-direction: column; gap: 2px;
    box-shadow: 0 6px 18px color-mix(in srgb, var(--shadow) 22%, transparent);
    animation: pop .35s var(--spring) both; transform-origin: top right;
  }
  .menu a { display: flex; gap: 12px; align-items: center; padding: 10px 12px; border-radius: var(--r-sm); text-decoration: none; font-size: 14px; color: var(--on-surface); }
  .menu a:hover { background: var(--secondary-c); color: var(--on-secondary-c); border-radius: var(--r-md); }
  @keyframes pop { from { opacity: 0; transform: scale(.9); } }
</style>
