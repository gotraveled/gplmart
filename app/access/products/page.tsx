import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { getCatalog } from "@/lib/products";

export const metadata: Metadata = { title: "Digital products", robots: { index: false } };

const kindLabel: Record<string, string> = { "html-template": "HTML template", "php-script": "PHP script", ebook: "Ebook" };

export default function MemberProductsPage() {
  const { items } = getCatalog();
  return (
    <>
      <PageHeader
        title="Digital products"
        description="HTML templates, PHP scripts and ebooks - included in your all-access membership. Downloads are instant zips."
        crumbs={[{ label: "Resource hub", href: "/access" }, { label: "Products" }]}
      />
      <Container className="py-10">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center text-sm text-muted">
            The first product batch is being prepared - check back soon.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <li key={p.slug} className="flex flex-col rounded-2xl border border-line bg-ink-900/60 p-5">
                <div className="flex items-center justify-between gap-2">
                  <Badge>{kindLabel[p.category] ?? p.category}</Badge>
                  <span className="font-mono text-xs text-subtle">v{p.version}</span>
                </div>
                <h2 className="mt-3 font-display text-base font-semibold">{p.title}</h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{p.description}</p>
                <p className="mt-3 text-xs text-subtle">
                  {p.files.length} file{p.files.length === 1 ? "" : "s"} - {p.license}
                </p>
                <a
                  href={`/access/products/${p.slug}/download`}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:brightness-110"
                >
                  <Download aria-hidden className="size-4" /> Download zip
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
