<script lang="ts">
  /** Summits drawn as peaks on one shared elevation scale (0 → top gridline). */
  type Peak = { id: string; name: string; meters: number };
  let { peaks }: { peaks: Peak[] } = $props();

  const W = 760, H = 260, TOP = 28, BASE = 216, LEFT = 52;
  const GRID = [0, 1000, 2000, 3000, 4000];
  const max = GRID[GRID.length - 1];
  const y = (m: number) => BASE - (m / max) * (BASE - TOP);

  const step = $derived((W - LEFT - 16) / Math.max(1, peaks.length));
  const shapes = $derived(peaks.map((p, i) => {
    const cx = LEFT + step * (i + 0.5);
    const half = step * 0.62;
    const top = y(p.meters);
    // Soft-shouldered peak: quadratic curves into a rounded summit.
    const d = `M${cx - half} ${BASE} Q${cx - half * 0.35} ${top + 30} ${cx - 8} ${top + 4} Q${cx} ${top - 3} ${cx + 8} ${top + 4} Q${cx + half * 0.35} ${top + 30} ${cx + half} ${BASE} Z`;
    return { ...p, cx, top, d, short: p.name.replace(/^Gunung /, '').replace(/ — .*/, '') };
  }));
</script>

<figure>
  <svg viewBox="0 0 {W} {H}" role="img" aria-label="Summit elevations: {peaks.map((p) => `${p.name} ${p.meters.toLocaleString('en-US')} m`).join(', ')}">
    <defs>
      <linearGradient id="peak-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--stop-2)" />
        <stop offset=".55" stop-color="var(--stop-3)" />
        <stop offset="1" stop-color="var(--stop-4)" stop-opacity=".55" />
      </linearGradient>
    </defs>
    {#each GRID as g (g)}
      <line x1={LEFT} x2={W - 8} y1={y(g)} y2={y(g)} stroke="var(--outline-v)" stroke-width="1" stroke-dasharray={g === 0 ? undefined : '3 5'} />
      <text x={LEFT - 10} y={y(g) + 4} text-anchor="end" class="axis">{g === 0 ? '0' : `${g / 1000}k`}</text>
    {/each}
    <text x={LEFT - 10} y={TOP - 14} text-anchor="end" class="axis">m</text>
    {#each shapes as s (s.id)}
      <a href="/v2/outdoors/{s.id}" class="peak">
        <path d={s.d} fill="url(#peak-fill)" stroke="var(--hero-ink)" stroke-opacity=".18" />
        <circle cx={s.cx} cy={s.top - 1} r="4" fill="var(--on-surface)" />
        <text x={s.cx} y={s.top - 12} text-anchor="middle" class="val">{s.meters.toLocaleString('en-US')}</text>
        <text x={s.cx} y={BASE + 20} text-anchor="middle" class="name">{s.short}</text>
      </a>
    {/each}
  </svg>
</figure>

<style>
  figure { margin: 0; overflow-x: auto; }
  svg { width: 100%; min-width: 560px; height: auto; display: block; }
  .axis { font: 500 11px var(--font-mono); fill: var(--on-surface-v); font-variant-numeric: tabular-nums; }
  .val { font: 700 12px var(--font-mono); fill: var(--on-surface); font-variant-numeric: tabular-nums; }
  .name { font: 600 12px var(--font-body); fill: var(--on-surface-v); }
  .peak path { transition: transform .5s var(--spring); transform-box: fill-box; transform-origin: 50% 100%; }
  .peak:hover path, .peak:focus-visible path { transform: scaleY(1.04); }
  .peak:hover .name { fill: var(--primary); }
</style>
