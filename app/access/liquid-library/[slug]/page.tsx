import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { SnippetViewer } from "@/components/library/snippet-viewer";
import { getPublishedSnippet, listCategories } from "@/lib/snippets";
import { buildPreviewDoc } from "@/lib/snippet-utils";

export const metadata: Metadata = { title: "Snippet", robots: { index: false } };

export default async function SnippetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [snippet, categories] = await Promise.all([getPublishedSnippet(slug), listCategories()]);
  if (!snippet) notFound();
  const category = categories.find((c) => c.slug === snippet.category_slug)?.name ?? snippet.category_slug;

  return (
    <>
      <PageHeader
        title={snippet.title}
        description={snippet.description}
        crumbs={[
          { label: "Resource hub", href: "/access" },
          { label: "Liquid library", href: "/access/liquid-library" },
          { label: snippet.title },
        ]}
      />
      <Container className="py-10">
        {snippet.is_demo && (
          <p className="mb-5 rounded-lg border border-line bg-ink-950/60 p-3 text-sm text-muted">Demo snippet: an original example from the GPLMart library.</p>
        )}
        <div className="mb-5 flex flex-wrap gap-2">
          <Badge>{category}</Badge>
          {snippet.version && <Badge>v{snippet.version}</Badge>}
          {snippet.compatibility && <Badge>{snippet.compatibility}</Badge>}
          {snippet.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <SnippetViewer
          code={snippet.code}
          filename={snippet.filename}
          previewDoc={snippet.preview_html ? buildPreviewDoc(snippet.preview_html) : ""}
          downloadHref={`/access/liquid-library/${snippet.slug}/download`}
        />
        {snippet.documentation && (
          <div className="mt-6 rounded-2xl border border-line bg-ink-900/60 p-5">
            <h2 className="font-display text-base font-semibold">Install notes</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{snippet.documentation}</p>
          </div>
        )}
        {snippet.source && <p className="mt-4 text-xs text-subtle">Source: {snippet.source}</p>}
      </Container>
    </>
  );
}
