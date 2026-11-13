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
        description="In-depth playbooks across ecommerce, AI, freelancing, money and digital products - downloadable PDFs, members only. Every ebook includes resell rights: sell them as your own."
        crumbs={[{ label: "Library", href: "/library" }, { label: "Ebooks" }]}
      />
      <Container className="py-10">
        <div className="mb-10 grid gap-4 rounded-2xl border border-line bg-ink-900/60 p-6 sm:grid-cols-4">
          {[
            { n: "1", t: "Get all-access", d: "One payment unlocks every ebook - no per-book fees." },
            { n: "2", t: "Sign in", d: "Your member account is created automatically after payment." },
            { n: "3", t: "Download the PDF", d: "Instant download from this page or your dashboard." },
            { n: "4", t: "Read anywhere", d: "Works offline in any PDF reader - phone, tablet, desktop." },
          ].map((s) => (
            <div key={s.n} className="flex gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent">{s.n}</span>
              <div>
                <p className="text-sm font-semibold">{s.t}</p>
                <p className="mt-0.5 text-xs text-muted">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
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
                  <Badge className="border-mint/40 bg-mint/10 text-mint">PDF + resell rights</Badge>
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
        <p className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-5 text-sm text-muted">
          <span className="font-semibold text-fg">Resell rights included:</span> every GPLMart ebook can be resold as your own digital product - list it on Etsy, Gumroad or your store and keep 100% of the profit. See the <Link href="/products/digital-products-empire" className="text-accent underline">Digital Products Empire</Link> ebook for the full reselling playbook.
        </p>
        <p className="mt-4 text-sm text-muted">
          All ebooks are included in the{" "}
          <Link href="/checkout" className="text-accent underline">all-access membership ({formatOfferPrice()} once)</Link>{" "}
          - sign in with your member account to download.
        </p>
      </Container>
    </>
  );
}
