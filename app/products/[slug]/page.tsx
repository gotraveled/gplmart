import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Info, Lock, Mail, MonitorCheck, PackageOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/faq";
import { Breadcrumbs } from "@/components/ui/page-header";
import { ProductArtwork } from "@/components/products/product-artwork";
import { ProductGrid } from "@/components/products/product-card";
import { categoryMap } from "@/data/categories";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { formatPrice } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.name} | GPLMart`, description: product.description, type: "website" },
  };
}

function ListCard({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: readonly string[];
  icon: typeof Info;
}) {
  return (
    <section className="rounded-2xl border border-line bg-ink-900/60 p-6">
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
        <Icon aria-hidden className="size-5 text-accent" /> {title}
      </h2>
      <ul className="mt-4 space-y-2.5 text-sm text-muted">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5">
            <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const category = categoryMap[product.category];
  const related = getRelatedProducts(product);

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: category.shortName, href: `/categories/${category.slug}` },
          { label: product.name },
        ]}
      />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <ProductArtwork category={product.category} bundle={product.isBundle} className="lg:sticky lg:top-24 lg:self-start" />
        <div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/categories/${category.slug}`}>
              <Badge className="hover:text-fg">{category.shortName}</Badge>
            </Link>
            {product.isBundle && <Badge className="border-accent/40 text-accent">Bundle</Badge>}
            <Badge className="border-amber-400/30 text-amber-200">Demo listing</Badge>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-muted">{product.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8 rounded-2xl border border-line-strong bg-ink-800/60 p-6 shadow-card">
            <p className="text-3xl font-semibold">
              {formatPrice(product.price, product.currency)}
              <span className="ml-2 text-sm font-normal text-subtle">
                {product.currency} &middot; demo price, one-time
              </span>
            </p>
            <Button disabled aria-describedby="purchase-note" size="lg" className="mt-5 w-full">
              <Lock aria-hidden className="size-4" /> Purchases coming soon
            </Button>
            <p id="purchase-note" className="mt-3 text-xs text-subtle">
              Checkout is not available yet. No payment details are collected on this site.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <ListCard title="Features" items={product.features} icon={CheckCircle2} />
        <ListCard title="What's included" items={product.included} icon={PackageOpen} />
        <ListCard title="Compatibility" items={product.compatibility} icon={MonitorCheck} />
        <ListCard title="Requirements" items={product.requirements} icon={Info} />
        <div className="md:col-span-2">
          <ListCard title="Delivery" items={product.delivery} icon={Mail} />
        </div>
      </div>

      <section className="mt-14 max-w-3xl" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="mb-5 font-display text-2xl font-semibold">
          Frequently asked questions
        </h2>
        <FaqList items={product.faqs} />
      </section>

      <section className="mt-16" aria-labelledby="related-heading">
        <h2 id="related-heading" className="mb-6 font-display text-2xl font-semibold">
          Related products
        </h2>
        <ProductGrid products={related} />
      </section>
    </Container>
  );
}
