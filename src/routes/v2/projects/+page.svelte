<script lang="ts">
  import { ButtonGroup, SectionHeader } from '$lib/v2';
  import ProjectCard from '$lib/v2/sections/ProjectCard.svelte';
  import { projectKind, type ProjectKind } from '$lib/v2/content';

  let { data } = $props();

  let kind = $state<'all' | ProjectKind>('all');
  const shown = $derived(data.projects.filter((p) => kind === 'all' || projectKind(p) === kind));
  // Asymmetric corners rotate through the grid so neighbours never match.
  const RADII = [
    'var(--r-xxl) var(--r-sm) var(--r-xl) var(--r-xl)',
    'var(--r-sm) var(--r-xl) var(--r-xl) var(--r-xxl)',
    'var(--r-xl) var(--r-xl) var(--r-xxl) var(--r-sm)'
  ];
</script>

<svelte:head>
  <title>Projects · Trian Damai</title>
  <meta name="description" content="Products Trian Damai built and shipped: cekmotor.id, Shipyard, uniflor.ac.id, Arta, Tudu and this portfolio." />
</svelte:head>

<section>
  <SectionHeader level={1} file="projects/" title="Things I built and finished"
    description="Side products, client rebuilds and Android apps. Each one shipped to real users.">
    {#snippet actions()}
      <ButtonGroup label="Filter projects" bind:value={kind} options={[
        { value: 'all', label: 'All' },
        { value: 'web', label: 'Web', icon: 'language' },
        { value: 'mobile', label: 'Mobile', icon: 'smartphone' }
      ]} />
    {/snippet}
  </SectionHeader>

  <div class="grid">
    {#each shown as project, i (project.slug)}
      <ProjectCard {project} radius={RADII[i % RADII.length]} variant={project.slug === 'shipyard' ? 'inverse' : 'filled'} />
    {/each}
  </div>
</section>

<style>
  section { display: flex; flex-direction: column; gap: 28px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr)); gap: 12px; }
</style>
