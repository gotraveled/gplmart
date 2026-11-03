import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Copyright & takedowns",
  "How GPLMart handles intellectual property and how to report infringing content.",
  "/copyright",
);

export default function CopyrightPage() {
  return (
    <InfoPage title="Copyright & takedowns" description="Our approach to intellectual property - and how to report a concern.">
      <h2>1. Our commitment</h2>
      <p>
        GPLMart only publishes or distributes resources where it holds the rights - original content created for
        GPLMart, properly licensed third-party work, or items whose licences permit redistribution (such as
        GPL-licensed WordPress themes and plugins). We do not knowingly distribute pirated, nulled or
        unauthorised copies of commercial products.
      </p>
      <p>
        Every item in the catalogue is recorded against its licence status before it ships. Where an item is
        third-party, its licence terms are preserved inside the bundle.
      </p>

      <h2>2. If you believe your work appears here without authorisation</h2>
      <p>Contact us and include:</p>
      <ul>
        <li>Your name and contact details</li>
        <li>A link to the specific content on GPLMart you are reporting</li>
        <li>Proof that you own the work or represent the rights holder (for example your own listing, repository or registration)</li>
        <li>A statement that the use is unauthorised</li>
      </ul>
      <p>
        Send the report to the addresses in section 5 or through the <a href="/contact">contact page</a>. We
        acknowledge genuine reports within 2 business days.
      </p>

      <h2>3. What happens next</h2>
      <ul>
        <li>The report is reviewed against our distribution records for the item</li>
        <li>Where a claim is valid, we remove or correct the listing promptly - without waiting for legal escalation</li>
        <li>Where the listing is legitimate (for example GPL-licensed items, which the law permits us to redistribute), we explain the basis clearly</li>
        <li>Repeat or bulk reporters are handled on the same standard - every claim is reviewed individually</li>
      </ul>

      <h2>4. If your content was removed in error</h2>
      <p>
        If you believe a listing was taken down incorrectly, reply to the takedown notice with your licensing or
        ownership documentation and we will review it. A valid counter-notice leads to the item being restored.
      </p>

      <h2>5. Contact</h2>
      <ul>
        <li>India: Ramanashree Arcade, 18, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001</li>
        <li>USA: Westwood Street, Hayward, California 94544</li>
      </ul>

      <h2>6. Licence terms for buyers</h2>
      <p>
        Each resource lists its licence terms on its page. Unless a listing states otherwise, purchases grant a
        non-transferable licence for your own stores and client projects - not for resale or republication of the
        raw code itself. See the <a href="/licensing">licensing page</a> for the full member licence.
      </p>
    </InfoPage>
  );
}
