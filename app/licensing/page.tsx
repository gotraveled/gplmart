import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Licensing",
  "Draft licensing information for GPLMart products. Pending business review.",
  "/licensing",
);

export default function LicensingPage() {
  return (
    <InfoPage
      title="Licensing"
      description="How licensing information will be presented for GPLMart products."
      draft
    >
      <h2>Per-product licence information</h2>
      <p>
        Each real product listing will state its licence, its source and what you may do with it.
        Terms can differ between products, so always check the listing before purchasing.
      </p>
      <h2>No ownership or official-status claims</h2>
      <p>
        GPLMart does not claim that a product is official, original or owned by GPLMart unless that
        has been verified and stated on the listing. Third-party names and trademarks belong to their
        respective owners.
      </p>
      <h2>Demo products</h2>
      <p>
        Items shown during this preview are placeholders. They carry no licence and cannot be
        purchased or downloaded.
      </p>
      <h2>To be completed by the business</h2>
      <ul>
        <li>Permitted and prohibited uses</li>
        <li>Number of sites or projects per licence</li>
        <li>Redistribution and resale rules</li>
        <li>Handling of third-party and open-source licences</li>
      </ul>
    </InfoPage>
  );
}
