import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/env";
import { listPublicSummaries } from "@/lib/snippets";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base: MetadataRoute.Sitemap = ["/", "/playground", "/library", "/about", "/contact", "/licensing", "/refund-policy", "/privacy-policy", "/terms", "/disclaimer", "/copyright"].map(
    (p) => ({ url: absoluteUrl(p), priority: p === "/" ? 1 : 0.6 }),
  );
  if (!isSupabaseConfigured()) return base;
  try {
    const items = await listPublicSummaries();
    return [
      ...base,
      ...items.map((s) => ({ url: absoluteUrl(`/library/${s.slug}`), priority: 0.5 })),
    ];
  } catch {
    return base;
  }
}
