<script lang="ts">
  import { goto } from '$app/navigation';
  import { tabsStore } from '$lib/stores/tabs.svelte';
  let { data } = $props();

  function openProject(slug: string) {
    const path = `/projects/${slug}`;
    tabsStore.open({ path, label: `${slug}.md` });
    goto(path);
  }
</script>

<svelte:head>
  <title>projects/ — Trian Damai</title>
</svelte:head>

<h1 class="page-title">projects/</h1>
<p class="page-sub">Click a project to open it in the editor.</p>

<ul class="project-list">
  {#each data.projects as project, i}
    <li>
      <button class="project-card" onclick={() => openProject(project.slug)}>
        <!-- gradient top border on hover via pseudo-element -->
        <div class="project-card__inner">
          <div class="project-card__header">
            <span class="project-card__filename">◆ {project.slug}.md</span>
            <span class="project-card__year">{project.year}</span>
          </div>
          <h2 class="project-card__title">{project.title}</h2>
          <p class="project-card__desc">{project.description}</p>
          <div class="project-card__tech">
            {#each project.tech as t}
              <span class="tech-tag">{t}</span>
            {/each}
          </div>
          <div class="project-card__cta">Open file →</div>
        </div>
      </button>
    </li>
  {/each}
</ul>

<style>
  .page-title {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 0.375rem;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .page-sub {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--fg-muted);
    margin-bottom: 2rem;
  }

  .project-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 1rem;
    max-width: 960px;
  }

  .project-card {
    display: block;
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
  }

  .project-card__inner {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    padding: 1.375rem 1.5rem 1.25rem;
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    height: 100%;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  }

  /* gradient top accent, revealed on hover */
  .project-card__inner::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1.5px;
    background: var(--gradient-line);
    opacity: 0;
    transition: opacity 0.2s;
  }

  /* ambient glow background */
  .project-card__inner::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-soft);
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }

  .project-card:hover .project-card__inner,
  .project-card:focus-visible .project-card__inner {
    border-color: rgba(189,52,254,0.3);
    box-shadow: var(--glow-card), var(--glow);
    transform: translateY(-2px);
  }

  .project-card:hover .project-card__inner::before,
  .project-card:focus-visible .project-card__inner::before { opacity: 1; }

  .project-card:hover .project-card__inner::after,
  .project-card:focus-visible .project-card__inner::after  { opacity: 1; }

  .project-card:focus-visible .project-card__inner {
    outline: 1px solid var(--grad-a);
  }

  .project-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .project-card__filename {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
  }

  .project-card__year {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--fg-muted);
  }

  .project-card__title {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--fg);
    position: relative;
    z-index: 1;
  }

  .project-card__desc {
    font-family: var(--font-sans);
    font-size: 0.82rem;
    color: var(--fg-muted);
    line-height: 1.55;
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .project-card__tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    position: relative;
    z-index: 1;
  }

  .tech-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--fg-dim);
    border: 0.5px solid var(--border);
    padding: 0.1rem 0.45rem;
    background: rgba(255,255,255,0.025);
  }

  .project-card__cta {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--fg-muted);
    transition: color 0.15s;
    position: relative;
    z-index: 1;
    margin-top: 0.25rem;
  }

  .project-card:hover .project-card__cta {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>
