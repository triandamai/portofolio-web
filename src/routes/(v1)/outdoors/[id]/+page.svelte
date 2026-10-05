<script lang="ts">
  import { onMount } from 'svelte';
  import { autoplaySignal } from '$lib/stores/music';

  let { data } = $props();
  const { trail } = data;

  const PHOTO_COUNT = 6;

  onMount(() => {
    autoplaySignal.set(true);
  });
</script>

<svelte:head>
  <title>{trail.name} — outdoors.log</title>
  <meta name="description" content={trail.description} />
</svelte:head>

<div class="detail">

  <!-- Back link -->
  <a href="/outdoors" class="back-link">← outdoors.log</a>

  <!-- Header -->
  <header class="trail-header">
    <div class="trail-header__meta">
      <span class="region-chip">{trail.region}</span>
      <span class="trail-date">{trail.date}</span>
    </div>
    <h1 class="trail-name">{trail.name}</h1>
    <div class="trail-location">
      <span class="location-dot" aria-hidden="true">◎</span>
      {trail.location}
    </div>
  </header>

  <!-- Stats strip -->
  {#if trail.elevation || trail.distance}
    <div class="stats-strip">
      {#if trail.elevation}
        <div class="stat-block">
          <span class="stat-label">elevation</span>
          <span class="stat-value">↑ {trail.elevation}</span>
        </div>
      {/if}
      {#if trail.distance}
        <div class="stat-block">
          <span class="stat-label">distance</span>
          <span class="stat-value">⟷ {trail.distance}</span>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Description -->
  <p class="trail-desc">{trail.description}</p>

  <!-- Tags -->
  <div class="tags-row">
    {#each trail.tags as tag}
      <span class="tag">#{tag}</span>
    {/each}
  </div>

  <!-- Photos -->
  <section class="photos-section">
    <div class="photos-header">
      <span class="photos-label">// photos</span>
      {#if trail.photos.length === 0}
        <span class="photos-hint">coming soon</span>
      {/if}
    </div>

    {#if trail.photos.length > 0}
      <div class="photo-grid">
        {#each trail.photos as src, i}
          <a href={src} target="_blank" rel="noopener noreferrer" class="photo-cell" aria-label="Photo {i + 1}">
            <img {src} alt="Trail photo {i + 1} from {trail.name}" loading="lazy" />
          </a>
        {/each}
      </div>
    {:else}
      <div class="photo-grid">
        {#each { length: PHOTO_COUNT } as _, i}
          <div class="photo-placeholder" aria-hidden="true">
            <span class="photo-placeholder__icon">📷</span>
            <span class="photo-placeholder__num">{String(i + 1).padStart(2, '0')}</span>
          </div>
        {/each}
      </div>
    {/if}
  </section>

</div>

<style>
  .detail {
    max-width: 720px;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  /* ── Back link ── */
  .back-link {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--fg-muted);
    text-decoration: none;
    transition: color 0.12s;
    align-self: flex-start;
  }

  .back-link:hover { color: var(--fg); }

  /* ── Header ── */
  .trail-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .trail-header__meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .region-chip {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 0.5px solid var(--grad-a);
    color: var(--grad-a);
    padding: 0.15rem 0.5rem;
  }

  .trail-date {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
  }

  .trail-name {
    font-family: var(--font-mono);
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.15;
    margin: 0;
  }

  .trail-location {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--fg-muted);
  }

  .location-dot {
    color: var(--grad-a);
    font-size: 0.7rem;
  }

  /* ── Stats strip ── */
  .stats-strip {
    display: flex;
    gap: 1px;
    background: var(--border);
    border: 0.5px solid var(--border);
    overflow: hidden;
    align-self: flex-start;
  }

  .stat-block {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 1.25rem;
    background: var(--bg-card);
    gap: 0.2rem;
    min-width: 8rem;
  }

  .stat-label {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--fg-muted);
  }

  .stat-value {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Description ── */
  .trail-desc {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--fg-muted);
    margin: 0;
  }

  /* ── Tags ── */
  .tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
    border: 0.5px solid var(--border);
    padding: 0.2rem 0.5rem;
    background: var(--bg-card);
  }

  /* ── Photos ── */
  .photos-section {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }

  .photos-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .photos-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--fg-dim);
    letter-spacing: 0.03em;
  }

  .photos-hint {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--fg-dim);
    font-style: italic;
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .photo-cell {
    display: block;
    aspect-ratio: 4/3;
    overflow: hidden;
    border: 0.5px solid var(--border);
    transition: border-color 0.15s;
  }

  .photo-cell:hover { border-color: var(--grad-a); }

  .photo-cell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.25s;
  }

  .photo-cell:hover img { transform: scale(1.05); }

  .photo-placeholder {
    aspect-ratio: 4/3;
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    position: relative;
    overflow: hidden;
  }

  .photo-placeholder::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-line);
    opacity: 0.03;
  }

  .photo-placeholder__icon {
    font-size: 1.25rem;
    opacity: 0.3;
  }

  .photo-placeholder__num {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: var(--fg-dim);
    letter-spacing: 0.08em;
  }

  @media (max-width: 600px) {
    .trail-name { font-size: 1.3rem; }
    .photo-grid { grid-template-columns: repeat(2, 1fr); }
    .stats-strip { align-self: stretch; }
    .stat-block { min-width: 0; flex: 1; }
  }
</style>
