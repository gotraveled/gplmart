import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata("Privacy policy", "Privacy policy for GPLMart.", "/privacy-policy");

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy policy" description="How GPLMart handles personal data.">
      <h2>Data handled by the service</h2>
      <ul>
        <li>Account data: your email address and a hashed password, managed by Supabase Authentication.</li>
        <li>Payment records: order and payment identifiers, amount, currency and status. Card details are handled by Razorpay and are never stored by GPLMart.</li>
        <li>Access records: whether your all-access membership is active.</li>
      </ul>
      <h2>Providers</h2>
      <p>The service uses Supabase (accounts and database), Razorpay (payments) and a hosting platform that may keep standard server logs.</p>
      <h2>Your rights</h2>
      <p>
        You can request a copy of the data we hold about you, or ask for it to be deleted, by contacting us
        on WhatsApp or by email. We respond to data requests within 30 days.
      </p>
      <h2>Cookies</h2>
      <p>
        The site uses only cookies required for sign-in and checkout. No advertising or cross-site tracking
        cookies are set.
      </p>
    </InfoPage>
  );
}
