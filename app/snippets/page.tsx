import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { examples } from "@/lib/playground/examples";
import { packs, packSnippetCount } from "@/lib/packs";

export const metadata: Metadata = {
  title: "Shopify Liquid snippets & packs - browse by category | GPLMart",
  description:
    "Browse every GPLMart Liquid snippet by category - product pages, cart, checkout, trust, marketing, navigation and content - plus curated snippet packs with zip downloads.",
  alternates: { canonical: "/snippets" },
};

const categories = [...new Set(examples.map((e) => e.category))];

export default function SnippetsPage() {
  return (
    <>
      <PageHeader
        title="Shopify Liquid codes & snippets"
        description={`${examples.length} original components across ${categories.length} categories - preview live in the playground, copy clean Liquid, paste into any OS 2.0 theme.`}
        crumbs={[{ label: "Library", href: "/library" }, { label: "Snippets" }]}
      />
      <Container className="py-10">
        <div className="space-y-8">
          {categories.map((cat) => {
            const items = examples.filter((e) => e.category === cat);
            return (
              <section key={cat}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-semibold">{cat}</h2>
                  <Badge>{items.length} snippet{items.length === 1 ? "" : "s"}</Badge>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((e) => (
                    <Link
                      key={e.id}
                      href={`/playground?example=${e.id}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Badge>{e.kind === "section" ? "Section" : "Snippet"}</Badge>
                        <Play aria-hidden className="size-4 text-subtle transition group-hover:text-accent" />
                      </div>
                      <h3 className="mt-3 text-sm font-semibold group-hover:text-accent">{e.name}</h3>
                      <p className="mt-1.5 line-clamp-2 flex-1 text-xs text-muted">{e.description}</p>
                      <p className="mt-3 flex items-center gap-1 text-xs text-accent">
                        Preview live <ArrowRight aria-hidden className="size-3" />
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">Snippet packs</h2>
              <p className="mt-1 text-sm text-muted">Curated packs by job-to-be-done - each downloads as a zip with install guides.</p>
            </div>
            <Link href="/packs" className="shrink-0 text-sm text-accent underline">All packs →</Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((p) => (
              <Link
                key={p.slug}
                href={`/packs/${p.slug}`}
                className="group rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <Package aria-hidden className="size-5 text-accent" />
                  <Badge>{packSnippetCount(p)} snippets</Badge>
                </div>
                <h3 className="mt-3 text-base font-semibold group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{p.description}</p>
                <p className="mt-3 flex items-center gap-1 text-xs text-accent">
                  View pack <ArrowRight aria-hidden className="size-3" />
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
