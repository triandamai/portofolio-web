export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  repo: string;
  demo: string;
  year: number;
  featured: boolean;
}

export interface SnippetMeta {
  slug: string;
  filename: string;
  language: string;
}

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "shipyard",
    title: "Shipyard",
    description: "Self-hosted PaaS for Docker orchestration — deploy, scale, and monitor containers from a single dashboard.",
    tech: ["Go", "SvelteKit", "Docker", "Traefik", "WebSockets"],
    repo: "",
    demo: "https://shipyard.trian.space",
    year: 2025,
    featured: true
  },
  {
    slug: "portfolio-web",
    title: "Portfolio — IDE Edition",
    description: "This site. A SvelteKit portfolio styled like a VS Code–inspired editor.",
    tech: ["SvelteKit", "TypeScript", "Shiki", "CSS Grid"],
    repo: "https://github.com/triandamai/portofolio-web",
    demo: "",
    year: 2024,
    featured: true
  },
  {
    slug: "android-compose",
    title: "E-Commerce Android App",
    description: "Production Android e-commerce app built 0→1 with Jetpack Compose and Clean Architecture.",
    tech: ["Kotlin", "Jetpack Compose", "Ktor", "Room"],
    repo: "https://github.com/triandamai",
    demo: "",
    year: 2022,
    featured: true
  },
  {
    slug: "ktor-api",
    title: "Ktor REST + WebSocket API",
    description: "High-throughput backend in Kotlin/Ktor with PostgreSQL, JWT auth, and real-time WebSocket channels.",
    tech: ["Kotlin", "Ktor", "PostgreSQL", "WebSockets", "Docker"],
    repo: "https://github.com/triandamai",
    demo: "",
    year: 2023,
    featured: true
  }
];

export const SNIPPETS: SnippetMeta[] = [
  { slug: "debounce", filename: "debounce.ts", language: "typescript" },
  { slug: "binary-search", filename: "binary-search.ts", language: "typescript" }
];

export const NAV_FILES = [
  { path: "/", label: "welcome.md", icon: "home" },
  { path: "/about", label: "about.md", icon: "person" },
  { path: "/experience", label: "experience.json", icon: "work" },
  { path: "/skills", label: "skills.ts", icon: "code" },
  { path: "/projects", label: "projects/", icon: "folder" },
  { path: "/snippets", label: "snippets/", icon: "snippet" },
  { path: "/blog", label: "blog/", icon: "folder" },
  { path: "/outdoors", label: "outdoors.log", icon: "outdoor" },
  { path: "/resume", label: "resume.pdf", icon: "pdf" },
  { path: "/contact", label: "contact.md", icon: "mail" }
];
