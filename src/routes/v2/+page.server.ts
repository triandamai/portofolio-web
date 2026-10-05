import { PROJECTS } from '$lib/content/index';
import { skillGroups } from '$lib/content/skills';
import { POSTS } from '$lib/content/blog';
import experience from '$lib/content/experience.json';

export function load() {
  const bySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug)!;
  return {
    featured: {
      big: bySlug('cekmotor'),
      tall: bySlug('uniflor'),
      inverse: bySlug('shipyard'),
      highlight: bySlug('nomi')
    },
    projectCount: PROJECTS.length,
    experience,
    skillGroups,
    posts: POSTS.filter((p) => p.published).slice(0, 3)
  };
}
