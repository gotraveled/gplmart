import type { Metadata } from "next";
import { Check, CreditCard, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CheckoutForm } from "@/components/checkout/checkout-button";
import { checkoutOpen } from "@/lib/checkout-gate";
import { isLiveCheckoutEnabled, isRazorpayTestMode, razorpayCreds } from "@/lib/env";
import { formatOfferPrice } from "@/lib/offer";
import { GeoPrice } from "@/components/ui/geo-price";
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
        <p className="mt-6 font-display text-5xl font-semibold"><GeoPrice fallback={price} /></p>
        <p className="mt-1 text-sm text-subtle">One-time, in your local currency. No account needed.</p>

        <p className="mt-4 rounded-lg border border-line bg-ink-950/60 p-3 text-xs text-muted">
          The average conversion app costs <strong className="text-fg">$20-40 per year</strong>. GPLMart is{" "}
          <strong className="text-accent"><GeoPrice fallback={price} /> once</strong> - no renewals, no monthly fees.
        </p>

        <div className="mt-8">
          {!configured || !checkoutOpen({ testMode, liveEnabled: isLiveCheckoutEnabled(), contentReady: ready }) ? (
            <p className="rounded-lg border border-line bg-ink-950/60 p-3 text-sm text-muted">
              Checkout is unavailable at the moment - please check back shortly.
            </p>
          ) : (
            <>
              {testMode && (
                <p className="mb-4 rounded-lg border border-line bg-ink-950/60 p-3 text-sm text-muted">
                  Razorpay <strong className="text-fg">test mode</strong>: no real money is charged.
                </p>
              )}
              <CheckoutForm label="Pay securely" />
            </>
          )}

          {/* Trust stack - shown whether checkout is open or closed */}
          <div className="mt-5 rounded-xl border border-mint/30 bg-mint/10 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck aria-hidden className="size-4 text-mint" /> 30-day money-back guarantee
            </p>
            <p className="mt-1 text-xs text-muted">
              If the library does not work for your store, message us on WhatsApp - refund per the{" "}
              <a href="/refund-policy" className="underline">refund policy</a>.
            </p>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-1.5" aria-label="Payment methods">
            {[
              { label: "UPI", icon: Smartphone },
              { label: "Cards", icon: CreditCard },
              { label: "Net banking", icon: Wallet },
              { label: "Wallets", icon: Wallet },
            ].map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-semibold text-muted"
              >
                <Icon aria-hidden className="size-3.5 text-mint" />
                {label}
              </span>
            ))}
          </div>

          <ul className="mt-4 space-y-1.5 text-xs text-subtle">
            {[
              "Payment handled by Razorpay - card details never touch this site",
              "Access link arrives on WhatsApp after payment",
              "30-day access via your paid email - no signup",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check aria-hidden className="size-3.5 text-mint" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
