import { readFileSync } from 'fs';
import { join } from 'path';
import experience from '$lib/content/experience.json';

export function load() {
  const content = readFileSync(join(process.cwd(), 'src/lib/content/about.md'), 'utf-8')
    // v2 has no command palette; drop the v1 keyboard hint.
    .replace(/ — or hit `Ctrl\+K` to jump anywhere\./, '.');
  const current = experience.find((e) => /present/i.test(e.period)) ?? experience[0];
  const firstYear = Math.min(...experience.map((e) => Number(e.period.match(/\d{4}/)?.[0] ?? Infinity)));
  return { content, current: { role: current.role, company: current.company }, firstYear };
}
