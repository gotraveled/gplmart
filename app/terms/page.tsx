import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata("Terms of service", "Draft terms of service for GPLMart. Pending business review.", "/terms");

export default function TermsPage() {
  return (
    <InfoPage title="Terms of service" description="Draft terms governing use of GPLMart." draft>
      <h2>The offer</h2>
      <p>
        GPLMart offers a one-time all-access membership. It is not a subscription. What it includes is
        described on the home page. No updates, support or lifetime availability are promised unless
        stated in final terms.
      </p>
      <h2>Account use</h2>
      <p>Your membership is for your own use. Sharing your account or the Drive link may result in access being withdrawn.</p>
      <h2>To be completed by the business</h2>
      <ul>
        <li>Legal entity name and registered details</li>
        <li>Delivery, refund and support terms</li>
        <li>Warranty disclaimers and limitation of liability</li>
        <li>Governing law and dispute resolution</li>
      </ul>
    </InfoPage>
  );
}
