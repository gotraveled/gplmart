import Link from "next/link";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "About GPLMart",
  "GPLMart is a planned marketplace for digital products and resources for website owners, Shopify merchants, WordPress users and developers.",
  "/about",
);

export default function AboutPage() {
  return (
    <InfoPage
      title="About GPLMart"
      description="A planned marketplace for digital products and resources for people who build websites and online stores."
    >
      <h2>What GPLMart is for</h2>
      <p>
        GPLMart is being built as a home for digital resources: Shopify themes, sections and Liquid
        snippets, WordPress themes and plugins, HTML templates and components, AI prompt packs, and
        bundles of developer resources.
      </p>
      <h2>Where the project is today</h2>
      <p>
        This is a preview build. The catalogue contains clearly labelled demo products, purchasing is
        not available, and there are no customer accounts yet.
      </p>
      <h2>What is planned</h2>
      <ul>
        <li>One-time purchases with a supported payment provider</li>
        <li>Customer accounts and a protected resource library</li>
        <li>Email delivery of purchase confirmations</li>
      </ul>
      <h2>Our approach to products</h2>
      <p>
        Product details, including licensing and source information, will be verified before a listing
        goes live. See the <Link href="/licensing">licensing page</Link> for the draft policy.
      </p>
    </InfoPage>
  );
}
