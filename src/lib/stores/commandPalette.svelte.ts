export interface PaletteAction {
  id: string;
  label: string;
  description?: string;
  category: 'navigate' | 'action' | 'external';
  handler: () => void;
  keywords?: string[];
}

function createCommandPaletteStore() {
  let open = $state(false);
  let query = $state('');

  return {
    get open() { return open; },
    get query() { return query; },

    show() { open = true; query = ''; },
    hide() { open = false; query = ''; },
    toggle() { open ? this.hide() : this.show(); },
    setQuery(q: string) { query = q; }
  };
}

export const commandPaletteStore = createCommandPaletteStore();

export function fuzzyMatch(haystack: string, needle: string): boolean {
  if (!needle) return true;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  let hi = 0;
  for (let ni = 0; ni < n.length; ni++) {
    const found = h.indexOf(n[ni], hi);
    if (found === -1) return false;
    hi = found + 1;
  }
  return true;
}
