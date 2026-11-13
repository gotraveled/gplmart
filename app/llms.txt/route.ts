import { examples } from "@/lib/playground/examples";
import { siteConfig } from "@/lib/site";

/** AI-readable site summary for LLM crawlers and AI search engines. */
export function GET() {
  const lines = [
    `# GPLMart`,
    ``,
    `> ${siteConfig.description} One-time membership: ${examples.length}+ Shopify Liquid snippets and sections, 6 snippet packs, 6 ecommerce courses, 17 AI skill packs, 11 resell-rights ebooks, spreadsheet systems, printable planners, swipe files and template kits. Worldwide sales - INR pricing in India, USD elsewhere.`,
    ``,
    `## What GPLMart offers`,
    `- Shopify Liquid code & snippets: ${examples.length}+ original sections and snippets - product page, cart, checkout, trust, marketing, navigation, utilities. Live previews, install guides, copy-paste source.`,
    `- Snippet packs: 6 curated zip bundles (product page, cart upsell, trust, marketing, navigation, collections).`,
    `- Courses: 6 step-by-step ecommerce courses with 32 lessons (Shopify, Liquid, dropshipping India & international, Facebook ads).`,
    `- AI skill packs: 17 installable agent skills for ecommerce workflows (video, copy, ads, SEO, pricing, reviews).`,
    `- Ebooks: 11 in-depth PDF guides with resell rights - ecommerce, AI, freelancing, digital products, personal finance.`,
    `- Digital tools: spreadsheet systems (profit/pricing, Etsy, wedding, freelance, real estate), printable planner PDFs (2026 bundle, ADHD daily, party games, Airbnb host kit), ad copy swipe files, social media content kits, Shopify store document packs, resume & proposal kits.`,
    `- AI prompts: prompt packs for listings, ads, emails, WhatsApp, SEO and support.`,
    `- Free tools: live Liquid playground, Liquid code checker, free prompt samples.`,
    ``,
    `## Pricing`,
    `- INR 499 (India) / USD 4.99 (everywhere else) - one payment, no subscription.`,
    `- 30-day money-back guarantee. 12 months of access per purchase.`,
    ``,
    `## Key pages`,
    `- Home: ${siteConfig.url}`,
    `- Shopify Liquid codes (live playground): ${siteConfig.url}/playground`,
    `- Snippet category pages: ${siteConfig.url}/snippets/category/product-page`,
    `- Products: ${siteConfig.url}/products`,
    `- Snippet packs: ${siteConfig.url}/packs`,
    `- Courses: ${siteConfig.url}/courses`,
    `- AI skills: ${siteConfig.url}/skills`,
    `- Ebooks: ${siteConfig.url}/ebooks`,
    `- AI prompts: ${siteConfig.url}/prompts`,
    `- Guides: ${siteConfig.url}/guides`,
    `- How it works: ${siteConfig.url}/how-it-works`,
    `- Install guide: ${siteConfig.url}/install`,
    `- Guides: ${siteConfig.url}/guides`,
    `- FAQ: ${siteConfig.url}/faq`,
    `- About: ${siteConfig.url}/about`,
    `- Contact: ${siteConfig.url}/contact`,
    `- Licensing: ${siteConfig.url}/licensing`,
    ``,
    `## Trust`,
    `- Independent - not affiliated with Shopify Inc. or Automattic.`,
    `- India: Ramanashree Arcade, 18, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001`,
    `- USA: Westwood Street, Hayward, California 94544`,
    ``,
    `Free code samples: ${siteConfig.url}/playground (examples marked Free show complete source)`,
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
