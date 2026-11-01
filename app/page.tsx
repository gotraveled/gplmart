import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Compass, FileText, Gauge, LibraryBig, Search, ShieldCheck, Tags } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/container";
import { FaqList } from "@/components/ui/faq";
import { ProductGrid } from "@/components/products/product-card";
import { categoryIcons } from "@/components/products/product-artwork";
import { categories } from "@/data/categories";
import { getBundles, getFeaturedProducts, products } from "@/data/products";
import type { FAQ } from "@/data/types";

export const metadata: Metadata = {
  title: { absolute: "GPLMart - Digital products and resources marketplace" },
  alternates: { canonical: "/" },
};

const benefits = [
  { icon: Compass, title: "Organised by what you build", text: "Shopify, WordPress, HTML and AI prompt resources in clearly separated categories." },
  { icon: FileText, title: "Clear product information", text: "Every listing is planned to show what is included, compatibility and requirements." },
  { icon: ShieldCheck, title: "Licensing up front", text: "Licence and source details will be published for each product before it goes on sale." },
  { icon: Gauge, title: "Fast, lightweight pages", text: "Server-rendered pages with minimal JavaScript so browsing stays quick on any device." },
];

const steps = [
  { icon: Search, title: "Browse", text: "Search the catalogue or explore a category." },
  { icon: Tags, title: "Review", text: "Check features, included files, compatibility and licence terms." },
  { icon: LibraryBig, title: "Get access (planned)", text: "After a one-time purchase, resources will be delivered through a protected library. Not live yet." },
];

const faqs: FAQ[] = [
  { question: "Can I buy products on GPLMart yet?", answer: "Not yet. The store is in a preview stage and shows demo listings. Checkout, accounts and the resource library are planned for later phases." },
  { question: "Are the products on the site real?", answer: "The listings you see now are clearly labelled demo placeholders. Real products will only be listed after their licence and source have been verified." },
  { question: "How will payments work?", answer: "Payments are planned as one-time purchases through a supported payment provider. No payment information is collected on this site today." },
  { question: "Where can I read the policies?", answer: "Draft licensing, refund, privacy and terms pages are linked in the footer. They are placeholders pending business review." },
];

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const bundles = getBundles();
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div aria-hidden className="absolute -top-40 left-1/2 h-96 w-[56rem] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
        <div aria-hidden className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
        <Container className="relative py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] px-3 py-1 text-xs font-medium text-muted">
              <BadgeCheck aria-hidden className="size-3.5 text-cyan" /> Preview build &middot; demo catalogue
            </p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Digital resources for <span className="text-gradient">builders of the web</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted sm:text-xl">
              GPLMart is a marketplace for Shopify, WordPress, HTML and AI prompt resources, with clear
              details on what you get and how it can be used.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/shop" size="lg">
                Browse the catalogue <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary" size="lg">
                How GPLMart works
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Featured"
          title="Featured demo products"
          description="Placeholder listings that show how products will be presented."
          action={
            <ButtonLink href="/shop" variant="ghost">
              View all {products.length} <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          }
        />
        <ProductGrid products={featured} />
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeading eyebrow="Categories" title="Shop by category" description="Find resources for the platform you work with." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = categoryIcons[c.slug];
            return (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-gradient-to-b from-ink-800/70 to-ink-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50"
                >
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-accent/15 text-accent">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{c.shortName}</h3>
                  <p className="mt-1.5 text-sm text-muted">{c.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent transition group-hover:gap-2">
                    Explore <ArrowRight aria-hidden className="size-4" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <section className="border-y border-line bg-ink-900/50">
        <Section>
          <SectionHeading eyebrow="Why GPLMart" title="Built for clarity and speed" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-line bg-ink-950/50 p-6">
                <Icon aria-hidden className="size-6 text-cyan" />
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </Section>
      </section>

      <Section>
        <SectionHeading eyebrow="How it works" title="From browsing to building" />
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative rounded-2xl border border-line bg-ink-900/60 p-6">
              <span className="font-display text-sm font-semibold text-accent">Step {i + 1}</span>
              <Icon aria-hidden className="mt-3 size-6 text-fg" />
              <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeading eyebrow="Bundles" title="Featured digital bundles" description="Demo bundle concepts that group related resources together." />
        <ProductGrid products={bundles} />
      </Section>

      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">FAQ</p>
            <h2 id="home-faq" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Common questions
            </h2>
            <p className="mt-3 text-muted">
              Still unsure? <Link href="/contact" className="text-cyan underline underline-offset-4">Contact us</Link>.
            </p>
          </div>
          <FaqList items={faqs} />
        </div>
      </Section>
    </>
  );
}
