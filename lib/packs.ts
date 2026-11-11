import { examples, completeFile, hasSectionVariant } from "@/lib/playground/examples";
import type { PlaygroundExample } from "@/lib/playground/types";

export interface SnippetPack {
  slug: string;
  title: string;
  description: string;
  audience: string;
  /** Playground example ids included in the pack, in display order. */
  snippets: readonly string[];
}

export const packs: readonly SnippetPack[] = [
  {
    slug: "product-page-conversion",
    title: "Product page conversion pack",
    description:
      "The highest-impact product-page components: buy boxes, urgency, trust and cross-sells that live exactly where buying decisions happen.",
    audience: "Store owners & developers optimising PDP conversion",
    snippets: [
      "sticky-buy-bar", "stock-pulse", "sold-count", "usp-under-atc", "variant-swatches",
      "size-chart-modal", "quick-view", "delivery-estimator", "trust-badges", "payment-badges",
      "star-rating", "pairs-well-with", "recently-viewed", "countdown-timer", "preorder-button",
    ],
  },
  {
    slug: "cart-checkout-upsell",
    title: "Cart & checkout upsell pack",
    description:
      "Cart drawer, free-shipping progress, bundles and post-cart offers - the components that lift average order value after the add-to-cart click.",
    audience: "Merchants fighting cart abandonment and low AOV",
    snippets: [
      "cart-drawer", "free-shipping-bar", "discount-progress", "cart-upsell", "bundle-builder",
      "bundle-save", "complete-the-look", "frequently-bought", "upsell-modal", "subscribe-save",
      "gift-wrap", "checkout-trust", "empty-cart",
    ],
  },
  {
    slug: "trust-social-proof",
    title: "Trust & social proof pack",
    description:
      "Reviews, testimonials, UGC, certifications and guarantee strips - everything that answers 'can I trust this store?' before the buy button.",
    audience: "New stores and brands building first-time-buyer confidence",
    snippets: [
      "trust-grid", "trust-badges", "star-rating", "review-summary", "testimonial-slider",
      "review-card", "ugc-grid", "certification-badges", "press-mentions", "video-testimonial",
      "price-match", "ssl-note", "verified-badge", "guarantee-strip",
    ],
  },
  {
    slug: "marketing-promotions",
    title: "Marketing & promotions pack",
    description:
      "Popups, exit intent, coupons, spin wheels and announcement bars - the attention-grabbing layer that feeds your funnels.",
    audience: "Marketers running campaigns and list-building pushes",
    snippets: [
      "promo-popup", "exit-intent", "coupon-cards", "countdown-timer", "sales-notification",
      "newsletter-discount", "spin-wheel", "scratch-card", "price-drop-alert", "festival-banner",
      "benefit-marquee", "social-share", "instagram-grid", "announcement-bar",
    ],
  },
  {
    slug: "store-navigation",
    title: "Navigation & discovery pack",
    description:
      "Mega menus, predictive search, mobile nav and scroll helpers - the chrome that decides whether shoppers find what they came for.",
    audience: "Themes and stores needing better findability",
    snippets: [
      "mega-menu", "mega-menu-panel", "sticky-category-nav", "mobile-bottom-nav", "search-hero",
      "predictive-search", "collection-filters", "breadcrumb", "back-to-top", "scroll-progress",
    ],
  },
  {
    slug: "content-collection-pages",
    title: "Content & collection pages pack",
    description:
      "Collection grids, category tiles, FAQs, slideshows and editorial blocks for the pages between product and checkout.",
    audience: "Content-heavy stores and agencies building campaign pages",
    snippets: [
      "collection-grid", "collection-hero", "category-tiles", "tabbed-collections", "product-scroller",
      "faq-accordion", "gallery-grid", "staff-picks", "image-with-text", "feature-icons",
    ],
  },
];

export function getPack(slug: string): SnippetPack | undefined {
  return packs.find((p) => p.slug === slug);
}

export interface PackSnippet {
  example: PlaygroundExample;
  /** Snippet file name inside the pack zip (sections/ or snippets/ path). */
  file: string;
  /** Rendered one-file install source (Liquid + embedded CSS/JS). */
  code: string;
  hasSection: boolean;
}

export function packSnippets(pack: SnippetPack): PackSnippet[] {
  const out: PackSnippet[] = [];
  const seen = new Set<string>();
  for (const id of pack.snippets) {
    if (seen.has(id)) continue;
    seen.add(id);
    const ex = examples.find((e) => e.id === id);
    if (!ex) continue;
    const files = ex.files(ex.defaults);
    const dir = ex.kind === "section" ? "sections" : "snippets";
    out.push({
      example: ex,
      file: `${dir}/${ex.id}.liquid`,
      code: completeFile(files),
      hasSection: hasSectionVariant(ex),
    });
  }
  return out;
}

export function packSnippetCount(pack: SnippetPack): number {
  return packSnippets(pack).length;
}
