export interface ThemeVars {
  '--bg': string;
  '--bg-activity': string;
  '--bg-sidebar': string;
  '--bg-tabs': string;
  '--bg-editor': string;
  '--bg-hover': string;
  '--bg-active': string;
  '--bg-card': string;
  '--border': string;
  '--border-mid': string;
  '--fg': string;
  '--fg-muted': string;
  '--fg-dim': string;
  '--grad-a': string;
  '--grad-b': string;
  '--gradient': string;
  '--gradient-soft': string;
  '--gradient-text': string;
  '--gradient-line': string;
  '--glow': string;
  '--glow-card': string;
  '--dot-color': string;
  '--glow-bg': string;
}

export interface Theme {
  id: string;
  name: string;
  dark: boolean;
  preview: [string, string, string]; // [bg, grad-a, grad-b]
  vars: ThemeVars;
}

export const THEMES: Theme[] = [
  {
    id: 'voidzero',
    name: 'VoidZero',
    dark: true,
    preview: ['#08060D', '#bd34fe', '#ff9966'],
    vars: {
      '--bg':             '#08060D',
      '--bg-activity':    '#0a0812',
      '--bg-sidebar':     '#0d0b14',
      '--bg-tabs':        '#0a0812',
      '--bg-editor':      '#08060D',
      '--bg-hover':       'rgba(255,255,255,0.04)',
      '--bg-active':      'rgba(255,255,255,0.07)',
      '--bg-card':        'rgba(255,255,255,0.03)',
      '--border':         'rgba(255,255,255,0.08)',
      '--border-mid':     'rgba(255,255,255,0.13)',
      '--fg':             '#f0eeff',
      '--fg-muted':       '#4e4a68',
      '--fg-dim':         '#2e2b44',
      '--grad-a':         '#bd34fe',
      '--grad-b':         '#ff9966',
      '--gradient':       'linear-gradient(135deg,#bd34fe 0%,#e8430a 55%,#ff9966 100%)',
      '--gradient-soft':  'linear-gradient(135deg,rgba(189,52,254,0.15) 0%,rgba(255,153,102,0.08) 100%)',
      '--gradient-text':  'linear-gradient(135deg,#bd34fe 0%,#e8430a 50%,#ff9966 100%)',
      '--gradient-line':  'linear-gradient(90deg,#bd34fe,#ff9966)',
      '--glow':           '0 0 20px rgba(189,52,254,0.25),0 0 60px rgba(189,52,254,0.08)',
      '--glow-card':      '0 8px 32px rgba(0,0,0,0.6),0 0 0 0.5px rgba(255,255,255,0.06)',
      '--dot-color':      'rgba(255,255,255,0.025)',
      '--glow-bg':        'rgba(189,52,254,0.07)',
    }
  },
  {
    id: 'dracula',
    name: 'Dracula',
    dark: true,
    preview: ['#282a36', '#ff79c6', '#bd93f9'],
    vars: {
      '--bg':             '#282a36',
      '--bg-activity':    '#21222c',
      '--bg-sidebar':     '#21222c',
      '--bg-tabs':        '#21222c',
      '--bg-editor':      '#282a36',
      '--bg-hover':       'rgba(255,255,255,0.05)',
      '--bg-active':      'rgba(255,121,198,0.1)',
      '--bg-card':        'rgba(255,255,255,0.03)',
      '--border':         'rgba(255,255,255,0.09)',
      '--border-mid':     'rgba(255,255,255,0.15)',
      '--fg':             '#f8f8f2',
      '--fg-muted':       '#6272a4',
      '--fg-dim':         '#44475a',
      '--grad-a':         '#ff79c6',
      '--grad-b':         '#bd93f9',
      '--gradient':       'linear-gradient(135deg,#ff79c6 0%,#bd93f9 100%)',
      '--gradient-soft':  'linear-gradient(135deg,rgba(255,121,198,0.12) 0%,rgba(189,147,249,0.06) 100%)',
      '--gradient-text':  'linear-gradient(135deg,#ff79c6 0%,#bd93f9 100%)',
      '--gradient-line':  'linear-gradient(90deg,#ff79c6,#bd93f9)',
      '--glow':           '0 0 20px rgba(255,121,198,0.2),0 0 60px rgba(189,147,249,0.08)',
      '--glow-card':      '0 8px 32px rgba(0,0,0,0.5),0 0 0 0.5px rgba(255,255,255,0.07)',
      '--dot-color':      'rgba(255,255,255,0.025)',
      '--glow-bg':        'rgba(255,121,198,0.06)',
    }
  },
  {
    id: 'nord',
    name: 'Nord',
    dark: true,
    preview: ['#2e3440', '#88c0d0', '#5e81ac'],
    vars: {
      '--bg':             '#2e3440',
      '--bg-activity':    '#272c36',
      '--bg-sidebar':     '#272c36',
      '--bg-tabs':        '#272c36',
      '--bg-editor':      '#2e3440',
      '--bg-hover':       'rgba(255,255,255,0.04)',
      '--bg-active':      'rgba(136,192,208,0.1)',
      '--bg-card':        'rgba(255,255,255,0.03)',
      '--border':         'rgba(255,255,255,0.08)',
      '--border-mid':     'rgba(136,192,208,0.2)',
      '--fg':             '#eceff4',
      '--fg-muted':       '#4c566a',
      '--fg-dim':         '#3b4252',
      '--grad-a':         '#88c0d0',
      '--grad-b':         '#5e81ac',
      '--gradient':       'linear-gradient(135deg,#88c0d0 0%,#5e81ac 100%)',
      '--gradient-soft':  'linear-gradient(135deg,rgba(136,192,208,0.12) 0%,rgba(94,129,172,0.06) 100%)',
      '--gradient-text':  'linear-gradient(135deg,#88c0d0 0%,#81a1c1 50%,#5e81ac 100%)',
      '--gradient-line':  'linear-gradient(90deg,#88c0d0,#5e81ac)',
      '--glow':           '0 0 20px rgba(136,192,208,0.18),0 0 60px rgba(94,129,172,0.07)',
      '--glow-card':      '0 8px 32px rgba(0,0,0,0.5),0 0 0 0.5px rgba(255,255,255,0.06)',
      '--dot-color':      'rgba(255,255,255,0.02)',
      '--glow-bg':        'rgba(136,192,208,0.05)',
    }
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin',
    dark: true,
    preview: ['#1e1e2e', '#cba6f7', '#f38ba8'],
    vars: {
      '--bg':             '#1e1e2e',
      '--bg-activity':    '#181825',
      '--bg-sidebar':     '#181825',
      '--bg-tabs':        '#181825',
      '--bg-editor':      '#1e1e2e',
      '--bg-hover':       'rgba(255,255,255,0.04)',
      '--bg-active':      'rgba(203,166,247,0.1)',
      '--bg-card':        'rgba(255,255,255,0.025)',
      '--border':         'rgba(255,255,255,0.07)',
      '--border-mid':     'rgba(203,166,247,0.2)',
      '--fg':             '#cdd6f4',
      '--fg-muted':       '#45475a',
      '--fg-dim':         '#313244',
      '--grad-a':         '#cba6f7',
      '--grad-b':         '#f38ba8',
      '--gradient':       'linear-gradient(135deg,#cba6f7 0%,#f38ba8 100%)',
      '--gradient-soft':  'linear-gradient(135deg,rgba(203,166,247,0.12) 0%,rgba(243,139,168,0.06) 100%)',
      '--gradient-text':  'linear-gradient(135deg,#cba6f7 0%,#f5c2e7 50%,#f38ba8 100%)',
      '--gradient-line':  'linear-gradient(90deg,#cba6f7,#f38ba8)',
      '--glow':           '0 0 20px rgba(203,166,247,0.2),0 0 60px rgba(203,166,247,0.06)',
      '--glow-card':      '0 8px 32px rgba(0,0,0,0.6),0 0 0 0.5px rgba(255,255,255,0.06)',
      '--dot-color':      'rgba(255,255,255,0.02)',
      '--glow-bg':        'rgba(203,166,247,0.05)',
    }
  },
  {
    id: 'github-light',
    name: 'GitHub Light',
    dark: false,
    preview: ['#ffffff', '#0969da', '#8250df'],
    vars: {
      '--bg':             '#ffffff',
      '--bg-activity':    '#f6f8fa',
      '--bg-sidebar':     '#f6f8fa',
      '--bg-tabs':        '#f6f8fa',
      '--bg-editor':      '#ffffff',
      '--bg-hover':       'rgba(0,0,0,0.05)',
      '--bg-active':      'rgba(9,105,218,0.1)',
      '--bg-card':        'rgba(0,0,0,0.025)',
      '--border':         'rgba(0,0,0,0.12)',
      '--border-mid':     'rgba(0,0,0,0.22)',
      '--fg':             '#1f2328',
      // #57606a passes WCAG AA (6.5:1 on white)
      '--fg-muted':       '#57606a',
      // #6e7781 passes WCAG AA (4.9:1 on white) — used for icons, secondary labels
      '--fg-dim':         '#6e7781',
      '--grad-a':         '#0969da',
      '--grad-b':         '#8250df',
      '--gradient':       'linear-gradient(135deg,#0969da 0%,#8250df 100%)',
      '--gradient-soft':  'linear-gradient(135deg,rgba(9,105,218,0.08) 0%,rgba(130,80,223,0.04) 100%)',
      '--gradient-text':  'linear-gradient(135deg,#0969da 0%,#8250df 100%)',
      '--gradient-line':  'linear-gradient(90deg,#0969da,#8250df)',
      '--glow':           '0 0 16px rgba(9,105,218,0.12),0 0 40px rgba(9,105,218,0.04)',
      '--glow-card':      '0 4px 16px rgba(0,0,0,0.08),0 0 0 0.5px rgba(0,0,0,0.1)',
      '--dot-color':      'rgba(0,0,0,0.05)',
      '--glow-bg':        'rgba(9,105,218,0.03)',
    }
  },
  {
    id: 'solarized-light',
    name: 'Solarized',
    dark: false,
    preview: ['#fdf6e3', '#268bd2', '#2aa198'],
    vars: {
      '--bg':             '#fdf6e3',
      '--bg-activity':    '#eee8d5',
      '--bg-sidebar':     '#eee8d5',
      '--bg-tabs':        '#eee8d5',
      '--bg-editor':      '#fdf6e3',
      '--bg-hover':       'rgba(0,0,0,0.05)',
      '--bg-active':      'rgba(38,139,210,0.12)',
      '--bg-card':        'rgba(0,0,0,0.03)',
      '--border':         'rgba(0,0,0,0.12)',
      '--border-mid':     'rgba(38,139,210,0.3)',
      // #073642 = solarized base03, highest contrast on cream bg
      '--fg':             '#073642',
      // #586e75 = solarized base01 — readable secondary text on cream
      '--fg-muted':       '#586e75',
      // #657b83 = solarized base00 — still readable, used for dim UI
      '--fg-dim':         '#657b83',
      '--grad-a':         '#268bd2',
      '--grad-b':         '#2aa198',
      '--gradient':       'linear-gradient(135deg,#268bd2 0%,#2aa198 100%)',
      '--gradient-soft':  'linear-gradient(135deg,rgba(38,139,210,0.1) 0%,rgba(42,161,152,0.05) 100%)',
      '--gradient-text':  'linear-gradient(135deg,#268bd2 0%,#2aa198 100%)',
      '--gradient-line':  'linear-gradient(90deg,#268bd2,#2aa198)',
      '--glow':           '0 0 16px rgba(38,139,210,0.15),0 0 40px rgba(38,139,210,0.05)',
      '--glow-card':      '0 4px 16px rgba(0,0,0,0.06),0 0 0 0.5px rgba(0,0,0,0.1)',
      '--dot-color':      'rgba(0,0,0,0.04)',
      '--glow-bg':        'rgba(38,139,210,0.03)',
    }
  }
];

const STORAGE_KEY = 'portfolio-theme';

function createThemeStore() {
  let themeId = $state('voidzero');

  function applyTheme(id: string) {
    const theme = THEMES.find(t => t.id === id);
    if (!theme) return;
    const root = document.documentElement;
    for (const [key, val] of Object.entries(theme.vars)) {
      root.style.setProperty(key, val);
    }
    root.setAttribute('data-theme-dark', String(theme.dark));
    try { localStorage.setItem(STORAGE_KEY, id); } catch {}
  }

  return {
    get current() { return themeId; },
    get currentTheme() { return THEMES.find(t => t.id === themeId)!; },

    init() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && THEMES.find(t => t.id === saved)) {
          themeId = saved;
          applyTheme(saved);
          return;
        }
      } catch {}
      applyTheme(themeId);
    },

    set(id: string) {
      themeId = id;
      applyTheme(id);
    }
  };
}

export const themeStore = createThemeStore();
