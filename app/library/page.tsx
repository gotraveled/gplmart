import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, FileCode2, Layers, LockKeyhole, MessageSquareQuote, Puzzle, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { examples } from "@/lib/playground/examples";

export const metadata: Metadata = {
  title: "Resource library",
  description:
    "Everything included in GPLMart all-access: Shopify Liquid snippets and sections, theme bundles, WordPress themes, plugins and AI prompts.",
  alternates: { canonical: "/library" },
};

const sections = [
  {
    icon: Code2,
    title: "Shopify Liquid code & snippets",
    tag: `${examples.length} components`,
    text: "Original sections and snippets - product pages, cart, checkout, trust, marketing and navigation. Preview live in the playground, copy clean Liquid with install guides, paste into any OS 2.0 theme.",
    href: "/playground",
    cta: "Open the playground",
    accent: true,
  },
  {
    icon: ShoppingBag,
    title: "Shopify themes",
    tag: "Members",
    text: "Storefront themes packaged for Shopify stores - picked for speed, mobile layout and conversion structure. Delivered through the members resource hub.",
    href: "/access/templates",
    cta: "Members area",
  },
  {
    icon: Layers,
    title: "WordPress themes",
    tag: "GPL-licensed",
    text: "GPL-licensed WordPress themes with the vendor licence preserved - install on unlimited sites including client projects. Complete files, no keys required.",
    href: "/access/templates",
    cta: "Members area",
  },
  {
    icon: Puzzle,
    title: "Shopify plugins",
    tag: "Members",
    text: "Plugin and extension bundles for storefront functionality - delivered with the same one-time access. No monthly app fees.",
    href: "/access/templates",
    cta: "Members area",
  },
  {
    icon: MessageSquareQuote,
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
        description="Everything included in GPLMart all-access - code you can preview, and bundles delivered through the members area."
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
                  {s.tag !== "Members" && s.tag !== "Free" ? s.tag : s.tag === "Free" ? "Free" : <><LockKeyhole aria-hidden className="size-3" /> Members</>}
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
              All-access unlocks every snippet, section, theme bundle, plugin and future drop - in your local
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
