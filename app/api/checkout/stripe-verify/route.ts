import { isSupabaseConfigured } from "@/lib/env";
import { json, sameOrigin } from "@/lib/http";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { stripe, stripeEnabled } from "@/lib/payments/stripe";
import { fulfil } from "@/lib/payments/service";

const sessionOk = (v: unknown): v is string => typeof v === "string" && /^cs_(test|live)_[A-Za-z0-9_-]+$/.test(v);

/** Verifies a completed Stripe Checkout Session server-side and fulfils the order. Never trusts the redirect. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (!isSupabaseConfigured() || !stripeEnabled()) return json({ error: "not_configured" }, 503);
  if (!rateLimit(`stripe-verify:${clientIp(req.headers)}`, 20, 10 * 60_000)) return json({ error: "rate_limited" }, 429);

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!sessionOk(body?.session_id)) return json({ error: "invalid_input" }, 400);

  try {
    const session = await stripe().checkout.sessions.retrieve(body.session_id);
    if (session.payment_status !== "paid") return json({ status: "pending" }, 202);

    const result = await fulfil({
      razorpayOrderId: `stripe_${session.id}`,
      paymentId: typeof session.payment_intent === "string" ? session.payment_intent : session.id,
      amountPaise: session.amount_total ?? 0,
      currency: (session.currency ?? "usd").toUpperCase(),
      source: "checkout",
    });
    return json({ status: result === "fulfilled" || result === "already_fulfilled" ? "paid" : "pending" }, 200);
  } catch (e) {
    console.error("stripe verify failed", e instanceof Error ? e.message : e);
    return json({ status: "pending" }, 202);
  }
}
