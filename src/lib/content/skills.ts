export const languages: { name: string; note: string }[] = [
  { name: "Kotlin",      note: "Primary — everything Android and server-side" },
  { name: "Java",        note: "Years of Android before Kotlin arrived" },
  { name: "TypeScript",  note: "All my web work. Refuse to go back to plain JS" },
  { name: "JavaScript",  note: "When TypeScript isn't available or overkill" },
  { name: "Rust",        note: "Learning — love the ownership model and the compiler" },
  { name: "SQL",         note: "PostgreSQL and SQLite, queries to migrations" },
  { name: "HTML / CSS",  note: "Grid, custom properties, the real web platform" },
  { name: "Bash",        note: "Glue for CI pipelines and server automation" },
];

export type SkillLevel = 'daily' | 'proficient' | 'exploring';

export interface Skill {
  name: string;
  level: SkillLevel;
  note: string;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Mobile",
    description: "Where I spend most of my time. Android is my home ground.",
    skills: [
      { name: "Kotlin",           level: "daily",      note: "Primary language — everything I build on Android is Kotlin-first." },
      { name: "Jetpack Compose",  level: "daily",      note: "Declarative UI on Android. Shipped multiple production screens with it." },
      { name: "Android SDK",      level: "daily",      note: "Navigation, lifecycle, permissions, background work — the full picture." },
      { name: "Coroutines & Flow",level: "daily",      note: "Structured concurrency that actually makes sense. Flow for reactive streams." },
      { name: "Room",             level: "proficient", note: "SQLite ORM. Pair it with Flow for reactive local-first data." },
      { name: "Retrofit",         level: "proficient", note: "Type-safe HTTP client. Clean interface definitions, easy to mock." },
      { name: "Hilt",             level: "proficient", note: "DI without the boilerplate. Replaced manual injection in most projects." },
    ]
  },
  {
    category: "Backend",
    description: "APIs, databases, real-time — the layer that makes the frontend look easy.",
    skills: [
      { name: "Ktor",             level: "daily",      note: "Lightweight Kotlin server framework. Coroutine-native, fast to prototype in." },
      { name: "Java",             level: "proficient", note: "Years of Android before Kotlin took over. Still reach for it occasionally." },
      { name: "Spring Boot",      level: "proficient", note: "Enterprise Kotlin/Java backend. Used it for larger team projects." },
      { name: "Node.js",          level: "proficient", note: "Quick REST APIs and build tooling. Good for scripting too." },
      { name: "PostgreSQL",       level: "daily",      note: "Go-to relational DB. Reliable, feature-rich, great tooling around it." },
      { name: "SQLite",           level: "proficient", note: "Embedded DB — both mobile-side and small server apps." },
      { name: "REST APIs",        level: "daily",      note: "Designed and consumed dozens. Resource modelling, versioning, auth." },
      { name: "WebSockets",       level: "proficient", note: "Real-time features — chat, live sync, collaborative editing." },
      { name: "GraphQL",          level: "exploring",  note: "Experimenting with typed queries and schema-first design." },
    ]
  },
  {
    category: "Frontend",
    description: "I do frontend when the UI needs someone who actually cares about the interaction.",
    skills: [
      { name: "SvelteKit",        level: "daily",      note: "Current favourite. SSR, file routing, reactivity without the boilerplate." },
      { name: "TypeScript",       level: "daily",      note: "Cannot go back to untyped JS. Types are documentation that runs." },
      { name: "Vite",             level: "daily",      note: "Build tooling — powers most of my web projects. Fast, simple config." },
      { name: "React",            level: "proficient", note: "Know it well, built things with it. Prefer Svelte for new projects." },
      { name: "Tailwind CSS",     level: "proficient", note: "Utility-first CSS. Great for rapid prototyping, decent for production." },
      { name: "HTML / CSS",       level: "daily",      note: "The foundation. Grid, custom properties, animations — the real ones." },
    ]
  },
  {
    category: "Systems & Languages",
    description: "Things I use to build better tools, or just because I find them interesting.",
    skills: [
      { name: "Rust",             level: "exploring",  note: "Learning for systems programming and potential WASM targets. Love the borrow checker." },
      { name: "Git",              level: "daily",      note: "Obviously. Interactive rebase, bisect, worktrees — the works." },
      { name: "Docker",           level: "proficient", note: "Containerising services for local dev and deployment. Compose for multi-service setups." },
      { name: "GitHub Actions",   level: "proficient", note: "CI/CD pipelines. Test, build, deploy — automated end-to-end." },
      { name: "Linux",            level: "proficient", note: "Daily driver for servers. Comfortable on the command line." },
      { name: "Nginx",            level: "proficient", note: "Reverse proxy, static file serving, SSL termination." },
    ]
  }
];

export const LEVEL_META: Record<SkillLevel, { label: string; color: string }> = {
  daily:      { label: "Daily use",  color: "gradient" },
  proficient: { label: "Proficient", color: "mid" },
  exploring:  { label: "Exploring",  color: "dim" },
};
