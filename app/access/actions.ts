"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { grantAccess, verifyAccessPassword } from "@/lib/access-gate";
import { isSupabaseConfigured } from "@/lib/env";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/admin";
import { createSessionClient } from "@/lib/supabase/server";

export interface AccessState {
  error?: string;
  sent?: boolean;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function unlockAccess(prev: AccessState | undefined, formData: FormData): Promise<AccessState> {
  const ip = clientIp(await headers());
  if (!rateLimit(`access:${ip}`, 10, 10 * 60_000)) return { error: "Too many attempts. Try again in a few minutes." };
  const password = String(formData.get("password") ?? "");
  if (!verifyAccessPassword(password)) return { error: "Incorrect password." };
  await grantAccess();
  redirect("/access");
}

/** Sends a one-time code, but only to an email that already has a PAID order. */
export async function requestAccessCode(prev: AccessState | undefined, formData: FormData): Promise<AccessState> {
  const ip = clientIp(await headers());
  if (!rateLimit(`otp-send:${ip}`, 8, 10 * 60_000)) return { error: "Too many attempts. Try again in a few minutes." };
  if (!isSupabaseConfigured()) return { error: "Access is not configured yet." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 120);
  if (!emailRe.test(email)) return { error: "Enter a valid email address." };

  const { data: order } = await createServiceClient()
    .from("orders")
    .select("id")
    .ilike("customer_email", email)
    .eq("status", "paid")
    .limit(1)
    .maybeSingle();
  if (!order) return { error: "No purchase found for this email. Check the address you paid with." };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
  if (error) {
    console.error("otp send failed", error.message);
    return { error: "Could not send the code right now. Please try again." };
  }
  return { sent: true };
}

export async function verifyAccessCode(prev: AccessState | undefined, formData: FormData): Promise<AccessState> {
  const ip = clientIp(await headers());
  if (!rateLimit(`otp-verify:${ip}`, 15, 10 * 60_000)) return { error: "Too many attempts. Try again in a few minutes." };
  if (!isSupabaseConfigured()) return { error: "Access is not configured yet." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 120);
  const token = String(formData.get("code") ?? "").trim();
  if (!emailRe.test(email) || !/^\d{6}$/.test(token)) return { error: "Enter the 6-digit code from your email." };

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) return { error: "That code is invalid or expired. Request a fresh one." };

  await grantAccess();
  redirect("/access");
}
