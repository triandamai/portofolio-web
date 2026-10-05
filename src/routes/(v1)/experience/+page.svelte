<script lang="ts">
  let { data } = $props();
  let showRaw = $state(false);
</script>

<svelte:head>
  <title>experience.json — Trian Damai</title>
</svelte:head>

<div class="toolbar">
  <button class:active={!showRaw} onclick={() => { showRaw = false; }} aria-pressed={!showRaw}>Preview</button>
  <button class:active={showRaw}  onclick={() => { showRaw = true;  }} aria-pressed={showRaw}>Raw JSON</button>
</div>

{#if showRaw}
  <pre class="raw-view"><code>{data.raw}</code></pre>
{:else}
  <div class="experience-list">
    {#each data.entries as entry, i}
      <article class="entry">
        <!-- gradient left accent bar -->
        <div class="entry__accent" aria-hidden="true"></div>

        <div class="entry__body">
          <div class="entry__header">
            <div>
              <h2 class="entry__role">{entry.role}</h2>
              <div class="entry__company">{entry.company}</div>
            </div>
            <div class="entry__meta">
              <span class="entry__period">{entry.period}</span>
              <span class="entry__location">{entry.location}</span>
            </div>
          </div>
          <ul class="entry__highlights">
            {#each entry.highlights as h}
              <li>{h}</li>
            {/each}
          </ul>
        </div>
      </article>
    {/each}
  </div>
{/if}

<style>
  .toolbar {
    display: flex;
    margin-bottom: 2rem;
    border: 0.5px solid var(--border);
    width: fit-content;
    overflow: hidden;
  }

  .toolbar button {
    background: none;
    border: none;
    border-right: 0.5px solid var(--border);
    color: var(--fg-muted);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 0.3rem 0.875rem;
    cursor: pointer;
    transition: color 0.12s, background 0.12s;
  }

  .toolbar button:last-child { border-right: none; }

  .toolbar button.active {
    background: rgba(189,52,254,0.12);
    color: var(--fg);
  }

  .toolbar button:hover { color: var(--fg); background: var(--bg-hover); }
  .toolbar button:focus-visible { outline: 1px solid var(--grad-a); outline-offset: -1px; }

  .raw-view {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--fg);
    background: rgba(255,255,255,0.02);
    border: 0.5px solid var(--border);
    padding: 1.25rem;
    overflow-x: auto;
    line-height: 1.65;
    max-width: 800px;
  }

  .experience-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-width: 76ch;
  }

  .entry {
    display: flex;
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    transition: border-color 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }

  .entry:hover {
    border-color: var(--border-mid);
    box-shadow: var(--glow-card);
  }

  .entry__accent {
    width: 3px;
    background: var(--gradient-line);
    flex-shrink: 0;
  }

  .entry__body {
    padding: 1.25rem 1.5rem;
    flex: 1;
  }

  .entry__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .entry__role {
    font-family: var(--font-mono);
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--fg);
    margin: 0;
  }

  .entry__company {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    margin-top: 0.2rem;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
  }

  .entry__meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.2rem;
    flex-shrink: 0;
  }

  .entry__period, .entry__location {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
  }

  .entry__highlights {
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .entry__highlights li {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    line-height: 1.65;
    color: var(--fg-muted);
  }

  .entry__highlights li::marker { color: var(--grad-a); }
</style>
