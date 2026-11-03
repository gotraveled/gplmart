import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Refund policy",
  "Refund policy for GPLMart digital products - 30-day money-back guarantee.",
  "/refund-policy",
);

export default function RefundPolicyPage() {
  return (
    <InfoPage title="Refund policy" description="How refunds work for GPLMart digital products.">
      <h2>1. The 30-day money-back guarantee</h2>
      <p>
        Every all-access purchase is covered by a 30-day money-back guarantee. If the library does not work for
        your store, message us on WhatsApp or email within 30 days of purchase and we will refund the payment.
      </p>
      <p>
        The guarantee exists because digital resources can only be evaluated after download. We would rather
        refund an unhappy customer than hold money for something that did not help.
      </p>

      <h2>2. What is refundable</h2>
      <ul>
        <li>The all-access membership fee, in full, within 30 days of purchase</li>
        <li>The 12-month access extension order bump, in full, within the same window</li>
      </ul>
      <p>
        Refunds are returned to the original payment method (card, UPI, wallet or net-banking) through our
        payment processor.
      </p>

      <h2>3. When we may decline a refund</h2>
      <p>We may refuse or partially grant a refund where:</p>
      <ul>
        <li>The request arrives more than 30 days after purchase</li>
        <li>There is evidence of abuse - for example bulk downloading followed immediately by a refund request, or sharing access publicly</li>
        <li>The issue was already resolved and the customer confirmed resolution</li>
        <li>The purchase is disputed through a chargeback while a refund request is open (the chargeback takes precedence)</li>
      </ul>
      <p>These are judgment calls, applied fairly - most refund requests are honoured.</p>

      <h2>4. How to request a refund</h2>
      <ul>
        <li>Message us on WhatsApp or email with your order ID and the email used at checkout</li>
        <li>Briefly describe what did not work - this is for our records, not a gate</li>
        <li>We respond within 2 business days and process approved refunds immediately</li>
      </ul>
      <p>
        Approved refunds typically reflect in 5-7 business days, depending on your bank or card provider.
        UPI refunds are usually faster.
      </p>

      <h2>5. After a refund</h2>
      <ul>
        <li>Members-area access ends when the refund is processed</li>
        <li>Items already downloaded remain usable under the personal licence, except where a refund was issued for non-delivery or a material mis-description</li>
        <li>The shared members password may rotate - access will not continue after refund</li>
      </ul>

      <h2>6. Chargebacks</h2>
      <p>
        Please contact us before raising a dispute with your bank - most issues are resolved faster and without
        the administrative delay of a chargeback. A chargeback raised in bad faith may result in the account
        being permanently blocked.
      </p>

      <h2>7. Currency of refunds</h2>
      <p>
        Refunds are issued in the currency you were charged - INR for India purchases, USD elsewhere. Your bank
        may apply its own conversion rate if your account currency differs.
      </p>

      <h2>8. Contact</h2>
      <ul>
        <li>India: Ramanashree Arcade, 18, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001</li>
        <li>USA: Westwood Street, Hayward, California 94544</li>
      </ul>
      <p>Or through the <a href="/contact">contact page</a>.</p>
    </InfoPage>
  );
}
