<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { tabsStore } from '$lib/stores/tabs.svelte';

  function activate(path: string) {
    tabsStore.setActive(path);
    goto(path);
  }

  function closeTab(e: MouseEvent | KeyboardEvent, path: string) {
    e.stopPropagation();
    const wasActive = page.url.pathname === path;
    tabsStore.close(path);
    if (wasActive) goto(tabsStore.activeTab);
  }

  function handleTabKeydown(e: KeyboardEvent, path: string) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(path); }
    if (e.key === 'w' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); closeTab(e, path); }
  }

  function handleCloseKeydown(e: KeyboardEvent, path: string) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeTab(e, path); }
  }
</script>

<div class="tabs-bar" role="tablist" aria-label="Open editors">
  {#each tabsStore.tabs as tab (tab.path)}
    <div
      class="tab"
      class:active={page.url.pathname === tab.path}
      role="tab"
      tabindex="0"
      aria-selected={page.url.pathname === tab.path}
      onclick={() => activate(tab.path)}
      onkeydown={(e) => handleTabKeydown(e, tab.path)}
    >
      <span class="tab-label">{tab.label}</span>
      <span
        class="tab-close"
        role="button"
        tabindex="0"
        aria-label="Close {tab.label}"
        onclick={(e) => closeTab(e, tab.path)}
        onkeydown={(e) => handleCloseKeydown(e, tab.path)}
      >×</span>
    </div>
  {/each}
</div>

<style>
  .tabs-bar {
    display: flex;
    align-items: stretch;
    background: var(--bg-tabs);
    border-bottom: 0.5px solid var(--border);
    overflow-x: auto;
    scrollbar-width: none;
    flex-shrink: 0;
    min-height: var(--tabs-height);
    position: relative;
    z-index: 8;
  }

  .tabs-bar::-webkit-scrollbar { display: none; }

  .tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.875rem;
    background: none;
    border-right: 0.5px solid var(--border);
    border-bottom: 2px solid transparent;
    color: var(--fg-muted);
    font-family: var(--font-mono);
    font-size: 0.775rem;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.12s, background 0.12s;
    flex-shrink: 0;
    min-height: var(--tabs-height);
    user-select: none;
    position: relative;
  }

  .tab:hover {
    color: var(--fg);
    background: var(--bg-hover);
  }

  .tab:focus-visible {
    outline: 1px solid var(--grad-a);
    outline-offset: -1px;
  }

  .tab.active {
    color: var(--fg);
    background: var(--bg-editor);
    border-bottom-color: transparent;
  }

  /* gradient underline on active tab */
  .tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gradient-line);
  }

  .tab-close {
    opacity: 0;
    font-size: 0.85rem;
    line-height: 1;
    color: var(--fg-muted);
    padding: 0 0.1rem;
    transition: opacity 0.12s, color 0.12s;
    cursor: pointer;
    border-radius: 0;
  }

  .tab:hover .tab-close,
  .tab.active .tab-close { opacity: 1; }

  .tab-close:hover { color: var(--grad-b); }

  .tab-close:focus-visible {
    outline: 1px solid var(--grad-a);
    outline-offset: 1px;
  }
</style>
