"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

export function SnippetViewer({
  code,
  filename,
  previewDoc,
  downloadHref,
}: {
  code: string;
  filename: string;
  previewDoc: string;
  downloadHref: string;
}) {
  const [tab, setTab] = useState<"code" | "preview">("code");
  const [copy, setCopy] = useState<"idle" | "ok" | "error">("idle");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopy("ok");
    } catch {
      setCopy("error");
    }
    setTimeout(() => setCopy("idle"), 2500);
  }

  const tabBtn = (id: "code" | "preview", label: string) => (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={tab === id}
      aria-controls={`panel-${id}`}
      onClick={() => setTab(id)}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${tab === id ? "bg-white/10 text-fg" : "text-muted hover:text-fg"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-900">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div role="tablist" aria-label="Snippet views" className="flex gap-1">
          {tabBtn("code", "Code")}
          {tabBtn("preview", "Preview")}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onCopy}>
            {copy === "ok" ? <Check aria-hidden className="size-4 text-emerald-400" /> : <Copy aria-hidden className="size-4" />}
            {copy === "ok" ? "Copied" : "Copy"}
          </Button>
          <ButtonLink href={downloadHref} variant="secondary" prefetch={false}>
            <Download aria-hidden className="size-4" /> Download
          </ButtonLink>
        </div>
      </div>
      <p role="status" className="sr-only">
        {copy === "ok" ? "Code copied to clipboard" : copy === "error" ? "Copy failed" : ""}
      </p>
      {copy === "error" && <p role="alert" className="border-b border-line bg-rose-400/10 px-4 py-2 text-sm text-rose-100">Copy failed. Select the code and copy it manually.</p>}

      <div id="panel-code" role="tabpanel" aria-labelledby="tab-code" hidden={tab !== "code"}>
        <p className="border-b border-line px-4 py-2 font-mono text-xs text-subtle">{filename}</p>
        <pre tabIndex={0} className="max-h-[32rem] overflow-auto p-4 text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
      <div id="panel-preview" role="tabpanel" aria-labelledby="tab-preview" hidden={tab !== "preview"}>
        {previewDoc ? (
          <>
            <iframe title="Snippet preview" sandbox="" srcDoc={previewDoc} className="h-72 w-full bg-white" referrerPolicy="no-referrer" />
            <p className="border-t border-line px-4 py-2 text-xs text-subtle">
              Illustrative static preview of typical output. Liquid is not executed, and scripts and network access are blocked in this frame.
            </p>
          </>
        ) : (
          <p className="p-6 text-sm text-muted">No preview is available for this snippet.</p>
        )}
      </div>
    </div>
  );
}
