<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.post.title} — Trian Damai</title>
  <meta name="description" content={data.post.excerpt} />
</svelte:head>

<div class="post-header">
  <a href="/blog" class="back-link">← blog/</a>

  <div class="post-tags">
    {#each data.post.tags as tag}
      <span class="tag">{tag}</span>
    {/each}
    <span class="post-date">{data.post.date}</span>
  </div>

  <h1 class="post-title">{data.post.title}</h1>
  <p class="post-excerpt">{data.post.excerpt}</p>
</div>

<div class="post-body">
  <MarkdownRenderer content={data.content} />
</div>

<style>
  .post-header {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 720px;
    margin-bottom: 2.5rem;
    padding-bottom: 1.75rem;
    border-bottom: 0.5px solid var(--border);
  }

  .back-link {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--fg-muted);
    text-decoration: none;
    align-self: flex-start;
    transition: color 0.12s;
  }

  .back-link:hover { color: var(--fg); }

  .post-tags {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border: 0.5px solid var(--grad-a);
    color: var(--grad-a);
    padding: 0.1rem 0.45rem;
  }

  .post-date {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--fg-dim);
    margin-left: auto;
  }

  .post-title {
    font-family: var(--font-mono);
    font-size: 1.9rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    margin: 0;
  }

  .post-excerpt {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--fg-muted);
    margin: 0;
    max-width: 60ch;
  }

  .post-body {
    max-width: 720px;
  }
</style>
