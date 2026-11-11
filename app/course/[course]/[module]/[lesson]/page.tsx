import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Lock } from "lucide-react";
import { InfoPage } from "@/components/ui/info-page";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { ButtonLink } from "@/components/ui/button";
import { hasAccess } from "@/lib/access-gate";
import { getCourse, getModule } from "@/lib/course";
import { getLesson, lessonsForModule, type CourseBlock } from "@/lib/course-lessons";
import { formatOfferPrice } from "@/lib/offer";

interface Props {
  params: Promise<{ course: string; module: string; lesson: string }>;
}

const PREVIEW_BLOCKS = 2;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { course: c, module: m, lesson: l } = await params;
  const lesson = getLesson(c, m, l);
  if (!lesson) return {};
  return {
    title: `${lesson.title} | GPLMart Course`,
    description: lesson.excerpt,
    alternates: { canonical: `/course/${c}/${m}/${l}` },
    // Lesson bodies are member content - index the title/excerpt only.
    robots: { index: true, follow: true },
  };
}

function VideoEmbed({ url, title }: { url: string; title: string }) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  const src = yt ? `https://www.youtube.com/embed/${yt[1]}` : vimeo ? `https://player.vimeo.com/video/${vimeo[1]}` : null;
  if (src) {
    return (
      <div className="not-prose my-6 aspect-video overflow-hidden rounded-2xl border border-line">
        <iframe src={src} title={title} className="size-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </div>
    );
  }
  return (
    <p className="not-prose my-6">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{title}</a>
    </p>
  );
}

function Blocks({ blocks }: { blocks: CourseBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
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
          {b.img && (
            <figure className="not-prose my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.img.src} alt={b.img.alt} className="w-full rounded-2xl border border-line" loading="lazy" />
              {b.img.caption && <figcaption className="mt-2 text-center text-xs text-subtle">{b.img.caption}</figcaption>}
            </figure>
          )}
          {b.code && <CodeBlock code={b.code.code} lang={b.code.lang} lineNumbers />}
        </div>
      ))}
    </>
  );
}

export default async function CourseLessonPage({ params }: Props) {
  const { course: courseSlug, module: moduleSlug, lesson: lessonSlug } = await params;
  const lesson = getLesson(courseSlug, moduleSlug, lessonSlug);
  const course = getCourse(courseSlug);
  const mod = getModule(courseSlug, moduleSlug);
  if (!lesson || !course || !mod) notFound();

  const member = await hasAccess();
  const siblings = lessonsForModule(courseSlug, moduleSlug);
  const idx = siblings.findIndex((x) => x.slug === lessonSlug);
  const prev = siblings[idx - 1];
  const next = siblings[idx + 1];
  const hiddenCount = Math.max(0, lesson.blocks.length - PREVIEW_BLOCKS);

  return (
    <InfoPage title={lesson.title} description={lesson.excerpt}>
      <p className="not-prose -mt-2 mb-6 flex flex-wrap items-center gap-2 text-sm text-subtle">
        <Badge>{course.title}</Badge>
        <Link href={`/course/${course.slug}/${mod.slug}`} className="text-accent hover:underline">{mod.title}</Link>
        <span className="inline-flex items-center gap-1">
          <Clock aria-hidden className="size-3.5" /> {lesson.readMin} min read
        </span>
        <span>Lesson {idx + 1} of {siblings.length}</span>
      </p>

      {lesson.video && <VideoEmbed url={lesson.video.url} title={lesson.video.title} />}

      <Blocks blocks={lesson.blocks.slice(0, PREVIEW_BLOCKS)} />

      {!member && hiddenCount > 0 && (
        <div className="not-prose relative mt-8 overflow-hidden rounded-2xl border border-accent/30">
          <div className="bg-ink-900/80 p-8 text-center backdrop-blur-sm">
            <Lock aria-hidden className="mx-auto size-7 text-accent" />
            <h2 className="mt-3 font-display text-xl font-semibold">This lesson continues for members</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              {hiddenCount} more section{hiddenCount === 1 ? "" : "s"} - the full lesson with all code, diagrams and
              examples. Included in all-access membership.
            </p>
            <ButtonLink href="/checkout" className="mt-5">
              Unlock with all-access &mdash; {formatOfferPrice()}
            </ButtonLink>
            <p className="mt-3 text-xs text-subtle">Already a member? <Link href="/access" className="text-accent hover:underline">Sign in to the members area</Link></p>
          </div>
        </div>
      )}

      {member && <Blocks blocks={lesson.blocks.slice(PREVIEW_BLOCKS)} />}

      <div className="not-prose mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        {prev ? (
          <Link href={`/course/${course.slug}/${moduleSlug}/${prev.slug}`} className="text-sm font-medium text-muted hover:text-accent">
            ← {prev.title}
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/course/${course.slug}/${moduleSlug}/${next.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
            {next.title} <ArrowRight aria-hidden className="size-4" />
          </Link>
        ) : (
          <Link href={`/course/${course.slug}/${moduleSlug}`} className="text-sm font-medium text-accent hover:underline">
            Back to module
          </Link>
        )}
      </div>
    </InfoPage>
  );
}
