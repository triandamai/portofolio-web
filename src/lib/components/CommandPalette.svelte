<script lang="ts">
  import { goto } from '$app/navigation';
  import { commandPaletteStore, fuzzyMatch, type PaletteAction } from '$lib/stores/commandPalette.svelte';
  import { tabsStore, labelForPath } from '$lib/stores/tabs.svelte';
  import { themeStore, THEMES } from '$lib/stores/theme.svelte';
  import { PROJECTS, SNIPPETS } from '$lib/content/index';

  let inputEl = $state<HTMLInputElement | null>(null);
  let selectedIdx = $state(0);

  const actions: PaletteAction[] = [
    { id: 'nav-home',       label: 'welcome.md',        description: 'Go to welcome',     category: 'navigate', handler: () => nav('/'), keywords: ['home','start'] },
    { id: 'nav-about',      label: 'about.md',          description: 'About me',           category: 'navigate', handler: () => nav('/about') },
    { id: 'nav-experience', label: 'experience.json',   description: 'Work history',       category: 'navigate', handler: () => nav('/experience') },
    { id: 'nav-skills',     label: 'skills.ts',         description: 'Tech stack',         category: 'navigate', handler: () => nav('/skills') },
    { id: 'nav-projects',   label: 'projects/',         description: 'All projects',       category: 'navigate', handler: () => nav('/projects') },
    { id: 'nav-snippets',   label: 'snippets/',         description: 'Code snippets',      category: 'navigate', handler: () => nav('/snippets') },
    { id: 'nav-blog',       label: 'blog/',             description: 'Writing & posts',    category: 'navigate', handler: () => nav('/blog'), keywords: ['writing','posts','articles','blog'] },
    { id: 'nav-outdoors',   label: 'outdoors.log',      description: 'Hiking & trekking trails', category: 'navigate', handler: () => nav('/outdoors'), keywords: ['hiking','trekking','trails','outdoor','kalimantan'] },
    { id: 'nav-resume',     label: 'resume.pdf',        description: 'Download my resume', category: 'navigate', handler: () => nav('/resume'), keywords: ['resume','cv','download','pdf'] },
    { id: 'nav-contact',    label: 'contact.md',        description: 'Get in touch',       category: 'navigate', handler: () => nav('/contact') },
    ...PROJECTS.map(p => ({
      id: `project-${p.slug}`,
      label: `${p.slug}.md`,
      description: p.description,
      category: 'navigate' as const,
      handler: () => nav(`/projects/${p.slug}`),
      keywords: p.tech
    })),
    ...SNIPPETS.map(s => ({
      id: `snippet-${s.slug}`,
      label: s.filename,
      description: 'Code snippet',
      category: 'navigate' as const,
      handler: () => nav(`/snippets/${s.slug}`)
    })),
    {
      id: 'copy-email', label: 'Copy Email Address', description: 'triandamai@gmail.com',
      category: 'action', handler: () => { navigator.clipboard.writeText('triandamai@gmail.com'); commandPaletteStore.hide(); },
      keywords: ['contact','copy','email']
    },
    {
      id: 'resume', label: 'Download Resume', description: 'Open resume PDF',
      category: 'action', handler: () => { window.open('/resume.pdf','_blank'); commandPaletteStore.hide(); }
    },
    {
      id: 'github', label: 'Open GitHub', description: 'github.com/triandamai',
      category: 'external', handler: () => { window.open('https://github.com/triandamai','_blank'); commandPaletteStore.hide(); }
    },
    {
      id: 'linkedin', label: 'Open LinkedIn', description: 'linkedin.com/in/triandamai',
      category: 'external', handler: () => { window.open('https://linkedin.com/in/triandamai','_blank'); commandPaletteStore.hide(); }
    },
    ...THEMES.map(t => ({
      id: `theme-${t.id}`,
      label: `Theme: ${t.name}`,
      description: t.dark ? 'Dark theme' : 'Light theme',
      category: 'action' as const,
      handler: () => { themeStore.set(t.id); commandPaletteStore.hide(); },
      keywords: ['theme', 'color', 'appearance', t.dark ? 'dark' : 'light']
    }))
  ];

  const filtered = $derived(() => {
    const q = commandPaletteStore.query;
    return actions.filter(a =>
      fuzzyMatch(a.label, q) ||
      fuzzyMatch(a.description ?? '', q) ||
      (a.keywords ?? []).some(k => fuzzyMatch(k, q))
    );
  });

  $effect(() => {
    if (commandPaletteStore.open) {
      selectedIdx = 0;
      setTimeout(() => inputEl?.focus(), 10);
    }
    inputEl; // track binding
  });

  function nav(path: string) {
    tabsStore.open({ path, label: labelForPath(path) });
    goto(path);
    commandPaletteStore.hide();
  }

  function handleKeydown(e: KeyboardEvent) {
    const list = filtered();
    if (e.key === 'Escape') { commandPaletteStore.hide(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); selectedIdx = (selectedIdx + 1) % list.length; return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); selectedIdx = (selectedIdx - 1 + list.length) % list.length; return; }
    if (e.key === 'Enter' && list[selectedIdx]) { list[selectedIdx].handler(); return; }
  }

  const categoryIcon: Record<string, string> = { navigate: '→', action: '⚡', external: '↗' };
  const categoryColor: Record<string, string> = { navigate: 'var(--grad-a)', action: 'var(--grad-b)', external: '#4ade80' };
