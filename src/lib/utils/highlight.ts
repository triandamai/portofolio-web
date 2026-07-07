import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';

const THEME = 'tokyo-night';
const LANGS = ['typescript', 'javascript', 'svelte', 'json', 'markdown', 'bash', 'rust', 'kotlin', 'java', 'html', 'css'];

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null;

async function getHighlighter() {
  if (!highlighter) {
    const { createHighlighter } = await import('shiki');
    highlighter = await createHighlighter({ themes: [THEME], langs: LANGS });
  }
  return highlighter;
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function highlight(code: string, lang: string): Promise<string> {
  const hl = await getHighlighter();
  const useLang = LANGS.includes(lang) ? lang : 'typescript';
  return hl.codeToHtml(code, { lang: useLang as BundledLanguage, theme: THEME });
}

export async function processCodeBlocks(md: string): Promise<string> {
  const hl = await getHighlighter();
  const loaded = hl.getLoadedLanguages();

  return md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const trimmed = code.trimEnd();
    const header = `<div class="code-block__header"><span class="code-block__lang">${lang || 'text'}</span></div>`;

    if (lang && loaded.includes(lang as BundledLanguage)) {
      const inner = hl.codeToHtml(trimmed, { lang: lang as BundledLanguage, theme: THEME });
      return `<div class="code-block">${header}${inner}</div>`;
    }

    return `<div class="code-block">${header}<pre class="code-block__plain"><code>${escHtml(trimmed)}</code></pre></div>`;
  });
}

export function languageFromFilename(filename: string): string {
  const ext = filename.split('.').pop() ?? '';
  const map: Record<string, string> = {
    ts: 'typescript', js: 'javascript', svelte: 'svelte',
    json: 'json', md: 'markdown', sh: 'bash', rs: 'rust', kt: 'kotlin', java: 'java'
  };
  return map[ext] ?? 'typescript';
}
