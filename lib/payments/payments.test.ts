import { createHmac } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { processWebhook, verifyCheckoutPayment, type FulfilArgs, type FulfilResult, type WebhookStore } from "./fulfil";
import { verifyCheckoutSignature, verifyWebhookSignature } from "./signature";

const hmac = (secret: string, data: string) => createHmac("sha256", secret).update(data).digest("hex");
const KEY = "key_secret";
const WH = "wh_secret";

describe("signatures", () => {
  it("accepts a valid checkout signature and rejects tampering", () => {
    const sig = hmac(KEY, "order_1|pay_1");
    expect(verifyCheckoutSignature("order_1", "pay_1", sig, KEY)).toBe(true);
    expect(verifyCheckoutSignature("order_1", "pay_2", sig, KEY)).toBe(false);
    expect(verifyCheckoutSignature("order_1", "pay_1", sig, "other")).toBe(false);
    expect(verifyCheckoutSignature("order_1", "pay_1", "short", KEY)).toBe(false);
    expect(verifyCheckoutSignature("order_1", "pay_1", "", KEY)).toBe(false);
  });
  it("verifies webhook signatures over the raw body", () => {
    const body = '{"a":1}';
    expect(verifyWebhookSignature(body, hmac(WH, body), WH)).toBe(true);
    expect(verifyWebhookSignature(body + " ", hmac(WH, body), WH)).toBe(false);
    expect(verifyWebhookSignature(body, null, WH)).toBe(false);
    expect(verifyWebhookSignature(body, hmac(WH, body), "")).toBe(false);
  });
});

describe("verifyCheckoutPayment", () => {
  const order = { userId: "u1", amountPaise: 49900, currency: "INR" };
  const base = () => ({
    input: { razorpay_order_id: "order_1", razorpay_payment_id: "pay_1", razorpay_signature: hmac(KEY, "order_1|pay_1") },
    userId: "u1",
    keySecret: KEY,
    getOrder: async () => order,
    fetchPayment: async () => ({ id: "pay_1", order_id: "order_1", amount: 49900, currency: "INR", status: "captured" }),
    fulfil: vi.fn(async (): Promise<FulfilResult> => "fulfilled"),
  });

  it("fulfils a captured, matching payment", async () => {
    const a = base();
    expect(await verifyCheckoutPayment(a)).toBe("paid");
    expect(a.fulfil).toHaveBeenCalledTimes(1);
  });
  it("rejects an invalid signature without fulfilling", async () => {
    const a = base();
    a.input.razorpay_signature = "0".repeat(64);
    expect(await verifyCheckoutPayment(a)).toBe("invalid_signature");
    expect(a.fulfil).not.toHaveBeenCalled();
  });
  it("rejects orders owned by another user", async () => {
    const a = base();
    a.userId = "attacker";
    expect(await verifyCheckoutPayment(a)).toBe("forbidden");
    expect(a.fulfil).not.toHaveBeenCalled();
  });
  it("rejects amount, currency or order mismatches", async () => {
    for (const patch of [{ amount: 100 }, { currency: "USD" }, { order_id: "order_x" }]) {
      const a = base();
      a.fetchPayment = async () => ({ id: "pay_1", order_id: "order_1", amount: 49900, currency: "INR", status: "captured", ...patch });
      expect(await verifyCheckoutPayment(a)).toBe("mismatch");
      expect(a.fulfil).not.toHaveBeenCalled();
    }
  });
  it("treats authorized payments as pending and failed as failed", async () => {
    const a = base();
    a.fetchPayment = async () => ({ id: "pay_1", order_id: "order_1", amount: 49900, currency: "INR", status: "authorized" });
    expect(await verifyCheckoutPayment(a)).toBe("pending");
    a.fetchPayment = async () => ({ id: "pay_1", order_id: "order_1", amount: 49900, currency: "INR", status: "failed" });
    expect(await verifyCheckoutPayment(a)).toBe("failed");
    expect(a.fulfil).not.toHaveBeenCalled();
  });
});

