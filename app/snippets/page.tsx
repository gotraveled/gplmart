import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { examples, freeExampleIds } from "@/lib/playground/examples";
import { collectionJsonLd, breadcrumbJsonLd, jsonLdPayload } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shopify Liquid Snippets & Sections - 200+ Copy-Paste Components",
  description:
    "Browse every Shopify Liquid snippet and section in the GPLMart library - product page, cart, checkout, trust, marketing and navigation components. Live previews, install guides, free code samples.",
  alternates: { canonical: "/snippets" },
  openGraph: {
    title: "Shopify Liquid Snippets & Sections - 200+ Copy-Paste Components",
    description:
      "Every Shopify Liquid snippet and section in the GPLMart library - live previews, install guides, free code samples.",
    url: absoluteUrl("/snippets"),
  },
};

export default function SnippetsIndexPage() {
  const categories = [...new Set(examples.map((e) => e.category))];
  const jsonLd = jsonLdPayload(
    collectionJsonLd(examples.map((e) => ({ name: e.name, url: `/snippets/${e.id}` }))),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Snippets", url: "/snippets" },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PageHeader
        title="Shopify Liquid snippets & sections"
        description={`${examples.length} copy-paste components for product pages, cart, checkout, trust and navigation - every one with a live preview and install guide.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Snippets" }]}
      />
      <Container className="py-10">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/playground">Open the playground</ButtonLink>
          <ButtonLink href="/checkout" variant="secondary">
            <LockKeyhole aria-hidden className="size-4" /> Get all-access
          </ButtonLink>
        </div>

        {categories.map((cat) => {
          const items = examples.filter((e) => e.category === cat);
          return (
            <section key={cat} className="mt-12">
              <h2 className="font-display text-xl font-semibold">
                {cat} <span className="ml-2 text-sm font-normal text-subtle">{items.length}</span>
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((e) => (
                  <li key={e.id}>
                    <Link
                      href={`/snippets/${e.id}`}
                      className="group flex h-full flex-col rounded-xl border border-line bg-ink-900/60 p-4 transition hover:border-accent/50"
                    >
                      <div className="flex items-center gap-1.5">
                        <Badge className="text-[0.6rem]">{e.kind}</Badge>
                        {freeExampleIds.has(e.id) && (
                          <Badge className="border-mint/40 bg-mint/10 text-[0.6rem] text-mint">Free</Badge>
                        )}
                      </div>
                      <p className="mt-2 font-display text-sm font-semibold group-hover:text-accent">{e.name}</p>
                      <p className="mt-1 line-clamp-2 flex-1 text-xs text-muted">{e.description}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent">
                        View <ArrowRight aria-hidden className="size-3 transition group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </Container>
    </>
  );
}
