"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/** Compact email capture for coming-soon course cards - posts to /api/leads. */
export function CourseNotifyForm({ slug }: { slug: string }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: `course:${slug}`.slice(0, 40) }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error === "rate_limited" ? "Too many attempts - try later." : "Could not save - try again.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <span className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-mint/40 px-4 py-2.5 text-sm font-semibold text-mint">
        <Check aria-hidden className="size-4" /> We&apos;ll email you
      </span>
    );
  }
  return (
    <form onSubmit={submit} className="mt-5 flex gap-2">
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email for launch alert"
        autoComplete="email"
        maxLength={200}
        className="h-10 w-full min-w-0 rounded-lg border border-line-strong bg-ink-950/70 px-3 text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none"
      />
      <button
        type="submit"
        disabled={busy}
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border border-line-strong px-3.5 text-sm font-semibold transition hover:border-accent/50 hover:text-accent disabled:opacity-60"
      >
        {busy ? "…" : "Notify"} <ArrowRight aria-hidden className="size-3.5" />
      </button>
      {error && <span className="sr-only" role="alert">{error}</span>}
    </form>
  );
}
