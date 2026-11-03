import { isSupabaseConfigured } from "@/lib/env";
import { json, sameOrigin } from "@/lib/http";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/admin";
import { stripe, stripeEnabled } from "@/lib/payments/stripe";
import { OFFER } from "@/lib/offer";
import { countryFromHeaders, geoPrice } from "@/lib/geo";
import { siteConfig } from "@/lib/site";

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const phoneOk = (v: string) => /^[+\d][\d\s-]{6,19}$/.test(v);

/** Stripe Checkout Session for international (USD) customers. Orders are recorded with a stripe_ prefixed id. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "forbidden" }, 403);
  if (!isSupabaseConfigured() || !stripeEnabled()) return json({ error: "not_configured" }, 503);
  if (!rateLimit(`stripe-session:${clientIp(req.headers)}`, 10, 10 * 60_000)) return json({ error: "rate_limited" }, 429);

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const customer = {
    name: text(body?.name, 80),
    email: text(body?.email, 120).toLowerCase(),
    phone: text(body?.phone, 20).replace(/[\s-]/g, ""),
  };
  if (!customer.name || !emailOk(customer.email) || !phoneOk(customer.phone)) {
    return json({ error: "invalid_details" }, 400);
  }

  const tier = geoPrice(countryFromHeaders(req.headers));
  const extended = body?.extended === true;
  const units = tier.units + (extended ? tier.addonUnits : 0);

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      customer_email: customer.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: tier.currency.toLowerCase(),
            unit_amount: units,
            product_data: {
              name: extended ? "GPLMart All-Access + 12-month extension" : OFFER.name,
              description: "One-time payment - Liquid code library plus theme and plugin bundles",
            },
          },
        },
      ],
      metadata: {
        plan: OFFER.plan,
        customer_name: customer.name,
        customer_phone: customer.phone,
        ...(extended ? { addon: OFFER.extendedAddon } : {}),
      },
      success_url: `${siteConfig.url}/payment/success?order=stripe_{CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteConfig.url}/checkout`,
    });

    const orderRef = `stripe_${session.id}`;
    const { error } = await createServiceClient().from("orders").insert({
      plan: OFFER.plan,
      razorpay_order_id: orderRef,
      amount_paise: units,
      currency: tier.currency,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      addon: extended ? OFFER.extendedAddon : null,
    });
    if (error) throw new Error("could not record order");

    return json({ url: session.url, orderRef });
  } catch (e) {
    console.error("stripe session failed", e instanceof Error ? e.message : e);
    return json({ error: "order_failed" }, 502);
  }
}
