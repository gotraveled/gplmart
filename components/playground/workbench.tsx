"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Monitor, Smartphone, Tablet, BookOpen } from "lucide-react";
import { examples, getExample } from "@/lib/playground/examples";
import type { ControlDef, ExampleFiles, PlaygroundExample, Values } from "@/lib/playground/types";
import type { Lang } from "@/lib/highlight";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from "@/components/ui/copy-button";
import { Badge } from "@/components/ui/badge";
import { ExamplePreview } from "./previews";
import { cn } from "@/lib/cn";

interface FileTab {
  id: string;
  label: string;
  filename: string;
  code: string;
  lang: Lang;
}

function fileTabs(ex: PlaygroundExample, files: ExampleFiles): FileTab[] {
  const dir = ex.kind === "section" ? "sections" : "snippets";
  const tabs: FileTab[] = [
    { id: "liquid", label: "Liquid", filename: `${dir}/${ex.id}.liquid`, code: files.liquid, lang: "liquid" },
  ];
  if (files.css) tabs.push({ id: "css", label: "CSS", filename: `assets/gpl-${ex.id}.css`, code: files.css, lang: "css" });
  if (files.js) tabs.push({ id: "js", label: "JS", filename: `assets/gpl-${ex.id}.js`, code: files.js, lang: "js" });
  if (files.usage) tabs.push({ id: "usage", label: "Usage", filename: "usage.liquid", code: files.usage, lang: "liquid" });
  return tabs;
}

