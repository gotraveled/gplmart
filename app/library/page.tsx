import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, LockKeyhole, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { isSupabaseConfigured } from "@/lib/env";
import { listCategories, listPublicSummaries } from "@/lib/snippets";
import { filterSnippets } from "@/lib/snippet-utils";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Resource library",
  description:
    "Browse GPLMart's published Shopify Liquid resources: descriptions, categories, versions and previews. Source code and downloads are for members.",
  alternates: { canonical: "/library" },
};

export const dynamic = "force-dynamic";

export default async function LibraryPage({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim().slice(0, 100);
  const [all, categories] = isSupabaseConfigured()
    ? await Promise.all([listPublicSummaries(), listCategories()])
    : [[], []];
  const category = categories.some((c) => c.slug === sp.category) ? (sp.category as string) : "";
  const items = filterSnippets(all, categories, q, category);
  const href = (cat: string) => `/library?${new URLSearchParams({ ...(q && { q }), ...(cat && { category: cat }) })}`;
  const chip = (on: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
      on ? "border-accent bg-accent/20" : "border-line-strong text-muted hover:bg-white/[0.06] hover:text-fg",
    );

  return (
    <>
      <PageHeader
        title="Resource library"
        description="Every published Shopify Liquid resource. Free samples are fully open; member items show everything except the source."
        crumbs={[{ label: "Library" }]}
      />
      <Container className="py-10">
        <form role="search" action="/library" className="flex gap-3">
          {category && <input type="hidden" name="category" value={category} />}
          <div className="relative flex-1">
            <label htmlFor="q" className="sr-only">
              Search resources
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

        {categories.length > 0 && (
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
        )}

        {all.length > 0 && (
          <p role="status" className="my-6 text-sm text-subtle">
            {items.length} {items.length === 1 ? "resource" : "resources"}
          </p>
        )}
        {items.length ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/library/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/70 p-5 transition hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge>{categories.find((c) => c.slug === s.category_slug)?.name ?? s.category_slug}</Badge>
                    {s.is_demo ? (
                      <Badge className="border-mint/40 bg-mint/10 text-mint">Free</Badge>
                    ) : (
                      <Badge className="border-line-strong text-subtle">
                        <LockKeyhole aria-hidden className="size-3" /> Members
                      </Badge>
                    )}
                    {s.version && <Badge>v{s.version}</Badge>}
                  </div>
                  <h2 className="mt-3 font-display text-lg font-semibold">{s.title}</h2>
                  <p className="mt-1.5 line-clamp-3 text-sm text-muted">{s.description}</p>
                  {s.compatibility && <p className="mt-2 text-xs text-subtle">{s.compatibility}</p>}
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-accent">
                    View details <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8">
            {all.length ? (
              <EmptyState title="No resources match" description="Try a different search or category." href="/library" cta="Clear filters" />
            ) : (
              <div className="grid place-items-center rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
                <FlaskConical aria-hidden className="size-10 text-subtle" />
                <h2 className="mt-4 font-display text-xl font-semibold">The catalogue is being prepared</h2>
                <p className="mt-2 max-w-md text-muted">
                  Resources are published here only after licensing is confirmed. In the meantime, the free playground
                  has working Liquid examples you can study and copy.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/playground">Open the playground</ButtonLink>
                  <ButtonLink href="/checkout" variant="secondary">
                    <LockKeyhole aria-hidden className="size-4" /> About membership
                  </ButtonLink>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
