import { isSupabaseConfigured } from "@/lib/env";
import { json, sameOrigin } from "@/lib/http";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/admin";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 200;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (!isSupabaseConfigured()) return json({ error: "not_configured" }, 503);
  if (!rateLimit(`lead:${clientIp(req.headers)}`, 5, 10 * 60_000)) return json({ error: "rate_limited" }, 429);

  const body = (await req.json().catch(() => null)) as { email?: unknown; source?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body?.source === "string" && body.source.length <= 40 ? body.source : "prompts";
  if (!emailOk(email)) return json({ error: "invalid_email" }, 400);

  const { error } = await createServiceClient().from("leads").upsert({ email, source });
  if (error) return json({ error: "save_failed" }, 502);
  return json({ ok: true });
}
