import { Table } from "@/components/admin/ui";
import { createServiceClient } from "@/lib/supabase/admin";

export const metadata = { title: "Audit log" };

export default async function AuditPage() {
  const { data } = await createServiceClient().from("audit_log").select("id,action,target,details,created_at").order("id", { ascending: false }).limit(100);
  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-semibold">Audit log</h1>
      <Table head={["When", "Action", "Target", "Details"]}>
        {(data ?? []).map((r) => (
          <tr key={r.id}>
            <td className="px-4 py-3">{new Date(r.created_at).toLocaleString("en-IN")}</td>
            <td className="px-4 py-3">{r.action}</td>
            <td className="px-4 py-3 font-mono text-xs">{r.target}</td>
            <td className="px-4 py-3 font-mono text-xs">{JSON.stringify(r.details)}</td>
          </tr>
        ))}
      </Table>
    </>
  );
}
