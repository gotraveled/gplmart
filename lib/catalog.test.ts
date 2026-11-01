import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { catalogHref, filterAndSortProducts, parseCatalogQuery } from "./catalog";
import { formatPrice } from "./format";

describe("parseCatalogQuery", () => {
  it("falls back to safe defaults for invalid input", () => {
    expect(parseCatalogQuery({ category: "nope", sort: "bad", q: "  hi  " })).toEqual({
      q: "hi",
      category: null,
      sort: "featured",
    });
  });
  it("accepts valid values and array params", () => {
    expect(parseCatalogQuery({ category: ["shopify", "x"], sort: "newest" })).toMatchObject({
      category: "shopify",
      sort: "newest",
    });
  });
});

describe("filterAndSortProducts", () => {
  const run = (q: Partial<Parameters<typeof filterAndSortProducts>[1]>) =>
    filterAndSortProducts(products, { q: "", category: null, sort: "featured", ...q });

  it("searches title and description", () => {
    const r = run({ q: "liquid section" });
    expect(r.map((p) => p.slug)).toContain("liquid-section-pack");
    expect(r.every((p) => /liquid/i.test(p.name + p.description))).toBe(true);
  });
  it("filters by category", () => {
    const r = run({ category: "wordpress" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.category === "wordpress")).toBe(true);
  });
  it("returns empty for no match", () => {
    expect(run({ q: "zzzzzz" })).toEqual([]);
  });
  it("sorts by price", () => {
    const asc = run({ sort: "price-asc" }).map((p) => p.price);
    expect(asc).toEqual([...asc].sort((a, b) => a - b));
    const desc = run({ sort: "price-desc" }).map((p) => p.price);
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });
});

describe("data integrity", () => {
  it("has unique slugs and valid categories", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const cats = new Set(categories.map((c) => c.slug));
    expect(products.every((p) => cats.has(p.category))).toBe(true);
  });
  it("every category has products", () => {
    for (const c of categories) expect(products.some((p) => p.category === c.slug)).toBe(true);
  });
});

describe("helpers", () => {
  it("builds catalogue hrefs", () => {
    expect(catalogHref({})).toBe("/shop");
    expect(catalogHref({ q: "a b", category: "shopify", sort: "newest" })).toBe(
      "/shop?q=a+b&category=shopify&sort=newest",
    );
  });
  it("formats prices", () => {
    expect(formatPrice(1499, "INR")).toContain("1,499");
  });
});
