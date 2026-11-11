import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { InfoPage } from "@/components/ui/info-page";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { course } from "@/lib/course";
import { getLesson, lessonsForModule } from "@/lib/course-lessons";

interface Props {
  params: Promise<{ module: string; lesson: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { module: m, lesson: l } = await params;
  const lesson = getLesson(m, l);
  if (!lesson) return {};
  const mod = course.modules.find((x) => x.slug === m);
  return {
    title: `${lesson.title} - ${mod?.title ?? course.title} | GPLMart`,
    description: lesson.excerpt,
    alternates: { canonical: `/course/${m}/${l}` },
  };
}

export default async function CourseLessonPage({ params }: Props) {
  const { module: m, lesson: l } = await params;
  const lesson = getLesson(m, l);
  const mod = course.modules.find((x) => x.slug === m);
  if (!lesson || !mod) notFound();

  const siblings = lessonsForModule(m);
  const idx = siblings.findIndex((x) => x.slug === l);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];

  return (
    <InfoPage title={lesson.title} description={lesson.excerpt}>
      <p className="not-prose -mt-2 mb-6 flex flex-wrap items-center gap-2 text-sm text-subtle">
        <Badge>{mod.title}</Badge>
        <Link href={`/course/${m}`} className="text-accent hover:underline">{course.title}</Link>
        <span className="inline-flex items-center gap-1">
          <Clock aria-hidden className="size-3.5" /> {lesson.readMin} min read
        </span>
        <span>Lesson {idx + 1} of {siblings.length}</span>
      </p>

      {lesson.blocks.map((b, i) => (
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

      <div className="not-prose mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        {prev ? (
          <Link href={`/course/${m}/${prev.slug}`} className="text-sm font-medium text-muted hover:text-accent">
            ← {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/course/${m}/${next.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
            {next.title} <ArrowRight aria-hidden className="size-4" />
          </Link>
        ) : (
          <Link href={`/course/${m}`} className="text-sm font-medium text-accent hover:underline">
            Back to module
          </Link>
        )}
      </div>
    </InfoPage>
  );
}
