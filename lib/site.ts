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
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const footerLinks = {
  GPLMart: [
    { href: "/library", label: "Library" },
    { href: "/playground", label: "Playground" },
    { href: "/checkout", label: "Get access" },
    { href: "/account", label: "My account" },
    { href: "/login", label: "Sign in" },
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
