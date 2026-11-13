import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { getCatalog } from "@/lib/products";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: "Digital products - HTML templates & PHP scripts",
  description:
    "GPLMart-original HTML landing page templates and self-contained PHP scripts. Every product is GPL-licensed original code, downloadable instantly with all-access.",
  alternates: { canonical: "/products" },
};

const kindLabel: Record<string, string> = { "html-template": "HTML template", "php-script": "PHP script", ebook: "Ebook", "skill-pack": "AI skill pack" };

export default function ProductsPage() {
  const { items } = getCatalog();
  return (
    <>
      <PageHeader
        title="Digital products"
        description="Original HTML templates and PHP micro-scripts - GPL-licensed code you can use, modify and ship in client work. Every download is a zip, ready to deploy."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <Container className="py-10">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center text-sm text-muted">
            New products are added regularly - check back soon, or browse the{" "}
            <Link href="/library" className="text-accent underline">Liquid library</Link> meanwhile.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge>{kindLabel[p.category] ?? p.category}</Badge>
                  <span className="font-mono text-xs text-subtle">v{p.version}</span>
                </div>
                <h2 className="mt-3 font-display text-base font-semibold group-hover:text-accent">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted">{p.description}</p>
                <p className="mt-3 text-xs text-subtle">
                  {p.files.length} file{p.files.length === 1 ? "" : "s"} - GPL - members download
                </p>
              </Link>
            ))}
          </div>
        )}
        <p className="mt-8 text-sm text-muted">
          All products are included in the{" "}
          <Link href="/checkout" className="text-accent underline">all-access membership ({formatOfferPrice()} once)</Link>{" "}
          - no per-item fees.
        </p>
      </Container>
    </>
  );
}
