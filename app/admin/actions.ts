"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAllowedDeliveryUrl } from "@/lib/access-rules";
import { requireAdmin } from "@/lib/auth";
import { reconcileOrder } from "@/lib/payments/service";
import { logAudit } from "@/lib/settings";
import { createServiceClient } from "@/lib/supabase/admin";

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const back = (path: string, msg: string): never => redirect(`${path}?msg=${encodeURIComponent(msg)}`);

export async function saveSettingsAction(fd: FormData) {
  const admin = await requireAdmin();
  const driveUrl = str(fd, "drive_url");
  const evidence = str(fd, "license_evidence");
  const ready = fd.get("content_ready") === "on";
  if (driveUrl && !isAllowedDeliveryUrl(driveUrl)) back("/admin/settings", "Drive URL must be an https://*.google.com link.");
  if (ready && (!evidence || !driveUrl)) back("/admin/settings", "To mark content ready, record licensing evidence and a Drive URL first.");

  const db = createServiceClient();
  const rows = [
    { key: "content_ready", value: String(ready) },
    { key: "drive_url", value: driveUrl },
    { key: "license_evidence", value: evidence },
  ].map((r) => ({ ...r, updated_at: new Date().toISOString(), updated_by: admin.id }));
  const { error } = await db.from("settings").upsert(rows);
  if (error) back("/admin/settings", "Could not save settings.");
  // The URL itself is not written to the audit log.
  await logAudit(admin.id, "settings.updated", "settings", { content_ready: ready, drive_url_set: Boolean(driveUrl), evidence_set: Boolean(evidence) });
  revalidatePath("/access", "layout");
  back("/admin/settings", "Settings saved.");
}

export async function saveSnippetAction(fd: FormData) {
  const admin = await requireAdmin();
  const id = str(fd, "id");
  const row = {
    slug: str(fd, "slug").toLowerCase(),
    title: str(fd, "title"),
    description: str(fd, "description"),
    category_slug: str(fd, "category_slug"),
    tags: str(fd, "tags").split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
    filename: str(fd, "filename") || "snippet.liquid",
    code: String(fd.get("code") ?? ""),
    preview_html: String(fd.get("preview_html") ?? ""),
    source: str(fd, "source"),
    documentation: String(fd.get("documentation") ?? ""),
    version: str(fd, "version").slice(0, 40),
    compatibility: str(fd, "compatibility").slice(0, 120),
    is_demo: fd.get("is_demo") === "on",
    license_status: str(fd, "license_status") === "cleared" ? "cleared" : "unreviewed",
    status: fd.get("status") === "published" ? "published" : "draft",
    updated_at: new Date().toISOString(),
  };
  if (!row.slug || !row.title || !row.code || !row.category_slug) back("/admin/snippets", "Slug, title, category and code are required.");
  if (row.status === "published" && !row.is_demo && row.license_status !== "cleared")
    back("/admin/snippets", "Paid resources can only be published after licence review. Mark the licence as cleared (with evidence in the source note) or mark this as a demo.");
  const db = createServiceClient();
  const { error } = id ? await db.from("snippets").update(row).eq("id", id) : await db.from("snippets").insert(row);
  if (error) back("/admin/snippets", `Could not save snippet: ${error.message}`);
  await logAudit(admin.id, id ? "snippet.updated" : "snippet.created", row.slug, { status: row.status });
  revalidatePath("/access/liquid-library", "layout");
  revalidatePath("/library", "layout");
  back("/admin/snippets", "Snippet saved.");
}

export async function deleteSnippetAction(fd: FormData) {
  const admin = await requireAdmin();
  const id = str(fd, "id");
  const { data } = await createServiceClient().from("snippets").delete().eq("id", id).select("slug").maybeSingle();
  await logAudit(admin.id, "snippet.deleted", data?.slug ?? id);
  revalidatePath("/access/liquid-library", "layout");
  revalidatePath("/library", "layout");
  back("/admin/snippets", "Snippet deleted.");
}

export async function saveCategoryAction(fd: FormData) {
  const admin = await requireAdmin();
  const slug = str(fd, "slug").toLowerCase();
  const name = str(fd, "name");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug) || !name) back("/admin/snippets", "Category needs a valid slug and a name.");
  await createServiceClient().from("snippet_categories").upsert({ slug, name, sort_order: Number(str(fd, "sort_order")) || 0 });
  await logAudit(admin.id, "category.saved", slug);
  back("/admin/snippets", "Category saved.");
}

async function findUserIdByEmail(email: string): Promise<string | null> {
  const { data } = await createServiceClient().auth.admin.listUsers({ page: 1, perPage: 1000 });
  return data.users.find((u) => u.email?.toLowerCase() === email)?.id ?? null;
}

export async function setEntitlementAction(fd: FormData) {
  const admin = await requireAdmin();
  const status = str(fd, "status") === "active" ? "active" : "revoked";
  const userId = str(fd, "user_id") || (await findUserIdByEmail(str(fd, "email").toLowerCase()));
  const reason = str(fd, "reason");
  if (!userId) back("/admin/customers", "No user found with that email.");
  if (!reason) back("/admin/customers", "A reason is required for entitlement changes.");
  const { error } = await createServiceClient()
    .from("entitlements")
    .upsert({ user_id: userId, plan: "all_access", status, source: "admin", updated_at: new Date().toISOString() }, { onConflict: "user_id,plan" });
  if (error) back("/admin/customers", "Could not update entitlement.");
  await logAudit(admin.id, `entitlement.${status === "active" ? "granted_manual" : "revoked"}`, userId, { reason });
  back("/admin/customers", "Entitlement updated.");
}

export async function reconcileAction(fd: FormData) {
  const admin = await requireAdmin();
  const orderId = str(fd, "razorpay_order_id");
  let result: string;
  try {
    result = await reconcileOrder(orderId);
  } catch (e) {
    result = e instanceof Error ? e.message : "error";
  }
  await logAudit(admin.id, "payment.reconcile", orderId, { result });
  back("/admin/payments", `Reconcile ${orderId}: ${result}`);
}
