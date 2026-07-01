---
slug: portfolio-web
title: "Portfolio — IDE Edition"
description: "This site. A SvelteKit portfolio that looks and behaves like a VS Code–inspired editor."
tech: ["SvelteKit", "TypeScript", "Shiki", "CSS Grid"]
repo: "https://github.com/triandamai/portofolio-web"
demo: ""
year: 2024
featured: true
---

# Portfolio — IDE Edition

The site you're looking at right now. Built with SvelteKit, it mimics the layout and interaction patterns of a code editor — activity bar, sidebar explorer, tabs, breadcrumbs, editor area, and status bar.

## Why

Recruiters see dozens of portfolios. Most are variations on the same hero-section template. An IDE-style layout is an immediate signal of taste and technical depth without needing to say so.

## Technical highlights

- **Real SSR routing** — every "file" is a real SvelteKit route, crawlable and shareable
- **Lazy Shiki highlighting** — syntax highlighting loads only when a file tab is opened
- **Command palette** — `Cmd/Ctrl+K` fuzzy-searches all routes and actions
- **CSS Grid layout** — no JS layout logic, pure `100dvh` grid with responsive mobile collapse
- **Content as data** — all content lives in `src/lib/content/` as markdown/JSON/TS

## Stack

```ts
const stack = {
  framework: "SvelteKit 2",
  language: "TypeScript",
  styling: "Vanilla CSS (design tokens)",
  highlighting: "Shiki",
  deployment: "Vercel"
};
```
