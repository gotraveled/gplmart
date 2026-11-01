import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, Code2, FolderDown, KeyRound, LayoutTemplate, LogIn, Puzzle, ShieldAlert, ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { FaqList, type FAQ } from "@/components/ui/faq";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: { absolute: "GPLMart - One-time all-access for Shopify resources" },
  description:
    "One payment for access to a Google Drive template bundle library and a searchable Shopify Liquid code library.",
  alternates: { canonical: "/" },
};

const included = [
  {
    icon: FolderDown,
    title: "Template bundle downloads",
    text: "After payment you get a members-only page with the Google Drive link to the template bundles, plus step-by-step instructions for downloading them.",
  },
  {
    icon: Code2,
    title: "Shopify Liquid code library",
    text: "A members-only library of Liquid snippets and sections. Search, filter by category, preview, inspect the code, copy it or download it.",
  },
  {
    icon: KeyRound,
    title: "Your access stays linked to your account",
    text: "Sign in any time to return to both resource areas. You never pay twice for the same access.",
  },
];

const areas = [
  { icon: Code2, title: "Shopify Liquid code", text: "Snippets and sections you can search, preview, copy and download." },
  { icon: ShoppingBag, title: "Shopify themes and templates", text: "Theme and template bundles via the Drive download page." },
  { icon: LayoutTemplate, title: "WordPress and landing pages", text: "WordPress themes and templates, and landing page templates." },
  { icon: Puzzle, title: "Plugins", text: "Original plugins may be added in future. None are included yet." },
];

const steps = [
  { icon: LogIn, title: "Create an account", text: "Sign up with your email so your access is tied to you." },
  { icon: BookOpenCheck, title: "Pay once", text: "Complete a one-time Razorpay payment. We verify it on our server before unlocking anything." },
  { icon: FolderDown, title: "Open your resource hub", text: "Use the Drive link and the Liquid library whenever you like." },
];

const faqs: FAQ[] = [
  { question: "Is this a subscription?", answer: "No. It is a single one-time payment for all-access membership. It does not renew." },
  { question: "What exactly do I get?", answer: "Two things: the Google Drive link to the template bundles, and access to the Shopify Liquid code library on this site." },
  { question: "Are the files protected after I get the Drive link?", answer: "GPLMart gates who can see the link on this site. A Google Drive link can be forwarded by anyone who has it, so the files themselves are not individually protected once the link is shared. Please do not share it." },
  { question: "Can I redistribute or resell the resources?", answer: "Do not assume so. Licence terms are published on the licensing page and may differ between resources. That page is a draft pending business review." },
  { question: "What about refunds, updates and support?", answer: "No refund, update or support commitments have been finalised. They will be set out in the draft policies once reviewed, and are not promised here." },
  { question: "Is GPLMart affiliated with Shopify?", answer: "No. GPLMart is independent and is not affiliated with or endorsed by Shopify. Shopify and Liquid are the property of their respective owners." },
];

export default function HomePage() {
  const price = formatOfferPrice();
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div aria-hidden className="absolute -top-40 left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl animate-rise">
            <p className="inline-flex rounded-full border border-line-strong bg-white/[0.04] px-3 py-1 text-xs font-medium text-muted">
              One-time payment &middot; not a subscription
            </p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              All-access for <span className="text-gradient">Shopify builders</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted sm:text-xl">
              Pay once to unlock a Google Drive template bundle library and a searchable library of Shopify
              Liquid code, kept behind your account.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/checkout" size="lg">
                Get all access for {price} <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/login" variant="secondary" size="lg">
                I already have access
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section id="included">
        <SectionHeading eyebrow="What's included" title={`One payment of ${price}, two kinds of access`} />
        <ul className="grid gap-5 md:grid-cols-3">
          {included.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-ink-900/60 p-6">
              <Icon aria-hidden className="size-6 text-cyan" />
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
        <div role="note" className="mt-8 flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
          <ShieldAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
          <p>
            Content availability depends on the owner confirming distribution rights. Access opens only
            once that is recorded. Resources are independent of Shopify and are not official Shopify products.
          </p>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeading eyebrow="Resource areas" title="What the library focuses on" description="Specific files depend on what has been released to members at the time." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5">
              <Icon aria-hidden className="size-5 text-accent" />
              <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section id="how-it-works" className="border-y border-line bg-ink-900/50">
        <Section>
          <SectionHeading eyebrow="How it works" title="From sign-up to download" />
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-2xl border border-line bg-ink-950/50 p-6">
                <span className="font-display text-sm font-semibold text-accent">Step {i + 1}</span>
                <Icon aria-hidden className="mt-3 size-6" />
                <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </Section>
      </section>

      <Section id="price">
        <div className="mx-auto max-w-xl rounded-3xl border border-line-strong bg-gradient-to-b from-ink-800 to-ink-900 p-8 text-center shadow-card">
          <p className="text-sm font-medium text-cyan">GPLMart All-Access</p>
          <p className="mt-3 font-display text-6xl font-semibold">{price}</p>
          <p className="mt-2 text-sm text-muted">One-time payment in INR. No renewal.</p>
          <ButtonLink href="/checkout" size="lg" className="mt-8 w-full">
            Get all access
          </ButtonLink>
          <p className="mt-4 text-xs text-subtle">Payments are processed by Razorpay. Card details never touch this site.</p>
        </div>
      </Section>

      <Section id="faq" className="pt-0 sm:pt-0">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <FaqList items={faqs} />
        </div>
      </Section>
    </>
  );
}
