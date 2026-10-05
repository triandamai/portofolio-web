<script lang="ts">
  import Shape from '../ui/Shape.svelte';
</script>

<!-- Monogram (tap to morph) orbited by three shapes, each with its own size and motion -->
<div class="art">
  <div class="mono">
    <Shape name="cookie9" size="100%" color="var(--hero-ink)" morphOnClick label="Trian Damai monogram, tap to change shape">
      <span class="td">TD</span>
    </Shape>
  </div>
  <div class="orb spin"><Shape name="sunny" size="100%" color="var(--hero-paper)" motion="spin" speed={14} /></div>
  <div class="orb breathe"><Shape name="clover4" size="100%" color="var(--primary)" motion="breathe" speed={4.5} /></div>
  <div class="orb bounce"><Shape name="gem" size="100%" color="var(--hero-paper)" motion="bounce" speed={1.6} /></div>
</div>

<style>
  .art { position: relative; justify-self: end; width: min(100%, 340px); aspect-ratio: 1; max-width: 100%; }
  .mono { position: absolute; inset: 6%; display: grid; }
  .mono :global(.shape) { width: 100%; height: 100%; }
  .td {
    color: var(--hero-paper);
    font: 900 clamp(56px, 8.5vw, 116px)/1 var(--font-display);
    font-variation-settings: 'wdth' 25, 'wght' 900, 'opsz' 144; letter-spacing: -.04em;
  }
  .orb { position: absolute; display: grid; pointer-events: none; }
  .spin { width: 32%; aspect-ratio: 1; right: -6%; top: -6%; }
  .breathe { width: 22%; aspect-ratio: 1; left: -4%; bottom: 4%; }
  .bounce { width: 13%; aspect-ratio: 1; right: 6%; bottom: -2%; }
  .orb :global(.shape) { width: 100%; height: 100%; }

  @media (max-width: 840px) {
    .art { justify-self: start; width: 200px; }
  }
</style>
