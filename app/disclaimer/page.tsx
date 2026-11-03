import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Disclaimer",
  "Important disclaimers about GPLMart resources, affiliations and use of the site.",
  "/disclaimer",
);

export default function DisclaimerPage() {
  return (
    <InfoPage title="Disclaimer" description="What GPLMart is - and what it is not.">
      <h2>1. No affiliation</h2>
      <p>
        GPLMart is an independent resource site. It is not affiliated with, endorsed by or sponsored by Shopify
        Inc., Automattic Inc. (WordPress), WooCommerce, Razorpay, Stripe, Google or any theme or app developer
        unless explicitly stated. All trademarks and brand names belong to their respective owners and are
        referenced for compatibility description only - for example &quot;for Shopify&quot; means
        &quot;compatible with the Shopify platform&quot;, not &quot;made by Shopify&quot;.
      </p>

      <h2>2. Resources are provided as-is</h2>
      <p>
        Code snippets, sections and templates are provided &quot;as is&quot; and &quot;as available&quot; for use
        at your own risk. Compatibility notes describe what an item expects - theme version, metafields, OS 2.0
        features - but every custom theme is different, and some items may need small adjustments in heavily
        modified themes.
      </p>
      <p>
        Always back up your theme before installing any code. Test every snippet on a duplicate theme before
        publishing to a live store. This is standard Shopify development practice and protects you regardless
        of where code comes from.
      </p>

      <h2>3. Honesty about origins</h2>
      <p>
        GPLMart does not claim that any resource is official, original or exclusive unless that specific item is
        labelled as such. Where content is third-party or licensed for redistribution, the listing says so.
        Catalogue listings are published only after rights are confirmed.
      </p>
      <p>
        GPL-licensed items ship with their licence intact; the freedoms the GPL grants (use, modify,
        redistribute) are real, and the exclusions (vendor keys, vendor support, private update servers) are
        stated plainly.
      </p>

      <h2>4. Results are not guaranteed</h2>
      <p>
        Conversion-focused components follow commonly cited best practices, but no snippet guarantees revenue,
        conversion rate or search ranking improvements. Store performance depends on your products, traffic,
        pricing and brand. Sample data in previews (counts, ratings, timers) is illustrative - wire real values
        before going live.
      </p>

      <h2>5. Third-party services</h2>
      <p>
        The site uses third-party services for hosting, payments, email, WhatsApp messaging and Drive delivery.
        We are not responsible for outages, delays or policies of those services, though we will always help
        resolve delivery issues on our side.
      </p>

      <h2>6. Not professional advice</h2>
      <p>
        Nothing on this site is legal, tax or professional advice. The licensing page explains GPL redistribution
        in general terms - for questions about obligations in your specific use case, consult a qualified
        professional.
      </p>

      <h2>7. Errors</h2>
      <p>
        We aim for accuracy but mistakes happen - typos in documentation, stale compatibility notes, or the
        occasional broken example. Report anything that looks wrong through the{" "}
        <a href="/contact">contact page</a> and we will fix it.
      </p>
    </InfoPage>
  );
}
