import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clapperboard, Copy, Megaphone, ShoppingBag } from "lucide-react";
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

  return (
    <>
      <PageHeader
        title="AI Skill Packs"
        description={`${skills.length} ready-to-use skills for AI agents (Claude Code, Devin, Cursor) - each one a complete playbook with instructions, templates and checklists for a specific ecommerce job.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Skills" }]}
      />
      <Container className="py-10">
        <div className="mb-8 rounded-2xl border border-accent/30 bg-accent/5 p-6">
          <h2 className="font-display text-lg font-semibold">How to use AI skills - step by step</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", t: "Download the zip", d: "Open any skill page and click Download zip - it's included in all-access." },
              { n: "2", t: "Unzip the folder", d: "Inside is a skill folder containing SKILL.md (instructions) and USAGE.md (guide)." },
              { n: "3", t: "Upload to your agent", d: "Drop the folder into Claude Code, Devin, Cursor or any skill-compatible agent." },
              { n: "4", t: "Follow USAGE.md", d: "Each skill walks you through prompts, inputs and expected outputs." },
            ].map((s) => (
              <li key={s.n} className="flex gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent">{s.n}</span>
                <div>
                  <p className="text-sm font-semibold">{s.t}</p>
                  <p className="mt-0.5 text-xs text-muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-lg border border-line bg-ink-950/60 px-4 py-3 text-xs text-muted">
            <span className="font-semibold text-fg">Requirements:</span> text skills (copy, SEO, pricing, reviews) need only your AI agent. Video &amp; image skills additionally need a free <a href="https://higgsfield.ai" target="_blank" rel="noopener noreferrer" className="text-accent underline">Higgsfield</a> or <a href="https://fal.ai" target="_blank" rel="noopener noreferrer" className="text-accent underline">fal.ai</a> account for generation.
          </p>
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

        <div className="mt-12 rounded-2xl border border-line-strong bg-ink-900 p-6 text-center">
          <h2 className="font-display text-lg font-semibold">All skills + code library + courses + ebooks</h2>
          <p className="mt-2 text-sm text-muted">One membership unlocks everything - no per-item fees.</p>
          <ButtonLink href="/checkout" className="mt-4">
            Get all-access - {formatOfferPrice()}
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
