import type { Metadata } from "next";
import { ExternalLink, Info } from "lucide-react";
import manifest from "@/data/bundle-manifest.json";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/env";
import { getSetting } from "@/lib/settings";

export const metadata: Metadata = { title: "Template bundles", robots: { index: false } };

const steps = [
  "Click the button below. Google Drive opens in a new tab.",
  "Sign in to your Google account if Drive asks you to.",
  "Open a bundle folder, select the files or folders you want, then use the three-dot menu or right-click and choose Download.",
  "Large folders are zipped by Google and may download in several parts. Allow multiple downloads if your browser asks.",
  "If a file shows a quota message, wait and retry later, or use Add shortcut to Drive and download from your own Drive.",
];

export default async function TemplatesPage() {
  // The layout's password gate is the only thing standing between visitors and this URL.
  const url = isSupabaseConfigured() ? (await getSetting("drive_url")).trim() : "";

  return (
    <>
      <PageHeader
        title="Template bundles"
        description="Your all-access membership includes the template bundle library on Google Drive."
        crumbs={[{ label: "Resource hub", href: "/access" }, { label: "Templates" }]}
      />
      <Container className="grid gap-8 py-10 lg:grid-cols-[1.3fr_1fr]">
        <section>
          <h2 className="font-display text-2xl font-semibold">How to download</h2>
          <ol className="mt-5 space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex gap-3 rounded-xl border border-line bg-ink-900/60 p-4 text-sm text-muted">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent/20 text-xs font-semibold text-fg">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </section>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-line-strong bg-ink-800/60 p-6 shadow-card">
            {url ? (
              <>
                <p className="text-sm text-muted">You do not need to pay again.</p>
                <ButtonLink href={url} target="_blank" rel="noopener noreferrer" size="lg" className="mt-4 w-full">
                  Open template bundles in Google Drive <ExternalLink aria-hidden className="size-4" />
                </ButtonLink>
              </>
            ) : (
              <p className="text-sm text-muted">
                The Drive link is being finalised - message us on WhatsApp and we will send it directly.
              </p>
            )}
          </div>
          <div className="flex gap-3 rounded-xl border border-line p-4 text-sm text-muted">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-mint" />
            <p>
              This link is for your own use. Please do not share it. GPLMart controls who can see the link on
              this site, but a Google Drive link can be forwarded by anyone who has it, so the files are not
              individually protected once it is shared.
            </p>
          </div>
        </aside>
      </Container>
      <Container className="pb-14">
        <h2 className="font-display text-xl font-semibold">Bundle contents</h2>
        <p className="mt-1.5 text-sm text-muted">
          Everything inside the Drive bundle, by group. GPL-licensed WordPress items ship complete files with the
          vendor licence preserved - keys, auto-updates and official support are not included.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {manifest.groups.map((g) => (
            <section key={g.id} className="rounded-2xl border border-line bg-ink-900/60 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-base font-semibold">{g.title}</h3>
                <Badge>{g.license}</Badge>
              </div>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((i) => (
                  <li key={i.name} className="flex items-center justify-between gap-3 text-sm">
                    <span>
                      <span className="font-medium">{i.name}</span>
                      <span className="ml-2 text-xs text-subtle">{i.vendor}</span>
                    </span>
                    <Badge
                      className={
                        i.status === "live"
                          ? "border-mint/40 bg-mint/10 text-mint"
                          : "border-line-strong text-subtle"
                      }
                    >
                      {i.status === "live" ? "In bundle" : "Sourcing"}
                    </Badge>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-5 text-xs text-subtle">
          &quot;Sourcing&quot; items are verified as legally distributable and are being added to the bundle as they
          are acquired. Updated {manifest.updated}.
        </p>
      </Container>
    </>
  );
}
