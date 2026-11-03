import type { PlaygroundExample } from "./playground/types";

/** Category-specific benefit angles - gives every snippet page unique copy instead of boilerplate. */
const ANGLES: Record<string, [string, string, string]> = {
  "Headers & navigation": [
    "First thing every visitor sees - built lightweight so it does not block your LCP",
    "Works with any OS 2.0 header without modifying the theme's own header code",
    "Mobile-first touch targets and dismiss behaviour included",
  ],
  "Product page": [
    "Placed exactly where buying decisions happen - directly on the product template",
    "Pulls live product data (price, compare price, availability) so nothing is hardcoded",
    "Designed to match Dawn-style themes out of the box - your fonts, your colours",
  ],
  "Trust & social proof": [
    "Visible proof where hesitation peaks - near the buy box and add-to-cart button",
    "Text and numbers are yours to set - no fabricated claims baked in",
    "Renders server-side with the page, no third-party script weighing the store down",
  ],
  "Content": [
    "Structured, semantic markup that search engines read cleanly",
    "Editor-friendly settings - update wording in the theme editor, not in code",
    "Accessible by default: keyboard navigable, screen-reader labelled",
  ],
  "Marketing": [
    "Promotes offers where visitors actually look - not hidden behind a modal wall",
    "Dismissible, polite and mobile-safe - no intrusive popup penalties",
    "All copy and colours adjustable so it matches your brand, not a template look",
  ],
  "Cart & checkout": [
    "Catches shoppers at the highest-intent moment - inside the cart flow",
    "Works with the Shopify cart object and AJAX cart without apps",
    "Zero impact on checkout security - everything stays in your theme",
  ],
  "Utility": [
    "Drop-in pattern you can reuse on any template, no metafields required",
    "Vanilla JS and theme CSS - no library dependencies slowing the page",
    "Falls back gracefully on older browsers and reduced-motion settings",
  ],
};

export function snippetBenefits(ex: PlaygroundExample): string[] {
  const [a, b, c] = ANGLES[ex.category] ?? (["Reusable on any template", "No library dependencies", "Graceful fallbacks included"] as const);
  const kind = ex.kind === "section" ? "a theme section" : "a rendered snippet";
  return [
    `${ex.name} installs as ${kind} - no app, no monthly fee, pure Liquid`,
    a,
    b,
    c,
  ];
}

/** Short unique hook line used under the H1 of each snippet page. */
export function snippetHook(ex: PlaygroundExample): string {
  const kind = ex.kind === "section" ? "a theme-editor section" : "a Liquid snippet";
  return `Copy-paste ${kind} for ${ex.category.toLowerCase()} - ${ex.description}`;
}
