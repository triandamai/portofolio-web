import { redirect } from '@sveltejs/kit';

// The new design used to live under /v2 before it became the default. Keep old links working.
export function GET({ params, url }) {
  redirect(308, `/${params.path}${url.search}`);
}
