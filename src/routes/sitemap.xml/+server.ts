import { PROJECTS, SNIPPETS } from '$lib/content/index';
import { POSTS } from '$lib/content/blog';
import { trails } from '$lib/content/outdoors';

export const prerender = true;

export async function GET() {
  const domain = 'https://trian.space';

  const v2Pages = [
    '/v2',
    '/v2/projects',
    '/v2/blog',
    '/v2/system',
    ...PROJECTS.map(project => `/v2/projects/${project.slug}`),
    ...POSTS.filter(post => post.published).map(post => `/v2/blog/${post.slug}`)
  ];

  // v1 (IDE edition) pages stay indexed at lower priority
  const staticPages = [
    '/v1',
    '/about',
    '/experience',
    '/skills',
    '/projects',
    '/snippets',
    '/blog',
    '/outdoors',
    '/resume',
    '/contact'
  ];

  const projectPages = PROJECTS.map(project => `/projects/${project.slug}`);
  const snippetPages = SNIPPETS.map(snippet => `/snippets/${snippet.slug}`);
  const blogPages = POSTS.filter(post => post.published).map(post => `/blog/${post.slug}`);
  const trailPages = trails.map(trail => `/outdoors/${trail.id}`);

  const allPages = [
    ...v2Pages,
    ...staticPages,
    ...projectPages,
    ...snippetPages,
    ...blogPages,
    ...trailPages
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      path => {
        let priority = '0.6';
        let changefreq = 'weekly';
        if (path === '/v2') {
          priority = '1.0';
          changefreq = 'daily';
        } else if (path.startsWith('/v2')) {
          priority = '0.9';
        } else if ([
          '/about',
          '/experience',
          '/skills',
          '/projects',
          '/snippets',
          '/blog',
          '/outdoors',
          '/resume',
          '/contact'
        ].includes(path)) {
          priority = '0.8';
          changefreq = 'weekly';
        }
        return `  <url>
    <loc>${domain}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
      }
    )
    .join('\n')}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
