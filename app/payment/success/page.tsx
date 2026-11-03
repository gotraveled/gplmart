import type { Metadata } from "next";
import { CheckCircle2, Clock, MessageCircle, XCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { StatusPoller } from "@/components/checkout/status-poller";
import { isSupabaseConfigured, whatsappNumber } from "@/lib/env";
import { createServiceClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Payment status", robots: { index: false } };

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const orderId = (await searchParams).order ?? "";
  const valid = /^[A-Za-z0-9_]{5,64}$/.test(orderId);
  const { data: order } = valid && isSupabaseConfigured()
    ? await createServiceClient().from("orders").select("status").eq("razorpay_order_id", orderId).maybeSingle()
    : { data: null };
  const status = order?.status ?? "unknown";

  const wa = whatsappNumber();
  const waUrl = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent(`Hi! I just completed my GPLMart payment. Order: ${orderId}. Please send me the access link.`)}`
    : "";

  // Only a server-recorded "paid" status is treated as confirmed; the redirect itself proves nothing.
  const view =
    status === "paid"
      ? { Icon: CheckCircle2, color: "text-emerald-400", title: "Payment verified", text: "Your payment is confirmed. Tap below to message us on WhatsApp and we will send you the access link right away." }
      : status === "created"
        ? { Icon: Clock, color: "text-mint", title: "Confirming your payment", text: "We are waiting for confirmation from Razorpay. This usually takes a few seconds - you can safely continue to WhatsApp; we will verify your order there." }
        : { Icon: XCircle, color: "text-rose-400", title: "We could not confirm this payment", text: "If money was deducted, it will be reconciled automatically or reversed by your bank. Message us on WhatsApp with your order reference and we will sort it out." };

  return (
    <Container className="grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md" role="status">
        <view.Icon aria-hidden className={`mx-auto size-14 ${view.color}`} />
        <h1 className="mt-5 font-display text-3xl font-semibold">{view.title}</h1>
        <p className="mt-3 text-muted">{view.text}</p>
        {valid && <p className="mt-2 text-xs text-subtle">Order reference: {orderId}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {waUrl ? (
            <ButtonLink href={waUrl} size="lg">
              <MessageCircle aria-hidden className="size-4" /> Continue on WhatsApp
            </ButtonLink>
          ) : (
            <ButtonLink href="/" size="lg">
              Back to home
            </ButtonLink>
          )}
          {status !== "paid" && status !== "created" && (
            <ButtonLink href="/checkout" variant="secondary">
              Try again
            </ButtonLink>
          )}
        </div>
        {status === "created" && <StatusPoller orderId={orderId} />}
      </div>
    </Container>
  );
}
