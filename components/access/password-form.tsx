"use client";

import { useActionState, useState } from "react";
import { KeyRound, Mail } from "lucide-react";
import { requestAccessCode, unlockAccess, verifyAccessCode } from "@/app/access/actions";
import { Button } from "@/components/ui/button";

const inputCls =
  "w-full rounded-lg border border-line-strong bg-ink-950/70 px-3.5 py-2.5 text-center text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none";

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p role="alert" className="rounded-lg border border-rose-400/30 bg-rose-400/10 p-2.5 text-xs text-rose-100">
      {msg}
    </p>
  );
}

function EmailStep() {
  const [state, action, pending] = useActionState(requestAccessCode, undefined);
  const [verify, verifyAction, verifying] = useActionState(verifyAccessCode, undefined);
  const [email, setEmail] = useState("");

  if (state?.sent) {
    return (
      <form action={verifyAction} className="mt-5 grid gap-3">
        <p className="rounded-lg border border-mint/30 bg-mint/10 p-2.5 text-xs">
          Code sent. Check your inbox (and spam) for a 6-digit code.
        </p>
        <input type="hidden" name="email" value={email} />
        <input
          type="text"
          name="code"
          required
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="6-digit code"
          aria-label="6-digit code"
          className={inputCls}
        />
        <Err msg={verify?.error} />
        <Button type="submit" size="lg" disabled={verifying}>
          <Mail aria-hidden className="size-4" /> {verifying ? "Verifying…" : "Unlock access"}
        </Button>
      </form>
    );
  }

  return (
    <form action={action} className="mt-5 grid gap-3">
      <input
        id="access-email"
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        placeholder="Email you paid with"
        aria-label="Email you paid with"
        className={inputCls}
      />
      <Err msg={state?.error} />
      <Button type="submit" size="lg" disabled={pending}>
        <Mail aria-hidden className="size-4" /> {pending ? "Sending…" : "Send access code"}
      </Button>
    </form>
  );
}

function PasswordStep() {
  const [state, action, pending] = useActionState(unlockAccess, undefined);
  return (
    <details className="mt-5 text-left">
      <summary className="cursor-pointer text-xs text-subtle hover:text-muted">Have a shared access password instead?</summary>
      <form action={action} className="mt-3 grid gap-3">
        <input
          type="password"
          name="password"
          required
          autoComplete="off"
          placeholder="Access password"
          aria-label="Access password"
          className={inputCls}
        />
        <Err msg={state?.error} />
        <Button type="submit" variant="secondary" disabled={pending}>
          <KeyRound aria-hidden className="size-4" /> {pending ? "Checking…" : "Unlock with password"}
        </Button>
      </form>
    </details>
  );
}

export function PasswordForm() {
  return (
    <div>
      <EmailStep />
      <PasswordStep />
    </div>
  );
}
