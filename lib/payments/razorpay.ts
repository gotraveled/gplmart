export interface RazorpayCreds {
  keyId: string;
  keySecret: string;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface RazorpayPayment {
  id: string;
  order_id: string | null;
  amount: number;
  currency: string;
  status: string;
}

const API = "https://api.razorpay.com/v1";

async function rzp<T>(creds: RazorpayCreds, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString("base64")}`,
    },
  });
  if (!res.ok) throw new Error(`Razorpay API ${res.status}`);
  return (await res.json()) as T;
}

export function createRazorpayOrder(
  creds: RazorpayCreds,
  input: { amountPaise: number; currency: string; receipt: string; notes: Record<string, string> },
) {
  return rzp<RazorpayOrder>(creds, "/orders", {
    method: "POST",
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: input.currency,
      receipt: input.receipt,
      notes: input.notes,
    }),
  });
}

export function fetchRazorpayPayment(creds: RazorpayCreds, paymentId: string) {
  return rzp<RazorpayPayment>(creds, `/payments/${encodeURIComponent(paymentId)}`);
}

export function fetchOrderPayments(creds: RazorpayCreds, orderId: string) {
  return rzp<{ items: RazorpayPayment[] }>(creds, `/orders/${encodeURIComponent(orderId)}/payments`);
}
