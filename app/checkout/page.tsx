import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CheckoutForm } from "@/components/checkout/checkout-button";
import { checkoutOpen } from "@/lib/checkout-gate";
import { isLiveCheckoutEnabled, isRazorpayTestMode, razorpayCreds } from "@/lib/env";
import { formatOfferPrice } from "@/lib/offer";
import { isContentReady } from "@/lib/settings";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default async function CheckoutPage() {
  const ready = await isContentReady();
  const price = formatOfferPrice();
  const testMode = isRazorpayTestMode();
  const configured = Boolean(razorpayCreds());

  return (
    <Container className="grid min-h-[70vh] place-items-center py-16">
      <div className="w-full max-w-lg rounded-2xl border border-line-strong bg-ink-900/70 p-8 shadow-card">
        <h1 className="font-display text-3xl font-semibold">GPLMart All-Access</h1>
        <p className="mt-2 text-muted">One-time payment. Includes the Drive template bundles and the Liquid code library.</p>
        <p className="mt-6 font-display text-5xl font-semibold">{price}</p>
        <p className="mt-1 text-sm text-subtle">INR, one-time. No account needed.</p>

        <div className="mt-8">
          {!configured ? (
            <p role="status" className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
              Payments are awaiting configuration and are not available yet.
            </p>
          ) : !checkoutOpen({ testMode, liveEnabled: isLiveCheckoutEnabled(), contentReady: ready }) ? (
            <p role="status" className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
              Purchases are not open yet. They open once the resources are released and testing is complete.
            </p>
          ) : (
            <>
              {testMode && (
                <p className="mb-4 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-100">
                  Razorpay <strong>test mode</strong>: no real money is charged.
                </p>
              )}
              <CheckoutForm label={`Pay ${price} securely`} />
              <p className="mt-4 text-xs text-subtle">
                Payment is handled by Razorpay - card details never touch this site. After paying you are sent to
                WhatsApp to receive your access link.
              </p>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
