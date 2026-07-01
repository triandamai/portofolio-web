# Prompt: Build IDE-Style SvelteKit Portfolio

## Concept
Build a developer portfolio that looks and behaves like a minimalist code editor — a blend of VS Code's functional layout (activity bar, sidebar, tabs, editor, status bar) and the VoidZero/Rolldown/Oxc design language (deep charcoal background, 1px hairline borders, zero border-radius, sharp accent colors used only for syntax/active-state highlights). Built with SvelteKit.

The goal is not a literal code editor clone — it's a portfolio that uses the IDE metaphor as a hook while still functioning as a fast, crawlable, mobile-friendly site that gets a recruiter to the point in under 10 seconds.

## Non-negotiable requirements (fix gaps from the original plan)

1. **SSR + real routes.** Every "file" (about, experience, projects, individual project, skills, contact) must be a real SvelteKit route with server-rendered content, not just client-side tab state. `/about`, `/projects/[slug]`, etc. must work on direct load/refresh and be crawlable. The tabs/sidebar UI is a *view layer* on top of real routing (opening a tab = navigating; closing a tab = navigating away), not a fake in-memory router.
2. **Mobile mode.** Below a defined breakpoint (~768px), collapse to a simplified layout: sidebar becomes a slide-over or bottom sheet, tabs bar becomes a dropdown or swipeable strip, editor content becomes a single scrollable column. Don't just shrink the desktop grid.
3. **First-visit guidance.** Default loaded tab is `welcome.md` (or `about.md`) with a short, real introduction and explicit links/CTAs — not an empty shell requiring the visitor to know to click the sidebar.
4. **Command palette (Cmd/Ctrl+K).** Fuzzy-searchable list of actions: navigate to any file/project, copy email, open resume PDF, open GitHub/LinkedIn, toggle any theme variant. Style it like VS Code's palette.
5. **Visible conversion points.** Resume download and contact/social links must be reachable in ≤1 click from anywhere — pin them in the status bar and/or command palette, don't bury them only inside a file.
6. **Content as data.** All real content (bio, experience, skills, projects, snippets) lives in markdown/JSON/TS files under a `content/` or `src/lib/content/` directory, loaded at build time — not hardcoded inline in components.
7. **Lazy-loaded syntax highlighting.** Use Shiki (or Prism) but only load/highlight a file's content when its tab is actually opened, not all files up front.
8. **Keyboard & accessibility baseline.** All sidebar icons, tabs, and the command palette must be keyboard-navigable with visible focus states and ARIA labels. Respect `prefers-reduced-motion`. This isn't optional polish — it affects real users and also just makes the "IDE" feel legit.

## Layout spec

```
+---------------+--------------------------+----------------------------------+
| Activity Bar  | Sidebar Panel            | Tabs Bar                         |
| (icons)       | (Explorer/Search/        |-----------------------------------|
|               |  Projects/Snippets)      | Breadcrumbs                      |
|               |                          |-----------------------------------|
|               |                          | Editor Area (active file content)|
+---------------+--------------------------+----------------------------------+
| Status Bar (branch, resume link, contact, encoding, line/col)               |
+-------------------------------------------------------------------------------+
```

- Activity bar: fixed narrow column of icon buttons (Explorer, Search, Projects, Snippets). Click toggles the sidebar panel open/closed and switches its content.
- Sidebar: collapsible tree/list depending on active view.
- Tabs bar: shows open "files," each closable, active tab has an accent underline.
- Breadcrumbs: `src > portfolio > about.md` style path under the tabs.
- Editor area: renders markdown (rendered prose or raw syntax-highlighted view, toggleable) or "code" (skills.ts, experience.json) with real syntax highlighting and line numbers.
- Status bar: git-branch-style label (`main`), resume download, contact/social icons, faux file encoding/line-col info for flavor.

## State to manage (Svelte stores or runes)

- `openTabs`: array of open file identifiers, synced with actual route/navigation history.
- `activeTab`: derived from current route.
- `activeSidebarView`: `'explorer' | 'search' | 'projects' | 'snippets' | null`.
- `commandPaletteOpen`: boolean, toggled by Cmd/Ctrl+K and Escape.

## Design tokens

- Background: near-black charcoal (`#0d0d0d`–`#111`), panel backgrounds slightly lighter (`#161616`).
- Borders: `1px solid #2a2a2a`, used everywhere instead of shadows/spacing tricks.
- Border-radius: `0` throughout.
- Accent: one or two sharp colors (amber/orange or cyan) used only for active-state indicators, syntax highlights, and focus rings — never as decoration.
- Fonts: monospace (JetBrains Mono / Fira Code) for all structural/code UI; a clean sans-serif (Inter/Geist) only for rendered markdown prose.

## Build order

1. **Skeleton & routing** — CSS Grid layout fitting `100dvh`, no page bounce; real SvelteKit routes for each content page; mobile breakpoint layout.
2. **Content layer** — Author real markdown/JSON content files (about, experience, skills, 3–5 projects, a few code snippets). Build the loaders.
3. **Tabs/sidebar/breadcrumbs wiring** — Connect UI state to routing so opening a "file" in the sidebar navigates and adds a tab; closing a tab navigates away; refresh preserves state via the URL.
4. **Editor rendering** — Line numbers, lazy-loaded Shiki highlighting, markdown-vs-raw toggle for `.md` files.
5. **Command palette** — Cmd/Ctrl+K overlay, fuzzy search over routes/actions, keyboard navigation, Escape to close.
6. **Status bar & CTAs** — Resume link, contact/social icons, faux git branch/diagnostics.
7. **Polish** — Focus states, `prefers-reduced-motion` handling, tab-close edge cases (last tab open falls back to welcome.md), transitions for tab switch/sidebar toggle, favicon/tab title mimicking `● about.md — yourname`.
8. **Deploy** — Configure SvelteKit adapter for the target host (Vercel/Netlify/etc.), verify SSR output actually contains real content (view source check), verify mobile layout on a real small viewport.

## Deliverable for this session

Start with step 1 (skeleton + routing) and step 2 (content layer) together, since the whole app depends on real routes existing before the tab/sidebar UI is wired to them. Propose the directory structure first, then scaffold it.