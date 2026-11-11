"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Info, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

interface Finding {
  severity: "error" | "warning" | "info";
  message: string;
  line?: number;
}

const SAMPLE = `{% if product.available %}
  <p>{{ product.title }} - {{ product.price | money }}</p>
  {% include 'old-snippet' %}
{% endif %}`;

export function LiquidChecker({ member }: { member: boolean }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; findings: Finding[]; member: boolean; limit: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function check() {
    setBusy(true);
    setErr(null);
    setResult(null);
    try {
      const res = await fetch("/api/tools/liquid-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) setErr(data.error ?? "Check failed");
      else setResult(data);
    } catch {
      setErr("Network error - try again.");
    } finally {
      setBusy(false);
    }
  }

  const icons = {
    error: <XCircle aria-hidden className="mt-0.5 size-4 shrink-0 text-red-400" />,
    warning: <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0 text-amber-400" />,
    info: <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-sky-400" />,
  };

  return (
    <>
      <PageHeader
        title="Liquid syntax checker"
        description="Paste any Shopify Liquid - get parse errors and best-practice warnings instantly. Free, no signup, code never stored."
        crumbs={[{ label: "Tools" }, { label: "Liquid checker" }]}
      />
      <Container className="py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-line bg-ink-900/70 p-5">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              placeholder="{% if product.available %} ... {% endif %}"
              className="h-64 w-full resize-y rounded-xl border border-line-strong bg-ink-950 p-4 font-mono text-sm text-fg outline-none placeholder:text-subtle focus:border-accent"
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={check}
                disabled={busy || !code.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:brightness-110 disabled:opacity-50"
              >
                {busy ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <ShieldCheck aria-hidden className="size-4" />}
                Check Liquid
              </button>
              <button
                onClick={() => setCode(SAMPLE)}
                className="text-sm font-medium text-accent hover:underline"
              >
                Load sample
              </button>
              <span className="ml-auto text-xs text-subtle">
                {member ? "Member limits" : "Free limits"}: {member ? "120 checks/hour" : "20 checks/hour"}
              </span>
            </div>
          </div>

          {err && (
            <p className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">{err}</p>
          )}

          {result && (
            <div className="mt-6 rounded-2xl border border-line bg-ink-900/70 p-5">
              <div className="flex items-center gap-3">
                {result.ok ? (
                  <>
                    <CheckCircle2 aria-hidden className="size-6 text-emerald-400" />
                    <div>
                      <p className="font-display text-lg font-semibold text-emerald-300">No syntax errors</p>
                      <p className="text-sm text-muted">The Liquid parses cleanly{result.findings.length ? ` - ${result.findings.length} suggestion${result.findings.length === 1 ? "" : "s"} below` : ""}.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle aria-hidden className="size-6 text-red-400" />
                    <div>
                      <p className="font-display text-lg font-semibold text-red-300">Syntax error found</p>
                      <p className="text-sm text-muted">Fix the error below - the rest of the file may still parse after it.</p>
                    </div>
                  </>
                )}
              </div>
              {result.findings.length > 0 && (
                <ul className="mt-5 space-y-2.5">
                  {result.findings.map((f, i) => (
                    <li key={i} className="flex gap-3 rounded-xl border border-line bg-ink-950/60 px-4 py-3 text-sm">
                      {icons[f.severity]}
                      <div>
                        <p className="text-fg">{f.message}</p>
                        {f.line ? <p className="mt-0.5 font-mono text-xs text-subtle">line {f.line}</p> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <p className="mt-8 text-center text-xs text-subtle">
            Checks run server-side with LiquidJS - your code is parsed, never stored or logged. Members get 6x the
            hourly limit. Want deeper checks? The{" "}
            <a href="/playground" className="text-accent hover:underline">playground</a> renders snippets live.
          </p>
        </div>
      </Container>
    </>
  );
}
