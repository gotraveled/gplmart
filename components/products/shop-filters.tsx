import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { catalogHref, sortOptions, type CatalogQuery } from "@/lib/catalog";
import { cn } from "@/lib/cn";

const field =
  "h-11 w-full rounded-xl border border-line-strong bg-ink-900 px-3 text-sm text-fg placeholder:text-subtle";

export function ShopFilters({ query }: { query: CatalogQuery }) {
  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
      active
        ? "border-accent bg-accent/20 text-fg"
        : "border-line-strong text-muted hover:bg-white/[0.06] hover:text-fg",
    );
  return (
    <div className="space-y-5">
      <form action="/shop" method="get" role="search" className="grid gap-3 md:grid-cols-[1fr_14rem_12rem_auto]">
        <div className="relative">
          <label htmlFor="q" className="sr-only">
            Search products
          </label>
          <Search aria-hidden className="pointer-events-none absolute left-3 top-3.5 size-4 text-subtle" />
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={query.q}
            maxLength={100}
            placeholder="Search by title or description"
            className={cn(field, "pl-9")}
          />
        </div>
        <div>
          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select id="category" name="category" defaultValue={query.category ?? ""} className={field}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.shortName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select id="sort" name="sort" defaultValue={query.sort} className={field}>
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="md" className="h-11">
          Apply
        </Button>
      </form>
      <nav aria-label="Category filters">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link
              href={catalogHref({ ...query, category: null })}
              className={chip(!query.category)}
              aria-current={!query.category ? "true" : undefined}
            >
              All
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={catalogHref({ ...query, category: c.slug })}
                className={chip(query.category === c.slug)}
                aria-current={query.category === c.slug ? "true" : undefined}
              >
                {c.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
