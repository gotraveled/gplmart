import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { course } from "@/lib/course";
import { lessonsForModule } from "@/lib/course-lessons";

interface Props {
  params: Promise<{ module: string }>;
}

export function generateStaticParams() {
  return course.modules.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: slug } = await params;
  const mod = course.modules.find((m) => m.slug === slug);
  if (!mod) return {};
  return {
    title: `${mod.title} - ${course.title} | GPLMart`,
    description: mod.summary,
    alternates: { canonical: `/course/${mod.slug}` },
  };
}

export default async function CourseModulePage({ params }: Props) {
  const { module: slug } = await params;
  const mod = course.modules.find((m) => m.slug === slug);
  if (!mod) notFound();
  const lessons = lessonsForModule(mod.slug);
  const idx = course.modules.findIndex((m) => m.slug === mod.slug);
  const next = course.modules[idx + 1];

  return (
    <>
      <PageHeader
        title={mod.title}
        description={mod.summary}
        crumbs={[{ label: "Course", href: "/course" }, { label: mod.title }]}
      />
      <Container className="py-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-lg font-semibold">What you&apos;ll be able to do</h2>
          <ul className="mt-4 space-y-2">
            {mod.outcomes.map((o) => (
              <li key={o} className="flex gap-2.5 text-sm text-muted">
                <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mint" /> {o}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-display text-lg font-semibold">Lessons</h2>
          {lessons.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-line-strong px-5 py-8 text-center text-sm text-muted">
              Lessons for this module are being written - check back soon, or start with the foundations module.
            </p>
          ) : (
            <ol className="mt-4 space-y-2">
              {lessons.map((l, i) => (
                <li key={l.slug}>
                  <Link
                    href={`/course/${mod.slug}/${l.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-ink-900/60 px-5 py-4 transition hover:border-accent/50"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 font-display text-sm font-semibold group-hover:text-accent">
                        <BookOpen aria-hidden className="size-4 shrink-0 text-subtle" /> {l.title}
                      </p>
                      <p className="mt-0.5 line-clamp-1 text-xs text-muted">{l.excerpt}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-xs text-subtle">
                      <Clock aria-hidden className="size-3" /> {l.readMin} min
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}

          {next && (
            <div className="mt-10 flex justify-end">
              <Link href={`/course/${next.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                Next: {next.title} <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
