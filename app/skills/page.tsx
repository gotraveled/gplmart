import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clapperboard, Copy, Image as ImageIcon, Megaphone, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getCatalog } from "@/lib/products";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: "AI Skill Packs - Ecommerce Tools for AI Agents | GPLMart",
  description:
    "17 ready-to-use AI agent skills for ecommerce: product videos, photoshoots, ad creative, listing copy, SEO audits, pricing, reviews, bundles and more. Works with Claude Code and skill-compatible agents.",
  alternates: { canonical: "/skills" },
};

const groups = [
  {
    key: "video",
    title: "Video & Visual",
    icon: Clapperboard,
    blurb: "Turn product photos into professional videos and shoots - powered by Higgsfield/fal.ai generation.",
    match: ["video", "photoshoot"],
  },
  {
    key: "copy",
    title: "Copy & Content",
    icon: Copy,
    blurb: "Listings, ads, emails, WhatsApp, social posts and influencer outreach - ready-to-paste copy systems.",
    match: ["copy", "creative", "outreach", "calendar", "sequence"],
  },
  {
    key: "growth",
    title: "Growth & Marketing",
    icon: Megaphone,
    blurb: "Ads, SEO, pricing, bundles and competitor research - the strategies that drive sales.",
    match: ["ads", "seo", "pricing", "bundle", "competitor"],
  },
  {
    key: "ops",
    title: "Operations & Retention",
    icon: ShoppingBag,
    blurb: "Returns, reviews and customer retention systems that protect margin and build loyalty.",
    match: ["returns", "review"],
  },
] as const;

export default function SkillsPage() {
  const skills = getCatalog().items.filter((p) => p.category === "skill-pack");
  const ebooks = getCatalog().items.filter((p) => p.category === "ebook");

  return (
    <>
      <PageHeader
        title="AI Skill Packs"
        description={`${skills.length} ready-to-use skills for AI agents (Claude Code, Devin, Cursor) - each one a complete playbook with instructions, templates and checklists for a specific ecommerce job.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Skills" }]}
      />
      <Container className="py-10">
        <div className="mb-8 rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4 text-sm">
          <span className="font-semibold text-fg">How skills work:</span>{" "}
          <span className="text-muted">
            Download the zip, unzip it, and upload the skill folder to your AI agent (Claude Code Desktop, CLI, or any skill-compatible agent). Each pack includes a <code className="rounded bg-ink-800 px-1.5 py-0.5 text-xs">USAGE.md</code> step-by-step guide. Video/image skills need a Higgsfield or fal.ai account; text skills need nothing extra.
          </span>
        </div>

        <div className="space-y-12">
          {groups.map((g) => {
            const items = skills.filter((s) => g.match.some((m) => s.slug.includes(m)));
            if (items.length === 0) return null;
            const Icon = g.icon;
            return (
              <section key={g.key}>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-ink-900">
                    <Icon aria-hidden className="size-5 text-accent" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{g.title}</h2>
                    <p className="text-sm text-muted">{g.blurb}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/products/${s.slug}`}
                      className="group rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Badge>Skill pack</Badge>
                        <span className="font-mono text-xs text-subtle">v{s.version}</span>
                      </div>
                      <h3 className="mt-3 font-display text-base font-semibold group-hover:text-accent">{s.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted">{s.description}</p>
                      <p className="mt-3 flex items-center gap-1 text-xs text-accent">
                        View skill <ArrowRight aria-hidden className="size-3" />
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {ebooks.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-line bg-ink-900">
                <ImageIcon aria-hidden className="size-5 text-accent" />
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold">Ebooks</h2>
                <p className="text-sm text-muted">Deep-dive guides that pair with the skills - download as Markdown.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ebooks.map((e) => (
                <Link
                  key={e.slug}
                  href={`/products/${e.slug}`}
                  className="group rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
                >
                  <Badge>Ebook</Badge>
                  <h3 className="mt-3 font-display text-base font-semibold group-hover:text-accent">{e.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{e.description}</p>
                  <p className="mt-3 flex items-center gap-1 text-xs text-accent">
                    View ebook <ArrowRight aria-hidden className="size-3" />
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-2xl border border-line-strong bg-ink-900 p-6 text-center">
          <h2 className="font-display text-lg font-semibold">All skills + ebooks + code library + courses</h2>
          <p className="mt-2 text-sm text-muted">One membership unlocks everything - no per-item fees.</p>
          <ButtonLink href="/checkout" className="mt-4">
            Get all-access - {formatOfferPrice()}
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
