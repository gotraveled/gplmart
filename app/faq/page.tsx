import { ArrowRight, FlaskConical, MessageCircle } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { FaqList } from "@/components/ui/faq";
import { ButtonLink } from "@/components/ui/button";
import { GeoPrice } from "@/components/ui/geo-price";
import { faqs } from "@/lib/faq";
import { freeExampleIds } from "@/lib/playground/examples";

export const metadata = infoMetadata(
  "Frequently asked questions",
  "Answers about GPLMart: what members get, licensing, installing snippets, access and payment.",
  "/faq",
);

export default function FaqPage() {
  return (
    <InfoPage
      title="Frequently asked questions"
      description="Everything about the library, licensing, delivery and access - answered plainly."
    >
      <FaqList items={faqs} />

      <h2 className="mt-12">Still not sure?</h2>
      <div className="not-prose mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
          <FlaskConical aria-hidden className="size-5 text-mint" />
          <h3 className="mt-3 font-display text-base font-semibold">Try before you buy</h3>
          <p className="mt-1.5 text-sm text-muted">
            The playground has {freeExampleIds.size} fully free examples and live previews for the rest - inspect the code, tweak the
            settings and see the storefront output before paying anything.
          </p>
          <ButtonLink href="/playground" variant="secondary" className="mt-4">
            Open the playground <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
        <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
          <MessageCircle aria-hidden className="size-5 text-accent" />
          <h3 className="mt-3 font-display text-base font-semibold">Talk to us first</h3>
          <p className="mt-1.5 text-sm text-muted">
            Questions about a specific snippet, theme compatibility or licensing? Reach out on WhatsApp - we reply
            in business hours.
          </p>
          <ButtonLink href="/contact" variant="secondary" className="mt-4">
            Contact us <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </div>

      <h2 className="mt-12">Ready when you are</h2>
      <p>
        One-time <GeoPrice fallback="₹499" /> - the full Liquid library, template bundles and plugin pack. No subscription,
        no renewal.
      </p>
      <ButtonLink href="/checkout" className="mt-5">
        Get all-access &mdash; <GeoPrice fallback="₹499" /> <ArrowRight aria-hidden className="size-4" />
      </ButtonLink>
    </InfoPage>
  );
}
