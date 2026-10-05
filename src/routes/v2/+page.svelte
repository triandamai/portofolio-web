<script lang="ts">
  import { Button, Chip, Icon, List, ListItem, SectionHeader, Shape, SplitButton } from '$lib/v2';
  import HeroArt from '$lib/v2/sections/HeroArt.svelte';
  import ProjectCard from '$lib/v2/sections/ProjectCard.svelte';
  import { RESUMES } from '$lib/v2/content';
  import type { ShapeName } from '$lib/v2/shapes';
  import type { SkillLevel } from '$lib/content/skills';

  let { data } = $props();

  type Filter = 'all' | SkillLevel;
  let level = $state<Filter>('all');
  const LEVELS: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'daily', label: 'Daily' },
    { value: 'proficient', label: 'Proficient' },
    { value: 'exploring', label: 'Exploring' }
  ];
  const GROUP_SHAPES: ShapeName[] = ['cookie4', 'clover4', 'sunny', 'gem'];

  const isCurrent = (period: string) => /present/i.test(period);
  const shortPeriod = (period: string) => period.replace(/Present/i, 'now');
</script>

<svelte:head>
  <title>Trian Damai · Android & software engineer</title>
  <meta name="description" content="Trian Damai, software engineer from East Kalimantan, now in Jakarta. Android apps for banks and government, plus web products and a self-hosted PaaS." />
  <link rel="canonical" href="https://trian.space/v2" />
</svelte:head>

<!-- Hero -->
<section class="hero" aria-labelledby="hero-title">
  <div class="copy">
    <span class="eyebrow"><span class="dot"></span>Android Developer at Bank Mandiri</span>
    <h1 id="hero-title"><span>Trian</span><span class="wide">Damai</span></h1>
    <p class="lede">Software engineer from a small village in East Kalimantan, now in Jakarta. I build Android apps for banks and government, and ship my own products on the side.</p>
    <div class="actions">
      <Button variant="ink" size="md" icon="arrow_downward" href="#work">See what I've shipped</Button>
      <Button variant="ink-outline" size="md" icon="description" href={RESUMES[0].href} target="_blank" rel="noopener noreferrer">Résumé</Button>
    </div>
  </div>
  <HeroArt />
</section>

<!-- Now -->
<div class="now" aria-label="Right now">
  <div class="tile">
    <Shape name="cookie4" size="48px" color="var(--primary-c)"><span class="tile-ico c1"><Icon name="account_balance" /></span></Shape>
    <div><div class="k">day job</div><div class="v">Android features for one of Indonesia's largest banking apps</div></div>
  </div>
  <div class="tile">
    <Shape name="clover4" size="48px" color="var(--tertiary-c)"><span class="tile-ico c2"><Icon name="bolt" /></span></Shape>
    <div><div class="k">learning</div><div class="v">Rust, slowly and stubbornly. Shipyard runs on Axum.</div></div>
  </div>
  <a class="tile" href="/v2/outdoors">
    <Shape name="flower" size="48px" color="var(--secondary-c)"><span class="tile-ico c3"><Icon name="landscape" /></span></Shape>
    <div><div class="k">off-screen</div><div class="v">Hiking mountains across Java. The trail log lives in outdoors.log</div></div>
  </a>
</div>

<!-- Work -->
<section id="work" aria-labelledby="work-title">
  <SectionHeader id="work-title" file="projects/" title="Things I built and finished" />
  <div class="bento">
    <ProjectCard project={data.featured.big} big class="c-big" />
    <ProjectCard project={data.featured.tall} tall maxTech={2} class="c-tall" />
    <ProjectCard project={data.featured.inverse} variant="inverse" maxTech={3} class="c-half" />
    <ProjectCard project={data.featured.highlight} radius="var(--r-xxl) var(--r-sm) var(--r-xxl) var(--r-xxl)" class="c-half" />
  </div>
  <div class="see-all">
    <Button variant="tonal" size="md" trailingIcon="arrow_forward" href="/v2/projects">See all {data.projectCount} projects</Button>
  </div>
</section>

