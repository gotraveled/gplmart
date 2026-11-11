import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthForm } from "@/components/auth/auth-form";
import { forgotPasswordAction } from "@/app/auth-actions";

export const metadata: Metadata = { title: "Forgot password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Reset your password" subtitle="Enter your account email and we'll send a reset link.">
      <AuthForm action={forgotPasswordAction} mode="email" next="/reset-password" />
      <p className="mt-4 text-center text-sm text-muted">
        Remembered it? <Link href="/login" className="text-accent hover:underline">Sign in</Link>
      </p>
    </AuthCard>
  );
}
