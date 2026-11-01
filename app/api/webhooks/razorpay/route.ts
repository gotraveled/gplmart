import { isSupabaseConfigured, razorpayWebhookSecret } from "@/lib/env";
import { processWebhook } from "@/lib/payments/fulfil";
import { webhookStore } from "@/lib/payments/service";

export async function POST(req: Request) {
  const secret = razorpayWebhookSecret();
  if (!secret || !isSupabaseConfigured()) return new Response("not configured", { status: 503 });

  // Signature is computed over the exact raw body, so read it as text.
  const rawBody = await req.text();
  const res = await processWebhook({
    rawBody,
    signature: req.headers.get("x-razorpay-signature"),
    eventIdHeader: req.headers.get("x-razorpay-event-id"),
    secret,
    store: webhookStore(),
  });
  return new Response(res.body, { status: res.status });
}
