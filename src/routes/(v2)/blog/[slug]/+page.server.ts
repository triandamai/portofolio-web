import { readFileSync } from 'fs';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import { POSTS } from '$lib/content/blog';
import { parseFrontmatter } from '$lib/utils/markdown';
import { processCodeBlocks } from '$lib/utils/highlight';

export async function load({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug && p.published);
  if (!post) error(404, `Post "${params.slug}" not found`);

  const raw = readFileSync(join(process.cwd(), `src/lib/content/posts/${params.slug}.md`), 'utf-8');
  const { body } = parseFrontmatter(raw);
  return { post, content: await processCodeBlocks(body) };
}
