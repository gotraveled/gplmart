import { isSupabaseConfigured } from "@/lib/env";
import { json } from "@/lib/http";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  if (!isSupabaseConfigured()) return json({ error: "not_configured" }, 503);
  if (!rateLimit(`status:${clientIp(req.headers)}`, 30, 10 * 60_000)) return json({ error: "rate_limited" }, 429);
  const orderId = new URL(req.url).searchParams.get("order") ?? "";
  if (!/^[A-Za-z0-9_-]{5,100}$/.test(orderId)) return json({ error: "invalid_input" }, 400);
  const { data } = await createServiceClient()
    .from("orders")
    .select("status")
    .eq("razorpay_order_id", orderId)
    .maybeSingle();
  return json({ status: data?.status ?? "unknown" });
}
