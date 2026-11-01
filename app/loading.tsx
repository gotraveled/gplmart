import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-16" aria-busy="true">
      <span className="sr-only" role="status">
        Loading
      </span>
      <div className="h-10 w-1/2 animate-pulse rounded-xl bg-white/[0.06]" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-white/[0.04]" />
        ))}
      </div>
    </Container>
  );
}
