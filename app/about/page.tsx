import Link from "next/link";
import { Code2, Globe2, Handshake, LayoutTemplate, MapPin, Puzzle, ShoppingBag } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { Badge } from "@/components/ui/badge";

export const metadata = infoMetadata(
  "About GPLMart",
  "GPLMart is a digital resource platform for Shopify merchants and developers - a Liquid code library, theme bundles and GPL-licensed WordPress resources under one payment.",
  "/about",
);

const pillars = [
  {
    icon: Code2,
    tag: "Core product",
    title: "Shopify Liquid snippets & sections",
    text: "200+ original, conversion-focused components for the product page, cart, checkout, collections, trust and navigation. Every item ships with readable source, a live playground preview and an install guide - no apps, no monthly fees.",
  },
  {
    icon: ShoppingBag,
    tag: "Bundle",
    title: "Shopify themes",
    text: "Theme packs we own or are authorised to distribute, delivered through the members resource hub. Chosen for speed, mobile layout and conversion structure - not just appearance.",
  },
  {
    icon: LayoutTemplate,
    tag: "GPL licensed",
    title: "WordPress themes & templates",
    text: "GPL-licensed WordPress themes and landing-page template packs. The GPL licence legally permits redistribution, so these ship complete with the vendor licence preserved.",
  },
  {
    icon: Puzzle,
    tag: "GPL licensed",
    title: "Plugins",
    text: "GPL-licensed plugins for page building, SEO, caching, forms, security and ecommerce - full files, no vendor keys required. Cloud features that call vendor servers are always flagged honestly.",
  },
];

const principles = [
  {
    title: "Honesty first",
    text: "We publish only what we have the right to distribute, and we say plainly where each resource comes from. No \u201Cofficial\u201D claims, no fake scarcity, no promises of inventory we do not have yet. If a component needs a metafield or a theme feature, the listing says so.",
  },
  {
    title: "GPL done properly",
    text: "GPL-licensed WordPress items are redistributable by law - and we honour that licence fully: complete files, licence text preserved, no nulled plugins, no stolen keys. What the GPL does not include (vendor support, auto-update servers) is stated clearly.",
  },
  {
    title: "Original code where it matters",
    text: "The Liquid library is written for GPLMart, so quality and licensing are unambiguous. Every snippet is reviewed for theme compatibility, performance and accessibility before it ships.",
  },
  {
    title: "Value over volume",
    text: "We would rather ship 200 components that actually install than 2,000 filler files. Items are added after market research - what merchants genuinely pay for and request.",
  },
];

export default function AboutPage() {
  return (
    <InfoPage
      title="About GPLMart"
      description="One payment for a Shopify Liquid code library plus theme, template and plugin bundles - built for merchants, developers and agencies worldwide."
    >
      <h2>What GPLMart is</h2>
      <p>
        GPLMart sells a single, simple offer: a one-time all-access membership. It is not a subscription and it
        does not renew. Members get a protected library of Shopify Liquid code - 200+ sections and snippets -
        plus a Google Drive bundle of themes, templates and plugins.
      </p>
      <p>
        The platform exists because of a gap we kept running into: the components that actually move conversion
        are either locked inside expensive themes, sold per-item for more than the whole membership, or scattered
        across low-quality GPL-club sites with no provenance, no previews and no install guidance. GPLMart is the
        version of that resource built the way we would want it as buyers - previewable, documented, honest about
        licensing and priced once.
      </p>

      <h2>Four product lines, one payment</h2>
      <div className="not-prose mt-5 grid gap-4 sm:grid-cols-2">
        {pillars.map(({ icon: Icon, tag, title, text }) => (
          <div key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <div className="flex items-center justify-between">
              <Icon aria-hidden className="size-5 text-accent" />
              <Badge>{tag}</Badge>
            </div>
            <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2>Who it is for</h2>
      <ul>
        <li>
          <strong>Merchants</strong> - store owners who want the features premium themes charge for, installed
          once, with real install guides instead of a forum thread.
        </li>
        <li>
          <strong>Shopify developers</strong> - freelancers and agencies who need production patterns - cart API,
          metafields, order attributes, variant objects - already wired correctly.
        </li>
        <li>
          <strong>Agencies</strong> - teams building client stores who can reuse the library across projects
          under the membership licence.
        </li>
      </ul>

      <h2>How we work</h2>
      <div className="not-prose mt-5 grid gap-4 sm:grid-cols-2">
        {principles.map((p) => (
          <div key={p.title} className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <h3 className="font-display text-base font-semibold">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
          </div>
        ))}
      </div>

      <h2>Where we are</h2>
      <div className="not-prose mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
          <p className="flex items-center gap-1.5 font-display text-base font-semibold">
            <MapPin aria-hidden className="size-4 text-accent" /> India
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Ramanashree Arcade, 18, Mahatma Gandhi Rd,<br />
            Craig Park Layout, Ashok Nagar,<br />
            Bengaluru, Karnataka 560001
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
          <p className="flex items-center gap-1.5 font-display text-base font-semibold">
            <MapPin aria-hidden className="size-4 text-accent" /> United States
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Westwood Street,<br />
            Hayward, California 94544
          </p>
        </div>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
        <Globe2 aria-hidden className="size-4 text-accent" />
        GPLMart sells worldwide - pricing is shown in your local currency (INR in India, USD everywhere else).
      </p>

      <h2>Independence</h2>
      <p>
        GPLMart is an independent project. It is not affiliated with, endorsed by or sponsored by Shopify Inc.,
        Automattic or any plugin or theme vendor. Product and platform names belong to their respective owners.
        See the <Link href="/disclaimer">disclaimer</Link>.
      </p>

      <h2>Rights and licensing</h2>
      <p>
        Resources are released to customers only after distribution rights are confirmed and recorded. The full
        picture - including what GPL redistribution does and does not include - is on the{" "}
        <Link href="/licensing">licensing page</Link>. Concerns about any listing can be raised through the{" "}
        <Link href="/copyright">copyright &amp; takedowns</Link> page.
      </p>

      <div className="not-prose mt-8 flex gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm">
        <Handshake aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
        <p>
          The catalogue keeps growing - new components ship weekly, driven by member requests. The library page
          always shows the real, current inventory.
        </p>
      </div>
    </InfoPage>
  );
}
