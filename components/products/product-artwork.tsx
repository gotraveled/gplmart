import { Code2, FileCode2, Layers, ShoppingBag, Sparkles, type LucideIcon } from "lucide-react";
import type { CategorySlug } from "@/data/types";
import { cn } from "@/lib/cn";

export const categoryIcons: Record<CategorySlug, LucideIcon> = {
  shopify: ShoppingBag,
  wordpress: Layers,
  "html-templates": FileCode2,
  "ai-prompts": Sparkles,
};

const tints: Record<CategorySlug, string> = {
  shopify: "from-emerald-400/30 via-ink-800 to-ink-900",
  wordpress: "from-sky-400/30 via-ink-800 to-ink-900",
  "html-templates": "from-orange-400/25 via-ink-800 to-ink-900",
  "ai-prompts": "from-fuchsia-400/30 via-ink-800 to-ink-900",
};

export function ProductArtwork({
  category,
  bundle = false,
  className,
}: {
  category: CategorySlug;
  bundle?: boolean;
  className?: string;
}) {
  const Icon = bundle ? Layers : (categoryIcons[category] ?? Code2);
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-gradient-to-br",
        tints[category],
        className,
      )}
    >
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-x-6 top-6 h-3 rounded-full bg-white/10" />
      <div className="absolute left-6 top-12 h-2 w-1/3 rounded-full bg-white/10" />
      <div className="absolute bottom-6 left-6 right-6 flex gap-2">
        <span className="h-10 flex-1 rounded-lg border border-line bg-white/[0.05]" />
        <span className="h-10 flex-1 rounded-lg border border-line bg-white/[0.05]" />
        <span className="hidden h-10 flex-1 rounded-lg border border-line bg-white/[0.05] sm:block" />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid size-14 place-items-center rounded-2xl border border-line-strong bg-ink-950/60 shadow-card backdrop-blur-sm">
          <Icon className="size-7 text-fg" />
        </span>
      </div>
    </div>
  );
}
