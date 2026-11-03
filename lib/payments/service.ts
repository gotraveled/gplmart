import "server-only";
import { randomUUID } from "node:crypto";
import { createServiceClient } from "@/lib/supabase/admin";
import { razorpayCreds } from "@/lib/env";
import { OFFER } from "@/lib/offer";
import { createRazorpayOrder, fetchOrderPayments, fetchRazorpayPayment } from "./razorpay";
import type { Fulfil, FulfilResult, WebhookStore } from "./fulfil";

export const fulfil: Fulfil = async (a) => {
  const { data, error } = await createServiceClient().rpc("fulfill_payment", {
    p_razorpay_order_id: a.razorpayOrderId,
    p_payment_id: a.paymentId,
    p_amount_paise: a.amountPaise,
    p_currency: a.currency,
    p_source: a.source,
  });
  if (error) throw new Error(`fulfill_payment failed: ${error.message}`);
  return data as FulfilResult;
};

export function requireCreds() {
  const creds = razorpayCreds();
  if (!creds) throw new Error("Razorpay is not configured");
  return creds;
}

/** Creates a Razorpay order using ONLY server-side offer values and records it for the user. */
export async function createOrderForUser(userId: string) {
  const creds = requireCreds();
  const db = createServiceClient();
  const order = await createRazorpayOrder(creds, {
    amountPaise: OFFER.pricePaise,
    currency: OFFER.currency,
    receipt: `gpl_${randomUUID().replace(/-/g, "").slice(0, 30)}`,
    notes: { user_id: userId, plan: OFFER.plan },
  });
  const { error } = await db.from("orders").insert({
    user_id: userId,
    plan: OFFER.plan,
    razorpay_order_id: order.id,
    amount_paise: OFFER.pricePaise,
    currency: OFFER.currency,
  });
  if (error) throw new Error("could not record order");
  return { orderId: order.id, amountPaise: OFFER.pricePaise, currency: OFFER.currency, keyId: creds.keyId };
}

/** Guest checkout: no account required. Contact details are stored for reconciliation and manual fulfilment. */
export async function createOrderForCustomer(
  customer: { name: string; email: string; phone: string },
  opts: { extended?: boolean } = {},
) {
  const creds = requireCreds();
  const db = createServiceClient();
  const amountPaise = OFFER.pricePaise + (opts.extended ? OFFER.extendedAddonPaise : 0);
  const order = await createRazorpayOrder(creds, {
    amountPaise,
    currency: OFFER.currency,
    receipt: `gpl_${randomUUID().replace(/-/g, "").slice(0, 30)}`,
    notes: {
      plan: OFFER.plan,
      customer_email: customer.email,
      customer_phone: customer.phone,
      ...(opts.extended ? { addon: OFFER.extendedAddon } : {}),
    },
  });
  const { error } = await db.from("orders").insert({
    plan: OFFER.plan,
    razorpay_order_id: order.id,
    amount_paise: amountPaise,
    currency: OFFER.currency,
    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.phone,
    addon: opts.extended ? OFFER.extendedAddon : null,
  });
  if (error) throw new Error("could not record order");
  return { orderId: order.id, amountPaise, currency: OFFER.currency, keyId: creds.keyId };
}

export async function getOrderForVerification(razorpayOrderId: string) {
  const { data } = await createServiceClient()
    .from("orders")
    .select("user_id, amount_paise, currency")
    .eq("razorpay_order_id", razorpayOrderId)
    .maybeSingle();
  return data
    ? { userId: (data.user_id as string | null) ?? null, amountPaise: data.amount_paise as number, currency: data.currency as string }
    : null;
}

export const fetchPayment = (id: string) => fetchRazorpayPayment(requireCreds(), id);

export function webhookStore(): WebhookStore {
  const db = createServiceClient();
  return {
    async recordEvent(eventId, type, payload) {
      const { error } = await db.from("webhook_events").insert({ event_id: eventId, event_type: type, payload });
      if (!error) return "new";
      if (error.code !== "23505") throw new Error(error.message);
      const { data } = await db.from("webhook_events").select("processed_at").eq("event_id", eventId).maybeSingle();
      return data?.processed_at ? "processed" : "retry";
    },
    async finishEvent(eventId, result, error) {
      await db
        .from("webhook_events")
        .update({ result, error: error ?? null, processed_at: error ? null : new Date().toISOString() })
        .eq("event_id", eventId);
    },
    async markFailed(orderId, reason) {
      await db.from("orders").update({ status: "failed", failure_reason: reason.slice(0, 300) }).eq("razorpay_order_id", orderId).eq("status", "created");
    },
    fulfil,
  };
}

/** Admin reconciliation: asks Razorpay for the order's payments and fulfils a captured one. */
export async function reconcileOrder(razorpayOrderId: string): Promise<string> {
  const { items } = await fetchOrderPayments(requireCreds(), razorpayOrderId);
  const captured = items.find((p) => p.status === "captured");
  if (!captured) return "no_captured_payment";
  return fulfil({
    razorpayOrderId,
    paymentId: captured.id,
    amountPaise: captured.amount,
    currency: captured.currency,
    source: "admin",
  });
}
