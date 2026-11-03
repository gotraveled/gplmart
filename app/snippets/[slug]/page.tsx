import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Code2, FlaskConical, LockKeyhole } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { ButtonLink } from "@/components/ui/button";
import { ExamplePreview } from "@/components/playground/previews";
import { examples, freeExampleIds } from "@/lib/playground/examples";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, codeJsonLd, jsonLdPayload } from "@/lib/seo";
import { snippetBenefits, snippetHook } from "@/lib/snippet-copy";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return examples.map((e) => ({ slug: e.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const ex = examples.find((e) => e.id === slug);
  if (!ex) return {};
  const free = freeExampleIds.has(ex.id);
  const kindWord = ex.kind === "section" ? "Section" : "Snippet";
  const title = `${ex.name} - ${free ? "Free " : ""}Shopify Liquid ${kindWord} Code`;
  const description = `${ex.description} ${free ? "Copy the complete Liquid, CSS and JS source free" : "Preview it live - members get the complete source"} - paste into any OS 2.0 Shopify theme, no app needed.`;
  return {
    title,
    description,
    alternates: { canonical: `/snippets/${ex.id}` },
    openGraph: { title, description, url: absoluteUrl(`/snippets/${ex.id}`), type: "article" },
  };
}

export default async function SnippetPage({ params }: Params) {
  const { slug } = await params;
  const ex = examples.find((e) => e.id === slug);
  if (!ex) notFound();

  const free = freeExampleIds.has(ex.id);
  const files = ex.files(ex.defaults);
  const related = examples.filter((e) => e.category === ex.category && e.id !== ex.id).slice(0, 6);
  const fileName = `${ex.id}.liquid`;

  const jsonLd = jsonLdPayload(
    codeJsonLd({ id: ex.id, name: ex.name, description: ex.description, kind: ex.kind, code: files.liquid }),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Snippets", url: "/snippets" },
      { name: ex.name, url: `/snippets/${ex.id}` },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <PageHeader
        title={ex.name}
        description={snippetHook(ex)}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Snippets", href: "/snippets" },
          { label: ex.name },
        ]}
      />
      <Container className="py-10">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{ex.category}</Badge>
          <Badge>{ex.kind === "section" ? "Theme section" : "Theme snippet"}</Badge>
          {free ? (
            <Badge className="border-mint/40 bg-mint/10 text-mint">Free to copy</Badge>
          ) : (
            <Badge className="border-line-strong text-subtle">
              <LockKeyhole aria-hidden className="size-3" /> Members source
            </Badge>
          )}
          <Badge>OS 2.0 themes</Badge>
        </div>

        {/* Live preview */}
        <div className="mt-6 rounded-2xl border border-line bg-white text-black">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-3 text-xs text-black/50">
            <span className="flex items-center gap-1.5">
              <FlaskConical aria-hidden className="size-3.5" /> Live preview
            </span>
            <ButtonLink href={`/playground?example=${ex.id}`} variant="secondary" className="!text-black">
              Customize in playground
            </ButtonLink>
          </div>
          <div className="p-6">
            <ExamplePreview id={ex.id} values={ex.defaults} />
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            {/* Install */}
            <h2 className="font-display text-xl font-semibold">How to install on your store</h2>
            <ol className="mt-4 space-y-3">
              {ex.install.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-xs font-semibold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>

            {/* Code */}
            <div className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">
                  <Code2 aria-hidden className="mr-2 inline size-5 text-accent" />
                  {fileName}
                </h2>
                {free && <Badge className="border-mint/40 bg-mint/10 text-mint">Complete source</Badge>}
              </div>
              {free ? (
                <div className="mt-4 space-y-4">
                  <CodeBlock code={files.liquid} lang="liquid" lineNumbers />
                  {files.css && <CodeBlock code={files.css} lang="css" />}
                  {files.js && <CodeBlock code={files.js} lang="js" />}
                  {files.usage && (
                    <div className="rounded-xl border border-line bg-ink-900/60 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Usage</p>
                      <code className="mt-2 block text-sm text-accent">{files.usage}</code>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative mt-4">
                  <div className="pointer-events-none select-none overflow-hidden rounded-xl border border-line opacity-40 blur-[2px]" aria-hidden>
                    <CodeBlock code={files.liquid.split("\n").slice(0, 14).join("\n")} lang="liquid" />
                  </div>
                  <div className="absolute inset-0 grid place-items-center rounded-xl bg-ink-950/60">
                    <div className="text-center">
                      <LockKeyhole aria-hidden className="mx-auto size-6 text-accent" />
                      <p className="mt-2 max-w-xs text-sm font-medium">Full source is for members</p>
                      <p className="mt-1 text-xs text-muted">One payment - every snippet, guide and bundle</p>
                      <ButtonLink href="/checkout" className="mt-4">
                        Get all-access
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: related + CTA */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
              <h3 className="font-display text-sm font-semibold">Why this component</h3>
              <ul className="mt-3 space-y-2.5 text-sm text-muted">
                {snippetBenefits(ex).map((b) => (
                  <li key={b} className="flex gap-2"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-mint" /> {b}</li>
                ))}
              </ul>
            </div>
            {related.length > 0 && (
              <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
                <h3 className="font-display text-sm font-semibold">More {ex.category.toLowerCase()}</h3>
                <ul className="mt-3 space-y-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link href={`/snippets/${r.id}`} className="group flex items-center justify-between gap-2 text-sm text-muted transition hover:text-fg">
                        <span>{r.name}</span>
                        <ArrowRight aria-hidden className="size-3.5 shrink-0 text-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/snippets" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  Browse all {examples.length} snippets <ArrowRight aria-hidden className="size-3" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </>
  );
}
