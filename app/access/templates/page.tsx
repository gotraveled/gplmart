import type { Metadata } from "next";
import { ExternalLink, Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { deliveryUrlFor } from "@/lib/access-rules";
import { getAccessState, requireUser } from "@/lib/auth";
import { getSetting } from "@/lib/settings";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Template bundles", robots: { index: false } };

const steps = [
  "Click the button below. Google Drive opens in a new tab.",
  "Sign in to your Google account if Drive asks you to.",
  "Open a bundle folder, select the files or folders you want, then use the three-dot menu or right-click and choose Download.",
  "Large folders are zipped by Google and may download in several parts. Allow multiple downloads if your browser asks.",
  "If a file shows a quota message, wait and retry later, or use Add shortcut to Drive and download from your own Drive.",
];

export default async function TemplatesPage() {
  const user = await requireUser("/access/templates");
  const state = await getAccessState(user);
  if (state === "no_entitlement") redirect("/checkout");
  if (state === "content_pending") redirect("/access/pending");
  // The URL is only read after the authorisation decision above.
  const url = await deliveryUrlFor(state, () => getSetting("drive_url"));

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
              <p role="status" className="text-sm text-amber-200">
                The Drive link has not been configured yet. Please check back soon.
              </p>
            )}
          </div>
          <div className="flex gap-3 rounded-xl border border-line p-4 text-sm text-muted">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-cyan" />
            <p>
              This link is for your own use. Please do not share it. GPLMart controls who can see the link on
              this site, but a Google Drive link can be forwarded by anyone who has it, so the files are not
              individually protected once it is shared.
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
