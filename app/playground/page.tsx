import type { Metadata } from "next";
import { ArrowRight, FlaskConical } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Workbench } from "@/components/playground/workbench";

export const metadata: Metadata = {
  title: "Free Shopify Liquid playground",
  description:
    "Try original Shopify Liquid sections and snippets in the browser: inspect the code, preview the storefront output and tweak settings. Free, no account needed.",
  alternates: { canonical: "/playground" },
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
        eyebrow="Free playground"
        title="Read the Liquid. See the storefront."
        description="Original, working examples of Shopify sections and snippets. Inspect the code, preview the output, copy the files and adapt them for your own theme. No account needed."
        crumbs={[{ label: "Playground" }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ButtonLink href="/library" variant="secondary">
            Browse the resource library <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </PageHeader>
      <Container className="py-10">
        <p role="note" className="mb-8 flex gap-3 rounded-xl border border-mint/30 bg-mint/10 p-4 text-sm">
          <FlaskConical aria-hidden className="mt-0.5 size-4 shrink-0 text-mint" />
          <span>
            5 examples are fully open - inspect and copy the code freely. Everything else <strong>previews live</strong>{" "}
            but the source unlocks with all-access, the same deal as the paid library.
          </span>
        </p>
        <Workbench initialId={example} />
      </Container>
    </>
  );
}
