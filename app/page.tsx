import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  FileCode2,
  FolderDown,
  Handshake,
  KeyRound,
  Layers,
  LayoutTemplate,
  LockKeyhole,
  Package,
  Puzzle,
  Rocket,
  ShieldAlert,
  ShoppingBag,
  Store,
  X,
  Zap,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { CodeBlock } from "@/components/ui/code-block";
import { FaqList, type FAQ } from "@/components/ui/faq";
import { HomeSandbox } from "@/components/home/sandbox";
import { getExample } from "@/lib/playground/examples";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: { absolute: "GPLMart - Shopify Liquid code & storefront components" },
  description:
    "Reusable Shopify Liquid snippets and theme sections you can read, preview and paste into your store - plus Shopify themes, WordPress landing pages and plugins in one bundle. One-time payment.",
  alternates: { canonical: "/" },
};

const stats = [
  { k: "Liquid + bundles", v: "Code library plus theme & page packs" },
  { k: "₹0/mo", v: "One-time payment, no monthly fee" },
  { k: "Live sandbox", v: "Preview every component before you install" },
  { k: "Your account", v: "Access stays with you - come back any time" },
];

const chips = [
  "Headers & navigation",
  "Product page",
  "Collections",
  "Cart & checkout",
  "Promotions & banners",
  "Trust & store info",
  "Utility components",
];

const resources = [
  {
    icon: Code2,
    tag: "Member library",
    title: "Shopify Liquid code",
    text: "Sections and snippets for the product page, cart, collections and promotions - full source, previews, copy and downloads for members.",
    accent: true,
  },
  {
    icon: ShoppingBag,
    tag: "Bundle download",
    title: "Shopify themes",
    text: "Theme bundles delivered through the members-only page via a secure Google Drive link, where distribution is authorised.",
  },
  {
    icon: LayoutTemplate,
    tag: "Bundle download",
    title: "WordPress & landing pages",
    text: "WordPress themes and ready-made landing-page templates, delivered alongside the theme bundle through the same members page.",
  },
  {
    icon: Puzzle,
    tag: "Later, as originals",
    title: "Plugins & tools",
    text: "GPLMart's own plugins and utilities are planned next. Nothing is bundled today - and none is promised until it exists.",
  },
];

const personas = [
  {
    icon: Store,
    title: "Merchants",
    text: "Paste sections into the theme editor and change the settings yourself - no developer needed for everyday storefront upgrades.",
  },
  {
    icon: Code2,
    title: "Developers",
    text: "Readable, dependency-free Liquid and vanilla JS you can drop into any Online Store 2.0 theme and adapt to the brand.",
  },
  {
    icon: Rocket,
    title: "Agencies",
    text: "A starting point for client storefronts: preview components in the sandbox, then install the files where the theme needs them.",
  },
];

const touchpoints = [
  { icon: Layers, title: "Headers & navigation", text: "Announcement bars and nav patterns" },
  { icon: Zap, title: "Hero sections", text: "First-screen layouts and banners" },
  { icon: ShoppingBag, title: "Product pages", text: "Price, rating, delivery and buy elements" },
  { icon: Package, title: "Collections", text: "Grids, tabs and listing patterns" },
  { icon: LockKeyhole, title: "Cart & checkout", text: "Sticky bars and cart helpers" },
  { icon: ShieldAlert, title: "Trust & social proof", text: "Badges, ratings and guarantees" },
  { icon: LayoutTemplate, title: "Marketing", text: "Countdowns, coupons and popups" },
  { icon: Puzzle, title: "Utility", text: "Miscellaneous theme components" },
];

const faqs: FAQ[] = [
  {
    question: "Do I need coding experience?",
    answer:
      "No. Open the Shopify theme editor, add a Custom Liquid block (or a theme section), paste the code and save. If you can copy-paste text, you can install most components in under a minute.",
  },
  {
    question: "What exactly do members get?",
    answer:
      "Access to the members-only Liquid code library (full source, previews, copy and downloads) plus the Google Drive link to authorised Shopify theme bundles and WordPress landing-page packs - all through your account.",
  },
  {
    question: "Is this a subscription?",
    answer: "No. It is a single one-time payment for all-access membership. It does not renew and there is no monthly fee.",
  },
  {
    question: "Which themes do the snippets work with?",
    answer:
      "They are written as ordinary Liquid, CSS and vanilla JS and target Online Store 2.0 themes such as Dawn and its siblings. Compatibility notes ship with each resource; every theme is a little different.",
  },
  {
    question: "When does paid access open?",
    answer:
      "Purchases stay closed until resources are actually published and distribution rights are confirmed. If checkout is closed, that is deliberate - nothing is charged in the meantime.",
  },
  {
    question: "Is GPLMart affiliated with Shopify?",
    answer:
      "No. GPLMart is independent and is not affiliated with or endorsed by Shopify. Shopify and Liquid are the property of their respective owners.",
  },
];

