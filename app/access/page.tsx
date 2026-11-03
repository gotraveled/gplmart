import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, FolderDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Resource hub", robots: { index: false } };

const areas = [
  { href: "/access/templates", icon: FolderDown, title: "Template bundles", text: "Open the Google Drive link and download the bundles." },
  { href: "/access/liquid-library", icon: Code2, title: "Shopify Liquid library", text: "Search, preview, copy and download Liquid snippets." },
];

export default async function AccessHub() {
  return (
    <>
      <PageHeader title="Your resource hub" description="Everything included in your all-access membership. No further payment is required." />
      <Container className="py-10">
        <ul className="grid gap-5 md:grid-cols-2">
          {areas.map(({ href, icon: Icon, title, text }) => (
            <li key={href}>
              <Link href={href} className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/70 p-7 transition hover:-translate-y-1 hover:border-accent/50">
                <Icon aria-hidden className="size-8 text-mint" />
                <h2 className="mt-4 font-display text-2xl font-semibold">{title}</h2>
                <p className="mt-2 text-muted">{text}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-accent">
                  Open <ArrowRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
