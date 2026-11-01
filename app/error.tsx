"use client";

import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div role="alert">
        <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          An unexpected error occurred. You can try again or return to the homepage.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="secondary">
            Go home
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
