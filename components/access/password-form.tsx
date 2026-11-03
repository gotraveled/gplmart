"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { unlockAccess } from "@/app/access/actions";
import { Button } from "@/components/ui/button";

export function PasswordForm() {
  const [state, action, pending] = useActionState(unlockAccess, undefined);
  return (
    <form action={action} className="mt-5 grid gap-3">
      <input
        type="password"
        name="password"
        required
        autoComplete="off"
        placeholder="Access password"
        aria-label="Access password"
        className="w-full rounded-lg border border-line-strong bg-ink-950/70 px-3.5 py-2.5 text-center text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none"
      />
      {state?.error && (
        <p role="alert" className="rounded-lg border border-rose-400/30 bg-rose-400/10 p-2.5 text-xs text-rose-100">
          {state.error}
        </p>
      )}
      <Button type="submit" size="lg" disabled={pending}>
        <Lock aria-hidden className="size-4" /> {pending ? "Checking…" : "Unlock access"}
      </Button>
    </form>
  );
}
