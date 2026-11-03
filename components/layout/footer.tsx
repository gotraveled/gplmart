import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-ink-900/60">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Shopify Liquid code and storefront components, plus authorised template bundles. One-time all-access membership.
          </p>
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
          <p>&copy; {new Date().getFullYear()} GPLMart. All rights reserved.</p>
          <p>Made for Shopify merchants and creators.</p>
        </Container>
      </div>
    </footer>
  );
}
