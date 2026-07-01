<script lang="ts">
  import { onMount } from 'svelte';

  const STORAGE_KEY = 'portfolio-mobile-notice-v2';

  let visible = $state(false);

  onMount(() => {
    // Only trigger on small screens and only once
    if (window.innerWidth < 768) {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          visible = true;
        }
      } catch {
        visible = true;
      }
    }
  });

  function dismiss() {
    visible = false;
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
  }
</script>

{#if visible}
  <div class="overlay" role="dialog" aria-modal="true" aria-label="Desktop recommendation">
    <div class="card">
      <div class="card__icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="3" width="20" height="14" rx="1"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      </div>

      <h2 class="card__title">Best on desktop</h2>
      <p class="card__body">
        This portfolio is built like a code editor — tabs, sidebar, command palette.
        It works best with a full screen and keyboard.<br><br>
        You're welcome to explore on mobile, but some things will feel cramped.
      </p>

      <div class="card__hint">
        <span class="hint-key">⌘K</span> opens the command palette anywhere
      </div>

      <button class="btn-continue" onclick={dismiss}>
        Continue on mobile →
      </button>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: 2000;
  }

  .card {
    width: 100%;
    max-width: 340px;
    background: var(--bg-sidebar);
    border: 0.5px solid var(--border-mid);
    box-shadow:
      0 0 0 0.5px rgba(255,255,255,0.05),
      0 24px 64px rgba(0,0,0,0.8),
      var(--glow);
    padding: 2rem 1.75rem 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.875rem;
    position: relative;
    overflow: hidden;
  }

  /* gradient top edge */
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--gradient-line);
  }

  .card__icon {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  /* icon SVG needs currentColor trick */
  .card__icon svg {
    stroke: url(#grad) var(--grad-a);
  }

  .card__title {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.01em;
  }

  .card__body {
    font-family: var(--font-sans);
    font-size: 0.83rem;
    line-height: 1.65;
    color: var(--fg-muted);
  }

  .card__hint {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--fg-muted);
    background: var(--bg-hover);
    border: 0.5px solid var(--border);
    padding: 0.3rem 0.75rem;
    width: 100%;
    justify-content: center;
  }

  .hint-key {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }

  .btn-continue {
    width: 100%;
    padding: 0.625rem 1rem;
    background: var(--gradient);
    border: none;
    color: rgba(0,0,0,0.85);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: opacity 0.15s;
    letter-spacing: 0.02em;
  }

  .btn-continue:hover { opacity: 0.9; }
  .btn-continue:focus-visible { outline: 2px solid var(--grad-a); outline-offset: 2px; }
  .btn-continue:active { opacity: 0.8; }
</style>
