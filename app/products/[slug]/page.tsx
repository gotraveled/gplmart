import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, FileCode2, LockKeyhole } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getCatalog, getProduct } from "@/lib/products";
import { formatOfferPrice } from "@/lib/offer";

export function generateStaticParams() {
  return getCatalog().items.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product" };
  return {
    title: `${p.title} - ${p.category === "php-script" ? "PHP Script" : p.category === "ebook" ? "Ebook" : p.category === "skill-pack" ? "AI Skill Pack" : "HTML Template"} | GPLMart`,
    description: p.description.slice(0, 155),
    alternates: { canonical: `/products/${p.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  return (
    <>
      <PageHeader
        title={p.title}
        description={p.description}
        crumbs={[{ label: "Products", href: "/products" }, { label: p.title }]}
      />
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <Badge>{p.category === "php-script" ? "PHP script" : p.category === "ebook" ? "Ebook" : p.category === "skill-pack" ? "AI skill pack" : "HTML template"}</Badge>
              <Badge>v{p.version}</Badge>
              <Badge className="border-mint/40 bg-mint/10 text-mint">{p.license}</Badge>
            </div>
            <h2 className="mt-8 font-display text-xl font-semibold">What&apos;s in the zip</h2>
            <ul className="mt-4 space-y-2">
              {p.files.map((f) => (
                <li key={f} className="flex items-center gap-2 rounded-lg border border-line bg-ink-900/60 px-4 py-2.5 font-mono text-sm">
                  <FileCode2 aria-hidden className="size-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Original GPLMart code - use it, modify it, ship it in client work. No license keys, no
              subscriptions, no phone-home. Added {p.added}.
            </p>
          </div>
          <aside className="h-fit rounded-2xl border border-line-strong bg-ink-900 p-6 lg:sticky lg:top-24">
            <LockKeyhole aria-hidden className="size-6 text-accent" />
            <h2 className="mt-3 font-display text-lg font-semibold">Members download</h2>
            <p className="mt-2 text-sm text-muted">
              Included in all-access - one payment unlocks every product, snippet and guide.
            </p>
            {p.category === "ebook" && p.files.includes("book.pdf") ? (
              <ButtonLink href={`/access/products/${p.slug}/download?file=book.pdf`} className="mt-5 w-full">
                <Download aria-hidden className="size-4" /> Download PDF
              </ButtonLink>
            ) : (
              <ButtonLink href={`/access/products/${p.slug}/download`} className="mt-5 w-full">
                <Download aria-hidden className="size-4" /> Download zip
              </ButtonLink>
            )}
            <ButtonLink href="/checkout" variant="secondary" className="mt-2.5 w-full">
              Get all-access - {formatOfferPrice()}
            </ButtonLink>
          </aside>
        </div>
      </Container>
    </>
  );
}
