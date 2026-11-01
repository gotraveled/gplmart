import Link from "next/link";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "About GPLMart",
  "GPLMart offers one-time all-access membership to a template bundle library and a Shopify Liquid code library.",
  "/about",
);

export default function AboutPage() {
  return (
    <InfoPage
      title="About GPLMart"
      description="One payment for a Google Drive template bundle library and a searchable Shopify Liquid code library."
    >
      <h2>What GPLMart offers</h2>
      <p>
        GPLMart currently sells a single offer: a one-time all-access membership. It is not a subscription
        and it does not renew. Members get a page with the Google Drive link for the template bundles and
        access to a protected library of Shopify Liquid code.
      </p>
      <h2>Independence</h2>
      <p>
        GPLMart is an independent project. It is not affiliated with or endorsed by Shopify. Product and
        platform names belong to their respective owners.
      </p>
      <h2>Rights and licensing</h2>
      <p>
        Resources are released to customers only after the owner has confirmed the right to distribute them.
        See the <Link href="/licensing">licensing page</Link> for the draft policy.
      </p>
    </InfoPage>
  );
}
