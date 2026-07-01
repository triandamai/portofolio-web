<script lang="ts">
  import { themeStore, THEMES } from '$lib/stores/theme.svelte';

  let { open = $bindable(false) }: { open: boolean } = $props();

  function selectTheme(id: string) {
    themeStore.set(id);
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') open = false;
  }
</script>

{#if open}
  <!-- Click-outside backdrop -->
  <div
    class="picker-backdrop"
    role="button"
    tabindex="-1"
    aria-label="Close theme picker"
    onclick={() => { open = false; }}
    onkeydown={handleKeydown}
  ></div>

  <div class="picker" role="dialog" aria-label="Theme Picker" aria-modal="true">
    <div class="picker__header">
      <span class="picker__title">Color Theme</span>
      <span class="picker__hint">Select appearance</span>
    </div>

    <div class="picker__section-label">DARK</div>
    <ul class="picker__list">
      {#each THEMES.filter(t => t.dark) as theme}
        <li>
          <button
            class="theme-row"
            class:active={themeStore.current === theme.id}
            onclick={() => selectTheme(theme.id)}
            aria-pressed={themeStore.current === theme.id}
          >
            <span class="theme-swatch" aria-hidden="true">
              <span class="swatch" style="background:{theme.preview[0]};border-color:{theme.preview[1]}20"></span>
              <span class="swatch-dot" style="background:{theme.preview[1]}"></span>
              <span class="swatch-dot" style="background:{theme.preview[2]}"></span>
            </span>
            <span class="theme-name">{theme.name}</span>
            {#if themeStore.current === theme.id}
              <span class="theme-check" aria-hidden="true">✓</span>
            {/if}
          </button>
        </li>
      {/each}
    </ul>

    <div class="picker__section-label">LIGHT</div>
    <ul class="picker__list">
      {#each THEMES.filter(t => !t.dark) as theme}
        <li>
          <button
            class="theme-row"
            class:active={themeStore.current === theme.id}
            onclick={() => selectTheme(theme.id)}
            aria-pressed={themeStore.current === theme.id}
          >
            <span class="theme-swatch" aria-hidden="true">
              <span class="swatch" style="background:{theme.preview[0]};border-color:rgba(0,0,0,0.15)"></span>
              <span class="swatch-dot" style="background:{theme.preview[1]}"></span>
              <span class="swatch-dot" style="background:{theme.preview[2]}"></span>
            </span>
            <span class="theme-name">{theme.name}</span>
            {#if themeStore.current === theme.id}
              <span class="theme-check" aria-hidden="true">✓</span>
            {/if}
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .picker-backdrop {
    position: fixed;
    inset: 0;
    z-index: 500;
    background: transparent;
    cursor: default;
  }

  .picker {
    position: fixed;
    bottom: calc(var(--status-bar-height) + 0.5rem);
    left: calc(var(--activity-bar-width) + 0.5rem);
    width: 220px;
    background: var(--bg-sidebar);
    border: 0.5px solid var(--border-mid);
    box-shadow:
      0 0 0 0.5px rgba(255,255,255,0.05),
      0 16px 48px rgba(0,0,0,0.7),
      var(--glow);
    z-index: 501;
    overflow: hidden;
  }

  .picker__header {
    padding: 0.625rem 0.875rem 0.5rem;
    border-bottom: 0.5px solid var(--border);
  }

  .picker__title {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--fg);
    letter-spacing: 0.02em;
  }

  .picker__hint {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    color: var(--fg-muted);
  }

  .picker__section-label {
    padding: 0.5rem 0.875rem 0.2rem;
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--fg-muted);
  }

  .picker__list { list-style: none; margin: 0; padding: 0 0 0.375rem; }

  .theme-row {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
    padding: 0.35rem 0.875rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: background 0.1s;
  }

  .theme-row:hover { background: var(--bg-hover); }
  .theme-row:focus-visible { outline: 1px solid var(--grad-a); outline-offset: -1px; }

  .theme-row.active { background: var(--bg-active); }

  .theme-swatch {
    display: flex;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }

  .swatch {
    display: inline-block;
    width: 18px;
    height: 14px;
    border: 0.5px solid;
    flex-shrink: 0;
  }

  .swatch-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .theme-name {
    flex: 1;
    font-family: var(--font-mono);
    font-size: 0.775rem;
    color: var(--fg);
    text-align: left;
  }

  .theme-check {
    font-size: 0.7rem;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
  }
</style>
