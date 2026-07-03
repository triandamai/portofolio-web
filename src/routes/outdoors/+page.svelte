<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>outdoors.log — Trian Damai</title>
  <meta name="description" content="Trail log — hiking, trekking, and exploring wherever the trail goes." />
</svelte:head>

<div class="page-header">
  <div>
    <h1 class="page-title">outdoors.log</h1>
    <p class="page-sub">
      Trails, forests, summits, and places that don't have names on maps.
      The offline version of debugging — walk until the answer appears.
    </p>
  </div>
  <div class="header-stats">
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

<div class="logs">
  {#each data.trails as trail, i}
    <article class="log" class:log--right={i % 2 === 1}>

      <div class="log__header">
        <div class="log__meta">
          <span class="region-chip">{trail.region}</span>
          <span class="log__date">{trail.date}</span>
        </div>
        <h2 class="log__name">{trail.name}</h2>
        <div class="log__location">
          <span aria-hidden="true">◎</span>
          {trail.location}
        </div>
      </div>

      {#if trail.elevation || trail.distance}
        <div class="log__stats">
          {#if trail.elevation}<span class="stat-chip">↑ {trail.elevation}</span>{/if}
          {#if trail.distance}<span class="stat-chip">⟷ {trail.distance}</span>{/if}
        </div>
      {/if}

      <p class="log__desc">{trail.description}</p>

      <div class="gallery">
        {#if trail.photos.length > 0}
          {#each trail.photos as src, pi}
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              class="gallery__cell"
              class:gallery__cell--wide={pi === 0 && trail.photos.length >= 3}
              aria-label="Photo {pi + 1}"
            >
              <img {src} alt="Photo {pi + 1} from {trail.name}" loading="lazy" />
            </a>
          {/each}
        {:else}
          {#each { length: 4 } as _, pi}
            <div class="gallery__cell gallery__cell--placeholder" class:gallery__cell--wide={pi === 0} aria-hidden="true">
              <span class="placeholder__num">{String(pi + 1).padStart(2, '0')}</span>
              <span class="placeholder__label">photo</span>
            </div>
          {/each}
        {/if}
      </div>

      <div class="log__tags">
        {#each trail.tags as tag}
          <span class="tag">#{tag}</span>
        {/each}
      </div>

    </article>
  {/each}
</div>

<style>
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 3rem;
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
    max-width: 52ch;
  }

  .header-stats { display: flex; gap: 1.25rem; flex-shrink: 0; }

  .stat {
    display: flex; flex-direction: column; align-items: center;
    border: 0.5px solid var(--border);
    padding: 0.5rem 1rem;
    background: var(--bg-card);
    min-width: 4rem;
  }

  .stat__value {
    font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700;
    background: var(--gradient-text);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  .stat__label {
    font-family: var(--font-mono); font-size: 0.6rem;
    text-transform: uppercase; letter-spacing: 0.08em; color: var(--fg-muted);
  }

  /* ── Logs feed ── */
  .logs {
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .log {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 68%;
    border-left: 2px solid var(--grad-a);
    padding-left: 1.5rem;
  }

  .log--right {
    align-self: flex-end;
    border-left: none;
    border-right: 2px solid var(--grad-b);
    padding-left: 0;
    padding-right: 1.5rem;
    text-align: right;
  }

  /* ── Log header ── */
  .log__meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .log--right .log__meta { justify-content: flex-end; }

  .region-chip {
    font-family: var(--font-mono); font-size: 0.62rem;
    text-transform: uppercase; letter-spacing: 0.1em;
    border: 0.5px solid var(--grad-a); color: var(--grad-a);
    padding: 0.12rem 0.45rem;
  }

  .log__date {
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--fg-dim);
  }

  .log__name {
    font-family: var(--font-mono);
    font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em;
    background: var(--gradient-text);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin: 0; line-height: 1.2;
  }

  .log__location {
    display: flex; align-items: center; gap: 0.35rem;
    font-family: var(--font-mono); font-size: 0.75rem; color: var(--fg-muted);
  }

  .log--right .log__location { justify-content: flex-end; }

  /* ── Stats ── */
  .log__stats { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .log--right .log__stats { justify-content: flex-end; }

  .stat-chip {
    font-family: var(--font-mono); font-size: 0.68rem;
    color: var(--fg-muted); border: 0.5px solid var(--border);
    padding: 0.15rem 0.5rem; background: var(--bg-card);
  }

  /* ── Description ── */
  .log__desc {
    font-family: var(--font-sans); font-size: 0.9rem;
    line-height: 1.85; color: var(--fg-muted); margin: 0;
  }

  /* ── Gallery ── */
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 140px;
    gap: 0.4rem;
  }

  .gallery__cell {
    display: flex;
    overflow: hidden;
    border: 0.5px solid var(--border);
    transition: border-color 0.15s;
    text-decoration: none;
  }

  /* first photo spans 2 columns when there are 3+ photos */
  .gallery__cell--wide {
    grid-column: span 2;
  }

  .gallery__cell:hover { border-color: var(--grad-a); }

  .gallery__cell img {
    width: 100%; height: 100%;
    object-fit: cover; transition: transform 0.3s;
  }

  .gallery__cell:hover img { transform: scale(1.06); }

  /* placeholder cells */
  .gallery__cell--placeholder {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.3rem;
    background: var(--bg-card);
    border-style: dashed;
    position: relative;
    overflow: hidden;
  }

  .gallery__cell--placeholder::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--gradient-soft);
    opacity: 0.4;
    pointer-events: none;
  }

  .placeholder__num {
    font-family: var(--font-mono);
    font-size: 1.1rem;
    font-weight: 700;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.35;
  }

  .placeholder__label {
    font-family: var(--font-mono);
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--fg-dim);
    opacity: 0.5;
  }

  /* ── Tags ── */
  .log__tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
  .log--right .log__tags { justify-content: flex-end; }

  .tag {
    font-family: var(--font-mono); font-size: 0.62rem;
    color: var(--fg-dim); opacity: 0.7;
  }

  .tag:hover { opacity: 1; }

  /* ── Mobile ── */
  @media (max-width: 767px) {
    .log, .log--right {
      max-width: 100%;
      align-self: unset;
      border-left: 2px solid var(--grad-a);
      border-right: none;
      padding-left: 1.25rem;
      padding-right: 0;
      text-align: left;
    }

    .log--right .log__meta,
    .log--right .log__location,
    .log--right .log__stats,
    .log--right .log__tags { justify-content: flex-start; }

    .page-header { flex-direction: column; gap: 1rem; }
  }
</style>
