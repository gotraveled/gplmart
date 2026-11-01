import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  Code2,
  FileCode2,
  FlaskConical,
  FolderDown,
  KeyRound,
  LayoutTemplate,
  LockKeyhole,
  LogIn,
  Puzzle,
  ShieldAlert,
  ShoppingBag,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { CodeBlock } from "@/components/ui/code-block";
import { FaqList, type FAQ } from "@/components/ui/faq";
import { ExamplePreview } from "@/components/playground/previews";
import { getExample } from "@/lib/playground/examples";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: { absolute: "GPLMart - Shopify Liquid code & storefront components" },
  description:
    "Reusable Shopify Liquid snippets and theme sections you can read, preview and paste into your store. One-time payment unlocks the member library and template bundles.",
  alternates: { canonical: "/" },
};

const steps = [
  {
    icon: FileCode2,
    title: "Find the component you need",
    text: "Browse the library by storefront area: announcements, product page, cart, trust panels, promotions. Each entry shows what it does and where it goes in a theme.",
  },
  {
    icon: Code2,
    title: "Read the code and preview the output",
    text: "Every resource shows the actual Liquid, its companion CSS or JS, and a preview of the storefront result, so you know what you are getting before you use it.",
  },
  {
    icon: BookOpenCheck,
    title: "Paste it into your theme",
    text: "Copy the file into your theme's sections or snippets folder, follow the short install notes, and adjust the settings in the theme editor. No app to install.",
  },
];

const categories = [
  {
    icon: Code2,
    title: "Shopify Liquid code",
    text: "Snippets and sections: product-page components, collection grids, cart helpers, headers, announcements and trust panels. The core of the member library.",
    primary: true,
  },
  {
    icon: ShoppingBag,
    title: "Shopify themes & templates",
    text: "Theme and template bundles delivered through the members-only download page, where authorised.",
  },
  {
    icon: LayoutTemplate,
    title: "WordPress & landing pages",
    text: "A secondary shelf: authorised WordPress themes and plugins, and landing-page templates.",
  },
  {
    icon: Puzzle,
    title: "Plugins (roadmap)",
    text: "Original plugins may be added later. None are included yet and none are promised.",
  },
];

const freeVsMember = [
  {
    label: "Free - no account",
    items: [
      "Interactive playground with original teaching examples",
      "Library browsing: titles, descriptions and previews",
      "Inspect how real sections and snippets are structured",
    ],
  },
  {
    label: `Members - ${formatOfferPrice()} once`,
    items: [
      "Full code source, copy and downloads for published resources",
      "Google Drive link to authorised theme & template bundles",
      "Access tied to your account; come back any time",
    ],
  },
];

const faqs: FAQ[] = [
  {
    question: "Is the playground really free?",
    answer:
      "Yes. The playground contains GPLMart's own educational examples. You can read, preview and copy them without an account. They are labelled as examples and are separate from the paid library.",
  },
  {
    question: "What exactly do members get?",
    answer:
      "Two things: access to the members-only Liquid code library (full source, previews, copy and downloads) and the Google Drive link to authorised template bundles. One payment, no renewal.",
  },
  {
    question: "Is this a subscription?",
    answer: "No. It is a single one-time payment for all-access membership. It does not renew.",
  },
  {
    question: "When does paid access open?",
    answer:
      "Purchases stay closed until the resources are actually published and distribution rights are confirmed. The checkout page states this plainly; nothing is charged before then.",
  },
  {
    question: "Can I redistribute or resell the resources?",
    answer:
      "Do not assume so. Licence terms are published on the licensing page and may differ between resources. That page is a draft pending business review.",
  },
  {
    question: "What about refunds, updates and support?",
    answer:
      "No refund, update or support commitments have been finalised. They will be set out in the policies once reviewed, and are not promised here.",
  },
  {
    question: "Is GPLMart affiliated with Shopify?",
    answer:
      "No. GPLMart is independent and is not affiliated with or endorsed by Shopify. Shopify and Liquid are the property of their respective owners.",
  },
];

