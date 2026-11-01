export const siteConfig = {
  name: "GPLMart",
  description:
    "GPLMart is a marketplace for digital products and resources for website owners, Shopify merchants, WordPress users and developers.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gplmart.com").replace(/\/$/, ""),
  announcement:
    process.env.NEXT_PUBLIC_ANNOUNCEMENT ||
    "Preview build: purchases open after content licensing is confirmed.",
  contactEmail: null as string | null,
} as const;

export const mainNav = [
  { href: "/#included", label: "What's included" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const footerLinks = {
  GPLMart: [
    { href: "/#included", label: "What's included" },
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
