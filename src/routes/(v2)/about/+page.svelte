<script lang="ts">
  import { Button, Icon, Prose, SectionHeader, Shape, SplitButton } from '$lib/v2';
  import { RESUMES } from '$lib/v2/content';

  let { data } = $props();

  const facts = $derived([
    { icon: 'work', k: 'now', v: `${data.current.role}, ${data.current.company}` },
    { icon: 'location_on', k: 'based in', v: 'Jakarta, Indonesia' },
    { icon: 'forest', k: 'from', v: 'A small village in East Kalimantan, Borneo' },
    { icon: 'history', k: 'shipping since', v: String(data.firstYear) },
    { icon: 'bolt', k: 'learning', v: 'Rust' }
  ]);
</script>

<svelte:head>
  <title>About · Trian Damai</title>
  <meta name="description" content="Trian Damai grew up in East Kalimantan, started with Android app mods, and now ships mobile apps, web platforms and backends from Jakarta." />
</svelte:head>

<section>
  <SectionHeader level={1} file="about.md" title="From APK mods to production apps" />

  <div class="layout">
    <aside class="card" aria-label="Quick facts">
      <div class="mark">
        <Shape name="cookie9" size="100%" color="var(--hero-ink)" morphOnClick label="Trian Damai monogram, tap to change shape">
          <span class="td">TD</span>
        </Shape>
        <span class="orb"><Shape name="sunny" size="100%" color="var(--hero-paper)" motion="spin" speed={16} /></span>
      </div>
      <h2>Trian Damai</h2>
      <dl>
        {#each facts as f (f.k)}
          <div class="fact">
            <Icon name={f.icon} size={20} />
            <div><dt>{f.k}</dt><dd>{f.v}</dd></div>
          </div>
        {/each}
      </dl>
      <div class="actions">
        <SplitButton label="Résumé" icon="download" href={RESUMES[0].href} items={RESUMES} menuLabel="Choose résumé version" target="_blank" />
        <Button variant="ink-outline" icon="mail" href="/contact">Contact</Button>
      </div>
    </aside>

    <div class="story">
      <Prose content={data.content} />
    </div>
  </div>
</section>

<style>
  section { display: flex; flex-direction: column; gap: 32px; }
  .layout { display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: start; }
  .card {
    position: sticky; top: 24px;
    background: var(--grad); color: var(--hero-ink);
    border-radius: var(--r-xxl) var(--r-xxl) var(--r-md) var(--r-xxl);
    padding: 28px; display: flex; flex-direction: column; gap: 20px;
  }
  .mark { position: relative; width: 132px; aspect-ratio: 1; display: grid; }
  .td { color: var(--hero-paper); font: 900 48px/1 var(--font-display); font-variation-settings: 'wdth' 25, 'wght' 900, 'opsz' 144; letter-spacing: -.04em; }
  .orb { position: absolute; width: 36%; aspect-ratio: 1; right: -12%; top: -8%; display: grid; pointer-events: none; }
  h2 { font-family: var(--font-display); font-size: 34px; line-height: 1; letter-spacing: -.02em; font-weight: 850; font-variation-settings: 'wdth' 45, 'wght' 850, 'opsz' 72; }
  dl { margin: 0; display: flex; flex-direction: column; gap: 12px; }
  .fact { display: flex; gap: 12px; align-items: flex-start; }
  .fact :global(.msr) { margin-top: 2px; }
  dt { font: 600 11px/1.2 var(--font-mono); letter-spacing: .05em; text-transform: uppercase; opacity: .75; }
  dd { margin: 2px 0 0; font-weight: 600; font-size: 15px; line-height: 1.35; }
  .actions { display: flex; flex-wrap: wrap; gap: 8px; }
  .actions :global(.split .lead), .actions :global(.split .trail) { background: var(--hero-ink); color: var(--hero-paper); }
  .story { min-width: 0; }
  @media (max-width: 960px) {
    .layout { grid-template-columns: minmax(0, 1fr); }
    .card { position: static; }
  }
</style>
