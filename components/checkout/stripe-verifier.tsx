"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Verifies a Stripe session server-side once, then refreshes so the server-rendered status updates. */
export function StripeVerifier({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/checkout/stripe-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.status === "paid") router.refresh();
      })
      .catch(() => {});
    // Only run once per session id - verification is idempotent server-side.
  }, [sessionId, router]);
  return null;
}
