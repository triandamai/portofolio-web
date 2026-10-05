<script lang="ts">
  import {
    Button, ButtonGroup, Chip, Fab, IconButton, List, ListItem, LoadingIndicator, SectionHeader,
    Shape, SplitButton, Switch, WavyProgress, appearance, snackbar
  } from '$lib/v2';
  import { SHAPE_NAMES } from '$lib/v2/shapes';
  import { RESUMES } from '$lib/v2/content';

  let view = $state<'grid' | 'list' | 'timeline'>('list');
  let music = $state(true);
  let followed = $state(false);
  let kotlin = $state(true);
  let rust = $state(false);

  const ROLES = [
    { bg: '--primary', fg: '--on-primary', name: 'Primary' },
    { bg: '--secondary', fg: '--on-secondary', name: 'Secondary' },
    { bg: '--tertiary', fg: '--on-tertiary', name: 'Tertiary' },
    { bg: '--inverse-surface', fg: '--inverse-on-surface', name: 'Inverse' },
    { bg: '--primary-c', fg: '--on-primary-c', name: 'Primary container' },
    { bg: '--secondary-c', fg: '--on-secondary-c', name: 'Secondary container' },
    { bg: '--tertiary-c', fg: '--on-tertiary-c', name: 'Tertiary container' },
    { bg: '--sc-highest', fg: '--on-surface', name: 'Surface container' }
  ];
  const RADII = [['none', '0'], ['xs', '4'], ['sm', '8'], ['md', '12'], ['lg', '16'], ['lg+', '20'], ['xl', '28'], ['xl+', '32'], ['2xl', '48'], ['full', '999']];
  const MOTIONS = [
    { motion: 'spin', shape: 'sunny', speed: 10 },
    { motion: 'breathe', shape: 'clover4', speed: 4.5 },
    { motion: 'bounce', shape: 'gem', speed: 1.6 },
    { motion: 'wobble', shape: 'flower', speed: 2.4 }
  ] as const;

  const INVENTORY = [
    ['Button', 'variant, size (xs–xl), shape, icon, selected, href'],
    ['IconButton', 'icon, label, variant, width, selected'],
    ['ButtonGroup', 'options, bind:value (connected, single-select)'],
    ['SplitButton', 'label, href, items'],
    ['Fab', 'icon, label, size, extended, variant'],
    ['Chip', 'kind (filter | assist | tag), selected, size'],
    ['Card', 'variant, radius (asymmetric corners), href'],
    ['Shape', 'name, size, color, motion, speed, morphOnClick'],
    ['NavRail / NavBar', 'items, pathname, fab + footer slots'],
    ['WavyProgress / LoadingIndicator', 'value · contained'],
    ['Switch, List, ListItem, Snackbar', 'standard M3 props'],
    ['GradientPicker, ThemeToggle', 'bound to the appearance store'],
    ['SectionHeader, Prose', 'page-level typography']
  ];
</script>

<svelte:head>
  <title>Design system · Trian Damai</title>
  <meta name="description" content="The Material 3 Expressive design system this portfolio is built from: color roles, shapes, type and Svelte components." />
</svelte:head>

