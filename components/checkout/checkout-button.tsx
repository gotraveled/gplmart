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
  invalid_details: "Please check your name, email and phone number.",
  not_open: "Checkout is unavailable right now - please try again shortly.",
  rate_limited: "Too many attempts. Please wait a few minutes.",
};

const fieldCls =
  "w-full rounded-lg border border-line-strong bg-ink-950/70 px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle focus:border-accent/60 focus:outline-none";

export function CheckoutForm({ label }: { label: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const stripeOn = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true";

  async function startStripe() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/stripe-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(messages[data.error ?? ""] ?? "Could not start Stripe checkout.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  async function start(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (!(await loadScript()) || !window.Razorpay) throw new Error("Could not load the payment window. Check your connection and retry.");
      const res = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const order = (await res.json()) as OrderResponse;
      if (!res.ok) throw new Error(messages[order.error ?? ""] ?? "Could not start the payment. Please try again.");

      const rzp = new window.Razorpay({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amountPaise,
        currency: order.currency,
        name: "GPLMart",
        description: "All-access (one-time payment)",
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#c8f542" },
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={start} className="grid gap-3.5">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Full name</span>
          <input required className={fieldCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} autoComplete="name" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Phone / WhatsApp</span>
          <input required type="tel" className={fieldCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} autoComplete="tel" placeholder="98765 43210" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted">Email</span>
        <input required type="email" className={fieldCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={120} autoComplete="email" placeholder="you@example.com" />
      </label>
      <p className="rounded-xl border border-line-strong bg-ink-950/60 px-4 py-3 text-center text-xs text-muted">
        1 year of full access - every snippet, pack, course, skill pack, ebook and future drop included.
      </p>
      <Button size="lg" className="mt-1 w-full" type="submit" disabled={busy}>
        <Lock aria-hidden className="size-4" /> {busy ? "Opening secure checkout…" : label}
      </Button>
      {stripeOn && (
        <Button size="lg" variant="secondary" className="w-full" type="button" disabled={busy} onClick={startStripe}>
          Pay by card — Stripe
        </Button>
      )}
      {error && (
        <p role="alert" className="rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-100">
          {error}
        </p>
      )}
    </form>
  );
}
