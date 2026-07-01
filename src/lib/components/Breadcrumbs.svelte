<script lang="ts">
  import { page } from '$app/state';

  const breadcrumbs = $derived(() => {
    const parts = page.url.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return [{ label: 'welcome.md', path: '/' as string | null }];

    const crumbs: { label: string; path: string | null }[] = [
      { label: 'src', path: null },
      { label: 'portfolio', path: null }
    ];
    for (let i = 0; i < parts.length; i++) {
      const path = '/' + parts.slice(0, i + 1).join('/');
      const label = i === parts.length - 1
        ? labelForSegment(parts[i], parts[i - 1])
        : parts[i];
      crumbs.push({ label, path });
    }
    return crumbs;
  });

  function labelForSegment(segment: string, parent?: string): string {
    const map: Record<string, string> = {
      about: 'about.md', experience: 'experience.json', skills: 'skills.ts',
      projects: 'projects', snippets: 'snippets', contact: 'contact.md'
    };
    if (parent === 'projects') return `${segment}.md`;
    if (parent === 'snippets') return `${segment}.ts`;
    return map[segment] ?? segment;
  }
</script>

<div class="breadcrumbs" aria-label="Breadcrumbs">
  {#each breadcrumbs() as crumb, i}
    {#if i > 0}<span class="sep" aria-hidden="true">›</span>{/if}
    {#if crumb.path}
      <a href={crumb.path} class="crumb crumb--link">{crumb.label}</a>
    {:else}
      <span class="crumb">{crumb.label}</span>
    {/if}
  {/each}
</div>

<style>
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.25rem 0.875rem;
    background: var(--bg-editor);
    border-bottom: 0.5px solid var(--border);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
    flex-shrink: 0;
    position: relative;
    z-index: 7;
  }

  .crumb { color: var(--fg-muted); }

  .crumb--link {
    text-decoration: none;
    transition: color 0.12s;
  }

  .crumb--link:hover, .crumb--link:focus-visible {
    color: var(--fg);
    outline: none;
  }

  .crumb--link:focus-visible { outline: 1px solid var(--grad-a); outline-offset: 1px; }

  /* Last crumb gets gradient treatment */
  .crumb:last-child {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
  }

  .sep { opacity: 0.3; color: var(--fg-muted); }
</style>
