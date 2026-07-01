export type SidebarView = 'explorer' | 'search' | 'projects' | 'snippets' | null;

function createSidebarStore() {
  let view = $state<SidebarView>('explorer');
  let open = $state(true);
  let searchQuery = $state('');

  return {
    get view() { return view; },
    get open() { return open; },
    get searchQuery() { return searchQuery; },

    toggle(v: SidebarView) {
      if (view === v && open) {
        open = false;
      } else {
        view = v;
        open = true;
      }
    },

    close() { open = false; },

    setView(v: SidebarView) { view = v; },

    setSearch(q: string) { searchQuery = q; }
  };
}

export const sidebarStore = createSidebarStore();
