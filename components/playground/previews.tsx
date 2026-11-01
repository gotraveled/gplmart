"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { hex, on, str } from "@/lib/playground/examples";
import type { Values } from "@/lib/playground/types";

/**
 * Controlled React renderings of each example. Nothing from the code panel is
 * evaluated: previews are predetermined components that read the same control values.
 */

type P = { v: Values };

function Announcement({ v }: P) {
  const [hidden, setHidden] = useState(false);
  const dismissible = on(v, "dismissible");
  if (hidden && dismissible)
    return (
      <div className="p-3 text-center text-xs text-neutral-500">
        Dismissed.{" "}
        <button type="button" className="underline" onClick={() => setHidden(false)}>
          Show again
        </button>
      </div>
    );
  return (
    <div className="relative px-10 py-2.5 text-center text-sm" style={{ background: hex(v, "bg"), color: hex(v, "fg") }}>
      <p className="m-0">{str(v, "text") || "Your message here"}</p>
      {dismissible && (
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setHidden(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xl leading-none"
        >
          &times;
        </button>
      )}
    </div>
  );
}

function Benefits({ v }: P) {
  const items = str(v, "items", 120).split("|").map((s) => s.trim()).filter(Boolean);
  const mark = str(v, "style") === "dot" ? "\u2022" : "\u2713";
  return (
    <div className="p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Linen overshirt</p>
      <p className="mt-1 text-lg font-semibold">$89.00</p>
      <ul className="m-0 mt-4 grid list-none gap-2 p-0 text-sm">
        {items.map((i) => (
          <li key={i} className="flex items-baseline gap-2.5">
            <span aria-hidden className="font-bold" style={{ color: hex(v, "accent") }}>{mark}</span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Shipping({ v }: P) {
  const t = /^\d{1,6}$/.test(str(v, "threshold")) ? str(v, "threshold") : "75";
  const rows: [string, ReactNode][] = [
    ["Dispatch", str(v, "days")],
    ["Free shipping", `On orders over $${t}`],
    ...(on(v, "returns") ? ([["Returns", <span key="r">See our <u>refund policy</u></span>]] as [string, ReactNode][]) : []),
  ];
  return (
    <div className="p-6">
      <section className="rounded-xl border border-[#d5dccb] p-5 text-sm">
        <h3 className="m-0 mb-3 text-base font-semibold">{str(v, "heading")}</h3>
        <dl className="m-0 grid gap-2">
          {rows.map(([k, val]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="font-semibold">{k}</dt>
              <dd className="m-0 text-right">{val}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

function Trust({ v }: P) {
  const all = [
    ["payment", "Secure payment", "Pay with the methods enabled in your Shopify checkout."],
    ["returns", "Returns", "Describe your actual returns window here."],
    ["support", "Support", "Tell customers how to reach you."],
  ] as const;
  const items = all.filter(([k]) => on(v, k));
  return (
    <div className="p-6">
      {items.length === 0 && <p className="text-sm text-neutral-500">Enable at least one highlight.</p>}
      <ul className={`m-0 grid list-none gap-4 p-0 ${str(v, "layout") === "grid" ? "@lg:grid-cols-3" : "@lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"}`}>
        {items.map(([k, title, text]) => (
          <li key={k} className="grid gap-1 rounded-xl border border-[#d5dccb] p-4 text-sm">
            <span aria-hidden className="mb-1 size-6 rounded-md bg-[#0b1220]" />
            <strong>{title}</strong>
            <span className="text-neutral-600">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const tiles = ["#d9e4c3", "#e9d8c4", "#cfe0e3", "#e6cfd9", "#d8d6ec", "#e4e2c2"];
function Collections({ v }: P) {
  const cols = Number(v.columns) || 3;
  const colClass = cols === 2 ? "@lg:grid-cols-2" : cols === 4 ? "@lg:grid-cols-4" : "@lg:grid-cols-3";
  const names = ["Linen", "Outerwear", "Denim", "Knitwear", "Accessories", "Footwear"];
  return (
    <div className="p-6">
      <div className={`grid grid-cols-2 gap-4 ${colClass}`}>
        {names.map((n, i) => (
          <div
            key={n}
            className="relative aspect-[4/5] overflow-hidden"
            style={{ borderRadius: Number(v.radius) || 0, background: tiles[i] }}
          >
            {on(v, "labels") && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 py-3 text-sm font-semibold text-white">
                {n}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Promo({ v }: P) {
  const center = str(v, "align") === "center";
  return (
    <div className="p-6">
      <section
        className={`rounded-2xl px-6 py-10 text-white @lg:px-12 @lg:py-14 ${center ? "text-center" : ""}`}
        style={{ background: hex(v, "bg") }}
      >
        <h2 className="m-0 mb-2 text-2xl font-semibold @lg:text-4xl">{str(v, "heading", 50)}</h2>
        <p className={`m-0 mb-5 max-w-xl ${center ? "mx-auto" : ""}`}>{str(v, "text", 90)}</p>
        {str(v, "button") && (
          <span className="inline-block rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-900">{str(v, "button", 24)}</span>
        )}
      </section>
    </div>
  );
}

function Compare({ v }: P) {
  const rows: [string, boolean, boolean][] = [
    ["Machine washable", true, true],
    ["Reinforced seams", true, false],
    ["Recycled packaging", true, false],
    ["Extended sizing", false, false],
  ];
  const hl = on(v, "highlight");
  const cell = "border-b border-[#d5dccb] px-4 py-3 text-left";
  return (
    <div className="overflow-x-auto p-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide">
            <th scope="col" className={cell}>Feature</th>
            <th scope="col" className={`${cell} ${hl ? "bg-[#f1f8dc]" : ""}`}>{str(v, "colA", 24)}</th>
            <th scope="col" className={cell}>{str(v, "colB", 24)}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([f, a, b]) => (
            <tr key={f}>
              <th scope="row" className={`${cell} font-medium`}>{f}</th>
              <td className={`${cell} ${hl ? "bg-[#f1f8dc] font-semibold" : ""}`}>{a ? "Yes" : "No"}</td>
              <td className={cell}>{b ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const faqs: [string, string][] = [
  ["How long does delivery take?", "Orders are dispatched within the time shown on the product page."],
  ["Can I return an item?", "Yes, within the window described in your returns policy."],
  ["How do I contact support?", "Use the contact page or the email shown in the footer."],
];
function Faq({ v }: P) {
  const bordered = str(v, "style") === "bordered";
  const exclusive = on(v, "exclusive");
  return (
    <div className="p-6">
      <section>
        <h2 className="m-0 mb-4 text-xl font-semibold">{str(v, "heading", 40)}</h2>
        {faqs.map(([q, a], i) => (
          <details
            key={`${q}-${exclusive}`}
            name={exclusive ? "gpl-faq-preview" : undefined}
            open={i === 0}
            className={`group px-4 py-3.5 ${bordered ? "mb-2.5 rounded-xl border border-[#d5dccb]" : "border-b border-[#d5dccb]"}`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
              {q}
              <span aria-hidden className="group-open:hidden">+</span>
              <span aria-hidden className="hidden group-open:inline">&minus;</span>
            </summary>
            <p className="mt-2 text-sm text-neutral-600">{a}</p>
          </details>
        ))}
      </section>
    </div>
  );
}

const map: Record<string, (p: P) => ReactNode> = {
  "announcement-bar": Announcement,
  "product-benefits": Benefits,
  "shipping-panel": Shipping,
  "trust-badges": Trust,
  "collection-grid": Collections,
  "promo-banner": Promo,
  "comparison-table": Compare,
  "faq-accordion": Faq,
};

export function ExamplePreview({ id, values, className, style }: { id: string; values: Values; className?: string; style?: CSSProperties }) {
  const Cmp = map[id];
  return (
    <div className={`@container bg-white text-neutral-900 ${className ?? ""}`} style={style}>
      {Cmp ? <Cmp v={values} /> : null}
    </div>
  );
}
