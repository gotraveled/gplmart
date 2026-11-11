export interface CourseModule {
  slug: string;
  title: string;
  summary: string;
  outcomes: string[];
}

export const course: {
  title: string;
  tagline: string;
  description: string;
  modules: CourseModule[];
} = {
  title: "Shopify Liquid Mastery",
  tagline: "From copy-paste to custom storefronts - the complete Liquid course for merchants, freelancers and agencies.",
  description:
    "A project-based course that takes you from 'what is Liquid' to shipping custom storefront features clients pay for. Every lesson pairs concepts with production-ready patterns from the GPLMart library.",
  modules: [
    {
      slug: "foundations",
      title: "Liquid foundations",
      summary: "What Liquid is, where theme code lives, and the mental model every Shopify developer needs.",
      outcomes: [
        "Read and write basic Liquid syntax confidently",
        "Navigate the Shopify theme code editor",
        "Understand objects, filters and tags",
      ],
    },
    {
      slug: "product-pages",
      title: "Product page mastery",
      summary: "The highest-value real estate in ecommerce - variants, metafields, buy boxes and conversion elements.",
      outcomes: [
        "Build custom product page sections",
        "Use metafields for structured product data",
        "Implement variant-aware pricing and stock UI",
      ],
    },
    {
      slug: "cart-checkout",
      title: "Cart & checkout",
      summary: "Cart objects, AJAX API calls, drawers, upsells and the checkout-customisation limits everyone hits.",
      outcomes: [
        "Work with the cart object and AJAX API",
        "Build cart drawers and upsell flows",
        "Know what checkout customisation is actually allowed",
      ],
    },
    {
      slug: "sections-settings",
      title: "Sections & theme editor",
      summary: "Schema settings, presets, blocks and making components merchants can actually customise.",
      outcomes: [
        "Write valid {% schema %} for sections",
        "Design settings merchants understand",
        "Use section blocks and presets effectively",
      ],
    },
    {
      slug: "performance",
      title: "Performance & best practices",
      summary: "Render cost, caching, image patterns and the habits that keep custom code fast at scale.",
      outcomes: [
        "Measure and reduce render cost",
        "Apply caching and lazy-render patterns",
        "Avoid the common performance traps",
      ],
    },
    {
      slug: "store-features",
      title: "Store features & integrations",
      summary: "Search, filters, localization, B2B and wiring Liquid to the wider Shopify platform.",
      outcomes: [
        "Customise search and collection filtering",
        "Handle multi-currency and localization",
        "Integrate with Shopify APIs safely",
      ],
    },
    {
      slug: "client-work",
      title: "Shipping client work",
      summary: "Quoting, licensing, handover and the business side of selling Liquid work.",
      outcomes: [
        "Scope and quote Liquid projects",
        "License and deliver code professionally",
        "Build a reusable snippet library of your own",
      ],
    },
  ],
};
