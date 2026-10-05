<script lang="ts">
  import { onMount } from 'svelte';
  import { highlight } from '$lib/utils/highlight';
  let { data } = $props();

  let highlighted = $state('');
  let loading = $state(true);

  onMount(async () => {
    try {
      highlighted = await highlight(data.code, data.snippet.language);
    } catch {
      highlighted = '';
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{data.snippet.filename} — Trian Damai</title>
</svelte:head>

<div class="snippet-header">
  <div class="snippet-header__left">
    <span class="snippet-icon" aria-hidden="true">◈</span>
    <span class="snippet-filename">{data.snippet.filename}</span>
  </div>
  <span class="snippet-lang">{data.snippet.language}</span>
</div>

{#if loading}
  <div class="snippet-loading">
    <span class="loading-dots">···</span> Loading syntax highlighting
  </div>
{:else if highlighted}
  <div class="shiki-wrapper">{@html highlighted}</div>
{:else}
  <pre class="code-fallback"><code>{data.code}</code></pre>
{/if}

<style>
  .snippet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.875rem;
    background: rgba(255,255,255,0.025);
    border: 0.5px solid var(--border);
    border-bottom: none;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    max-width: 900px;
  }

  .snippet-header__left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .snippet-icon {
    font-size: 0.65rem;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .snippet-filename { color: var(--fg); font-weight: 600; }

  .snippet-lang {
    color: var(--fg-muted);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .snippet-loading {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--fg-muted);
    padding: 1.25rem;
    border: 0.5px solid var(--border);
    max-width: 900px;
    background: rgba(255,255,255,0.02);
  }

  .loading-dots {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .shiki-wrapper :global(pre) {
    margin: 0;
    padding: 1.25rem;
    border: 0.5px solid var(--border);
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    line-height: 1.65;
    max-width: 900px;
    background: rgba(255,255,255,0.02) !important;
  }

  .code-fallback {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    line-height: 1.65;
    color: var(--fg);
    background: rgba(255,255,255,0.02);
    border: 0.5px solid var(--border);
    padding: 1.25rem;
    overflow-x: auto;
    max-width: 900px;
  }
</style>
