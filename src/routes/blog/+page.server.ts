import { POSTS } from '$lib/content/blog';

export function load() {
  return { posts: POSTS };
}
