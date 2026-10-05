<script lang="ts">
  import { Button, Card, Chip, Icon, Prose, Shape } from '$lib/v2';
  import { projectHost } from '$lib/v2/content';

  let { data } = $props();
  const p = $derived(data.project);
</script>

<svelte:head>
  <title>{p.title} · Trian Damai</title>
  <meta name="description" content={p.description} />
</svelte:head>

<article>
  <header class="head">
    <a class="back" href="/projects"><Icon name="arrow_back" size={20} />All projects</a>
    <div class="row">
      <div class="titles">
        <span class="file">projects/{p.slug}.md · {p.year}</span>
        <h1>{p.title}</h1>
        <p class="desc">{p.description}</p>
      </div>
      <div class="mark"><Shape name="clover4" size="100%" color="var(--hero-ink)" motion="spin" speed={40} /></div>
    </div>
    <div class="chips">{#each p.tech as t (t)}<Chip>{t}</Chip>{/each}</div>
    <div class="actions">
      {#if p.demo}<Button variant="ink" size="md" icon="open_in_new" href={p.demo} target="_blank" rel="noopener noreferrer">Visit {projectHost(p)}</Button>{/if}
      {#if p.repo}<Button variant="ink-outline" size="md" icon="code" href={p.repo} target="_blank" rel="noopener noreferrer">Source</Button>{/if}
    </div>
  </header>

  <Prose content={data.content} />

  <Card href="/projects/{data.next.slug}" variant="filled" radius="var(--r-xl) var(--r-xl) var(--r-xl) var(--r-sm)" class="next">
    <span class="next-k">Next project</span>
    <span class="next-t">{data.next.title} <Icon name="arrow_forward" /></span>
  </Card>
</article>

<style>
  article { display: flex; flex-direction: column; gap: 40px; min-width: 0; }
  .head {
    background: var(--grad); color: var(--hero-ink);
    border-radius: var(--r-xxl) var(--r-xxl) var(--r-xxl) var(--r-md);
    padding: clamp(24px, 4vw, 48px); display: flex; flex-direction: column; gap: 20px;
  }
  .back { display: inline-flex; align-items: center; gap: 6px; font: 600 14px/1 var(--font-body); text-decoration: none; width: fit-content; }
  .back:hover { text-decoration: underline; }
  .row { display: grid; grid-template-columns: minmax(0, 1fr) 120px; gap: 24px; align-items: end; }
  .file { font: 600 13px/1 var(--font-mono); }
  h1 {
    font-family: var(--font-display); font-size: clamp(2.6rem, 8vw, 6rem); line-height: .9; letter-spacing: -.03em; margin-top: 12px;
    font-weight: 900; font-variation-settings: 'wdth' 35, 'opsz' 144, 'wght' 900; overflow-wrap: anywhere;
  }
  .desc { margin-top: 14px; font-size: 18px; max-width: 52ch; }
  .mark { width: 120px; aspect-ratio: 1; display: grid; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chips :global(.chip) { color: var(--hero-ink); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hero-ink) 35%, transparent); }
  .actions { display: flex; gap: 8px; flex-wrap: wrap; }
  article :global(.next) { padding: 24px 28px; gap: 6px; max-width: 520px; }
  .next-k { font: 600 12px/1 var(--font-mono); color: var(--on-surface-v); }
  .next-t { display: flex; align-items: center; gap: 8px; font-family: var(--font-display); font-size: 28px; font-weight: 750; font-variation-settings: 'wdth' 80, 'wght' 750; }
  @media (max-width: 840px) {
    .row { grid-template-columns: minmax(0, 1fr); }
    .mark { display: none; }
    .head { border-radius: var(--r-xl); }
  }
</style>
