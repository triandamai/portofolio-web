<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>about.md — Trian Damai</title>
  <meta name="description" content="About Trian Damai — full-stack engineer specializing in SvelteKit, TypeScript, and Android." />
</svelte:head>

<MarkdownRenderer content={data.content} />
