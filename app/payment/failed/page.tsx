import type { Metadata } from "next";
import { XCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Payment failed", robots: { index: false } };

export default function PaymentFailedPage() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md" role="alert">
        <XCircle aria-hidden className="mx-auto size-14 text-rose-400" />
        <h1 className="mt-5 font-display text-3xl font-semibold">Payment was not completed</h1>
        <p className="mt-3 text-muted">
          No access has been granted. You can try again with the same or a different payment method. If money
          was deducted, your bank normally reverses failed payments automatically. If your account later shows
          active access, no further action is needed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/checkout">Retry payment</ButtonLink>
          <ButtonLink href="/account" variant="secondary">
            View my account
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
