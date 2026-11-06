import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerLinks } from "@/lib/site";

const addresses = [
  {
    label: "India",
    lines: ["Ramanashree Arcade, 18, Mahatma Gandhi Rd,", "Craig Park Layout, Ashok Nagar,", "Bengaluru, Karnataka 560001"],
  },
  {
    label: "USA",
    lines: ["Westwood Street,", "Hayward, California 94544"],
  },
];

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-ink-900/60">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.6fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            GPLMart is an independent library of original Shopify Liquid snippets, theme sections and authorised
            template bundles for merchants, developers and agencies. One payment, everything included - no
            subscriptions, no per-item fees, no vendor lock-in.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {addresses.map((a) => (
              <div key={a.label} className="text-xs text-subtle">
                <p className="flex items-center gap-1.5 font-semibold text-fg">
                  <MapPin aria-hidden className="size-3.5 text-accent" /> {a.label}
                </p>
                {a.lines.map((l) => (
                  <p key={l} className="mt-1 leading-relaxed">{l}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
        {Object.entries(footerLinks).map(([group, links]) => (
          <nav key={group} aria-label={group}>
            <h2 className="text-sm font-semibold">{group}</h2>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-subtle sm:flex-row sm:justify-between">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} GPLMart. All rights reserved.</p>
          <p>Made for Shopify merchants and creators.</p>
        </Container>
      </div>
    </footer>
  );
}
