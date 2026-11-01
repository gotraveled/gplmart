import { Button } from "@/components/ui/button";
import { Msg, Table } from "@/components/admin/ui";
import { formatOfferPrice } from "@/lib/offer";
import { createServiceClient } from "@/lib/supabase/admin";
import { reconcileAction } from "../actions";

export const metadata = { title: "Payments" };

export default async function AdminPayments({ searchParams }: { searchParams: Promise<{ msg?: string }> }) {
  const db = createServiceClient();
  const [{ msg }, { data: orders }, { data: events }] = await Promise.all([
    searchParams,
    db.from("orders").select("razorpay_order_id,razorpay_payment_id,status,amount_paise,failure_reason,created_at").order("created_at", { ascending: false }).limit(50),
    db.from("webhook_events").select("event_id,event_type,result,error,received_at").or("error.not.is.null,processed_at.is.null").order("received_at", { ascending: false }).limit(25),
  ]);
  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-semibold">Payments and reconciliation</h1>
      <Msg msg={msg} />
      <Table head={["Order", "Payment", "Amount", "Status", "Note", ""]}>
        {(orders ?? []).map((o) => (
          <tr key={o.razorpay_order_id}>
            <td className="px-4 py-3 font-mono text-xs">{o.razorpay_order_id}</td>
            <td className="px-4 py-3 font-mono text-xs">{o.razorpay_payment_id ?? "-"}</td>
            <td className="px-4 py-3">{formatOfferPrice(o.amount_paise)}</td>
            <td className="px-4 py-3">{o.status}</td>
            <td className="px-4 py-3 text-xs text-subtle">{o.failure_reason ?? ""}</td>
            <td className="px-4 py-3">
              {o.status !== "paid" && (
                <form action={reconcileAction}>
                  <input type="hidden" name="razorpay_order_id" value={o.razorpay_order_id} />
                  <Button type="submit" variant="secondary">Reconcile</Button>
                </form>
              )}
            </td>
          </tr>
        ))}
      </Table>
      <h2 className="mb-3 mt-10 font-display text-xl font-semibold">Webhook events needing attention</h2>
      <Table head={["Received", "Type", "Result", "Error"]}>
        {(events ?? []).map((e) => (
          <tr key={e.event_id}>
            <td className="px-4 py-3">{new Date(e.received_at).toLocaleString("en-IN")}</td>
            <td className="px-4 py-3">{e.event_type}</td>
            <td className="px-4 py-3">{e.result ?? "unprocessed"}</td>
            <td className="px-4 py-3 text-xs">{e.error ?? ""}</td>
          </tr>
        ))}
      </Table>
    </>
  );
}
