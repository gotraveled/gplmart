export interface CourseModule {
  slug: string;
  title: string;
  summary: string;
  outcomes: string[];
}

export interface Course {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  audience: string;
  modules: CourseModule[];
}

export const courses: readonly Course[] = [
  {
    slug: "store-blueprint",
    title: "Shopify Store Blueprint",
    tagline: "Zero to first sale - account setup, products, payments and dropshipping, start to finish.",
    description:
      "The complete merchant course: create your Shopify account, pick a plan, set up your theme and homepage, add products and content, connect payments (Razorpay, Stripe, COD), then launch dropshipping - India and international - with product research that actually works.",
    audience: "New store owners, dropshippers and merchants launching their first Shopify store",
    modules: [
      {
        slug: "account-setup",
        title: "Account, plan & first theme",
        summary: "Create the account, choose Basic vs Shopify vs Advanced, install a theme, and make it yours.",
        outcomes: [
          "Create a Shopify account and pick the right plan",
          "Install and customise a theme without breaking it",
          "Set store name, contact, policies and currency",
        ],
      },
      {
        slug: "store-content",
        title: "Homepage, menus & content",
        summary: "Navigation, homepage sections, pages, policies and the content that makes a store look real.",
        outcomes: [
          "Build header menus and footer links",
          "Design a converting homepage",
          "Write About/Contact/Policy pages that build trust",
        ],
      },
      {
        slug: "products-pricing",
        title: "Products, pricing & variants",
        summary: "Add products properly - variants, pricing psychology, collections and inventory.",
        outcomes: [
          "Create products with variants and options",
          "Price for profit with correct margins",
          "Organise collections and set smart sorting",
        ],
      },
      {
        slug: "payments-dropshipping",
        title: "Payments & dropshipping",
        summary: "Razorpay, Stripe, Cash on Delivery - then source and sell products without holding inventory.",
        outcomes: [
          "Activate Razorpay/Stripe/COD for India and international",
          "Connect CJdropshipping and source winning products",
          "Set up order fulfilment and tracking flow",
        ],
      },
      {
        slug: "product-research",
        title: "Winning product research",
        summary: "Find products people actually buy - validated research methods for India and global markets.",
        outcomes: [
          "Run validated product research (not guessing)",
          "Check margins after shipping and fees",
          "Spot saturated vs emerging niches",
        ],
      },
      {
        slug: "conversion-launch",
        title: "Conversion, launch & first sales",
        summary: "The pre-launch checklist, trust elements and how to get your first orders.",
        outcomes: [
          "Install conversion snippets (the Liquid library)",
          "Run a pre-launch QA checklist",
          "Get first sales via organic and paid channels",
        ],
      },
    ],
  },
  {
    slug: "liquid-mastery",
    title: "Shopify Liquid Mastery",
    tagline: "From copy-paste to custom storefronts - the complete Liquid course for merchants, freelancers and agencies.",
    description:
      "A project-based course that takes you from 'what is Liquid' to shipping custom storefront features clients pay for. Every lesson pairs concepts with production-ready patterns from the GPLMart library.",
    audience: "Shopify developers, freelancers and agencies",
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
  },
  {
    slug: "facebook-ads",
    title: "Facebook & Instagram Ads for Shopify",
    tagline: "From zero to profitable ad campaigns - creative, targeting, budgets and scaling without burning money.",
    description:
      "A practical ads course for store owners: Meta Business setup, pixel and catalog, campaign structure, creative that converts, audience targeting, budget pacing and scaling - built for Shopify stores selling in India and internationally.",
    audience: "Store owners and marketers running Meta ads",
    modules: [
      {
        slug: "ads-foundation",
        title: "Meta setup & tracking",
        summary: "Business Manager, ad account, pixel, catalog and the tracking every campaign depends on.",
        outcomes: [
          "Set up Meta Business Suite and ad account",
          "Install pixel and verify events fire",
          "Connect product catalog to Shopify",
        ],
      },
      {
        slug: "campaign-structure",
        title: "Campaign structure & budgets",
        summary: "ASC vs manual campaigns, ad sets, budgets and the structure that scales.",
        outcomes: [
          "Choose ASC vs manual for your stage",
          "Structure campaigns for testing and scaling",
          "Set budgets that don't bleed money",
        ],
      },
      {
        slug: "creative-targeting",
        title: "Creative & targeting",
        summary: "Hooks, formats, audiences and the creative-testing system that finds winners.",
        outcomes: [
          "Write hooks that stop the scroll",
          "Build lookalike and interest audiences",
          "Run structured creative tests",
        ],
      },
      {
        slug: "scaling-analytics",
        title: "Scaling & analytics",
        summary: "Reading metrics, killing losers, scaling winners and knowing your real numbers.",
        outcomes: [
          "Read ROAS/CPA correctly for ecommerce",
          "Scale winners without breaking them",
          "Build a weekly optimisation routine",
        ],
      },
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getModule(courseSlug: string, moduleSlug: string): CourseModule | undefined {
  return getCourse(courseSlug)?.modules.find((m) => m.slug === moduleSlug);
}

/** Back-compat: the Liquid course slug used by early URLs/data. */
export const legacyCourseSlug = "liquid-mastery";
