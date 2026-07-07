import { POSTS } from '$lib/content/blog';

export function load() {
  return { posts: POSTS.filter(p => p.published) };
}
