import "server-only";
import { randomBytes } from "node:crypto";
import { createServiceClient } from "@/lib/supabase/admin";
import { isMailerConfigured, sendMail, siteUrl } from "@/lib/mailer";

/** Escape LIKE/ILIKE wildcards so email lookups can't be pattern-injected. */
export function ilikeEmail(email: string): string {
  return email.replace(/[\\%_]/g, (c) => `\\${c}`);
}

function randomPassword(): string {
  // 16 chars, unambiguous alphabet (no 0/O, 1/l/I)
  const alphabet = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(20);
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

async function findUserIdByEmail(email: string): Promise<string | null> {
  const admin = createServiceClient().auth.admin;
  // listUsers is paginated; scan pages until found (userbase is small).
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(`listUsers failed: ${error.message}`);
    const hit = data.users.find((u) => u.email?.toLowerCase() === email);
    if (hit) return hit.id;
    if (data.users.length < 200) return null;
  }
  return null;
}

export interface ProvisionResult {
  userId: string | null;
  created: boolean;
  emailed: boolean;
}

/**
 * Turns a paid guest order's email into a member account:
 *  - creates the auth user (random password, pre-confirmed) or reuses an existing one
 *  - links any paid guest orders for that email to the user
 *  - grants the all-access entitlement
 *  - emails login credentials when a mailer is configured
 * Idempotent - safe to call on verify + webhook + retries.
 */
export async function provisionMemberAccount(email: string): Promise<ProvisionResult> {
  const db = createServiceClient();
  const normalized = email.trim().toLowerCase();
  if (!normalized) return { userId: null, created: false, emailed: false };

  const password = randomPassword();
  const { data: created, error: createErr } = await db.auth.admin.createUser({
    email: normalized,
    password,
    email_confirm: true,
  });

  let userId: string | null = null;
  let isNew = false;
  if (!createErr && created.user) {
    userId = created.user.id;
    isNew = true;
  } else {
    // Already registered (or transient error) - look the user up.
    if (createErr && !/already|registered|exists/i.test(createErr.message)) {
      console.error("createUser failed", createErr.message);
    }
    userId = await findUserIdByEmail(normalized);
  }
  if (!userId) return { userId: null, created: false, emailed: false };

  // Link paid guest orders for this email to the new account.
  const { data: orders } = await db
    .from("orders")
    .update({ user_id: userId })
    .ilike("customer_email", ilikeEmail(normalized))
    .eq("status", "paid")
    .is("user_id", null)
    .select("id, plan");

  // Grant entitlement from the most recent paid order's plan (fallback all_access).
  const plan = (orders?.[0]?.plan as string | undefined) ?? "all_access";
  const orderId = (orders?.[0]?.id as string | undefined) ?? null;
  const { error: entErr } = await db
    .from("entitlements")
    .upsert(
      { user_id: userId, plan, order_id: orderId, status: "active", source: "payment" },
      { onConflict: "user_id,plan" },
    );
  if (entErr) console.error("entitlement upsert failed", entErr.message);

  // Email credentials - only for freshly created accounts (existing users keep
  // their password; they can use forgot-password or email OTP).
  let emailed = false;
  if (isNew && isMailerConfigured()) {
    const url = siteUrl();
    emailed = await sendMail({
      to: normalized,
      subject: "Your GPLMart all-access account is ready",
      text: `Hi,\n\nYour GPLMart payment is confirmed and your all-access account is ready.\n\nSign in: ${url}/login\nEmail: ${normalized}\nTemporary password: ${password}\n\nDashboard: ${url}/dashboard\n\nTip: change your password after first sign-in (Account > Security) or use "Forgot password" on the sign-in page.\n\n- GPLMart`,
      html: `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;color:#111">
<h2 style="color:#0f766e">Your GPLMart account is ready</h2>
<p>Your payment is confirmed. Sign in with these credentials:</p>
<table style="border-collapse:collapse">
<tr><td style="padding:4px 12px 4px 0;color:#666">Email</td><td><b>${normalized}</b></td></tr>
<tr><td style="padding:4px 12px 4px 0;color:#666">Temporary password</td><td><b style="font-family:monospace">${password}</b></td></tr>
</table>
<p><a href="${url}/login" style="display:inline-block;background:#0f766e;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600">Sign in to your dashboard</a></p>
<p style="color:#666;font-size:13px">Dashboard: <a href="${url}/dashboard">${url}/dashboard</a><br>Change your password after first sign-in, or use "Forgot password" on the sign-in page.</p>
<p>- GPLMart</p></div>`,
    });
  } else if (isNew && !isMailerConfigured()) {
    // No transactional mail configured - trigger Supabase's built-in recovery
    // email so the customer can set their own password instead.
    const { error } = await db.auth.resetPasswordForEmail(normalized, {
      redirectTo: `${siteUrl()}/auth/callback?next=${encodeURIComponent("/reset-password")}`,
    });
    if (error) console.error("resetPasswordForEmail failed", error.message);
    emailed = !error;
  }

  return { userId, created: isNew, emailed };
}
