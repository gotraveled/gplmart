import { examples } from "@/lib/playground/examples";
import { siteConfig } from "@/lib/site";

/** AI-readable site summary for LLM crawlers and AI search engines. */
export function GET() {
  const lines = [
    `# GPLMart`,
    ``,
    `> ${siteConfig.description} One-time membership: ${examples.length}+ Shopify Liquid snippets and sections, Shopify theme bundles, GPL-licensed WordPress themes and plugins. Worldwide sales - INR pricing in India, USD elsewhere.`,
    ``,
    `## What GPLMart offers`,
    `- Shopify Liquid code & snippets: ${examples.length}+ original sections and snippets - product page, cart, checkout, trust, marketing, navigation, utilities. Live previews, install guides, copy-paste source.`,
    `- Shopify theme bundles: themes GPLMart owns or is authorised to distribute.`,
    `- WordPress themes & plugins: GPL-licensed, complete files, vendor licence preserved.`,
    `- Free AI prompts for Shopify stores.`,
    ``,
    `## Pricing`,
    `- INR 499 (India) / USD 4.99 (everywhere else) - one payment, no subscription.`,
    `- 30-day money-back guarantee. 12 months of access per purchase.`,
    ``,
    `## Key pages`,
    `- Home: ${siteConfig.url}`,
    `- Shopify Liquid codes (live playground): ${siteConfig.url}/playground`,
    `- Snippet category pages: ${siteConfig.url}/snippets/category/product-page`,
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
