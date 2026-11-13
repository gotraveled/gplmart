import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, FileCode2, Package, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { examples } from "@/lib/playground/examples";
import { packs, packSnippetCount } from "@/lib/packs";
import { courses } from "@/lib/course";
import { getCatalog } from "@/lib/products";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: "Resource library",
  description:
    "Everything included in GPLMart all-access: Shopify Liquid snippets and packs, courses, AI skill packs, ebooks and prompts - all in one place.",
  alternates: { canonical: "/library" },
};

const catalog = getCatalog().items;
const ebooks = catalog.filter((p) => p.category === "ebook");
const digitalProducts = catalog.filter((p) => p.category !== "ebook");
const liveCourses = courses.filter((c) => c.status === "live");
const exampleCategories = [...new Set(examples.map((e) => e.category))];

export default function LibraryPage() {
  return (
    <>
      <PageHeader
        title="Resource library"
        description="Everything included in GPLMart all-access - Liquid code, packs, courses, AI skills, ebooks and prompts, stacked by category."
        crumbs={[{ label: "Library" }]}
      />
      <Container className="py-10">
        {/* 1. Shopify Liquid codes & snippets */}
        <section>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold">Shopify Liquid codes &amp; snippets</h2>
              <p className="mt-1 text-sm text-muted">
                {examples.length} original components across {exampleCategories.length} categories - preview live in the playground, copy clean Liquid, install in minutes.
              </p>
            </div>
            <Link href="/playground" className="text-sm text-accent underline">Open playground →</Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exampleCategories.map((cat) => {
              const items = examples.filter((e) => e.category === cat);
              return (
                <div key={cat} className="rounded-2xl border border-line bg-ink-900/60 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-sm font-semibold">{cat}</h3>
                    <Badge>{items.length}</Badge>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {items.slice(0, 4).map((e) => (
                      <li key={e.id}>
                        <Link href={`/playground?example=${e.id}`} className="text-sm text-muted transition hover:text-accent">
                          {e.name}
                        </Link>
                      </li>
                    ))}
                    {items.length > 4 && (
                      <li className="text-xs text-subtle">+{items.length - 4} more in playground</li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>

          <h3 className="mt-8 font-display text-lg font-semibold">Snippet packs</h3>
          <p className="mt-1 text-sm text-muted">Curated packs by job-to-be-done - each downloads as a zip with install guides.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                <h4 className="mt-3 font-display text-base font-semibold group-hover:text-accent">{p.title}</h4>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{p.description}</p>
                <p className="mt-3 flex items-center gap-1 text-xs text-accent">View pack <ArrowRight aria-hidden className="size-3" /></p>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. Courses */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold">Courses</h2>
              <p className="mt-1 text-sm text-muted">Structured courses with full lessons - preview free, members get everything.</p>
            </div>
            <Link href="/courses" className="text-sm text-accent underline">All courses →</Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveCourses.map((c) => (
              <Link
                key={c.slug}
                href={`/course/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge className="border-mint/40 bg-mint/10 text-mint">{c.level}</Badge>
                  <span className="text-xs text-subtle">{c.modules.length} modules</span>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold group-hover:text-accent">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.tagline}</p>
                <p className="mt-3 flex items-center gap-1 text-xs text-accent">Start course <ArrowRight aria-hidden className="size-3" /></p>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Digital products (skills + code) */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold">Digital products</h2>
              <p className="mt-1 text-sm text-muted">
                {digitalProducts.filter((p) => p.category === "skill-pack").length} AI skill packs + code products - zip downloads for members.
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <Link href="/skills" className="text-accent underline">AI skills by category →</Link>
              <Link href="/products" className="text-accent underline">All products →</Link>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {digitalProducts.slice(0, 9).map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <Badge>{p.category === "skill-pack" ? "AI skill pack" : p.category === "ebook" ? "Ebook" : p.category === "html-template" ? "HTML template" : "PHP script"}</Badge>
                  <span className="font-mono text-xs text-subtle">v{p.version}</span>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{p.description}</p>
              </Link>
            ))}
          </div>
          {digitalProducts.length > 9 && (
            <p className="mt-4 text-sm text-muted">
              +{digitalProducts.length - 9} more - <Link href="/products" className="text-accent underline">browse all products</Link>.
            </p>
          )}
        </section>

        {/* 4. Ebooks */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold">Ebooks</h2>
              <p className="mt-1 text-sm text-muted">In-depth playbooks on high-demand topics - downloadable PDFs, members only.</p>
            </div>
            <Link href="/ebooks" className="text-sm text-accent underline">All ebooks →</Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {ebooks.map((e) => (
              <article key={e.slug} className="flex flex-col rounded-2xl border border-line bg-ink-900/60 p-5">
                <div className="flex items-center justify-between gap-2">
                  <BookOpen aria-hidden className="size-5 text-accent" />
                  <Badge className="border-mint/40 bg-mint/10 text-mint">PDF</Badge>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold">
                  <Link href={`/products/${e.slug}`} className="hover:text-accent">{e.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">{e.description}</p>
                <div className="mt-4 flex gap-2">
                  <ButtonLink href={`/access/products/${e.slug}/download?file=book.pdf`} className="flex-1">
                    <Download aria-hidden className="size-4" /> Download PDF
                  </ButtonLink>
                  <ButtonLink href={`/products/${e.slug}`} variant="secondary">Details</ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. AI prompts */}
        <section className="mt-14">
          <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
              <Sparkles aria-hidden className="size-5" />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold">AI prompts</h2>
              <p className="mt-1 text-sm text-muted">Battle-tested prompts for store copy, product descriptions, marketing and support - free for everyone.</p>
            </div>
            <ButtonLink href="/prompts" variant="secondary">Get free prompts</ButtonLink>
          </div>
        </section>

        {/* All-access CTA */}
        <div className="mt-14 flex flex-col items-center rounded-2xl border border-accent/40 bg-accent/10 p-8 text-center">
          <FileCode2 aria-hidden className="size-8 text-accent" />
          <h2 className="mt-3 font-display text-xl font-semibold">One payment. Everything.</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            All-access unlocks every snippet, pack, course, skill pack, ebook and future drop - {formatOfferPrice()} once, 30-day money-back guarantee.
          </p>
          <ButtonLink href="/checkout" className="mt-5">Get all-access - {formatOfferPrice()}</ButtonLink>
        </div>
      </Container>
    </>
  );
}
