import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Terms of service",
  "Draft terms of service for GPLMart. Pending business review.",
  "/terms",
);

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms of service"
      description="Draft terms governing use of the GPLMart website."
      draft
    >
      <h2>Preview status</h2>
      <p>
        This website is a preview. Listings are demo placeholders and are provided for demonstration
        only. Nothing on the site constitutes an offer for sale.
      </p>
      <h2>To be completed by the business</h2>
      <ul>
        <li>Legal entity name and registered details</li>
        <li>Account, purchase and delivery terms</li>
        <li>Acceptable use and licence terms</li>
        <li>Warranty disclaimers and limitation of liability</li>
        <li>Governing law and dispute resolution</li>
      </ul>
    </InfoPage>
  );
}
