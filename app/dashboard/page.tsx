import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Download, Layers, LogOut, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getAccessState, requireUser } from "@/lib/auth";
import { signOutAction } from "@/app/auth-actions";
import { formatOfferPrice } from "@/lib/offer";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

const areas = [
  { href: "/access/liquid-library", icon: Code2, title: "Liquid library", text: "Search, preview, copy and download every snippet." },
  { href: "/access/packs", icon: Layers, title: "Snippet packs", text: "Curated bundles by use-case - download each pack as a zip." },
  { href: "/access/products", icon: Download, title: "Digital products", text: "HTML templates, PHP scripts and ebooks - instant downloads." },
  { href: "/courses", icon: BookOpen, title: "Courses", text: "Full lesson content across every course - Shopify, Liquid, dropshipping, ads." },
  { href: "/playground", icon: Sparkles, title: "Playground", text: "Preview and customise snippets live before installing." },
  { href: "/updates", icon: ArrowRight, title: "What's new", text: "Weekly drops - new snippets, products, guides and lessons." },
];

export default async function DashboardPage() {
  const user = await requireUser("/dashboard");
  const state = await getAccessState(user);

  return (
    <>
      <PageHeader
        title="Your dashboard"
        description={state === "granted" ? "Your all-access membership is active. Everything below is unlocked." : undefined}
      />
      <Container className="py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-ink-900/60 p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-subtle">Signed in as</p>
            <p className="mt-1 font-display text-lg font-semibold">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            {state === "granted" ? (
              <Badge>All-access active</Badge>
            ) : state === "content_pending" ? (
              <Badge>Membership pending content</Badge>
            ) : (
              <Badge>No active membership</Badge>
            )}
            <form action={signOutAction}>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3.5 py-2 text-sm font-medium text-muted transition hover:border-accent/50 hover:text-accent">
                <LogOut aria-hidden className="size-4" /> Sign out
              </button>
            </form>
          </div>
        </div>

        {state === "no_entitlement" ? (
          <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/[0.06] p-8 text-center">
            <h2 className="font-display text-xl font-semibold">No active membership on this account</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              If you paid with a different email, sign out and use the email from your order. Otherwise grab
              all-access to unlock everything.
            </p>
            <ButtonLink href="/checkout" className="mt-5">
              Get all-access &mdash; {formatOfferPrice()}
            </ButtonLink>
          </div>
        ) : (
          <>
            {state === "content_pending" && (
              <p className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                Your membership is active - content is being prepared. Check back shortly or browse the{" "}
                <Link href="/updates" className="underline">updates page</Link>.
              </p>
            )}
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map(({ href, icon: Icon, title, text }) => (
                <li key={href}>
                  <Link href={href} className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/70 p-6 transition hover:-translate-y-1 hover:border-accent/50">
                    <Icon aria-hidden className="size-7 text-mint" />
                    <h2 className="mt-3 font-display text-lg font-semibold">{title}</h2>
                    <p className="mt-1.5 text-sm text-muted">{text}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent">
                      Open <ArrowRight aria-hidden className="size-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-line bg-ink-900/60 p-6">
              <h2 className="font-display text-base font-semibold">Need help?</h2>
              <p className="mt-1.5 text-sm text-muted">
                Install help, order questions and snippet requests - reach us on WhatsApp or check the guides.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/install" className="text-sm font-medium text-accent hover:underline">Install guide</Link>
                <Link href="/guides" className="text-sm font-medium text-accent hover:underline">Guides</Link>
                <Link href="/contact" className="text-sm font-medium text-accent hover:underline">Contact</Link>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
