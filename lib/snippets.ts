import "server-only";
import { createServiceClient } from "@/lib/supabase/admin";
import type { SnippetCategory, SnippetSummary } from "./snippet-utils";

export interface Snippet extends SnippetSummary {
  code: string;
  filename: string;
  preview_html: string;
  source: string;
}

/** Summaries deliberately exclude `code` so source never travels with list pages. */
export async function listPublishedSummaries(): Promise<SnippetSummary[]> {
  const { data } = await createServiceClient()
    .from("snippets")
    .select("slug,title,description,category_slug,tags")
    .eq("status", "published")
    .order("title");
  return (data ?? []) as SnippetSummary[];
}

export async function listCategories(): Promise<SnippetCategory[]> {
  const { data } = await createServiceClient().from("snippet_categories").select("slug,name").order("sort_order");
  return data ?? [];
}

export async function getPublishedSnippet(slug: string): Promise<Snippet | null> {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return null;
  const { data } = await createServiceClient()
    .from("snippets")
    .select("slug,title,description,category_slug,tags,code,filename,preview_html,source")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return (data as Snippet | null) ?? null;
}
