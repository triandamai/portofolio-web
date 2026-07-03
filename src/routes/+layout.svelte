<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  import ActivityBar from '$lib/components/ActivityBar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import TabsBar from '$lib/components/TabsBar.svelte';
  import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
  import StatusBar from '$lib/components/StatusBar.svelte';
  import CommandPalette from '$lib/components/CommandPalette.svelte';
  import MobileOverlay from '$lib/components/MobileOverlay.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import OutlinePanel from '$lib/components/OutlinePanel.svelte';
  import MusicPlayer from '$lib/components/MusicPlayer.svelte';

  import { tabsStore, labelForPath } from '$lib/stores/tabs.svelte';
  import { commandPaletteStore } from '$lib/stores/commandPalette.svelte';
  import { sidebarStore } from '$lib/stores/sidebar.svelte';
  import { themeStore } from '$lib/stores/theme.svelte';

  let { children } = $props();

  onMount(() => {
    themeStore.init();
    if (window.innerWidth < 768) {
      sidebarStore.close();
    }
  });

  $effect(() => {
    const path = page.url.pathname;
    tabsStore.open({ path, label: labelForPath(path) });
  });

  afterNavigate(() => {
    document.getElementById('main-content')?.scrollTo({ top: 0 });
  });

  function handleGlobalKeydown(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      commandPaletteStore.toggle();
    }
    if (e.key === 'Escape' && commandPaletteStore.open) commandPaletteStore.hide();
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      if (sidebarStore.open) sidebarStore.close();
      else sidebarStore.toggle('explorer');
    }
  }
</script>

<svelte:document onkeydown={handleGlobalKeydown} oncontextmenu={(e) => { e.preventDefault(); commandPaletteStore.show(); }} />

<svelte:head>
  <title>Trian Damai — Portfolio</title>
  <meta name="description" content="Software engineer from East Kalimantan — SvelteKit, Android, Kotlin, TypeScript" />
</svelte:head>

<MobileOverlay />

<!-- Mobile top bar -->
<div class="mobile-topbar">
  <span class="mobile-title">{labelForPath(page.url.pathname)}</span>
  <button class="mobile-palette-btn" onclick={() => commandPaletteStore.show()} aria-label="Open command palette">
    ⌘K
  </button>
</div>

<!-- Desktop IDE layout -->
<div class="ide-layout">
  <ActivityBar />
  <Sidebar />
  <div class="editor-column">
    <TabsBar />
    <Breadcrumbs />
    <div class="editor-body">
      <main class="editor-area" id="main-content" tabindex="-1">
        {@render children()}
      </main>
      <OutlinePanel />
    </div>
  </div>
</div>

<StatusBar />
<CommandPalette />
<Dialog />
<MusicPlayer />

<style>
  .ide-layout {
    display: flex;
    flex: 1;
    overflow: hidden;
    min-height: 0;
    position: relative;
    z-index: 1;
  }

  .editor-column {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    min-width: 0;
  }

  .editor-body {
    display: flex;
    flex: 1;
    overflow: hidden;
    min-height: 0;
  }

  .editor-area {
    flex: 1;
    overflow-y: auto;
    padding: 2.5rem 3rem;
    background: transparent;
    position: relative;
    z-index: 1;
    min-width: 0;
  }

  .editor-area:focus-visible { outline: none; }

  /* ── Mobile ── */
  .mobile-topbar { display: none; }

  @media (max-width: 767px) {
    .mobile-topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 2.75rem;
      padding: 0 1rem;
      background: var(--bg-activity);
      border-bottom: 0.5px solid var(--border);
      flex-shrink: 0;
      position: relative;
      z-index: 10;
    }

    .mobile-palette-btn {
      background: none;
      border: none;
      color: var(--fg-muted);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      transition: color 0.12s;
    }

    .mobile-palette-btn:hover { color: var(--fg); }

    .mobile-title {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 600;
      background: var(--gradient-text);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :global(.activity-bar),
    :global(.sidebar) { display: none; }

    .editor-area { padding: 1.5rem 1rem; }
  }
</style>
