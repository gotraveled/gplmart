import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Licensing",
  "Draft licensing information for GPLMart all-access resources. Pending business review.",
  "/licensing",
);

export default function LicensingPage() {
  return (
    <InfoPage title="Licensing" description="How licensing applies to GPLMart all-access resources." draft>
      <h2>Your access is personal</h2>
      <p>
        All-access membership is linked to your account. Do not assume it lets you redistribute, resell or
        share the bundles, the Drive link or the code library. Terms for specific resources may differ and
        will be stated with them.
      </p>
      <h2>No official-status claims</h2>
      <p>
        GPLMart does not claim that any resource is official, original or owned by GPLMart unless that has
        been verified and stated. GPLMart is not affiliated with Shopify. Third-party names and trademarks
        belong to their respective owners.
      </p>
      <h2>Release of content</h2>
      <p>Resources are made available only after the owner has recorded evidence of the right to distribute them.</p>
      <h2>To be completed by the business</h2>
      <ul>
        <li>Permitted and prohibited uses, including client projects</li>
        <li>Redistribution and resale rules</li>
        <li>Licences of any third-party or open-source components</li>
      </ul>
    </InfoPage>
  );
}
