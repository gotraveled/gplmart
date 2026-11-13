export const siteConfig = {
  name: "GPLMart",
  description:
    "GPLMart is a library of reusable Shopify Liquid snippets and sections, step-by-step ecommerce courses, plus original digital products and ebooks, for merchants, developers and agencies.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gplmart.com").replace(/\/$/, ""),
  announcement: process.env.NEXT_PUBLIC_ANNOUNCEMENT || "",
  contactEmail: null as string | null,
} as const;

export const mainNav = [
  { href: "/playground", label: "Shopify Liquid Codes" },
  { href: "/courses", label: "Courses" },
  { href: "/library", label: "Library" },
  { href: "/products", label: "Products" },
  { href: "/install", label: "Install guide" },
  { href: "/faq", label: "FAQ" },
] as const;

export const footerLinks = {
  GPLMart: [
    { href: "/playground", label: "Shopify Liquid codes" },
    { href: "/library", label: "Library" },
    { href: "/products", label: "Products" },
    { href: "/skills", label: "AI Skills" },
    { href: "/packs", label: "Snippet packs" },
    { href: "/courses", label: "Courses" },
    { href: "/tools/liquid-check", label: "Free Liquid checker" },
    { href: "/prompts", label: "Free prompts" },
    { href: "/install", label: "Install guide" },
    { href: "/checkout", label: "Get access" },
    { href: "/access", label: "Members area" },
    { href: "/dashboard", label: "Dashboard" },
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
