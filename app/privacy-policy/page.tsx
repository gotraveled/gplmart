import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Privacy policy",
  "Draft privacy policy for GPLMart. Pending business review.",
  "/privacy-policy",
);

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Privacy policy"
      description="Draft policy describing how personal data will be handled."
      draft
    >
      <h2>Current status</h2>
      <p>
        This preview does not have accounts, checkout or contact forms, and does not intentionally
        collect personal information. Search terms entered in the catalogue are used to filter the page
        and appear in the page URL.
      </p>
      <h2>Hosting</h2>
      <p>
        The site is intended to be hosted on a third-party platform that may keep standard server logs
        such as IP addresses and request details.
      </p>
      <h2>To be completed by the business</h2>
      <ul>
        <li>Identity and contact details of the data controller</li>
        <li>Data collected once accounts and purchases exist, and why</li>
        <li>Payment, email and analytics providers used</li>
        <li>Retention periods and user rights</li>
        <li>Cookie and consent practices</li>
      </ul>
    </InfoPage>
  );
}
