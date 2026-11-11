"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import type { AuthState } from "@/app/auth-actions";

const input =
  "h-11 w-full rounded-xl border border-line-strong bg-ink-900 px-3 text-sm text-fg placeholder:text-subtle";

export function AuthForm({
  action,
  mode,
  next,
}: {
  action: (prev: AuthState, fd: FormData) => Promise<AuthState>;
  mode: "login" | "signup" | "email" | "reset";
  next: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const labels = {
    login: "Sign in",
    signup: "Create account",
    email: "Send reset link",
    reset: "Set new password",
  } as const;
  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={input} />
      </div>
      {mode !== "email" && (
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
            {mode === "reset" ? "New password" : "Password"}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={mode === "signup" || mode === "reset" ? 8 : undefined}
            required
            className={input}
          />
        </div>
      )}
      {mode === "reset" && (
        <div>
          <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium">
            Confirm password
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            className={input}
          />
        </div>
      )}
      {state.error && (
        <p role="alert" className="rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100">
          {state.error}
        </p>
      )}
      {state.notice && (
        <p role="status" className="rounded-lg border border-mint/30 bg-mint/10 p-3 text-sm text-fg">
          {state.notice}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Please wait…" : labels[mode]}
      </Button>
    </form>
  );
}
