"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/** Polls the server for order status while a payment is pending, then refreshes the page. */
export function StatusPoller({ orderId }: { orderId: string }) {
  const router = useRouter();
  const tries = useRef(0);
  useEffect(() => {
    const id = setInterval(async () => {
      tries.current += 1;
      if (tries.current > 20) return clearInterval(id);
      const res = await fetch(`/api/checkout/status?order=${encodeURIComponent(orderId)}`).catch(() => null);
      const data = res?.ok ? ((await res.json()) as { status: string }) : null;
      if (data && data.status !== "created") {
        clearInterval(id);
        router.refresh();
      }
    }, 3000);
    return () => clearInterval(id);
  }, [orderId, router]);
  return null;
}
