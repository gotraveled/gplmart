import "server-only";
import Stripe from "stripe";

export function stripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY ?? "";
}

/** Stripe checkout is shown to international visitors when enabled. */
export const stripeEnabled = () => Boolean(stripeSecretKey() && process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true");

let client: Stripe | null = null;
export function stripe(): Stripe {
  const key = stripeSecretKey();
  if (!key) throw new Error("Stripe is not configured");
  client ??= new Stripe(key, { apiVersion: "2026-10-28.endive" });
  return client;
}
