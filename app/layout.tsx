import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Roboto, Roboto_Condensed } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto", display: "swap" });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-condensed", display: "swap" });

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "GPLMart - Shopify Liquid code & storefront components", template: "%s | GPLMart" },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "GPLMart - Shopify Liquid code & storefront components",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "GPLMart" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#070b14", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable} ${robotoCondensed.variable} ${mono.variable}`}>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
