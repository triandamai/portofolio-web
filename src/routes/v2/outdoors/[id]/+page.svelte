<script lang="ts">
  import { Card, Chip, Icon, Shape } from '$lib/v2';
  import { meters } from '$lib/v2/outdoors';

  let { data } = $props();
  const trail = $derived(data.trail);
  const elevation = $derived(meters(trail));

  // The log is one long string; break it into readable paragraphs every few sentences.
  const paragraphs = $derived.by(() => {
    const sentences = trail.description.match(/[^.!?]+[.!?]+["”’)]*\s*/g) ?? [trail.description];
    const out: string[] = [];
    for (let i = 0; i < sentences.length; i += 4) out.push(sentences.slice(i, i + 4).join('').trim());
    return out;
  });
</script>

<svelte:head>
  <title>{trail.name} · outdoors.log · Trian Damai</title>
  <meta name="description" content={trail.description.slice(0, 155)} />
</svelte:head>

<article>
  <header class="head">
    <a class="back" href="/v2/outdoors"><Icon name="arrow_back" size={20} />outdoors.log</a>
    <div class="row">
      <div class="titles">
        <span class="meta">{trail.region} · {trail.date}</span>
        <h1>{trail.name}</h1>
        <p class="loc"><Icon name="location_on" size={20} />{trail.location}</p>
      </div>
      <div class="mark"><Shape name={elevation ? 'gem' : 'flower'} size="100%" color="var(--hero-ink)" motion="breathe" speed={6} /></div>
    </div>
    {#if trail.elevation || trail.distance}
      <dl class="stats">
        {#if trail.elevation}<div><dt>summit</dt><dd>{trail.elevation}</dd></div>{/if}
        {#if trail.distance}<div><dt>round trip</dt><dd>{trail.distance}</dd></div>{/if}
      </dl>
    {/if}
  </header>

  <div class="log">
    {#each paragraphs as p, i (i)}<p class:lead={i === 0}>{p}</p>{/each}
  </div>

  <div class="chips">{#each trail.tags as tag (tag)}<Chip>#{tag}</Chip>{/each}</div>

  <nav class="pager" aria-label="More trails">
    {#if data.prev}
      <Card href="/v2/outdoors/{data.prev.id}" radius="var(--r-xl) var(--r-sm) var(--r-sm) var(--r-xl)" class="pg">
        <span class="k"><Icon name="arrow_back" size={18} />Earlier trip</span><span class="t">{data.prev.name}</span>
      </Card>
    {:else}<span></span>{/if}
    {#if data.next}
      <Card href="/v2/outdoors/{data.next.id}" radius="var(--r-sm) var(--r-xl) var(--r-xl) var(--r-sm)" class="pg next">
        <span class="k">Next trip<Icon name="arrow_forward" size={18} /></span><span class="t">{data.next.name}</span>
      </Card>
    {/if}
  </nav>
</article>

<style>
  article { display: flex; flex-direction: column; gap: 32px; min-width: 0; }
  .head { background: var(--grad); color: var(--hero-ink); border-radius: var(--r-xxl) var(--r-xxl) var(--r-xxl) var(--r-md); padding: clamp(24px, 4vw, 48px); display: flex; flex-direction: column; gap: 20px; }
  .back { display: inline-flex; align-items: center; gap: 6px; font: 600 14px/1 var(--font-mono); text-decoration: none; width: fit-content; }
  .back:hover { text-decoration: underline; }
  .row { display: grid; grid-template-columns: minmax(0, 1fr) 120px; gap: 24px; align-items: end; }
  .meta { font: 600 13px/1 var(--font-mono); }
  h1 { font-family: var(--font-display); font-size: clamp(2.6rem, 8vw, 6rem); line-height: .9; letter-spacing: -.03em; margin-top: 12px; font-weight: 900; font-variation-settings: 'wdth' 35, 'opsz' 144, 'wght' 900; overflow-wrap: anywhere; }
  .loc { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 18px; }
  .mark { width: 120px; aspect-ratio: 1; display: grid; }
  .stats { margin: 0; display: flex; gap: 4px; flex-wrap: wrap; }
  .stats div { background: color-mix(in srgb, var(--hero-paper) 55%, transparent); padding: 12px 18px; border-radius: var(--r-lg); min-width: 140px; }
  dt { font: 600 11px/1 var(--font-mono); text-transform: uppercase; letter-spacing: .05em; opacity: .75; }
  dd { margin: 6px 0 0; font-family: var(--font-display); font-size: 28px; font-weight: 800; font-variation-settings: 'wdth' 60, 'wght' 800; font-variant-numeric: tabular-nums; }
  .log { max-width: 66ch; display: flex; flex-direction: column; gap: 16px; font-size: 17px; line-height: 1.75; color: var(--on-surface-v); }
  .log .lead { font-size: 20px; line-height: 1.6; color: var(--on-surface); }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .pager { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px; }
  .pager :global(.pg) { padding: 20px 24px; gap: 6px; }
  .pager :global(.next) { text-align: right; align-items: flex-end; }
  .k { display: inline-flex; align-items: center; gap: 6px; font: 600 12px/1 var(--font-mono); color: var(--on-surface-v); }
  .t { font-family: var(--font-display); font-size: 22px; font-weight: 750; font-variation-settings: 'wdth' 80, 'wght' 750; }
  @media (max-width: 840px) {
    .row { grid-template-columns: minmax(0, 1fr); }
    .mark { display: none; }
    .head { border-radius: var(--r-xl); }
    .pager { grid-template-columns: minmax(0, 1fr); }
  }
</style>
