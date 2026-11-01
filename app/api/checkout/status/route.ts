import { getUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { json } from "@/lib/http";
import { createServiceClient } from "@/lib/supabase/admin";

export async function GET(req: Request) {
  if (!isSupabaseConfigured()) return json({ error: "not_configured" }, 503);
  const user = await getUser();
  if (!user) return json({ error: "unauthenticated" }, 401);
  const orderId = new URL(req.url).searchParams.get("order") ?? "";
  if (!/^[A-Za-z0-9_]{5,64}$/.test(orderId)) return json({ error: "invalid_input" }, 400);
  const { data } = await createServiceClient()
    .from("orders")
    .select("status")
    .eq("razorpay_order_id", orderId)
    .eq("user_id", user.id)
    .maybeSingle();
  return json({ status: data?.status ?? "unknown" });
}
