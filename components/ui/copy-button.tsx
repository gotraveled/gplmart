"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export function CopyButton({ text, label = "Copy", className }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("ok");
    } catch {
      setState("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  return (
    <>
      <button
        type="button"
        onClick={onCopy}
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-lg border border-line-strong bg-white/[0.04] px-2.5 text-xs font-medium text-muted transition hover:bg-white/[0.08] hover:text-fg",
          className,
        )}
      >
        {state === "ok" ? <Check aria-hidden className="size-3.5 text-mint" /> : <Copy aria-hidden className="size-3.5" />}
        {state === "ok" ? "Copied" : label}
      </button>
      <span role="status" className="sr-only">
        {state === "ok" ? "Copied to clipboard" : state === "error" ? "Copy failed" : ""}
      </span>
    </>
  );
}
