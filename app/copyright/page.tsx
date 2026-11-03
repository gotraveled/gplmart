import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Copyright & takedowns",
  "How GPLMart handles intellectual property and how to report infringing content.",
  "/copyright",
);

export default function CopyrightPage() {
  return (
    <InfoPage title="Copyright & takedowns" description="Our approach to intellectual property - and how to report a concern." draft>
      <h2>Our commitment</h2>
      <p>
        GPLMart only publishes or distributes resources where it holds the rights - original content created for
        GPLMart, properly licensed third-party work, or items whose licences permit redistribution. We do not
        knowingly distribute pirated, nulled or unauthorised copies of commercial products.
      </p>
      <h2>If you believe your work appears here without authorisation</h2>
      <p>Contact us and include:</p>
      <ul>
        <li>Your name and contact details</li>
        <li>A link to the content on GPLMart you are reporting</li>
        <li>Proof that you own the work or represent the rights holder</li>
        <li>A statement that the use is unauthorised</li>
      </ul>
      <p>
        We review every genuine report promptly. Where a claim is valid, we remove or correct the listing without
        waiting for legal escalation.
      </p>
      <h2>If your content was removed in error</h2>
      <p>
        If you believe a listing was taken down incorrectly, reply to the takedown notice with your licensing or
        ownership documentation and we will review it.
      </p>
      <h2>Licence terms for buyers</h2>
      <p>
        Each resource lists its licence terms on its page. Unless a listing states otherwise, purchases grant a
        non-transferable licence for your own stores and client projects - not for resale or republication of the
        raw code itself.
      </p>
    </InfoPage>
  );
}
