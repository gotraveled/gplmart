import {
  ArrowRight,
  BookOpen,
  ClipboardCopy,
  Code2,
  CreditCard,
  Download,
  Eye,
  GraduationCap,
  KeyRound,
  MessageCircle,
  Store,
} from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GeoPrice } from "@/components/ui/geo-price";
import { freeExampleIds } from "@/lib/playground/examples";

export const metadata = infoMetadata(
  "How it works",
  "Step-by-step: preview components in the sandbox, pay once, unlock the members library and digital products.",
  "/how-it-works",
);

const steps = [
  {
    icon: Eye,
    title: "Preview in the sandbox",
    text: `Every Liquid component renders live in the playground before you buy. Tweak colours, text and settings, watch the storefront output change, and inspect the code structure. ${freeExampleIds.size} examples are fully open - copy them free.`,
  },
  {
    icon: CreditCard,
    title: "One-time payment",
    text: "Checkout is a single secure payment in your local currency - enter your name, email and WhatsApp number. No account, no signup, no subscription. Your card details never touch our servers.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp handoff",
    text: "After payment you're sent to WhatsApp with your order reference. We confirm your purchase and point you to the access page - usually within business hours.",
  },
  {
    icon: KeyRound,
    title: "Unlock the members area",
    text: "Open the access page, enter the email you paid with, and a one-time code lands in your inbox. Verify it once and you get 12 months of access - no password to remember, no account to manage.",
  },
];

const inside = [
  {
    icon: Code2,
    tag: "Member library",
    title: "Shopify Liquid snippets",
    text: "212 conversion-focused sections and snippets plus 6 curated zip packs - product pages, cart, collections, trust and urgency. Full Liquid, CSS and JS source, install guides, copy and download buttons.",
  },
  {
    icon: Download,
    tag: "Agent skills",
    title: "AI skill packs & ebooks",
    text: "17 installable AI-agent skill packs for ecommerce workflows, plus 11 in-depth PDF ebooks with resell rights - instant downloads from your dashboard.",
  },
  {
    icon: GraduationCap,
    tag: "Learning",
    title: "Courses & AI prompts",
    text: "6 step-by-step courses with 32 lessons - Shopify, Liquid, dropshipping, ads - plus copy-paste AI prompt packs for listings, ads, email and support.",
  },
];

const install = [
  {
    icon: BookOpen,
    title: "Back up first",
    text: "Online Store > Themes > Actions > Duplicate - thirty seconds that means you can always roll back.",
  },
  {
    icon: ClipboardCopy,
    title: "Paste the code",
    text: "Create the snippet or section file and paste the complete source - markup, styles and script ship inside one file, nothing else to install. Every resource ships with numbered install notes.",
  },
  {
    icon: Store,
    title: "Render & customise",
    text: "Call the snippet from your template, then tune the settings to match your brand - colours, text, thresholds.",
  },
  {
    icon: Download,
    title: "Test before publish",
    text: "Preview on mobile and desktop first. The install notes call out what to check for each component.",
  },
];

export default function HowItWorksPage() {
  return (
    <InfoPage
      title="How it works"
      description="From sandbox to storefront in minutes - here's the exact flow, no surprises."
    >
      <h2>Four steps to access</h2>
      <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="relative rounded-2xl border border-line bg-ink-900/60 p-5">
            <span aria-hidden className="absolute right-5 top-5 font-display text-3xl font-semibold text-white/10">
              {i + 1}
            </span>
            <Icon aria-hidden className="size-5 text-accent" />
            <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12">What&apos;s inside the library</h2>
      <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
        {inside.map(({ icon: Icon, tag, title, text }) => (
          <div key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <div className="flex items-center justify-between">
              <Icon aria-hidden className="size-5 text-mint" />
              <Badge>{tag}</Badge>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12">Installing a snippet on your store</h2>
      <p className="mt-2 text-sm text-muted">
        Members install components the same way every Shopify developer does - no apps, no external scripts, just
        theme code.
      </p>
      <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {install.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="relative rounded-2xl border border-line bg-ink-900/60 p-5">
            <span aria-hidden className="absolute right-4 top-4 font-display text-2xl font-semibold text-white/10">
              {i + 1}
            </span>
            <Icon aria-hidden className="size-5 text-accent" />
            <h3 className="mt-3 font-display text-sm font-semibold">{title}</h3>
            <p className="mt-1.5 text-xs text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12">The honest bits</h2>
      <ul>
        <li>
          <strong>No official-status claims</strong> - GPLMart is independent, not affiliated with Shopify,
          Automattic or any plugin vendor.
        </li>
        <li>
          <strong>Original code only</strong> - every product on GPLMart is code we wrote. No third-party bundles,
          no nulled software, no scraped content - the page always says exactly what you get.
        </li>
        <li>
          <strong>Access after payment</strong> - the members area opens through your paid email with a one-time
          code, valid for 12 months.
        </li>
        <li>
          <strong>Not a subscription</strong> - <GeoPrice fallback="₹499" /> once, in your local currency. No renewal, no monthly charge.
        </li>
      </ul>

      <div className="not-prose mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/install" variant="secondary">
          Free install guide <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
        <ButtonLink href="/playground" variant="secondary">
          Try the free playground <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
        <ButtonLink href="/checkout">
          Get all-access &mdash; <GeoPrice fallback="₹499" /> <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </div>
    </InfoPage>
  );
}
