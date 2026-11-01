import { createHash } from "node:crypto";
import { verifyCheckoutSignature, verifyWebhookSignature } from "./signature";

export type FulfilResult =
  | "fulfilled"
  | "already_fulfilled"
  | "already_paid_other_payment"
  | "amount_mismatch"
  | "order_not_found";

export interface FulfilArgs {
  razorpayOrderId: string;
  paymentId: string;
  amountPaise: number;
  currency: string;
  source: "checkout" | "webhook" | "admin";
}

export type Fulfil = (args: FulfilArgs) => Promise<FulfilResult>;

interface PaymentLike {
  id: string;
  order_id: string | null;
  amount: number;
  currency: string;
  status: string;
}

export interface CheckoutInput {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export type VerifyOutcome = "paid" | "pending" | "failed" | "invalid_signature" | "forbidden" | "mismatch";

/** Server-side verification of a Checkout success callback. Access is never granted from the client claim alone. */
export async function verifyCheckoutPayment(args: {
  input: CheckoutInput;
  userId: string;
  keySecret: string;
  getOrder: (razorpayOrderId: string) => Promise<{ userId: string; amountPaise: number; currency: string } | null>;
  fetchPayment: (paymentId: string) => Promise<PaymentLike>;
  fulfil: Fulfil;
}): Promise<VerifyOutcome> {
  const { input, userId, keySecret } = args;
  if (!verifyCheckoutSignature(input.razorpay_order_id, input.razorpay_payment_id, input.razorpay_signature, keySecret)) {
    return "invalid_signature";
  }
  const order = await args.getOrder(input.razorpay_order_id);
  if (!order || order.userId !== userId) return "forbidden";

  const payment = await args.fetchPayment(input.razorpay_payment_id);
  if (
    payment.order_id !== input.razorpay_order_id ||
    payment.amount !== order.amountPaise ||
    payment.currency !== order.currency
  ) {
    return "mismatch";
  }
  if (payment.status === "failed") return "failed";
  if (payment.status !== "captured") return "pending";

  const result = await args.fulfil({
    razorpayOrderId: input.razorpay_order_id,
    paymentId: payment.id,
    amountPaise: payment.amount,
    currency: payment.currency,
    source: "checkout",
  });
  if (result === "fulfilled" || result === "already_fulfilled") return "paid";
  return result === "amount_mismatch" ? "mismatch" : "forbidden";
}

export interface WebhookStore {
  /** Inserts the event if new. Returns "processed" when it was already handled completely. */
  recordEvent(eventId: string, type: string, payload: unknown): Promise<"new" | "retry" | "processed">;
  finishEvent(eventId: string, result: string, error?: string): Promise<void>;
  markFailed(razorpayOrderId: string, reason: string): Promise<void>;
  fulfil: Fulfil;
}

export interface WebhookResponse {
  status: number;
  body: string;
}

interface WebhookPayload {
  event?: string;
  payload?: { payment?: { entity?: PaymentLike & { error_description?: string } } };
}

export async function processWebhook(args: {
  rawBody: string;
  signature: string | null;
  eventIdHeader: string | null;
  secret: string;
  store: WebhookStore;
}): Promise<WebhookResponse> {
  const { rawBody, store } = args;
  if (!verifyWebhookSignature(rawBody, args.signature, args.secret)) return { status: 401, body: "invalid signature" };

  let parsed: WebhookPayload;
  try {
    parsed = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return { status: 400, body: "invalid json" };
  }
  const type = parsed.event ?? "unknown";
  const eventId = args.eventIdHeader || `body-${createHash("sha256").update(rawBody).digest("hex")}`;

  const state = await store.recordEvent(eventId, type, parsed);
  if (state === "processed") return { status: 200, body: "duplicate" };

  try {
    const payment = parsed.payload?.payment?.entity;
    let result = "ignored";
    if ((type === "payment.captured" || type === "order.paid") && payment?.order_id) {
      if (payment.status !== "captured") {
        result = "not_captured";
      } else {
        result = await store.fulfil({
          razorpayOrderId: payment.order_id,
          paymentId: payment.id,
          amountPaise: payment.amount,
          currency: payment.currency,
          source: "webhook",
        });
      }
    } else if (type === "payment.failed" && payment?.order_id) {
      await store.markFailed(payment.order_id, payment.error_description ?? "payment failed");
      result = "marked_failed";
    }
    await store.finishEvent(eventId, result);
    return { status: 200, body: result };
  } catch (e) {
    await store.finishEvent(eventId, "error", e instanceof Error ? e.message : "unknown error").catch(() => {});
    return { status: 500, body: "processing error" };
  }
}
