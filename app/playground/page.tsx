import type { Metadata } from "next";
import { ArrowRight, FlaskConical } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Workbench } from "@/components/playground/workbench";
import { freeExampleIds } from "@/lib/playground/examples";

export const metadata: Metadata = {
  title: "Shopify Liquid Codes - 200+ Free Snippets & Sections Library",
  description:
    "Browse 200+ original Shopify Liquid codes - snippets and theme sections with live previews, copyable source and install guides. Free, no account needed.",
  alternates: { canonical: "/playground" },
  openGraph: {
    title: "Shopify Liquid Codes - 200+ Free Snippets & Sections",
    description: "200+ Shopify Liquid codes with live previews. Inspect, customize and copy free samples - no account needed.",
  },
};

export default async function PlaygroundPage({
  searchParams,
}: {
  searchParams: Promise<{ example?: string }>;
}) {
  const sp = await searchParams;
  const example = typeof sp.example === "string" ? sp.example.slice(0, 60) : undefined;

  return (
    <>
      <PageHeader
        eyebrow="Shopify Liquid code library"
        title="Shopify Liquid Codes"
        description="Original, working Liquid codes for Shopify sections and snippets. Inspect the code, preview the output, copy the files and adapt them for your own theme. No account needed."
        crumbs={[{ label: "Shopify Liquid Codes" }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href="/library" variant="secondary">
            Browse the resource library <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
          <ButtonLink href="/install" variant="ghost">
            Free install guide <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </PageHeader>
      <Container className="py-10">
        <p role="note" className="mb-8 flex gap-3 rounded-xl border border-mint/30 bg-mint/10 p-4 text-sm">
          <FlaskConical aria-hidden className="mt-0.5 size-4 shrink-0 text-mint" />
          <span>
            {freeExampleIds.size} examples are fully open - inspect and copy the code freely. Everything else <strong>previews live</strong>{" "}
            but the source unlocks with all-access, the same deal as the paid library.
          </span>
        </p>
        <Workbench initialId={example} />
      </Container>
    </>
  );
}
