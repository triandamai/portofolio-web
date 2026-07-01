export interface Tab {
  path: string;
  label: string;
  isDirty?: boolean;
}

const WELCOME_TAB: Tab = { path: '/', label: 'welcome.md' };

function createTabsStore() {
  let tabs = $state<Tab[]>([WELCOME_TAB]);
  let activeTab = $state<string>('/');

  return {
    get tabs() { return tabs; },
    get activeTab() { return activeTab; },

    open(tab: Tab) {
      if (!tabs.find(t => t.path === tab.path)) {
        tabs = [...tabs, tab];
      }
      activeTab = tab.path;
    },

    close(path: string) {
      const idx = tabs.findIndex(t => t.path === path);
      if (idx === -1) return;
      tabs = tabs.filter(t => t.path !== path);
      if (activeTab === path) {
        const next = tabs[idx] ?? tabs[idx - 1] ?? WELCOME_TAB;
        if (tabs.length === 0) {
          tabs = [WELCOME_TAB];
          activeTab = WELCOME_TAB.path;
        } else {
          activeTab = next.path;
        }
      }
    },

    setActive(path: string) {
      activeTab = path;
    }
  };
}

export const tabsStore = createTabsStore();

export const FILE_LABELS: Record<string, string> = {
  '/': 'welcome.md',
  '/about': 'about.md',
  '/experience': 'experience.json',
  '/skills': 'skills.ts',
  '/projects': 'projects/',
  '/snippets': 'snippets/',
  '/blog': 'blog/',
  '/outdoors': 'outdoors.log',
  '/resume': 'resume.pdf',
  '/contact': 'contact.md'
};

export function labelForPath(path: string): string {
  if (FILE_LABELS[path]) return FILE_LABELS[path];
  if (path.startsWith('/projects/')) {
    const slug = path.replace('/projects/', '');
    return `${slug}.md`;
  }
  if (path.startsWith('/snippets/')) {
    const slug = path.replace('/snippets/', '');
    return `${slug}.ts`;
  }
  if (path.startsWith('/outdoors/')) {
    const id = path.replace('/outdoors/', '');
    return `${id}.log`;
  }
  return path;
}
