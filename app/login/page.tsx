import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";
import { getUser, safeNext } from "@/lib/auth";
import { loginAction } from "@/app/auth-actions";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const sp = await searchParams;
  const next = safeNext(sp.next, "/dashboard");
  if (await getUser()) redirect(next);
  return (
    <AuthCard title="Sign in" subtitle="Member & staff sign-in for GPLMart.">
      {sp.error && (
        <p role="alert" className="mb-4 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm">
          That confirmation link is invalid or expired. Please sign in again.
        </p>
      )}
      <AuthForm action={loginAction} mode="login" next={next} />
      <p className="mt-4 text-center text-sm text-muted">
        <Link href="/forgot-password" className="text-accent hover:underline">Forgot password?</Link>
        {" · "}
        Paid but no account yet? Use the email from your order - your account is created automatically on payment.
      </p>
    </AuthCard>
  );
}
