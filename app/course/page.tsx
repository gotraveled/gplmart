import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { course } from "@/lib/course";
import { courseLessons, lessonsForModule } from "@/lib/course-lessons";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: `${course.title} - Free Shopify Liquid Course`,
  description: course.description,
  alternates: { canonical: "/course" },
};

export default function CoursePage() {
  const totalMin = courseLessons.reduce((s, l) => s + l.readMin, 0);

  return (
    <>
      <PageHeader
        title={course.title}
        description={course.tagline}
        crumbs={[{ label: "Course" }]}
      />
      <Container className="py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-center">
          <p className="text-sm font-medium text-accent">Free course - lessons publish weekly</p>
          <p className="mt-2 text-sm text-muted">
            {courseLessons.length} lessons live now · ~{totalMin} min of reading · new lessons every week
          </p>
        </div>

        <ol className="mt-10 space-y-6">
          {course.modules.map((m, i) => {
            const lessons = lessonsForModule(m.slug);
            return (
              <li key={m.slug} className="rounded-2xl border border-line bg-ink-900/60 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
                      Module {i + 1}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold">
                      <Link href={`/course/${m.slug}`} className="hover:text-accent">{m.title}</Link>
                    </h2>
                    <p className="mt-2 text-sm text-muted">{m.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {m.outcomes.map((o) => (
                        <li key={o} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted">
                          <CheckCircle2 aria-hidden className="size-3 text-mint" /> {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-display text-2xl font-semibold text-accent">{lessons.length}</p>
                    <p className="text-xs text-subtle">lesson{lessons.length === 1 ? "" : "s"}</p>
                    <Link href={`/course/${m.slug}`} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                      Open <ArrowRight aria-hidden className="size-4" />
                    </Link>
                  </div>
                </div>
                {lessons.length > 0 && (
                  <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
                    {lessons.map((l) => (
                      <li key={l.slug}>
                        <Link href={`/course/${m.slug}/${l.slug}`} className="group flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition hover:bg-white/[0.03]">
                          <BookOpen aria-hidden className="size-4 shrink-0 text-subtle group-hover:text-accent" />
                          <span className="flex-1 font-medium group-hover:text-accent">{l.title}</span>
                          <span className="inline-flex items-center gap-1 text-xs text-subtle">
                            <Clock aria-hidden className="size-3" /> {l.readMin} min
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-12 rounded-2xl border border-accent/30 bg-accent/[0.06] p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">The course teaches on real code</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            Every lesson references production patterns - and the full snippet library, packs, products and ebooks are
            included in all-access membership. One payment, lifetime library access.
          </p>
          <ButtonLink href="/checkout" className="mt-6">
            Get all-access &mdash; {formatOfferPrice()} <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