function ThemeLiquidPanel() {
  const ex = getExample("announcement-bar");
  const liquid = ex.files(ex.defaults).liquid;
  const head = liquid.split("\n").slice(0, 16).join("\n");
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-card">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span aria-hidden className="size-2.5 rounded-full bg-[#febc2e]" />
          <span aria-hidden className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="font-mono text-[0.7rem] text-subtle">theme.liquid</p>
        <Badge className="text-[0.65rem]">100% native</Badge>
      </div>
      <CodeBlock code={head} lang="liquid" lineNumbers maxHeight="none" className="text-[0.75rem]" />
      <div className="border-t border-line px-4 py-2.5 text-xs text-subtle">
        Excerpt from the free playground.{" "}
        <a href="/playground" className="font-medium text-accent hover:underline">
          Open it live &rarr;
        </a>
      </div>
    </div>
  );
}

export default function HomePage() {
  const price = formatOfferPrice();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div aria-hidden className="absolute -top-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
        <Container className="relative py-16 text-center sm:py-20 lg:py-24">
          <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
            <Zap aria-hidden className="size-3.5" />
            Shopify Liquid code &amp; storefront resources
          </p>
          <h1 className="animate-rise mx-auto mt-7 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            The Complete
            <br />
            <span className="text-gradient">Shopify Liquid</span>
            <br />
            Library
          </h1>
          <p className="animate-rise mx-auto mt-6 max-w-2xl text-lg text-pretty text-muted">
            Premium Liquid sections &amp; snippets, Shopify theme bundles, WordPress landing pages and plugins -
            everything to build a high-converting storefront, in one place, for one payment.
          </p>

          {/* Floating cards + theme.liquid mockup */}
          <div className="relative mx-auto mt-12 max-w-3xl">
            <div aria-hidden className="absolute -left-2 top-6 z-10 hidden w-44 -rotate-3 rounded-2xl border border-line-strong bg-ink-900 p-4 text-left shadow-card md:block lg:-left-16">
              <FileCode2 className="size-5 text-accent" />
              <p className="mt-2 font-display text-lg font-semibold">Liquid library</p>
              <p className="text-xs text-subtle">Sections &amp; snippets</p>
            </div>
            <div aria-hidden className="absolute -right-2 bottom-8 z-10 hidden w-44 rotate-3 rounded-2xl border border-line-strong bg-ink-900 p-4 text-left shadow-card md:block lg:-right-16">
              <Zap className="size-5 text-mint" />
              <p className="mt-2 font-display text-lg font-semibold">Zero dependencies</p>
              <p className="text-xs text-subtle">Pure Liquid &amp; vanilla JS</p>
            </div>
            <div className="animate-rise">
              <ThemeLiquidPanel />
            </div>
          </div>

          <div className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/checkout" size="lg">
              Get all-access &mdash; {price} <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/playground" variant="secondary" size="lg">
              Try the free playground
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-subtle">
            Free sandbox, no account needed &middot; one-time payment &middot; no app to install
          </p>
        </Container>
      </section>

      {/* Stats strip */}
      <section className="border-b border-line bg-ink-900/40">
        <Container className="grid gap-px overflow-hidden rounded-none py-0 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.k} className="border-b border-line px-2 py-7 text-center sm:border-b-0 sm:border-l sm:first:border-l-0">
              <p className="font-display text-xl font-semibold text-accent">{s.k}</p>
              <p className="mt-1 text-sm text-muted">{s.v}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Apps vs library */}
      <Section>
        <SectionHeading
          eyebrow="Stop stacking apps"
          title="Why stores are ditching heavy apps"
          description="Everything you need in one code library - no bulky widgets, no recurring fees, no external calls slowing the storefront."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-red-400/25 bg-red-400/[0.04] p-7">
            <h3 className="font-display text-lg font-semibold">A pile of separate apps</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-muted">
              {[
                "Recurring monthly fees for every small feature",
                "Generic widget designs that fight your brand",
                "External scripts weighing down page speed",
                "A developer needed for every small change",
                "Five tools for what should be one",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <X aria-hidden className="mt-0.5 size-4 shrink-0 text-red-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-accent/35 bg-accent/[0.05] p-7">
            <h3 className="font-display text-lg font-semibold">The GPLMart approach</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-muted">
              {[
                `One-time ${price} - full access, zero recurring charges`,
                "Liquid code library plus theme & WordPress bundles",
                "Native components - they run on Shopify's own servers",
                "Readable source you customise in the theme editor",
                "A live sandbox to preview before you paste anything",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Storefront areas">
          {chips.map((c) => (
            <Link
              key={c}
              href="/library"
              className="rounded-full border border-line-strong bg-white/[0.03] px-4 py-2 text-sm text-muted transition hover:border-accent/50 hover:text-fg"
            >
              {c}
            </Link>
          ))}
        </div>
      </Section>

      {/* Inline sandbox */}
      <section id="sandbox" className="border-y border-line bg-ink-900/40">
        <Section>
          <SectionHeading
            eyebrow="Live previews - click to test drive"
            title="Interactive component sandbox"
            description="Pick a component to see the actual storefront output, inspect the Liquid and CSS, and copy it in one click."
          />
          <HomeSandbox />
        </Section>
      </section>

      {/* Resource stack */}
      <Section id="included">
        <SectionHeading
          eyebrow="More than just Liquid"
          title="One library, the whole storefront stack"
          description="Liquid is the core. Themes, WordPress pages and GPLMart's own tools ship alongside it - honestly labelled by how each is delivered."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map(({ icon: Icon, tag, title, text, accent }) => (
            <li
              key={title}
              className={accent ? "rounded-2xl border border-accent/40 bg-accent/[0.06] p-5" : "rounded-2xl border border-line bg-ink-900/60 p-5"}
            >
              <div className="flex items-center justify-between">
                <Icon aria-hidden className={accent ? "size-5 text-accent" : "size-5 text-mint"} />
                <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.65rem] font-medium text-subtle">{tag}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
        <div role="note" className="mt-8 flex gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm text-amber-100">
          <ShieldAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>
            Bundle contents ship only where distribution is authorised. The public library page always shows the
            real, current inventory - never a promised count.
          </p>
        </div>
      </Section>

      {/* How to use strip */}
      <section className="border-y border-line bg-ink-900/40">
        <Container className="py-10">
          <ol className="grid gap-4 text-center sm:grid-cols-4">
            {["Open the theme editor", "Add a Custom Liquid block", "Paste the code", "Tune settings & save"].map(
              (s, i) => (
                <li key={s} className="flex flex-col items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium">{s}</p>
                </li>
              ),
            )}
          </ol>
        </Container>
      </section>

      {/* Personas (honest alternative to testimonials) */}
      <Section>
        <SectionHeading
          eyebrow="Who it is for"
          title="Built for merchants, developers & agencies"
          description="The same library, used three different ways."
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {personas.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-ink-900/60 p-6">
              <Icon aria-hidden className="size-6 text-accent" />
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Touchpoints */}
      <Section className="pt-0 sm:pt-0">
        <SectionHeading
          eyebrow="Every touchpoint"
          title="Components for every part of the storefront"
          description="The library is organised by where each component lives in a theme."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {touchpoints.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-line-strong">
              <Icon aria-hidden className="size-5 text-mint" />
              <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Pricing card */}
      <section id="membership" className="border-y border-line bg-ink-900/40">
        <Section>
          <SectionHeading
            eyebrow="One-time payment - full access"
            title="GPLMart All-Access"
            description="The Liquid library, template bundles and the sandbox - one payment, no renewal."
          />
          <div className="mx-auto max-w-xl rounded-3xl border border-accent/35 bg-gradient-to-b from-ink-800 to-ink-900 p-8 text-center shadow-card sm:p-10">
            <p className="text-sm font-medium text-mint">All-access membership</p>
            <p className="mt-3 font-display text-7xl font-semibold">{price}</p>
            <p className="mt-2 text-sm text-muted">One-time payment in INR. Not a subscription.</p>
            <ul className="mx-auto mt-7 max-w-sm space-y-3 text-left text-sm text-muted">
              {[
                "Members-only Liquid code library: source, previews, copy & downloads",
                "Shopify theme & WordPress page bundles via secure Drive link",
                "Live sandbox to test components before installing",
                "Account-based access - sign in any time, on any device",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
            <ButtonLink href="/checkout" size="lg" className="mt-8 w-full">
              Get all-access &mdash; {price} <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-subtle">
              <LockKeyhole aria-hidden className="size-3.5 text-accent" />
              Secure checkout via Razorpay &middot; card details never touch this site
            </p>
            <div role="note" className="mt-5 flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3.5 text-left text-xs text-amber-100">
              <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
              <p>
                Purchases open only once resources are published and distribution rights are recorded. If checkout is
                closed, that is deliberate - nothing is charged in the meantime.
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* FAQ */}
      <Section id="faq">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <FaqList items={faqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-line">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div aria-hidden className="absolute -bottom-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <Container className="relative py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Start building a faster, more custom storefront
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Try the free sandbox first - then unlock the library and bundles with one payment.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/checkout" size="lg">
              Get all-access &mdash; {price} <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/playground" variant="secondary" size="lg">
              Open the playground
            </ButtonLink>
          </div>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-subtle">
            <span className="inline-flex items-center gap-1.5">
              <KeyRound aria-hidden className="size-3.5 text-accent" /> One-time payment
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FolderDown aria-hidden className="size-3.5 text-accent" /> Bundles via secure link
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Handshake aria-hidden className="size-3.5 text-accent" /> Rights-checked releases
            </span>
          </p>
        </Container>
      </section>
    </>
  );
}
