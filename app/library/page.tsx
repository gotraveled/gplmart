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
const liveCourses = courses.filter((c) => c.status === "live");
const exampleCategories = [...new Set(examples.map((e) => e.category))];

function SectionCard({
  icon: Icon,
  title,
  tag,
  text,
  href,
  cta,
  children,
}: {
  icon: LucideIcon;
  title: string;
  tag: string;
  text: string;
  href: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-ink-900/70 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
            <Icon aria-hidden className="size-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-semibold">{title}</h2>
              <Badge>{tag}</Badge>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-muted">{text}</p>
          </div>
        </div>
        <Link href={href} className="shrink-0 text-sm text-accent underline">
          {cta} →
        </Link>
      </div>
      <div className="mt-6">{children}</div>
    </section>
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
        <div className="space-y-8">
          {/* 1. Liquid codes & snippets */}
          <SectionCard
            icon={Code2}
            title="Shopify Liquid codes & snippets"
            tag={`${examples.length} components`}
            text="Original sections and snippets across every store area - preview live in the playground, copy clean Liquid, install in minutes."
            href="/playground"
            cta="Open playground"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {exampleCategories.map((cat) => {
                const items = examples.filter((e) => e.category === cat);
                return (
                  <div key={cat} className="rounded-xl border border-line bg-ink-950/60 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold">{cat}</h3>
                      <span className="font-mono text-xs text-subtle">{items.length}</span>
                    </div>
                    <ul className="mt-2.5 space-y-1.5">
                      {items.slice(0, 3).map((e) => (
                        <li key={e.id}>
                          <Link href={`/playground?example=${e.id}`} className="text-sm text-muted transition hover:text-accent">
                            {e.name}
                          </Link>
                        </li>
                      ))}
                      {items.length > 3 && <li className="text-xs text-subtle">+{items.length - 3} more</li>}
                    </ul>
                  </div>
                );
              })}
            </div>

            <h3 className="mt-7 flex items-center gap-2 font-display text-base font-semibold">
              <Package aria-hidden className="size-4 text-accent" /> Snippet packs
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {packs.map((p) => (
                <Link
                  key={p.slug}
                  href={`/packs/${p.slug}`}
                  className="group rounded-xl border border-line bg-ink-950/60 p-4 transition hover:border-accent/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold group-hover:text-accent">{p.title}</h4>
                    <Badge>{packSnippetCount(p)} snippets</Badge>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-xs text-muted">{p.description}</p>
                </Link>
              ))}
            </div>
          </SectionCard>

          {/* 2. Courses */}
          <SectionCard
            icon={GraduationCap}
            title="Courses"
            tag={`${liveCourses.length} live`}
            text="Structured courses with full lessons - preview free, members get everything including downloadable resources."
            href="/courses"
            cta="All courses"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {liveCourses.map((c) => (
                <Link
                  key={c.slug}
                  href={`/course/${c.slug}`}
                  className="group rounded-xl border border-line bg-ink-950/60 p-4 transition hover:border-accent/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge className="border-mint/40 bg-mint/10 text-mint">{c.level}</Badge>
                    <span className="text-xs text-subtle">{c.modules.length} modules</span>
                  </div>
                  <h3 className="mt-2.5 text-sm font-semibold group-hover:text-accent">{c.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">{c.tagline}</p>
                </Link>
              ))}
            </div>
          </SectionCard>

          {/* 3. Digital products */}
          <SectionCard
            icon={Download}
            title="Digital products"
            tag={`${digitalProducts.length} products`}
            text="AI skill packs for ecommerce agents plus code products - every download is a zip, included in all-access."
            href="/products"
            cta="All products"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {digitalProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group rounded-xl border border-line bg-ink-950/60 p-4 transition hover:border-accent/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge>{p.category === "skill-pack" ? "AI skill" : p.category === "html-template" ? "HTML" : "PHP"}</Badge>
                    <span className="font-mono text-xs text-subtle">v{p.version}</span>
                  </div>
                  <h3 className="mt-2.5 text-sm font-semibold group-hover:text-accent">{p.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">{p.description}</p>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">
              Skills grouped by function: <Link href="/skills" className="text-accent underline">view the categorized AI skills collection</Link>.
            </p>
          </SectionCard>

          {/* 4. Ebooks */}
          <SectionCard
            icon={BookOpen}
            title="Ebooks"
            tag={`${ebooks.length} titles`}
            text="In-depth playbooks on high-demand topics - downloadable PDFs, members only."
            href="/ebooks"
            cta="All ebooks"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {ebooks.map((e) => (
                <div key={e.slug} className="flex flex-col rounded-xl border border-line bg-ink-950/60 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold">
                      <Link href={`/products/${e.slug}`} className="hover:text-accent">{e.title}</Link>
                    </h3>
                    <Badge className="border-mint/40 bg-mint/10 text-mint">PDF</Badge>
                  </div>
                  <p className="mt-1.5 flex-1 text-xs text-muted">{e.description}</p>
                  <div className="mt-3 flex gap-2">
                    <ButtonLink href={`/access/products/${e.slug}/download?file=book.pdf`} className="flex-1">
                      <Download aria-hidden className="size-3.5" /> Download PDF
                    </ButtonLink>
                    <ButtonLink href={`/products/${e.slug}`} variant="secondary" className="px-3">Details</ButtonLink>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 5. AI prompts */}
          <SectionCard
            icon={Sparkles}
            title="AI prompts"
            tag="Free"
            text="Battle-tested prompts for store copy, product descriptions, marketing and support - free for everyone, no account needed."
            href="/prompts"
            cta="Get free prompts"
          >
            <ButtonLink href="/prompts" variant="secondary">
              Browse free prompts <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          </SectionCard>
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
