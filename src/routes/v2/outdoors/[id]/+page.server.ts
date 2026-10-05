import { error } from '@sveltejs/kit';
import { trails } from '$lib/content/outdoors';

export function load({ params }) {
  const index = trails.findIndex((t) => t.id === params.id);
  if (index === -1) error(404, 'Trail not found');
  return {
    trail: trails[index],
    prev: index > 0 ? trails[index - 1] : null,
    next: index < trails.length - 1 ? trails[index + 1] : null
  };
}