<section>
  <SectionHeader level={1} file="src/lib/v2/" title="The design system behind it"
    description="Material 3 Expressive, tuned to one gradient seed. Every component here is a Svelte component the pages share." />

  <div class="ds">
    <div>
      <h2>COLOR ROLES · seed “{appearance.schemeName}”</h2>
      <div class="swatches">
        {#each ROLES as r (r.name)}
          <div class="sw" style:background="var({r.bg})" style:color="var({r.fg})"><b>{r.name}</b><code>{r.bg}</code></div>
        {/each}
      </div>
      <div class="grad-bar"><span>--grad · hero, FAB, brand surfaces</span></div>
      <div class="grad-bar strong"><span>--grad-strong · small marks only</span></div>
    </div>

    <div>
      <h2>SHAPE · tap a shape to morph it</h2>
      <div class="shapes">
        {#each SHAPE_NAMES as name, i (name)}
          <div class="cell">
            <Shape {name} size="72px" morphOnClick color={['var(--primary-c)', 'var(--secondary-c)', 'var(--tertiary-c)'][i % 3]} />
            <span>{name}</span>
          </div>
        {/each}
      </div>
      <div class="motions">
        {#each MOTIONS as m (m.motion)}
          <div class="cell"><div class="stage"><Shape name={m.shape} size="56px" color="var(--primary)" motion={m.motion} speed={m.speed} /></div><span>motion="{m.motion}"</span></div>
        {/each}
      </div>
      <div class="radii">
        {#each RADII as [label, r] (label)}<div style:border-radius="{r}px">{label} {r === '999' ? '' : r}</div>{/each}
      </div>
    </div>

    <div>
      <h2>TYPE · one variable family, width does the talking</h2>
      <div class="type-row"><code>display · wdth 30 · 900</code><div class="t-dl">Trian Damai</div></div>
      <div class="type-row"><code>headline · wdth 60 · 800</code><div class="t-hl">Things I built and finished</div></div>
      <div class="type-row"><code>title · wdth 100 · 650</code><div class="t-tl">Android Developer, Bank Mandiri</div></div>
      <div class="type-row"><code>body · 16 / 1.55</code><div>Growing up in East Borneo, I had to figure most things out on my own. Slow internet, no local dev community, just forums and stubbornness.</div></div>
      <div class="type-row"><code>label · mono 13</code><div class="t-lb">experience.json · 2020 → now</div></div>
    </div>

    <div>
      <h2>COMPONENTS</h2>
      <div class="comp-grid">
        <div class="comp">
          <span class="name">&lt;Button&gt;</span>
          <div class="row">
            <Button>Filled</Button><Button variant="tonal">Tonal</Button><Button variant="outlined">Outlined</Button>
            <Button variant="elevated">Elevated</Button><Button variant="text">Text</Button>
          </div>
          <div class="row">
            <Button size="xs">XS</Button><Button>S</Button><Button size="md" shape="square">M square</Button>
            <Button size="lg" icon="download">L</Button>
          </div>
          <p class="hint">Press and hold a button: the corners morph toward square.</p>
        </div>
        <div class="comp">
          <span class="name">&lt;ButtonGroup&gt; · &lt;SplitButton&gt; · toggle</span>
          <ButtonGroup label="View" size="sm" bind:value={view} options={[
            { value: 'grid', label: 'Grid', icon: 'grid_view' },
            { value: 'list', label: 'List', icon: 'view_agenda' },
            { value: 'timeline', label: 'Timeline', icon: 'timeline' }
          ]} />
          <div class="row">
            <SplitButton label="Résumé" icon="download" href={RESUMES[0].href} items={RESUMES} target="_blank" />
            <Button icon="favorite" selected={followed} onclick={() => (followed = !followed)}>{followed ? 'Following' : 'Follow'}</Button>
          </div>
        </div>
        <div class="comp">
          <span class="name">&lt;IconButton&gt; · &lt;Fab&gt;</span>
          <div class="row">
            <IconButton icon="share" label="Share" />
            <IconButton icon="content_copy" label="Copy" variant="outlined" />
            <IconButton icon="open_in_new" label="Open" variant="tonal" />
            <IconButton icon="play_arrow" label="Play" variant="filled" width="wide" />
          </div>
          <div class="row">
            <Fab icon="edit" label="Edit" />
            <Fab icon="mail" label="Mail" size="md" variant="tonal" />
            <Fab icon="hiking" label="Trail log" size="lg" />
            <Fab icon="bolt" label="Hire me" extended onclick={() => snackbar.show('Scroll down: contact details are in the footer')} />
          </div>
        </div>
        <div class="comp">
          <span class="name">&lt;WavyProgress&gt; · &lt;LoadingIndicator&gt; · &lt;Switch&gt;</span>
          <WavyProgress value={0.62} label="Example progress" />
          <div class="row">
            <LoadingIndicator />
            <LoadingIndicator contained />
            <Switch label="Background music" bind:checked={music} />
          </div>
        </div>
        <div class="comp">
          <span class="name">&lt;Chip&gt;</span>
          <div class="row">
            <Chip kind="filter" selected={kotlin} onclick={() => (kotlin = !kotlin)}>Kotlin</Chip>
            <Chip kind="filter" selected={rust} onclick={() => (rust = !rust)}>Rust</Chip>
            <Chip kind="assist" icon="calendar_month" onclick={() => snackbar.show('Assist chips trigger an action')}>Book a call</Chip>
            <Chip>SvelteKit</Chip>
          </div>
        </div>
        <div class="comp">
          <span class="name">&lt;List&gt; · &lt;ListItem&gt;</span>
          <List>
            <ListItem headline="Let's get rusty" supporting="blog · first post on Rust" icon="article" href="/v2/blog/lets-get-rusty" />
            <ListItem headline="Shipyard" supporting="project · self-hosted PaaS" icon="deployed_code" href="/v2/projects/shipyard" />
          </List>
        </div>
      </div>
    </div>

    <div>
      <h2>INVENTORY · import from $lib/v2</h2>
      <div class="inv-wrap">
        <table>
          <thead><tr><th>Component</th><th>Props</th></tr></thead>
          <tbody>{#each INVENTORY as [c, p] (c)}<tr><td>{c}</td><td>{p}</td></tr>{/each}</tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<style>
  section { display: flex; flex-direction: column; gap: 28px; }
  .ds { background: var(--sc-lowest); border-radius: var(--r-xxl); padding: clamp(20px, 3.5vw, 44px); display: flex; flex-direction: column; gap: 44px; box-shadow: inset 0 0 0 1px var(--outline-v); min-width: 0; }
  h2 { font: 600 13px/1 var(--font-mono); letter-spacing: .04em; color: var(--on-surface-v); margin-bottom: 16px; display: flex; gap: 10px; align-items: center; }
  h2::after { content: ''; flex: 1; height: 1px; background: var(--outline-v); }
  .row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
  .swatches { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
  .sw { border-radius: var(--r-lg); padding: 14px; min-height: 92px; display: flex; flex-direction: column; justify-content: space-between; gap: 8px; min-width: 0; }
  .sw b { font: 650 14px/1.2 var(--font-body); }
  .sw code { font: 500 12px/1 var(--font-mono); opacity: .85; overflow-wrap: anywhere; }
  .grad-bar { height: 64px; border-radius: var(--r-lg) var(--r-lg) var(--r-lg) var(--r-xs); background: var(--grad); display: flex; align-items: flex-end; padding: 12px 16px; color: var(--hero-ink); font: 600 12px/1 var(--font-mono); margin-top: 8px; }
  .grad-bar.strong { background: var(--grad-strong); color: #fff; text-shadow: 0 1px 2px rgba(0, 0, 0, .35); }
  .shapes { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 16px; }
  .motions { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; margin-top: 24px; }
  .stage { height: 96px; display: grid; place-items: end center; padding-bottom: 8px; }
  .cell { display: flex; flex-direction: column; align-items: center; gap: 8px; font: 500 12px/1 var(--font-mono); color: var(--on-surface-v); }
  .radii { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
  .radii div { width: 64px; height: 64px; background: var(--sc-highest); display: flex; align-items: flex-end; justify-content: center; padding-bottom: 6px; font: 500 10px/1 var(--font-mono); color: var(--on-surface-v); }
  .type-row { display: grid; grid-template-columns: 180px minmax(0, 1fr); gap: 16px; align-items: baseline; padding-block: 10px; border-bottom: 1px solid var(--outline-v); }
  .type-row:last-child { border-bottom: 0; }
  .type-row code { font: 500 12px/1.3 var(--font-mono); color: var(--on-surface-v); }
  .type-row > div { min-width: 0; overflow-wrap: anywhere; }
  .t-dl { font-family: var(--font-display); font-size: 57px; line-height: 1; font-variation-settings: 'wdth' 30, 'wght' 900, 'opsz' 144; letter-spacing: -.03em; font-weight: 900; }
  .t-hl { font-family: var(--font-display); font-size: 32px; line-height: 1.1; font-variation-settings: 'wdth' 60, 'wght' 800, 'opsz' 48; font-weight: 800; }
  .t-tl { font-size: 22px; font-weight: 650; }
  .t-lb { font: 600 13px/1 var(--font-mono); letter-spacing: .04em; }
  .comp-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .comp { background: var(--sc-low); border-radius: var(--r-xl); padding: 20px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
  .name { font: 600 13px/1 var(--font-mono); color: var(--primary); }
  .hint { font-size: 13px; color: var(--on-surface-v); }
  .inv-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th { text-align: left; font: 600 12px/1 var(--font-mono); color: var(--on-surface-v); padding: 10px 12px; border-bottom: 1px solid var(--outline-v); }
  td { padding: 10px 12px; border-bottom: 1px solid var(--outline-v); color: var(--on-surface-v); }
  td:first-child { font: 600 13px/1.4 var(--font-mono); color: var(--primary); white-space: nowrap; }
  @media (max-width: 1100px) { .comp-grid { grid-template-columns: minmax(0, 1fr); } }
  @media (max-width: 840px) {
    .swatches { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .type-row { grid-template-columns: minmax(0, 1fr); gap: 4px; }
    .t-dl { font-size: 44px; }
  }
</style>
