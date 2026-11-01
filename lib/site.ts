export const siteConfig = {
  name: "GPLMart",
  description:
    "GPLMart is a marketplace for digital products and resources for website owners, Shopify merchants, WordPress users and developers.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gplmart.com").replace(/\/$/, ""),
  announcement:
    process.env.NEXT_PUBLIC_ANNOUNCEMENT ||
    "Preview build: the catalogue shows demo products and purchases are not open yet.",
  contactEmail: null as string | null,
} as const;

export const mainNav = [
  { href: "/shop", label: "Shop" },
  { href: "/categories/shopify", label: "Shopify" },
  { href: "/categories/wordpress", label: "WordPress" },
  { href: "/categories/html-templates", label: "HTML Templates" },
  { href: "/categories/ai-prompts", label: "AI Prompts" },
] as const;

export const footerLinks = {
  Marketplace: [
    { href: "/shop", label: "All products" },
    { href: "/categories/shopify", label: "Shopify" },
    { href: "/categories/wordpress", label: "WordPress" },
    { href: "/categories/html-templates", label: "HTML Templates" },
    { href: "/categories/ai-prompts", label: "AI Prompts" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Policies: [
    { href: "/licensing", label: "Licensing" },
    { href: "/refund-policy", label: "Refund policy" },
    { href: "/privacy-policy", label: "Privacy policy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
