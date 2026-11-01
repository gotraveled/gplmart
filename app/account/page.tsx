import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { getAccessState, hasActiveEntitlement, isAdmin, requireUser } from "@/lib/auth";
import { formatOfferPrice } from "@/lib/offer";
import { createServiceClient } from "@/lib/supabase/admin";
import { signOutAction } from "@/app/auth-actions";

export const metadata: Metadata = { title: "My account", robots: { index: false } };

export default async function AccountPage() {
  const user = await requireUser("/account");
  const [state, active, admin, orders] = await Promise.all([
    getAccessState(user),
    hasActiveEntitlement(user.id),
    isAdmin(user.id),
    createServiceClient()
      .from("orders")
      .select("razorpay_order_id,status,amount_paise,created_at,paid_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .then((r) => r.data ?? []),
  ]);

  return (
    <>
      <PageHeader title="My account" description={user.email} />
      <Container className="grid gap-6 py-10 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-line bg-ink-900/60 p-6" aria-labelledby="ent">
          <h2 id="ent" className="font-display text-xl font-semibold">
            All-access membership
          </h2>
          <p className="mt-3">
            Status:{" "}
            <strong className={active ? "text-emerald-400" : "text-amber-300"}>{active ? "Active" : "Not active"}</strong>
          </p>
          {state === "content_pending" && (
            <p className="mt-3 text-sm text-muted">
              Your payment is recorded. The resources are still being prepared and will unlock here as soon as they are released.
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {state === "granted" && <ButtonLink href="/access">Open resource hub</ButtonLink>}
            {!active && <ButtonLink href="/checkout">Get all access for {formatOfferPrice()}</ButtonLink>}
            {admin && (
              <ButtonLink href="/admin" variant="secondary">
                Admin
              </ButtonLink>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-ink-900/60 p-6" aria-labelledby="ord">
          <h2 id="ord" className="font-display text-xl font-semibold">
            Payments
          </h2>
          {orders.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No payments yet.</p>
          ) : (
            <ul className="mt-3 space-y-3 text-sm">
              {orders.map((o) => (
                <li key={o.razorpay_order_id} className="rounded-lg border border-line p-3">
                  <p className="font-mono text-xs text-subtle">{o.razorpay_order_id}</p>
                  <p className="mt-1">
                    {formatOfferPrice(o.amount_paise)} &middot; <span className="capitalize">{o.status === "created" ? "pending" : o.status}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <form action={signOutAction}>
          <Button type="submit" variant="ghost">
            Sign out
          </Button>
        </form>
      </Container>
    </>
  );
}
