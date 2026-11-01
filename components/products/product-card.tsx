import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryMap } from "@/data/categories";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { ProductArtwork } from "./product-artwork";

export function ProductCard({ product }: { product: Product }) {
  const category = categoryMap[product.category];
  return (
    <article className="group relative flex w-full flex-col rounded-2xl border border-line bg-ink-900/70 p-3 shadow-card transition duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-ink-800/70">
      <ProductArtwork category={product.category} bundle={product.isBundle} />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge>{category.shortName}</Badge>
          {product.isBundle && <Badge className="border-accent/40 text-accent">Bundle</Badge>}
          <Badge className="border-amber-400/30 text-amber-200">Demo</Badge>
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-cyan"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="text-lg font-semibold">
            {formatPrice(product.price, product.currency)}
            <span className="ml-1.5 text-xs font-normal text-subtle">demo price</span>
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition group-hover:gap-2">
            View details <ArrowRight aria-hidden className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: readonly Product[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <li key={p.slug} className="flex">
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
