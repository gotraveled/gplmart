import "server-only";
import { createServiceClient } from "@/lib/supabase/admin";
import type { SnippetCategory, SnippetSummary } from "./snippet-utils";

export interface Snippet extends SnippetSummary {
  code: string;
  filename: string;
  preview_html: string;
  source: string;
  documentation: string;
  license_status: "unreviewed" | "cleared";
}

const SUMMARY_COLS = "slug,title,description,category_slug,tags,is_demo,version,compatibility";

/** Summaries deliberately exclude `code` so source never travels with list pages. */
export async function listPublishedSummaries(): Promise<SnippetSummary[]> {
  const { data } = await createServiceClient()
    .from("snippets")
    .select(SUMMARY_COLS)
    .eq("status", "published")
    .order("title");
  return (data ?? []) as SnippetSummary[];
}

/** Public catalogue: demos are excluded so examples never masquerade as paid inventory. */
export async function listPublicSummaries(): Promise<SnippetSummary[]> {
  const { data } = await createServiceClient()
    .from("snippets")
    .select(SUMMARY_COLS)
    .eq("status", "published")
    .eq("is_demo", false)
    .order("title");
  return (data ?? []) as SnippetSummary[];
}

export async function listCategories(): Promise<SnippetCategory[]> {
  const { data } = await createServiceClient().from("snippet_categories").select("slug,name").order("sort_order");
  return data ?? [];
}

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export async function getPublishedSnippet(slug: string): Promise<Snippet | null> {
  if (!SLUG.test(slug)) return null;
  const { data } = await createServiceClient()
    .from("snippets")
    .select(`${SUMMARY_COLS},code,filename,preview_html,source,documentation,license_status`)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return (data as Snippet | null) ?? null;
}

export interface PublicSnippet extends SnippetSummary {
  preview_html: string;
  documentation: string;
}

/** Public detail: metadata + static preview only. `code`/`filename` are never selected. */
export async function getPublicSnippet(slug: string): Promise<PublicSnippet | null> {
  if (!SLUG.test(slug)) return null;
  const { data } = await createServiceClient()
    .from("snippets")
    .select(`${SUMMARY_COLS},preview_html,documentation`)
    .eq("slug", slug)
    .eq("status", "published")
    .eq("is_demo", false)
    .maybeSingle();
  return (data as PublicSnippet | null) ?? null;
}
