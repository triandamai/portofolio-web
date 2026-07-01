export function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, unknown> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const raw = line.slice(colon + 1).trim();
    // arrays like ["a", "b"]
    if (raw.startsWith('[')) {
      try { meta[key] = JSON.parse(raw); } catch { meta[key] = raw; }
    } else if (raw === 'true') {
      meta[key] = true;
    } else if (raw === 'false') {
      meta[key] = false;
    } else if (!isNaN(Number(raw)) && raw !== '') {
      meta[key] = Number(raw);
    } else {
      meta[key] = raw.replace(/^["']|["']$/g, '');
    }
  }

  return { meta, body: match[2] };
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}
