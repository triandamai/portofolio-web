import { readFileSync } from 'fs';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import { SNIPPETS } from '$lib/content/index';

export function load({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const snippet = SNIPPETS.find(s => s.slug === slug);
  if (!snippet) throw error(404, `Snippet "${slug}" not found`);

  const code = readFileSync(
    join(process.cwd(), `src/lib/content/snippets/${snippet.filename}`),
    'utf-8'
  );
  return { snippet, code };
}
