"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", cb: (r: { error?: { description?: string } }) => void): void;
}
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

interface OrderResponse {
  orderId: string;
  amountPaise: number;
  currency: string;
  keyId: string;
  error?: string;
}

const SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

function loadScript(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

const messages: Record<string, string> = {
  already_active: "You already have access. Open your account to continue.",
  not_open: "Purchases are not open yet.",
  rate_limited: "Too many attempts. Please wait a few minutes.",
  unauthenticated: "Please sign in again.",
};

export function CheckoutButton({ email, label }: { email: string; label: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setBusy(true);
    setError(null);
    try {
      if (!(await loadScript()) || !window.Razorpay) throw new Error("Could not load the payment window. Check your connection and retry.");
      const res = await fetch("/api/checkout/order", { method: "POST" });
      const order = (await res.json()) as OrderResponse;
      if (!res.ok) throw new Error(messages[order.error ?? ""] ?? "Could not start the payment. Please try again.");

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amountPaise,
        currency: order.currency,
        name: "GPLMart",
        description: "All-access membership (one-time)",
        prefill: { email },
        theme: { color: "#6d5cff" },
        handler: async (r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          }).catch(() => undefined);
          router.push(`/payment/success?order=${encodeURIComponent(r.razorpay_order_id)}`);
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rzp.on("payment.failed", () => router.push(`/payment/failed?order=${encodeURIComponent(order.orderId)}`));
      rzp.open();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <div>
      <Button size="lg" className="w-full" onClick={start} disabled={busy}>
        <Lock aria-hidden className="size-4" /> {busy ? "Opening secure checkout…" : label}
      </Button>
      {error && (
        <p role="alert" className="mt-3 rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100">
          {error}
        </p>
      )}
    </div>
  );
}
