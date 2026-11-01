"use client";

import { useMemo, useState } from "react";
import { Flame, Package, ShieldCheck, ShoppingCart, Star, Ticket, Timer } from "lucide-react";
import { getExample } from "@/lib/playground/examples";
import type { ExampleFiles } from "@/lib/playground/types";
import type { Lang } from "@/lib/highlight";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from "@/components/ui/copy-button";
import { ExamplePreview } from "@/components/playground/previews";
import { cn } from "@/lib/cn";

const items = [
  { id: "delivery-estimator", label: "Delivery ETA", icon: Package },
  { id: "countdown-timer", label: "Countdown", icon: Timer },
  { id: "star-rating", label: "Star rating", icon: Star },
  { id: "stock-pulse", label: "Stock pulse", icon: Flame },
  { id: "sticky-buy-bar", label: "Buy bar", icon: ShoppingCart },
  { id: "trust-grid", label: "Trust badges", icon: ShieldCheck },
  { id: "coupon-cards", label: "Coupons", icon: Ticket },
] as const;

function tabs(files: ExampleFiles) {
  const t: { id: string; label: string; code: string; lang: Lang }[] = [{ id: "liquid", label: "Liquid", code: files.liquid, lang: "liquid" }];
  if (files.css) t.push({ id: "css", label: "CSS", code: files.css, lang: "css" });
  if (files.js) t.push({ id: "js", label: "JS", code: files.js, lang: "js" });
  if (files.usage) t.push({ id: "usage", label: "Usage", code: files.usage, lang: "liquid" });
  return t;
}

/** Compact liquidritual-style sandbox: component chips -> live preview + code + copy. */
export function HomeSandbox() {
  const [id, setId] = useState<string>(items[0].id);
  const ex = useMemo(() => getExample(id), [id]);
  const files = useMemo(() => ex.files(ex.defaults), [ex]);
  const fileTabs = useMemo(() => tabs(files), [files]);
  const [tab, setTab] = useState("liquid");
  const [view, setView] = useState<"preview" | "code">("preview");
  const active = fileTabs.find((t) => t.id === tab) ?? fileTabs[0]!;

  function pick(next: string) {
    setId(next);
    setTab("liquid");
  }

  const preview = (
    <div className="grid h-full grid-rows-[auto_1fr]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint">Live preview</p>
        <span className="rounded-full border border-line px-2.5 py-0.5 text-[0.65rem] text-subtle">approximate rendering</span>
      </div>
      <div className="overflow-auto bg-[#eef1e6] p-4 sm:p-6">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-black/10 bg-white shadow-card">
          <ExamplePreview id={ex.id} values={ex.defaults} />
        </div>
      </div>
    </div>
  );

  const code = (
    <div className="grid h-full grid-rows-[auto_auto_1fr]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2">
        <div role="tablist" aria-label="Files" className="flex flex-wrap gap-1">
          {fileTabs.map((t) => (
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
        <CopyButton text={active.code} label="Copy" />
      </div>
      <p className="border-b border-line px-4 py-1.5 font-mono text-[0.7rem] text-subtle">
        {ex.kind === "section" ? "sections" : "snippets"}/{ex.id}.liquid
      </p>
      <CodeBlock code={active.code} lang={active.lang} maxHeight="26rem" lineNumbers />
    </div>
  );

  return (
    <div>
      {/* Component chips */}
      <div role="tablist" aria-label="Sandbox components" className="mb-6 flex flex-wrap justify-center gap-2">
        {items.map(({ id: cid, label, icon: Icon }) => (
          <button
            key={cid}
            type="button"
            role="tab"
            aria-selected={cid === id}
            onClick={() => pick(cid)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition",
              cid === id
                ? "border-accent/60 bg-accent/15 text-fg"
                : "border-line-strong bg-white/[0.03] text-muted hover:border-line hover:text-fg",
            )}
          >
            <Icon aria-hidden className={cn("size-4", cid === id ? "text-accent" : "text-subtle")} />
            {label}
          </button>
        ))}
      </div>

      {/* Mobile toggle */}
      <div className="mx-auto mb-4 grid max-w-xs grid-cols-2 gap-1 rounded-xl border border-line-strong bg-ink-900 p-1 lg:hidden">
        {(["preview", "code"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={view === m}
            onClick={() => setView(m)}
            className={cn("rounded-lg py-2 text-sm font-medium capitalize transition", view === m ? "bg-white/10 text-fg" : "text-muted")}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className={cn("min-h-[24rem] overflow-hidden rounded-2xl border border-line-strong bg-ink-900", view === "code" && "max-lg:hidden")}>
          {preview}
        </div>
        <div className={cn("min-h-[24rem] overflow-hidden rounded-2xl border border-line-strong bg-ink-900", view === "preview" && "max-lg:hidden")}>
          {code}
        </div>
      </div>

      <p className="mt-5 text-center text-sm text-subtle">
        Install in under a minute: Theme editor &rarr; Custom Liquid &rarr; paste &rarr; save.{" "}
        <a href="/playground" className="font-medium text-accent hover:underline">
          Open the full playground &rarr;
        </a>
      </p>
    </div>
  );
}
