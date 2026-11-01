import type { Metadata } from "next";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { StatusPoller } from "@/components/checkout/status-poller";
import { requireUser } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Payment status", robots: { index: false } };

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const orderId = (await searchParams).order ?? "";
  const user = await requireUser("/account");
  const valid = /^[A-Za-z0-9_]{5,64}$/.test(orderId);
  const { data: order } = valid
    ? await createServiceClient().from("orders").select("status").eq("razorpay_order_id", orderId).eq("user_id", user.id).maybeSingle()
    : { data: null };
  const status = order?.status ?? "unknown";

  // Only a server-recorded "paid" status unlocks anything; the redirect itself proves nothing.
  const view =
    status === "paid"
      ? { Icon: CheckCircle2, color: "text-emerald-400", title: "Payment verified", text: "Your all-access membership is active." }
      : status === "created"
        ? { Icon: Clock, color: "text-cyan", title: "Confirming your payment", text: "We are waiting for confirmation from Razorpay. This usually takes a few seconds. You can safely close this page; access is added to your account automatically once the payment is confirmed." }
        : { Icon: XCircle, color: "text-rose-400", title: "We could not confirm this payment", text: "If money was deducted, it will be reconciled automatically or reversed by your bank. Check your account later or contact us with your order reference." };

  return (
    <Container className="grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md" role="status">
        <view.Icon aria-hidden className={`mx-auto size-14 ${view.color}`} />
        <h1 className="mt-5 font-display text-3xl font-semibold">{view.title}</h1>
        <p className="mt-3 text-muted">{view.text}</p>
        {valid && <p className="mt-2 text-xs text-subtle">Order reference: {orderId}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {status === "paid" ? (
            <ButtonLink href="/access" size="lg">
              Open resource hub
            </ButtonLink>
          ) : (
            <>
              <ButtonLink href="/account">View my account</ButtonLink>
              {status !== "created" && (
                <ButtonLink href="/checkout" variant="secondary">
                  Try again
                </ButtonLink>
              )}
            </>
          )}
        </div>
        {status === "created" && <StatusPoller orderId={orderId} />}
      </div>
    </Container>
  );
}
