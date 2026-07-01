<script lang="ts">
  import type { Trail } from '$lib/content/outdoors';
  let { data } = $props();

  let activeRegion = $state<string | null>(null);

  const filtered = $derived(
    activeRegion ? data.trails.filter(t => t.region === activeRegion) : data.trails
  );
</script>

<svelte:head>
  <title>outdoors.log — Trian Damai</title>
  <meta name="description" content="Trail log — hiking and trekking across Kalimantan and Java." />
</svelte:head>

<div class="page-header">
  <div class="page-header__text">
    <h1 class="page-title">outdoors.log</h1>
    <p class="page-sub">
      Trails, forests, islands, and summits. Mostly Kalimantan, increasingly Java.
      The offline version of debugging — walk until the answer appears.
    </p>
  </div>
  <div class="page-header__stats">
    <div class="stat">
      <span class="stat__value">{data.trails.length}</span>
      <span class="stat__label">entries</span>
    </div>
    <div class="stat">
      <span class="stat__value">{data.regions.length}</span>
      <span class="stat__label">regions</span>
    </div>
  </div>
</div>

<!-- Region filter -->
<div class="filter-row" role="group" aria-label="Filter by region">
  <button
    class="filter-chip"
    class:active={activeRegion === null}
    onclick={() => { activeRegion = null; }}
  >All</button>
  {#each data.regions as region}
    <button
      class="filter-chip"
      class:active={activeRegion === region}
      onclick={() => { activeRegion = region; }}
    >{region}</button>
  {/each}
</div>

<!-- Trail list -->
<div class="trail-list">
  {#each filtered as trail (trail.id)}
    <article class="trail-card">
      <div class="trail-card__accent"></div>
      <div class="trail-card__body">

        <div class="trail-card__top">
          <div class="trail-card__title-row">
            <h2 class="trail-card__name">{trail.name}</h2>
            <span class="trail-card__date">{trail.date}</span>
          </div>
          <div class="trail-card__location">
            <span class="location-icon" aria-hidden="true">◎</span>
            {trail.location}
          </div>
        </div>

        {#if trail.elevation || trail.distance}
          <div class="trail-card__meta">
            {#if trail.elevation}
              <span class="meta-chip">↑ {trail.elevation}</span>
            {/if}
            {#if trail.distance}
              <span class="meta-chip">⟷ {trail.distance}</span>
            {/if}
          </div>
        {/if}

        <p class="trail-card__desc">{trail.description}</p>

        <div class="trail-card__footer">
          <div class="trail-card__tags">
            {#each trail.tags as tag}
              <span class="trail-tag">#{tag}</span>
            {/each}
          </div>
          <a href="/outdoors/{trail.id}" class="trail-open-btn">open →</a>
        </div>

      </div>
    </article>
  {/each}
</div>

<style>
  /* ── Header ── */
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 1.75rem;
    flex-wrap: wrap;
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
    font-size: 0.85rem;
    color: var(--fg-muted);
    line-height: 1.6;
    max-width: 56ch;
  }

  .page-header__stats {
    display: flex;
    gap: 1.25rem;
    flex-shrink: 0;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 0.5px solid var(--border);
    padding: 0.5rem 1rem;
    background: var(--bg-card);
    min-width: 4rem;
  }

  .stat__value {
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 700;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat__label {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--fg-muted);
  }

  /* ── Filter chips ── */
  .filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 1.75rem;
  }

  .filter-chip {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 0.25rem 0.75rem;
    background: none;
    border: 0.5px solid var(--border);
    color: var(--fg-muted);
    cursor: pointer;
    transition: color 0.12s, border-color 0.12s, background 0.12s;
  }

  .filter-chip:hover {
    color: var(--fg);
    border-color: var(--border-mid);
  }

  .filter-chip:focus-visible {
    outline: 1px solid var(--grad-a);
    outline-offset: -1px;
  }

  .filter-chip.active {
    color: var(--fg);
    border-color: var(--grad-a);
    background: var(--bg-active);
  }

  /* ── Trail list ── */
  .trail-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 800px;
  }

  .trail-card {
    display: flex;
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    transition: border-color 0.2s, box-shadow 0.2s;
    overflow: hidden;
  }

  .trail-card:hover {
    border-color: var(--border-mid);
    box-shadow: var(--glow-card);
  }

  .trail-card__accent {
    width: 3px;
    flex-shrink: 0;
    background: var(--gradient-line);
  }

  .trail-card__body {
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
  }

  /* Top row */
  .trail-card__top { display: flex; flex-direction: column; gap: 0.25rem; }

  .trail-card__title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .trail-card__name {
    font-family: var(--font-mono);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--fg);
    margin: 0;
  }

  .trail-card__date {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
    flex-shrink: 0;
  }

  .trail-card__location {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .location-icon {
    font-size: 0.65rem;
    -webkit-text-fill-color: var(--grad-a);
    flex-shrink: 0;
  }

  /* Meta chips (elevation, distance) */
  .trail-card__meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .meta-chip {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
    border: 0.5px solid var(--border);
    padding: 0.15rem 0.5rem;
    background: var(--bg-sidebar);
  }

  /* Description */
  .trail-card__desc {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    line-height: 1.7;
    color: var(--fg-muted);
    margin: 0;
  }

  /* Footer row */
  .trail-card__footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* Tags */
  .trail-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .trail-tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--fg-muted);
    opacity: 0.7;
  }

  .trail-tag:hover { opacity: 1; }

  /* Open link */
  .trail-open-btn {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-decoration: none;
    flex-shrink: 0;
    transition: opacity 0.12s;
  }

  .trail-open-btn:hover { opacity: 0.75; }

  @media (max-width: 600px) {
    .trail-card__body { padding: 1rem; }
    .page-header { flex-direction: column; gap: 1rem; }
  }
</style>