<!-- Experience -->
<section id="experience" aria-labelledby="exp-title">
  <SectionHeader id="exp-title" file="experience.json" title="Six years, mostly in regulated apps"
    description="Banks, insurance and social security: places where a crash becomes a support ticket from a million people." />
  <ol class="timeline">
    {#each data.experience as job (job.company + job.period)}
      <li class="job">
        <span class="when">{shortPeriod(job.period)}</span>
        <div class="what">
          <div class="role">{job.role}</div>
          <div class="co">{job.company}</div>
          {#if job.highlights[0]}<p class="hl">{job.highlights[0]}</p>{/if}
        </div>
        {#if isCurrent(job.period)}<span class="pill-now">Now</span>{:else}<span class="loc">{job.location.split(',')[0]}</span>{/if}
      </li>
    {/each}
  </ol>
</section>

<!-- Skills -->
<section id="skills" aria-labelledby="skills-title">
  <SectionHeader id="skills-title" file="skills.ts" title="The stack I reach for">
    {#snippet actions()}
      <div class="chips" role="group" aria-label="Filter by level">
        {#each LEVELS as l (l.value)}
          <Chip kind="filter" selected={level === l.value} onclick={() => (level = l.value)}>{l.label}</Chip>
        {/each}
      </div>
    {/snippet}
  </SectionHeader>
  <div class="skill-grid">
    {#each data.skillGroups as group, i (group.category)}
      <div class="skill-group">
        <h3><Shape name={GROUP_SHAPES[i % GROUP_SHAPES.length]} size="28px" color="var(--primary)" />{group.category}</h3>
        <p>{group.description}</p>
        <div class="chips">
          {#each group.skills as s (s.name)}
            <span class="skill" data-l={s.level} class:dim={level !== 'all' && s.level !== level} title={s.note}>
              <span class="lv"></span>{s.name}
            </span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  <p class="legend"><span class="skill" data-l="daily"><span class="lv"></span>daily</span><span class="skill" data-l="proficient"><span class="lv"></span>proficient</span><span class="skill" data-l="exploring"><span class="lv"></span>exploring</span></p>
</section>

<!-- Writing -->
<section id="writing" aria-labelledby="writing-title" class="writing">
  <div>
    <SectionHeader id="writing-title" file="blog/" title="Writing" description="Things I figured out the hard way, written down so I don't have to again." />
    <div class="resume-cta"><SplitButton label={RESUMES[0].label} icon="download" href={RESUMES[0].href} items={RESUMES} menuLabel="Choose résumé version" target="_blank" /></div>
  </div>
  <List label="Latest writing">
    {#each data.posts as post (post.slug)}
      <ListItem headline={post.title} supporting="{post.date} · {post.tags.slice(0, 3).join(', ')}" icon="article" href="/v2/blog/{post.slug}" />
    {/each}
    <ListItem headline="Snippets" supporting="axum-sse.rs, debounce.ts, binary-search.ts" icon="code" href="/snippets" reload />
  </List>
</section>

<style>
  /* Hero */
  .hero {
    position: relative; overflow: hidden; isolation: isolate;
    border-radius: var(--r-xxl) var(--r-xxl) var(--r-xxl) var(--r-md);
    background: var(--grad); color: var(--hero-ink);
    padding: clamp(24px, 4vw, 56px);
    display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 32px; align-items: end;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0; z-index: -1; opacity: .35; mix-blend-mode: multiply; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .7 0 0 0 0 .7 0 0 0 0 .7 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .copy { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
  .eyebrow { font: 600 13px/1.3 var(--font-mono); letter-spacing: .04em; display: flex; gap: 10px; align-items: center; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--hero-ink); animation: blink 2.4s var(--effects) infinite; flex-shrink: 0; }
  @keyframes blink { 50% { opacity: .25; } }
  h1 {
    font-family: var(--font-display); font-size: clamp(3.4rem, 11vw, 9.5rem); line-height: .82; letter-spacing: -.035em;
    font-weight: 900; font-variation-settings: 'wdth' 30, 'opsz' 144, 'wght' 900; display: flex; flex-direction: column;
  }
  h1 .wide { font-variation-settings: 'wdth' 151, 'opsz' 144, 'wght' 300; font-weight: 300; letter-spacing: -.04em; }
  .lede { font-size: clamp(17px, 1.6vw, 20px); line-height: 1.5; max-width: 34ch; font-variation-settings: 'wdth' 100, 'opsz' 20, 'wght' 460; }
  .actions { display: flex; flex-wrap: wrap; gap: 8px; }

  /* Now */
  .now { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: -48px; }
  .tile { background: var(--sc-low); padding: 20px; display: flex; gap: 16px; align-items: flex-start; min-width: 0; text-decoration: none; color: inherit; border-radius: var(--r-sm); transition: border-radius .5s var(--spring), background-color .2s; }
  .tile:first-child { border-radius: var(--r-xl) var(--r-sm) var(--r-sm) var(--r-xl); }
  .tile:last-child { border-radius: var(--r-sm) var(--r-xl) var(--r-xl) var(--r-sm); }
  a.tile:hover { background: var(--sc); border-radius: var(--r-xl); }
  .tile-ico { display: grid; place-items: center; }
  .c1 { color: var(--on-primary-c); } .c2 { color: var(--on-tertiary-c); } .c3 { color: var(--on-secondary-c); }
  .k { font: 600 12px/1.2 var(--font-mono); color: var(--on-surface-v); letter-spacing: .03em; }
  .v { font-weight: 600; font-size: 17px; line-height: 1.3; margin-top: 4px; }

  section { display: flex; flex-direction: column; gap: 24px; scroll-margin-top: 24px; }

  /* Bento */
  .bento { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; }
  .bento :global(.c-big) { grid-column: span 4; grid-row: span 2; }
  .bento :global(.c-tall) { grid-column: span 2; grid-row: span 2; }
  .bento :global(.c-half) { grid-column: span 3; }
  .see-all { display: flex; justify-content: flex-end; }

  /* Timeline */
  .timeline { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
  .job {
    display: grid; grid-template-columns: 190px minmax(0, 1fr) auto; gap: 24px; align-items: center;
    background: var(--sc-low); padding: 18px 24px; border-radius: var(--r-sm);
    transition: border-radius .45s var(--spring), background-color .2s;
  }
  .job:first-child { border-radius: var(--r-xl) var(--r-xl) var(--r-sm) var(--r-sm); }
  .job:last-child { border-radius: var(--r-sm) var(--r-sm) var(--r-xl) var(--r-xl); }
  .job:hover { border-radius: var(--r-xl); background: var(--sc); }
  .when { font: 500 13px/1.3 var(--font-mono); color: var(--on-surface-v); font-variant-numeric: tabular-nums; }
  .role { font-weight: 650; font-size: 17px; }
  .co { color: var(--on-surface-v); font-size: 15px; }
  .hl { color: var(--on-surface-v); font-size: 14px; margin-top: 6px; max-width: 70ch; display: none; }
  .job:hover .hl, .job:focus-within .hl { display: block; }
  .pill-now { font: 700 11px/1 var(--font-mono); letter-spacing: .06em; text-transform: uppercase; padding: 6px 10px; border-radius: var(--r-full); background: var(--grad); color: var(--hero-ink); }
  .loc { font: 500 12px/1 var(--font-mono); color: var(--on-surface-v); }

  /* Skills */
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .skill-group { background: var(--sc-low); border-radius: var(--r-xl); padding: 24px; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
  .skill-group h3 { font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 10px; }
  .skill-group p { color: var(--on-surface-v); font-size: 14px; }
  .skill { display: inline-flex; align-items: center; gap: 8px; height: 34px; padding-inline: 12px 14px; border-radius: var(--r-full); font-size: 14px; font-weight: 500; cursor: default; transition: opacity .3s, transform .4s var(--spring-fast); }
  .lv { width: 10px; height: 10px; border-radius: 50%; }
  .skill[data-l='daily'] { background: var(--primary-c); color: var(--on-primary-c); }
  .skill[data-l='daily'] .lv { background: var(--grad-strong); }
  .skill[data-l='proficient'] { background: var(--sc-highest); color: var(--on-surface); }
  .skill[data-l='proficient'] .lv { background: var(--secondary); }
  .skill[data-l='exploring'] { box-shadow: inset 0 0 0 1px var(--outline); color: var(--on-surface-v); }
  .skill[data-l='exploring'] .lv { box-shadow: inset 0 0 0 2px var(--tertiary); }
  .skill.dim { opacity: .22; transform: scale(.96); }
  .legend { display: flex; gap: 8px; flex-wrap: wrap; font-size: 13px; }
  .legend .skill { height: 28px; font-size: 12px; font-family: var(--font-mono); }

  /* Writing */
  .writing { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; align-items: start; }
  .resume-cta { margin-top: 20px; }

  @media (max-width: 1100px) {
    .bento :global(.c-big) { grid-column: span 6; }
    .bento :global(.c-tall), .bento :global(.c-half) { grid-column: span 3; }
  }
  @media (max-width: 840px) {
    .hero { grid-template-columns: minmax(0, 1fr); border-radius: var(--r-xl) var(--r-xl) var(--r-xl) var(--r-sm); }
    .hero :global(.art) { order: -1; }
    .now { grid-template-columns: minmax(0, 1fr); margin-top: -36px; }
    .tile:nth-child(n) { border-radius: var(--r-sm); }
    .tile:first-child { border-radius: var(--r-xl) var(--r-xl) var(--r-sm) var(--r-sm); }
    .tile:last-child { border-radius: var(--r-sm) var(--r-sm) var(--r-xl) var(--r-xl); }
    .bento { grid-template-columns: minmax(0, 1fr); }
    .bento > :global(*) { grid-column: auto !important; grid-row: auto !important; }
    .job { grid-template-columns: minmax(0, 1fr) auto; gap: 6px 16px; padding: 16px 18px; }
    .when { grid-column: 1 / -1; }
    .skill-grid, .writing { grid-template-columns: minmax(0, 1fr); }
  }
</style>
