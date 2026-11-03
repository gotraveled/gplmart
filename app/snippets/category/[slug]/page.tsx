import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { examples, freeExampleIds } from "@/lib/playground/examples";
import { breadcrumbJsonLd, collectionJsonLd, jsonLdPayload } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const CATEGORIES = [...new Set(examples.map((e) => e.category))].map((c) => ({ name: c, slug: slugify(c) }));

const PITCH: Record<string, string> = {
  "product-page":
    "Shopify product page snippets that sell - variant swatches, sticky buy bars, trust rows, delivery info, cross-sells and review stars. Every component pastes straight into your product template.",
  "cart-checkout":
    "Cart and checkout Liquid code - free-shipping bars, cart upsells, trust badges, notes and express checkout hints that lift order value without apps.",
  "headers-navigation":
    "Header and navigation Shopify code - announcement bars, mega menus, promo headers and utility navigation built for OS 2.0 themes.",
  "trust-social-proof":
    "Trust and social proof snippets - rating stars, review counts, certification badges, guarantee bars and store info that reduce hesitation at the buy box.",
  marketing:
    "Marketing Liquid components - countdown timers, promo banners, coupons, drops and scarcity patterns for Shopify storefronts.",
  content:
    "Content sections for Shopify - FAQs, blogs, rich text, lookbooks and SEO-friendly structural components.",
  utility:
    "Utility Shopify components - back-to-top, scroll progress, cookie consent and theme helpers that work on any OS 2.0 template.",
};

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  const count = examples.filter((e) => e.category === cat.name).length;
  const title = `Shopify ${cat.name} Snippets - ${count} Liquid Code Examples`;
  return {
    title,
    description: PITCH[cat.slug] ?? `${count} Shopify Liquid ${cat.name.toLowerCase()} snippets with live previews and install guides.`,
    alternates: { canonical: `/snippets/category/${slug}` },
    openGraph: { title, url: absoluteUrl(`/snippets/category/${slug}`) },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const items = examples.filter((e) => e.category === cat.name);
  const jsonLd = jsonLdPayload(
    collectionJsonLd(items.map((e) => ({ name: e.name, url: `/snippets/${e.id}` }))),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Snippets", url: "/snippets" },
      { name: cat.name, url: `/snippets/category/${slug}` },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PageHeader
        title={`Shopify ${cat.name.toLowerCase()} snippets`}
        description={PITCH[cat.slug] ?? `${items.length} Liquid components with live previews and install guides.`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Snippets", href: "/snippets" },
          { label: cat.name },
        ]}
      />
      <Container className="py-10">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/playground">Preview in playground</ButtonLink>
          <ButtonLink href="/checkout" variant="secondary">
            <LockKeyhole aria-hidden className="size-4" /> Get all-access
          </ButtonLink>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((e) => (
            <li key={e.id}>
              <Link
                href={`/snippets/${e.id}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
              >
                <div className="flex items-center gap-1.5">
                  <Badge className="text-[0.6rem]">{e.kind}</Badge>
                  {freeExampleIds.has(e.id) && (
                    <Badge className="border-mint/40 bg-mint/10 text-[0.6rem] text-mint">Free</Badge>
                  )}
                </div>
                <p className="mt-2.5 font-display text-base font-semibold group-hover:text-accent">{e.name}</p>
                <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-muted">{e.description}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  View snippet <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-subtle">
          {items.length} components in this category - <Link href="/snippets" className="text-accent underline">browse all {examples.length} snippets</Link>
        </p>
      </Container>
    </>
  );
}
