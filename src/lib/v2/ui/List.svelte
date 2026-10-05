<script lang="ts">
  import type { Snippet } from 'svelte';
  let { children, label }: { children: Snippet; label?: string } = $props();
</script>

<!-- Segmented list: items are separated by 2px gaps, outer corners rounded -->
<ul class="list" aria-label={label}>{@render children()}</ul>

<style>
  .list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; border-radius: var(--r-lg); overflow: hidden; }
</style>
