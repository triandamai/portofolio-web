<script lang="ts">
  import { Card, Chip, Icon, SectionHeader } from '$lib/v2';
  import SummitChart from '$lib/v2/sections/SummitChart.svelte';
  import { meters } from '$lib/v2/outdoors';

  let { data } = $props();

  // One peak per mountain: repeat climbs (Gede twice) share a summit.
  const peaks = $derived.by(() => {
    const seen = new Map<string, { id: string; name: string; meters: number }>();
    for (const t of data.trails) {
      const m = meters(t);
      if (!m) continue;
      const key = t.name.replace(/ — .*/, '');
      if (!seen.has(key)) seen.set(key, { id: t.id, name: key, meters: m });
    }
    return [...seen.values()];
  });
  const highest = $derived(peaks.reduce((a, b) => (b.meters > a.meters ? b : a), peaks[0]));
  const years = $derived([...new Set(data.trails.map((t) => t.date))].sort());
  const RADII = [
    'var(--r-xxl) var(--r-sm) var(--r-xl) var(--r-xl)',
    'var(--r-sm) var(--r-xl) var(--r-xl) var(--r-xxl)',
    'var(--r-xl) var(--r-xl) var(--r-xxl) var(--r-sm)'
  ];
</script>

<svelte:head>
  <title>Outdoors · Trian Damai</title>
  <meta name="description" content="Trian Damai's trail log: volcano summits and rainforest treks across Java." />
</svelte:head>

<section>
  <SectionHeader level={1} file="outdoors.log" title="Off the screen"
    description="When the screen gets too bright I go up a mountain. Every trip so far, from the first summit to the last." />

  <div class="summary">
    <div class="stat"><span class="n">{data.trails.length}</span><span class="l">trips logged</span></div>
    <div class="stat"><span class="n">{peaks.length}</span><span class="l">summits</span></div>
    {#if highest}<div class="stat"><span class="n">{highest.meters.toLocaleString('en-US')} m</span><span class="l">highest · {highest.name}</span></div>{/if}
    <div class="stat"><span class="n">{years[0]}–{years[years.length - 1]}</span><span class="l">on the trail</span></div>
  </div>

  <div class="chart-card">
    <h2>Summits to scale</h2>
    <SummitChart {peaks} />
  </div>

  <div class="trails">
    {#each data.trails as trail, i (trail.id)}
      <Card href="/v2/outdoors/{trail.id}" radius={RADII[i % RADII.length]} class="trail">
        <div class="top">
          <span class="date">{trail.date}</span>
          <span class="region">{trail.region}</span>
        </div>
        <h3>{trail.name}</h3>
        <p class="loc"><Icon name="location_on" size={18} />{trail.location}</p>
        {#if trail.elevation || trail.distance}
          <div class="nums">
            {#if trail.elevation}<span><Icon name="landscape" size={18} />{trail.elevation}</span>{/if}
            {#if trail.distance}<span><Icon name="route" size={18} />{trail.distance}</span>{/if}
          </div>
        {/if}
        <p class="desc">{trail.description}</p>
        <div class="chips">{#each trail.tags.slice(0, 3) as tag (tag)}<Chip size="sm">{tag}</Chip>{/each}</div>
      </Card>
    {/each}
  </div>
</section>

<style>
  section { display: flex; flex-direction: column; gap: 24px; }
  .summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px; }
  .stat { background: var(--sc-low); padding: 18px 20px; display: flex; flex-direction: column; gap: 4px; border-radius: var(--r-sm); min-width: 0; }
  .stat:first-child { border-radius: var(--r-xl) var(--r-sm) var(--r-sm) var(--r-xl); }
  .stat:last-child { border-radius: var(--r-sm) var(--r-xl) var(--r-xl) var(--r-sm); }
  .n { font-family: var(--font-display); font-size: clamp(24px, 3vw, 34px); line-height: 1; font-weight: 800; font-variation-settings: 'wdth' 60, 'wght' 800, 'opsz' 48; font-variant-numeric: tabular-nums; }
  .l { font: 500 12px/1.3 var(--font-mono); color: var(--on-surface-v); }
  .chart-card { background: var(--sc-lowest); box-shadow: inset 0 0 0 1px var(--outline-v); border-radius: var(--r-xxl); padding: clamp(20px, 3vw, 32px); display: flex; flex-direction: column; gap: 12px; min-width: 0; }
  h2 { font: 600 13px/1 var(--font-mono); letter-spacing: .04em; color: var(--on-surface-v); text-transform: uppercase; }
  .trails { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 12px; }
  .trails :global(.trail) { padding: 24px; gap: 10px; }
  .top { display: flex; justify-content: space-between; font: 600 12px/1 var(--font-mono); color: var(--on-surface-v); }
  .region { background: var(--secondary-c); color: var(--on-secondary-c); padding: 4px 10px; border-radius: var(--r-full); }
  h3 { font-family: var(--font-display); font-size: 28px; line-height: 1.05; font-weight: 750; font-variation-settings: 'wdth' 80, 'wght' 750, 'opsz' 48; letter-spacing: -.015em; }
  .loc, .nums span { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; color: var(--on-surface-v); }
  .nums { display: flex; gap: 16px; font-variant-numeric: tabular-nums; }
  .nums span { color: var(--on-surface); font-weight: 600; }
  .desc { font-size: 15px; color: var(--on-surface-v); display: -webkit-box; -webkit-line-clamp: 3; line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 4px; }
  @media (max-width: 840px) {
    .summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .stat:nth-child(n) { border-radius: var(--r-sm); }
    .stat:first-child { border-radius: var(--r-xl) var(--r-sm) var(--r-sm) var(--r-sm); }
    .stat:nth-child(2) { border-radius: var(--r-sm) var(--r-xl) var(--r-sm) var(--r-sm); }
    .stat:nth-child(3) { border-radius: var(--r-sm) var(--r-sm) var(--r-sm) var(--r-xl); }
    .stat:last-child { border-radius: var(--r-sm) var(--r-sm) var(--r-xl) var(--r-sm); }
  }
</style>
