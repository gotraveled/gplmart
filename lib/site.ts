export const siteConfig = {
  name: "GPLMart",
  description:
    "GPLMart is a library of reusable Shopify Liquid snippets and theme sections, plus authorised template bundles, for merchants, developers and agencies.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gplmart.com").replace(/\/$/, ""),
  announcement:
    process.env.NEXT_PUBLIC_ANNOUNCEMENT ||
    "Preview build: purchases open after content licensing is confirmed.",
  contactEmail: null as string | null,
} as const;

export const mainNav = [
  { href: "/library", label: "Library" },
  { href: "/playground", label: "Playground" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
] as const;

export const footerLinks = {
  GPLMart: [
    { href: "/library", label: "Library" },
    { href: "/playground", label: "Playground" },
    { href: "/prompts", label: "Free prompts" },
    { href: "/install", label: "Install guide" },
    { href: "/checkout", label: "Get access" },
    { href: "/access", label: "Members area" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/guides", label: "Guides" },
    { href: "/contact", label: "Contact" },
    { href: "/updates", label: "Updates" },
  ],
  Policies: [
    { href: "/licensing", label: "Licensing" },
    { href: "/refund-policy", label: "Refund policy" },
    { href: "/privacy-policy", label: "Privacy policy" },
    { href: "/terms", label: "Terms" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/copyright", label: "Copyright" },
  ],
} as const;
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
