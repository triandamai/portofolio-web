<script lang="ts">
  import { goto } from '$app/navigation';
  import { tabsStore } from '$lib/stores/tabs.svelte';
  let { data } = $props();

  function openSnippet(slug: string, filename: string) {
    tabsStore.open({ path: `/snippets/${slug}`, label: filename });
    goto(`/snippets/${slug}`);
  }
</script>

<svelte:head>
  <title>snippets/ — Trian Damai</title>
</svelte:head>

<h1 class="page-title">snippets/</h1>
<p class="page-sub">Utility functions and patterns I keep coming back to.</p>

<ul class="snippet-list">
  {#each data.snippets as snippet}
    <li>
      <button class="snippet-card" onclick={() => openSnippet(snippet.slug, snippet.filename)}>
        <span class="snippet-icon" aria-hidden="true">◈</span>
        <span class="snippet-filename">{snippet.filename}</span>
        <span class="snippet-lang">{snippet.language}</span>
        <span class="snippet-arrow" aria-hidden="true">→</span>
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

  .snippet-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; max-width: 520px; }

  .snippet-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    cursor: pointer;
    text-align: left;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    transition: border-color 0.15s, box-shadow 0.15s, transform 0.12s;
    position: relative;
    overflow: hidden;
  }

  .snippet-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1.5px;
    background: var(--gradient-line);
    opacity: 0;
    transition: opacity 0.15s;
  }

  .snippet-card:hover, .snippet-card:focus-visible {
    border-color: rgba(189,52,254,0.3);
    box-shadow: var(--glow);
    transform: translateX(3px);
    outline: none;
  }

  .snippet-card:hover::before, .snippet-card:focus-visible::before { opacity: 1; }

  .snippet-icon {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 0.7rem;
    flex-shrink: 0;
  }

  .snippet-filename { flex: 1; color: var(--fg); }

  .snippet-lang {
    color: var(--fg-muted);
    font-size: 0.68rem;
  }

  .snippet-arrow {
    color: var(--fg-muted);
    font-size: 0.72rem;
    transition: color 0.12s, transform 0.12s;
  }

  .snippet-card:hover .snippet-arrow {
    color: var(--grad-b);
    transform: translateX(3px);
  }
</style>
