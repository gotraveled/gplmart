import { isLiveCheckoutEnabled, isRazorpayTestMode, isSupabaseConfigured, razorpayCreds } from "@/lib/env";
import { checkoutOpen } from "@/lib/checkout-gate";
import { json, sameOrigin } from "@/lib/http";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createOrderForCustomer } from "@/lib/payments/service";
import { countryFromHeaders } from "@/lib/geo";
import { isContentReady } from "@/lib/settings";

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const phoneOk = (v: string) => /^[+\d][\d\s-]{6,19}$/.test(v);

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (!isSupabaseConfigured() || !razorpayCreds()) return json({ error: "not_configured" }, 503);
  if (!rateLimit(`order:${clientIp(req.headers)}`, 10, 10 * 60_000)) return json({ error: "rate_limited" }, 429);

  const open = checkoutOpen({ testMode: isRazorpayTestMode(), liveEnabled: isLiveCheckoutEnabled(), contentReady: await isContentReady() });
  if (!open) return json({ error: "not_open" }, 403);

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const customer = {
    name: text(body?.name, 80),
    email: text(body?.email, 120).toLowerCase(),
    phone: text(body?.phone, 20).replace(/[\s-]/g, ""),
  };
  if (!customer.name || !emailOk(customer.email) || !phoneOk(customer.phone)) {
    return json({ error: "invalid_details" }, 400);
  }

  try {
    // Any amount/currency in the request body is deliberately ignored.
    return json(
      await createOrderForCustomer(customer, { country: countryFromHeaders(req.headers) }),
    );
  } catch (e) {
    console.error("order creation failed", e instanceof Error ? e.message : e);
    return json({ error: "order_failed" }, 502);
  }
}
