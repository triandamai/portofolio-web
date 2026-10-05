import { redirect } from '@sveltejs/kit';

// v2 is the default experience; the IDE edition lives on at /v1.
export function load() {
  redirect(307, '/v2');
}