</script>

{#if commandPaletteStore.open}
  <div
    class="palette-backdrop"
    role="button"
    tabindex="0"
    aria-label="Close command palette"
    onclick={() => commandPaletteStore.hide()}
    onkeydown={(e) => { if (e.key === 'Escape') commandPaletteStore.hide(); }}
  >
    <div
      class="palette"
      role="dialog"
      tabindex="-1"
      aria-modal="true"
      aria-label="Command Palette"
      onclick={(e) => e.stopPropagation()}
      onkeydown={handleKeydown}
    >
      <div class="palette__search">
        <span class="palette__search-icon" aria-hidden="true">⌕</span>
        <input
          bind:this={inputEl!}
          type="text"
          class="palette__input"
          placeholder="Type a command or file name…"
          value={commandPaletteStore.query}
          oninput={(e) => { commandPaletteStore.setQuery((e.target as HTMLInputElement).value); selectedIdx = 0; }}
          aria-label="Search commands"
          autocomplete="off"
          spellcheck={false}
        />
        <kbd class="palette__esc">esc</kbd>
      </div>

      <ul class="palette__list" role="listbox">
        {#each filtered() as action, i (action.id)}
          <li role="option" aria-selected={i === selectedIdx}>
            <button
              class:selected={i === selectedIdx}
              onclick={() => action.handler()}
              onmouseenter={() => { selectedIdx = i; }}
              tabindex="-1"
            >
              <span class="palette__icon" style="color:{categoryColor[action.category]}" aria-hidden="true">
                {categoryIcon[action.category]}
              </span>
              <span class="palette__label">{action.label}</span>
              {#if action.description}
                <span class="palette__desc">{action.description}</span>
              {/if}
            </button>
          </li>
        {/each}
        {#if filtered().length === 0}
          <li class="palette__empty">No results for "{commandPaletteStore.query}"</li>
        {/if}
      </ul>

      <div class="palette__footer">
        <span>↑↓ navigate</span>
        <span>↵ open</span>
        <span>esc close</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .palette-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 14vh;
    z-index: 1000;
  }

  .palette {
    width: min(580px, 90vw);
    background: var(--bg-sidebar);
    /* gradient border via box-shadow trick */
    box-shadow:
      0 0 0 0.5px rgba(255,255,255,0.1),
      0 0 0 1px rgba(189,52,254,0.2),
      0 24px 64px rgba(0,0,0,0.8),
      var(--glow);
    display: flex;
    flex-direction: column;
    max-height: 60vh;
    overflow: hidden;
  }

  .palette__search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    border-bottom: 0.5px solid var(--border);
  }

  .palette__search-icon {
    color: var(--fg-muted);
    font-size: 1rem;
    flex-shrink: 0;
  }

  .palette__input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--fg);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    padding: 0.8rem 0;
    outline: none;
  }

  .palette__input::placeholder { color: var(--fg-muted); }

  .palette__esc {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--fg-muted);
    background: rgba(255,255,255,0.06);
    border: 0.5px solid var(--border);
    padding: 0.15rem 0.4rem;
    flex-shrink: 0;
  }

  .palette__list {
    list-style: none;
    margin: 0;
    padding: 0.375rem 0;
    overflow-y: auto;
    flex: 1;
  }

  li { display: flex; }

  li button {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
    padding: 0.4rem 1rem;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--fg-muted);
    background: none;
    border: none;
    text-align: left;
    transition: background 0.08s;
  }

  li button.selected { background: rgba(189,52,254,0.1); color: var(--fg); }
  li button:hover    { background: var(--bg-hover); }

  .palette__icon {
    width: 1rem;
    text-align: center;
    flex-shrink: 0;
    font-size: 0.75rem;
  }

  .palette__label { flex: 1; color: var(--fg); font-size: 0.82rem; }

  .palette__desc {
    color: var(--fg-muted);
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
  }

  .palette__empty {
    color: var(--fg-muted);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    font-style: italic;
  }

  .palette__footer {
    display: flex;
    gap: 1rem;
    padding: 0.4rem 1rem;
    border-top: 0.5px solid var(--border);
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--fg-dim);
  }
</style>
