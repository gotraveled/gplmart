export type CategorySlug = "shopify" | "wordpress" | "html-templates" | "ai-prompts";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  audience: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: CategorySlug;
  /** Whole currency units, e.g. 1499 = INR 1,499. Demo values only. */
  price: number;
  currency: "INR" | "USD";
  features: string[];
  included: string[];
  compatibility: string[];
  requirements: string[];
  delivery: string[];
  faqs: FAQ[];
  tags: string[];
  featured: boolean;
  isBundle: boolean;
  /** ISO date, used for the "Newest" sort. */
  addedAt: string;
}

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "name";
