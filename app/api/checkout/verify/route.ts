import { isSupabaseConfigured, razorpayCreds } from "@/lib/env";
import { json, sameOrigin } from "@/lib/http";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { verifyCheckoutPayment } from "@/lib/payments/fulfil";
import { fetchPayment, fulfil, getOrderForVerification } from "@/lib/payments/service";

const field = (v: unknown) => (typeof v === "string" && /^[A-Za-z0-9_]{5,64}$/.test(v) ? v : "");
const sig = (v: unknown) => (typeof v === "string" && /^[a-f0-9]{64}$/i.test(v) ? v : "");

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  const creds = razorpayCreds();
  if (!isSupabaseConfigured() || !creds) return json({ error: "not_configured" }, 503);
  if (!rateLimit(`verify:${clientIp(req.headers)}`, 20, 10 * 60_000)) return json({ error: "rate_limited" }, 429);

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const input = {
    razorpay_order_id: field(body?.razorpay_order_id),
    razorpay_payment_id: field(body?.razorpay_payment_id),
    razorpay_signature: sig(body?.razorpay_signature),
  };
  if (!input.razorpay_order_id || !input.razorpay_payment_id || !input.razorpay_signature) {
    return json({ error: "invalid_input" }, 400);
  }

  try {
    const outcome = await verifyCheckoutPayment({
      input,
      userId: null,
      keySecret: creds.keySecret,
      getOrder: getOrderForVerification,
      fetchPayment,
      fulfil,
    });
    const status = outcome === "paid" ? 200 : outcome === "pending" ? 202 : 400;
    return json({ status: outcome }, status);
  } catch (e) {
    console.error("verify failed", e instanceof Error ? e.message : e);
    // The webhook can still complete fulfilment, so report a pending state rather than a failure.
    return json({ status: "pending" }, 202);
  }
}
