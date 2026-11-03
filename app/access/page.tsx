import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, FolderDown, Lightbulb, MessageCircle, Sparkles, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Resource hub", robots: { index: false } };

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const wa = (msg: string) =>
  whatsapp.length > 5 ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}` : null;

const areas = [
  { href: "/access/templates", icon: FolderDown, title: "Template bundles", text: "Open the Google Drive link and download the bundles." },
  { href: "/access/liquid-library", icon: Code2, title: "Shopify Liquid library", text: "Search, preview, copy and download Liquid snippets." },
  { href: "/prompts", icon: Sparkles, title: "AI prompt pack", text: "50 free AI prompts for product copy, ads, emails and more - plus the prompt builder." },
];

export default async function AccessHub() {
  const requestWa = wa("Hi GPLMart - I'd like to request a snippet: ");
  const communityWa = wa("Hi GPLMart - add me to the members community");

  return (
    <>
      <PageHeader title="Your resource hub" description="Everything included in your all-access membership. No further payment is required." />
      <Container className="py-10">
        <ul className="grid gap-5 md:grid-cols-3">
          {areas.map(({ href, icon: Icon, title, text }) => (
            <li key={href}>
              <Link href={href} className="group flex h-full flex-col rounded-2xl border border-line bg-ink-900/70 p-7 transition hover:-translate-y-1 hover:border-accent/50">
                <Icon aria-hidden className="size-8 text-mint" />
                <h2 className="mt-4 font-display text-2xl font-semibold">{title}</h2>
                <p className="mt-2 text-muted">{text}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-accent">
                  Open <ArrowRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Member perks */}
        <h2 className="mt-12 font-display text-xl font-semibold">Member perks</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: Lightbulb,
              title: "Request a snippet",
              text: "Need a component we don't have yet? Members' requests are what get built next.",
              href: requestWa,
              cta: "Request on WhatsApp",
              external: true,
            },
            {
              icon: Users,
              title: "Members community",
              text: "Join the WhatsApp community for early access to new drops and member votes on what we build.",
              href: communityWa,
              cta: "Join on WhatsApp",
              external: true,
            },
            {
              icon: MessageCircle,
              title: "WhatsApp support",
              text: "Install help, store-specific questions and order support - message us during Indian business hours.",
              href: wa("Hi GPLMart - support for my order"),
              cta: "Get help on WhatsApp",
              external: true,
            },
            {
              icon: Sparkles,
              title: "What's new",
              text: "New components and bundles ship monthly. The changelog shows exactly what's live today.",
              href: "/updates",
              cta: "View updates",
              external: false,
            },
          ].map(({ icon: Icon, title, text, href, cta, external }) => (
            <li key={title} className="rounded-2xl border border-line bg-ink-900/60 p-5">
              <Icon aria-hidden className="size-5 text-accent" />
              <h3 className="mt-3 font-display text-sm font-semibold">{title}</h3>
              <p className="mt-1.5 text-xs text-muted">{text}</p>
              {href && (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                >
                  {cta} <ArrowRight aria-hidden className="size-3.5" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
