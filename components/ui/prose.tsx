import { Container } from "./container";

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-8 sm:py-10">
      <div className="max-w-none">
        <div className="space-y-4 leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_a:not([class])]:text-mint [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-4">
          {children}
        </div>
      </div>
    </Container>
  );
}
