import { categories } from "@/data/categories";
import type { CategorySlug, Product, SortKey } from "@/data/types";

export const sortOptions: readonly { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];

export interface CatalogQuery {
  q: string;
  category: CategorySlug | null;
  sort: SortKey;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export function parseCatalogQuery(params: RawParams): CatalogQuery {
  const category = first(params.category);
  const sort = first(params.sort);
  return {
    q: first(params.q).trim().slice(0, 100),
    category: categories.find((c) => c.slug === category)?.slug ?? null,
    sort: sortOptions.find((o) => o.value === sort)?.value ?? "featured",
  };
}

export function filterAndSortProducts(items: readonly Product[], query: CatalogQuery): Product[] {
  const terms = query.q.toLowerCase().split(/\s+/).filter(Boolean);
  const result = items.filter((p) => {
    if (query.category && p.category !== query.category) return false;
    const haystack = `${p.name} ${p.tagline} ${p.description}`.toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
  const byName = (a: Product, b: Product) => a.name.localeCompare(b.name);
  const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
    featured: (a, b) => Number(b.featured) - Number(a.featured) || byName(a, b),
    newest: (a, b) => b.addedAt.localeCompare(a.addedAt),
    "price-asc": (a, b) => a.price - b.price || byName(a, b),
    "price-desc": (a, b) => b.price - a.price || byName(a, b),
    name: byName,
  };
  return [...result].sort(sorters[query.sort]);
}

export function catalogHref(query: Partial<CatalogQuery>): string {
  const sp = new URLSearchParams();
  if (query.q) sp.set("q", query.q);
  if (query.category) sp.set("category", query.category);
  if (query.sort && query.sort !== "featured") sp.set("sort", query.sort);
  const s = sp.toString();
  return s ? `/shop?${s}` : "/shop";
}
