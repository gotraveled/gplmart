import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Refund policy",
  "Refund policy for GPLMart digital products.",
  "/refund-policy",
);

export default function RefundPolicyPage() {
  return (
    <InfoPage
      title="Refund policy"
      description="Policy for refunds on GPLMart digital products."
    >
      <h2>30-day money-back guarantee</h2>
      <p>
        Every all-access purchase is covered by a 30-day money-back guarantee. If the library does not work
        for your store, message us on WhatsApp within 30 days of purchase and we will refund the payment.
      </p>
      <h2>Digital products</h2>
      <p>
        Digital goods are delivered electronically and cannot be returned in the usual sense. Refunds are
        offered at GPLMart&apos;s discretion for cases where the delivered resources are faulty, missing or
        materially different from what was described.
      </p>
      <h2>How to request a refund</h2>
      <ul>
        <li>Message us on WhatsApp or email with your order ID and the payment email</li>
        <li>We respond within 2 business days and process approved refunds to the original payment method</li>
        <li>Refunds typically reflect in 5-7 business days depending on your bank</li>
      </ul>
    </InfoPage>
  );
}
