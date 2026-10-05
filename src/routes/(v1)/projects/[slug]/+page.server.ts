import { readFileSync } from 'fs';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import { PROJECTS } from '$lib/content/index';
import { parseFrontmatter } from '$lib/utils/markdown';

export function load({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) throw error(404, `Project "${slug}" not found`);

  const raw = readFileSync(
    join(process.cwd(), `src/lib/content/projects/${slug}.md`),
    'utf-8'
  );
  const { body } = parseFrontmatter(raw);
  return { project, content: body };
}
