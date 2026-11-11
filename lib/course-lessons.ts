import data from "./course-lessons.json";

export interface CourseBlock {
  p?: string;
  h?: string;
  list?: string[];
  code?: { code: string; lang: "liquid" | "css" | "js" | "text" };
  /** Optional image URL (or /images/... path) rendered with a caption. */
  img?: { src: string; alt: string; caption?: string };
}

export interface CourseVideo {
  title: string;
  /** YouTube/Vimeo embed URL or /videos/... path once produced. */
  url: string;
  durationSec?: number;
}

export interface CourseLesson {
  course: string;
  module: string;
  slug: string;
  title: string;
  excerpt: string;
  readMin: number;
  video?: CourseVideo;
  blocks: CourseBlock[];
}

/** Hand-written + pipeline-generated lessons, newest appended by generate-daily.mjs. */
export const courseLessons: readonly CourseLesson[] = data as CourseLesson[];

export function getLesson(courseSlug: string, moduleSlug: string, lessonSlug: string): CourseLesson | undefined {
  return courseLessons.find((l) => l.course === courseSlug && l.module === moduleSlug && l.slug === lessonSlug);
}

export function lessonsForModule(courseSlug: string, moduleSlug: string): CourseLesson[] {
  return courseLessons.filter((l) => l.course === courseSlug && l.module === moduleSlug);
}

export function lessonsForCourse(courseSlug: string): CourseLesson[] {
  return courseLessons.filter((l) => l.course === courseSlug);
}
