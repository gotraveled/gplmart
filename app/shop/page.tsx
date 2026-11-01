import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProductGrid } from "@/components/products/product-card";
import { ShopFilters } from "@/components/products/shop-filters";
import { EmptyState } from "@/components/products/empty-state";
import { products } from "@/data/products";
import { filterAndSortProducts, parseCatalogQuery } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop digital products",
  description:
    "Browse demo Shopify, WordPress, HTML template and AI prompt listings. Search, filter by category and sort the catalogue.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseCatalogQuery(await searchParams);
  const results = filterAndSortProducts(products, query);

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Shop digital products"
        description="Browse the demo catalogue. Listings are placeholders while the marketplace is being built."
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />
      <Container className="py-10">
        <ShopFilters query={query} />
        <p role="status" aria-live="polite" className="my-6 text-sm text-subtle">
          {results.length} {results.length === 1 ? "product" : "products"}
          {query.q && <> matching &ldquo;{query.q}&rdquo;</>}
        </p>
        {results.length ? (
          <ProductGrid products={results} />
        ) : (
          <EmptyState
            title="No products found"
            description="Try a different search term or remove a filter to see more of the catalogue."
          />
        )}
      </Container>
    </>
  );
}
