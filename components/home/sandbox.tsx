"use client";

import { useMemo, useState } from "react";
import {
  BadgePercent,
  BookOpen,
  Clock,
  Code2,
  CreditCard,
  Eye,
  Flame,
  GitCompareArrows,
  Layers,
  Lock,
  MessageSquareQuote,
  Package,
  Play,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Ticket,
  Timer,
  TrendingUp,
} from "lucide-react";
import { examples, freeExampleIds, getExample } from "@/lib/playground/examples";
import type { ExampleFiles } from "@/lib/playground/types";
import type { Lang } from "@/lib/highlight";
import { CodeBlock } from "@/components/ui/code-block";
import { CopyButton } from "@/components/ui/copy-button";
import { ExamplePreview } from "@/components/playground/previews";
import { cn } from "@/lib/cn";

const items = [
  { id: "countdown-timer", label: "Countdown", icon: Timer },
  { id: "star-rating", label: "Star rating", icon: Star },
  { id: "free-shipping-bar", label: "Free ship bar", icon: TrendingUp },
  { id: "trust-grid", label: "Trust grid", icon: ShieldCheck },
  { id: "quantity-breaks", label: "Bundle & save", icon: Layers },
  { id: "delivery-estimator", label: "Delivery ETA", icon: Package },
  { id: "stock-pulse", label: "Stock pulse", icon: Flame },
  { id: "sticky-buy-bar", label: "Buy bar", icon: ShoppingCart },
  { id: "coupon-cards", label: "Coupons", icon: Ticket },
  { id: "benefit-marquee", label: "Marquee", icon: Sparkles },
  { id: "payment-badges", label: "Payment row", icon: CreditCard },
  { id: "sale-badge", label: "Sale badge", icon: BadgePercent },
  { id: "cutoff-timer", label: "Dispatch cutoff", icon: Clock },
  { id: "testimonial-slider", label: "Testimonials", icon: MessageSquareQuote },
  { id: "before-after", label: "Before / after", icon: GitCompareArrows },
  { id: "product-tabs", label: "Info tabs", icon: BookOpen },
] as const;

function tabs(files: ExampleFiles) {
  const t: { id: string; label: string; code: string; lang: Lang }[] = [{ id: "liquid", label: "Liquid", code: files.liquid, lang: "liquid" }];
  if (files.css) t.push({ id: "css", label: "CSS", code: files.css, lang: "css" });
  if (files.js) t.push({ id: "js", label: "JS", code: files.js, lang: "js" });
  if (files.usage) t.push({ id: "usage", label: "Usage", code: files.usage, lang: "liquid" });
  return t;
}

/** liquidritual-style sandbox: chips -> one panel with Preview | Code | Copy. */
export function HomeSandbox() {
  const [id, setId] = useState<string>(items[0].id);
  const ex = useMemo(() => getExample(id), [id]);
  const locked = !freeExampleIds.has(ex.id);
  const files = useMemo(() => ex.files(ex.defaults), [ex]);
  const fileTabs = useMemo(() => tabs(files), [files]);
  const [file, setFile] = useState("liquid");
  const [view, setView] = useState<"preview" | "code">("preview");
  const active = fileTabs.find((t) => t.id === file) ?? fileTabs[0]!;
  const num = String(items.findIndex((i) => i.id === id) + 1).padStart(3, "0");

  function pick(next: string) {
    setId(next);
    setFile("liquid");
  }

  return (
    <div>
      {/* Component chips - free vs members */}
      <div className="mb-7 grid gap-5 sm:grid-cols-2" role="tablist" aria-label="Sandbox components">
        {(
          [
            { title: "Free - full code", items: items.filter((i) => freeExampleIds.has(i.id)) },
            { title: "Members - preview, source locked", items: items.filter((i) => !freeExampleIds.has(i.id)) },
          ] as const
        ).map(({ title, items: group }) => (
          <div key={title} className="rounded-2xl border border-line bg-ink-900/50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">{title}</p>
            <div className="flex flex-wrap gap-2">
              {group.map(({ id: cid, label, icon: Icon }) => (
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
                  {!freeExampleIds.has(cid) && <Lock aria-hidden className="size-3 text-subtle" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-line-strong bg-ink-900 shadow-card">
        {/* Panel header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <p className="font-mono text-[0.72rem] text-subtle">
            <span className="text-mint">#GM-{num}</span> {ex.name}
          </p>
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-2 gap-0.5 rounded-lg border border-line-strong bg-ink-950/70 p-0.5" role="tablist" aria-label="Panel view">
              {(
                [
                  { m: "preview", icon: Eye, label: "Preview" },
                  { m: "code", icon: Code2, label: "Code" },
                ] as const
              ).map(({ m, icon: Icon, label }) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={view === m}
                  onClick={() => setView(m)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-medium transition",
                    view === m ? "bg-accent/15 text-accent" : "text-muted hover:text-fg",
                  )}
                >
                  <Icon aria-hidden className="size-3.5" />
                  {label}
                </button>
              ))}
            </div>
            {!locked && <CopyButton text={view === "code" ? active.code : files.liquid} label="Copy" />}
          </div>
        </div>

        {locked && view === "code" ? (
          <div className="grid min-h-[22rem] place-items-center p-8 text-center">
            <div className="max-w-xs">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl border border-accent/30 bg-accent/10">
                <Lock aria-hidden className="size-5 text-accent" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">Members-only code</h3>
              <p className="mt-2 text-sm text-muted">
                Preview freely - the source unlocks with all-access along with {examples.length}+ more snippets.
              </p>
              <a
                href="/checkout"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-accent-strong"
              >
                Unlock all snippets
              </a>
            </div>
          </div>
        ) : view === "preview" ? (
          <div className="grid min-h-[22rem] place-items-center bg-[#eef1e6] p-5 sm:p-8">
            <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-black/10 bg-white shadow-card">
              <ExamplePreview id={ex.id} values={ex.defaults} />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-1.5">
              <div role="tablist" aria-label="Files" className="flex flex-wrap gap-1">
                {fileTabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active.id === t.id}
                    onClick={() => setFile(t.id)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition",
                      active.id === t.id ? "bg-white/10 text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <p className="font-mono text-[0.68rem] text-subtle">
                {ex.kind === "section" ? "sections" : "snippets"}/{ex.id}.liquid
              </p>
            </div>
            <CodeBlock code={active.code} lang={active.lang} maxHeight="26rem" lineNumbers />
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-subtle">
        Install in under a minute: Theme editor &rarr; Custom Liquid &rarr; paste &rarr; save.{" "}
        <a href="/playground" className="font-medium text-accent hover:underline">
          Open the full playground <Play aria-hidden className="inline size-3" />
        </a>
      </p>
    </div>
  );
}
