<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { tick } from 'svelte';
  import { NAV_FILES } from '$lib/content/index';

  interface Heading { id: string; text: string; level: number; }

  let headings = $state<Heading[]>([]);
  let activeId = $state('');
  let scrollPct = $state(0);
  let observer: IntersectionObserver | null = null;

  function onEditorScroll(this: HTMLElement) {
    const { scrollTop, scrollHeight, clientHeight } = this;
    scrollPct = scrollHeight > clientHeight
      ? Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)
      : 0;
  }

  async function updateOutline() {
    await tick();
    observer?.disconnect();
    activeId = '';
    scrollPct = 0;

    const area = document.querySelector<HTMLElement>('.editor-area');
    if (!area) { headings = []; return; }

    area.removeEventListener('scroll', onEditorScroll);
    area.addEventListener('scroll', onEditorScroll, { passive: true });

    const els = Array.from(area.querySelectorAll<HTMLElement>('h2, h3')).filter(el => el.id);
    headings = els.map(el => ({
      id: el.id,
      text: el.textContent?.trim() ?? '',
      level: parseInt(el.tagName[1])
    }));

    if (headings.length === 0) return;
    activeId = headings[0].id;

    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId = (entry.target as HTMLElement).id;
      }
    }, { root: area, rootMargin: '0px 0px -55% 0px', threshold: 0 });

    els.forEach(el => observer!.observe(el));
  }

  $effect(() => {
    const _ = page.url.pathname;
    updateOutline();
    return () => {
      observer?.disconnect();
      document.querySelector<HTMLElement>('.editor-area')
        ?.removeEventListener('scroll', onEditorScroll);
    };
  });

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    activeId = id;
  }
</script>

<aside class="outline-panel" aria-label="Outline and Navigation">
  <!-- scroll progress bar -->
  <div class="scroll-progress" style="width:{scrollPct}%"></div>

  {#if headings.length > 0}
    <div class="section-label">OUTLINE</div>
    <nav aria-label="Page outline">
      <ul class="outline-list">
        {#each headings as h}
          <li>
            <button
              class="outline-btn"
              class:indent={h.level === 3}
              class:active={activeId === h.id}
              onclick={() => scrollTo(h.id)}
              title={h.text}
            >
              <span class="outline-indicator" aria-hidden="true"></span>
              {h.text}
            </button>
          </li>
        {/each}
      </ul>
    </nav>
    <div class="divider"></div>
  {/if}

  <div class="section-label">NAVIGATE</div>
  <ul class="nav-list">
    {#each NAV_FILES as file}
      <li>
        <button
          class="nav-btn"
          class:active={page.url.pathname === file.path}
          onclick={() => goto(file.path)}
          title={file.label}
        >
          {file.label}
        </button>
      </li>
    {/each}
  </ul>
</aside>

<style>
  .outline-panel {
    display: none;
  }

  @media (min-width: 1280px) {
    .outline-panel {
      width: 196px;
      flex-shrink: 0;
      background: var(--bg-sidebar);
      border-left: 0.5px solid var(--border);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      scrollbar-width: none;
    }
  }
  .outline-panel::-webkit-scrollbar { display: none; }

  .scroll-progress {
    position: sticky;
    top: 0;
    height: 1.5px;
    background: var(--gradient-line);
    max-width: 100%;
    transition: width 0.08s linear;
    flex-shrink: 0;
    z-index: 1;
  }

  .section-label {
    padding: 0.75rem 0.875rem 0.25rem;
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--fg-dim);
    position: sticky;
    top: 0;
    background: var(--bg-sidebar);
    z-index: 1;
  }

  .outline-list, .nav-list {
    list-style: none;
    padding: 0 0 0.375rem;
    margin: 0;
  }

  /* ── Outline buttons ── */
  .outline-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    width: 100%;
    padding: 0.2rem 0.875rem;
    background: none;
    border: none;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.12s, background 0.12s;
    position: relative;
  }

  .outline-btn.indent { padding-left: 1.5rem; }

  .outline-indicator {
    width: 1.5px;
    height: 0.75em;
    background: var(--gradient-line);
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.15s;
  }

  .outline-btn:hover,
  .outline-btn:focus-visible { color: var(--fg); background: var(--bg-hover); outline: none; }

  .outline-btn.active { color: var(--fg); }
  .outline-btn.active .outline-indicator { opacity: 1; }

  .outline-btn:focus-visible { outline: 1px solid var(--grad-a); outline-offset: -1px; }

  /* ── Nav buttons ── */
  .nav-btn {
    display: block;
    width: 100%;
    padding: 0.22rem 0.875rem;
    background: none;
    border: none;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.12s, background 0.12s;
  }

  .nav-btn:hover,
  .nav-btn:focus-visible { color: var(--fg); background: var(--bg-hover); outline: none; }

  .nav-btn.active { color: var(--fg); background: var(--bg-active); }

  .nav-btn:focus-visible { outline: 1px solid var(--grad-a); outline-offset: -1px; }

  .divider {
    height: 0.5px;
    background: var(--border);
    margin: 0.375rem 0;
    flex-shrink: 0;
  }
</style>
