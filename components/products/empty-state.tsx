import { PackageSearch } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  href = "/shop",
  cta = "Clear filters",
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
      <PackageSearch aria-hidden className="size-10 text-subtle" />
      <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-muted">{description}</p>
      <ButtonLink href={href} variant="secondary" className="mt-6">
        {cta}
      </ButtonLink>
    </div>
  );
}
