import { redirect, type Handle } from '@sveltejs/kit';

/**
 * Old IDE-edition URLs with no page in the new design. Sections that exist on the
 * new home page go there; the rest go to their /v1 page.
 */
const MOVED: [RegExp, (m: RegExpMatchArray) => string][] = [
  [/^\/experience\/?$/, () => '/#experience'],
  [/^\/skills\/?$/, () => '/#skills'],
  [/^\/snippets(\/.*)?$/, (m) => `/v1/snippets${m[1] ?? ''}`],
  [/^\/resume\/?$/, () => '/v1/resume']
];

export const handle: Handle = async ({ event, resolve }) => {
  for (const [pattern, to] of MOVED) {
    const m = event.url.pathname.match(pattern);
    if (m) redirect(308, to(m));
  }
  return resolve(event);
};
