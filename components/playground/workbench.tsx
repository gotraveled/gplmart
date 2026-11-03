"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Monitor, Smartphone, Tablet, BookOpen, Lock, X } from "lucide-react";
import { examples, freeExampleIds, getExample } from "@/lib/playground/examples";
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

function Card({ ex, onPick }: { ex: PlaygroundExample; onPick: (id: string) => void }) {
  const free = freeExampleIds.has(ex.id);
  return (
    <button
      type="button"
      onClick={() => onPick(ex.id)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-900/70 text-left transition hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="pointer-events-none relative h-36 overflow-hidden border-b border-line bg-[#eef1e6]">
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-full scale-[0.55]">
            <ExamplePreview id={ex.id} values={ex.defaults} />
          </div>
        </div>
        {!free && (
          <span className="absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-lg border border-line-strong bg-ink-900/90">
            <Lock aria-hidden className="size-3.5 text-accent" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge className="px-1.5 py-0 text-[0.6rem]">{ex.kind === "section" ? "Section" : "Snippet"}</Badge>
          <Badge className="px-1.5 py-0 text-[0.6rem]">{ex.category}</Badge>
          <Badge className={cn("px-1.5 py-0 text-[0.6rem]", free ? "border-mint/40 bg-mint/10 text-mint" : "text-subtle")}>
            {free ? "Free" : "Members"}
          </Badge>
        </div>
        <h3 className="mt-2.5 font-display text-sm font-semibold group-hover:text-accent">{ex.name}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs text-muted">{ex.description}</p>
      </div>
    </button>
  );
}

export function Workbench({ initialId }: { initialId?: string }) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(initialId ? getExample(initialId).id : null);
  const ex = useMemo(() => (id ? examples.find((e) => e.id === id) ?? null : null), [id]);
  const [values, setValues] = useState<Values>(ex?.defaults ?? {});
  const [tab, setTab] = useState("liquid");
  const [device, setDevice] = useState<(typeof devices)[number]["id"]>("full");
  const [darkCanvas, setDarkCanvas] = useState(false);
  const [view, setView] = useState<"preview" | "code">("preview");

  const locked = ex ? !freeExampleIds.has(ex.id) : false;
  const files = useMemo(() => (ex ? ex.files(values) : null), [ex, values]);
  const tabs = useMemo(() => (ex && files ? fileTabs(ex, files) : []), [ex, files]);
  const active = tabs.find((t) => t.id === tab) ?? tabs[0];
  const width = devices.find((d) => d.id === device)!.width;

  function pick(next: string) {
    const nextEx = examples.find((e) => e.id === next);
    if (!nextEx) return;
    setId(next);
    setValues(nextEx.defaults);
    setTab("liquid");
    router.replace(`/playground?example=${encodeURIComponent(next)}`, { scroll: false });
  }

  function back() {
    setId(null);
    router.replace("/playground", { scroll: false });
  }

  // Modal behaviour: Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!ex) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") back();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ex?.id]);

  const [category, setCategory] = useState<string>("all");

  const free = examples.filter((e) => freeExampleIds.has(e.id));
  const members = examples.filter((e) => !freeExampleIds.has(e.id));
  const categoryOrder = ["Product page", "Cart & checkout", "Trust & social proof", "Headers & navigation", "Content", "Marketing", "SEO & performance", "Utility"];
  const categories = [
    ...categoryOrder.filter((c) => members.some((e) => e.category === c)),
    ...[...new Set(members.map((e) => e.category))].filter((c) => !categoryOrder.includes(c)),
  ];
  const filtered = category === "all" ? null : examples.filter((e) => e.category === category);
  const grid = (
    <div>
      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={() => setCategory("all")}
          aria-pressed={category === "all"}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition",
            category === "all" ? "border-accent bg-accent text-ink-950" : "border-line-strong text-muted hover:border-accent/50 hover:text-fg",
          )}
        >
          All {examples.length}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            aria-pressed={category === cat}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              category === cat ? "border-accent bg-accent text-ink-950" : "border-line-strong text-muted hover:border-accent/50 hover:text-fg",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered ? (
        <section>
          <h2 className="mb-5 flex items-baseline gap-3 font-display text-2xl font-semibold text-accent">
            {category}
            <span className="text-sm font-normal text-subtle">{filtered.length}</span>
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => (
              <li key={e.id}>
                <Card ex={e} onPick={pick} />
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="grid gap-10">
          <section>
            <h2 className="mb-5 flex items-baseline gap-3 font-display text-2xl font-semibold text-accent">
              Free samples - copy the code
              <span className="text-sm font-normal text-subtle">{free.length}</span>
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {free.map((e) => (
                <li key={e.id}>
                  <Card ex={e} onPick={pick} />
                </li>
              ))}
            </ul>
          </section>
          {categories.map((cat) => {
            const items = members.filter((e) => e.category === cat);
            return (
              <section key={cat}>
                <h2 className="mb-5 flex items-baseline gap-3 font-display text-2xl font-semibold text-accent">
                  {cat}
                  <span className="text-sm font-normal text-subtle">{items.length}</span>
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((e) => (
                    <li key={e.id}>
                      <Card ex={e} onPick={pick} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );

  if (!ex) return grid;

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

  const lockedPanel = (
    <div className="grid min-h-[26rem] place-items-center p-8 text-center">
      <div className="max-w-xs">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10">
          <Lock aria-hidden className="size-5 text-accent" />
        </span>
        <h3 className="mt-4 font-display text-lg font-semibold">Members-only code</h3>
        <p className="mt-2 text-sm text-muted">
          The preview works freely - the Liquid source, CSS, JS and downloads unlock with all-access.
        </p>
        <Link
          href="/checkout"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-strong"
        >
          Unlock all snippets
        </Link>
        <p className="mt-3 text-xs text-subtle">{freeExampleIds.size} examples are free - this one is in the members set.</p>
      </div>
    </div>
  );

  const codePanel = locked ? (
    lockedPanel
  ) : (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2">
        <div role="tablist" aria-label="Files" className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active?.id === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                active?.id === t.id ? "bg-white/10 text-fg" : "text-muted hover:text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <CopyButton text={active?.code ?? ""} label="Copy file" />
      </div>
      <p className="border-b border-line px-4 py-1.5 font-mono text-[0.7rem] text-subtle">{active?.filename}</p>
      <CodeBlock code={active?.code ?? ""} lang={active?.lang ?? "liquid"} maxHeight="30rem" lineNumbers />
    </div>
  );

  return (
    <>
      {grid}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${ex.name} detail`}
        className="fixed inset-0 z-[70] overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-sm sm:p-8"
        onClick={back}
      >
        <div
          className="mx-auto max-w-6xl rounded-2xl border border-line-strong bg-ink-950 shadow-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="sticky top-0 z-40 flex items-center justify-between gap-3 rounded-t-2xl border-b border-line bg-ink-950 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 flex-wrap items-center gap-2.5">
              <h2 className="font-display text-lg font-semibold">{ex.name}</h2>
              <Badge>{ex.kind === "section" ? "Theme section" : "Snippet"}</Badge>
              {locked ? (
                <Badge className="text-subtle">
                  <Lock aria-hidden className="size-3" /> Members
                </Badge>
              ) : (
                <Badge className="border-mint/40 bg-mint/10 text-mint">Free</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <select
                aria-label="Switch component"
                value={id ?? ""}
                onChange={(e) => pick(e.target.value)}
                className="hidden rounded-lg border border-line-strong bg-ink-900 px-2.5 py-1.5 text-xs sm:block"
              >
                {examples.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={back}
                aria-label="Close detail view"
                className="grid size-9 place-items-center rounded-lg border border-line-strong text-muted transition hover:border-accent/50 hover:text-fg"
              >
                <X aria-hidden className="size-4.5" />
              </button>
            </div>
          </div>

          {/* Modal body */}
          <div className="p-4 sm:p-5">
        <p className="mb-4 text-sm text-muted">{ex.description}</p>

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
      </div>
    </>
  );
}
