<script lang="ts">
  import { dialogStore } from '$lib/stores/dialog.svelte';

  function handleBackdropKey(e: KeyboardEvent) {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') dialogStore.close();
  }

  function handleDialogKey(e: KeyboardEvent) {
    if (e.key === 'Escape') dialogStore.close();
  }
</script>

{#if dialogStore.visible}
  <!-- Backdrop -->
  <div
    class="backdrop"
    role="button"
    tabindex="-1"
    aria-label="Close dialog"
    onclick={dialogStore.close}
    onkeydown={handleBackdropKey}
  ></div>

  <!-- Shell -->
  <div
    class="dialog"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-label={dialogStore.title}
    onkeydown={handleDialogKey}
  >
    <div class="dialog__header">
      <span class="dialog__title">{dialogStore.title}</span>
      <button class="dialog__close" onclick={dialogStore.close} aria-label="Close">×</button>
    </div>

    <div class="dialog__body">
      {#if dialogStore.component}
        <svelte:component this={dialogStore.component} {...dialogStore.data} />
      {/if}
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.65);
    backdrop-filter: blur(4px);
    z-index: 900;
    cursor: default;
  }

  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(500px, 92vw);
    max-height: 90vh;
    background: var(--bg-sidebar);
    border: 0.5px solid var(--border-mid);
    box-shadow: 0 24px 64px rgba(0,0,0,0.7), var(--glow);
    z-index: 901;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    outline: none;
  }

  /* gradient top edge */
  .dialog::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--gradient-line);
  }

  .dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    border-bottom: 0.5px solid var(--border);
    flex-shrink: 0;
  }

  .dialog__title {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--fg-muted);
    letter-spacing: 0.04em;
  }

  .dialog__close {
    background: none;
    border: none;
    color: var(--fg-muted);
    font-size: 1.1rem;
    cursor: pointer;
    line-height: 1;
    padding: 0.1rem 0.3rem;
    transition: color 0.12s;
  }

  .dialog__close:hover { color: var(--fg); }
  .dialog__close:focus-visible { outline: 1px solid var(--grad-a); }

  .dialog__body {
    overflow-y: auto;
    flex: 1;
  }
</style>
