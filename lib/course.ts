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
  level: "Beginner" | "Intermediate" | "Advanced";
  track: "shopify" | "wordpress" | "ai";
  status: "live" | "coming-soon";
  modules: CourseModule[];
}

export const courses: readonly Course[] = [
  {
    slug: "shopify-basic",
    title: "Shopify Basic Course",
    tagline: "Zero to your first store - account, theme, products, payments and launch basics.",
    description:
      "The beginner course: create your Shopify account, pick a plan, install and brand a theme, build menus and homepage, add products with correct pricing, and activate payments including Razorpay, Stripe and Cash on Delivery.",
    audience: "Complete beginners launching their first Shopify store",
    level: "Beginner",
    track: "shopify",
    status: "live",
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
        slug: "payments-basics",
        title: "Payments basics",
        summary: "Razorpay, Stripe, Cash on Delivery and the payment methods Indian and international buyers expect.",
        outcomes: [
          "Activate Razorpay/Stripe/COD",
          "Understand payment fees and payouts",
          "Test checkout before launch",
        ],
      },
    ],
  },
  {
    slug: "shopify-advanced",
    title: "Shopify Advanced Course",
    tagline: "Complete ecommerce store creation & management - design, operations, marketing and scaling.",
    description:
      "The advanced merchant course: professional store design, product catalogue management, conversion optimisation, order and inventory operations, marketing basics, and scaling a store past first sales.",
    audience: "Store owners ready to run a real ecommerce operation",
    level: "Advanced",
    track: "shopify",
    status: "live",
    modules: [
      {
        slug: "store-design",
        title: "Professional store design",
        summary: "Theme customisation deep-dive, brand systems, page templates and the design decisions that lift conversion.",
        outcomes: [
          "Customise every theme setting confidently",
          "Build consistent brand systems",
          "Design high-converting page templates",
        ],
      },
      {
        slug: "catalog-operations",
        title: "Catalogue & operations",
        summary: "Product management at scale, inventory, fulfilment workflows, returns and vendor management.",
        outcomes: [
          "Manage large product catalogues efficiently",
          "Set up fulfilment and shipping workflows",
          "Handle returns, exchanges and stock accuracy",
        ],
      },
      {
        slug: "marketing-conversion",
        title: "Marketing & conversion",
        summary: "Email, WhatsApp, SEO basics and on-site conversion - the organic growth stack.",
        outcomes: [
          "Set up email and WhatsApp marketing",
          "Apply on-site conversion best practices",
          "Understand basic SEO for product pages",
        ],
      },
      {
        slug: "scaling-growth",
        title: "Scaling & growth",
        summary: "Analytics, margins, ads readiness and the systems a store needs to grow past ₹1L/month.",
        outcomes: [
          "Read store analytics like a pro",
          "Protect and grow margins",
          "Know when you're ready for paid ads",
        ],
      },
    ],
  },
  {
    slug: "liquid-snippets",
    title: "Shopify Liquid Snippets Codes Course",
    tagline: "From copy-paste to custom storefronts - the complete Liquid course for merchants, freelancers and agencies.",
    description:
      "A project-based course that takes you from 'what is Liquid' to shipping custom storefront features clients pay for. Every lesson pairs concepts with production-ready patterns from the GPLMart library.",
    audience: "Shopify developers, freelancers and agencies",
    level: "Advanced",
    track: "shopify",
    status: "live",
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
    slug: "dropshipping-india",
    title: "Shopify Indian Dropshipping Course",
    tagline: "Source, list and sell products in India without holding inventory - COD, UPI and local suppliers.",
    description:
      "The India-focused dropshipping course: find winning products for the Indian market, source from local and Chinese suppliers, set up COD/UPI payments, handle shipping and RTO, and market to Indian buyers.",
    audience: "Indian entrepreneurs starting a dropshipping business",
    level: "Intermediate",
    track: "shopify",
    status: "live",
    modules: [
      {
        slug: "product-research-in",
        title: "Product research for India",
        summary: "Finding products Indian buyers actually want - trends, margins after shipping, and saturation checks.",
        outcomes: [
          "Research winning products for the Indian market",
          "Calculate real margins including shipping and fees",
          "Spot saturated vs emerging niches",
        ],
      },
      {
        slug: "sourcing-fulfilment-in",
        title: "Sourcing & fulfilment",
        summary: "CJdropshipping, local Indian suppliers, shipping times and the fulfilment flow.",
        outcomes: [
          "Connect suppliers and import products",
          "Set shipping rates and delivery promises",
          "Handle orders, tracking and returns",
        ],
      },
      {
        slug: "payments-cod-in",
        title: "Payments & COD in India",
        summary: "Razorpay, UPI, Cash on Delivery and managing RTO risk like a pro.",
        outcomes: [
          "Activate Razorpay and COD",
          "Reduce RTO with smart order rules",
          "Set COD fees and minimum order values",
        ],
      },
      {
        slug: "marketing-in",
        title: "Marketing to Indian buyers",
        summary: "WhatsApp marketing, Instagram, regional targeting and the channels that work in India.",
        outcomes: [
          "Run WhatsApp broadcast campaigns",
          "Target Indian audiences effectively",
          "Use regional-language creatives",
        ],
      },
    ],
  },
  {
    slug: "dropshipping-international",
    title: "Shopify International Dropshipping Course",
    tagline: "Sell to US, EU and global markets - sourcing, payments, shipping and scaling across borders.",
    description:
      "The international dropshipping course: research global winning products, source from CJ/AliExpress/Zendrop, accept international payments, manage longer shipping times, and run cross-border marketing profitably.",
    audience: "Sellers targeting US, EU and other international markets",
    level: "Intermediate",
    track: "shopify",
    status: "live",
    modules: [
      {
        slug: "product-research-intl",
        title: "Global product research",
        summary: "Finding winning products for US/EU markets - trend tools, margin math and competition analysis.",
        outcomes: [
          "Research products for international markets",
          "Use trend and ad-spy tools effectively",
          "Validate demand before importing",
        ],
      },
      {
        slug: "sourcing-fulfilment-intl",
        title: "Sourcing & international fulfilment",
        summary: "CJdropshipping, Zendrop, AliExpress - choosing suppliers and setting delivery expectations.",
        outcomes: [
          "Compare international suppliers",
          "Handle 10-25 day shipping expectations",
          "Manage tracking and customer communication",
        ],
      },
      {
        slug: "payments-intl",
        title: "International payments",
        summary: "Stripe, PayPal, multi-currency and the payment stack global buyers expect.",
        outcomes: [
          "Activate Stripe and PayPal",
          "Price in multiple currencies correctly",
          "Handle international taxes and duties basics",
        ],
      },
      {
        slug: "marketing-intl",
        title: "Cross-border marketing",
        summary: "Facebook/Instagram ads, TikTok and the marketing channels for international ecommerce.",
        outcomes: [
          "Run international ad campaigns",
          "Localise creatives and offers",
          "Manage ad budgets across markets",
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
    level: "Intermediate",
    track: "shopify",
    status: "live",
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
  // ---- Coming soon: expand this catalog as new tracks launch ----
  {
    slug: "wordpress-basic",
    title: "WordPress Basic Course",
    tagline: "Build your first WordPress site - hosting, install, theme, pages and launch.",
    description: "Beginner WordPress course covering hosting setup, WordPress installation, theme selection, essential plugins, pages and menus, and launching a professional site.",
    audience: "Complete beginners building their first WordPress site",
    level: "Beginner",
    track: "wordpress",
    status: "coming-soon",
    modules: [],
  },
  {
    slug: "wordpress-advanced",
    title: "WordPress Advanced Course",
    tagline: "WooCommerce stores, performance, security and site management at scale.",
    description: "Advanced WordPress course covering WooCommerce setup, performance optimisation, security hardening, backups, migrations and professional site management.",
    audience: "Site owners and developers managing WordPress professionally",
    level: "Advanced",
    track: "wordpress",
    status: "coming-soon",
    modules: [],
  },
  {
    slug: "wordpress-plugin-creation",
    title: "WordPress Plugin Creation Course",
    tagline: "Build and sell WordPress plugins - PHP fundamentals to published products.",
    description: "Learn to build WordPress plugins from scratch: PHP basics, hooks and filters, admin interfaces, settings APIs, security best practices, and publishing/selling your plugin.",
    audience: "Developers wanting to create and sell WordPress plugins",
    level: "Advanced",
    track: "wordpress",
    status: "coming-soon",
    modules: [],
  },
  {
    slug: "wordpress-ecommerce",
    title: "WordPress Complete Ecommerce Course",
    tagline: "WooCommerce store creation & management - products to profitable sales.",
    description: "Complete WooCommerce course: store setup, product management, payments, shipping, marketing, and running a profitable online store on WordPress.",
    audience: "Merchants building an ecommerce store on WordPress/WooCommerce",
    level: "Intermediate",
    track: "wordpress",
    status: "coming-soon",
    modules: [],
  },
  {
    slug: "ai-website-creation",
    title: "AI Website Creation Course",
    tagline: "Build websites with AI - basic to advanced, no code required to pro workflows.",
    description: "Learn to build websites using AI tools: prompting fundamentals, AI website builders, generating copy/design/code, iterating to professional results, and advanced AI-assisted workflows.",
    audience: "Everyone who wants to build websites faster with AI",
    level: "Beginner",
    track: "ai",
    status: "coming-soon",
    modules: [],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getModule(courseSlug: string, moduleSlug: string) {
  return getCourse(courseSlug)?.modules.find((m) => m.slug === moduleSlug);
}