function fakeStore() {
  const events = new Map<string, { processed: boolean }>();
  const entitlements = new Set<string>();
  const paid = new Map<string, string>();
  const fulfil = vi.fn(async (a: FulfilArgs): Promise<FulfilResult> => {
    if (paid.has(a.razorpayOrderId)) return paid.get(a.razorpayOrderId) === a.paymentId ? "already_fulfilled" : "already_paid_other_payment";
    paid.set(a.razorpayOrderId, a.paymentId);
    entitlements.add(a.razorpayOrderId);
    return "fulfilled";
  });
  const store: WebhookStore = {
    async recordEvent(id) {
      const e = events.get(id);
      if (!e) return events.set(id, { processed: false }), "new";
      return e.processed ? "processed" : "retry";
    },
    async finishEvent(id, result) {
      if (result !== "error") events.get(id)!.processed = true;
    },
    markFailed: vi.fn(async () => {}),
    fulfil,
  };
  return { store, fulfil, entitlements };
}

const captured = (orderId = "order_1", paymentId = "pay_1") =>
  JSON.stringify({ event: "payment.captured", payload: { payment: { entity: { id: paymentId, order_id: orderId, amount: 49900, currency: "INR", status: "captured" } } } });

const call = (store: WebhookStore, body: string, over: Partial<{ signature: string | null; eventId: string | null }> = {}) =>
  processWebhook({
    rawBody: body,
    signature: over.signature === undefined ? hmac(WH, body) : over.signature,
    eventIdHeader: over.eventId === undefined ? "evt_1" : over.eventId,
    secret: WH,
    store,
  });

describe("processWebhook", () => {
  it("rejects bad signatures and does nothing", async () => {
    const { store, fulfil } = fakeStore();
    expect((await call(store, captured(), { signature: "bad" })).status).toBe(401);
    expect(fulfil).not.toHaveBeenCalled();
  });
  it("fulfils on payment.captured", async () => {
    const { store, fulfil, entitlements } = fakeStore();
    expect((await call(store, captured())).status).toBe(200);
    expect(fulfil).toHaveBeenCalledTimes(1);
    expect(entitlements.size).toBe(1);
  });
  it("is idempotent for duplicate deliveries of the same event", async () => {
    const { store, fulfil } = fakeStore();
    await call(store, captured());
    const second = await call(store, captured());
    expect(second.body).toBe("duplicate");
    expect(fulfil).toHaveBeenCalledTimes(1);
  });
  it("does not duplicate entitlements when a different event repeats the same payment", async () => {
    const { store, entitlements } = fakeStore();
    await call(store, captured(), { eventId: "evt_1" });
    const r = await call(store, captured(), { eventId: "evt_2" });
    expect(r.body).toBe("already_fulfilled");
    expect(entitlements.size).toBe(1);
  });
  it("flags a second, different payment for an already-paid order", async () => {
    const { store } = fakeStore();
    await call(store, captured("order_1", "pay_1"), { eventId: "a" });
    const r = await call(store, captured("order_1", "pay_2"), { eventId: "b" });
    expect(r.body).toBe("already_paid_other_payment");
  });
  it("returns 500 so Razorpay retries when processing throws, then succeeds on retry", async () => {
    const { store, fulfil } = fakeStore();
    fulfil.mockRejectedValueOnce(new Error("db down"));
    expect((await call(store, captured())).status).toBe(500);
    expect((await call(store, captured())).status).toBe(200);
    expect(fulfil).toHaveBeenCalledTimes(2);
  });
  it("marks failed payments without granting access", async () => {
    const { store, fulfil } = fakeStore();
    const body = JSON.stringify({ event: "payment.failed", payload: { payment: { entity: { id: "pay_9", order_id: "order_1", amount: 49900, currency: "INR", status: "failed", error_description: "declined" } } } });
    expect((await call(store, body)).status).toBe(200);
    expect(store.markFailed).toHaveBeenCalledWith("order_1", "declined");
    expect(fulfil).not.toHaveBeenCalled();
  });
});
