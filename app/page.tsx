import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  FileCode2,
  FolderDown,
  Handshake,
  Layers,
  LayoutTemplate,
  LockKeyhole,
  Package,
  Puzzle,
  ShieldAlert,
  ShoppingBag,
  Star,
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

const numbers = [
  { k: "300+", v: "Components in the pipeline" },
  { k: "21", v: "Free examples live in the sandbox" },
  { k: "4", v: "Resource areas under one access" },
  { k: "₹0/mo", v: "No monthly fee - ever" },
];

const themes = ["Dawn", "Sense", "Craft", "Refresh", "Spotlight", "Studio", "Crave", "Origin"];

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

// Sample placeholder reviews - replace with genuine customer reviews before launch.
const reviews = [
  {
    quote:
      "The countdown and trust-grid snippets installed in minutes. Everything is clearly commented, so adjusting colours to our brand took no time at all.",
    name: "Priya S.",
    role: "D2C store owner, Mumbai",
  },
  {
    quote:
      "Clean Liquid, no dependencies, and the sandbox preview means I know exactly what I am pasting before it touches the theme.",
    name: "Arjun K.",
    role: "Freelance Shopify developer",
  },
  {
    quote:
      "We use the library as a starting point on client builds. Being able to inspect the source first saves real hours on every project.",
    name: "Meera D.",
    role: "Agency founder, Bengaluru",
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
      "Access to the members-only Liquid code library (full source, previews, copy and downloads) plus the Google Drive link to authorised Shopify theme bundles and WordPress landing-page packs - delivered right after payment.",
  },
  {
    question: "Is this a subscription?",
    answer: "No. It is a single one-time payment for all-access membership. It does not renew and there is no monthly fee.",
  },
  {
    question: "Will the snippets match my theme?",
    answer:
      "They are written for Online Store 2.0 themes such as Dawn and its siblings, using your theme's own font stack and its button/foreground colour variables where sensible - so they blend in instead of looking bolted on. Compatibility notes ship with each resource.",
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

function ThemeLiquidChip() {
  const ex = getExample("announcement-bar");
  const head = ex.files(ex.defaults).liquid.split("\n").slice(0, 7).join("\n");
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-ink-900 shadow-card">
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <p className="font-mono text-[0.62rem] text-subtle">sections/announcement-bar.liquid</p>
        <Badge className="px-1.5 py-0 text-[0.58rem]">Liquid</Badge>
      </div>
      <CodeBlock code={head} lang="liquid" lineNumbers={false} maxHeight="none" className="text-[0.62rem] leading-[1.5]" />
    </div>
  );
}

function StorefrontMockup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-white text-neutral-900 shadow-card">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-ink-800 px-4 py-2.5">
        <span aria-hidden className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-2.5 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.06] px-2.5 py-1 text-center font-mono text-[0.65rem] text-subtle">
          your-store.myshopify.com
        </span>
      </div>
      {/* Announcement bar */}
      <p className="bg-[#c8f542] px-4 py-1.5 text-center text-[0.62rem] font-bold uppercase tracking-[0.14em] text-neutral-900">
        Free shipping on orders over ₹499
      </p>
      {/* Product page */}
      <div className="grid gap-4 p-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:p-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[#dbe7c8] to-[#a8c48a]">
          <span className="absolute left-2 top-2 rounded-full bg-neutral-900 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide text-white">
            Bestseller
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">Aurelia Skin Co.</p>
          <p className="mt-0.5 truncate text-sm font-bold">Vitamin C Serum, 30 ml</p>
          <div className="mt-1 inline-flex items-center gap-1.5">
            <span className="text-[0.72rem] tracking-wider text-amber-500">★★★★★</span>
            <span className="text-[0.68rem] font-semibold">4.9</span>
            <span className="text-[0.68rem] text-neutral-400">(1,480 reviews)</span>
          </div>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <span className="text-xl font-extrabold tracking-tight">₹499</span>
            <s className="text-xs text-neutral-400">₹799</s>
            <span className="rounded-md bg-green-100 px-1.5 py-0.5 text-[0.62rem] font-bold uppercase text-green-700">38% off</span>
            <span className="text-[0.6rem] text-neutral-400">incl. taxes</span>
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-[0.62rem] font-semibold text-red-700">
            <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
            Only 6 left in stock
          </p>
          <div className="mt-2.5 grid grid-cols-[3rem_minmax(0,1fr)] gap-2">
            <span className="grid place-items-center rounded-lg border border-neutral-300 text-xs font-semibold">1</span>
            <span className="grid place-items-center rounded-lg bg-neutral-900 py-2 text-xs font-bold text-white">Add to cart</span>
          </div>
          <span className="mt-2 grid place-items-center rounded-lg bg-[#166534] py-2 text-xs font-bold text-white">
            Buy it now
          </span>
          <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5">
            <Package aria-hidden className="size-3.5 shrink-0 text-neutral-500" />
            <p className="text-[0.62rem] text-neutral-600">
              Order in the next <strong>4 hrs</strong> - delivery by <strong>Thu, 12 Jun</strong>
            </p>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {["Free returns", "Secure pay", "COD available"].map((t) => (
              <span key={t} className="rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-1 text-center text-[0.55rem] font-semibold text-neutral-600">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const price = formatOfferPrice();
  return (
    <>
      {/* Hero - two columns */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div aria-hidden className="absolute -top-44 left-1/2 h-[26rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <Container className="relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:py-24">
          <div className="animate-rise max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <Zap aria-hidden className="size-3.5" />
              Conversion-focused Shopify components
            </p>
            <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              More sales.
              <br />
              <span className="text-gradient">Fewer apps.</span>
              <br />
              One library.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted">
              Not getting the conversions your store deserves? GPLMart gives you conversion-focused Liquid sections
              &amp; snippets - countdowns, trust badges, delivery ETA, buy bars and more - without stacking
              high-cost apps. Plus theme bundles, WordPress landing pages and plugins.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/checkout" size="lg">
                Get all-access &mdash; {price} <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/playground" variant="secondary" size="lg">
                Try the free playground
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <Star aria-hidden className="size-4 fill-amber-400 text-amber-400" />
                21 free components in the sandbox
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="size-1.5 rounded-full bg-accent" /> One-time payment
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden className="size-1.5 rounded-full bg-mint" /> Adapts to any OS 2.0 theme
              </span>
            </div>
          </div>

          {/* Storefront visual - aligned stack with floating chips */}
          <div className="animate-rise relative mx-auto w-full max-w-lg lg:pt-6">
            <div aria-hidden className="absolute -top-5 right-2 z-20 flex items-center gap-2 rounded-xl border border-line-strong bg-ink-900 px-3.5 py-2.5 shadow-card">
              <Zap className="size-4 text-mint" />
              <div>
                <p className="text-xs font-semibold leading-none">Zero dependencies</p>
                <p className="mt-1 text-[0.6rem] leading-none text-subtle">Liquid + vanilla JS</p>
              </div>
            </div>
            <div aria-hidden className="absolute -bottom-5 left-2 z-20 flex items-center gap-2 rounded-xl border border-line-strong bg-ink-900 px-3.5 py-2.5 shadow-card">
              <FileCode2 className="size-4 text-accent" />
              <div>
                <p className="text-xs font-semibold leading-none">300+ in the pipeline</p>
                <p className="mt-1 text-[0.6rem] leading-none text-subtle">Sections &amp; snippets</p>
              </div>
            </div>
            <div aria-hidden className="absolute -right-4 bottom-16 z-20 hidden w-52 rotate-2 lg:block">
              <ThemeLiquidChip />
            </div>
            <StorefrontMockup />
          </div>
        </Container>

        {/* Theme compatibility strip */}
        <div className="border-t border-line/60 bg-ink-900/40">
          <Container className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-subtle">Works with OS 2.0 themes</span>
            {themes.map((t) => (
              <span key={t} className="font-display text-sm font-medium text-muted/80">{t}</span>
            ))}
          </Container>
        </div>
      </section>

      {/* Numbers strip */}
      <section className="border-b border-line bg-ink-900/40">
        <Container className="grid gap-px py-0 sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map((s) => (
            <div key={s.k} className="border-b border-line px-2 py-7 text-center sm:border-b-0 sm:border-l sm:first:border-l-0">
              <p className="font-display text-3xl font-semibold text-accent">{s.k}</p>
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
            description="Conversion components you can try before you buy. Pick one to see the storefront output, inspect the Liquid, and copy it in one click."
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

      {/* Testimonials (sample placeholders - see `reviews` above) */}
      <Section>
        <SectionHeading
          eyebrow="Early feedback"
          title="What store owners are saying"
          description="Built for merchants, developers and agencies alike."
        />
        <ul className="grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <li key={r.name} className="flex flex-col rounded-2xl border border-line bg-ink-900/60 p-6">
              <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} aria-hidden className="size-4 fill-amber-400" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <span aria-hidden className="grid size-9 place-items-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent">
                  {r.name[0]}
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-subtle">{r.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-xs text-subtle">
          Early-access feedback shown for illustration - genuine member reviews will appear here as they arrive.
        </p>
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
                "Conversion-focused components for every storefront touchpoint",
                "Members-only Liquid code library: source, previews, copy & downloads",
                "Shopify theme & WordPress page bundles via secure Drive link",
                "Live sandbox to test components before installing",
                "Instant access after payment - no account or signup needed",
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
              <Store aria-hidden className="size-3.5 text-accent" /> One-time payment
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

      {/* Mobile sticky CTA (like liquidritual's buy bar) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink-950/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div>
            <p className="font-display text-lg font-semibold leading-none">{price}</p>
            <p className="text-[0.65rem] text-subtle">One-time payment</p>
          </div>
          <ButtonLink href="/checkout" className="shrink-0">
            Get all-access <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </div>
      <div aria-hidden className="h-16 md:hidden" />
    </>
  );
}
