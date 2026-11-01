import Link from "next/link";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { buttonClasses } from "@/components/ui/button";
import { mainNav, siteConfig } from "@/lib/site";
import { MobileNav } from "./mobile-nav";

export function AnnouncementBar() {
  if (!siteConfig.announcement) return null;
  return (
    <div className="border-b border-line bg-gradient-to-r from-accent-strong/30 via-ink-800 to-cyan/20 text-center text-xs text-fg sm:text-sm">
      <Container className="py-2">
        <p>{siteConfig.announcement}</p>
      </Container>
    </div>
  );
}

export function Header() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-strong focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 border-b border-line bg-ink-950/80 backdrop-blur">
        <Container className="relative flex h-16 items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-white/[0.06] hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/shop" className={buttonClasses("secondary", "md", "hidden sm:inline-flex")}>
              <Search aria-hidden className="size-4" /> Browse
            </Link>
            <MobileNav />
          </div>
        </Container>
      </header>
    </>
  );
}
