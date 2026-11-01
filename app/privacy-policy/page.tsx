import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata("Privacy policy", "Draft privacy policy for GPLMart. Pending business review.", "/privacy-policy");

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy policy" description="Draft policy describing how personal data is handled." draft>
      <h2>Data handled by the service</h2>
      <ul>
        <li>Account data: your email address and a hashed password, managed by Supabase Authentication.</li>
        <li>Payment records: order and payment identifiers, amount, currency and status. Card details are handled by Razorpay and are never stored by GPLMart.</li>
        <li>Access records: whether your all-access membership is active.</li>
      </ul>
      <h2>Providers</h2>
      <p>The service uses Supabase (accounts and database), Razorpay (payments) and a hosting platform that may keep standard server logs.</p>
      <h2>To be completed by the business</h2>
      <ul>
        <li>Identity and contact details of the data controller</li>
        <li>Retention periods and user rights, including deletion requests</li>
        <li>Cookie and consent practices</li>
      </ul>
    </InfoPage>
  );
}
