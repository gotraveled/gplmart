export interface SnippetSummary {
  slug: string;
  title: string;
  description: string;
  category_slug: string;
  tags: string[];
}

export interface SnippetCategory {
  slug: string;
  name: string;
}

export function filterSnippets<T extends SnippetSummary>(
  items: readonly T[],
  categories: readonly SnippetCategory[],
  q: string,
  category: string,
): T[] {
  const names = new Map(categories.map((c) => [c.slug, c.name.toLowerCase()]));
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return items.filter((s) => {
    if (category && s.category_slug !== category) return false;
    const hay = `${s.title} ${s.description} ${names.get(s.category_slug) ?? ""} ${s.tags.join(" ")}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

/** Sandboxed preview document: no scripts, no network, inline styles and data: images only. */
export function buildPreviewDoc(html: string): string {
  const csp = "default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src 'none'; form-action 'none'";
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${csp}"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;color:#111;background:#fff}</style></head><body>${html}</body></html>`;
}

export function safeFilename(name: string, fallback = "snippet.liquid"): string {
  const cleaned = name.replace(/[^A-Za-z0-9._-]/g, "-").replace(/^[-.]+/, "").slice(0, 80);
  return cleaned && /\.(liquid|json|txt)$/.test(cleaned) ? cleaned : fallback;
}
