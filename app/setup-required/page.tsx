import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Setup required", robots: { index: false } };

export default function SetupRequired() {
  return (
    <Container className="grid min-h-[60vh] place-items-center py-20 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-3xl font-semibold">Accounts are not available yet</h1>
        <p className="mt-3 text-muted">Sign-in and payments are awaiting backend configuration. Please check back soon.</p>
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </div>
    </Container>
  );
}
