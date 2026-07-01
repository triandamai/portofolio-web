import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';

let highlighter: HighlighterGeneric<BundledLanguage, BundledTheme> | null = null;

async function getHighlighter() {
  if (!highlighter) {
    const { createHighlighter } = await import('shiki');
    highlighter = await createHighlighter({
      themes: ['one-dark-pro'],
      langs: ['typescript', 'javascript', 'svelte', 'json', 'markdown', 'bash', 'rust', 'kotlin']
    });
  }
  return highlighter;
}

export async function highlight(code: string, lang: string): Promise<string> {
  const hl = await getHighlighter();
  const validLangs = ['typescript', 'javascript', 'svelte', 'json', 'markdown', 'bash', 'rust', 'kotlin'];
  const useLang = validLangs.includes(lang) ? lang : 'typescript';
  return hl.codeToHtml(code, { lang: useLang as BundledLanguage, theme: 'one-dark-pro' });
}

export function languageFromFilename(filename: string): string {
  const ext = filename.split('.').pop() ?? '';
  const map: Record<string, string> = {
    ts: 'typescript', js: 'javascript', svelte: 'svelte',
    json: 'json', md: 'markdown', sh: 'bash', rs: 'rust', kt: 'kotlin'
  };
  return map[ext] ?? 'typescript';
}
