import "server-only";
import { createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { accessPassword } from "@/lib/env";

const COOKIE = "gpl_access";

function token(): string {
  return createHmac("sha256", accessPassword()).update("gpl-access-v1").digest("hex");
}

/** True when the shared access password is configured and the visitor holds a valid cookie. */
export async function hasAccess(): Promise<boolean> {
  if (!accessPassword()) return false;
  const store = await cookies();
  return store.get(COOKIE)?.value === token();
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
