import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Eye,
  FileCode2,
  FolderDown,
  GraduationCap,
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
import { FaqList } from "@/components/ui/faq";
import { HomeSandbox } from "@/components/home/sandbox";
import { faqs } from "@/lib/faq";
import { examples, freeExampleIds, getExample } from "@/lib/playground/examples";
import { faqJsonLd, jsonLdPayload, productJsonLd } from "@/lib/seo";
import { formatOfferPrice } from "@/lib/offer";
import { GeoPrice } from "@/components/ui/geo-price";

export const metadata: Metadata = {
  title: { absolute: "GPLMart - Shopify Liquid Code, Snippets & Sections" },
  description:
    "200+ Shopify Liquid snippets and sections to preview live, plus original HTML templates, PHP scripts and ebooks. One payment, no subscription.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "GPLMart",
    title: "GPLMart - Shopify Liquid Code, Snippets & Sections",
    description:
      "200+ reusable Shopify Liquid snippets and theme sections - live preview, install guides, copy-paste code. One payment, no subscription.",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "GPLMart - Shopify Liquid code library" }],
  },
};

const numbers = [
  { k: String(examples.length), v: "Components in the sandbox" },
  { k: String(freeExampleIds.size), v: "Free examples live in the sandbox" },
  { k: "5", v: "Resource areas under one access" },
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
    tag: "Member downloads",
    title: "Digital products",
    text: "Original HTML landing-page templates and self-contained PHP scripts - GPL-licensed code, zipped and ready to deploy.",
  },
  {
    icon: GraduationCap,
    tag: "Structured courses",
    title: "Courses",
    text: "Shopify Basic to Advanced, Liquid Snippets, India & international dropshipping, Facebook ads - step-by-step lessons with visuals.",
  },
  {
    icon: FileCode2,
    tag: "Weekly releases",
    title: "Ebooks & guides",
    text: "Practical ebooks and step-by-step guides on Liquid, conversion and digital products - new titles every week.",
  },
  {
    icon: Puzzle,
    tag: "Always growing",
    title: "New every week",
    text: "Fresh snippets, products and guides ship weekly - your membership keeps growing after you join.",
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
  const jsonLd = jsonLdPayload(productJsonLd(), faqJsonLd(faqs));
  const popular = ["variant-swatches", "countdown-timer", "sticky-buy-bar", "trust-grid", "faq-accordion", "quick-view"]
    .map((id) => examples.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      {/* Hero - two columns */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div aria-hidden className="absolute -top-44 left-1/2 h-[26rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-10 sm:py-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,30rem)] lg:py-14">
          <div className="animate-rise max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold text-accent">
              <Zap aria-hidden className="size-3.5" />
              Liquid code, courses + digital products
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Shopify Liquid Codes,
              <br />
              <span className="text-gradient">Digital Products</span>
              <br />
              Courses &amp; Ebooks in One Payment
            </h1>
            <p className="mt-6 max-w-xl font-display text-lg text-pretty text-muted">
              Not getting the conversions your store deserves? GPLMart gives you conversion-focused Liquid sections
              &amp; snippets - countdowns, trust badges, delivery ETA, buy bars and more - without stacking
              high-cost apps. Plus step-by-step courses from store setup to dropshipping, original HTML templates,
              PHP scripts and practical ebooks - all in one payment.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/checkout" size="lg">
                Get all-access &mdash; <GeoPrice fallback={price} /> <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/playground" variant="secondary" size="lg">
                Try the free playground
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <Star aria-hidden className="size-4 fill-amber-400 text-amber-400" />
                200+ components in the sandbox
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
                <p className="text-xs font-semibold leading-none">200 components</p>
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
                `One payment - full access, zero recurring charges`,
                "Liquid code library plus original digital products & ebooks",
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
          description="Liquid is the core. Original digital products, ebooks and guides ship alongside it - every item labelled by exactly what you get."
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

      {/* Feature grid */}
      <Section className="pt-0 sm:pt-0">
        <SectionHeading
          eyebrow="What members get"
          title="Built to be used, not just browsed"
          description="Every piece of the library is designed to go from 'that looks useful' to 'live on my store' in minutes."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Eye,
              title: "Live preview before you install",
              text: "Every component renders in a live sandbox first - see exactly what customers will see before touching your theme.",
            },
            {
              icon: Code2,
              title: "Readable, commented source",
              text: "Full Liquid, CSS and JS with install notes - written to be understood and customised, not minified into a black box.",
            },
            {
              icon: Layers,
              title: "Theme-agnostic by design",
              text: "Built for OS 2.0 themes with CSS-variable fallbacks - works on Dawn, Dawn-based and custom themes without fighting your styles.",
            },
            {
              icon: FolderDown,
              title: "Products alongside the code",
              text: "HTML templates, PHP scripts and ebooks ship in the same membership - one payment, one library, instant zip downloads.",
            },
            {
              icon: Zap,
              title: "No app tax",
              text: "Snippets run on Shopify's own servers - no external scripts, no recurring fees, no slowing your storefront down.",
            },
            {
              icon: Handshake,
              title: "Honest licensing, always",
              text: "Nothing ships until redistribution rights are confirmed. If it's not cleared, it's not published - that is the whole point.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/40">
              <Icon aria-hidden className="size-5 text-accent" />
              <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* App-replacement comparison */}
      <Section className="pt-0 sm:pt-0">
        <SectionHeading
          eyebrow="Do the math"
          title="One membership replaces a stack of paid apps"
          description="These are full sections in the library - paste one file, skip the monthly bill. Typical app pricing shown for comparison."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { feature: "Slide-out cart drawer", detail: "Free-shipping bar, qty controls, upsell slot, opens on add-to-cart", apps: "Cart drawer apps", cost: "~$15/mo" },
            { feature: "Wishlist system", detail: "Heart button + full wishlist page, no app or account needed", apps: "Wishlist Plus & similar", cost: "~$20/mo" },
            { feature: "Back-in-stock signup", detail: "Email capture through Shopify's own customer form", apps: "Notify-me apps", cost: "~$10/mo" },
            { feature: "Post-cart upsell", detail: "One-click offer the moment an item hits the cart", apps: "Upsell apps", cost: "~$20/mo" },
            { feature: "Build-a-box bundles", detail: "Pick-N-products bundles with one-click add", apps: "Bundle builders", cost: "~$15/mo" },
            { feature: "Mega menu header", detail: "Dropdown panels, promo cards, mobile drawer, sticky", apps: "Header & menu apps", cost: "~$15 one-time each" },
            { feature: "Gamified popups", detail: "Scratch card and spin-to-win wheels that grow your list", apps: "Gamification apps", cost: "~$39/mo" },
            { feature: "Quick-view + 200 more", detail: "Variant-picker modal grid plus the rest of the library", apps: "Theme feature apps", cost: "priceless" },
          ].map(({ feature, detail, apps, cost }) => (
            <li key={feature} className="flex flex-col rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-mint/40">
              <h3 className="font-display text-sm font-semibold">{feature}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">{detail}</p>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <span className="text-[0.65rem] text-subtle">{apps}</span>
                <span className="rounded-full bg-mint/10 px-2.5 py-1 text-[0.65rem] font-bold text-mint">{cost}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-sm text-muted">
          Typical replacements total <span className="font-semibold text-accent">$100+/mo in subscriptions</span> - membership is a one-time ₹499.
        </p>
      </Section>

      {/* Pricing card */}
      <section id="membership" className="border-y border-line bg-ink-900/40">
        <Section>
          <SectionHeading
            eyebrow="One-time payment - full access"
            title="GPLMart All-Access"
            description="The Liquid library, digital products, ebooks and the sandbox - one payment, no renewal."
          />
          <div className="mx-auto max-w-xl rounded-3xl border border-accent/35 bg-gradient-to-b from-ink-800 to-ink-900 p-8 text-center shadow-card sm:p-10">
            <p className="text-sm font-medium text-mint">All-access membership</p>
            <p className="mt-3 font-display text-7xl font-semibold"><GeoPrice fallback={price} /></p>
            <p className="mt-2 text-sm text-muted">One-time payment in INR. Not a subscription.</p>
            <ul className="mx-auto mt-7 max-w-sm space-y-3 text-left text-sm text-muted">
              {[
                "Conversion-focused components for every storefront touchpoint",
                "Members-only Liquid code library: source, previews, copy & downloads",
                "Digital products & ebooks - new items every week",
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
              Get all-access &mdash; <GeoPrice fallback={price} /> <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-subtle">
              <LockKeyhole aria-hidden className="size-3.5 text-accent" />
              Secure checkout via Razorpay &middot; card details never touch this site
            </p>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-subtle">
              Instant access after payment &middot; delivered to your email and WhatsApp
            </p>
          </div>
        </Section>
      </section>

      {/* Popular snippets - internal links */}
      <Section>
        <SectionHeading eyebrow="Shopify liquid code" title="Popular snippets" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((e) => (
            <Link
              key={e.id}
              href={`/snippets/${e.id}`}
              className="group rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
            >
              <p className="text-xs text-subtle">{e.category}</p>
              <p className="mt-1 font-display text-base font-semibold group-hover:text-accent">{e.name}</p>
              <p className="mt-1.5 line-clamp-2 text-sm text-muted">{e.description}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                View snippet <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <ButtonLink href="/playground" variant="secondary">
            Browse all {examples.length} in the playground <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </Section>

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
            Try the free sandbox first - then unlock the library and products with one payment.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/checkout" size="lg">
              Get all-access &mdash; <GeoPrice fallback={price} /> <ArrowRight aria-hidden className="size-4" />
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
              <FolderDown aria-hidden className="size-3.5 text-accent" /> Instant zip downloads
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
            <p className="font-display text-lg font-semibold leading-none"><GeoPrice fallback={price} /></p>
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
