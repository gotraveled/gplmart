import "server-only";
import { createServiceClient } from "@/lib/supabase/admin";

export type SettingKey = "content_ready" | "drive_url" | "license_evidence";

export async function getSetting(key: SettingKey): Promise<string> {
  const { data } = await createServiceClient().from("settings").select("value").eq("key", key).maybeSingle();
  return data?.value ?? "";
}

export async function getSettings(): Promise<Record<SettingKey, string>> {
  const { data } = await createServiceClient().from("settings").select("key,value");
  const map: Record<string, string> = {};
  data?.forEach((r) => (map[r.key] = r.value));
  return { content_ready: map.content_ready ?? "false", drive_url: map.drive_url ?? "", license_evidence: map.license_evidence ?? "" };
}

export async function isContentReady(): Promise<boolean> {
  return (await getSetting("content_ready")) === "true";
}

export async function logAudit(actorId: string | null, action: string, target: string | null, details: Record<string, unknown> = {}) {
  await createServiceClient().from("audit_log").insert({ actor_id: actorId, action, target, details });
}
