export type SchemeId = 'reef' | 'dusk' | 'phantom' | 'canopy' | 'senja';
export type Mode = 'light' | 'dark';

export interface Scheme {
  id: SchemeId;
  name: string;
  stops: [string, string, string, string];
}

export const SCHEMES: Scheme[] = [
  { id: 'reef', name: 'Coral reef', stops: ['#8EF0D2', '#6FD3F2', '#A9B8FF', '#FFB1C4'] },
  { id: 'dusk', name: 'Borneo dusk', stops: ['#7AD6C6', '#C6E08F', '#FFC062', '#FF8A62'] },
  { id: 'phantom', name: 'Phantom', stops: ['#D59CFF', '#FF9BC9', '#FFB27A', '#FFD36E'] },
  { id: 'canopy', name: 'Canopy', stops: ['#E6F77A', '#A3E68C', '#5FD1B4', '#56B4E0'] },
  { id: 'senja', name: 'Senja Jakarta', stops: ['#FFD6A0', '#FFA79E', '#F68DB6', '#B58FF2'] }
];

export const DEFAULT_SCHEME: SchemeId = 'reef';
const SCHEME_KEY = 'v2-scheme';
const MODE_KEY = 'v2-mode';

/**
 * Runs inline in <head> before first paint so a returning visitor never
 * sees the default scheme flash. Kept as a string because it ships as-is.
 */
export const PREPAINT_SCRIPT = `(function(){try{var d=document.documentElement;var s=localStorage.getItem('${SCHEME_KEY}');d.dataset.scheme=s||'${DEFAULT_SCHEME}';var m=localStorage.getItem('${MODE_KEY}');if(m==='light'||m==='dark')d.dataset.theme=m;}catch(e){document.documentElement.dataset.scheme='${DEFAULT_SCHEME}';}})();`;

function createAppearance() {
  let scheme = $state<SchemeId>(DEFAULT_SCHEME);
  let mode = $state<Mode>('light');

  const systemDark = () =>
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches;

  return {
    get scheme() { return scheme; },
    get schemeName() { return SCHEMES.find((s) => s.id === scheme)?.name ?? ''; },
    get mode() { return mode; },
    get dark() { return mode === 'dark'; },

    init() {
      const root = document.documentElement;
      const saved = root.dataset.scheme as SchemeId | undefined;
      scheme = SCHEMES.some((s) => s.id === saved) ? (saved as SchemeId) : DEFAULT_SCHEME;
      root.dataset.scheme = scheme;
      const explicit = root.dataset.theme;
      mode = explicit === 'dark' || explicit === 'light' ? explicit : systemDark() ? 'dark' : 'light';

      const mq = matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => { if (!root.dataset.theme) mode = mq.matches ? 'dark' : 'light'; };
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },

    setScheme(id: SchemeId) {
      scheme = id;
      document.documentElement.dataset.scheme = id;
      try { localStorage.setItem(SCHEME_KEY, id); } catch {}
    },

    toggleMode() {
      mode = mode === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = mode;
      try { localStorage.setItem(MODE_KEY, mode); } catch {}
    }
  };
}

export const appearance = createAppearance();
