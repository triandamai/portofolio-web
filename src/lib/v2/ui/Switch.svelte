<script lang="ts">
  let { checked = $bindable(false), label, onchange }: { checked?: boolean; label: string; onchange?: (v: boolean) => void } = $props();
</script>

<div class="wrap">
  <button type="button" role="switch" aria-checked={checked} aria-label={label} onclick={() => { checked = !checked; onchange?.(checked); }}></button>
  <span aria-hidden="true">{label}</span>
</div>

<style>
  .wrap { display: inline-flex; align-items: center; gap: 12px; font-size: 14px; }
  button {
    width: 52px; height: 32px; border-radius: var(--r-full); border: 0; padding: 0; cursor: pointer; position: relative;
    background: var(--sc-highest); box-shadow: inset 0 0 0 2px var(--outline); transition: background-color .25s;
  }
  button::before {
    content: ''; position: absolute; top: 8px; left: 8px; width: 16px; height: 16px; border-radius: 50%;
    background: var(--outline); transition: all .45s var(--spring-fast);
  }
  button[aria-checked='true'] { background: var(--primary); box-shadow: none; }
  button[aria-checked='true']::before { left: 24px; top: 4px; width: 24px; height: 24px; background: var(--on-primary); }
  button:active::before { width: 28px; height: 28px; top: 2px; }
</style>
