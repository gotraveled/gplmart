import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Workbench } from "@/components/playground/workbench";
import { examples } from "@/lib/playground/examples";
import { packs, packSnippetCount } from "@/lib/packs";
import { collectionJsonLd, breadcrumbJsonLd, jsonLdPayload } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shopify Liquid Snippets & Sections - Preview & Copy | GPLMart",
  description:
    "Browse every Shopify Liquid snippet and section - live preview cards, category filters and a detail modal with preview, controls and copyable code. Members get full source.",
  alternates: { canonical: "/snippets" },
  openGraph: {
    title: "Shopify Liquid Snippets & Sections - Preview & Copy",
    description: "Every Shopify Liquid snippet and section - live previews, category filters, copyable source.",
    url: absoluteUrl("/snippets"),
  },
};

export default async function SnippetsPage({
  searchParams,
}: {
  searchParams: Promise<{ example?: string }>;
}) {
  const sp = await searchParams;
  const example = typeof sp.example === "string" ? sp.example.slice(0, 60) : undefined;
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
        description={`${examples.length} copy-paste components - preview live, tweak the controls, copy the code. All snippets unlock with all-access.`}
        crumbs={[{ label: "Library", href: "/library" }, { label: "Snippets" }]}
      />
      <Container className="py-10">
        <Workbench initialId={example} basePath="/snippets" freeTier={false} />

        <section className="mt-16">
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
