import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Licensing",
  "Licensing information for GPLMart all-access resources - member licence, GPL items and Shopify bundles.",
  "/licensing",
);

export default function LicensingPage() {
  return (
    <InfoPage title="Licensing" description="How licensing applies to GPLMart all-access resources.">
      <h2>1. Your access is personal</h2>
      <p>
        All-access membership is linked to your account and contact details. Do not assume it lets you
        redistribute, resell or share the bundles, the Drive link or the code library. Terms for specific
        resources may differ and are stated with them.
      </p>
      <p>
        The licence below explains what membership actually grants - the uses it covers, and the few things it
        does not.
      </p>

      <h2>2. GPLMart-original code (Liquid snippets and sections)</h2>
      <p>
        Snippets and sections marked as GPLMart-original are written by or for GPLMart. Under your membership
        licence you may:
      </p>
      <ul>
        <li>Install them on Shopify stores you own or operate</li>
        <li>Install them on stores you build or maintain for clients, as part of a client project</li>
        <li>Modify them to fit your theme - they are designed to be edited</li>
      </ul>
      <p>You may not:</p>
      <ul>
        <li>Redistribute the raw code library itself, in whole or part, as a competing product</li>
        <li>Share your access details, the members password or the Drive link</li>
        <li>Claim the code is an official Shopify product or written by Shopify</li>
      </ul>

      <h2>3. GPL-licensed WordPress resources</h2>
      <p>
        WordPress itself is released under the GNU General Public License (GPL). Because WordPress themes and
        plugins are derivative works of WordPress, they are GPL-licensed too - and the GPL explicitly permits
        anyone to redistribute them, including for a fee. That is the legal basis on which GPLMart can include
        third-party WordPress themes and plugins in the bundle.
      </p>
      <p>What a GPL-licensed item from the bundle includes:</p>
      <ul>
        <li>The complete product files, identical to what the vendor distributes</li>
        <li>The right to install it on as many sites as you like - including client sites</li>
        <li>The same GPL freedoms: use, modify and redistribute the item itself</li>
      </ul>
      <p>What it does not include:</p>
      <ul>
        <li>A vendor licence key, activation or account access</li>
        <li>Automatic updates from the original developer - updates ship through the bundle as new bundles are published</li>
        <li>Official support from the original vendor</li>
        <li>Cloud features that phone home to the vendor&apos;s servers - those may require a key from the vendor</li>
      </ul>
      <p>
        The GPL licence text is preserved inside every bundled item. Where an item has known cloud features or
        third-party assets with separate terms, that is noted in the bundle manifest.
      </p>

      <h2>4. Shopify themes and non-GPL items</h2>
      <p>
        Shopify themes are not GPL-licensed - third-party paid themes cannot legally be redistributed. Shopify
        bundles therefore contain only themes GPLMart owns or has explicit distribution rights for. Each item in
        the bundle is labelled with its licence status.
      </p>

      <h2>5. No official-status claims</h2>
      <p>
        GPLMart does not claim that any resource is official, original or owned by GPLMart unless that has been
        verified and stated. GPLMart is not affiliated with Shopify. Third-party names and trademarks belong to
        their respective owners.
      </p>

      <h2>6. Release of content</h2>
      <p>
        Resources are made available only after the owner has recorded evidence of the right to distribute them.
        If a listing ever appears in error, report it through the <a href="/copyright">copyright page</a> and it
        is reviewed and removed promptly where warranted.
      </p>

      <h2>7. Questions</h2>
      <p>
        Unclear on whether a use is covered? Ask before assuming - contact details are on the{" "}
        <a href="/contact">contact page</a>.
      </p>
    </InfoPage>
  );
}
