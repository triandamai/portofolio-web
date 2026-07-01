<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  let { data } = $props();
</script>

<svelte:head>
  <title>welcome.md — Trian Damai</title>
</svelte:head>

<MarkdownRenderer content={data.content} />
