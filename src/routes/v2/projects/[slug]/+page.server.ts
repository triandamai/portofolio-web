import { readFileSync } from 'fs';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import { PROJECTS } from '$lib/content/index';
import { parseFrontmatter } from '$lib/utils/markdown';
import { processCodeBlocks } from '$lib/utils/highlight';

export async function load({ params }) {
  const index = PROJECTS.findIndex((p) => p.slug === params.slug);
  if (index === -1) error(404, `Project "${params.slug}" not found`);

  const raw = readFileSync(join(process.cwd(), `src/lib/content/projects/${params.slug}.md`), 'utf-8');
  const { body } = parseFrontmatter(raw);
  return {
    project: PROJECTS[index],
    next: PROJECTS[(index + 1) % PROJECTS.length],
    content: await processCodeBlocks(body)
  };
}
