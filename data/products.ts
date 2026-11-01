import type { CategorySlug, FAQ, Product } from "./types";

/**
 * DEMO CATALOGUE. Every item below is placeholder content used to build and
 * test the storefront. None of these are real, licensed or verified products.
 */

const delivery = [
  "Purchases are not available yet, so nothing can be delivered at this stage.",
  "Planned: instant access to a protected library after a one-time purchase.",
  "Planned: a confirmation email with access details.",
];

const commonFaqs: FAQ[] = [
  {
    question: "Can I buy this product today?",
    answer:
      "Not yet. This is a demo listing for the Phase 1 storefront. Checkout will be added in a later phase.",
  },
  {
    question: "Is this an official or original product?",
    answer:
      "No claim is made. Licensing and source details for every real product will be verified and published before it goes on sale.",
  },
];

const base = {
  currency: "INR" as const,
  delivery,
  faqs: commonFaqs,
  featured: false,
  isBundle: false,
};

function make(p: Omit<Product, "currency" | "delivery" | "faqs" | "featured" | "isBundle"> & Partial<Product>): Product {
  return { ...base, ...p };
}

export const products: readonly Product[] = [
  make({
    slug: "aurora-shopify-theme",
    name: "Aurora Shopify Theme (Demo)",
    tagline: "A clean, fast storefront theme layout",
    description:
      "A demo listing for a modern Online Store 2.0 theme concept with flexible sections, a focused product page and a lightweight layout.",
    category: "shopify",
    price: 3499,
    features: ["Section-based homepage layout", "Product page with media gallery concept", "Mobile-first navigation", "Settings-driven colour palette"],
    included: ["Theme files (placeholder)", "Setup guide (placeholder)", "Changelog (placeholder)"],
    compatibility: ["Shopify Online Store 2.0", "Modern evergreen browsers"],
    requirements: ["A Shopify store", "Basic familiarity with the theme editor"],
    tags: ["theme", "online store 2.0", "storefront"],
    featured: true,
    addedAt: "2026-09-12",
  }),
  make({
    slug: "liquid-section-pack",
    name: "Liquid Section Pack (Demo)",
    tagline: "Reusable sections for custom store pages",
    description:
      "A demo listing for a pack of customisable Liquid sections such as feature rows, FAQ blocks and announcement bars.",
    category: "shopify",
    price: 1499,
    features: ["Drop-in section files", "Schema settings for non-developers", "Accessible markup patterns"],
    included: ["Section files (placeholder)", "Installation notes (placeholder)"],
    compatibility: ["Shopify Online Store 2.0 themes"],
    requirements: ["Permission to edit theme code"],
    tags: ["liquid", "sections", "snippets"],
    featured: true,
    addedAt: "2026-09-28",
  }),
  make({
    slug: "shopify-snippet-toolkit",
    name: "Shopify Snippet Toolkit (Demo)",
    tagline: "Small Liquid helpers for everyday tweaks",
    description:
      "A demo listing for a collection of small Liquid snippets for badges, price formatting and conditional content.",
    category: "shopify",
    price: 799,
    features: ["Copy-and-paste snippets", "Commented examples", "Organised by task"],
    included: ["Snippet collection (placeholder)", "Usage examples (placeholder)"],
    compatibility: ["Shopify themes using Liquid"],
    requirements: ["Basic Liquid knowledge helps"],
    tags: ["liquid", "snippets", "customisation"],
    addedAt: "2026-10-05",
  }),
  make({
    slug: "meridian-wordpress-theme",
    name: "Meridian WordPress Theme (Demo)",
    tagline: "A flexible block theme for business sites",
    description:
      "A demo listing for a block-based WordPress theme concept with clean typography, reusable patterns and fast loading.",
    category: "wordpress",
    price: 2999,
    features: ["Full site editing support", "Reusable block patterns", "Light, dark and neutral style variations"],
    included: ["Theme package (placeholder)", "Documentation (placeholder)"],
    compatibility: ["Recent WordPress releases", "Block editor"],
    requirements: ["WordPress installation", "PHP version supported by your WordPress release"],
    tags: ["theme", "block theme", "business"],
    featured: true,
    addedAt: "2026-08-20",
  }),
  make({
    slug: "wp-forms-plugin-suite",
    name: "WP Forms Plugin Suite (Demo)",
    tagline: "Contact and enquiry forms for WordPress",
    description:
      "A demo listing for a plugin concept offering simple contact forms, spam protection options and email notifications.",
    category: "wordpress",
    price: 1999,
    features: ["Drag-and-drop style builder concept", "Spam protection options", "Email notification settings"],
    included: ["Plugin package (placeholder)", "Documentation (placeholder)"],
    compatibility: ["Recent WordPress releases"],
    requirements: ["Ability to install plugins", "Working outgoing email on your host"],
    tags: ["plugin", "forms", "email"],
    addedAt: "2026-09-02",
  }),
  make({
    slug: "launchpad-html-template",
    name: "Launchpad HTML Template (Demo)",
    tagline: "A product landing page template",
    description:
      "A demo listing for a responsive static landing page template with hero, pricing, FAQ and footer sections.",
    category: "html-templates",
    price: 999,
    features: ["Semantic, accessible HTML", "Responsive CSS with no framework required", "Multiple section variants"],
    included: ["HTML and CSS files (placeholder)", "Customisation guide (placeholder)"],
    compatibility: ["Any static host", "Modern evergreen browsers"],
    requirements: ["A text editor", "Basic HTML and CSS knowledge"],
    tags: ["landing page", "static", "responsive"],
    featured: true,
    addedAt: "2026-10-10",
  }),
  make({
    slug: "dashboard-ui-components",
    name: "Dashboard UI Components (Demo)",
    tagline: "Reusable interface blocks for web apps",
    description:
      "A demo listing for a set of HTML and CSS interface components such as cards, tables, tabs and form controls.",
    category: "html-templates",
    price: 1299,
    features: ["Cards, tables and tabs", "Keyboard-friendly patterns", "Theming through CSS variables"],
    included: ["Component files (placeholder)", "Usage notes (placeholder)"],
    compatibility: ["Any front-end stack", "Modern evergreen browsers"],
    requirements: ["Basic HTML and CSS knowledge"],
    tags: ["components", "ui kit", "dashboard"],
    addedAt: "2026-07-30",
  }),
  make({
    slug: "ecommerce-copy-prompt-pack",
    name: "Ecommerce Copy Prompt Pack (Demo)",
    tagline: "Prompts for product pages and email copy",
    description:
      "A demo listing for a structured prompt pack to help draft product descriptions, collection pages and campaign copy.",
    category: "ai-prompts",
    price: 599,
    features: ["Prompts organised by task", "Fill-in-the-blank variables", "Tone and brand voice guidance"],
    included: ["Prompt library (placeholder)", "Usage guide (placeholder)"],
    compatibility: ["Works with common AI chat assistants"],
    requirements: ["Access to an AI assistant of your choice"],
    tags: ["prompts", "copywriting", "ecommerce"],
    featured: true,
    addedAt: "2026-10-18",
  }),
  make({
    slug: "web-design-prompt-pack",
    name: "Web Design Prompt Pack (Demo)",
    tagline: "Prompts for layouts, UX and design systems",
    description:
      "A demo listing for prompts that help explore page layouts, design tokens and accessibility reviews.",
    category: "ai-prompts",
    price: 699,
    features: ["Layout and wireframe prompts", "Design token prompts", "Accessibility review prompts"],
    included: ["Prompt library (placeholder)", "Usage guide (placeholder)"],
    compatibility: ["Works with common AI chat assistants"],
    requirements: ["Access to an AI assistant of your choice"],
    tags: ["prompts", "design", "ux"],
    addedAt: "2026-10-22",
  }),
  make({
    slug: "storefront-starter-bundle",
    name: "Storefront Starter Bundle (Demo)",
    tagline: "Theme, sections and snippets together",
    description:
      "A demo bundle concept grouping a Shopify theme, a section pack and a snippet toolkit for launching a store faster.",
    category: "shopify",
    price: 4999,
    features: ["Theme, sections and snippets in one bundle", "Consistent setup guide", "Single purchase concept"],
    included: ["Aurora Shopify Theme (demo)", "Liquid Section Pack (demo)", "Shopify Snippet Toolkit (demo)"],
    compatibility: ["Shopify Online Store 2.0"],
    requirements: ["A Shopify store"],
    tags: ["bundle", "shopify", "starter"],
    featured: true,
    isBundle: true,
    addedAt: "2026-10-25",
  }),
  make({
    slug: "builder-ai-and-html-bundle",
    name: "Builder AI and HTML Bundle (Demo)",
    tagline: "Templates plus prompt packs for fast builds",
    description:
      "A demo bundle concept pairing an HTML template with design and copy prompt packs for quick site builds.",
    category: "html-templates",
    price: 1999,
    features: ["Template plus prompt packs", "Workflow guide", "Single purchase concept"],
    included: ["Launchpad HTML Template (demo)", "Web Design Prompt Pack (demo)", "Ecommerce Copy Prompt Pack (demo)"],
    compatibility: ["Any static host", "Common AI chat assistants"],
    requirements: ["A text editor", "Access to an AI assistant"],
    tags: ["bundle", "html", "prompts"],
    featured: true,
    isBundle: true,
    addedAt: "2026-10-26",
  }),
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.featured && !p.isBundle).slice(0, limit);
}

export function getBundles(): Product[] {
  return products.filter((p) => p.isBundle);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const same = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const others = products.filter((p) => p.slug !== product.slug && p.category !== product.category);
  return [...same, ...others].slice(0, limit);
}
