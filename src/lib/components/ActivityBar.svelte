<script lang="ts">
  import { sidebarStore, type SidebarView } from '$lib/stores/sidebar.svelte';
  import { commandPaletteStore } from '$lib/stores/commandPalette.svelte';
  import ThemePicker from './ThemePicker.svelte';

  const items: { id: SidebarView; label: string; title: string }[] = [
    { id: 'explorer', label: '⊞', title: 'Explorer' },
    { id: 'search',   label: '⌕', title: 'Search' },
    { id: 'projects', label: '◧', title: 'Projects' },
    { id: 'snippets', label: '</>', title: 'Snippets' }
  ];

  let themePickerOpen = $state(false);
</script>

<ThemePicker bind:open={themePickerOpen} />

<nav class="activity-bar" aria-label="Activity Bar">
  <ul>
    {#each items as item}
      <li>
        <button
          class:active={sidebarStore.view === item.id && sidebarStore.open}
          aria-label={item.title}
          title={item.title}
          onclick={() => sidebarStore.toggle(item.id)}
        >
          <span aria-hidden="true">{item.label}</span>
        </button>
      </li>
    {/each}
  </ul>

  <div class="activity-bar__bottom">
    <button
      class:active={themePickerOpen}
      aria-label="Change Color Theme"
      title="Change Color Theme"
      onclick={() => { themePickerOpen = !themePickerOpen; }}
    >
      <!-- palette icon -->
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1a7 7 0 1 0 0 14c.55 0 1-.45 1-1 0-.27-.1-.5-.25-.7a.9.9 0 0 1-.25-.65c0-.55.45-1 1-1h1.2c2.1 0 3.3-1.68 3.3-3.5A6.5 6.5 0 0 0 8 1zM3 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1.5-3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM8 3a1 1 0 1 1 0-2A1 1 0 0 1 8 3zm3.5 1.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
    </button>

    <button
      aria-label="Command Palette (Ctrl+K)"
      title="Command Palette (Ctrl+K)"
      onclick={() => commandPaletteStore.show()}
    >
      <span aria-hidden="true">⌘</span>
    </button>
  </div>
</nav>

<style>
  .activity-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: var(--activity-bar-width);
    background: var(--bg-activity);
    border-right: 0.5px solid var(--border);
    flex-shrink: 0;
    position: relative;
    z-index: 10;
  }

  ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--activity-bar-width);
    height: var(--activity-bar-width);
    background: none;
    border: none;
    border-left: 2px solid transparent;
    color: var(--fg-muted);
    cursor: pointer;
    font-size: 1.05rem;
    font-family: var(--font-mono);
    transition: color 0.15s, border-color 0.15s, background 0.15s;
    position: relative;
  }

  button::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-soft);
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
  }

  button:hover { color: var(--fg); }
  button:hover::after { opacity: 1; }

  button:focus-visible {
    outline: 1px solid var(--grad-a);
    outline-offset: -2px;
  }

  button.active {
    color: var(--fg);
    border-left-color: var(--grad-a);
  }

  button.active::after { opacity: 1; }

  /* </> is wider than the other icons — shrink it to match */
  button[title="Snippets"] { font-size: 0.72rem; }

  .activity-bar__bottom {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.25rem;
  }

  svg { pointer-events: none; }
</style>