function StorefrontMockup() {
  const products = [
    { name: "Utility overshirt", price: "$89", bg: "#d9e4c3" },
    { name: "Everyday tote", price: "$54", bg: "#e9d8c4" },
    { name: "Wool scarf", price: "$42", bg: "#cfe0e3" },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-white shadow-card">
      <div className="flex items-center gap-2 border-b border-line bg-ink-800 px-4 py-2.5">
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span aria-hidden className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-2 truncate rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[0.65rem] text-subtle">
          your-store.myshopify.com
        </span>
      </div>
      <ExamplePreview id="announcement-bar" values={getExample("announcement-bar").defaults} />
      <div className="flex items-center justify-between px-5 py-3 text-neutral-900">
        <p className="text-[0.65rem] font-bold tracking-[0.22em]">NOVEL SUPPLY</p>
        <nav aria-hidden className="flex gap-4 text-[0.65rem] text-neutral-500">
          <span>Shop</span>
          <span>Collections</span>
          <span>Journal</span>
        </nav>
      </div>
      <div className="mx-5 rounded-lg bg-[#e9e4d8] px-5 py-7 text-neutral-900">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">New collection</p>
        <p className="mt-1 text-lg font-semibold leading-snug">Autumn layers, made simply</p>
        <span className="mt-3 inline-block rounded-full bg-neutral-900 px-4 py-1.5 text-[0.65rem] font-medium text-white">
          Shop now
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 px-5 pb-5 pt-4">
        {products.map((p) => (
          <div key={p.name}>
            <div className="aspect-[3/4] rounded-md" style={{ background: p.bg }} />
            <p className="mt-2 text-[0.65rem] font-medium text-neutral-800">{p.name}</p>
            <p className="text-[0.6rem] text-neutral-500">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroCodePanel() {
  const ex = getExample("announcement-bar");
  const liquid = ex.files(ex.defaults).liquid;
  const head = liquid.split("\n").slice(0, 14).join("\n");
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-card">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="font-mono text-[0.7rem] text-subtle">sections/announcement-bar.liquid</p>
        <Badge className="text-[0.65rem]">Liquid</Badge>
      </div>
      <CodeBlock code={head} lang="liquid" lineNumbers maxHeight="none" className="text-[0.75rem]" />
      <div className="border-t border-line px-4 py-2.5 text-xs text-subtle">
        Excerpt from the free playground example.{" "}
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
        <div aria-hidden className="absolute -top-40 left-1/4 h-96 w-[40rem] rounded-full bg-accent/20 blur-3xl" />
        <Container className="relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-center lg:py-24">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-3 py-1 text-xs font-medium text-muted">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Shopify Liquid code &amp; storefront components
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Your Shopify store. More custom. <span className="text-gradient">Less code from scratch.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-pretty text-muted">
              GPLMart is a library of reusable Liquid snippets and theme sections &mdash; announcement bars, product
              benefits, delivery panels, promotional banners and more. Read the code, preview the output, paste it
              into your theme and tune the settings.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/checkout" size="lg">
                Get all access &mdash; {price} <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/playground" variant="secondary" size="lg">
                <FlaskConical aria-hidden className="size-4" /> Try the free playground
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-subtle">
              One-time payment &middot; not a subscription &middot; no app to install
            </p>
          </div>

          {/* Code → storefront demo */}
          <div className="relative grid gap-4">
            <StorefrontMockup />
            <HeroCodePanel />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-line bg-ink-900/40">
        <Section>
          <SectionHeading
            eyebrow="How it works"
            title="From library to storefront in three steps"
            description="Every resource is ordinary theme code: a Liquid file plus its companion CSS or JS, with settings you control in the theme editor."
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-2xl border border-line bg-ink-950/60 p-6">
                <div className="flex items-center justify-between">
                  <Icon aria-hidden className="size-6 text-mint" />
                  <span aria-hidden className="font-display text-3xl font-semibold text-white/10">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/playground" variant="secondary">
              See it in the playground <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/library" variant="ghost">
              Browse the library
            </ButtonLink>
          </div>
        </Section>
      </section>

      {/* Playground strip */}
      <Section className="pb-0 sm:pb-0">
        <div className="overflow-hidden rounded-3xl border border-line-strong bg-gradient-to-br from-ink-800 to-ink-900">
          <div className="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mint">Free, no account needed</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance">
                The playground: read the Liquid, see the storefront
              </h2>
              <p className="mt-4 text-pretty text-muted">
                Working examples &mdash; sections and snippets &mdash; with syntax-highlighted code, live storefront
                previews and adjustable settings. Copy the files and adapt them for your own theme.
              </p>
              <ButtonLink href="/playground" className="mt-7">
                Open the playground <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {["Announcement bar", "Product benefit list", "Delivery checker", "Coupon cards", "Promo banner", "FAQ accordion", "Trust grid", "Size chart modal"].map(
                (name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-ink-950/50 px-4 py-3 text-sm"
                  >
                    <FileCode2 aria-hidden className="size-4 shrink-0 text-accent" />
                    {name}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </Section>

      {/* Resource areas */}
      <Section id="included">
        <SectionHeading
          eyebrow="What the library covers"
          title="Built for Shopify first"
          description="Specific files depend on what has been released to members. The catalogue page always reflects the real, current inventory."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, text, primary }) => (
            <li
              key={title}
              className={
                primary
                  ? "rounded-2xl border border-accent/40 bg-accent/[0.06] p-5"
                  : "rounded-2xl border border-line bg-ink-900/60 p-5"
              }
            >
              <Icon aria-hidden className={primary ? "size-5 text-accent" : "size-5 text-mint"} />
              <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Membership */}
      <section id="membership" className="border-y border-line bg-ink-900/40">
        <Section>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Membership"
                title={`One payment of ${price}. Everything members get.`}
                description="GPLMart sells a single all-access membership. No tiers, no renewals, no per-item checkout."
              />
              <ul className="grid gap-4">
                {[
                  {
                    icon: Code2,
                    title: "Liquid code library",
                    text: "Full source for every published resource: inspect, preview, copy or download. Search and filter by storefront area.",
                  },
                  {
                    icon: FolderDown,
                    title: "Template bundle downloads",
                    text: "A members-only page with the Google Drive link to authorised theme and template bundles, plus download instructions.",
                  },
                  {
                    icon: KeyRound,
                    title: "Access tied to your account",
                    text: "Sign in any time to return to both resource areas. You never pay twice for the same access.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-4 rounded-2xl border border-line bg-ink-950/60 p-5">
                    <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-mint" />
                    <div>
                      <h3 className="font-display text-base font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-muted">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-line-strong bg-gradient-to-b from-ink-800 to-ink-900 p-8 shadow-card lg:sticky lg:top-24">
              <p className="text-sm font-medium text-mint">GPLMart All-Access</p>
              <p className="mt-3 font-display text-6xl font-semibold">{price}</p>
              <p className="mt-2 text-sm text-muted">One-time payment in INR. No renewal.</p>
              <ul className="mt-6 space-y-2.5 text-sm text-muted">
                <li className="flex gap-2.5">
                  <LockKeyhole aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  Server-verified Razorpay payment; card details never touch this site
                </li>
                <li className="flex gap-2.5">
                  <LogIn aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  Account-based access to code, downloads and the Drive link
                </li>
              </ul>
              <ButtonLink href="/checkout" size="lg" className="mt-8 w-full">
                Get all access
              </ButtonLink>
              <div role="note" className="mt-5 flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3.5 text-xs text-amber-100">
                <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
                <p>
                  Purchases open only once resources are published and distribution rights are recorded. If checkout
                  is closed, that is deliberate &mdash; nothing is charged in the meantime.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Free vs members */}
      <Section>
        <SectionHeading
          eyebrow="Free vs members"
          title="What is open, and what membership adds"
          description="The playground and library browsing are free. Membership unlocks source files, downloads and the template bundles."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {freeVsMember.map((col, i) => (
            <div
              key={col.label}
              className={
                i === 1
                  ? "rounded-2xl border border-accent/40 bg-accent/[0.05] p-6"
                  : "rounded-2xl border border-line bg-ink-900/60 p-6"
              }
            >
              <h3 className="font-display text-lg font-semibold">{col.label}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mint" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="pt-0 sm:pt-0">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Straight answers" />
          <FaqList items={faqs} />
        </div>
      </Section>
    </>
  );
}
