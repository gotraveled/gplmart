import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, GraduationCap, Lock, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/course";
import { courseLessons, lessonsForCourse } from "@/lib/course-lessons";
import { formatOfferPrice } from "@/lib/offer";
import { CourseNotifyForm } from "@/components/courses/notify-form";

export const metadata: Metadata = {
  title: "All Courses - Shopify, WordPress & AI | GPLMart",
  description:
    "Browse every GPLMart course: Shopify basic to advanced, Liquid snippets, India & international dropshipping, Facebook ads, plus upcoming WordPress and AI website courses. Preview lessons free.",
  alternates: { canonical: "/courses" },
};

const TRACKS = [
  { key: "shopify", title: "Shopify Courses", blurb: "Store building, Liquid development, dropshipping and ads." },
  { key: "wordpress", title: "WordPress Courses", blurb: "Sites, WooCommerce, plugins and ecommerce - launching soon." },
  { key: "ai", title: "AI Courses", blurb: "Build websites with AI - launching soon." },
] as const;

const LEVEL_STYLE: Record<string, string> = {
  Beginner: "text-sky-300 border-sky-400/30",
  Intermediate: "text-amber-300 border-amber-400/30",
  Advanced: "text-violet-300 border-violet-400/30",
};

export default function CoursesPage() {
  const totalMin = courseLessons.reduce((s, l) => s + l.readMin, 0);
  const live = courses.filter((c) => c.status === "live");
  const soon = courses.filter((c) => c.status === "coming-soon");

  return (
    <>
      <PageHeader
        title="All Courses"
        description="Structured learning paths for store owners, developers and marketers. Preview every lesson free - full content for members."
        crumbs={[{ label: "Courses" }]}
      />
      <Container className="py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-center">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-accent">
            <GraduationCap aria-hidden className="size-4" /> {courseLessons.length} lessons live · ~{totalMin} min · new lessons weekly
          </p>
          <p className="mt-2 text-sm text-muted">
            {live.length} courses live · {soon.length} more coming · full lessons included in all-access membership.
          </p>
        </div>

        {TRACKS.map((track) => {
          const list = courses.filter((c) => c.track === track.key);
          if (!list.length) return null;
          return (
            <section key={track.key} className="mt-12">
              <h2 className="font-display text-2xl font-semibold">{track.title}</h2>
              <p className="mt-1 text-sm text-muted">{track.blurb}</p>
              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {list.map((c) => {
                  const lessons = lessonsForCourse(c.slug);
                  const mins = lessons.reduce((s, l) => s + l.readMin, 0);
                  const coming = c.status === "coming-soon";
                  return (
                    <div
                      key={c.slug}
                      className={`flex flex-col rounded-2xl border p-6 ${coming ? "border-dashed border-line-strong opacity-80" : "border-line bg-ink-900/60"}`}
                    >
                      <div className="flex items-center gap-2">
                        <Badge>{c.level}</Badge>
                        {coming ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-0.5 text-[0.7rem] font-medium text-subtle">
                            <Sparkles aria-hidden className="size-3" /> Coming soon
                          </span>
                        ) : (
                          <span className={`rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium ${LEVEL_STYLE[c.level]}`}>{c.level}</span>
                        )}
                      </div>
                      <h3 className="mt-3 font-display text-lg font-semibold">
                        {coming ? c.title : (
                          <Link href={`/course/${c.slug}`} className="hover:text-accent">{c.title}</Link>
                        )}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-subtle">
                        <span className="inline-flex items-center gap-1"><BookOpen aria-hidden className="size-3.5" /> {lessons.length} lessons</span>
                        {mins > 0 && <span className="inline-flex items-center gap-1"><Clock aria-hidden className="size-3.5" /> ~{mins} min</span>}
                        <span className="inline-flex items-center gap-1"><Lock aria-hidden className="size-3" /> members</span>
                      </div>
                      {coming ? (
                        <CourseNotifyForm slug={c.slug} />
                      ) : (
                        <Link
                          href={`/course/${c.slug}`}
                          className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-line-strong px-4 py-2.5 text-sm font-semibold transition hover:border-accent/50 hover:text-accent"
                        >
                          View course <ArrowRight aria-hidden className="size-4" />
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        <div className="mt-14 rounded-2xl border border-accent/30 bg-accent/[0.06] p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">One membership, every course</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            Full lesson content across all courses, the complete Liquid library, snippet packs, digital products,
            ebooks and the AI prompt pack - one payment, no subscription.
          </p>
          <Link href="/checkout" className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition hover:brightness-110">
            Get all-access &mdash; {formatOfferPrice()} <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </Container>
    </>
  );
}
