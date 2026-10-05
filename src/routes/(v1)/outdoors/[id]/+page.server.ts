import { error } from '@sveltejs/kit';
import { trails } from '$lib/content/outdoors';

export function load({ params }: { params: { id: string } }) {
  const trail = trails.find(t => t.id === params.id);
  if (!trail) error(404, 'Trail not found');
  return { trail };
}
