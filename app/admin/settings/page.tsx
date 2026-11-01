import { Button } from "@/components/ui/button";
import { Card, Msg, fieldCls } from "@/components/admin/ui";
import { getSettings } from "@/lib/settings";
import { saveSettingsAction } from "../actions";

export const metadata = { title: "Settings" };

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ msg?: string }> }) {
  const [{ msg }, s] = await Promise.all([searchParams, getSettings()]);
  return (
    <>
      <h1 className="mb-6 font-display text-3xl font-semibold">Settings</h1>
      <Msg msg={msg} />
      <Card className="max-w-2xl">
        <form action={saveSettingsAction} className="space-y-5">
          <div>
            <label htmlFor="drive_url" className="mb-1.5 block text-sm font-medium">Google Drive bundle URL</label>
            <input id="drive_url" name="drive_url" type="url" defaultValue={s.drive_url} placeholder="https://drive.google.com/..." className={fieldCls} />
            <p className="mt-1.5 text-xs text-subtle">Shown only to entitled customers. Anyone holding a shared Drive link can forward it, so use &quot;Anyone with the link&quot; knowingly.</p>
          </div>
          <div>
            <label htmlFor="license_evidence" className="mb-1.5 block text-sm font-medium">Licensing evidence (internal)</label>
            <textarea id="license_evidence" name="license_evidence" rows={5} defaultValue={s.license_evidence} placeholder="Where the distribution rights come from, licence names, links to proof, date confirmed." className={fieldCls} />
          </div>
          <label className="flex items-start gap-3 text-sm">
            <input type="checkbox" name="content_ready" defaultChecked={s.content_ready === "true"} className="mt-1 size-4" />
            <span>
              <strong>Content ready for customers.</strong> Only tick once you have confirmed you may distribute these resources. Until then customers cannot open them and live-mode checkout stays closed.
            </span>
          </label>
          <Button type="submit">Save settings</Button>
        </form>
      </Card>
    </>
  );
}
