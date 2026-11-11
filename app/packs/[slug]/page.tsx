import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download, Package } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { packs, getPack, packSnippets } from "@/lib/packs";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return packs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pack = getPack((await params).slug);
  if (!pack) return {};
  return {
    title: `${pack.title} - Snippet pack | GPLMart`,
    description: pack.description,
    alternates: { canonical: `/packs/${pack.slug}` },
    openGraph: { type: "website", title: `${pack.title} | GPLMart`, description: pack.description, url: `/packs/${pack.slug}` },
  };
}

export default async function PackPage({ params }: Props) {
  const pack = getPack((await params).slug);
  if (!pack) notFound();
  const items = packSnippets(pack);

  return (
    <>
      <PageHeader
        title={pack.title}
        description={pack.description}
        crumbs={[{ label: "Library", href: "/library" }, { label: "Packs", href: "/packs" }, { label: pack.title }]}
      />
      <Container className="py-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-1.5 text-xs font-medium text-muted">
            <Package aria-hidden className="size-3.5 text-accent" /> {items.length} snippets
          </span>
          <span className="text-xs text-subtle">{pack.audience}</span>
          <a
            href={`/access/packs/${pack.slug}/download`}
            className="ml-auto inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:brightness-110"
          >
            <Download aria-hidden className="size-4" /> Download pack (.zip)
          </a>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ example: e, file }) => (
            <li key={e.id}>
              <Link
                href={`/snippets/${e.id}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/60 p-5 transition hover:border-accent/50"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-line px-2 py-0.5 text-[0.6rem] font-medium text-subtle">{e.category}</span>
                  <span className="font-mono text-[0.65rem] text-subtle">{file.replace(/^snippets\/|^sections\//, "")}</span>
                </div>
                <h2 className="mt-3 font-display text-base font-semibold group-hover:text-accent">{e.name}</h2>
                <p className="mt-1.5 flex-1 text-sm text-muted">{e.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  View snippet <ArrowRight aria-hidden className="size-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted">
          The zip contains every snippet as a ready-to-paste one-file install (Liquid with embedded CSS/JS) plus a README
          with install notes. Members download instantly -{" "}
          <Link href="/access/packs" className="text-accent hover:underline">open the members area</Link> if you have access.
        </p>
        <div className="mt-4">
          <ButtonLink href="/packs" variant="secondary">All packs</ButtonLink>
        </div>
      </Container>
    </>
  );
}
