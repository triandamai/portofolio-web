import type { ProjectMeta } from '$lib/content/index';

export const RESUMES = [
  { label: 'Résumé · Software Engineer', href: '/resume/Trian_Damai_Resume_Software_Engineer.pdf' },
  { label: 'Résumé · Software Developer', href: '/resume/Trian_Damai_Resume_Software_Developer.pdf' }
];

export const EMAIL = 'triandamai@gmail.com';
export const GITHUB = 'https://github.com/triandamai';
export const LINKEDIN = 'https://linkedin.com/in/triandamai';

/** Cover screenshot per project; projects without one get a gradient shape cover. */
export const COVERS: Record<string, string> = {
  cekmotor: '/screenshots/cekmotor/home.webp',
  uniflor: '/screenshots/uniflor/mobile.webp',
  shipyard: '/screenshots/shipyard/landing.webp',
  arta: '/screenshots/arta/home.webp',
  tudu: '/screenshots/tudu/home.webp'
};

export type ProjectKind = 'web' | 'mobile';

const MOBILE_TECH = ['Kotlin', 'Jetpack Compose', 'Compose Multiplatform', 'Android'];

export function projectKind(p: ProjectMeta): ProjectKind {
  return p.tech.some((t) => MOBILE_TECH.includes(t)) ? 'mobile' : 'web';
}

export function projectHost(p: ProjectMeta): string {
  const url = p.demo || p.repo;
  if (!url) return '';
  try {
    const u = new URL(url);
    return u.hostname === 'play.google.com' ? 'Play Store' : u.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}
