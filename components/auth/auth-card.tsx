import { Container } from "@/components/ui/container";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <Container className="grid min-h-[70vh] place-items-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-line-strong bg-ink-900/70 p-8 shadow-card">
        <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mb-6 mt-2 text-sm text-muted">{subtitle}</p>
        {children}
      </div>
    </Container>
  );
}
