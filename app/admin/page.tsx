import { Card } from "@/components/admin/ui";
import { formatOfferPrice } from "@/lib/offer";
import { getSettings } from "@/lib/settings";
import { createServiceClient } from "@/lib/supabase/admin";

const count = async (table: string, filter?: [string, string]) => {
  const q = createServiceClient().from(table).select("*", { count: "exact", head: true });
  const { count: c } = await (filter ? q.eq(filter[0], filter[1]) : q);
  return c ?? 0;
};

export default async function AdminOverview() {
  const [settings, paid, active, pending, mismatch, failedEvents, snippets] = await Promise.all([
    getSettings(),
    count("orders", ["status", "paid"]),
    count("entitlements", ["status", "active"]),
    count("orders", ["status", "created"]),
    count("orders", ["status", "mismatch"]),
    count("webhook_events", ["result", "error"]),
    count("snippets", ["status", "published"]),
  ]);
  const stats: [string, string | number][] = [
    ["Offer price (server config)", formatOfferPrice()],
    ["Content ready", settings.content_ready === "true" ? "Yes" : "No"],
    ["Paid orders", paid],
    ["Active entitlements", active],
    ["Orders awaiting payment", pending],
    ["Amount mismatches", mismatch],
    ["Webhook errors", failedEvents],
    ["Published snippets", snippets],
  ];
  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-semibold">Overview</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <li key={label}>
            <Card>
              <p className="text-xs text-subtle">{label}</p>
              <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
