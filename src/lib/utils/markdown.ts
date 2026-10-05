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

function headingId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
}

/** Minimal markdown → HTML used by both v1 and v2 renderers. Code blocks are pre-highlighted server-side. */
export function renderMarkdown(md: string): string {
  return md
    // code blocks are pre-highlighted server-side; skip them here
    .replace(/^### (.+)$/gm, (_, text) => `<h3 id="${headingId(text)}">${text}</h3>`)
    .replace(/^## (.+)$/gm, (_, text) => `<h2 id="${headingId(text)}">${text}</h2>`)
    .replace(/^# (.+)$/gm, (_, text) => `<h1 id="${headingId(text)}">${text}</h1>`)
    .replace(/^---$/gm, '<hr>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 2+ consecutive image lines → screenshot grid
    .replace(/((?:!\[[^\]]*\]\([^)]+\)[ \t]*\n?){2,})/g, (block) => {
      const imgs = block.trim().split('\n')
        .map(l => { const m = l.match(/!\[([^\]]*)\]\(([^)]+)\)/); return m ? `<img src="${m[2]}" alt="${m[1]}" class="prose-img" loading="lazy" />` : ''; })
        .filter(Boolean).join('');
      return `<div class="screenshot-grid">${imgs}</div>`;
    })
    // single images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="prose-img" loading="lazy" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/(\|.+\|\n\|[-| :]+\|\n(?:\|.+\|\n?)+)/g, renderTable)
    .replace(/((?:^- .+\n?)+)/gm, (block) => {
      const items = block.trim().split('\n').map(l => `<li>${l.replace(/^- /, '')}</li>`).join('');
      return `<ul>${items}</ul>`;
    })
    // skip any line already starting with an HTML tag
    .replace(/^(?!<)(.+)$/gm, '<p>$1</p>')
    .replace(/<p>(<[hup])/g, '$1')
    .replace(/(<\/[hup][^>]*>)<\/p>/g, '$1');
}

function renderTable(block: string): string {
  const lines = block.trim().split('\n');
  const headers = lines[0].split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
  const rows = lines.slice(2).map(line => {
    const cells = line.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('');
  return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
}
