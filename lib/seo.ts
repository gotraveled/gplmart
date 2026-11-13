import { absoluteUrl } from "./site";

/** Primary + related keyword set used across page metadata and structured data. */
export const SEO_KEYWORDS = [
  "shopify liquid code",
  "shopify liquid snippets",
  "shopify sections code",
  "free shopify snippets",
  "shopify liquid code examples",
  "shopify theme code snippets",
  "dawn theme snippets",
  "shopify os 2.0 sections",
  "shopify product page snippets",
  "shopify cart page code",
  "copy paste shopify sections",
  "shopify liquid tutorial",
  "shopify theme customization code",
  "etsy spreadsheet templates",
  "google sheets budget template",
  "printable planner pdf",
  "digital planner printable",
  "ad copy swipe file",
  "social media content templates",
  "freelance proposal templates",
  "resume templates",
  "wedding planner spreadsheet",
  "shopify store policy templates",
] as const;

const orgBase = {
  "@type": "Organization" as const,
  "@id": absoluteUrl("/#org"),
  name: "GPLMart",
  url: absoluteUrl("/"),
  logo: absoluteUrl("/logo-gpl.png"),
  description:
    "Independent library of Shopify Liquid snippets and sections, step-by-step ecommerce courses, plus original digital products and ebooks for merchants, developers and agencies.",
  email: "info@gplmart.com",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Ramanashree Arcade, 18, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560001",
      addressCountry: "IN",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Westwood Street",
      addressLocality: "Hayward",
      addressRegion: "CA",
      postalCode: "94544",
      addressCountry: "US",
    },
  ],
};

export function orgJsonLd() {
  return orgBase;
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: "GPLMart",
    url: absoluteUrl("/"),
    publisher: { "@id": absoluteUrl("/#org") },
    inLanguage: "en",
  };
}

export function productJsonLd() {
  return {
    "@type": "Product",
    name: "GPLMart All-Access Membership",
    description:
      "One-time membership for 12 months: 200+ Shopify Liquid snippets and sections, snippet packs, 6 ecommerce courses, 17 AI skill packs, 11 resell-rights ebooks, spreadsheet systems, printable planners, swipe files, template kits and AI prompt packs.",
    brand: { "@type": "Brand", name: "GPLMart" },
    offers: [
      {
        "@type": "Offer",
        price: "499",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/checkout"),
        eligibleRegion: "IN",
      },
      {
        "@type": "Offer",
        price: "4.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/checkout"),
      },
    ],
  };
}

/** Product schema for an individual catalog item page (/products/[slug]). */
export function catalogProductJsonLd(input: {
  slug: string;
  title: string;
  description: string;
}) {
  return {
    "@type": "Product",
    name: input.title,
    description: input.description,
    brand: { "@type": "Brand", name: "GPLMart" },
    url: absoluteUrl(`/products/${input.slug}`),
    offers: [
      {
        "@type": "Offer",
        price: "499",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/checkout"),
        eligibleRegion: "IN",
      },
      {
        "@type": "Offer",
        price: "4.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/checkout"),
      },
    ],
  };
}

export function faqJsonLd(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: readonly { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.url),
    })),
  };
}

export function codeJsonLd(input: {
  id: string;
  name: string;
  description: string;
  kind: "section" | "snippet";
  /** Pass only for publicly viewable source - omit for members-only snippets so paid code never ships in page HTML. */
  code?: string;
}) {
  return {
    "@type": "SoftwareSourceCode",
    name: `${input.name} - Shopify Liquid ${input.kind}`,
    description: input.description,
    programmingLanguage: ["Liquid", "HTML", "CSS", "JavaScript"],
    codeRepository: absoluteUrl(`/snippets/${input.id}`),
    url: absoluteUrl(`/snippets/${input.id}`),
    ...(input.code ? { text: input.code.slice(0, 4000) } : {}),
    author: { "@id": absoluteUrl("/#org") },
    license: absoluteUrl("/licensing"),
    codeSampleType: input.kind === "section" ? "full (compilable) solution" : "code snippet",
  };
}

export function collectionJsonLd(items: readonly { name: string; url: string }[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.url),
    })),
  };
}

/** Renders one or more JSON-LD objects as a single script tag payload. */
export function jsonLdPayload(...schemas: Record<string, unknown>[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": schemas })
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
