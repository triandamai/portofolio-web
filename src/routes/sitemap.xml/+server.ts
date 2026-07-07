import { PROJECTS, SNIPPETS } from '$lib/content/index';
import { POSTS } from '$lib/content/blog';
import { trails } from '$lib/content/outdoors';

export const prerender = true;

export async function GET() {
  const domain = 'https://trian.space';

  const staticPages = [
    '',
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
        if (path === '') {
          priority = '1.0';
          changefreq = 'daily';
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
