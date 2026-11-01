import { Button } from "@/components/ui/button";
import { Card, Msg, Table, fieldCls } from "@/components/admin/ui";
import { createServiceClient } from "@/lib/supabase/admin";
import { setEntitlementAction } from "../actions";

export const metadata = { title: "Customers" };

export default async function AdminCustomers({ searchParams }: { searchParams: Promise<{ msg?: string }> }) {
  const db = createServiceClient();
  const [{ msg }, { data: ents }, users] = await Promise.all([
    searchParams,
    db.from("entitlements").select("user_id,status,source,granted_at").order("granted_at", { ascending: false }).limit(100),
    db.auth.admin.listUsers({ page: 1, perPage: 1000 }).then((r) => r.data),
  ]);
  const emails = new Map((users?.users ?? []).map((u: { id: string; email?: string }) => [u.id, u.email ?? ""]));
  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-semibold">Customers and entitlements</h1>
      <Msg msg={msg} />
      <Table head={["Email", "Status", "Source", "Granted", ""]}>
        {(ents ?? []).map((e) => (
          <tr key={e.user_id}>
            <td className="px-4 py-3">{emails.get(e.user_id) ?? e.user_id}</td>
            <td className="px-4 py-3">{e.status}</td>
            <td className="px-4 py-3">{e.source}</td>
            <td className="px-4 py-3">{new Date(e.granted_at).toLocaleDateString("en-IN")}</td>
            <td className="px-4 py-3">
              {e.status === "active" && (
                <form action={setEntitlementAction} className="flex gap-2">
                  <input type="hidden" name="user_id" value={e.user_id} />
                  <input type="hidden" name="status" value="revoked" />
                  <input name="reason" placeholder="Reason" aria-label="Reason" required className={`${fieldCls} w-40`} />
                  <Button type="submit" variant="secondary">Revoke</Button>
                </form>
              )}
            </td>
          </tr>
        ))}
      </Table>
      <Card className="mt-8 max-w-2xl">
        <h2 className="mb-3 font-display text-lg font-semibold">Grant access manually (audited)</h2>
        <form action={setEntitlementAction} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input type="hidden" name="status" value="active" />
          <input name="email" type="email" placeholder="Customer email" aria-label="Customer email" required className={fieldCls} />
          <input name="reason" placeholder="Reason" aria-label="Reason" required className={fieldCls} />
          <Button type="submit">Grant</Button>
        </form>
      </Card>
    </>
  );
}
