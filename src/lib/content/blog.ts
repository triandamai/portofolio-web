export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  published: boolean;
}

export const POSTS: Post[] = [
  {
    slug: 'lets-get-rusty',
    title: "Let's Get Rusty 🦀",
    date: '2025-07',
    tags: ['rust', 'java', 'opinion', 'programming'],
    published: false,
    excerpt:
      'A personal journey from APK modding and Eclipse to falling in love with Rust — and why Java will always be the language that shaped how I think about code.',
  },
];
