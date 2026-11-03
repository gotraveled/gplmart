import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./container";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-subtle">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
            {c.href ? (
              <Link href={c.href} className="hover:text-fg">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-muted">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  title,
  description,
  crumbs,
  eyebrow,
  children,
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
      />
      <Container className="relative py-8 sm:py-10">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-mint">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-4 max-w-2xl text-pretty text-lg text-muted">{description}</p>}
        {children}
      </Container>
    </header>
  );
}
