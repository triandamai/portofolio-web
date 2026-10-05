<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>blog/ — Trian Damai</title>
  <meta name="description" content="Writing on Android, SvelteKit, Kotlin, Rust, and things I figured out the hard way." />
</svelte:head>

<div class="blog-page">
  <h1 class="page-title">blog/</h1>
  <p class="page-sub">
    Writing on Android, SvelteKit, Kotlin, Rust, and things I figured out the hard way.
  </p>

  <div class="post-list">
    {#each data.posts as post}
      <a href="/blog/{post.slug}" class="post-card">
        <div class="post-card__top">
          <div class="post-card__tags">
            {#each post.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
          <span class="post-card__date">{post.date}</span>
        </div>
        <h2 class="post-card__title">{post.title}</h2>
        <p class="post-card__excerpt">{post.excerpt}</p>
        <span class="post-card__read">read →</span>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-page { max-width: 720px; }

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
    font-size: 0.875rem;
    color: var(--fg-muted);
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }

  .post-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .post-card {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 1.5rem;
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    text-decoration: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    position: relative;
    overflow: hidden;
  }

  .post-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--gradient-line);
  }

  .post-card:hover {
    border-color: var(--border-mid);
    box-shadow: var(--glow-card);
  }

  .post-card:focus-visible {
    outline: 1px solid var(--grad-a);
    outline-offset: -1px;
  }

  .post-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .post-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border: 0.5px solid var(--grad-a);
    color: var(--grad-a);
    padding: 0.1rem 0.4rem;
  }

  .post-card__date {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--fg-dim);
    flex-shrink: 0;
  }

  .post-card__title {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--fg);
    margin: 0;
    transition: color 0.12s;
  }

  .post-card:hover .post-card__title {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .post-card__excerpt {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--fg-muted);
    line-height: 1.65;
    margin: 0;
  }

  .post-card__read {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    align-self: flex-start;
    margin-top: 0.25rem;
  }
</style>
