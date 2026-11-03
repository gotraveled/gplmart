import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { ButtonLink } from "@/components/ui/button";
import { guides } from "@/lib/guides";
import { formatOfferPrice } from "@/lib/offer";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  return infoMetadata(guide.title, guide.excerpt, `/guides/${guide.slug}`);
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const related = guides.filter((g) => g.slug !== slug).slice(0, 2);

  return (
    <InfoPage title={guide.title} description={guide.excerpt}>
      <p className="not-prose -mt-2 mb-6 flex flex-wrap items-center gap-2 text-sm text-subtle">
        <Badge>{guide.tag}</Badge>
        <span className="inline-flex items-center gap-1">
          <Clock aria-hidden className="size-3.5" /> {guide.readMin} min read
        </span>
        <span>
          {new Date(`${guide.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </p>

      {guide.blocks.map((b, i) => (
        <div key={i}>
          {b.h && <h2>{b.h}</h2>}
          {b.p && <p>{b.p}</p>}
          {b.list && (
            <ul>
              {b.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
          {b.code && <CodeBlock code={b.code.code} lang={b.code.lang} lineNumbers />}
        </div>
      ))}

      {related.length > 0 && (
        <>
          <h2 className="mt-12">More guides</h2>
          <div className="not-prose mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((g) => (
              <a
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="rounded-xl border border-line bg-ink-900/60 p-4 transition hover:border-accent/50"
              >
                <p className="text-xs text-subtle">{g.tag}</p>
                <p className="mt-1 font-display text-sm font-semibold">{g.title}</p>
                <p className="mt-1.5 line-clamp-2 text-xs text-muted">{g.excerpt}</p>
              </a>
            ))}
          </div>
        </>
      )}

      <div className="not-prose mt-12 rounded-2xl border border-accent/30 bg-accent/[0.06] p-6">
        <h2 className="font-display text-lg font-semibold">Build it with the library</h2>
        <p className="mt-1.5 text-sm text-muted">
          The snippets in this guide and 37 more conversion components are in the GPLMart library - one-time{" "}
          {formatOfferPrice()}, no subscription.
        </p>
        <ButtonLink href="/checkout" className="mt-4">
          Get all-access &mdash; {formatOfferPrice()} <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </div>
    </InfoPage>
  );
}
