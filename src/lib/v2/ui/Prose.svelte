<script lang="ts">
  import { renderMarkdown } from '$lib/utils/markdown';

  let { content }: { content: string } = $props();

  /** Pages that only exist in the IDE edition, which now lives under /v1. */
  const V1_ONLY = /^\/(experience|skills|snippets|resume)\/?$|^\/snippets\//;

  /**
   * Content links use root paths, which are v2 pages. Send the few v1-only pages
   * to /v1, with a full reload so v1's stylesheet doesn't mix with v2's.
   */
  function retarget(html: string): string {
    return html.replace(/<a href="(\/[^"]*)"/g, (match, href: string) => {
      if (V1_ONLY.test(href)) return `<a href="/v1${href}" data-sveltekit-reload`;
      if (href === '/v1' || href.startsWith('/v1/')) return `${match} data-sveltekit-reload`;
      return match;
    });
  }

  /** "> line" pull quotes; v1's renderer leaves these as text, so handle them here. */
  const withQuotes = (md: string) => md.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  /**
   * Content files are hard-wrapped at ~90 chars and the shared renderer turns every
   * line into its own <p>. Join soft-wrapped lines back into one paragraph first.
   */
  function unwrap(md: string): string {
    const block = /^(#|-|\||!\[|>|```|---|\d+\.\s|<)/;
    const out: string[] = [];
    let fenced = false;
    for (const line of md.split('\n')) {
      // Leave code alone: raw fences, and pre-highlighted <pre> blocks spanning several lines.
      if (line.startsWith('```')) fenced = !fenced;
      if (line.includes('<pre')) fenced = !line.includes('</pre>');
      else if (fenced && line.includes('</pre>')) { out.push(line); fenced = false; continue; }
      const prev = out[out.length - 1];
      if (!fenced && prev && line.trim() && !block.test(line) && !block.test(prev) && prev.trim()) {
        out[out.length - 1] = `${prev} ${line.trim()}`;
      } else {
        out.push(line);
      }
    }
    return out.join('\n');
  }

  const html = $derived(retarget(renderMarkdown(withQuotes(unwrap(content)))));
</script>

<div class="prose">
  {@html html}
</div>

<style>
  .prose { max-width: 68ch; font-size: 17px; line-height: 1.7; color: var(--on-surface); min-width: 0; }
  .prose :global(h1) { display: none; }
  .prose :global(h2) {
    font-family: var(--font-display); font-size: 28px; line-height: 1.1; letter-spacing: -.015em;
    font-weight: 750; font-variation-settings: 'wdth' 75, 'wght' 750, 'opsz' 36;
    margin: 48px 0 12px;
  }
  .prose :global(h3) { font: 600 13px/1.2 var(--font-mono); letter-spacing: .04em; color: var(--secondary); text-transform: uppercase; margin: 28px 0 8px; }
  .prose :global(p) { margin: 12px 0; color: var(--on-surface-v); }
  .prose :global(strong) { color: var(--on-surface); font-weight: 650; }
  .prose :global(a) { color: var(--primary); text-decoration-thickness: 2px; text-underline-offset: 3px; text-decoration-color: color-mix(in srgb, var(--primary) 35%, transparent); }
  .prose :global(a:hover) { text-decoration-color: var(--primary); }
  .prose :global(p > code), .prose :global(li > code), .prose :global(td > code) {
    font: 500 .88em/1 var(--font-mono); background: var(--sc-high); padding: 3px 7px; border-radius: var(--r-sm);
  }
  .prose :global(ul) { padding-left: 0; list-style: none; margin: 14px 0; display: flex; flex-direction: column; gap: 8px; }
  .prose :global(li) { position: relative; padding-left: 26px; color: var(--on-surface-v); }
  .prose :global(li::before) {
    content: ''; position: absolute; left: 4px; top: .55em; width: 10px; height: 10px;
    background: var(--grad-strong); border-radius: 3px; transform: rotate(45deg);
  }
  .prose :global(blockquote) {
    margin: 8px 0 32px; padding: 4px 0 4px 24px; position: relative;
    font-family: var(--font-display); font-size: clamp(22px, 2.6vw, 30px); line-height: 1.2; letter-spacing: -.01em;
    font-variation-settings: 'wdth' 85, 'wght' 520, 'opsz' 36; color: var(--on-surface);
  }
  .prose :global(blockquote::before) { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; border-radius: var(--r-full); background: var(--grad-strong); }
  .prose :global(hr) { border: 0; height: 1px; background: var(--outline-v); margin: 40px 0; }
  .prose :global(.prose-img) { display: block; width: 100%; height: auto; border-radius: var(--r-xl); margin: 20px 0; background: var(--sc-high); }
  .prose :global(.screenshot-grid) {
    display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory;
    margin: 20px 0; padding-bottom: 8px; max-width: 100%;
  }
  .prose :global(.screenshot-grid .prose-img) {
    flex: 0 0 auto; width: auto; height: 340px; max-width: 85%; margin: 0; object-fit: cover; object-position: top;
    scroll-snap-align: start; border-radius: var(--r-lg);
  }
  .prose :global(.screenshot-grid .prose-img:first-child) { border-radius: var(--r-xxl) var(--r-lg) var(--r-lg) var(--r-xxl); }
  .prose :global(table) { width: 100%; border-collapse: collapse; font-size: 15px; margin: 20px 0; display: block; overflow-x: auto; }
  .prose :global(th) { text-align: left; font: 600 12px/1 var(--font-mono); color: var(--on-surface-v); padding: 10px 12px; border-bottom: 1px solid var(--outline-v); }
  .prose :global(td) { padding: 10px 12px; border-bottom: 1px solid var(--outline-v); color: var(--on-surface-v); }

  .prose :global(.code-block) { margin: 20px 0; border-radius: var(--r-lg); overflow: hidden; background: #1a1b26; }
  .prose :global(.code-block__header) { padding: 8px 16px; font: 600 12px/1 var(--font-mono); color: #a9b1d6; background: #16161e; }
  .prose :global(.code-block pre) { margin: 0; padding: 16px; overflow-x: auto; font: 13.5px/1.6 var(--font-mono); }
  .prose :global(.code-block__plain) { color: #c0caf5; }

  @media (max-width: 840px) {
    .prose { font-size: 16px; }
    .prose :global(.screenshot-grid .prose-img) { height: 260px; }
  }
</style>
