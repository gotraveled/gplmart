import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Download, FileCode2, GraduationCap, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { examples } from "@/lib/playground/examples";
import { getCatalog } from "@/lib/products";

export const metadata: Metadata = {
  title: "Resource library",
  description:
    "Everything included in GPLMart all-access: Shopify Liquid snippets and sections, original digital products, ebooks and guides.",
  alternates: { canonical: "/library" },
};

const productCount = getCatalog().items.length;

const ebookCount = getCatalog().items.filter((p) => p.category === "ebook").length;
const packCount = 6;

const sections = [
  {
    icon: Code2,
    title: "Shopify Liquid codes & snippets",
    tag: `${examples.length} components + ${packCount} packs`,
    text: "Original sections, snippets and curated snippet packs - product pages, cart, checkout, trust, marketing and navigation. Preview live, copy clean Liquid, download packs as zips.",
    href: "/playground",
    cta: "Open the playground",
    accent: true,
  },
  {
    icon: GraduationCap,
    title: "Courses",
    tag: "Members",
    text: "Six structured courses - Shopify Basic to Advanced, Liquid snippets, India & international dropshipping and Facebook ads. Full lessons included in all-access.",
    href: "/courses",
    cta: "Browse courses",
    accent: true,
  },
  {
    icon: Download,
    title: "Digital products",
    tag: `${productCount} products`,
    text: "AI skill packs for ecommerce agents, original ebooks, HTML templates and PHP scripts - zipped downloads, all included in all-access.",
    href: "/products",
    cta: "Browse products",
  },
  {
    icon: BookOpen,
    title: "Ebooks",
    tag: `${ebookCount} titles`,
    text: "In-depth ebooks on high-demand ecommerce topics - Shopify launches, Meta ads, product research and AI-powered selling. Downloadable PDFs, members only.",
    href: "/ebooks",
    cta: "Browse ebooks",
    accent: true,
  },
  {
    icon: Sparkles,
    title: "AI prompts",
    tag: "Free",
    text: "Battle-tested prompts for store copy, product descriptions, marketing and support - free for everyone, no account needed.",
    href: "/prompts",
    cta: "Get free prompts",
    accent: true,
  },
] as const;

export default function LibraryPage() {
  return (
    <>
      <PageHeader
        title="Resource library"
        description="Everything included in GPLMart all-access - code you can preview, and products you can download instantly."
        crumbs={[{ label: "Library" }]}
      />
      <Container className="py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/70 p-6 transition hover:-translate-y-1 hover:border-accent/50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="grid size-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <s.icon aria-hidden className="size-5" />
                </span>
                <Badge className={"accent" in s && s.accent ? "border-mint/40 bg-mint/10 text-mint" : "border-line-strong text-subtle"}>
                  {s.tag !== "Free" ? s.tag : "Free"}
                </Badge>
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold group-hover:text-accent">{s.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {s.cta} <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}

          <div className="flex h-full flex-col rounded-2xl border border-accent/40 bg-accent/10 p-6">
            <div className="flex items-center justify-between gap-2">
              <span className="grid size-11 place-items-center rounded-xl border border-accent/40 bg-accent/15 text-accent">
                <FileCode2 aria-hidden className="size-5" />
              </span>
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold">One payment. Everything.</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              All-access unlocks every snippet, section, digital product, ebook and future drop - in your local
              currency, with a 30-day money-back guarantee.
            </p>
            <ButtonLink href="/checkout" className="mt-5 w-full">
              Get all-access
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
