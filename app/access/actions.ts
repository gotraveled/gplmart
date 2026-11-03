"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { grantAccess, verifyAccessPassword } from "@/lib/access-gate";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function unlockAccess(prev: { error?: string } | undefined, formData: FormData): Promise<{ error?: string }> {
  const ip = clientIp(await headers());
  if (!rateLimit(`access:${ip}`, 10, 10 * 60_000)) return { error: "Too many attempts. Try again in a few minutes." };
  const password = String(formData.get("password") ?? "");
  if (!verifyAccessPassword(password)) return { error: "Incorrect password." };
  await grantAccess();
  redirect("/access");
}
