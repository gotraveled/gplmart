import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { examples } from "@/lib/playground/examples";
import { packs, packSnippetCount } from "@/lib/packs";
import { collectionJsonLd, breadcrumbJsonLd, jsonLdPayload } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shopify Liquid Snippets & Sections - Copy-Paste Components | GPLMart",
  description:
    "Browse every Shopify Liquid snippet and section in the GPLMart library - product page, cart, checkout, trust, marketing and navigation components. Live previews and install guides.",
  alternates: { canonical: "/snippets" },
  openGraph: {
    title: "Shopify Liquid Snippets & Sections - Copy-Paste Components",
    description: "Every Shopify Liquid snippet and section in the GPLMart library - live previews and install guides.",
    url: absoluteUrl("/snippets"),
  },
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const categories = [...new Set(examples.map((e) => e.category))];

export default function SnippetsIndexPage() {
  const jsonLd = jsonLdPayload(
    collectionJsonLd(examples.map((e) => ({ name: e.name, url: `/snippets/${e.id}` }))),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Library", url: "/library" },
      { name: "Snippets", url: "/snippets" },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PageHeader
        title="Shopify Liquid codes & snippets"
        description={`${examples.length} copy-paste components for product pages, cart, checkout, trust and navigation - every one with a live preview and install guide.`}
        crumbs={[{ label: "Library", href: "/library" }, { label: "Snippets" }]}
      />
      <Container className="py-10">
        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/snippets"
            className="rounded-full border border-accent/50 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          >
            All ({examples.length})
          </Link>
          {categories.map((cat) => {
            const n = examples.filter((e) => e.category === cat).length;
            return (
              <Link
                key={cat}
                href={`/snippets/category/${slugify(cat)}`}
                className="rounded-full border border-line bg-ink-900 px-4 py-1.5 text-sm text-muted transition hover:border-accent/50 hover:text-accent"
              >
                {cat} ({n})
              </Link>
            );
          })}
        </div>

        {categories.map((cat) => {
          const items = examples.filter((e) => e.category === cat);
          return (
            <section key={cat} className="mt-12">
              <h2 className="font-display text-xl font-semibold">
                <Link href={`/snippets/category/${slugify(cat)}`} className="transition hover:text-accent">
                  {cat}
                </Link>
                <span className="ml-2 text-sm font-normal text-subtle">{items.length}</span>
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((e) => (
                  <li key={e.id}>
                    <Link
                      href={`/snippets/${e.id}`}
                      className="group flex h-full flex-col rounded-xl border border-line bg-ink-900/60 p-4 transition hover:border-accent/50"
                    >
                      <div className="flex items-center gap-1.5">
                        <Badge className="text-[0.6rem]">{e.kind === "section" ? "Section" : "Snippet"}</Badge>
                      </div>
                      <p className="mt-2 font-display text-sm font-semibold group-hover:text-accent">{e.name}</p>
                      <p className="mt-1 line-clamp-2 flex-1 text-xs text-muted">{e.description}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent">
                        Preview &amp; code <ArrowRight aria-hidden className="size-3 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

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
