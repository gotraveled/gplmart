import Link from "next/link";
import { HelpCircle, MapPin, MessageCircle, Scale, Wallet } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { ButtonLink } from "@/components/ui/button";

export const metadata = infoMetadata(
  "Contact GPLMart - Support, Sales & Licensing",
  "How to reach GPLMart for pre-purchase questions, order and access help, and licensing or takedown requests. We reply by email and WhatsApp.",
  "/contact",
);

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const waUrl = whatsapp.length > 5 ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi GPLMart - ")}` : null;

const topics = [
  {
    icon: HelpCircle,
    title: "Pre-purchase questions",
    text: "Theme compatibility, what's inside the bundle, whether a specific snippet fits your use case - ask before paying. Include your theme name and what you're trying to build.",
  },
  {
    icon: Wallet,
    title: "Orders & access",
    text: "Payment confirmation, access codes, WhatsApp handoff - include your order reference (the ID shown after payment) and the email used at checkout.",
  },
  {
    icon: Scale,
    title: "Licensing & takedowns",
    text: "Questions about GPL redistribution, member licence scope, or a rights concern with any listing - see the copyright page or write to us directly.",
  },
];

const addresses = [
  {
    label: "India (registered)",
    lines: ["Ramanashree Arcade, 18, Mahatma Gandhi Rd,", "Craig Park Layout, Ashok Nagar,", "Bengaluru, Karnataka 560001"],
  },
  {
    label: "United States (mailing)",
    lines: ["Westwood Street,", "Hayward, California 94544"],
  },
];

export default function ContactPage() {
  return (
    <InfoPage title="Contact" description="Reach GPLMart for support, sales or licensing questions.">
      <h2>Fastest: WhatsApp</h2>
      <p>
        The quickest way to reach us is WhatsApp - we reply during Indian business hours (10am-7pm IST, Mon-Sat).
        Paying customers get the same channel after checkout, so you already know the number.
      </p>
      {waUrl && (
        <ButtonLink href={waUrl} target="_blank" rel="noopener noreferrer" className="mt-4">
          <MessageCircle aria-hidden className="size-4" /> Message us on WhatsApp
        </ButtonLink>
      )}
      <p className="mt-3 text-sm text-muted">
        Email: <a href="mailto:info@gplmart.com">info@gplmart.com</a>
      </p>

      <h2>Pick your topic</h2>
      <div className="not-prose mt-4 grid gap-4 sm:grid-cols-3">
        {topics.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <Icon aria-hidden className="size-5 text-accent" />
            <h3 className="mt-3 font-display text-sm font-semibold">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2>Postal addresses</h2>
      <div className="not-prose mt-4 grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.label} className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <p className="flex items-center gap-1.5 font-display text-sm font-semibold">
              <MapPin aria-hidden className="size-4 text-accent" /> {a.label}
            </p>
            {a.lines.map((l) => (
              <p key={l} className="mt-1 text-sm text-muted">{l}</p>
            ))}
          </div>
        ))}
      </div>
      <p>
        GPLMart sells worldwide - pricing is shown in your local currency (INR in India, USD everywhere else).
        The payment processor handles the card charge in your currency.
      </p>

      <h2>Useful links</h2>
      <ul>
        <li>
          <Link href="/faq">FAQ</Link> - most questions are answered there already
        </li>
        <li>
          <Link href="/how-it-works">How it works</Link> - the exact purchase-to-access flow
        </li>
        <li>
          <Link href="/refund-policy">Refund policy</Link> &middot; <Link href="/licensing">Licensing</Link> &middot;{" "}
          <Link href="/terms">Terms</Link> &middot; <Link href="/privacy-policy">Privacy</Link>
        </li>
        <li>
          <Link href="/copyright">Copyright &amp; takedowns</Link> - report a rights concern
        </li>
      </ul>
    </InfoPage>
  );
}
