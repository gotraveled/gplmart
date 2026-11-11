import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { packs, packSnippetCount } from "@/lib/packs";

export const metadata: Metadata = {
  title: "Snippet packs",
  description:
    "Curated bundles of GPLMart Shopify Liquid snippets by use-case - product page, cart upsells, trust, marketing and navigation. Included in all-access.",
  alternates: { canonical: "/packs" },
};

export default function PacksPage() {
  return (
    <>
      <PageHeader
        title="Snippet packs"
        description="The library organised by job-to-be-done. Each pack is a curated set of snippets that work together - preview every one live, then grab the whole pack as a zip."
        crumbs={[{ label: "Library" }, { label: "Packs" }]}
      />
      <Container className="py-10">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((p) => {
            const n = packSnippetCount(p);
            return (
              <li key={p.slug}>
                <Link
                  href={`/packs/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/70 p-6 transition hover:-translate-y-1 hover:border-accent/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                      <Package aria-hidden className="size-5" />
                    </span>
                    <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-[0.65rem] font-medium text-subtle">
                      {n} snippets
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-semibold group-hover:text-accent">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  <p className="mt-3 text-xs text-subtle">{p.audience}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    View pack <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-center text-sm text-muted">
          Packs are included in all-access membership - one payment unlocks every snippet in every pack.
        </p>
      </Container>
    </>
  );
}
