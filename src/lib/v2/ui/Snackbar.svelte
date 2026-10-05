<script lang="ts">
  import { snackbar } from '../stores/snackbar.svelte';
</script>

<div class="snack" class:show={snackbar.visible} role="status" aria-live="polite">
  <span>{snackbar.message}</span>
  <button type="button" onclick={() => snackbar.dismiss()}>Dismiss</button>
</div>

<style>
  .snack {
    position: fixed; left: 50%; z-index: 60;
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
    transform: translate(-50%, 160%); visibility: hidden;
    max-width: calc(100vw - 32px);
    background: var(--inverse-surface); color: var(--inverse-on-surface);
    padding: 14px 18px; border-radius: var(--r-sm);
    display: flex; gap: 16px; align-items: center; font-size: 14px;
    transition: transform .45s var(--spring), visibility 0s .45s;
  }
  .show { transform: translate(-50%, 0); visibility: visible; transition: transform .45s var(--spring), visibility 0s; }
  button { background: none; border: 0; color: var(--inverse-primary); font: 600 14px var(--font-body); cursor: pointer; }
  @media (max-width: 840px) { .snack { bottom: calc(96px + env(safe-area-inset-bottom, 0px)); } }
</style>
