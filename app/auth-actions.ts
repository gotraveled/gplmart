"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { safeNext } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createSessionClient } from "@/lib/supabase/server";

export interface AuthState {
  error?: string;
  notice?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function guard(kind: string): Promise<string | null> {
  if (!isSupabaseConfigured()) return "Sign-in is not configured yet.";
  const h = await headers();
  if (!rateLimit(`${kind}:${clientIp(h)}`, 10, 10 * 60_000)) return "Too many attempts. Please wait a few minutes and try again.";
  return null;
}

function read(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
    next: safeNext(formData.get("next")),
  };
}

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const blocked = await guard("login");
  if (blocked) return { error: blocked };
  const { email, password, next } = read(formData);
  if (!EMAIL.test(email) || !password) return { error: "Enter your email and password." };
  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Incorrect email or password, or the email is not confirmed yet." };
  redirect(next);
}

export async function signupAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const blocked = await guard("signup");
  if (blocked) return { error: blocked };
  const { email, password, next } = read(formData);
  if (!EMAIL.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) return { error: "Use a password of at least 8 characters." };
  const origin = (await headers()).get("origin") ?? "";
  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
  });
  if (error) return { error: "Could not create the account. Try signing in if you already registered." };
  if (data.session) redirect(next);
  return { notice: "Check your email to confirm your account, then sign in." };
}

export async function signOutAction() {
  if (isSupabaseConfigured()) await (await createSessionClient()).auth.signOut();
  redirect("/");
}
