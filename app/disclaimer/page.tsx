import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Disclaimer",
  "Important disclaimers about GPLMart resources, affiliations and use of the site.",
  "/disclaimer",
);

export default function DisclaimerPage() {
  return (
    <InfoPage title="Disclaimer" description="What GPLMart is - and what it is not." draft>
      <h2>No affiliation</h2>
      <p>
        GPLMart is an independent resource site. It is not affiliated with, endorsed by or sponsored by Shopify
        Inc., Automattic Inc. (WordPress), WooCommerce, Razorpay, or any theme or app developer unless explicitly
        stated. All trademarks and brand names belong to their respective owners and are referenced for
        compatibility description only.
      </p>
      <h2>Resources are provided as-is</h2>
      <p>
        Code snippets, sections and templates are provided &quot;as is&quot; and &quot;as available&quot; for use
        at your own risk. Always back up your theme before installing any code. Test every snippet on a duplicate
        theme before publishing to a live store.
      </p>
      <h2>Honesty about origins</h2>
      <p>
        GPLMart does not claim that any resource is official, original or exclusive unless that specific item is
        labelled as such. Where content is third-party or licensed for redistribution, the listing says so.
        Catalogue listings are published only after rights are confirmed.
      </p>
      <h2>Results are not guaranteed</h2>
      <p>
        Conversion-focused components follow commonly cited best practices, but no snippet guarantees revenue,
        conversion rate or search ranking improvements. Store performance depends on your products, traffic,
        pricing and brand.
      </p>
      <h2>Not professional advice</h2>
      <p>
        Nothing on this site is legal, tax or professional advice. For questions about licensing obligations for
        your specific use case, consult a qualified professional.
      </p>
    </InfoPage>
  );
}
