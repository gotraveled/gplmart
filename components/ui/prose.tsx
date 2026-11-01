import { AlertTriangle } from "lucide-react";
import { Container } from "./container";

export function DraftNotice() {
  return (
    <div
      role="note"
      className="mb-8 flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100"
    >
      <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />
      <p>
        <strong>Draft for business review.</strong> This page is placeholder content and is not legal
        advice. It must be reviewed and completed by the business before launch.
      </p>
    </div>
  );
}

export function Prose({ children, draft = false }: { children: React.ReactNode; draft?: boolean }) {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl">
        {draft && <DraftNotice />}
        <div className="space-y-4 leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_a]:text-cyan [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </div>
    </Container>
  );
}
