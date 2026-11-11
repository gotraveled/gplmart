import "server-only";
import fs from "node:fs";
import path from "node:path";
import catalog from "@/products/catalog.json";

export interface ProductItem {
  slug: string;
  title: string;
  description: string;
  category: "html-template" | "php-script" | string;
  version: string;
  license: string;
  files: string[];
  added: string;
}

export interface ProductCatalog {
  updated: string;
  notes: string[];
  items: ProductItem[];
}

export function getCatalog(): ProductCatalog {
  return catalog as ProductCatalog;
}

export function getProduct(slug: string): ProductItem | undefined {
  return getCatalog().items.find((i) => i.slug === slug);
}

export function productDir(slug: string): string {
  return path.join(process.cwd(), "products", "src", slug);
}

export function productFilePath(slug: string, rel: string): string | null {
  const dir = productDir(slug);
  const full = path.resolve(dir, rel);
  if (!full.startsWith(dir + path.sep) && full !== dir) return null;
  return fs.existsSync(full) ? full : null;
}
