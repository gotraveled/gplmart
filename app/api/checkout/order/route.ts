import { getUser, hasActiveEntitlement } from "@/lib/auth";
import { isLiveCheckoutEnabled, isRazorpayTestMode, isSupabaseConfigured, razorpayCreds } from "@/lib/env";
import { checkoutOpen } from "@/lib/checkout-gate";
import { json, sameOrigin } from "@/lib/http";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createOrderForUser } from "@/lib/payments/service";
import { isContentReady } from "@/lib/settings";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (!isSupabaseConfigured() || !razorpayCreds()) return json({ error: "not_configured" }, 503);

  const user = await getUser();
  if (!user) return json({ error: "unauthenticated" }, 401);
  if (!rateLimit(`order:${user.id}:${clientIp(req.headers)}`, 10, 10 * 60_000)) return json({ error: "rate_limited" }, 429);

  if (await hasActiveEntitlement(user.id)) return json({ error: "already_active" }, 409);
  const open = checkoutOpen({ testMode: isRazorpayTestMode(), liveEnabled: isLiveCheckoutEnabled(), contentReady: await isContentReady() });
  if (!open) return json({ error: "not_open" }, 403);

  try {
    // Any amount/currency in the request body is deliberately ignored.
    return json(await createOrderForUser(user.id));
  } catch (e) {
    console.error("order creation failed", e instanceof Error ? e.message : e);
    return json({ error: "order_failed" }, 502);
  }
}
