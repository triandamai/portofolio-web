<script lang="ts">
  import { onMount } from 'svelte';
  import { clipPathFor, mix, polygon, radii, type ShapeName } from '../shapes';

  let { contained = false, label = 'Loading' }: { contained?: boolean; label?: string } = $props();

  const SEQUENCE: ShapeName[] = ['cookie9', 'clover4', 'sunny', 'flower', 'gem', 'cookie4'];
  let clip = $state(clipPathFor('cookie9'));

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = performance.now();
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - start) / 650;
      const i = Math.floor(t) % SEQUENCE.length;
      const from = radii(SEQUENCE[i]);
      const to = radii(SEQUENCE[(i + 1) % SEQUENCE.length]);
      clip = polygon(mix(from, to, ease(t % 1)), now / 900);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  });
</script>

<span class="loader" class:contained role="status" aria-label={label}>
  <span class="morph" style:clip-path={clip}></span>
</span>

<style>
  .loader { width: 48px; height: 48px; display: inline-grid; place-items: center; flex-shrink: 0; }
  .morph { width: 38px; height: 38px; background: var(--primary); }
  .contained { width: 56px; height: 56px; border-radius: 50%; background: var(--primary-c); }
  .contained .morph { width: 34px; height: 34px; background: var(--on-primary-c); }
</style>
