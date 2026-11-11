import type { ControlDef, ExampleFiles, PlaygroundExample, Values } from "./types";
import data from "./generated-examples.json";

/**
 * AI-generated examples, appended by scripts/generate-daily.mjs (daily GitHub
 * Action) as JSON entries. File contents use [[control_id]] placeholders that
 * are filled from playground values at render time - [[ ]] cannot collide
 * with Liquid's {{ }} syntax.
 *
 * Every entry is validated by validate-snippets.mjs + runtime-test.mjs (and
 * browser-test.mjs when a browser is available) before it is committed;
 * failed generations are dropped, never published.
 */

interface GenEntry {
  id: string;
  name: string;
  description: string;
  category: string;
  controls?: ControlDef[];
  defaults?: Values;
  install?: string[];
  liquid: string;
  css?: string;
  js?: string;
  usage?: string;
}

const DEFAULT_INSTALL = [
  "Back up your theme (Online Store > Themes > Actions > Duplicate) before changing any code.",
  "Create a new snippet file with the name shown above and paste the complete file - markup, styles and script are inside it.",
  "Render it where you want it using the usage tag shown, or add the 'As section' variant from the theme editor.",
  "Preview the storefront and test on a phone-sized screen before publishing.",
];

const fill = (tpl: string | undefined, v: Values, d: Values): string | undefined =>
  tpl?.replace(/\[\[\s*([a-z0-9_]+)\s*\]\]/g, (_m, id: string) => {
    const val = v[id] ?? d[id] ?? "";
    return typeof val === "boolean" ? (val ? "true" : "") : String(val);
  });

export const generatedExamples: readonly PlaygroundExample[] = (data as GenEntry[]).map((e) => {
  const defaults = e.defaults ?? {};
  return {
    id: e.id,
    name: e.name,
    description: e.description,
    category: e.category,
    kind: "snippet",
    controls: e.controls ?? [],
    defaults,
    install: e.install?.length ? e.install : DEFAULT_INSTALL,
    files: (v: Values): ExampleFiles => {
      const files: ExampleFiles = { liquid: fill(e.liquid, v, defaults) ?? "" };
      const css = fill(e.css, v, defaults);
      const jsCode = fill(e.js, v, defaults);
      const usage = fill(e.usage, v, defaults);
      if (css) files.css = css;
      if (jsCode) files.js = jsCode;
      if (usage) files.usage = usage;
      return files;
    },
  };
});
