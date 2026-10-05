import { readFileSync } from 'fs';
import { join } from 'path';

/** Pull the plain bullet list under a "## heading" out of contact.md. */
function listUnder(md: string, heading: string): string[] {
  const section = md.split(/^## /m).find((s) => s.startsWith(heading));
  if (!section) return [];
  return section
    .split('\n')
    .filter((l) => l.startsWith('- '))
    .map((l) => l.slice(2).trim());
}

function paragraphUnder(md: string, heading: string): string {
  const section = md.split(/^## /m).find((s) => s.startsWith(heading));
  return section?.split('\n').slice(1).find((l) => l.trim() && !l.startsWith('-'))?.trim() ?? '';
}

export function load() {
  const md = readFileSync(join(process.cwd(), 'src/lib/content/contact.md'), 'utf-8');
  return {
    intro: md.split('\n').find((l) => l.trim() && !l.startsWith('#')) ?? '',
    openTo: listUnder(md, "What I'm open to"),
    responseTime: paragraphUnder(md, 'Response time')
  };
}
