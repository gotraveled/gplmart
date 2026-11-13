import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/env";
import { createSessionClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/admin";
import { isContentReady } from "@/lib/settings";
import { resolveAccess, type AccessState } from "@/lib/access-rules";

export interface SessionUser {
  id: string;
  email: string;
}

/** Validated with the Supabase Auth server (not just the cookie contents). */
export const getUser = cache(async (): Promise<SessionUser | null> => {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSessionClient();
  const { data } = await supabase.auth.getUser();
  return data.user ? { id: data.user.id, email: data.user.email ?? "" } : null;
});

export function safeNext(value: unknown, fallback = "/admin"): string {
  return typeof value === "string" && /^\/(?![/\\])/.test(value) ? value : fallback;
}

export async function requireUser(next = "/account"): Promise<SessionUser> {
  if (!isSupabaseConfigured()) redirect("/setup-required");
  const user = await getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  return user;
}

export const isAdmin = cache(async (userId: string): Promise<boolean> => {
  const { data } = await createServiceClient().from("admins").select("user_id").eq("user_id", userId).maybeSingle();
  return Boolean(data);
});

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser("/admin");
  if (!(await isAdmin(user.id))) redirect("/");
  return user;
}

const MEMBERSHIP_DAYS = 365;

export async function hasActiveEntitlement(userId: string): Promise<boolean> {
  const { data } = await createServiceClient()
    .from("entitlements")
    .select("id,source,granted_at")
    .eq("user_id", userId)
    .eq("plan", "all_access")
    .eq("status", "active")
    .maybeSingle();
  if (!data) return false;
  // Admin-granted access never expires; paid access runs 12 months from grant.
  if (data.source === "admin") return true;
  const granted = data.granted_at ? new Date(data.granted_at as string).getTime() : 0;
  return Date.now() - granted < MEMBERSHIP_DAYS * 24 * 60 * 60 * 1000;
}

export async function getAccessState(user: SessionUser): Promise<AccessState> {
  const [hasEntitlement, admin, contentReady] = await Promise.all([
    hasActiveEntitlement(user.id),
    isAdmin(user.id),
    isContentReady(),
  ]);
  return resolveAccess({ hasEntitlement, isAdmin: admin, contentReady });
}

/** For protected pages: redirects to sign-in or the offer, or shows the pending page. Returns the user when access is granted. */
export async function requireAccess(next: string): Promise<SessionUser> {
  const user = await requireUser(next);
  const state = await getAccessState(user);
  if (state === "no_entitlement") redirect("/checkout");
  if (state === "content_pending") redirect("/access/pending");
  return user;
}
