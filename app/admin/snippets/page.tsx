import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, Msg, Table, fieldCls } from "@/components/admin/ui";
import { createServiceClient } from "@/lib/supabase/admin";
import { listCategories } from "@/lib/snippets";
import { saveCategoryAction } from "../actions";

export const metadata = { title: "Snippets" };

export default async function AdminSnippets({ searchParams }: { searchParams: Promise<{ msg?: string }> }) {
  const [{ msg }, categories, { data }] = await Promise.all([
    searchParams,
    listCategories(),
    createServiceClient().from("snippets").select("id,slug,title,category_slug,status,updated_at").order("updated_at", { ascending: false }),
  ]);
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">Snippets</h1>
        <Link href="/admin/snippets/new" className="rounded-xl bg-accent-strong px-4 py-2 text-sm font-medium">New snippet</Link>
      </div>
      <Msg msg={msg} />
      <Table head={["Title", "Slug", "Category", "Status", ""]}>
        {(data ?? []).map((s) => (
          <tr key={s.id}>
            <td className="px-4 py-3">{s.title}</td>
            <td className="px-4 py-3 font-mono text-xs">{s.slug}</td>
            <td className="px-4 py-3">{s.category_slug}</td>
            <td className="px-4 py-3">{s.status}</td>
            <td className="px-4 py-3"><Link className="text-cyan underline" href={`/admin/snippets/${s.id}`}>Edit</Link></td>
          </tr>
        ))}
      </Table>
      <Card className="mt-8 max-w-2xl">
        <h2 className="mb-3 font-display text-lg font-semibold">Add or rename a category</h2>
        <p className="mb-3 text-xs text-subtle">Existing: {categories.map((c) => c.slug).join(", ") || "none"}</p>
        <form action={saveCategoryAction} className="grid gap-3 sm:grid-cols-[1fr_1fr_6rem_auto]">
          <input name="slug" placeholder="slug" aria-label="Category slug" required className={fieldCls} />
          <input name="name" placeholder="Name" aria-label="Category name" required className={fieldCls} />
          <input name="sort_order" type="number" placeholder="Order" aria-label="Sort order" className={fieldCls} />
          <Button type="submit">Save</Button>
        </form>
      </Card>
    </>
  );
}
