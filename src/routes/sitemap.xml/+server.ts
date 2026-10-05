import { PROJECTS, SNIPPETS } from '$lib/content/index';
import { POSTS } from '$lib/content/blog';
import { trails } from '$lib/content/outdoors';

export const prerender = true;

export async function GET() {
  const domain = 'https://trian.space';
  const published = POSTS.filter(post => post.published);

  // Main site (new design)
  const main: [string, string, string][] = [
    ['/', '1.0', 'daily'],
    ...['/projects', '/blog', '/about', '/outdoors', '/contact', '/system'].map(p => [p, '0.9', 'weekly'] as [string, string, string]),
    ...PROJECTS.map(p => [`/projects/${p.slug}`, '0.8', 'weekly'] as [string, string, string]),
    ...published.map(p => [`/blog/${p.slug}`, '0.8', 'weekly'] as [string, string, string]),
    ...trails.map(t => [`/outdoors/${t.id}`, '0.7', 'monthly'] as [string, string, string])
  ];

  // IDE edition, kept at /v1 at lower priority
  const v1: [string, string, string][] = [
    '/v1', '/v1/about', '/v1/experience', '/v1/skills', '/v1/projects', '/v1/snippets',
    '/v1/blog', '/v1/outdoors', '/v1/resume', '/v1/contact',
    ...SNIPPETS.map(s => `/v1/snippets/${s.slug}`)
  ].map(p => [p, '0.4', 'monthly']);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...main, ...v1]
  .map(([path, priority, changefreq]) => `  <url>
    <loc>${domain}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
