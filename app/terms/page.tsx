import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata("Terms of service", "Terms of service for GPLMart.", "/terms");

export default function TermsPage() {
  return (
    <InfoPage title="Terms of service" description="Terms governing use of GPLMart.">
      <h2>The offer</h2>
      <p>
        GPLMart offers a one-time all-access membership. It is not a subscription. What it includes is
        described on the home page. New snippets and bundles added during your access period are included.
      </p>
      <h2>Account use</h2>
      <p>Your membership is for your own use. Sharing your account or the Drive link may result in access being withdrawn.</p>
      <h2>Acceptable use</h2>
      <p>
        Members may use GPLMart-original snippets and licensed bundle items on stores they own or manage,
        including client projects. Redistributing the raw code library itself, or sharing access
        credentials, is not permitted.
      </p>
    </InfoPage>
  );
}
