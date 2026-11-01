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

export function safeNext(value: unknown, fallback = "/account"): string {
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
  if (!(await isAdmin(user.id))) redirect("/account");
  return user;
}

export async function hasActiveEntitlement(userId: string): Promise<boolean> {
  const { data } = await createServiceClient()
    .from("entitlements")
    .select("id")
    .eq("user_id", userId)
    .eq("plan", "all_access")
    .eq("status", "active")
    .maybeSingle();
  return Boolean(data);
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
