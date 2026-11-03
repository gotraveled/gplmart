import Link from "next/link";
import { Code2, Handshake, LayoutTemplate, Puzzle, ShoppingBag } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { Badge } from "@/components/ui/badge";

export const metadata = infoMetadata(
  "About GPLMart",
  "GPLMart offers one-time all-access membership to a Shopify Liquid code library plus WordPress themes, templates and GPL-licensed plugin bundles.",
  "/about",
);

const pillars = [
  {
    icon: Code2,
    tag: "Core product",
    title: "Shopify Liquid snippets",
    text: "Our own conversion-focused sections and snippets for the product page, cart, collections and promotions - readable source, live previews, install guides.",
  },
  {
    icon: ShoppingBag,
    tag: "Bundle",
    title: "Shopify themes",
    text: "Theme packs we own or are authorised to distribute, delivered through a members-only Drive link.",
  },
  {
    icon: LayoutTemplate,
    tag: "GPL licensed",
    title: "WordPress themes & templates",
    text: "GPL-licensed WordPress themes and landing-page template packs - the GPL licence legally permits redistribution.",
  },
  {
    icon: Puzzle,
    tag: "GPL licensed",
    title: "WordPress plugins",
    text: "Popular GPL-licensed plugins - page builders, SEO, caching, forms, security and e-commerce - full files, no vendor keys.",
  },
];

export default function AboutPage() {
  return (
    <InfoPage
      title="About GPLMart"
      description="One payment for a Shopify Liquid code library plus WordPress theme, template and plugin bundles."
    >
      <h2>What GPLMart is</h2>
      <p>
        GPLMart sells a single offer: a one-time all-access membership. It is not a subscription and it does not
        renew. Members get a protected library of Shopify Liquid code plus a Google Drive bundle of themes,
        templates and plugins.
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
            <p className="mt-1.5 text-sm text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2>How we work</h2>
      <ul>
        <li>
          <strong>Honesty first</strong> - we publish only what we have the right to distribute, and say plainly
          where each resource comes from. No &quot;official&quot; claims, no fake scarcity, no promises of
          inventory we do not have yet.
        </li>
        <li>
          <strong>GPL done properly</strong> - GPL-licensed WordPress items are redistributable by law, and we
          honour that licence fully: complete files, licence text preserved, no vendor keys.
        </li>
        <li>
          <strong>Original code where it matters</strong> - the Liquid library is written for GPLMart, so quality
          and licensing are unambiguous.
        </li>
      </ul>

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
          Still building: the catalogue grows as items are verified and sourced. The library page always shows the
          real, current inventory - never a promised count.
        </p>
      </div>
    </InfoPage>
  );
}
