import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Licensing",
  "Licensing information for GPLMart all-access resources.",
  "/licensing",
);

export default function LicensingPage() {
  return (
    <InfoPage title="Licensing" description="How licensing applies to GPLMart all-access resources.">
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
      <h2>GPL-licensed WordPress resources</h2>
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
        <li>The same GPL freedoms: use, modify and redistribute</li>
      </ul>
      <p>What it does not include:</p>
      <ul>
        <li>A vendor licence key, activation or account access</li>
        <li>Automatic updates from the original developer - updates ship through the bundle as new bundles are published</li>
        <li>Official support from the original vendor</li>
        <li>Cloud features that phone home to the vendor&apos;s servers - those may require a key from the vendor</li>
      </ul>
      <h2>Shopify resources</h2>
      <p>
        Shopify themes are not GPL-licensed - third-party paid themes cannot legally be redistributed. Shopify
        bundles therefore contain only themes GPLMart owns or has explicit distribution rights for. The Liquid
        snippet library is GPLMart&apos;s own code, licensed to members for use on their own and client stores.
      </p>
      <h2>Release of content</h2>
      <p>Resources are made available only after the owner has recorded evidence of the right to distribute them.</p>
    </InfoPage>
  );
}
