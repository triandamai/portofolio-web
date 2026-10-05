<script lang="ts">
  import type { ProjectMeta } from '$lib/content/index';
  import Card from '../ui/Card.svelte';
  import Chip from '../ui/Chip.svelte';
  import Shape from '../ui/Shape.svelte';
  import { COVERS, projectHost } from '../content';

  type Props = { project: ProjectMeta; variant?: 'filled' | 'inverse'; radius?: string; tall?: boolean; big?: boolean; maxTech?: number; class?: string };
  let { project, variant = 'filled', radius, tall = false, big = false, maxTech = 4, class: cls = '' }: Props = $props();

  const cover = $derived(COVERS[project.slug]);
  const host = $derived(projectHost(project));
</script>

<Card href="/v2/projects/{project.slug}" {variant} {radius} class="project {cls}">
  <div class="shot" class:tall class:big>
    {#if cover}
      <img src={cover} alt="{project.title} screenshot" loading="lazy" />
    {:else}
      <div class="placeholder"><Shape name="flower" size="38%" color="var(--hero-ink)" motion="spin" speed={30} /></div>
    {/if}
  </div>
  <div class="body">
    <div class="meta"><span>{project.year}</span>{#if host}<span>{host} ↗</span>{/if}</div>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div class="chips">
      {#each project.tech.slice(0, maxTech) as t (t)}<Chip size="sm">{t}</Chip>{/each}
    </div>
  </div>
</Card>

<style>
  .shot {
    position: relative; aspect-ratio: 16 / 10; overflow: hidden; margin: 8px 8px 0;
    border-radius: calc(var(--r-xl) - 8px) calc(var(--r-xl) - 8px) var(--r-sm) var(--r-sm);
    background: var(--sc-high);
  }
  .shot.tall { aspect-ratio: 3 / 4; }
  .shot.big { aspect-ratio: auto; flex: 1; min-height: 280px; }
  img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; transition: transform .8s var(--spring); }
  :global(.project:hover) img { transform: scale(1.04); }
  .placeholder { width: 100%; height: 100%; display: grid; place-items: center; background: var(--grad); }
  .body { padding: 20px 24px 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .meta { display: flex; justify-content: space-between; gap: 12px; font: 600 12px/1 var(--font-mono); opacity: .75; }
  h3 { font-family: var(--font-display); font-size: 28px; line-height: 1.05; font-weight: 750; font-variation-settings: 'wdth' 80, 'opsz' 48, 'wght' 750; letter-spacing: -.015em; }
  p { opacity: .8; font-size: 15px; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 6px; }
  :global(.card.inverse) .chips :global(.chip) { color: var(--inverse-on-surface); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--inverse-on-surface) 30%, transparent); }
  :global(.card.inverse) .shot { background: color-mix(in srgb, var(--inverse-on-surface) 10%, transparent); }
  @media (max-width: 840px) { .shot.tall { aspect-ratio: 16 / 10; } .shot.big { min-height: 200px; } }
</style>
