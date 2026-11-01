import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { SnippetViewer } from "@/components/library/snippet-viewer";
import { requireAccess } from "@/lib/auth";
import { getPublishedSnippet, listCategories } from "@/lib/snippets";
import { buildPreviewDoc } from "@/lib/snippet-utils";

export const metadata: Metadata = { title: "Snippet", robots: { index: false } };

export default async function SnippetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireAccess(`/access/liquid-library/${slug}`);
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
        <div className="mb-5 flex flex-wrap gap-2">
          <Badge>{category}</Badge>
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
        {snippet.source && <p className="mt-4 text-xs text-subtle">Source: {snippet.source}</p>}
      </Container>
    </>
  );
}
