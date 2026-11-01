import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export const fieldCls = "w-full rounded-xl border border-line-strong bg-ink-900 px-3 py-2 text-sm text-fg";

export function Msg({ msg }: { msg?: string }) {
  return msg ? (
    <p role="status" className="mb-6 rounded-lg border border-cyan/30 bg-cyan/10 p-3 text-sm">
      {msg}
    </p>
  ) : null;
}

export function Card({ className, ...p }: ComponentProps<"section">) {
  return <section className={cn("rounded-2xl border border-line bg-ink-900/60 p-5", className)} {...p} />;
}

export function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/[0.03] text-xs uppercase tracking-wide text-subtle">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}
