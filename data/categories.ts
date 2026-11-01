import type { Category, CategorySlug } from "./types";

export const categories: readonly Category[] = [
  {
    slug: "shopify",
    name: "Shopify Resources",
    shortName: "Shopify",
    tagline: "Themes, sections and Liquid snippets",
    description:
      "Themes, sections, Liquid snippets and customisation resources for Shopify merchants and store builders.",
    audience: "Shopify merchants, agencies and freelancers",
  },
  {
    slug: "wordpress",
    name: "WordPress Resources",
    shortName: "WordPress",
    tagline: "Themes, plugins and site resources",
    description:
      "WordPress themes, plugins and website resources for site owners, bloggers and developers.",
    audience: "WordPress site owners and developers",
  },
  {
    slug: "html-templates",
    name: "HTML Templates",
    shortName: "HTML Templates",
    tagline: "Static templates and UI components",
    description:
      "Static HTML templates and reusable website components that work without a CMS or framework lock-in.",
    audience: "Front-end developers and designers",
  },
  {
    slug: "ai-prompts",
    name: "AI Prompts",
    shortName: "AI Prompts",
    tagline: "Prompts for design, code and ecommerce",
    description:
      "Structured AI prompt packs for website design, development and ecommerce workflows.",
    audience: "Builders using AI assistants in their workflow",
  },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c])) as Record<
  CategorySlug,
  Category
>;

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
