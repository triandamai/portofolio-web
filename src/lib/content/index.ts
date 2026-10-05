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
    slug: "uniflor",
    title: "uniflor.ac.id",
    description: "Rebuilt Universitas Flores' website from scratch after it was defaced with gambling content — new infra, Docker Swarm, server-driven UI, and auto-provisioned faculty subdomains.",
    tech: ["Nuxt.js", "Supabase", "Cloudflare", "Docker Swarm"],
    repo: "",
    demo: "https://uniflor.ac.id/?lang=id",
    year: 2024,
    featured: true
  },
  {
    slug: "cekmotor",
    title: "cekmotor.id",
    description: "AI-powered motorcycle appraisal SaaS — analyze condition and estimate fair market value against live Indonesian marketplace listings.",
    tech: ["Next.js", "Rust", "PostgreSQL", "Gemini AI"],
    repo: "",
    demo: "https://cekmotor.id",
    year: 2025,
    featured: true
  },
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
    slug: "nomi",
    title: "Nomi",
    description: "Self-hosted AI agent orchestrator in Rust — one ongoing chat per user, with specialist agents for money, planning, coding, reminders and Google Workspace handing work in and out of the same thread.",
    tech: ["Rust", "Axum", "SvelteKit", "PostgreSQL", "pgvector", "MQTT"],
    repo: "https://github.com/triandamai/nomi-v2",
    demo: "https://nomi.trian.space",
    year: 2026,
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
    slug: "arta",
    title: "Arta",
    description: "Cross-platform expenses tracker in Compose Multiplatform — scan receipts with OCR for instant logging and keep pocket money in check.",
    tech: ["Kotlin", "Compose Multiplatform", "OCR", "SQLDelight"],
    repo: "",
    demo: "",
    year: 2024,
    featured: false
  },
  {
    slug: "tudu",
    title: "Tudu",
    description: "Android to-do app built with Kotlin and Jetpack Compose — a hobby project that started as a weekend experiment and shipped to the Play Store.",
    tech: ["Kotlin", "Jetpack Compose", "Android"],
    repo: "",
    demo: "https://play.google.com/store/apps/details?id=app.trian.tudu",
    year: 2023,
    featured: false
  }
];

export const SNIPPETS: SnippetMeta[] = [
  { slug: "axum-sse", filename: "axum-sse.rs", language: "rust" },
  { slug: "debounce", filename: "debounce.ts", language: "typescript" },
  { slug: "binary-search", filename: "binary-search.ts", language: "typescript" }
];

export const NAV_FILES = [
  { path: "/v1", label: "welcome.md", icon: "home" },
  { path: "/v1/about", label: "about.md", icon: "person" },
  { path: "/v1/experience", label: "experience.json", icon: "work" },
  { path: "/v1/skills", label: "skills.ts", icon: "code" },
  { path: "/v1/projects", label: "projects/", icon: "folder" },
  { path: "/v1/snippets", label: "snippets/", icon: "snippet" },
  { path: "/v1/blog", label: "blog/", icon: "folder" },
  { path: "/v1/outdoors", label: "outdoors.log", icon: "outdoor" },
  { path: "/v1/resume", label: "resume.pdf", icon: "pdf" },
  { path: "/v1/contact", label: "contact.md", icon: "mail" }
];
