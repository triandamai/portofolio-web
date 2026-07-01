<svelte:head>
  <title>blog/ — Trian Damai</title>
  <meta name="description" content="Writing on Android, SvelteKit, Kotlin, and things I figured out the hard way." />
</svelte:head>

<div class="blog-page">
  <h1 class="page-title">blog/</h1>
  <p class="page-sub">
    Writing on Android, SvelteKit, Kotlin, and things I figured out the hard way.
  </p>

  <div class="empty-state">
    <div class="empty-state__icon" aria-hidden="true">◎</div>
    <p class="empty-state__label">// no posts yet</p>
    <p class="empty-state__hint">
      Working on it. First posts will cover Kotlin Coroutines patterns and
      building a production SvelteKit app from scratch.
    </p>
  </div>
</div>

<style>
  .blog-page {
    max-width: 720px;
  }

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
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 2.5rem;
    border: 0.5px solid var(--border);
    background: var(--bg-card);
    position: relative;
    overflow: hidden;
  }

  .empty-state::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--gradient-line);
    opacity: 0.5;
  }

  .empty-state__icon {
    font-size: 1.5rem;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  .empty-state__label {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--fg-muted);
    letter-spacing: 0.04em;
  }

  .empty-state__hint {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--fg-muted);
    line-height: 1.65;
    max-width: 48ch;
  }
</style>
