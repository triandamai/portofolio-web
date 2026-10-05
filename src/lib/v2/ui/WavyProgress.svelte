<script lang="ts">
  import { onMount } from 'svelte';

  /** value in 0..1 */
  let { value, label = 'Progress' }: { value: number; label?: string } = $props();

  const W = 400, MID = 12, AMP = 4, WAVELENGTH = 40;
  let phase = $state(0);

  const end = $derived(Math.max(4, W * Math.min(1, Math.max(0, value))));
  const wave = $derived.by(() => {
    let d = '';
    for (let x = 3; x <= end; x += 2) {
      d += `${x === 3 ? 'M' : 'L'}${x} ${(MID + AMP * Math.sin((x / WAVELENGTH) * Math.PI * 2 - phase)).toFixed(2)}`;
    }
    return d;
  });

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const loop = (now: number) => { phase = now / 260; raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  });
</script>

<svg viewBox="0 0 {W} 24" preserveAspectRatio="none" role="progressbar" aria-label={label}
  aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)}>
  {#if end < W - 14}
    <path d="M{end + 10} {MID} L{W - 4} {MID}" stroke="var(--secondary-c)" stroke-width="5" stroke-linecap="round" fill="none" />
    <circle cx={W - 3} cy={MID} r="2.5" fill="var(--secondary)" />
  {/if}
  <path d={wave} stroke="var(--secondary)" stroke-width="5" stroke-linecap="round" fill="none" />
</svg>

<style>
  svg { width: 100%; height: 24px; display: block; overflow: visible; }
</style>
