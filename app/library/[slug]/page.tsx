import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/env";
import { getPublicSnippet, listCategories } from "@/lib/snippets";
import { buildPreviewDoc } from "@/lib/snippet-utils";
import { formatOfferPrice } from "@/lib/offer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isSupabaseConfigured()) return { title: "Resource" };
  const s = await getPublicSnippet(slug);
  if (!s) return { title: "Resource" };
  return { title: s.title, description: s.description, alternates: { canonical: `/library/${s.slug}` } };
}

export default async function PublicResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSupabaseConfigured()) notFound();
  const [snippet, categories] = await Promise.all([getPublicSnippet(slug), listCategories()]);
  if (!snippet) notFound();
  const category = categories.find((c) => c.slug === snippet.category_slug)?.name ?? snippet.category_slug;

  return (
    <>
      <PageHeader
        title={snippet.title}
        description={snippet.description}
        crumbs={[{ label: "Library", href: "/library" }, { label: snippet.title }]}
      />
      <Container className="py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          <Badge>{category}</Badge>
          {snippet.version && <Badge>v{snippet.version}</Badge>}
          {snippet.compatibility && <Badge>{snippet.compatibility}</Badge>}
          {snippet.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0">
            {snippet.preview_html ? (
              <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900">
                <p className="border-b border-line px-4 py-2.5 text-xs font-medium text-muted">Illustrative preview</p>
                <iframe
                  title={`${snippet.title} preview`}
                  sandbox=""
                  srcDoc={buildPreviewDoc(snippet.preview_html)}
                  className="h-72 w-full bg-white"
                  referrerPolicy="no-referrer"
                />
                <p className="border-t border-line px-4 py-2 text-xs text-subtle">
                  Static rendering of typical output. Scripts and network access are blocked in this frame.
                </p>
              </div>
            ) : (
              <div className="grid place-items-center rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center">
                <p className="text-sm text-muted">No preview is published for this resource yet.</p>
              </div>
            )}

            {snippet.documentation && (
              <div className="mt-6 rounded-2xl border border-line bg-ink-900/60 p-5">
                <h2 className="font-display text-base font-semibold">Install notes</h2>
                <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{snippet.documentation}</p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-line-strong bg-ink-900 p-6 lg:sticky lg:top-24">
            <LockKeyhole aria-hidden className="size-6 text-accent" />
            <h2 className="mt-3 font-display text-lg font-semibold">Source code &amp; download</h2>
            <p className="mt-2 text-sm text-muted">
              The Liquid source, file name and download are available to members in the Liquid library.
            </p>
            <ButtonLink href="/checkout" className="mt-5 w-full">
              Unlock with all-access &mdash; {formatOfferPrice()}
            </ButtonLink>
            <ButtonLink href={`/access/liquid-library/${snippet.slug}`} variant="secondary" className="mt-2.5 w-full">
              Already a member? Open it <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <p className="mt-4 text-xs text-subtle">One-time payment. Access stays linked to your account.</p>
          </aside>
        </div>
      </Container>
    </>
  );
}
