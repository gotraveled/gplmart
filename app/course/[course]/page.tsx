import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Clock, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getCourse } from "@/lib/course";
import { lessonsForCourse } from "@/lib/course-lessons";

interface Props {
  params: Promise<{ course: string }>;
}

export function generateStaticParams() {
  // Params come from lib/course.ts courses
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { course: slug } = await params;
  const c = getCourse(slug);
  if (!c) return {};
  return {
    title: `${c.title} - Free Course | GPLMart`,
    description: c.description,
    alternates: { canonical: `/course/${c.slug}` },
  };
}

export default async function CoursePage({ params }: Props) {
  const { course: slug } = await params;
  const c = getCourse(slug);
  if (!c) notFound();
  const lessons = lessonsForCourse(c.slug);
  const totalMin = lessons.reduce((s, l) => s + l.readMin, 0);

  return (
    <>
      <PageHeader
        title={c.title}
        description={c.description}
        crumbs={[{ label: "Courses", href: "/courses" }, { label: c.title }]}
      />
      <Container className="py-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-subtle">
            {c.audience} · {lessons.length} lessons · ~{totalMin} min of content · new lessons weekly
          </p>

          <h2 className="mt-8 font-display text-lg font-semibold">Curriculum</h2>
          {c.status === "coming-soon" || c.modules.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-line-strong px-6 py-12 text-center">
              <p className="font-display text-lg font-semibold">This course is coming soon</p>
              <p className="mt-2 text-sm text-muted">
                We&apos;re writing the full curriculum now - lessons publish weekly. Browse the live courses meanwhile.
              </p>
              <Link href="/courses" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
                Browse all courses <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          ) : (
          <ol className="mt-5 space-y-6">
            {c.modules.map((m, i) => {
              const modLessons = lessons.filter((l) => l.module === m.slug);
              return (
                <li key={m.slug} className="rounded-2xl border border-line bg-ink-900/60 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Module {i + 1}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold">{m.title}</h3>
                      <p className="mt-1.5 text-sm text-muted">{m.summary}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {m.outcomes.map((o) => (
                          <li key={o} className="rounded-full border border-line px-2.5 py-0.5 text-[0.7rem] text-muted">{o}</li>
                        ))}
                      </ul>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-accent">{modLessons.length} lesson{modLessons.length === 1 ? "" : "s"}</span>
                  </div>
                  {modLessons.length > 0 && (
                    <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                      {modLessons.map((l) => (
                        <li key={l.slug}>
                          <Link href={`/course/${c.slug}/${m.slug}/${l.slug}`} className="group flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition hover:bg-white/[0.03]">
                            <BookOpen aria-hidden className="size-4 shrink-0 text-subtle group-hover:text-accent" />
                            <span className="flex-1 font-medium group-hover:text-accent">{l.title}</span>
                            <span className="inline-flex items-center gap-1 text-xs text-subtle">
                              <Clock aria-hidden className="size-3" /> {l.readMin} min
                              <Lock aria-hidden className="size-3 text-subtle/60" />
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
          )}

          <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-center">
            <p className="text-sm text-muted">
              Full lesson content is included in all-access membership - along with the snippet library, packs,
              products and ebooks.
            </p>
            <Link href="/checkout" className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:brightness-110">
              Get all-access <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
