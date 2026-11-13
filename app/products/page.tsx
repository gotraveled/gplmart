import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clapperboard, Code2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { getCatalog, type ProductItem } from "@/lib/products";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: "Digital products - skills, ebooks, templates & tools",
  description:
    "GPLMart digital products: AI skill packs for ecommerce agents, PDF ebooks with resell rights, spreadsheet systems, swipe files and business template kits. Every download is included in all-access.",
  alternates: { canonical: "/products" },
};

const kindLabel: Record<string, string> = {
  "html-template": "HTML template",
  "php-script": "PHP script",
  ebook: "Ebook",
  "skill-pack": "AI skill pack",
  "spreadsheet-pack": "Spreadsheet system",
  "swipe-file": "Swipe file",
  "template-pack": "Template pack",
  "planner-pack": "Printable planner",
  bundle: "Mega bundle",
};

const categories = [
  { key: "skill-pack", title: "AI Skills", icon: Clapperboard, href: "/skills", blurb: "Ready-to-use agent skills - video, copy, ads, SEO, pricing, reviews and more." },
  { key: "ebook", title: "Ebooks & Guides", icon: BookOpen, href: "#ebooks", blurb: "Deep-dive guides on ecommerce, marketing and creator workflows - resell rights included." },
  { key: "code", title: "Templates & Tools", icon: Code2, href: "#code", blurb: "Spreadsheets, swipe files, document kits and templates - ready to use, resell rights included." },
] as const;

function ProductCard({ p }: { p: ProductItem }) {
  return (
    <Link
      href={`/products/${p.slug}`}
      className="group rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
    >
      <div className="flex items-center justify-between gap-2">
        <Badge>{kindLabel[p.category] ?? p.category}</Badge>
        <span className="font-mono text-xs text-subtle">v{p.version}</span>
      </div>
      <h3 className="mt-3 font-display text-base font-semibold group-hover:text-accent">{p.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted">{p.description}</p>
      <p className="mt-3 text-xs text-subtle">
        {p.files.length} file{p.files.length === 1 ? "" : "s"} - GPL - members download
      </p>
    </Link>
  );
}

export default function ProductsPage() {
  const { items } = getCatalog();
  const skills = items.filter((p) => p.category === "skill-pack");
  const ebooks = items.filter((p) => p.category === "ebook");
  const code = items.filter((p) => p.category !== "skill-pack" && p.category !== "ebook");
  const countFor = (key: string) => (key === "code" ? code.length : items.filter((p) => p.category === key).length);

  return (
    <>
      <PageHeader
        title="Digital products"
        description="AI skill packs, ebooks, spreadsheet systems, swipe files and template kits - every download is included in all-access membership."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />
      <Container className="py-10">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center text-sm text-muted">
            New products are added regularly - check back soon, or browse the{" "}
            <Link href="/library" className="text-accent underline">Liquid library</Link> meanwhile.
          </p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              {categories.map((c) => {
                const Icon = c.icon;
                const count = countFor(c.key);
                if (count === 0) return null;
                return (
                  <Link
                    key={c.key}
                    href={c.href}
                    className="group rounded-2xl border border-line bg-ink-900/60 p-6 transition hover:border-accent/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-ink-950">
                        <Icon aria-hidden className="size-5 text-accent" />
                      </span>
                      <span className="font-mono text-sm text-subtle">{count} item{count === 1 ? "" : "s"}</span>
                    </div>
                    <h2 className="mt-4 font-display text-lg font-semibold group-hover:text-accent">{c.title}</h2>
                    <p className="mt-1.5 text-sm text-muted">{c.blurb}</p>
                    <p className="mt-3 flex items-center gap-1 text-sm text-accent">
                      Browse <ArrowRight aria-hidden className="size-4" />
                    </p>
                  </Link>
                );
              })}
            </div>

            {skills.length > 0 && (
              <section className="mt-12">
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-semibold">AI Skills</h2>
                    <p className="mt-1 text-sm text-muted">
                      Instructions for AI agents (Claude Code, Devin, etc.) - download, unzip, upload the skill folder. Each pack includes a <code className="rounded bg-ink-800 px-1.5 py-0.5 text-xs">USAGE.md</code> guide.
                    </p>
                  </div>
                  <Link href="/skills" className="shrink-0 text-sm text-accent underline">View all categorized →</Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {skills.slice(0, 6).map((p) => <ProductCard key={p.slug} p={p} />)}
                </div>
                {skills.length > 6 && (
                  <p className="mt-4 text-sm text-muted">
                    +{skills.length - 6} more skill packs -{" "}
                    <Link href="/skills" className="text-accent underline">see the full categorized collection</Link>.
                  </p>
                )}
              </section>
            )}

            {ebooks.length > 0 && (
              <section id="ebooks" className="mt-12 scroll-mt-24">
                <h2 className="mb-5 font-display text-2xl font-semibold">Ebooks & Guides</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {ebooks.map((p) => <ProductCard key={p.slug} p={p} />)}
                </div>
              </section>
            )}

            {code.length > 0 && (
              <section id="code" className="mt-12 scroll-mt-24">
                <h2 className="mb-5 font-display text-2xl font-semibold">Templates, Tools & Packs</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {code.map((p) => <ProductCard key={p.slug} p={p} />)}
                </div>
              </section>
            )}
          </>
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
