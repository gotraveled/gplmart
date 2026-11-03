"use client";

import { useState } from "react";
import { CheckCircle2, HelpCircle, Search, TriangleAlert } from "lucide-react";
import { checkTheme, os2Steps, vintageSteps, type ThemeResult } from "@/lib/themes";

const fieldCls =
  "w-full rounded-lg border border-line-strong bg-ink-950/70 px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none";

export function ThemeChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ThemeResult | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    setResult(checkTheme(input));
  }

  return (
    <div className="rounded-2xl border border-accent/30 bg-gradient-to-b from-ink-800 to-ink-900 p-6 shadow-card">
      <h2 className="font-display text-lg font-semibold">Check your theme</h2>
      <p className="mt-1.5 text-sm text-muted">
        Type your theme&apos;s name (e.g. Dawn, Impulse, Prestige) or paste its Shopify theme-store link. We check
        it against known themes and give install steps for that specific theme.
      </p>
      <form onSubmit={check} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={fieldCls}
          placeholder="Dawn, Impulse, themes.shopify.com/themes/prestige…"
          maxLength={120}
        />
        <button
          type="submit"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:brightness-110"
        >
          <Search aria-hidden className="size-4" /> Check
        </button>
      </form>
      <p className="mt-2.5 text-xs text-subtle">
        Don&apos;t know your theme name? Online Store &gt; Themes shows it under the live theme - or ask us on
        WhatsApp.
      </p>

      {result && (
        <div className="mt-6 border-t border-line pt-6">
          {result.status === "os2" && result.theme && (
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 aria-hidden className="size-4 text-mint" />
                {result.theme.name} - fully compatible (Online Store 2.0)
              </p>
              {result.theme.note && <p className="mt-2 text-xs text-muted">{result.theme.note}</p>}
              <ol className="mt-4 space-y-2.5">
                {os2Steps(result.theme).map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm text-muted">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/20 text-[0.65rem] font-semibold text-accent">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {result.status === "vintage" && result.theme && (
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <TriangleAlert aria-hidden className="size-4 text-amber-400" />
                {result.theme.name} - older vintage theme, install still works but the path is different
              </p>
              {result.theme.note && <p className="mt-2 text-xs text-muted">{result.theme.note}</p>}
              <ol className="mt-4 space-y-2.5">
                {vintageSteps(result.theme).map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm text-muted">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-amber-400/20 text-[0.65rem] font-semibold text-amber-200">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {result.status === "unknown" && (
            <div className="rounded-xl border border-line bg-ink-950/60 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <HelpCircle aria-hidden className="size-4 text-mint" />
                Theme not in our database - that doesn&apos;t mean it&apos;s incompatible
              </p>
              <p className="mt-2 text-xs text-muted">
                Most Shopify themes sold after 2022 are OS 2.0 and work with every GPLMart snippet. Tell us the
                theme name on WhatsApp and we&apos;ll confirm - or use the general OS 2.0 steps below; they work
                for any modern theme.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
