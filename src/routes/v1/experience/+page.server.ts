import { readFileSync } from 'fs';
import { join } from 'path';

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export function load() {
  const raw = readFileSync(
    join(process.cwd(), 'src/lib/content/experience.json'),
    'utf-8'
  );
  const entries: ExperienceEntry[] = JSON.parse(raw);
  return { entries, raw };
}
