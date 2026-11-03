import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { hasAccess } from "@/lib/access-gate";
import { PasswordForm } from "@/components/access/password-form";

export default async function AccessLayout({ children }: { children: ReactNode }) {
  if (await hasAccess()) return <>{children}</>;
  return (
    <Container className="grid min-h-[60vh] place-items-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-line-strong bg-ink-900/70 p-8 text-center shadow-card">
        <h1 className="font-display text-2xl font-semibold">Members area</h1>
        <p className="mt-2 text-sm text-muted">
          This page is for customers who purchased all-access. Enter the password you received on WhatsApp after
          your payment.
        </p>
        <PasswordForm />
        <p className="mt-4 text-xs text-subtle">No password yet? Complete a purchase and message us to get access.</p>
      </div>
    </Container>
  );
}
