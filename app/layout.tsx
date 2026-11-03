import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Roboto, Roboto_Condensed } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site";
import { SEO_KEYWORDS, jsonLdPayload, orgJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto", display: "swap" });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-condensed", display: "swap" });

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "GPLMart - Shopify Liquid Code, Snippets & Sections", template: "%s | GPLMart" },
  description: siteConfig.description,
  keywords: [...SEO_KEYWORDS],
  applicationName: siteConfig.name,
  authors: [{ name: "GPLMart", url: siteConfig.url }],
  creator: "GPLMart",
  publisher: "GPLMart",
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: "GPLMart - Shopify Liquid Code, Snippets & Sections",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "GPLMart - Shopify Liquid code library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPLMart - Shopify Liquid Code, Snippets & Sections",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/" },
};

const globalJsonLd = jsonLdPayload(orgJsonLd(), websiteJsonLd());

export const viewport: Viewport = { themeColor: "#070b14", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable} ${robotoCondensed.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: globalJsonLd }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
