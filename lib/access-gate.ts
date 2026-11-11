import "server-only";
import { createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { accessPassword } from "@/lib/env";
import { getUser, hasActiveEntitlement } from "@/lib/auth";

const COOKIE = "gpl_access";

function token(): string {
  return createHmac("sha256", accessPassword()).update("gpl-access-v1").digest("hex");
}

/**
 * Member access = shared-password cookie OR a signed-in user with an active
 * all-access entitlement. The cookie path covers OTP/password-area legacy
 * access; the session path covers dashboard accounts created at checkout.
 */
export async function hasAccess(): Promise<boolean> {
  if (accessPassword()) {
    const store = await cookies();
    if (store.get(COOKIE)?.value === token()) return true;
  }
  const user = await getUser();
  if (!user) return false;
  return hasActiveEntitlement(user.id);
}

/** Constant work regardless of outcome. */
export function verifyAccessPassword(input: string): boolean {
  const pw = accessPassword();
  if (!pw) return false;
  return input === pw;
}

export async function grantAccess(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
