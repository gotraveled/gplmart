import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Download, FileCode2, GraduationCap, Package, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { examples } from "@/lib/playground/examples";
import { packs, packSnippetCount } from "@/lib/packs";
import { courses } from "@/lib/course";
import { getCatalog } from "@/lib/products";
import { formatOfferPrice } from "@/lib/offer";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Resource library",
  description:
    "Everything included in GPLMart all-access: Shopify Liquid snippets and packs, courses, AI skill packs, ebooks and prompts - all in one place.",
  alternates: { canonical: "/library" },
};

const catalog = getCatalog().items;
const ebooks = catalog.filter((p) => p.category === "ebook");
const digitalProducts = catalog.filter((p) => p.category !== "ebook");
const skillCount = digitalProducts.filter((p) => p.category === "skill-pack").length;
const liveCourses = courses.filter((c) => c.status === "live");
const exampleCategories = [...new Set(examples.map((e) => e.category))];

function Card({
  icon: Icon,
  title,
  tag,
  text,
  href,
  cta,
  children,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  tag: string;
  text: string;
  href: string;
  cta: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex h-full flex-col rounded-2xl border border-line bg-ink-900/70 p-6 transition hover:border-accent/40 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
            <Icon aria-hidden className="size-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base font-semibold">{title}</h2>
              <Badge>{tag}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex-1">{children}</div>
      <Link href={href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
        {cta} <ArrowRight aria-hidden className="size-4" />
      </Link>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <>
      <PageHeader
        title="Resource library"
        description="Everything included in GPLMart all-access - Liquid code, packs, courses, AI skills, ebooks and prompts, stacked by category."
        crumbs={[{ label: "Library" }]}
      />
      <Container className="py-10">
        <div className="grid items-start gap-5 md:grid-cols-2">
          {/* 1. Liquid codes & snippets */}
          <Card
            icon={Code2}
            title="Shopify Liquid codes & snippets"
            tag={`${examples.length} components`}
            text="Original components across every store area - preview live, copy clean Liquid."
            href="/playground"
            cta="Open playground"
          >
            <div className="space-y-3">
              {exampleCategories.map((cat) => {
                const items = examples.filter((e) => e.category === cat);
                return (
                  <div key={cat} className="rounded-xl border border-line bg-ink-950/60 p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold">{cat}</h3>
                      <span className="font-mono text-xs text-subtle">{items.length}</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {items.slice(0, 2).map((e) => (
                        <li key={e.id}>
                          <Link href={`/playground?example=${e.id}`} className="text-sm text-muted transition hover:text-accent">
                            {e.name}
                          </Link>
                        </li>
                      ))}
                      {items.length > 2 && <li className="text-xs text-subtle">+{items.length - 2} more</li>}
                    </ul>
                  </div>
                );
              })}
              <div className="rounded-xl border border-line bg-ink-950/60 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold">
                    <Package aria-hidden className="size-4 text-accent" /> Snippet packs
                  </h3>
                  <span className="font-mono text-xs text-subtle">{packs.length}</span>
                </div>
                <ul className="mt-2 space-y-1">
                  {packs.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/packs/${p.slug}`} className="text-sm text-muted transition hover:text-accent">
                        {p.title} <span className="text-xs text-subtle">({packSnippetCount(p)})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* 2. Courses */}
          <Card
            icon={GraduationCap}
            title="Courses"
            tag={`${liveCourses.length} live`}
            text="Structured courses with full lessons - preview free, members get everything."
            href="/courses"
            cta="All courses"
          >
            <div className="space-y-2.5">
              {liveCourses.map((c) => (
                <Link
                  key={c.slug}
                  href={`/course/${c.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-ink-950/60 px-4 py-3 transition hover:border-accent/50"
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold group-hover:text-accent">{c.title}</h3>
                    <p className="mt-0.5 truncate text-xs text-muted">{c.tagline}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge className="border-mint/40 bg-mint/10 text-mint">{c.level}</Badge>
                    <span className="text-xs text-subtle">{c.modules.length}m</span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* 3. Digital products */}
          <Card
            icon={Download}
            title="Digital products"
            tag={`${digitalProducts.length} items`}
            text="AI skill packs for ecommerce agents plus code products - zip downloads for members."
            href="/products"
            cta="All products"
          >
            <div className="space-y-2.5">
              {digitalProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-ink-950/60 px-4 py-3 transition hover:border-accent/50"
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold group-hover:text-accent">{p.title}</h3>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted">{p.description}</p>
                  </div>
                  <Badge className="shrink-0">
                    {p.category === "skill-pack" ? "AI skill" : p.category === "html-template" ? "HTML" : "PHP"}
                  </Badge>
                </Link>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              {skillCount} skill packs grouped by function - <Link href="/skills" className="text-accent underline">categorized view</Link>.
            </p>
          </Card>

          {/* 4. Ebooks */}
          <Card
            icon={BookOpen}
            title="Ebooks"
            tag={`${ebooks.length} titles`}
            text="In-depth playbooks on high-demand topics - downloadable PDFs, members only."
            href="/ebooks"
            cta="All ebooks"
          >
            <div className="space-y-2.5">
              {ebooks.map((e) => (
                <div key={e.slug} className="rounded-xl border border-line bg-ink-950/60 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">
                      <Link href={`/products/${e.slug}`} className="hover:text-accent">{e.title}</Link>
                    </h3>
                    <Badge className="shrink-0 border-mint/40 bg-mint/10 text-mint">PDF</Badge>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <ButtonLink href={`/access/products/${e.slug}/download?file=book.pdf`} className="flex-1">
                      <Download aria-hidden className="size-3.5" /> Download PDF
                    </ButtonLink>
                    <ButtonLink href={`/products/${e.slug}`} variant="secondary" className="px-3">Details</ButtonLink>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 5. AI prompts */}
          <Card
            icon={Sparkles}
            title="AI prompts"
            tag="Free"
            text="Battle-tested prompts for store copy, product descriptions, marketing and support - free for everyone, no account needed."
            href="/prompts"
            cta="Get free prompts"
          >
            <div className="rounded-xl border border-dashed border-line-strong bg-ink-950/40 p-6 text-center">
              <Sparkles aria-hidden className="mx-auto size-6 text-accent" />
              <p className="mt-2 text-sm text-muted">Ready-to-paste prompts for listings, ads, emails, WhatsApp and support.</p>
              <ButtonLink href="/prompts" variant="secondary" className="mt-4">Browse free prompts</ButtonLink>
            </div>
          </Card>
        </div>

        {/* All-access CTA */}
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-accent/40 bg-accent/10 p-8 text-center">
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
