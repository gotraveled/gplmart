import data from "./course-lessons.json";

export interface CourseBlock {
  p?: string;
  h?: string;
  list?: string[];
  code?: { code: string; lang: "liquid" | "css" | "js" | "text" };
}

export interface CourseLesson {
  module: string;
  slug: string;
  title: string;
  excerpt: string;
  readMin: number;
  blocks: CourseBlock[];
}

/** Hand-written + pipeline-generated lessons, newest appended by generate-daily.mjs. */
export const courseLessons: readonly CourseLesson[] = data as CourseLesson[];

export function getLesson(moduleSlug: string, lessonSlug: string): CourseLesson | undefined {
  return courseLessons.find((l) => l.module === moduleSlug && l.slug === lessonSlug);
}

export function lessonsForModule(moduleSlug: string): CourseLesson[] {
  return courseLessons.filter((l) => l.module === moduleSlug);
}
