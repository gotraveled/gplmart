import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";
import { getUser, safeNext } from "@/lib/auth";
import { signupAction } from "@/app/auth-actions";

export const metadata: Metadata = { title: "Create account", robots: { index: false } };

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next, "/checkout");
  if (await getUser()) redirect(next);
  return (
    <AuthCard title="Create your account" subtitle="You need an account so your access stays linked to you.">
      <AuthForm action={signupAction} mode="signup" next={next} />
      <p className="mt-6 text-sm text-muted">
        Already registered?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="text-cyan underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}
