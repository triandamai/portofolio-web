<svelte:head>
  <title>resume.pdf — Trian Damai</title>
</svelte:head>

<div class="resume-page">
  <div class="file-header">
    <span class="file-icon" aria-hidden="true">◧</span>
    <h1 class="page-title">resume.pdf</h1>
  </div>
  <p class="page-sub">
    Trian Damai — Software Engineer · Android · Web · Backend
  </p>

  <div class="actions">
    <a
      href="/resume/Trian_Damai_Resume_Software_Engineer.pdf"
      download="Trian-Damai-Resume.pdf"
      class="btn-primary"
    >
      ↓ Download PDF
    </a>
    <a
      href="/resume/Trian_Damai_Resume_Software_Engineer.pdf"
      target="_blank"
      rel="noopener noreferrer"
      class="btn-secondary"
    >
      ↗ Open in browser
    </a>
  </div>

  <div class="resume-meta">
    <div class="meta-row">
      <span class="meta-key">name</span>
      <span class="meta-val">Trian Damai</span>
    </div>
    <div class="meta-row">
      <span class="meta-key">role</span>
      <span class="meta-val">Software Engineer — Android · Web · Backend</span>
    </div>
    <div class="meta-row">
      <span class="meta-key">location</span>
      <span class="meta-val">Jakarta, Indonesia</span>
    </div>
    <div class="meta-row">
      <span class="meta-key">experience</span>
      <span class="meta-val">5+ years</span>
    </div>
    <div class="meta-row">
      <span class="meta-key">email</span>
      <span class="meta-val">
        <a href="mailto:triandamai@gmail.com">triandamai@gmail.com</a>
      </span>
    </div>
    <div class="meta-row">
      <span class="meta-key">linkedin</span>
      <span class="meta-val">
        <a
          href="https://linkedin.com/in/triandamai"
          target="_blank"
          rel="noopener noreferrer">linkedin.com/in/triandamai</a
        >
      </span>
    </div>
  </div>
</div>

<style>
  .resume-page {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .file-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .file-icon {
    font-size: 1.5rem;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  .page-title {
    font-family: var(--font-mono);
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .page-sub {
    font-family: var(--font-sans);
    font-size: 0.875rem;
    color: var(--fg-muted);
    line-height: 1.6;
    margin-top: -1rem;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    text-decoration: none;
    padding: 0.55rem 1.25rem;
    transition:
      opacity 0.15s,
      box-shadow 0.15s;
    letter-spacing: 0.02em;
  }

  .btn-primary {
    background: var(--gradient);
    color: rgba(0, 0, 0, 0.85);
    border: none;
  }

  .btn-primary:hover {
    opacity: 0.88;
    box-shadow: var(--glow);
  }

  .btn-secondary {
    background: none;
    border: 0.5px solid var(--border-mid);
    color: var(--fg-muted);
  }

  .btn-secondary:hover {
    color: var(--fg);
    border-color: var(--grad-a);
  }

  /* JSON-style metadata block */
  .resume-meta {
    background: var(--bg-card);
    border: 0.5px solid var(--border);
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: relative;
    overflow: hidden;
  }

  .resume-meta::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 3px;
    background: var(--gradient-line);
  }

  .meta-row {
    display: flex;
    gap: 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    align-items: baseline;
  }

  .meta-key {
    color: var(--grad-a);
    min-width: 7rem;
    flex-shrink: 0;
  }

  .meta-val {
    color: var(--fg-muted);
  }

  .meta-val a {
    color: var(--grad-b);
    text-decoration: none;
    border-bottom: 0.5px solid transparent;
    transition: border-color 0.12s;
  }

  .meta-val a:hover {
    border-bottom-color: var(--grad-b);
  }
</style>
