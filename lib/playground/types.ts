export type Values = Record<string, string | boolean>;

export type ControlDef =
  | { id: string; label: string; type: "text"; maxLength?: number }
  | { id: string; label: string; type: "color" }
  | { id: string; label: string; type: "select"; options: readonly { value: string; label: string }[] }
  | { id: string; label: string; type: "toggle" };

export interface ExampleFiles {
  liquid: string;
  css?: string;
  js?: string;
  usage?: string;
}

export interface InstallStep {
  text: string;
}

export interface PlaygroundExample {
  id: string;
  name: string;
  description: string;
  category: string;
  /** "section" files go in /sections; "snippet" files go in /snippets and are rendered. */
  kind: "section" | "snippet";
  controls: readonly ControlDef[];
  defaults: Values;
  files: (v: Values) => ExampleFiles;
  install: readonly string[];
}
