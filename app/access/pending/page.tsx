import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Resources being prepared", robots: { index: false } };

export default async function AccessPending() {
  await requireUser("/access");
  return (
    <Container className="grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md" role="status">
        <h1 className="font-display text-3xl font-semibold">Resources are being prepared</h1>
        <p className="mt-3 text-muted">
          Your access is recorded, but the resources have not been released yet. They will appear here once
          they are ready. No further payment is needed.
        </p>
        <ButtonLink href="/account" className="mt-8">
          Back to my account
        </ButtonLink>
      </div>
    </Container>
  );
}
