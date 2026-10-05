<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = { id?: string; file: string; title: string; level?: 1 | 2; description?: string; actions?: Snippet };
  let { id, file, title, level = 2, description, actions }: Props = $props();
</script>

<div class="head">
  <div class="titles">
    <span class="file">{file}</span>
    {#if level === 1}<h1 {id}>{title}</h1>{:else}<h2 {id}>{title}</h2>{/if}
  </div>
  {#if description}<p>{description}</p>{/if}
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
</div>

<style>
  .head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; }
  .titles { min-width: 0; }
  .file { font: 600 13px/1 var(--font-mono); color: var(--secondary); letter-spacing: .02em; }
  h1, h2 {
    font-family: var(--font-display); font-size: clamp(2.2rem, 5vw, 3.6rem); line-height: .95; letter-spacing: -.025em;
    font-weight: 800; font-variation-settings: 'wdth' 60, 'opsz' 96, 'wght' 800; margin-top: 10px;
  }
  p { color: var(--on-surface-v); max-width: 46ch; }
</style>
