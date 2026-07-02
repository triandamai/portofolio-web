<script lang="ts">
  let { content }: { content: string } = $props();

  function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  }

  function renderMarkdown(md: string): string {
    return md
      .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
        `<pre class="code-block" data-lang="${lang || 'text'}"><div class="code-block__header"><span class="code-block__lang">${lang || 'text'}</span></div><code>${escHtml(code.trimEnd())}</code></pre>`
      )
      .replace(/^### (.+)$/gm, (_, text) => `<h3 id="${slugify(text)}">${text}</h3>`)
      .replace(/^## (.+)$/gm, (_, text) => `<h2 id="${slugify(text)}">${text}</h2>`)
      .replace(/^# (.+)$/gm, (_, text) => `<h1 id="${slugify(text)}">${text}</h1>`)
      .replace(/^---$/gm, '<hr>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // 2+ consecutive image lines → screenshot grid
      .replace(/((?:!\[[^\]]*\]\([^)]+\)[ \t]*\n?){2,})/g, (block) => {
        const imgs = block.trim().split('\n')
          .map(l => { const m = l.match(/!\[([^\]]*)\]\(([^)]+)\)/); return m ? `<img src="${m[2]}" alt="${m[1]}" class="prose-img" loading="lazy" />` : ''; })
          .filter(Boolean).join('');
        return `<div class="screenshot-grid">${imgs}</div>`;
      })
      // single images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="prose-img" loading="lazy" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)+)/g, renderTable)
      .replace(/((?:^- .+\n?)+)/gm, (block) => {
        const items = block.trim().split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('');
        return `<ul>${items}</ul>`;
      })
      .replace(/^(?!<\/?[hupdbctsi])(.+)$/gm, '<p>$1</p>')
      .replace(/<p>(<[hup])/g, '$1')
      .replace(/(<\/[hup][^>]*>)<\/p>/g, '$1');
  }

  function renderTable(block: string): string {
    const lines = block.trim().split('\n');
    const headers = lines[0].split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
    const rows = lines.slice(2).map(line => {
      const cells = line.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
  }

  function escHtml(s: string): string {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  const html = $derived(renderMarkdown(content));
</script>

<div class="prose" role="document">
  {@html html}
</div>

<style>
  .prose {
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    line-height: 1.75;
    color: var(--fg);
    max-width: 72ch;
  }

  /* Gradient headings */
  .prose :global(h1) {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.5px solid var(--border);
    font-family: var(--font-mono);
    /* gradient text */
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .prose :global(h2) {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 2rem 0 0.625rem;
    font-family: var(--font-mono);
    color: var(--fg);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .prose :global(h2::before) {
    content: '';
    display: inline-block;
    width: 3px;
    height: 1em;
    background: var(--gradient-line);
    flex-shrink: 0;
  }

  .prose :global(h3) {
    font-size: 0.8rem;
    font-weight: 700;
    margin: 1.25rem 0 0.375rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--fg-muted);
  }

  .prose :global(p) { margin: 0.625rem 0; color: var(--fg-muted); }

  .prose :global(.prose-img) {
    display: block;
    width: 100%;
    max-width: 100%;
    border: 0.5px solid var(--border);
    margin: 1.25rem 0;
    object-fit: cover;
  }

  .prose :global(.screenshot-grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 0.75rem;
    margin: 1.25rem 0;
  }

  .prose :global(.screenshot-grid .prose-img) {
    margin: 0;
    height: 180px;
    cursor: zoom-in;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .prose :global(.screenshot-grid .prose-img:hover) {
    border-color: var(--grad-a);
    box-shadow: var(--glow);
  }

  .prose :global(a) {
    color: var(--grad-b);
    text-decoration: none;
    border-bottom: 0.5px solid rgba(255,153,102,0.4);
    transition: border-color 0.12s, color 0.12s;
  }

  .prose :global(a:hover) {
    color: var(--fg);
    border-bottom-color: var(--grad-b);
  }

  .prose :global(code) {
    font-family: var(--font-mono);
    font-size: 0.82em;
    background: rgba(189,52,254,0.1);
    border: 0.5px solid rgba(189,52,254,0.25);
    padding: 0.1em 0.4em;
    color: var(--grad-a);
  }

  .prose :global(.code-block) {
    background: rgba(255,255,255,0.02);
    border: 0.5px solid var(--border);
    margin: 1.25rem 0;
    overflow: hidden;
  }

  .prose :global(.code-block__header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0.875rem;
    background: rgba(255,255,255,0.025);
    border-bottom: 0.5px solid var(--border);
  }

  .prose :global(.code-block__lang) {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .prose :global(.code-block code) {
    display: block;
    padding: 1rem 0.875rem;
    overflow-x: auto;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    line-height: 1.65;
    color: var(--fg);
    background: none;
    border: none;
  }

  .prose :global(ul) { padding-left: 1.25rem; margin: 0.5rem 0; }

  .prose :global(li) {
    margin: 0.3rem 0;
    color: var(--fg-muted);
    position: relative;
  }

  .prose :global(li::marker) { color: var(--grad-a); }

  .prose :global(hr) {
    border: none;
    height: 0.5px;
    background: var(--gradient-line);
    opacity: 0.3;
    margin: 1.75rem 0;
  }

  .prose :global(strong) { font-weight: 700; color: var(--fg); }

  .prose :global(em) { color: var(--fg-muted); }

  .prose :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 1.25rem 0;
    font-family: var(--font-mono);
    font-size: 0.78rem;
  }

  .prose :global(th), .prose :global(td) {
    border: 0.5px solid var(--border);
    padding: 0.4rem 0.875rem;
    text-align: left;
  }

  .prose :global(th) {
    background: rgba(189,52,254,0.08);
    color: var(--fg);
    font-weight: 700;
  }

  .prose :global(td) { color: var(--fg-muted); }
</style>
