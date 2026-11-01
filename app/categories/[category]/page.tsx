import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProductGrid } from "@/components/products/product-card";
import { EmptyState } from "@/components/products/empty-state";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { cn } from "@/lib/cn";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: { title: `${category.name} | GPLMart`, description: category.description },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = getProductsByCategory(category.slug);

  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={category.name}
        description={category.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: category.shortName },
        ]}
      />
      <Container className="py-10">
        <nav aria-label="Categories" className="mb-8">
          <ul className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  aria-current={c.slug === category.slug ? "page" : undefined}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                    c.slug === category.slug
                      ? "border-accent bg-accent/20 text-fg"
                      : "border-line-strong text-muted hover:bg-white/[0.06] hover:text-fg",
                  )}
                >
                  {c.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mb-6 text-sm text-subtle">Best for: {category.audience}</p>
        {items.length ? (
          <ProductGrid products={items} />
        ) : (
          <EmptyState
            title="No products yet"
            description="Listings for this category will appear here soon."
            cta="Browse all products"
          />
        )}
      </Container>
    </>
  );
}
