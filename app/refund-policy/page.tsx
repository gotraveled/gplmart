import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Refund policy",
  "Draft refund policy for GPLMart. Pending business review.",
  "/refund-policy",
);

export default function RefundPolicyPage() {
  return (
    <InfoPage
      title="Refund policy"
      description="Draft policy for refunds on digital products."
      draft
    >
      <h2>Current status</h2>
      <p>
        Purchases are not available in this preview, so no payments are taken and no refunds apply.
      </p>
      <h2>Digital products</h2>
      <p>
        Digital goods are delivered electronically and cannot be returned in the usual sense. The
        business must decide and publish its refund conditions before launch.
      </p>
      <h2>To be completed by the business</h2>
      <ul>
        <li>Eligibility criteria and time limits for refund requests</li>
        <li>How to request a refund and expected response times</li>
        <li>Handling of faulty, missing or mis-described products</li>
        <li>Compliance with applicable consumer law</li>
      </ul>
    </InfoPage>
  );
}
