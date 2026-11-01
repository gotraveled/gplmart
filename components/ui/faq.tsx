import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/data/types";

export function FaqList({ items }: { items: readonly FAQ[] }) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-ink-900/60">
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4 open:bg-white/[0.02]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              aria-hidden
              className="size-4 shrink-0 text-subtle transition group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
