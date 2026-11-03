import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { Badge } from "@/components/ui/badge";
import { guides } from "@/lib/guides";

export const metadata = infoMetadata(
  "Shopify Liquid Tutorials & Conversion Guides",
  "Free guides for Shopify merchants and builders - Liquid code tutorials, conversion strategy and honest licensing explainers.",
  "/guides",
);

export default function GuidesPage() {
  return (
    <InfoPage
      title="Guides & tutorials"
      description="Free, practical reads for Shopify merchants - install a snippet, understand licensing, lift conversion. No gatekeeping."
    >
      <div className="not-prose mt-6 grid gap-4 sm:grid-cols-1">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group flex flex-col gap-2 rounded-2xl border border-line bg-ink-900/60 p-6 transition hover:border-accent/50"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{g.tag}</Badge>
              <span className="text-xs text-subtle">
                {new Date(`${g.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                {" "}&middot; {g.readMin} min read
              </span>
            </div>
            <h2 className="font-display text-lg font-semibold group-hover:text-accent">{g.title}</h2>
            <p className="text-sm text-muted">{g.excerpt}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Read guide <ArrowRight aria-hidden className="size-4" />
            </p>
          </Link>
        ))}
      </div>

      <div className="not-prose mt-10 flex items-start gap-3 rounded-xl border border-line bg-ink-900/60 p-5 text-sm text-muted">
        <BookOpen aria-hidden className="mt-0.5 size-5 shrink-0 text-mint" />
        <p>
          More guides are published as the library grows. Requests? Tell us on{" "}
          <Link href="/contact" className="text-accent underline">
            the contact page
          </Link>{" "}
          - we write what members actually ask about.
        </p>
      </div>
    </InfoPage>
  );
}
