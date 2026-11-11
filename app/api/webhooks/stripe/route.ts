import { isSupabaseConfigured } from "@/lib/env";
import { stripe, stripeEnabled } from "@/lib/payments/stripe";
import { fulfil } from "@/lib/payments/service";

/**
 * Stripe webhook - fulfils checkout.session.completed even if the buyer
 * closes the tab before the browser verify call. Requires
 * STRIPE_WEBHOOK_SECRET (whsec_...) configured in the Stripe dashboard.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
  if (!secret || !isSupabaseConfigured() || !stripeEnabled()) return new Response("not configured", { status: 503 });

  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature") ?? "";
  let event;
  try {
    event = stripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch {
    return new Response("bad signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.payment_status === "paid" && typeof session.id === "string") {
      try {
        await fulfil({
          razorpayOrderId: `stripe_${session.id}`,
          paymentId: typeof session.payment_intent === "string" ? session.payment_intent : session.id,
          amountPaise: session.amount_total ?? 0,
          currency: (session.currency ?? "usd").toUpperCase(),
          source: "webhook",
        });
      } catch (e) {
        // Return 500 so Stripe retries - fulfilment is idempotent.
        console.error("stripe webhook fulfil failed", e instanceof Error ? e.message : e);
        return new Response("fulfil failed", { status: 500 });
      }
    }
  }
  return new Response("ok", { status: 200 });
}
