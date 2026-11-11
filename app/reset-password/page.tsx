import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";
import { getUser } from "@/lib/auth";
import { resetPasswordAction } from "@/app/auth-actions";

export const metadata: Metadata = { title: "Set new password", robots: { index: false } };

export default async function ResetPasswordPage() {
  const user = await getUser();
  return (
    <AuthCard
      title="Set a new password"
      subtitle={user ? `Signed in as ${user.email} - choose a new password.` : "This link is invalid or expired - request a fresh one."}
    >
      {user ? (
        <AuthForm action={resetPasswordAction} mode="reset" next="/dashboard" />
      ) : (
        <p className="text-center">
          <Link href="/forgot-password" className="text-sm font-medium text-accent hover:underline">
            Request a new reset link
          </Link>
        </p>
      )}
    </AuthCard>
  );
}
