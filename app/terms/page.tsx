import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Terms of Service - GPLMart All-Access Membership",
  "The terms of service governing GPLMart's one-time all-access membership: what you receive, licensing, payments, refunds, acceptable use and liability.",
  "/terms",
);

export default function TermsPage() {
  return (
    <InfoPage title="Terms of service" description="The agreement between you and GPLMart for the all-access membership.">
      <h2>1. Agreement to these terms</h2>
      <p>
        These Terms of Service govern your use of gplmart.com and the purchase and use of the GPLMart all-access
        membership. By accessing the site or completing a purchase you agree to these terms. If you do not agree,
        do not use the site or purchase.
      </p>
      <p>
        GPLMart is an independent digital-resource platform operated from Bengaluru, India, with a US mailing
        address in Hayward, California. We are not affiliated with Shopify Inc., Automattic Inc. or any
        third-party theme or plugin vendor.
      </p>

      <h2>2. What the offer is</h2>
      <p>
        GPLMart offers a single product: a one-time <strong>all-access membership</strong>. It is not a
        subscription and does not automatically renew. The membership includes:
      </p>
      <ul>
        <li>Access to the GPLMart Shopify Liquid code library (sections and snippets)</li>
        <li>Access to original digital products - HTML templates, PHP scripts and ebooks</li>
        <li>New components, products and guides added during your access period</li>
      </ul>
      <p>
        What is included is described on the home page and the resource library at the time of purchase.
      </p>

      <h2>3. Pricing and payment</h2>
      <ul>
        <li>
          Prices are displayed in your local currency - Indian rupees (INR) for visitors in India and US dollars
          (USD) elsewhere. The price shown on the checkout page is the amount charged.
        </li>
        <li>
          Payment is collected once through our payment processor (Razorpay and/or Stripe, depending on your
          region and the gateway enabled at checkout). GPLMart does not store your card details; card data is
          handled entirely by the payment processor under PCI-DSS compliant processing.
        </li>
        <li>
          A purchase is complete when the payment processor confirms the payment. Access is granted automatically
          after successful verification of that confirmation.
        </li>
        <li>
          Prices may change for future purchases, but the amount paid at checkout is final for that transaction.
          There are no recurring charges.
        </li>
      </ul>

      <h2>4. Delivery and access</h2>
      <p>
        Membership access is delivered digitally - there is no physical shipment. After payment you receive your
        access details on WhatsApp and by email, and the checkout flow links directly to the members area.
      </p>
      <ul>
        <li>All-access provides 12 months of members-area access from the purchase date.</li>
        <li>Content you have legitimately downloaded remains yours to use under the licence in section 6.</li>
      </ul>
      <p>
        If access details are not delivered automatically, contact support and we will resolve it - usually the
        same day.
      </p>

      <h2>5. Acceptable use</h2>
      <p>Your membership is personal. You agree not to:</p>
      <ul>
        <li>Share your account, access password or members-area access with anyone else</li>
        <li>Republish, resell or redistribute the raw code library, product files or ebook content as a competing product</li>
        <li>Claim GPLMart resources as official Shopify or WordPress products</li>
        <li>Use the resources to build phishing, spam, deceptive or otherwise unlawful storefronts</li>
        <li>Attempt to bypass access controls, scrape the library in bulk, or disrupt the service</li>
      </ul>
      <p>
        Breaching these terms may result in access being withdrawn without refund where the breach is material.
      </p>

      <h2>6. Licence granted to members</h2>
      <p>Subject to these terms, GPLMart grants you a non-exclusive, non-transferable licence to:</p>
      <ul>
        <li>Install GPLMart-original snippets and sections on Shopify stores you own or manage, including stores you build for clients</li>
        <li>Use digital products (HTML templates, PHP scripts) in unlimited projects, including client work</li>
        <li>Read and share ebooks and guides within your organisation</li>
      </ul>
      <p>
        You retain no ownership of the GPLMart-original code itself. The licence covers use; redistribution of
        the library as a product is not covered.
      </p>

      <h2>7. Third-party content and trademarks</h2>
      <p>
        The catalogue consists of GPLMart-original work. Third-party services used to operate the site
        (hosting, payments, WhatsApp) are governed by their own terms. Trademarks, product names and brand
        names referenced on this site belong to their respective owners and are used for compatibility
        description only.
      </p>

      <h2>8. Refunds</h2>
      <p>
        Purchases are covered by a 30-day money-back guarantee. The full conditions - eligibility, how to
        request, and processing times - are on the <a href="/refund-policy">refund policy</a> page, which forms
        part of these terms.
      </p>

      <h2>9. Warranty and disclaimers</h2>
      <p>
        Resources are provided &quot;as is&quot; and &quot;as available&quot;. We describe compatibility honestly
        (theme requirements, metafields, OS 2.0 features) but we do not warrant that every item will work
        unmodified in every custom theme. Always back up your theme and test on a duplicate before publishing to
        a live store. See the <a href="/disclaimer">disclaimer</a> for the full text.
      </p>
      <p>
        No snippet guarantees conversion, revenue or ranking improvements - results depend on your products,
        traffic and execution.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, GPLMart&apos;s total liability for any claim arising from the
        service or a purchase is limited to the amount you paid for the membership. We are not liable for
        indirect, incidental or consequential damages, lost profits, or losses from third-party services
        (hosting, payment processors, WhatsApp) outside our reasonable control.
      </p>

      <h2>11. Changes to the service or terms</h2>
      <p>
        We may update these terms from time to time; the current version is always on this page with the
        effective date of the latest update. Continued use after a change constitutes acceptance. Your completed
        purchase remains governed by the terms in effect at the time of that purchase.
      </p>

      <h2>12. Governing law</h2>
      <p>
        These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the
        courts of Bengaluru, Karnataka, without prejudice to any non-waivable consumer rights you hold in your
        own jurisdiction.
      </p>

      <h2>13. Contact</h2>
      <p>Questions about these terms:</p>
      <ul>
        <li>India: Ramanashree Arcade, 18, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001</li>
        <li>USA: Westwood Street, Hayward, California 94544</li>
      </ul>
      <p>You can also reach us through the <a href="/contact">contact page</a>.</p>
    </InfoPage>
  );
}
