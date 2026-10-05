import { readFileSync } from 'fs';
import { join } from 'path';

export function load() {
  const content = readFileSync(
    join(process.cwd(), 'src/lib/content/welcome.md'),
    'utf-8'
  );
  return { content };
}
