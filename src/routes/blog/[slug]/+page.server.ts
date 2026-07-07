import { readFileSync } from 'fs';
import { join } from 'path';
import { error } from '@sveltejs/kit';
import { POSTS } from '$lib/content/blog';
import { parseFrontmatter } from '$lib/utils/markdown';
import { processCodeBlocks } from '$lib/utils/highlight';

export async function load({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = POSTS.find(p => p.slug === slug && p.published);
  if (!post) throw error(404, `Post "${slug}" not found`);

  const raw = readFileSync(
    join(process.cwd(), `src/lib/content/posts/${slug}.md`),
    'utf-8'
  );
  const { body } = parseFrontmatter(raw);
  const content = await processCodeBlocks(body);
  return { post, content };
}
