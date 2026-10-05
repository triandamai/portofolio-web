<script lang="ts">
  import { renderMarkdown } from '$lib/utils/markdown';

  let { content }: { content: string } = $props();

  /**
   * Content links were written for v1 paths. Point the ones v2 has pages
   * for at /v2, and force a full reload for the rest so v1's stylesheet
   * loads cleanly instead of mixing with v2's.
   */
  function retarget(html: string): string {
    return html.replace(/<a href="(\/[^"]*)"/g, (_, href: string) => {
      if (/^\/(projects|blog)(\/|$)/.test(href)) return `<a href="/v2${href}"`;
      if (href.startsWith('/v2')) return `<a href="${href}"`;
      return `<a href="${href}" data-sveltekit-reload`;
    });
  }

  /** "> line" pull quotes; v1's renderer leaves these as text, so handle them here. */
  const withQuotes = (md: string) => md.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  const html = $derived(retarget(renderMarkdown(withQuotes(content))));
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
