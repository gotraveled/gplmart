import type { Lang } from "@/lib/highlight";

export interface GuideBlock {
  h?: string;
  p?: string;
  list?: string[];
  code?: { lang: Lang; code: string };
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMin: number;
  tag: string;
  blocks: GuideBlock[];
}

export const guides: Guide[] = [
  {
    slug: "countdown-timer-on-dawn",
    title: "How to add a countdown timer to Dawn without an app",
    excerpt:
      "The 4-step method every Shopify developer uses - no monthly app fee, no external script, just theme code you control.",
    date: "2026-10-22",
    readMin: 4,
    tag: "Shopify tutorial",
    blocks: [
      {
        p: "Every 'countdown timer' app on the Shopify App Store is doing the same thing: injecting a snippet and a tiny script into your theme. You can do it yourself in under 5 minutes - and once it's in your theme, it loads faster, costs nothing monthly, and can't break when an app's server hiccups.",
      },
      { h: "Step 1 - duplicate your theme first" },
      {
        p: "Online Store > Themes > your live theme > Actions > Duplicate. Work on the copy, never on the live theme. Thirty seconds that means you can always roll back if something looks wrong.",
      },
      { h: "Step 2 - create the snippet" },
      {
        p: "In the theme code editor (Actions > Edit code), open the snippets folder and click 'Add a new snippet'. Name it countdown-timer.liquid and paste your countdown markup - ours is free in the playground.",
      },
      {
        code: {
          lang: "liquid",
          code: `{% comment %} snippets/countdown-timer.liquid {% endcomment %}\n<div class="gpl-countdown" data-end="{{ ends }}">\n  <!-- countdown markup here -->\n</div>`,
        },
      },
      { h: "Step 3 - the CSS and JS are already inside" },
      {
        p: "GPLMart snippets are single files - the styles ship in a {% stylesheet %} block and the script in a {% javascript %} block at the bottom of the same .liquid file. Shopify runs them only when the snippet renders, scoped to that instance. Nothing to paste into base.css and no asset files to upload.",
      },
      { h: "Step 4 - render it" },
      {
        p: "Now render the snippet where you want it. For the product page, open the product template's section file, find where the buy buttons render, and add it just above:",
      },
      {
        code: { lang: "liquid", code: `{% render 'countdown-timer', ends: '2026-12-31T23:59:59' %}` },
      },
      {
        p: "That's the whole job. The 'apps are easier' story is true only the first time - after this, adding another countdown takes 30 seconds.",
      },
      { h: "Common mistakes to avoid" },
      {
        list: [
          "Fake urgency - don't make the countdown reset every refresh. Shoppers notice, and it burns trust.",
          "Heavy fonts and images in the snippet - keep it to text and CSS.",
          "Styles without a namespace - unprefixed classes like .timer can fight your theme's CSS.",
          "Pasting into the live theme without a backup duplicate.",
        ],
      },
      {
        p: "Want a countdown that's already written, styled and tested? It's one of the free examples in the GPLMart playground - copy the complete single file and paste straight in.",
      },
    ],
  },
  {
    slug: "gpl-licenses-explained",
    title: "GPL licences and WordPress bundles - what's actually legal",
    excerpt:
      "Why GPL clubs can sell premium plugins legally, what the licence actually covers, and the two traps that make it go wrong.",
    date: "2026-10-30",
    readMin: 5,
    tag: "Licensing",
    blocks: [
      {
        p: "GPLMart includes WordPress themes and plugins in the bundle - and people understandably ask 'is that legal?'. Short answer: yes, and it's the same licence WordPress itself ships under. Here's the honest explanation.",
      },
      { h: "Why it's legal" },
      {
        p: "WordPress core is released under the GNU General Public License (GPL). Plugins and themes are derivative works - they call WordPress functions - so they inherit the GPL. The GPL's whole purpose is that software covered by it stays free to share: anyone who has a copy may redistribute it, modified or not, including for a fee. That right isn't a loophole or a gray area; it is the licence's core design.",
      },
      { h: "What you actually get" },
      {
        list: [
          "The complete product files - identical to what the vendor distributes",
          "The right to install on as many sites as you like, including client sites",
          "The GPL freedoms themselves: use, modify, redistribute",
        ],
      },
      { h: "What you don't get" },
      {
        list: [
          "A vendor licence key or activation - those are a separate paid service",
          "Automatic updates from the original developer - updates ship through the bundle as new bundles publish",
          "Official support from the vendor's team",
          "Cloud features that phone home to vendor servers - some of those require an active key",
        ],
      },
      { h: "The two traps" },
      {
        p: "First trap: 'split licence' products. ThemeForest and CodeCanyon items use Envato's split licence - only the PHP is GPL; the bundled CSS, images and JavaScript are not. Redistributing the whole package is legally shaky, which is why we don't include those items.",
      },
      {
        p: "Second trap: tampered downloads. Random 'free premium plugin' sites sometimes repack zips with injected code - this is a real malware vector, not a hypothetical one. Buying the product once from the vendor and redistributing that exact file is the defensible path.",
      },
      { h: "What it means for you" },
      {
        p: "As a buyer, GPL items in a bundle are clean, complete and lawful to use on any site you own or manage. What you're paying for is curation, delivery and convenience - not a licence key. If you want automatic updates or official support for a specific plugin, buying direct from its vendor is the right call, and you should.",
      },
      {
        p: "Shopify themes, for the record, are different: they are not GPL. Third-party paid themes can't legally be redistributed, which is why GPLMart's Shopify bundle only includes themes we own or are explicitly authorised to distribute.",
      },
    ],
  },
  {
    slug: "product-page-elements-that-convert",
    title: "7 product-page elements that lift conversion",
    excerpt:
      "The elements high-converting stores actually use on product pages - ranked by impact, with the honest caveat about each.",
    date: "2026-11-01",
    readMin: 6,
    tag: "Conversion",
    blocks: [
      {
        p: "A product page has roughly 3 seconds to convince a mobile visitor. These are the elements that consistently show up on pages that convert - and the honest caveats nobody mentions.",
      },
      { h: "1. Delivery promise above the fold" },
      {
        p: "'Order by 2 PM, dispatched today' or 'Arrives 3-5 November' answers the question shoppers actually have before price. An estimator that reads real dispatch times beats a generic shipping note every time. Our delivery-ETA and cutoff-timer snippets do exactly this.",
      },
      { h: "2. Visible social proof" },
      {
        p: "Star ratings near the title, and a real testimonial or two further down. The caveat: only show ratings you actually have - a '4.8 stars' badge on a product with zero reviews is worse than nothing.",
      },
      { h: "3. Trust signals at the buy button" },
      {
        p: "Payment icons, a returns promise, and a security note right where the decision happens. The payment-badges and guarantee-strip snippets place these precisely at the point of hesitation.",
      },
      { h: "4. Urgency - but only honest urgency" },
      {
        p: "Real stock counts ('only 4 left'), real dispatch cutoffs, real sale end dates. The moment a shopper spots a fake countdown that resets on refresh, you've lost more than the sale. If it isn't true, don't show it.",
      },
      { h: "5. Sticky add-to-cart on mobile" },
      {
        p: "Once the buy button scrolls off screen on mobile, conversions drop. A sticky bar keeping product, price and CTA visible recovers that. The sticky-buy-bar snippet is the fix.",
      },
      { h: "6. Cross-sells that actually relate" },
      {
        p: "'Pairs well with' or 'frequently bought together' lifts AOV when the suggestions are genuine. Hard-code 2-3 relevant products rather than trusting random recommendations - a lazy algorithm suggests the wrong thing and costs the sale.",
      },
      { h: "7. Structured product info" },
      {
        p: "Specs in a table, shipping in a tab, returns in a collapsible - not a wall of text. Shoppers scan; structure lets them find the one detail that answers their last doubt.",
      },
      {
        p: "None of these need an app. Every one is a Liquid snippet that runs on Shopify's own servers - install once, customise in the theme editor, and it works forever without a monthly fee.",
      },
    ],
  },
];
