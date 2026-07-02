<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { sidebarStore } from '$lib/stores/sidebar.svelte';
  import { PROJECTS, SNIPPETS, NAV_FILES } from '$lib/content/index';

  let { onNavigate }: { onNavigate?: () => void } = $props();

  const searchResults = $derived(() => {
    const q = sidebarStore.searchQuery.toLowerCase();
    if (!q) return NAV_FILES;
    return NAV_FILES.filter(f =>
      f.label.toLowerCase().includes(q) || f.path.toLowerCase().includes(q)
    );
  });

  function navigate(path: string) {
    if (window.innerWidth < 768) {
      sidebarStore.close();
    }
    goto(path);
    onNavigate?.();
  }

  function isActive(path: string) {
    return page.url.pathname === path;
  }

  const fileIcon: Record<string, string> = {
    '.md': '◆',
    '.ts': '◈',
    '.json': '◉',
    '/': '◫'
  };

  function iconFor(label: string): string {
    if (label.endsWith('/'))    return '▸';
    if (label.endsWith('.md'))  return '◉';
    if (label.endsWith('.ts'))  return '◆';
    if (label.endsWith('.json'))return '⊙';
    if (label.endsWith('.log')) return '◎';
    if (label.endsWith('.pdf')) return '◧';
    return '◉';
  }
</script>

{#if sidebarStore.open}
<aside class="sidebar" aria-label="Sidebar">
  {#if sidebarStore.view === 'explorer'}
    <div class="sidebar__header">EXPLORER</div>
    <div class="sidebar__section-title">PORTFOLIO</div>
    <ul>
      {#each NAV_FILES as file}
        <li>
          <button
            class:active={isActive(file.path)}
            onclick={() => navigate(file.path)}
            aria-current={isActive(file.path) ? 'page' : undefined}
          >
            <span class="file-icon" class:icon-active={isActive(file.path)} aria-hidden="true">{iconFor(file.label)}</span>
            {file.label}
          </button>
        </li>
      {/each}
    </ul>

  {:else if sidebarStore.view === 'search'}
    <div class="sidebar__header">SEARCH</div>
    <div class="sidebar__search-input">
      <input
        type="search"
        placeholder="Search files…"
        value={sidebarStore.searchQuery}
        oninput={(e) => sidebarStore.setSearch((e.target as HTMLInputElement).value)}
        aria-label="Search files"
      />
    </div>
    <ul>
      {#each searchResults() as file}
        <li>
          <button onclick={() => navigate(file.path)}>
            <span class="file-icon" aria-hidden="true">{iconFor(file.label)}</span>
            {file.label}
          </button>
        </li>
      {/each}
    </ul>

  {:else if sidebarStore.view === 'projects'}
    <div class="sidebar__header">PROJECTS</div>
    <ul>
      {#each PROJECTS as project}
        <li>
          <button
            class:active={isActive(`/projects/${project.slug}`)}
            onclick={() => navigate(`/projects/${project.slug}`)}
          >
            <span class="file-icon" class:icon-active={isActive(`/projects/${project.slug}`)} aria-hidden="true">◆</span>
            {project.slug}.md
          </button>
        </li>
      {/each}
    </ul>

  {:else if sidebarStore.view === 'snippets'}
    <div class="sidebar__header">SNIPPETS</div>
    <ul>
      {#each SNIPPETS as snippet}
        <li>
          <button
            class:active={isActive(`/snippets/${snippet.slug}`)}
            onclick={() => navigate(`/snippets/${snippet.slug}`)}
          >
            <span class="file-icon" class:icon-active={isActive(`/snippets/${snippet.slug}`)} aria-hidden="true">◈</span>
            {snippet.filename}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</aside>
{/if}

<style>
  .sidebar {
    width: var(--sidebar-width);
    background: var(--bg-sidebar);
    border-right: 0.5px solid var(--border);
    overflow-y: auto;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 9;
  }

  .sidebar__header {
    padding: 0.5rem 0.875rem;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--fg-muted);
    border-bottom: 0.5px solid var(--border);
    position: sticky;
    top: 0;
    background: var(--bg-sidebar);
    z-index: 1;
  }

  .sidebar__section-title {
    padding: 0.6rem 0.875rem 0.2rem;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--fg-dim);
    text-transform: uppercase;
  }

  .sidebar__search-input { padding: 0.5rem 0.75rem; }

  .sidebar__search-input input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 0.5px solid var(--border-mid);
    color: var(--fg);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 0.3rem 0.5rem;
    outline: none;
    transition: border-color 0.15s;
  }

  .sidebar__search-input input:focus { border-color: var(--grad-a); }

  ul { list-style: none; margin: 0; padding: 0.25rem 0; }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.22rem 0.875rem;
    background: none;
    border: none;
    color: var(--fg-muted);
    font-family: var(--font-mono);
    font-size: 0.775rem;
    text-align: left;
    cursor: pointer;
    transition: color 0.12s, background 0.12s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
  }

  button::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--gradient-line);
    opacity: 0;
    transition: opacity 0.15s;
  }

  button:hover, button:focus-visible {
    color: var(--fg);
    background: var(--bg-hover);
    outline: none;
  }

  button:focus-visible { outline: 1px solid var(--grad-a); outline-offset: -1px; }

  button.active {
    color: var(--fg);
    background: var(--bg-active);
  }

  button.active::before { opacity: 1; }

  .file-icon {
    font-size: 0.85rem;
    flex-shrink: 0;
    color: var(--fg-muted);
    transition: color 0.12s;
    line-height: 1;
    width: 1rem;
    text-align: center;
  }

  .icon-active {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>
