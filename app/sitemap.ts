import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/env";
import { listPublicSummaries } from "@/lib/snippets";
import { examples } from "@/lib/playground/examples";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
import { guides } from "@/lib/guides";
import { getCatalog } from "@/lib/products";

export const dynamic = "force-dynamic";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/playground", priority: 0.9 },
  { path: "/products", priority: 0.8 },
  { path: "/library", priority: 0.8 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/guides", priority: 0.7 },
  { path: "/install", priority: 0.7 },
  { path: "/prompts", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/updates", priority: 0.5 },
  { path: "/licensing", priority: 0.4 },
  { path: "/refund-policy", priority: 0.4 },
  { path: "/privacy-policy", priority: 0.4 },
  { path: "/terms", priority: 0.4 },
  { path: "/disclaimer", priority: 0.4 },
  { path: "/copyright", priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: absoluteUrl(r.path),
    priority: r.priority,
  }));

  // Programmatic snippet pages - every playground example is indexable
  const snippetPages: MetadataRoute.Sitemap = examples.map((e) => ({
    url: absoluteUrl(`/snippets/${e.id}`),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const categoryPages: MetadataRoute.Sitemap = [...new Set(examples.map((e) => e.category))].map((c) => ({
    url: absoluteUrl(`/snippets/category/${slugify(c)}`),
    priority: 0.75,
    changeFrequency: "weekly",
  }));

  const productPages: MetadataRoute.Sitemap = getCatalog().items.map((p) => ({
    url: absoluteUrl(`/products/${p.slug}`),
    priority: 0.7,
    changeFrequency: "weekly",
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((g) => ({
    url: absoluteUrl(`/guides/${g.slug}`),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  if (!isSupabaseConfigured()) return [...base, ...snippetPages, ...categoryPages, ...productPages, ...guidePages];
  try {
    const items = await listPublicSummaries();
    return [
      ...base,
      ...snippetPages,
      ...categoryPages,
      ...productPages,
      ...guidePages,
      ...items.map((s) => ({ url: absoluteUrl(`/library/${s.slug}`), priority: 0.5 })),
    ];
  } catch {
    return [...base, ...snippetPages, ...categoryPages, ...productPages, ...guidePages];
  }
}
