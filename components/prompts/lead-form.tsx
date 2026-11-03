"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const fieldCls =
  "w-full rounded-lg border border-line-strong bg-ink-950/70 px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none";

const messages: Record<string, string> = {
  invalid_email: "That email doesn't look right - check it and retry.",
  rate_limited: "Too many attempts. Please wait a few minutes.",
  save_failed: "Could not save - try again in a moment.",
};

export function LeadForm() {
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
        body: JSON.stringify({ email, source: "prompts" }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(messages[data.error ?? ""] ?? "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-mint/30 bg-mint/[0.06] p-6">
      <div className="flex items-center gap-2">
        <Mail aria-hidden className="size-5 text-mint" />
        <h2 className="font-display text-lg font-semibold">Get new prompts by email</h2>
      </div>
      <p className="mt-1.5 text-sm text-muted">
        We email new prompt packs, snippet drops and bundle additions - no spam, unsubscribe anytime.
      </p>
      {done ? (
        <p role="status" className="mt-4 flex items-center gap-2 rounded-lg border border-mint/30 bg-mint/10 p-3.5 text-sm font-medium">
          <Check aria-hidden className="size-4 text-mint" /> You&apos;re in. New drops land in your inbox first.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldCls}
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={200}
          />
          <Button type="submit" disabled={busy} className="shrink-0">
            {busy ? "Saving…" : "Notify me"} <ArrowRight aria-hidden className="size-4" />
          </Button>
        </form>
      )}
      {error && (
        <p role="alert" className="mt-3 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100">
          {error}
        </p>
      )}
    </div>
  );
}