function Field({ def, value, onChange }: { def: ControlDef; value: string | boolean; onChange: (v: string | boolean) => void }) {
  const id = `ctl-${def.id}`;
  const base = "w-full rounded-lg border border-line-strong bg-ink-950/70 px-3 py-2 text-sm text-fg";
  if (def.type === "toggle") {
    return (
      <label htmlFor={id} className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-line-strong bg-ink-950/70 px-3 py-2 text-sm">
        <span>{def.label}</span>
        <input
          id={id}
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
          className="size-4 accent-[#c8f542]"
        />
      </label>
    );
  }
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-muted">
        {def.label}
      </label>
      {def.type === "select" ? (
        <select id={id} value={String(value)} onChange={(e) => onChange(e.target.value)} className={base}>
          {def.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : def.type === "color" ? (
        <div className="flex items-center gap-2">
          <input
            id={id}
            type="color"
            value={/^#[0-9a-f]{6}$/i.test(String(value)) ? String(value) : "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-12 cursor-pointer rounded-md border border-line-strong bg-transparent"
          />
          <span className="font-mono text-xs text-subtle">{String(value)}</span>
        </div>
      ) : (
        <input
          id={id}
          type="text"
          value={String(value)}
          maxLength={def.maxLength ?? 80}
          onChange={(e) => onChange(e.target.value)}
          className={base}
        />
      )}
    </div>
  );
}

const devices = [
  { id: "mobile", icon: Smartphone, label: "Mobile width", width: "24rem" },
  { id: "tablet", icon: Tablet, label: "Tablet width", width: "44rem" },
  { id: "full", icon: Monitor, label: "Full width", width: "100%" },
] as const;

export function Workbench({ initialId }: { initialId?: string }) {
  const router = useRouter();
  const [id, setId] = useState(getExample(initialId).id);
  const ex = useMemo(() => examples.find((e) => e.id === id) ?? examples[0]!, [id]);
  const [values, setValues] = useState<Values>(ex.defaults);
  const [tab, setTab] = useState("liquid");
  const [device, setDevice] = useState<(typeof devices)[number]["id"]>("full");
  const [darkCanvas, setDarkCanvas] = useState(false);
  const [view, setView] = useState<"preview" | "code">("preview");

  const files = useMemo(() => ex.files(values), [ex, values]);
  const tabs = useMemo(() => fileTabs(ex, files), [ex, files]);
  const active = tabs.find((t) => t.id === tab) ?? tabs[0]!;
  const width = devices.find((d) => d.id === device)!.width;

  function pick(next: string) {
    const nextEx = examples.find((e) => e.id === next);
    if (!nextEx) return;
    setId(next);
    setValues(nextEx.defaults);
    setTab("liquid");
    router.replace(`/playground?example=${encodeURIComponent(next)}`, { scroll: false });
  }

  function setValue(ctl: string, v: string | boolean) {
    setValues((prev) => ({ ...prev, [ctl]: v }));
  }

  const previewPanel = (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <div className="flex gap-1" role="group" aria-label="Preview width">
          {devices.map(({ id: d, icon: Icon, label }) => (
            <button
              key={d}
              type="button"
              onClick={() => setDevice(d)}
              aria-pressed={device === d}
              title={label}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-lg transition",
                device === d ? "bg-white/10 text-accent" : "text-muted hover:text-fg",
              )}
            >
              <Icon aria-hidden className="size-4" />
            </button>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            checked={darkCanvas}
            onChange={(e) => setDarkCanvas(e.target.checked)}
            className="size-3.5 accent-[#c8f542]"
          />
          Dark theme canvas
        </label>
      </div>
      <div className={cn("overflow-auto p-4 sm:p-6", darkCanvas ? "bg-[#12160f]" : "bg-[#eef1e6]")}>
        <div className="mx-auto overflow-hidden rounded-lg border border-black/10 shadow-card transition-[max-width] duration-300" style={{ maxWidth: width }}>
          <ExamplePreview id={ex.id} values={values} className={darkCanvas ? "bg-[#1a2015] text-neutral-100" : undefined} />
        </div>
        <p className="mt-3 text-center text-xs text-subtle">
          Approximate rendering. Your theme&apos;s fonts, colours and base styles will apply on the storefront.
        </p>
      </div>
    </div>
  );

  const codePanel = (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2">
        <div role="tablist" aria-label="Files" className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active.id === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                active.id === t.id ? "bg-white/10 text-fg" : "text-muted hover:text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CopyButton text={active.code} label="Copy file" />
      </div>
      <p className="border-b border-line px-4 py-1.5 font-mono text-[0.7rem] text-subtle">{active.filename}</p>
      <CodeBlock code={active.code} lang={active.lang} maxHeight="30rem" lineNumbers />
    </div>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
      {/* Example selector */}
      <div>
        <label htmlFor="example-select" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-mint lg:sr-only">
          Choose an example
        </label>
        <select
          id="example-select"
          value={id}
          onChange={(e) => pick(e.target.value)}
          className="w-full rounded-xl border border-line-strong bg-ink-900 px-3 py-2.5 text-sm lg:hidden"
        >
          {examples.map((e) => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
        <nav aria-label="Playground examples" className="sticky top-24 hidden lg:block">
          <ul className="space-y-1">
            {examples.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => pick(e.id)}
                  aria-current={e.id === id ? "true" : undefined}
                  className={cn(
                    "w-full rounded-xl border px-3.5 py-2.5 text-left text-sm transition",
                    e.id === id
                      ? "border-accent/50 bg-accent/10 text-fg"
                      : "border-transparent text-muted hover:border-line-strong hover:bg-white/[0.03] hover:text-fg",
                  )}
                >
                  <span className="block font-medium">{e.name}</span>
                  <span className="mt-0.5 block text-xs text-subtle">{e.category}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="min-w-0">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold">{ex.name}</h2>
            <p className="mt-1 text-sm text-muted">{ex.description}</p>
          </div>
          <Badge>{ex.kind === "section" ? "Theme section" : "Snippet"}</Badge>
        </div>

        {/* Mobile view toggle */}
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl border border-line-strong bg-ink-900 p-1 lg:hidden">
          {(["preview", "code"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn("rounded-lg py-2 text-sm font-medium capitalize transition", view === v ? "bg-white/10 text-fg" : "text-muted")}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className={cn("overflow-hidden rounded-2xl border border-line-strong bg-ink-900", view === "code" && "max-lg:hidden")}>
            {previewPanel}
          </div>
          <div className={cn("overflow-hidden rounded-2xl border border-line-strong bg-ink-900", view === "preview" && "max-lg:hidden")}>
            {codePanel}
          </div>
        </div>

        {/* Section settings */}
        <div className="mt-6 rounded-2xl border border-line-strong bg-ink-900">
          <h3 className="border-b border-line px-4 py-3 text-sm font-semibold">Settings</h3>
          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
            {ex.controls.map((ctl) => (
              <Field key={ctl.id} def={ctl} value={values[ctl.id] ?? ""} onChange={(v) => setValue(ctl.id, v)} />
            ))}
          </div>
          <p className="border-t border-line px-4 py-2.5 text-xs text-subtle">
            These controls mirror how the snippet reads theme settings or render parameters on a real store.
          </p>
        </div>

        {/* Install guide */}
        <details className="group mt-6 rounded-2xl border border-line-strong bg-ink-900">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            <BookOpen aria-hidden className="size-4 text-mint" />
            How to add this to your theme
            <span aria-hidden className="ml-auto text-muted transition group-open:rotate-90">&#9656;</span>
          </summary>
          <ol className="grid gap-3 border-t border-line px-4 py-4 text-sm text-muted sm:px-6">
            {ex.install.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[0.7rem] font-semibold text-accent">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </details>

        <p className="mt-5 text-xs text-subtle">
          File name shown: <code className="font-mono">{ex.kind === "section" ? "sections" : "snippets"}/{ex.id}.liquid</code>
          {" "}&middot; These are GPLMart&apos;s original teaching examples, not the paid library. They are provided as-is for learning.
        </p>
      </div>
    </div>
  );
}
