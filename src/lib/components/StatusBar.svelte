<script lang="ts">
  import { page } from '$app/state';

  const lineCol = $derived(() => {
    const map: Record<string, string> = {
      '/': 'Ln 1, Col 1', '/about': 'Ln 42, Col 1',
      '/experience': 'Ln 1, Col 1', '/skills': 'Ln 1, Col 1', '/contact': 'Ln 28, Col 1'
    };
    return map[page.url.pathname] ?? 'Ln 1, Col 1';
  });
</script>

<footer class="status-bar" aria-label="Status Bar">
  <div class="status-bar__left">
    <span class="status-item status-branch">
      <span class="branch-icon" aria-hidden="true">⎇</span> main
    </span>
    <span class="status-item status-ok">⊘ 0 &nbsp; ⚠ 0</span>
  </div>

  <div class="status-bar__right">
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      class="status-item status-resume"
      aria-label="Download resume PDF"
      download
    >↓ Resume</a>
    <a href="mailto:triandamai@gmail.com" class="status-item" aria-label="Email">✉</a>
    <a href="https://github.com/triandamai" target="_blank" rel="noopener noreferrer" class="status-item">GitHub</a>
    <a href="https://linkedin.com/in/triandamai" target="_blank" rel="noopener noreferrer" class="status-item">LinkedIn</a>
    <span class="status-item status-meta">{lineCol()}</span>
    <span class="status-item status-meta">UTF-8</span>
    <span class="status-item status-meta">LF</span>
  </div>
</footer>

<style>
  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--status-bar-height);
    /* gradient bar — the one bold colour block */
    background: var(--gradient);
    color: rgba(0,0,0,0.85);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 500;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
    z-index: 20;
  }

  .status-bar__left, .status-bar__right {
    display: flex;
    align-items: center;
  }

  .status-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0 0.5rem;
    height: var(--status-bar-height);
    text-decoration: none;
    color: rgba(0,0,0,0.8);
    white-space: nowrap;
    transition: background 0.12s;
  }

  .status-item:hover { background: rgba(0,0,0,0.12); }

  a.status-item:focus-visible { outline: 1px solid rgba(0,0,0,0.5); outline-offset: -1px; }

  .status-branch { font-weight: 700; color: rgba(0,0,0,0.9); }

  .branch-icon { font-size: 0.8rem; }

  .status-resume {
    font-weight: 700;
    background: rgba(0,0,0,0.15);
    letter-spacing: 0.02em;
  }

  .status-meta { color: rgba(0,0,0,0.55); }
</style>
