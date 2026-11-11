import type { Metadata } from "next";
import { Download, Package } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { packs, packSnippetCount } from "@/lib/packs";

export const metadata: Metadata = { title: "Snippet packs", robots: { index: false } };

export default function MemberPacksPage() {
  return (
    <>
      <PageHeader
        title="Snippet packs"
        description="Curated snippet bundles - download each pack as a zip of ready-to-paste files."
        crumbs={[{ label: "Resource hub", href: "/access" }, { label: "Packs" }]}
      />
      <Container className="py-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {packs.map((p) => (
            <li key={p.slug} className="flex flex-col rounded-2xl border border-line bg-ink-900/60 p-5">
              <div className="flex items-center justify-between">
                <Package aria-hidden className="size-5 text-accent" />
                <span className="text-xs text-subtle">{packSnippetCount(p)} snippets</span>
              </div>
              <h2 className="mt-3 font-display text-base font-semibold">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted">{p.description}</p>
              <a
                href={`/access/packs/${p.slug}/download`}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:brightness-110"
              >
                <Download aria-hidden className="size-4" /> Download zip
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
