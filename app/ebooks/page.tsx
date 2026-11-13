import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Download, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getCatalog } from "@/lib/products";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: "Ebooks - Ecommerce guides & playbooks | GPLMart",
  description:
    "In-depth GPLMart ebooks on high-demand ecommerce topics - Shopify launches, Meta ads, product research, AI-powered selling. Downloadable PDFs, members only.",
  alternates: { canonical: "/ebooks" },
};

export default function EbooksPage() {
  const ebooks = getCatalog().items.filter((p) => p.category === "ebook");
  return (
    <>
      <PageHeader
        title="Ebooks"
        description="In-depth playbooks on the topics sellers actually search for - launching stores, running ads, finding products and selling with AI. Downloadable PDFs, included in all-access."
        crumbs={[{ label: "Library", href: "/library" }, { label: "Ebooks" }]}
      />
      <Container className="py-10">
        {ebooks.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center text-sm text-muted">
            New ebooks are added regularly - check back soon.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {ebooks.map((e) => (
              <article key={e.slug} className="flex flex-col rounded-2xl border border-line bg-ink-900/70 p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex size-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <BookOpen aria-hidden className="size-5" />
                  </span>
                  <Badge className="border-mint/40 bg-mint/10 text-mint">PDF download</Badge>
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold">
                  <Link href={`/products/${e.slug}`} className="hover:text-accent">{e.title}</Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{e.description}</p>
                <p className="mt-3 text-xs text-subtle">
                  {e.files.length} file{e.files.length === 1 ? "" : "s"} - v{e.version} - members only
                </p>
                <div className="mt-5 flex gap-2.5">
                  <ButtonLink href={`/access/products/${e.slug}/download?file=book.pdf`} className="flex-1">
                    <Download aria-hidden className="size-4" /> Download PDF
                  </ButtonLink>
                  <ButtonLink href={`/products/${e.slug}`} variant="secondary">
                    <FileText aria-hidden className="size-4" /> Details
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        )}
        <p className="mt-8 text-sm text-muted">
          All ebooks are included in the{" "}
          <Link href="/checkout" className="text-accent underline">all-access membership ({formatOfferPrice()} once)</Link>{" "}
          - sign in with your member account to download.
        </p>
      </Container>
    </>
  );
}
