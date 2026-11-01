import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, fieldCls } from "@/components/admin/ui";
import { createServiceClient } from "@/lib/supabase/admin";
import { listCategories } from "@/lib/snippets";
import { deleteSnippetAction, saveSnippetAction } from "../../actions";

export const metadata = { title: "Edit snippet" };

function L({ id, children }: { id: string; children: string }) {
  return (
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
      {children}
    </label>
  );
}

export default async function EditSnippet({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  if (!isNew && !/^[0-9a-f-]{36}$/.test(id)) notFound();
  const [categories, existing] = await Promise.all([
    listCategories(),
    isNew ? null : createServiceClient().from("snippets").select("*").eq("id", id).maybeSingle().then((r) => r.data),
  ]);
  if (!isNew && !existing) notFound();
  const s = existing ?? { slug: "", title: "", description: "", category_slug: categories[0]?.slug ?? "", tags: [], filename: "snippet.liquid", code: "", preview_html: "", source: "", status: "draft" };

  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-semibold">{isNew ? "New snippet" : "Edit snippet"}</h1>
      <Card className="max-w-3xl">
        <form action={saveSnippetAction} className="space-y-4">
          <input type="hidden" name="id" value={isNew ? "" : id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div><L id="title">Title</L><input id="title" name="title" defaultValue={s.title} required className={fieldCls} /></div>
            <div><L id="slug">Slug</L><input id="slug" name="slug" defaultValue={s.slug} required pattern="[a-z0-9]+(-[a-z0-9]+)*" className={fieldCls} /></div>
            <div>
              <L id="category_slug">Category</L>
              <select id="category_slug" name="category_slug" defaultValue={s.category_slug} className={fieldCls}>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div><L id="filename">Download filename</L><input id="filename" name="filename" defaultValue={s.filename} className={fieldCls} /></div>
          </div>
          <div><L id="description">Description</L><textarea id="description" name="description" rows={2} defaultValue={s.description} className={fieldCls} /></div>
          <div><L id="tags">Tags (comma separated)</L><input id="tags" name="tags" defaultValue={s.tags.join(", ")} className={fieldCls} /></div>
          <div><L id="code">Liquid code</L><textarea id="code" name="code" rows={12} defaultValue={s.code} required spellCheck={false} className={`${fieldCls} font-mono`} /></div>
          <div><L id="preview_html">Preview HTML (static, rendered in a sandbox without scripts)</L><textarea id="preview_html" name="preview_html" rows={5} defaultValue={s.preview_html} spellCheck={false} className={`${fieldCls} font-mono`} /></div>
          <div><L id="source">Source / licence note</L><input id="source" name="source" defaultValue={s.source} className={fieldCls} /></div>
          <div>
            <L id="status">Status</L>
            <select id="status" name="status" defaultValue={s.status} className={fieldCls}>
              <option value="draft">Draft (hidden)</option>
              <option value="published">Published</option>
            </select>
          </div>
          <Button type="submit">Save snippet</Button>
        </form>
        {!isNew && (
          <form action={deleteSnippetAction} className="mt-6 border-t border-line pt-4">
            <input type="hidden" name="id" value={id} />
            <Button type="submit" variant="ghost" className="text-rose-300">Delete snippet</Button>
          </form>
        )}
      </Card>
    </>
  );
}
