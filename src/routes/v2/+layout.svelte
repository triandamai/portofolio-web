<script lang="ts">
  import '$lib/v2/styles/base.css';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import {
    NavRail, NavBar, Fab, IconButton, GradientPicker, ThemeToggle, Snackbar, Shape, appearance, type NavItem
  } from '$lib/v2';
  import { PREPAINT_SCRIPT } from '$lib/v2/stores/appearance.svelte';
  import ContactFooter from '$lib/v2/sections/ContactFooter.svelte';

  let { children } = $props();

  const NAV: NavItem[] = [
    { href: '/v2', label: 'Home', icon: 'home' },
    { href: '/v2/projects', label: 'Work', icon: 'deployed_code', match: ['/v2/projects'] },
    { href: '/v2/blog', label: 'Writing', icon: 'edit_note', match: ['/v2/blog'] },
    { href: '/v2/system', label: 'System', icon: 'palette' }
  ];

  onMount(() => appearance.init());
</script>

<svelte:head>
  {@html `<script>${PREPAINT_SCRIPT}</script>`}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,300..1000&display=swap" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,300..600,0..1,0&display=block" />
</svelte:head>

<a class="skip" href="#content">Skip to content</a>

<div class="shell">
  <div class="rail-wrap">
    <NavRail items={NAV} pathname={page.url.pathname}>
      {#snippet fab()}
        <Fab icon="mail" label="Contact" href="#contact" />
      {/snippet}
      {#snippet footer()}
        <IconButton icon="terminal" label="Open the IDE edition (v1)" href="/v1" data-sveltekit-reload />
      {/snippet}
    </NavRail>
  </div>

  <div class="column">
    <header class="topbar">
      <a class="brand" href="/v2">
        <Shape name="cookie9" size="28px" color="var(--grad)" motion="spin" speed={24} />
        <span><b>trian</b>.space</span>
      </a>
      <div class="tools">
        <div class="picker-full"><GradientPicker /></div>
        <div class="picker-compact"><GradientPicker compact /></div>
        <ThemeToggle />
      </div>
    </header>

    <main id="content" tabindex="-1">
      {@render children()}
    </main>

    <ContactFooter />
  </div>
</div>

<div class="bar-wrap"><NavBar items={NAV} pathname={page.url.pathname} /></div>
<Snackbar />

<style>
  .skip { position: absolute; left: 16px; top: -100px; z-index: 100; background: var(--primary); color: var(--on-primary); padding: 10px 16px; border-radius: var(--r-full); }
  .skip:focus { top: 16px; }

  .shell { display: grid; grid-template-columns: var(--rail-w) minmax(0, 1fr); min-height: 100vh; }
  .column {
    min-width: 0; display: flex; flex-direction: column; gap: 72px;
    padding-inline: clamp(16px, 3vw, 40px) clamp(16px, 4vw, 56px);
    padding-block: calc(20px + env(safe-area-inset-top, 0px)) 48px;
  }
  main { display: flex; flex-direction: column; gap: 72px; min-width: 0; }
  main:focus-visible { outline: none; }

  .topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: -40px; }
  .brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; font: 500 15px/1 var(--font-mono); color: var(--on-surface-v); }
  .brand b { color: var(--on-surface); font-weight: 600; }
  .tools { display: flex; align-items: center; gap: 8px; }
  .picker-compact { display: none; }
  .bar-wrap { display: none; }

  @media (max-width: 840px) {
    .shell { grid-template-columns: minmax(0, 1fr); }
    .rail-wrap { display: none; }
    .bar-wrap { display: block; }
    .column { gap: 56px; padding-inline: 16px; padding-bottom: calc(112px + env(safe-area-inset-bottom, 0px)); }
    main { gap: 56px; }
    .topbar { margin-bottom: -32px; }
    .picker-full { display: none; }
    .picker-compact { display: block; }
  }
  @media (max-width: 420px) {
    .brand span { display: none; }
  }
</style>
