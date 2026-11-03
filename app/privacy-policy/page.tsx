import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata("Privacy policy", "Privacy policy for GPLMart.", "/privacy-policy");

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy policy" description="What data GPLMart collects, why, and your choices.">
      <h2>1. Who we are</h2>
      <p>
        GPLMart is an independent digital-resource platform operated from Bengaluru, India with a US mailing
        address. This policy explains what personal data we collect when you visit gplmart.com, purchase a
        membership or use the members area - and what you can do about it.
      </p>

      <h2>2. Data we collect</h2>
      <p><strong>When you browse:</strong></p>
      <ul>
        <li>Standard server logs - IP address, browser, device type, pages visited - kept by our hosting provider for security and performance.</li>
        <li>Approximate country derived from your IP address, used only to display pricing in your local currency (INR in India, USD elsewhere). No precise location is stored.</li>
      </ul>
      <p><strong>When you purchase:</strong></p>
      <ul>
        <li>Contact details - name, email address and phone number - entered on the checkout form.</li>
        <li>Order records - order and payment identifiers, amount, currency, status and timestamps.</li>
        <li>
          Card data is <strong>never</strong> collected by us: payment is processed entirely by our payment
          processor (Razorpay and/or Stripe) inside their PCI-DSS compliant checkout. We only ever see the
          payment status and reference IDs.
        </li>
      </ul>
      <p><strong>When you use the members area:</strong></p>
      <ul>
        <li>Access records - whether your membership is active, sign-in method, and basic audit events (for example password usage and download activity) for security and abuse prevention.</li>
      </ul>
      <p><strong>When you contact us:</strong></p>
      <ul>
        <li>Whatever you send us - name, message, and the channel (WhatsApp or email) you used.</li>
      </ul>

      <h2>3. How we use data</h2>
      <ul>
        <li>To create and verify your payment and deliver membership access</li>
        <li>To send your access details on WhatsApp and by email</li>
        <li>To run the members area - authentication, download delivery and abuse prevention</li>
        <li>To answer support requests</li>
        <li>To display pricing in your local currency</li>
        <li>To prevent fraud, spam and unauthorised access to the library</li>
        <li>To comply with legal obligations such as accounting and tax records</li>
      </ul>
      <p>
        We do <strong>not</strong> sell your data, share it with advertisers, or use it for cross-site tracking.
      </p>

      <h2>4. Legal bases (GDPR-style summary)</h2>
      <ul>
        <li><strong>Contract</strong> - processing needed to deliver what you purchased (order records, access details).</li>
        <li><strong>Legitimate interests</strong> - security, fraud prevention, service improvement.</li>
        <li><strong>Legal obligation</strong> - tax and accounting records we must keep.</li>
        <li><strong>Consent</strong> - marketing messages beyond transactional notifications, where used.</li>
      </ul>

      <h2>5. Processors and third parties</h2>
      <p>We share data only with the providers that run the service:</p>
      <ul>
        <li><strong>Payment processor</strong> (Razorpay and/or Stripe) - processes your payment under their own privacy policies.</li>
        <li><strong>Supabase</strong> - database and authentication for accounts, orders and access records.</li>
        <li><strong>Hosting provider</strong> (Vercel) - serves the site and keeps standard logs.</li>
        <li><strong>WhatsApp / email</strong> - delivery of access details and support conversations.</li>
        <li><strong>Google Drive</strong> - delivery of template bundles to members.</li>
      </ul>
      <p>Each provider handles data under its own policies; we share only what is needed for them to operate.</p>

      <h2>6. International transfers</h2>
      <p>
        Our processors operate globally, so your data may be processed in countries other than yours (including
        the US and EU regions chosen by those providers). Where required, transfers rely on the provider&apos;s
        standard safeguards.
      </p>

      <h2>7. Retention</h2>
      <ul>
        <li>Order and payment records - kept for the period required by tax and accounting law.</li>
        <li>Access and audit records - kept while your membership is active and for a reasonable period after.</li>
        <li>Support conversations - kept until the matter is resolved plus a short follow-up window.</li>
      </ul>

      <h2>8. Security</h2>
      <ul>
        <li>All traffic is encrypted in transit (HTTPS).</li>
        <li>Payment verification happens server-side with signature checks - payment details are never trusted from the browser.</li>
        <li>Access to members-only content is gated and audited; the members password can be rotated at any time.</li>
        <li>No system is perfectly secure - we review access controls regularly and act on suspected misuse quickly.</li>
      </ul>

      <h2>9. Your rights</h2>
      <p>You can contact us at any time to:</p>
      <ul>
        <li>Request a copy of the personal data we hold about you</li>
        <li>Ask us to correct inaccurate details</li>
        <li>Ask us to delete your data where we are not required to keep it (for example order records for tax)</li>
        <li>Object to or restrict particular uses</li>
      </ul>
      <p>We respond to data requests within 30 days.</p>

      <h2>10. Cookies</h2>
      <p>
        The site uses only cookies required for sign-in, checkout and security. No advertising, analytics or
        cross-site tracking cookies are set by us.
      </p>

      <h2>11. Children</h2>
      <p>
        GPLMart sells to businesses and developers; the service is not directed at children under 18 and we do
        not knowingly collect their data.
      </p>

      <h2>12. Changes to this policy</h2>
      <p>
        We may update this policy occasionally; the current version is always on this page. Material changes are
        noted in the page content.
      </p>

      <h2>13. Contact</h2>
      <ul>
        <li>India: Ramanashree Arcade, 18, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001</li>
        <li>USA: Westwood Street, Hayward, California 94544</li>
      </ul>
      <p>Or reach us through the <a href="/contact">contact page</a>.</p>
    </InfoPage>
  );
}
