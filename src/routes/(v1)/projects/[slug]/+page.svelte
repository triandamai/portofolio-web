<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.project.title} — Trian Damai</title>
  <meta name="description" content={data.project.description} />
</svelte:head>

<div class="project-meta">
  {#each data.project.tech as t}
    <span class="tech-tag">{t}</span>
  {/each}
  {#if data.project.repo}
    <a href={data.project.repo} target="_blank" rel="noopener noreferrer" class="meta-link">↗ GitHub</a>
  {/if}
  {#if data.project.demo}
    <a href={data.project.demo} target="_blank" rel="noopener noreferrer" class="meta-link">↗ Demo</a>
  {/if}
</div>

<MarkdownRenderer content={data.content} />

<style>
  .project-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1.75rem;
    padding-bottom: 1rem;
    border-bottom: 0.5px solid var(--border);
  }

  .tech-tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
    border: 0.5px solid var(--border);
    padding: 0.15rem 0.5rem;
    background: rgba(255,255,255,0.025);
  }

  .meta-link {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-decoration: none;
    padding: 0.15rem 0.6rem;
    border: 0.5px solid var(--grad-a);
    transition: background 0.12s, color 0.12s;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }

  .meta-link:hover {
    background: rgba(189,52,254,0.1);
    -webkit-text-fill-color: var(--fg);
  }
</style>
