import type { Guide } from "./guides";
import data from "./guides-generated.json";

/**
 * AI-generated guides appended by scripts/generate-daily.mjs (daily GitHub
 * Action) as JSON entries. Pure data - validated by typecheck + build.
 */
export const generatedGuides: Guide[] = data as Guide[];
