import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { listCategories, listPublishedSummaries } from "@/lib/snippets";
import { filterSnippets } from "@/lib/snippet-utils";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Liquid code library", robots: { index: false } };

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().slice(0, 100);
  const [all, categories] = await Promise.all([listPublishedSummaries(), listCategories()]);
  const category = categories.some((c) => c.slug === sp.category) ? (sp.category as string) : "";
  const items = filterSnippets(all, categories, q, category);
  const href = (cat: string) => `/access/liquid-library?${new URLSearchParams({ ...(q && { q }), ...(cat && { category: cat }) })}`;
  const chip = (on: boolean) =>
    cn("rounded-full border px-3.5 py-1.5 text-sm font-medium transition", on ? "border-accent bg-accent/20" : "border-line-strong text-muted hover:bg-white/[0.06] hover:text-fg");

  return (
    <>
      <PageHeader
        title="Shopify Liquid library"
        description="Search, preview, copy and download Liquid snippets."
        crumbs={[{ label: "Resource hub", href: "/access" }, { label: "Liquid library" }]}
      />
      <Container className="py-10">
        {all.some((s) => s.is_demo) && (
          <p role="note" className="mb-6 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
            <strong>Demo content.</strong> Items marked &quot;Demo&quot; are small original examples for testing this library. They are not the full code library.
          </p>
        )}
        <form role="search" action="/access/liquid-library" className="flex gap-3">
          {category && <input type="hidden" name="category" value={category} />}
          <div className="relative flex-1">
            <label htmlFor="q" className="sr-only">
              Search snippets
            </label>
            <Search aria-hidden className="pointer-events-none absolute left-3 top-3.5 size-4 text-subtle" />
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={q}
              maxLength={100}
              placeholder="Search by title, description, category or tag"
              className="h-11 w-full rounded-xl border border-line-strong bg-ink-900 pl-9 pr-3 text-sm"
            />
          </div>
          <Button type="submit" className="h-11">
            Search
          </Button>
        </form>

        <nav aria-label="Categories" className="mt-5">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link href={href("")} className={chip(!category)}>
                All
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={href(c.slug)} className={chip(category === c.slug)}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p role="status" className="my-6 text-sm text-subtle">
          {items.length} {items.length === 1 ? "snippet" : "snippets"}
        </p>
        {items.length ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
              <li key={s.slug}>
                <Link href={`/access/liquid-library/${s.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/70 p-5 transition hover:-translate-y-1 hover:border-accent/50">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge>{categories.find((c) => c.slug === s.category_slug)?.name ?? s.category_slug}</Badge>
                    {s.is_demo && <Badge className="border-mint/40 text-mint">Demo</Badge>}
                  </div>
                  <h2 className="mt-3 font-display text-lg font-semibold">{s.title}</h2>
                  <p className="mt-1.5 line-clamp-3 text-sm text-muted">{s.description}</p>
                  {(s.version || s.compatibility) && (
                    <p className="mt-2 text-xs text-subtle">{[s.version && `v${s.version}`, s.compatibility].filter(Boolean).join(" · ")}</p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent">
                    Inspect code <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title={all.length ? "No snippets match" : "The library is empty"}
            description={all.length ? "Try a different search or category." : "Snippets will appear here once they are published."}
            href="/access/liquid-library"
            cta="Clear filters"
          />
        )}
      </Container>
    </>
  );
}
