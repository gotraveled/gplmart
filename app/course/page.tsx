import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, GraduationCap, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { courses } from "@/lib/course";
import { courseLessons, lessonsForCourse } from "@/lib/course-lessons";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = {
  title: "Courses - Shopify Store, Liquid & Facebook Ads | GPLMart",
  description:
    "Free courses on GPLMart: build a Shopify store from zero, master Liquid development, and run profitable Facebook ads. Lessons unlock fully for members.",
  alternates: { canonical: "/course" },
};

export default function CourseCatalogPage() {
  const totalMin = courseLessons.reduce((s, l) => s + l.readMin, 0);

  return (
    <>
      <PageHeader
        title="Courses"
        description="Structured learning paths - preview every lesson free, full content for members. New lessons publish weekly."
        crumbs={[{ label: "Courses" }]}
      />
      <Container className="py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-center">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-accent">
            <GraduationCap aria-hidden className="size-4" /> {courseLessons.length} lessons live · ~{totalMin} min · growing weekly
          </p>
          <p className="mt-2 text-sm text-muted">
            Preview any lesson free - full lessons, code downloads and all resources are included in all-access membership.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {courses.map((c) => {
            const lessons = lessonsForCourse(c.slug);
            const mins = lessons.reduce((s, l) => s + l.readMin, 0);
            return (
              <div key={c.slug} className="flex flex-col rounded-2xl border border-line bg-ink-900/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">{c.audience}</p>
                <h2 className="mt-2 font-display text-xl font-semibold">
                  <Link href={`/course/${c.slug}`} className="hover:text-accent">{c.title}</Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.description}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-subtle">
                  <span className="inline-flex items-center gap-1"><BookOpen aria-hidden className="size-3.5" /> {lessons.length} lessons</span>
                  <span className="inline-flex items-center gap-1"><Clock aria-hidden className="size-3.5" /> ~{mins} min</span>
                </div>
                <Link
                  href={`/course/${c.slug}`}
                  className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-line-strong px-4 py-2.5 text-sm font-semibold transition hover:border-accent/50 hover:text-accent"
                >
                  View course <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-accent/30 bg-accent/[0.06] p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">Members get the full course + everything else</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
            Full lesson content, the complete Liquid library, snippet packs, digital products, ebooks and the AI
            prompt pack - one payment, no subscription.
          </p>
          <ButtonLink href="/checkout" className="mt-6">
            Get all-access &mdash; {formatOfferPrice()} <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-subtle">
            <Lock aria-hidden className="size-3.5" /> Lesson previews are free - full content requires membership
          </p>
        </div>
      </Container>
    </>
  );
}
