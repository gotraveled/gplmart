import { Sparkles } from "lucide-react";
import { InfoPage, infoMetadata } from "@/components/ui/info-page";
import { Badge } from "@/components/ui/badge";
import updates from "@/data/updates.json";

export const metadata = infoMetadata(
  "Updates",
  "What's new in GPLMart - new snippets, bundles and features, newest first.",
  "/updates",
);

export default function UpdatesPage() {
  return (
    <InfoPage
      title="Updates & changelog"
      description="What ships, when. New snippets and bundles land here first - newest at the top."
    >
      <div className="not-prose space-y-8">
        {updates.map((u) => (
          <article key={u.date} className="relative border-l-2 border-line-strong pl-6">
            <span aria-hidden className="absolute -left-[0.55rem] top-1 grid size-4 place-items-center rounded-full bg-accent">
              <Sparkles className="size-2.5 text-ink-950" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
              {new Date(`${u.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h2 className="mt-1.5 font-display text-lg font-semibold">{u.title}</h2>
            <ul className="mt-3 space-y-2">
              {u.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-muted">
                  <Badge className="mt-0.5 shrink-0 px-1.5 py-0 text-[0.6rem]">NEW</Badge>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-10 text-sm text-subtle">
        New components are planned monthly - the changelog is the honest record of what actually exists today.
      </p>
    </InfoPage>
  );
}
