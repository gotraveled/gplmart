import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Licensing - GPLMart Member Licence & GPL Items",
  "Licensing information for GPLMart all-access resources: the member licence covering our original Liquid code, digital products and ebooks.",
  "/licensing",
);

export default function LicensingPage() {
  return (
    <InfoPage title="Licensing" description="How licensing applies to GPLMart all-access resources.">
      <h2>1. Your access is personal</h2>
      <p>
        All-access membership is linked to your account and contact details. Do not assume it lets you
        redistribute, resell or share the downloads or the code library. Terms for specific
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
        <li>Share your access details or the members password</li>
        <li>Claim the code is an official Shopify product or written by Shopify</li>
      </ul>

      <h2>3. Digital products (HTML templates, PHP scripts)</h2>
      <p>
        Products in the catalogue are GPLMart-original code released under GPL-3.0-or-later. Under your
        membership licence you may:
      </p>
      <ul>
        <li>Use them on unlimited sites, stores and projects you own or manage</li>
        <li>Modify them freely - they are designed to be edited</li>
        <li>Ship them inside client work and commercial products you build</li>
      </ul>
      <p>You may not:</p>
      <ul>
        <li>Redistribute the product files themselves as a competing catalogue or bundle</li>
        <li>Remove licence notices from the files</li>
      </ul>

      <h2>4. Ebooks and guides</h2>
      <p>
        Ebooks and written guides are GPLMart-original content licensed for personal and team use under your
        membership. You may read, follow and share them inside your organisation. You may not republish,
        resell or redistribute the text itself.
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
