<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>skills.ts — Trian Damai</title>
</svelte:head>

<h1 class="page-title">skills.ts</h1>
<p class="page-sub">Tools and technologies across work, side projects, and general curiosity.</p>

<!-- Languages strip -->
<section class="lang-section">
  <div class="lang-header">
    <span class="lang-label">// languages</span>
  </div>
  <ul class="lang-list">
    {#each data.languages as lang}
      <li class="lang-chip" title={lang.note}>
        <span class="lang-chip__name">{lang.name}</span>
        <span class="lang-chip__note">{lang.note}</span>
      </li>
    {/each}
  </ul>
</section>

<!-- Grouped skill list -->
<div class="skill-sections">
  {#each data.skillGroups as group}
    <section class="skill-section">
      <div class="skill-section__header">
        <h2 class="skill-section__title">{group.category}</h2>
        <p class="skill-section__desc">{group.description}</p>
      </div>

      <ul class="skill-list">
        {#each group.skills as skill}
          <li class="skill-row">
            <div class="skill-row__left">
              <span class="skill-row__name">{skill.name}</span>
              <span class="skill-row__note">{skill.note}</span>
            </div>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</div>

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
    max-width: 64ch;
  }

  /* ── Languages strip ── */
  .lang-section {
    margin-bottom: 2.5rem;
    max-width: 760px;
  }

  .lang-header {
    margin-bottom: 0.75rem;
  }

  .lang-label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--fg-muted);
    letter-spacing: 0.05em;
  }

  .lang-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .lang-chip {
    position: relative;
    cursor: default;
  }

  .lang-chip__name {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.775rem;
    font-weight: 600;
    padding: 0.3rem 0.75rem;
    border: 0.5px solid var(--border-mid);
    background: var(--bg-card);
    color: var(--fg);
    /* explicitly prevent hover state from bleeding into base state */
    -webkit-text-fill-color: currentColor;
    -webkit-background-clip: border-box;
    background-clip: border-box;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
    white-space: nowrap;
  }

  .lang-chip:hover .lang-chip__name {
    border-color: var(--grad-a);
    background: var(--gradient-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* tooltip-style note */
  .lang-chip__note {
    display: none;
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-family: var(--font-sans);
    font-size: 0.68rem;
    color: var(--fg);
    background: var(--bg-sidebar);
    border: 0.5px solid var(--border-mid);
    padding: 0.3rem 0.625rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    z-index: 10;
    pointer-events: none;
  }

  .lang-chip:hover .lang-chip__note {
    display: block;
  }

  /* ── Sections ── */
  .skill-sections {
    display: flex;
    flex-direction: column;
    gap: 2.25rem;
    max-width: 760px;
  }

  .skill-section__header {
    margin-bottom: 0.625rem;
    padding-bottom: 0.5rem;
    border-bottom: 0.5px solid var(--border);
    display: flex;
    align-items: baseline;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .skill-section__title {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .skill-section__desc {
    font-family: var(--font-sans);
    font-size: 0.775rem;
    color: var(--fg-muted);
    line-height: 1.45;
  }

  /* ── Skill rows ── */
  .skill-list { list-style: none; }

  .skill-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.55rem 0.75rem;
    border-bottom: 0.5px solid var(--border);
    transition: background 0.1s;
    position: relative;
  }

  .skill-row:first-child { border-top: 0.5px solid var(--border); }

  .skill-row::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 0;
    background: var(--gradient-line);
    opacity: 0;
    transition: width 0.15s, opacity 0.15s;
  }

  .skill-row:hover { background: var(--bg-hover); }
  .skill-row:hover::before { width: 2px; opacity: 1; }

  .skill-row__left {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    flex: 1;
    min-width: 0;
    flex-wrap: wrap;
  }

  .skill-row__name {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--fg);
    white-space: nowrap;
    flex-shrink: 0;
    min-width: 140px;
  }

  .skill-row__note {
    font-family: var(--font-sans);
    font-size: 0.775rem;
    color: var(--fg-muted);
    line-height: 1.45;
  }

  @media (max-width: 600px) {
    .skill-row__left { flex-direction: column; gap: 0.2rem; }
    .skill-row__name { min-width: unset; }
  }
</style>
