import Link from "next/link";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";

export const metadata = infoMetadata(
  "Contact",
  "How to get in touch with GPLMart. Contact channels will be published before launch.",
  "/contact",
);

export default function ContactPage() {
  return (
    <InfoPage title="Contact" description="Contact channels will be published before launch." draft>
      <h2>Get in touch</h2>
      <p>
        Official contact details (such as a support email address) have not been confirmed yet and will be
        added here by the business before launch. No contact form is active in this preview.
      </p>
      <h2>In the meantime</h2>
      <p>
        You can read the <Link href="/refund-policy">refund policy</Link>, <Link href="/licensing">licensing</Link>{" "}
        and <Link href="/terms">terms</Link> drafts, or <Link href="/">return to the offer</Link>.
      </p>
    </InfoPage>
  );
}
