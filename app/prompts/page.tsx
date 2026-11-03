import { ArrowRight, ClipboardCopy, Sparkles } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { PromptGenerator } from "@/components/prompts/generator";
import { LeadForm } from "@/components/prompts/lead-form";
import { promptCategories, prompts } from "@/lib/prompts";
import { formatOfferPrice } from "@/lib/offer";

export const metadata = infoMetadata(
  "50 free AI prompts for e-commerce",
  "A free prompt pack for Shopify merchants - product descriptions, ads, emails, SEO, support and conversion strategy. Plus a prompt builder.",
  "/prompts",
);

export default function PromptsPage() {
  return (
    <InfoPage
      title="50 free AI prompts for your store"
      description="Copy-paste prompts for product descriptions, ads, emails, SEO and support - plus a builder that writes a custom one for you. Free, no signup."
    >
      <div className="not-prose mb-10">
        <PromptGenerator />
      </div>

      <h2>How to use these</h2>
      <p>
        Every prompt is a starting point, not a script. Replace the <code>[BRACKETED]</code> parts with your own
        product, price and offer details, then paste into ChatGPT, Claude or Gemini. Honest inputs get useful
        outputs - feed it real numbers and real objections.
      </p>

      {promptCategories.map((cat) => (
        <section key={cat} className="mt-10">
          <h2 className="flex items-baseline gap-3">
            {cat}
            <span className="text-sm font-normal text-subtle">
              {prompts.filter((p) => p.category === cat).length} prompts
            </span>
          </h2>
          <div className="not-prose mt-4 grid gap-3 sm:grid-cols-2">
            {prompts
              .filter((p) => p.category === cat)
              .map((p) => (
                <details key={p.id} className="group rounded-xl border border-line bg-ink-900/60 open:border-accent/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                    {p.title}
                    <span className="flex items-center gap-2 text-subtle">
                      <Badge>Free</Badge>
                      <span aria-hidden className="transition group-open:rotate-90">&#9656;</span>
                    </span>
                  </summary>
                  <div className="border-t border-line px-4 py-3">
                    <p className="text-sm leading-relaxed text-muted">{p.prompt}</p>
                    <CopyButton text={p.prompt} label="Copy prompt" className="mt-3" />
                  </div>
                </details>
              ))}
          </div>
        </section>
      ))}

      <div className="not-prose mt-12">
        <LeadForm />
      </div>

      <div className="not-prose mt-6 rounded-2xl border border-accent/30 bg-accent/[0.06] p-6">
        <div className="flex items-start gap-3">
          <Sparkles aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
          <div>
            <h2 className="font-display text-lg font-semibold">Want the code to go with the prompts?</h2>
            <p className="mt-1.5 text-sm text-muted">
              These prompts write your marketing. The GPLMart library gives your store the conversion components to
              back it up - countdowns, trust badges, delivery ETAs and 37 more, plus the plugin/theme bundles.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href="/checkout">
                Get all-access &mdash; {formatOfferPrice()} <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/playground" variant="secondary">
                <ClipboardCopy aria-hidden className="size-4" /> Try the free playground
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </InfoPage>
  );
}
