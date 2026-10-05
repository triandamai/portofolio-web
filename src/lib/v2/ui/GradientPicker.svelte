<script lang="ts">
  import { appearance, SCHEMES } from '../stores/appearance.svelte';
  import { clipPathFor } from '../shapes';

  let { compact = false }: { compact?: boolean } = $props();
  const selectedClip = clipPathFor('cookie9');
  const circleClip = clipPathFor('circle');
</script>

<div class="picker" class:compact role="radiogroup" aria-label="Color scheme">
  <div class="opts">
    {#each SCHEMES as s (s.id)}
      {@const on = appearance.scheme === s.id}
      <button
        type="button"
        role="radio"
        aria-checked={on}
        aria-label={s.name}
        title={s.name}
        style:background="linear-gradient(135deg, {s.stops.join(',')})"
        style:clip-path={on ? selectedClip : circleClip}
        onclick={() => appearance.setScheme(s.id)}
      ></button>
    {/each}
  </div>
  {#if !compact}<span class="name">gradient<b>{appearance.schemeName}</b></span>{/if}
</div>

<style>
  .picker { display: inline-flex; align-items: center; gap: 10px; background: var(--sc-low); padding: 6px 14px 6px 6px; border-radius: var(--r-full); }
  .compact { padding: 6px; }
  .opts { display: flex; gap: 4px; }
  button {
    width: 32px; height: 32px; border: 0; padding: 0; cursor: pointer;
    transition: clip-path .6s var(--spring), transform .4s var(--spring-fast);
  }
  button:hover { transform: scale(1.1); }
  button[aria-checked='true'] { transform: scale(1.12); }
  .name { font: 600 12px/1.2 var(--font-mono); color: var(--on-surface-v); min-width: 13ch; }
  .name b { display: block; color: var(--on-surface); font-size: 13px; }
</style>
