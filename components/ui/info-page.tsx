import type { Metadata } from "next";
import { PageHeader } from "./page-header";
import { Prose } from "./prose";

const ogImage = [{ url: "/opengraph-image", width: 1200, height: 630, alt: "GPLMart - Shopify Liquid code library" }];

export function infoMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "GPLMart", title: `${title} | GPLMart`, description, url: path, images: ogImage },
    twitter: { card: "summary_large_image", title: `${title} | GPLMart`, description, images: ["/opengraph-image"] },
  };
}

export function InfoPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description={description}
        crumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />
      <Prose>{children}</Prose>
    </>
  );
}
