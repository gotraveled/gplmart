"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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

const slideData = [
  { title: "New arrivals", sub: "Fresh styles for the season", bg: "#dbe7c8" },
  { title: "Sale edit", sub: "Selected styles at lower prices", bg: "#e8d6c6" },
  { title: "Everyday basics", sub: "Wardrobe staples, restocked", bg: "#cfdde6" },
];
function Slides({ v }: P) {
  const [index, setIndex] = useState(0);
  const autoplay = on(v, "autoplay");
  const speed = Number(v.speed) || 5;
  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slideData.length), speed * 1000);
    return () => clearInterval(t);
  }, [autoplay, speed]);
  const go = (s: number) => setIndex((i) => (i + s + slideData.length) % slideData.length);
  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slideData.map((s) => (
          <div key={s.title} className="grid min-w-full place-items-center px-6 py-16 text-center" style={{ background: s.bg }}>
            <div>
              <p className="text-xl font-bold text-neutral-900">{s.title}</p>
              <p className="mt-1 text-sm text-neutral-600">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
      {on(v, "arrows") && (
        <>
          <button type="button" aria-label="Previous slide" onClick={() => go(-1)} className="absolute left-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-lg text-white">&lsaquo;</button>
          <button type="button" aria-label="Next slide" onClick={() => go(1)} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-lg text-white">&rsaquo;</button>
        </>
      )}
    </div>
  );
}

function Delivery({ v }: P) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [days, setDays] = useState<number | null>(null);
  const fast = Number(v.fast) || 2;
  const slow = Number(v.slow) || 5;
  const fmt = (d: number) => {
    const dt = new Date();
    dt.setDate(dt.getDate() + d);
    return dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  };
  function check() {
    if (pin.length !== 6) {
      setError(true);
      return;
    }
    setError(false);
    const zones: [number, number][] = [[110001, 110096], [400001, 400104], [560001, 560110], [700001, 700160], [600001, 600130]];
    const p = parseInt(pin, 10);
    setDays(zones.some(([a, b]) => p >= a && p <= b) ? fast : slow);
  }
  const accent = "#5eead4";
  return (
    <div className="p-6">
      <div className="mx-auto max-w-md rounded-2xl border border-teal-300/20 bg-gradient-to-br from-[#101828] to-[#080c1b] p-4 text-white shadow-xl">
        <div className="flex flex-wrap gap-1.5">
          {[["✓", "Verified seller"], ["₹", "UPI & cards"], ["↺", "Easy returns"]].map(([b, t]) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full border border-slate-400/25 bg-white/5 px-2.5 py-1 text-[0.62rem] font-bold text-slate-300">
              <b style={{ color: accent }}>{b}</b> {t}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm font-bold text-slate-200">{str(v, "heading", 40)}</p>
        {days === null ? (
          <div className="mt-2 flex overflow-hidden rounded-lg border border-slate-400/30 bg-[#020617b3]">
            <input
              type="tel"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              placeholder="Enter 6-digit PIN code"
              aria-label="Enter delivery PIN code"
              onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setError(false); }}
              onKeyDown={(e) => { if (e.key === "Enter") check(); }}
              className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={check}
              className="w-[4.6rem] border-l border-slate-400/25 bg-teal-300/10 text-xs font-bold hover:bg-teal-300/20"
              style={{ color: accent }}
            >
              Check
            </button>
          </div>
        ) : (
          <>
            <ol className="mt-3 grid list-none grid-cols-3 gap-1.5 p-0">
              {[
                { t: "Order placed", d: fmt(0), on: true },
                { t: "Shipped", d: fmt(Math.min(2, days - 1)), on: false },
                { t: "Delivered", d: fmt(days), on: true, final: true },
              ].map((s) => (
                <li key={s.t} className="relative pt-3">
                  <span className="absolute left-1 top-1.5 h-px w-full bg-slate-500/30" aria-hidden />
                  <span
                    className="absolute left-0 top-0 size-[0.45rem] rounded-full"
                    style={s.on ? { background: accent, boxShadow: `0 0 8px ${accent}` } : { background: "#475569" }}
                    aria-hidden
                  />
                  <b className="block text-[0.65rem] font-bold" style={{ color: s.final ? accent : "#e2e8f0" }}>{s.t}</b>
                  <small className="text-[0.6rem]" style={{ color: s.final ? accent : "#64748b" }}>{s.d}</small>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={() => { setDays(null); setPin(""); }}
              className="mt-2.5 p-0 text-[0.7rem] font-semibold underline"
              style={{ color: accent }}
            >
              Change PIN code
            </button>
          </>
        )}
        {error && <p role="alert" className="mt-1.5 text-xs text-red-300">Please enter a valid 6-digit PIN code.</p>}
      </div>
      <p className="mt-2 text-[0.65rem] text-neutral-400">Try 110001 (metro zone) or another code to see different estimates.</p>
    </div>
  );
}

function SizeChart({ v }: P) {
  const [open, setOpen] = useState(false);
  const rows: [string, string, string][] = [
    ["S", "38", "26"],
    ["M", "40", "28"],
    ["L", "42", "30"],
    ["XL", "44", "32"],
  ];
  return (
    <div className="relative p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Relaxed-fit tee</p>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="mt-2 text-sm font-medium underline underline-offset-4">
        {str(v, "label", 30)} &#8599;
      </button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={str(v, "label", 30)} className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 p-4" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="relative w-full max-w-xs rounded-xl bg-white p-5 shadow-xl">
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute right-2.5 top-2 grid size-7 place-items-center rounded-full bg-white text-lg shadow">&times;</button>
            <p className="mb-3 text-sm font-bold">{str(v, "label", 30)}</p>
            <table className="w-full border-collapse text-center text-xs">
              <thead>
                <tr className="bg-neutral-100"><th className="p-1.5">Size</th><th className="p-1.5">Chest (in)</th><th className="p-1.5">Length (in)</th></tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]} className="border-t border-neutral-200"><td className="p-1.5 font-semibold">{r[0]}</td><td className="p-1.5">{r[1]}</td><td className="p-1.5">{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-[0.65rem] text-neutral-400">On a real product this shows the uploaded size-chart image{on(v, "zoom") ? ", with click-to-zoom" : ""}.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Coupons({ v }: P) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cards = [
    { tag: "Welcome", title: "Flat 10% off", sub: "For new customers", code: "WELCOME10" },
    { tag: "Exclusive", title: "Extra 5% off", sub: "On prepaid orders", code: "PREPAID5" },
    { tag: "Special", title: "Free shipping", sub: "On orders above $50", code: "FREESHIP" },
  ];
  async function copy(code: string) {
    try { await navigator.clipboard.writeText(code); } catch { /* clipboard unavailable in preview */ }
    setCopied(code);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 2000);
  }
  return (
    <div className="p-6">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {cards.map((c) => (
          <div key={c.code} className="flex w-64 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="min-w-0 flex-1 p-3.5">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide">{c.tag}</span>
              <p className="mt-1.5 text-sm font-extrabold">{c.title}</p>
              <p className="text-[0.7rem] text-slate-500">{c.sub}</p>
            </div>
            <div className="relative w-px border-l-[1.5px] border-dashed border-slate-300">
              {on(v, "notch") && (
                <>
                  <span aria-hidden className="absolute -left-[7px] -top-[7px] size-3 rounded-full border border-slate-200 bg-[#eef1e6]" />
                  <span aria-hidden className="absolute -bottom-[7px] -left-[7px] size-3 rounded-full border border-slate-200 bg-[#eef1e6]" />
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => copy(c.code)}
              aria-label={`Copy coupon code ${c.code}`}
              className="flex w-24 flex-col items-center justify-center gap-1 bg-stone-50 text-center"
            >
              <span className="text-[0.55rem] font-bold uppercase tracking-wider text-slate-400">{copied === c.code ? "Copied" : "Tap to copy"}</span>
              <span
                className="rounded-md border-[1.5px] border-dashed px-2 py-1 text-[0.7rem] font-extrabold"
                style={copied === c.code ? { background: "#059669", borderColor: "#059669", borderStyle: "solid", color: "#fff" } : { borderColor: hex(v, "accent"), color: hex(v, "accent") }}
              >
                {c.code}
              </span>
            </button>
          </div>
        ))}
      </div>
      <p role="status" className="mt-2 text-xs text-neutral-500">{copied ? `${copied} copied to clipboard` : ""}</p>
    </div>
  );
}

function TrustGrid({ v }: P) {
  const items: { t: string; s: string; bg: string; fg: string; icon: "shield" | "truck" | "refresh" | "award" }[] = [
    { t: "Free shipping", s: "On prepaid orders", bg: "#e8f0fe", fg: "#4a6fe3", icon: "truck" },
    { t: "Easy returns", s: "Within the policy window", bg: "#f3eeff", fg: "#8b5cf6", icon: "refresh" },
    { t: "Quality checked", s: "Before dispatch", bg: "#fff8e1", fg: "#e6a817", icon: "award" },
    { t: "Secure checkout", s: "All major methods", bg: "#e6f7f0", fg: "#1a9e6a", icon: "shield" },
  ];
  const icons = {
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    truck: (
      <>
        <rect x="1" y="3" width="15" height="13" rx="1.5" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
    refresh: (
      <>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" />
      </>
    ),
  };
  return (
    <div className="p-6">
      <ul className={`grid list-none grid-cols-2 gap-3 p-0 ${str(v, "columns") === "4" ? "@lg:grid-cols-4" : ""}`}>
        {items.map(({ t, s, bg, fg, icon }) => (
          <li key={t} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-full" style={{ color: fg, background: bg }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
                {icons[icon]}
              </svg>
            </span>
            <span className="grid min-w-0">
              <strong className="truncate text-xs">{t}</strong>
              <span className="truncate text-[0.65rem] text-slate-500">{s}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Price({ v }: P) {
  const variants = [
    { name: "Single", price: 499, compare: 799 },
    { name: "Twin pack", price: 899, compare: 1299 },
    { name: "Family pack", price: 1499, compare: 0 },
  ];
  const [sel, setSel] = useState(0);
  const cur = variants[sel]!;
  const onSale = cur.compare > cur.price;
  const pct = onSale ? Math.round(((cur.compare - cur.price) * 100) / cur.compare) : 0;
  const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  return (
    <div className="p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Everyday backpack</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-2.5 border-b border-slate-200 pb-3">
        <span className="text-2xl font-extrabold tracking-tight" style={{ color: hex(v, "accent") }}>{money(cur.price)}</span>
        {onSale && <s className="text-sm text-slate-400">{money(cur.compare)}</s>}
        {on(v, "badge") && onSale && <span className="rounded-md bg-green-100 px-2 py-0.5 text-[0.7rem] font-bold uppercase text-green-700">{pct}% off</span>}
        <span className="text-xs text-slate-500">{str(v, "note", 40)}</span>
      </div>
      <div className="mt-3 flex gap-2" role="group" aria-label="Variant">
        {variants.map((x, i) => (
          <button
            key={x.name}
            type="button"
            aria-pressed={sel === i}
            onClick={() => setSel(i)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${sel === i ? "border-neutral-900 bg-neutral-900 text-white" : "border-slate-300"}`}
          >
            {x.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function PromoPopup({ v }: P) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const delay = Number(v.delay) || 5;
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), Math.min(delay, 3) * 1000);
    return () => clearTimeout(t);
  }, [delay]);
  async function copy() {
    try { await navigator.clipboard.writeText(str(v, "code", 20)); } catch { /* no clipboard in preview */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="relative min-h-72 p-6">
      <p className="text-xs text-neutral-400">The popup opens after the configured delay and stays dismissed for the visitor afterwards.</p>
      {!open && (
        <button type="button" onClick={() => setOpen(true)} className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm">
          Preview popup now
        </button>
      )}
      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 p-4" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div role="dialog" aria-modal="true" aria-label={str(v, "title", 40)} className="relative w-full max-w-xs rounded-2xl bg-white p-6 text-center shadow-2xl">
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute right-2.5 top-2 text-xl text-slate-400">&times;</button>
            <p className="text-lg font-extrabold">{str(v, "title", 40)}</p>
            <p className="mt-1.5 text-sm text-slate-600">{str(v, "text", 80)}</p>
            {str(v, "code") && (
              <button type="button" onClick={copy} className={`mx-auto mt-4 flex flex-col rounded-xl border-[1.5px] border-dashed px-5 py-2.5 ${copied ? "border-solid border-green-600" : "border-neutral-900"}`}>
                <span className="text-[0.55rem] font-bold uppercase tracking-widest text-slate-400">{copied ? "Copied" : "Tap to copy"}</span>
                <strong className="text-base tracking-wide">{str(v, "code", 20)}</strong>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}
function Countdown({ v }: P) {
  const [left, setLeft] = useState(47 * 3600 + 23 * 60 + 41); // demo starts at 47:23:41
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const slot = (n: number, label: string, accent = false) => (
    <span className="grid gap-1">
      <b className={`grid h-11 w-14 place-items-center rounded-lg border font-mono text-xl font-extrabold ${accent ? "border-[#c8f54266] text-[#c8f542]" : "border-slate-600/40"} bg-[#020617cc]`}>
        {pad(n)}
      </b>
      <small className="text-center text-[0.55rem] font-bold uppercase tracking-widest text-slate-500">{label}</small>
    </span>
  );
  return (
    <div className="grid place-items-center p-6">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 px-5 py-6 text-center text-white shadow-xl">
        <span className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-widest text-amber-300">
          {str(v, "badge", 30)}
        </span>
        <p className="mt-2 text-sm text-slate-400">{str(v, "heading", 60)}</p>
        {left > 0 ? (
          <div className="mt-3.5 flex items-center justify-center gap-2" role="timer">
            {slot(Math.floor(left / 3600), "Hours")}
            <span className="pb-4 font-bold text-slate-500">:</span>
            {slot(Math.floor((left % 3600) / 60), "Mins")}
            <span className="pb-4 font-bold text-slate-500">:</span>
            {slot(left % 60, "Secs", true)}
          </div>
        ) : (
          <p className="mt-3.5 text-sm text-slate-400">{str(v, "done", 50)}</p>
        )}
      </div>
    </div>
  );
}

function StarRating({ v }: P) {
  const rating = Number(v.stars) || 0;
  const pct = (rating / 5) * 100;
  return (
    <div className="p-6">
      <div
        className="inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-white"
        style={{ background: "rgba(15, 24, 44, 0.92)", borderColor: "rgb(255 215 0 / 0.3)", boxShadow: "0 8px 24px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgb(255 255 255 / 0.08)" }}
        role="img"
        aria-label={`Rated ${rating} out of 5 stars`}
      >
        <span className="relative inline-block text-base leading-none tracking-widest" style={{ color: "#3d4a66" }}>
          ★★★★★
          <span
            className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-[#ffb800]"
            style={{ width: `${pct}%`, textShadow: "0 0 10px rgb(255 184 0 / 0.4)" }}
            aria-hidden
          >
            ★★★★★
          </span>
        </span>
        <strong className="text-sm">{rating} / 5</strong>
        {str(v, "count") && (
          <>
            <span className="h-4 w-px bg-white/20" aria-hidden />
            <span className="text-xs text-slate-400">
              <b className="text-[#5eead4]">{str(v, "count", 10)}</b> verified reviews
            </span>
          </>
        )}
      </div>
      <p className="mt-3 text-[0.65rem] text-neutral-400">On a real product the score comes from the reviews metafield - the preview uses the settings on the left.</p>
    </div>
  );
}

function StockPulse({ v }: P) {
  const max = Number(v.threshold) || 10;
  const stock = Math.min(6, max); // preview shows the low-stock state
  return (
    <div className="p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Everyday Crew</p>
      <div
        className="mt-2 inline-flex items-center gap-2.5 rounded-lg border px-4 py-3 text-[0.82rem] font-semibold text-[#ffa39e]"
        style={{
          borderColor: "rgb(255 77 79 / 0.35)",
          background: "linear-gradient(145deg, rgba(38, 12, 15, 0.95), rgba(20, 8, 10, 0.98))",
          boxShadow: "0 8px 24px -8px rgba(0,0,0,0.6), 0 0 18px -4px rgb(255 77 79 / 0.25)",
        }}
      >
        <span className="size-2.5 animate-pulse rounded-full bg-[#ff4d4f]" style={{ boxShadow: "0 0 10px #ff4d4f" }} aria-hidden />
        Selling fast - only <strong className="text-[#ff4d4f]" style={{ textShadow: "0 0 10px rgb(255 77 79 / 0.5)" }}>{stock}</strong> left in stock
      </div>
      <p className="mt-2 text-[0.65rem] text-neutral-400">Shows only when tracked inventory is at or below {max} - the number is real, never random.</p>
    </div>
  );
}

function StickyBuyBar({ v }: P) {
  const [added, setAdded] = useState(false);
  return (
    <div className="relative flex h-64 flex-col justify-end p-0">
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Everyday Crew</p>
        <p className="mt-1 text-sm text-neutral-600">Scroll the product page and this bar stays pinned on mobile.</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-teal-300/35 bg-[#080c1bf0] px-3.5 py-2.5 backdrop-blur">
        <span className="flex items-baseline gap-1.5">
          <strong className="text-base font-black text-white" style={{ textShadow: "0 0 16px rgb(94 234 212 / 0.4)" }}>₹499</strong>
          <s className="text-xs text-slate-500">₹799</s>
          <span className="rounded border border-red-500/35 bg-red-500/15 px-1 py-0.5 text-[0.58rem] font-extrabold text-red-400">38% off</span>
        </span>
        <button
          type="button"
          onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
          className="relative overflow-hidden rounded-full px-5 py-2 text-sm font-black text-[#030712]"
          style={{ background: "linear-gradient(135deg, #00f0b5, #10b981 50%, #059669)", boxShadow: "0 0 20px rgb(94 234 212 / 0.4), inset 0 1px 0 rgb(255 255 255 / 0.6)" }}
        >
          {added ? "Added!" : str(v, "label", 20)}
        </button>
      </div>
    </div>
  );
}

function FreeShipBar({ v }: P) {
  const goal = Number(v.goal) || 49900;
  const cart = 29900; // preview cart total in paise
  const pct = Math.min(100, Math.round((cart / goal) * 100));
  const left = goal - cart;
  const money = (p: number) => `₹${(p / 100).toLocaleString("en-IN")}`;
  return (
    <div className="p-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">Your cart</p>
        {left > 0 ? (
          <p className="text-sm">
            Add <strong style={{ color: hex(v, "accent") }}>{money(left)}</strong> more to unlock free shipping
          </p>
        ) : (
          <p className="text-sm font-bold" style={{ color: hex(v, "accent") }}>You have unlocked free shipping</p>
        )}
        <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Progress to free shipping" className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-200">
          <span
            className="block h-full rounded-full transition-[width]"
            style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${hex(v, "accent")}, #34d399)`, boxShadow: `0 0 10px -2px ${hex(v, "accent")}` }}
          />
        </div>
        <p className="mt-2 text-[0.65rem] text-neutral-400">Preview uses a ₹{money(cart).replace("₹", "")} cart - on the store it reads the real cart total.</p>
      </div>
    </div>
  );
}

function Marquee({ v }: P) {
  const itemsx = ["Free shipping", "Easy returns", "Quality checked", "Secure checkout", "COD available"];
  const speed = Number(v.speed) || 10;
  const row = (key: string) => (
    <span key={key} aria-hidden={key === "b"} className="inline-flex items-center gap-6 whitespace-nowrap">
      {itemsx.map((t, i) => (
        <span key={t} className="inline-flex items-center gap-6">
          <span className="text-sm font-semibold">{t}</span>
          {on(v, "divider") && !(key === "b" && i === itemsx.length - 1) && <span className="text-slate-400">&bull;</span>}
        </span>
      ))}
    </span>
  );
  return (
    <div className="p-6">
      <div className="overflow-hidden border-y border-slate-200 py-2.5">
        <div
          className="inline-flex animate-[gpl-marquee_linear_infinite] items-center gap-6 will-change-transform"
          style={{ animationDuration: `${speed}s` }}
        >
          {row("a")}{row("b")}
        </div>
      </div>
      <p className="mt-2 text-[0.65rem] text-neutral-400">Blocks drive the items; it pauses on hover and respects reduced-motion.</p>
    </div>
  );
}

function PaymentBadges({ v }: P) {
  const items = str(v, "items", 120).split("|").map((s) => s.trim()).filter(Boolean);
  return (
    <div className="p-6">
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
        {items.map((i) => (
          <li key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" style={{ color: hex(v, "accent") }} aria-hidden>
              <rect x="2" y="5" width="20" height="14" rx="3" /><path d="M2 10h20" />
            </svg>
            {i}
          </li>
        ))}
      </ul>
      <p className="m-0 mt-2 text-[0.68rem] text-neutral-500">{str(v, "note", 80)}</p>
    </div>
  );
}

function QuantityBreaks({ v }: P) {
  const [sel, setSel] = useState(1);
  const t2 = Number(v.tier2) || 10;
  const t3 = Number(v.tier3) || 20;
  const price = 2499;
  const money = (n: number) => `Rs. ${n.toLocaleString("en-IN")}`;
  const tiers = [
    { q: 1, label: "Buy 1", price: money(price) },
    { q: 2, label: "Buy 2", save: t2, price: money(Math.round(price * 2 * (1 - t2 / 100))) },
    { q: 3, label: "Buy 3", save: t3, best: true, price: money(Math.round(price * 3 * (1 - t3 / 100))) },
  ];
  return (
    <div className="grid gap-2 p-6">
      <p className="m-0 text-xs font-bold uppercase tracking-wider text-neutral-500">Bundle &amp; save</p>
      {tiers.map((t) => (
        <button
          key={t.q}
          type="button"
          onClick={() => setSel(t.q)}
          className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${sel === t.q ? "border-2 bg-slate-50" : "border-slate-200 bg-slate-50/60 hover:border-slate-300"}`}
          style={sel === t.q ? { borderColor: hex(v, "accent"), boxShadow: `0 0 0 1px ${hex(v, "accent")}` } : undefined}
        >
          <span className="font-semibold">
            {t.label}
            {t.save != null && <em className="ml-1.5 text-[0.7rem] font-bold not-italic" style={{ color: hex(v, "accent") }}>save {t.save}%</em>}
            {t.best && <span className="ml-1.5 rounded-full px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide" style={{ background: hex(v, "accent"), color: "#0b1220" }}>best value</span>}
          </span>
          <span className="font-bold">{t.price}</span>
        </button>
      ))}
      <p className="m-0 text-[0.65rem] text-neutral-400">On the store it also sets the quantity field - and the discount must exist in Shopify too.</p>
    </div>
  );
}

function Guarantee({ v }: P) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg text-white" style={{ background: hex(v, "accent") }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
            <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
          </svg>
        </span>
        <p className="m-0 text-sm leading-snug">
          <strong className="block">{str(v, "days") || "30"}-day money-back guarantee.</strong>
          {str(v, "text", 90)}
        </p>
      </div>
    </div>
  );
}

function RecentlyViewed({ v }: P) {
  const items = [
    { title: "Linen overshirt", price: "Rs. 2,499" },
    { title: "Everyday tote", price: "Rs. 1,199" },
    { title: "Ribbed knit top", price: "Rs. 899" },
    { title: "Canvas sneakers", price: "Rs. 3,299" },
  ].slice(0, Number(v.limit) || 4);
  return (
    <div className="p-6">
      <p className="m-0 mb-3 text-sm font-bold">{str(v, "heading", 50) || "Recently viewed"}</p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {items.map((i) => (
          <a key={i.title} className="block overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 no-underline">
            <span className="block aspect-square bg-gradient-to-br from-slate-200 to-slate-100" />
            <span className="block p-2.5">
              <span className="block text-xs font-semibold leading-snug">{i.title}</span>
              <span className="mt-0.5 block text-[0.7rem] text-neutral-500">{i.price}</span>
            </span>
          </a>
        ))}
      </div>
      <p className="m-0 mt-2 text-[0.65rem] text-neutral-400">Stored in the visitor&apos;s browser only - the preview shows sample cards.</p>
    </div>
  );
}

function SoldOutNotify({ v }: P) {
  return (
    <div className="p-6">
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-center">
        <p className="m-0 mb-2.5 text-sm"><strong>Sold out.</strong> Get notified when it returns.</p>
        <span className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
          {str(v, "label", 40) || "Notify me when back in stock"}
        </span>
        <p className="m-0 mt-2 text-[0.65rem] text-neutral-400">Opens {str(v, "mode") === "email" ? "an email" : "WhatsApp"} to your support channel - only shows when the variant is sold out.</p>
      </div>
    </div>
  );
}

function BackToTop({ v }: P) {
  return (
    <div className="relative h-56 overflow-hidden p-6">
      <div className="space-y-2">
        {[80, 60, 90, 45, 70].map((w) => (
          <div key={w} className="h-3 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
        ))}
      </div>
      <button
        type="button"
        className={`absolute bottom-5 grid size-11 place-items-center rounded-full bg-slate-900 text-white shadow-lg ${str(v, "position") === "left" ? "left-5" : "right-5"}`}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
          <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
        </svg>
      </button>
      <p className="absolute inset-x-0 bottom-6 text-center text-[0.65rem] text-neutral-400">Appears after ~480px of scroll</p>
    </div>
  );
}

function ScrollProgress({ v }: P) {
  const [pct, setPct] = useState(35);
  return (
    <div className="relative">
      <div className="h-[3px] w-full bg-transparent">
        <span className="block h-full transition-[width]" style={{ width: `${pct}%`, background: hex(v, "color") }} />
      </div>
      <div className="space-y-2 p-6">
        {[85, 65, 90, 50, 75].map((w) => (
          <div key={w} className="h-3 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
        ))}
      </div>
      <button type="button" onClick={() => setPct((p) => (p >= 95 ? 10 : p + 20))} className="absolute bottom-3 right-4 rounded-full border border-slate-300 px-2.5 py-1 text-[0.65rem] font-medium text-neutral-500">
        Simulate scroll
      </button>
    </div>
  );
}

function CookieConsent({ v }: P) {
  const [show, setShow] = useState(true);
  if (!show)
    return (
      <div className="p-6 text-center text-xs text-neutral-500">
        Choice saved.{" "}
        <button type="button" className="underline" onClick={() => setShow(true)}>Show banner again</button>
      </div>
    );
  return (
    <div className="flex items-end">
      <div className="mt-auto w-full flex-wrap items-center justify-between gap-3 rounded-t-xl border-t border-white/10 bg-slate-900 px-5 py-4 text-slate-100 sm:flex">
        <p className="m-0 text-xs">
          {str(v, "text", 120)} <span className="underline">Privacy policy</span>
        </p>
        <div className="mt-3 flex gap-2 sm:mt-0">
          <button type="button" onClick={() => setShow(false)} className="rounded-full px-4 py-1.5 text-xs font-semibold" style={{ background: hex(v, "accent"), color: "#0b1220" }}>
            Accept
          </button>
          <button type="button" onClick={() => setShow(false)} className="rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

function SaleBadge({ v }: P) {
  return (
    <div className="p-6">
      <div className="flex items-start gap-4">
        <span className="block h-20 w-20 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100" />
        <div>
          <p className="m-0 text-sm font-semibold">Linen overshirt</p>
          <p className="m-0 mt-1 text-sm">
            <span className="font-bold">Rs. 1,749</span>{" "}
            <span className="text-neutral-400 line-through">Rs. 2,499</span>
          </p>
          <span
            className="mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide text-white"
            style={{ background: hex(v, "accent"), boxShadow: `0 4px 14px -4px ${hex(v, "accent")}` }}
          >
            Save 30%
          </span>
        </div>
      </div>
      <p className="m-0 mt-3 text-[0.65rem] text-neutral-400">On the store the % is computed from compare_at_price - always the true saving.</p>
    </div>
  );
}

function ProductTabs({ v }: P) {
  const [tab, setTab] = useState(0);
  const tabs = [str(v, "tab1", 24) || "Description", str(v, "tab2", 24) || "Shipping", str(v, "tab3", 24) || "Returns"];
  const panels = [
    "Soft, breathable linen with a relaxed everyday cut. Prewashed so it keeps its shape.",
    "Ships in 2-4 business days. Free shipping thresholds apply at checkout.",
    "Easy 30-day returns on unused items in original packaging.",
  ];
  return (
    <div className="p-6">
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="flex border-b border-slate-200 bg-slate-50/70">
          {tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(i)}
              className={`flex-1 border-b-2 px-2 py-2.5 text-[0.8rem] font-semibold transition ${tab === i ? "border-accent text-fg" : "border-transparent text-neutral-500"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="m-0 p-4 text-sm leading-relaxed text-neutral-700">{panels[tab]}</p>
      </div>
    </div>
  );
}

function LogoMarquee({ v }: P) {
  const items = str(v, "items", 120).split("|").map((s) => s.trim()).filter(Boolean);
  const speed = Number(v.speed) || 16;
  const row = (key: string) => (
    <span key={key} aria-hidden={key === "b"} className="inline-flex items-center gap-12">
      {items.map((i) => (
        <span key={i} className="text-base font-bold tracking-wide text-neutral-400">{i}</span>
      ))}
    </span>
  );
  return (
    <div className="p-6 text-center">
      <p className="m-0 mb-4 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-neutral-400">As featured in</p>
      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="inline-flex animate-[gpl-marquee_linear_infinite] items-center gap-12 whitespace-nowrap will-change-transform" style={{ animationDuration: `${speed}s` }}>
          {row("a")}{row("b")}
        </div>
      </div>
      <p className="m-0 mt-3 text-[0.65rem] text-neutral-400">Blocks take real logo images; text shows until assets are uploaded.</p>
    </div>
  );
}

function TestimonialSlider({ v }: P) {
  const quotes = [
    { quote: "Exactly as described, quality is way better than I expected for the price.", name: "Priya · Mumbai" },
    { quote: "Ordered Monday, delivered Wednesday. Packaging was beautiful.", name: "Rahul · Delhi" },
    { quote: "Third purchase from this store - they never miss.", name: "Ananya · Bengaluru" },
  ];
  const [i, setI] = useState(0);
  const auto = on(v, "autoplay");
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setI((x) => (x + 1) % quotes.length), 4000);
    return () => clearInterval(t);
  }, [auto, quotes.length]);
  const q = quotes[i]!;
  return (
    <div className="p-8 text-center">
      <div className="mb-3 flex justify-center gap-0.5" style={{ color: hex(v, "accent") }}>
        {Array.from({ length: 5 }).map((_, j) => (
          <svg key={j} viewBox="0 0 20 20" className="size-4" fill="currentColor" aria-hidden>
            <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z" />
          </svg>
        ))}
      </div>
      <blockquote className="m-0 text-base font-medium leading-relaxed">&ldquo;{q.quote}&rdquo;</blockquote>
      <p className="m-0 mt-3 text-xs text-neutral-500">{q.name}</p>
      <div className="mt-4 flex justify-center gap-1.5">
        {quotes.map((_, j) => (
          <button
            key={j}
            type="button"
            onClick={() => setI(j)}
            aria-label={`Show testimonial ${j + 1}`}
            className="size-2 rounded-full transition"
            style={{ background: j === i ? hex(v, "accent") : "#cbd5e1" }}
          />
        ))}
      </div>
    </div>
  );
}

function BeforeAfter({ v }: P) {
  const [pos, setPos] = useState(50);
  return (
    <div className="p-6">
      <div className="relative overflow-hidden rounded-xl select-none">
        <div className="grid h-52 place-items-center bg-gradient-to-br from-mint/60 to-emerald-200 text-sm font-semibold text-emerald-900">AFTER</div>
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-300 to-slate-200 text-sm font-semibold text-slate-600 transition-[clip-path]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          BEFORE
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-white">Before</span>
        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-white">After</span>
        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Reveal before and after comparison"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
        <span className="pointer-events-none absolute inset-y-0 w-0.5" style={{ left: `${pos}%`, background: hex(v, "accent") }} />
      </div>
      <p className="m-0 mt-2 text-center text-[0.65rem] text-neutral-400">Drag to compare - placeholder blocks stand in for the real photos.</p>
    </div>
  );
}

function EmiNote({ v }: P) {
  const n = Number(v.parts) || 3;
  const each = Math.round(2499 / n);
  return (
    <div className="p-6">
      <p className="m-0 text-lg font-bold">Rs. 2,499</p>
      <p className="m-0 mt-1 text-sm">
        or <strong style={{ color: hex(v, "accent") }}>{n} payments of Rs. {each.toLocaleString("en-IN")}</strong>
        <span className="ml-1.5 text-[0.7rem] text-neutral-400">available at checkout</span>
      </p>
      <p className="m-0 mt-3 text-[0.65rem] text-neutral-400">Only show this if your payment provider actually offers instalments.</p>
    </div>
  );
}

function CutoffTimer({ v }: P) {
  const [left, setLeft] = useState("2h 15m 00s");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const cut = new Date(now);
      cut.setHours(Number(v.hour) || 16, 0, 0, 0);
      const ms = Math.max(0, cut.getTime() - now.getTime());
      const h = Math.floor(ms / 3.6e6);
      const m = Math.floor((ms % 3.6e6) / 6e4);
      const s = Math.floor((ms % 6e4) / 1e3);
      setLeft(h > 0 ? `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s` : `${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [v.hour]);
  return (
    <div className="flex items-center gap-2.5 p-6 text-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" style={{ color: hex(v, "accent") }} aria-hidden>
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
      </svg>
      <p className="m-0">
        Order within <strong style={{ color: hex(v, "accent") }}>{left}</strong> for same-day dispatch
      </p>
    </div>
  );
}

function PairsWellWith({ v }: P) {
  const items = [
    { title: "Linen shorts", price: "Rs. 1,299" },
    { title: "Canvas cap", price: "Rs. 699" },
    { title: "Woven belt", price: "Rs. 549" },
    { title: "Summer socks (3-pack)", price: "Rs. 399" },
  ].slice(0, Number(v.limit) || 4);
  return (
    <div className="p-6">
      <p className="m-0 mb-3 text-sm font-bold">{str(v, "heading", 40) || "Pairs well with"}</p>
      <div className="grid grid-cols-2 gap-2.5">
        {items.map((i) => (
          <a key={i.title} className="flex items-center gap-2.5 rounded-xl border border-slate-200 p-2.5 no-underline transition hover:border-slate-300">
            <span className="block size-12 shrink-0 rounded-lg bg-gradient-to-br from-slate-200 to-slate-100" />
            <span>
              <span className="block text-xs font-semibold leading-snug">{i.title}</span>
              <span className="mt-0.5 block text-[0.7rem] text-neutral-500">{i.price}</span>
            </span>
          </a>
        ))}
      </div>
      <p className="m-0 mt-3 text-[0.65rem] text-neutral-400">Live data comes from Shopify&apos;s Search &amp; Discovery recommendations.</p>
    </div>
  );
}

function SpecTable() {
  const rows = [
    ["Material", "100% organic linen"],
    ["Weight", "180 gsm"],
    ["Care", "Machine wash cold"],
    ["SKU", "GPL-OSH-001"],
  ];
  return (
    <div className="p-6">
      <p className="m-0 mb-2.5 text-sm font-bold">Specifications</p>
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map(([k, val]) => (
            <tr key={k} className="border-b border-slate-200 last:border-0">
              <th scope="row" className="w-2/5 py-2 text-left font-medium text-neutral-500">{k}</th>
              <td className="py-2">{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="m-0 mt-3 text-[0.65rem] text-neutral-400">Rows render from metafields - empty specs hide automatically.</p>
    </div>
  );
}

function GiftWrap({ v }: P) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="p-6">
      <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 p-3 text-sm">
        <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="size-4 accent-[#15803d]" />
        <span>
          {str(v, "label", 60) || "Add gift wrap & a handwritten note"}{" "}
          <em className="text-xs not-italic text-neutral-500">{str(v, "price_note", 40)}</em>
        </span>
      </label>
      {checked && (
        <div className="mt-2.5">
          <label className="mb-1 block text-xs font-semibold" htmlFor="gw-msg">Your message (optional)</label>
          <textarea id="gw-msg" rows={2} maxLength={200} placeholder="Happy birthday! Love, Priya" className="w-full resize-vertical rounded-lg border border-slate-300 bg-transparent p-2.5 text-sm" />
        </div>
      )}
      <p className="m-0 mt-3 text-[0.65rem] text-neutral-400">Travels as line-item properties - visible on the packing slip.</p>
    </div>
  );
}

function Breadcrumb({ v }: P) {
  return (
    <div className="p-6">
      <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-xs">
        <li><a className="font-medium" style={{ color: hex(v, "accent") }}>Home</a></li>
        <li className="text-neutral-400">/</li>
        <li><a className="font-medium" style={{ color: hex(v, "accent") }}>Shirts</a></li>
        <li className="text-neutral-400">/</li>
        <li className="text-neutral-600">Linen overshirt</li>
      </ol>
      <p className="m-0 mt-3 text-[0.65rem] text-neutral-400">Emits BreadcrumbList JSON-LD for richer search results.</p>
    </div>
  );
}

function CartUpsell({ v }: P) {
  const accent = hex(v, "accent");
  return (
    <div className="p-4">
      <p className="m-0 mb-2 text-[0.65rem] font-bold uppercase tracking-wider text-neutral-500">{str(v, "heading") || "Complete your order"}</p>
      <div className="flex gap-3 rounded-xl border p-3" style={{ borderColor: `${accent}55`, background: `${accent}0f` }}>
        <div className="size-16 shrink-0 rounded-lg bg-[linear-gradient(135deg,#e0e7ff,#fbcfe8)]" />
        <div className="flex-1">
          <p className="m-0 text-xs font-bold">Organic cotton tee</p>
          <p className="m-0 mt-0.5 text-[0.65rem] text-neutral-500">₹799</p>
          <button type="button" className="mt-1.5 rounded-md px-3 py-1 text-[0.65rem] font-extrabold text-white" style={{ background: accent }}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function ImageZoom({ v }: P) {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState("50% 50%");
  const zoom = Number(str(v, "zoom")) || 2;
  return (
    <div className="p-4">
      <div
        ref={ref}
        className="relative cursor-zoom-in overflow-hidden rounded-xl bg-[linear-gradient(135deg,#e0e7ff,#fbcfe8,#bbf7d0)]"
        style={{ aspectRatio: "4/3" }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          setOrigin(`${(((e.clientX - r.left) / r.width) * 100).toFixed(0)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(0)}%`);
        }}
      >
        <div
          className="absolute inset-0 grid place-items-center transition-transform"
          style={{ transform: `scale(${zoom})`, transformOrigin: origin }}
        >
          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-neutral-500/60">Product photo</span>
        </div>
        <span className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5 text-[0.6rem] text-white">Hover to zoom {zoom}x</span>
      </div>
    </div>
  );
}

function CompleteTheLook({ v }: P) {
  const accent = hex(v, "accent");
  return (
    <div className="p-4">
      <p className="m-0 mb-2.5 text-[0.65rem] font-bold uppercase tracking-wider text-neutral-500">{str(v, "heading") || "Complete the look"}</p>
      <div className="grid grid-cols-3 gap-2.5">
        {[
          ["Overshirt", "₹2,499", "#dbeafe"],
          ["Chinos", "₹1,799", "#fef3c7"],
          ["Sneakers", "₹2,199", "#fce7f3"],
        ].map(([t, p, c]) => (
          <div key={t}>
            <div className="aspect-square rounded-lg" style={{ background: `linear-gradient(135deg,${c},#fff)` }} />
            <p className="m-0 mt-1.5 text-[0.65rem] font-semibold">{t}</p>
            <p className="m-0 text-[0.6rem] text-neutral-500">{p}</p>
          </div>
        ))}
      </div>
      <button type="button" className="mt-3 w-full rounded-xl py-2.5 text-xs font-extrabold text-white" style={{ background: accent }}>
        Add all - ₹6,497
      </button>
    </div>
  );
}

function CodChecker({ v }: P) {
  const [pin, setPin] = useState("");
  const [out, setOut] = useState<{ ok: boolean; text: string } | null>(null);
  const list = str(v, "prefixes").split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <div className="p-4">
      <div className="flex gap-2">
        <input
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter pincode"
          className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none"
        />
        <button
          type="button"
          onClick={() => {
            if (!/^\d{6}$/.test(pin)) setOut({ ok: false, text: "Enter a 6-digit pincode" });
            else if (!list.length) setOut({ ok: true, text: "Cash on delivery available" });
            else if (list.some((p) => pin.startsWith(p))) setOut({ ok: true, text: `COD & delivery available at ${pin}` });
            else setOut({ ok: false, text: `Delivery available - COD not covered at ${pin}` });
          }}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
        >
          {str(v, "label") || "Check"}
        </button>
      </div>
      {out && <p className={`m-0 mt-2 text-xs ${out.ok ? "text-emerald-600" : "text-red-500"}`}>{out.text}</p>}
    </div>
  );
}

function IngredientsTable({ v }: P) {
  const accent = hex(v, "accent");
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="grid gap-2.5 p-4">
      {rows.map((r) => {
        const [name, desc, pct] = r.split("|").map((s) => s.trim());
        return (
          <div key={r}>
            <div className="flex justify-between text-[0.7rem] font-bold">
              <span>{name}</span>
              {pct && <span style={{ color: accent }}>{pct}%</span>}
            </div>
            {desc && <p className="m-0 mt-0.5 text-[0.62rem] text-neutral-500">{desc}</p>}
            {pct && (
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                <div className="h-full rounded-full" style={{ width: `${Math.min(Number(pct) || 0, 100)}%`, background: accent }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function UgcGrid({ v }: P) {
  const cols = Number(str(v, "cols")) || 4;
  const caps = ["@priya.m", "@arjun_styles", "@meera.d", "@rohan.k", "@sana.w", "@dev.p", "@nia.r", "@kabir.s"];
  return (
    <div className="p-4">
      <p className="m-0 mb-2.5 text-sm font-extrabold">{str(v, "heading") || "Our customers, in their words and photos"}</p>
      <div className="grid gap-2.5" style={{ gridTemplateColumns: `repeat(${Math.min(cols, 4)}, 1fr)` }}>
        {caps.slice(0, Math.min(cols, 4) * 2).map((c, i) => (
          <div key={c} className="overflow-hidden rounded-xl border border-neutral-200">
            <div className="aspect-square" style={{ background: `linear-gradient(${135 + i * 40}deg, #e0e7ff, #fbcfe8, #bbf7d0)` }} />
            <p className="m-0 px-2 py-1.5 text-[0.6rem] text-neutral-500">{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SalesNotification({ v }: P) {
  const rows = str(v, "entries").split("\n").map((r) => r.trim()).filter(Boolean);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % Math.max(rows.length, 1)), (Number(str(v, "interval")) || 8) * 1000);
    return () => clearInterval(t);
  }, [rows.length, v]);
  const parts = (rows[i] ?? "").split("|").map((s) => s.trim());
  return (
    <div className="relative min-h-28 p-4">
      <div className="absolute bottom-4 left-4 max-w-64 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg">
        <p className="m-0 text-[0.7rem] leading-snug">
          <strong>{parts[0] ?? "Riya"}</strong> from {parts[1] ?? "Pune"} bought <strong>{parts[2] ?? "Organic cotton tee"}</strong>
        </p>
        <p className="m-0 mt-1 text-[0.6rem] text-neutral-400">{parts[3] ?? "8 min ago"}</p>
      </div>
    </div>
  );
}

function AgeVerify({ v }: P) {
  const [open, setOpen] = useState(true);
  if (!open) return <div className="p-6 text-center text-xs text-neutral-400"><button type="button" className="underline" onClick={() => setOpen(true)}>Age confirmed - show again</button></div>;
  return (
    <div className="grid min-h-52 place-items-center bg-black/70 p-4">
      <div className="w-full max-w-64 rounded-2xl bg-white p-6 text-center">
        <p className="m-0 text-base font-extrabold">{str(v, "heading") || "Are you of legal age?"}</p>
        <p className="m-0 mt-2 text-[0.68rem] text-neutral-500">{str(v, "text") || "Confirm your age to continue."}</p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-emerald-600 py-2 text-xs font-extrabold text-white">
            {str(v, "confirm") || "I am 18+"}
          </button>
          <button type="button" className="flex-1 rounded-lg border border-neutral-300 py-2 text-xs">Leave</button>
        </div>
      </div>
    </div>
  );
}

function StoreLocator({ v }: P) {
  return (
    <div className="p-4">
      <p className="m-0 mb-2.5 text-sm font-extrabold">{str(v, "heading") || "Visit us"}</p>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { n: "Mumbai - Bandra", a: "Shop 12, Linking Rd", h: "10am - 9pm" },
          { n: "Delhi - CP", a: "F-22, Inner Circle", h: "11am - 8pm" },
        ].map((l) => (
          <div key={l.n} className="rounded-xl border border-neutral-200 p-3">
            <p className="m-0 text-[0.72rem] font-extrabold">{l.n}</p>
            <p className="m-0 mt-1 text-[0.62rem] text-neutral-500">{l.a}</p>
            <p className="m-0 mt-0.5 text-[0.6rem] text-neutral-400">{l.h}</p>
            <span className="m-0 mt-1.5 inline-block text-[0.62rem] font-bold text-emerald-600">Directions &#8599;</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewSummary({ v }: P) {
  const counts = str(v, "bars").split("|").map((s) => Number(s.trim()) || 0);
  const total = counts.reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="flex items-center gap-5 p-4">
      <div className="text-center">
        <p className="m-0 text-4xl font-black leading-none">{str(v, "rating") || "0.0"}</p>
        <p className="m-0 mt-1 text-amber-500">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
        <p className="m-0 mt-1 text-[0.65rem] text-neutral-500">{str(v, "count")} reviews</p>
      </div>
      <div className="grid flex-1 gap-1.5">
        {counts.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-[0.6rem]">
            <span>{5 - i} &#9733;</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-amber-500" style={{ width: `${(c / total) * 100}%` }} />
            </div>
            <span className="w-6 text-right text-neutral-400">{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AspectRatings({ v }: P) {
  const accent = hex(v, "accent");
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="grid gap-2.5 p-4">
      {rows.map((r) => {
        const [name, score] = r.split("|").map((s) => s.trim());
        return (
          <div key={r} className="flex items-center gap-3 text-[0.7rem]">
            <span className="min-w-24 font-semibold">{name}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full" style={{ width: `${(Number(score) || 0) * 20}%`, background: accent }} />
            </div>
            <span className="font-bold">{score}</span>
          </div>
        );
      })}
    </div>
  );
}

function ReviewCard({ v }: P) {
  return (
    <div className="m-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
      <p className="m-0 text-[0.7rem] tracking-widest text-amber-500">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
      <p className="m-0 mt-2 text-sm leading-relaxed">&ldquo;{str(v, "quote")}&rdquo;</p>
      <p className="m-0 mt-2.5 text-[0.7rem] font-bold">{str(v, "name")}</p>
      <p className="m-0 text-[0.6rem] text-neutral-500">{str(v, "detail")}</p>
    </div>
  );
}

function PressMentions({ v }: P) {
  return (
    <div className="p-5 text-center">
      <p className="m-0 mb-3 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-400">{str(v, "heading") || "As featured in"}</p>
      <div className="flex flex-wrap justify-center gap-x-7 gap-y-2">
        {str(v, "names").split(",").map((s) => s.trim()).filter(Boolean).map((n) => (
          <span key={n} className="font-serif text-sm italic text-neutral-500">{n}</span>
        ))}
      </div>
    </div>
  );
}

function ExpertQuote({ v }: P) {
  return (
    <div className="m-4 rounded-r-xl border-l-4 border-emerald-600 bg-neutral-50 p-4">
      <span className="text-3xl leading-none text-emerald-600">&ldquo;</span>
      <p className="m-0 mt-1 text-sm italic leading-relaxed">{str(v, "quote")}</p>
      <p className="m-0 mt-2.5 text-[0.7rem] font-bold">{str(v, "name")}</p>
      <p className="m-0 text-[0.6rem] text-neutral-500">{str(v, "credential")}</p>
    </div>
  );
}

function VideoTestimonial({ v }: P) {
  return (
    <div className="m-4 grid gap-3 rounded-xl border border-neutral-200 p-3 sm:grid-cols-[1.2fr_1fr] sm:items-center">
      <div className="grid aspect-video place-items-center rounded-lg bg-[linear-gradient(135deg,#dbeafe,#fce7f3)]">
        <span className="text-2xl text-neutral-400">&#9654;</span>
      </div>
      <div>
        <p className="m-0 text-[0.7rem] italic leading-snug">&ldquo;{str(v, "quote")}&rdquo;</p>
        <p className="m-0 mt-1.5 text-[0.62rem] font-bold">&mdash; {str(v, "name")}</p>
      </div>
    </div>
  );
}

function ImageHotspots({ v }: P) {
  const accent = hex(v, "accent");
  const [open, setOpen] = useState(0);
  const pins = [
    { x: 30, y: 35, t: "Linen overshirt", p: "₹2,499" },
    { x: 62, y: 62, t: "Chinos", p: "₹1,799" },
  ];
  return (
    <div className="p-4">
      <p className="m-0 mb-2 text-sm font-extrabold">{str(v, "heading") || "Shop the look"}</p>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#e0e7ff,#fbcfe8,#bbf7d0)]">
        {pins.map((pin, i) => (
          <button
            key={pin.t}
            type="button"
            onClick={() => setOpen(i)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <span className="block size-5 rounded-full border-2 border-white shadow" style={{ background: accent }} />
            {open === i && (
              <span className="absolute bottom-6 left-1/2 w-24 -translate-x-1/2 rounded-lg bg-black/85 px-2 py-1 text-center text-[0.58rem] text-white">
                {pin.t}<br /><b>{pin.p}</b>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatsCounter({ v }: P) {
  const accent = hex(v, "accent");
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="grid grid-cols-3 gap-2 p-4 text-center">
      {rows.map((r) => {
        const [num, label] = r.split("|").map((s) => s.trim());
        return (
          <div key={r}>
            <p className="m-0 text-2xl font-black tabular-nums" style={{ color: accent }}>{num}</p>
            <p className="m-0 mt-0.5 text-[0.6rem] text-neutral-500">{label}</p>
          </div>
        );
      })}
    </div>
  );
}

function WishlistButton({ v }: P) {
  const [saved, setSaved] = useState(false);
  const [n, setN] = useState(3);
  return (
    <div className="flex items-center gap-3 p-4">
      <button
        type="button"
        onClick={() => { setSaved(!saved); setN(saved ? n - 1 : n + 1); }}
        className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-[0.7rem] font-semibold transition ${saved ? "border-rose-500 text-rose-500" : "border-neutral-300"}`}
      >
        <svg className="size-4" viewBox="0 0 24 24" fill={saved ? "#e11d48" : "none"} stroke={saved ? "#e11d48" : "currentColor"} strokeWidth="2">
          <path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 4 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z" />
        </svg>
        {str(v, "label") || "Save for later"}
        <span className="tabular-nums opacity-70">{n}</span>
      </button>
    </div>
  );
}

function FaqSchema({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="p-4">
      {rows.map((r) => {
        const [q, a] = r.split("|").map((s) => s.trim());
        return (
          <details key={r} className="border-b border-neutral-200 py-2.5 text-sm last:border-0">
            <summary className="cursor-pointer text-[0.78rem] font-semibold">{q}</summary>
            <p className="m-0 mt-1.5 text-[0.7rem] text-neutral-600">{a}</p>
          </details>
        );
      })}
      <p className="m-0 mt-2.5 text-[0.6rem] text-neutral-400">Emits FAQPage JSON-LD for rich search snippets.</p>
    </div>
  );
}

function ImageWithText({ v }: P) {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 sm:items-center">
      <div className={`aspect-[4/3] rounded-xl bg-[linear-gradient(135deg,#e0e7ff,#fbcfe8)] ${on(v, "flip") ? "sm:order-2" : ""}`} />
      <div>
        <p className="m-0 text-lg font-extrabold">{str(v, "heading") || "Heading"}</p>
        <p className="m-0 mt-2 text-xs leading-relaxed text-neutral-600">{str(v, "text")}</p>
        <button type="button" className="mt-3.5 rounded-full bg-neutral-900 px-5 py-2 text-xs font-bold text-white">Shop now</button>
      </div>
    </div>
  );
}

function FeatureIcons({ v }: P) {
  const accent = hex(v, "accent");
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="grid grid-cols-2 gap-4 p-4 text-center sm:grid-cols-4">
      {rows.map((r) => {
        const [t, c] = r.split("|").map((s) => s.trim());
        return (
          <div key={r}>
            <svg className="mx-auto size-6" style={{ color: accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <p className="m-0 mt-1.5 text-[0.72rem] font-bold">{t}</p>
            <p className="m-0 mt-0.5 text-[0.6rem] text-neutral-500">{c}</p>
          </div>
        );
      })}
    </div>
  );
}

function ProductScroller({ v }: P) {
  const items = [["Overshirt", "₹2,499"], ["Chinos", "₹1,799"], ["Sneakers", "₹2,199"], ["Cap", "₹499"], ["Tote", "₹899"]];
  return (
    <div className="p-4">
      <p className="m-0 mb-2.5 text-sm font-extrabold">{str(v, "heading") || "You may also like"}</p>
      <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {items.map(([t, pr], i) => (
          <div key={t} className="w-28 shrink-0">
            <div className="aspect-square rounded-xl" style={{ background: `linear-gradient(${135 + i * 50}deg,#e0e7ff,#fbcfe8,#bbf7d0)` }} />
            <p className="m-0 mt-1.5 text-[0.68rem] font-semibold">{t}</p>
            <p className="m-0 text-[0.62rem] text-neutral-500">{pr}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StorySlider({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 6);
  return (
    <div className="flex gap-4 overflow-x-auto p-4" style={{ scrollbarWidth: "none" }}>
      {rows.map((r) => {
        const label = r.split("|")[0]?.trim() ?? "";
        return (
          <div key={r} className="flex shrink-0 flex-col items-center gap-1.5">
            <span className="grid size-16 place-items-center rounded-full border-2 border-emerald-600 bg-neutral-100 text-xl font-extrabold">
              {label.slice(0, 1)}
            </span>
            <span className="text-[0.6rem] font-semibold">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function BulkOrder({ v }: P) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const variants = [["S", "₹899"], ["M", "₹899"], ["L", "₹949"], ["XL", "₹949"]];
  return (
    <div className="p-4">
      <p className="m-0 mb-2.5 text-sm font-extrabold">{str(v, "heading") || "Quick order"}</p>
      <table className="w-full border-collapse text-[0.7rem]">
        <thead><tr>{["Variant", "Price", "Qty"].map((h) => <th key={h} className="pb-1.5 text-left text-[0.58rem] uppercase tracking-wide text-neutral-400">{h}</th>)}</tr></thead>
        <tbody>
          {variants.map(([t = "", pr = ""]) => (
            <tr key={t} className="border-t border-neutral-100">
              <td className="py-1.5">{t}</td>
              <td className="py-1.5">{pr}</td>
              <td className="py-1.5">
                <input type="number" min="0" value={qty[t] ?? 0} onChange={(e) => setQty({ ...qty, [t]: Number(e.target.value) })} className="w-14 rounded border border-neutral-300 px-1.5 py-1" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="mt-3 rounded-xl bg-neutral-900 px-5 py-2.5 text-xs font-extrabold text-white">Add to cart</button>
    </div>
  );
}

function TimelineSection({ v }: P) {
  const accent = hex(v, "accent");
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="p-4">
      <p className="m-0 mb-3 text-sm font-extrabold">{str(v, "heading") || "How it works"}</p>
      <ol className="m-0 p-0">
        {rows.map((r, i) => {
          const [t, c] = r.split("|").map((s) => s.trim());
          return (
            <li key={r} className="relative flex gap-3 pb-5 last:pb-0">
              {i < rows.length - 1 && <span className="absolute left-3.5 top-7 bottom-0 w-0.5 bg-neutral-200" />}
              <span className="grid size-7 shrink-0 place-items-center rounded-full text-[0.65rem] font-extrabold text-white" style={{ background: accent }}>{i + 1}</span>
              <div>
                <p className="m-0 text-[0.75rem] font-bold">{t}</p>
                <p className="m-0 mt-0.5 text-[0.65rem] text-neutral-500">{c}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function RatingStrip({ v }: P) {
  return (
    <div className="flex items-center gap-2 p-4 text-[0.72rem]">
      <span className="tracking-widest text-amber-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
      <span className="font-extrabold">{str(v, "rating") || "0.0"}</span>
      <span className="text-neutral-500 underline">{str(v, "count")} reviews</span>
    </div>
  );
}

function BundleSave({ v }: P) {
  return (
    <div className="m-4 rounded-xl border border-dashed border-emerald-400 bg-emerald-50/50 p-4">
      <p className="m-0 mb-2 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-600">Bundle &amp; save</p>
      <div className="flex flex-wrap items-center gap-1.5 text-[0.72rem]">
        <span>This product</span>
        <span className="font-extrabold opacity-50">+</span>
        <span>Organic cotton tee</span>
        <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[0.6rem] font-extrabold text-white">{str(v, "save") || "Save"}</span>
      </div>
      <button type="button" className="mt-3 w-full rounded-xl bg-neutral-900 py-2.5 text-xs font-extrabold text-white">Add both - ₹3,298</button>
    </div>
  );
}

function NewsletterDiscount({ v }: P) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="p-5 text-center">
      <p className="m-0 text-lg font-extrabold">{str(v, "heading") || "Get 10% off"}</p>
      <p className="m-0 mx-auto mt-1.5 max-w-80 text-[0.7rem] text-neutral-500">{str(v, "offer")}</p>
      {done ? (
        <p className="m-0 mt-3.5 text-sm font-bold text-emerald-600">You&apos;re in - check your inbox</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mx-auto mt-3.5 flex max-w-80 gap-2">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="flex-1 rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm outline-none" />
          <button type="submit" className="rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-extrabold text-white">Subscribe</button>
        </form>
      )}
    </div>
  );
}

function VideoBanner({ v }: P) {
  return (
    <div className="p-4">
      <div className="relative aspect-[21/9] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#1e293b,#334155,#475569)]">
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-12 place-items-center rounded-full bg-white/20 text-xl text-white backdrop-blur">&#9654;</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
          <p className="m-0 text-xl font-extrabold">{str(v, "heading") || "Made to move with you"}</p>
          <p className="m-0 mt-1 text-[0.72rem] opacity-90">{str(v, "sub")}</p>
          <button type="button" className="mt-3 w-fit rounded-full bg-white px-5 py-2 text-xs font-bold text-neutral-900">Shop now</button>
        </div>
      </div>
    </div>
  );
}

function TestimonialWall({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 6);
  return (
    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
      {rows.map((r) => {
        const [q, n] = r.split("|").map((s) => s.trim());
        return (
          <figure key={r} className="m-0 rounded-xl border border-neutral-200 bg-neutral-50 p-3.5">
            <blockquote className="m-0 text-[0.72rem] leading-relaxed">&ldquo;{q}&rdquo;</blockquote>
            <figcaption className="mt-2 text-[0.6rem] font-bold">{n}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function CollapsibleDetails({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="p-4">
      {rows.map((r) => {
        const [t, c] = r.split("|").map((s) => s.trim());
        return (
          <details key={r} className="border-b border-neutral-200 last:border-0">
            <summary className="flex cursor-pointer justify-between py-3 text-[0.78rem] font-semibold">{t}<span className="text-neutral-400">+</span></summary>
            <p className="m-0 pb-3 text-[0.7rem] leading-relaxed text-neutral-600">{c}</p>
          </details>
        );
      })}
    </div>
  );
}

function UspUnderAtc({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 p-4">
      {rows.map((r) => (
        <span key={r} className="flex items-center gap-1 text-[0.65rem] text-neutral-600">
          <svg className="size-3 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          {r}
        </span>
      ))}
    </div>
  );
}

function VsCompetitor({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="p-4">
      <div className="grid grid-cols-[1.4fr_0.7fr_1fr] gap-2 py-1.5 text-[0.6rem] font-bold uppercase tracking-wide">
        <span /><span className="text-emerald-600">{str(v, "brand") || "Us"}</span><span className="text-neutral-400">Others</span>
      </div>
      {rows.map((r) => {
        const [us, them] = r.split("|").map((s) => s.trim());
        return (
          <div key={r} className="grid grid-cols-[1.4fr_0.7fr_1fr] items-center gap-2 border-t border-neutral-100 py-2 text-[0.7rem]">
            <span className="font-semibold">{us}</span>
            <span className="font-extrabold text-emerald-600">&#10003;</span>
            <span className="text-[0.65rem] text-neutral-400">{them}</span>
          </div>
        );
      })}
    </div>
  );
}

function GalleryGrid({ v }: P) {
  const cols = Number(str(v, "cols")) || 3;
  return (
    <div className="grid gap-2.5 p-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols * 2 }, (_, i) => (
        <div key={i} className="aspect-square rounded-xl" style={{ background: `linear-gradient(${135 + i * 45}deg,#e0e7ff,#fbcfe8,#bbf7d0)` }} />
      ))}
    </div>
  );
}

function CartNotes({ v }: P) {
  return (
    <div className="p-4">
      <label className="mb-1.5 block text-[0.72rem] font-semibold">{str(v, "label") || "Order instructions"}</label>
      <textarea rows={3} placeholder={str(v, "placeholder")} className="w-full resize-y rounded-lg border border-neutral-300 p-2.5 text-[0.75rem] outline-none" />
      <p className="m-0 mt-1 text-[0.6rem] text-neutral-400">Saves to order.note automatically</p>
    </div>
  );
}

function PillsNav({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 6);
  return (
    <div className="flex gap-2 overflow-x-auto p-4" style={{ scrollbarWidth: "none" }}>
      {rows.map((r, i) => {
        const label = r.split("|")[0]?.trim() ?? "";
        return (
          <span key={r} className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[0.68rem] font-semibold ${i === 0 ? "border-transparent bg-neutral-900 text-white" : "border-neutral-300"}`}>
            {label}
          </span>
        );
      })}
    </div>
  );
}

function CheckoutTrust({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 p-4">
      {rows.map((r) => (
        <span key={r} className="flex items-center gap-1 text-[0.62rem] text-neutral-500">
          <svg className="size-3 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          {r}
        </span>
      ))}
    </div>
  );
}

function WhatsappOrder({ v }: P) {
  return (
    <div className="p-4">
      <a className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] px-5 py-2.5 text-xs font-extrabold text-white" href="#">
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/></svg>
        {str(v, "label") || "Order on WhatsApp"}
      </a>
      <p className="m-0 mt-1.5 text-[0.6rem] text-neutral-400">Prefills a message with the product link</p>
    </div>
  );
}

function PersonalizationField({ v }: P) {
  return (
    <div className="p-4">
      <label className="mb-1.5 block text-[0.72rem] font-semibold">
        {str(v, "label") || "Personalization"}{on(v, "required") && <span className="text-red-500">*</span>}
      </label>
      <input type="text" maxLength={Number(str(v, "max")) || 30} placeholder="Type here" className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none" />
      <p className="m-0 mt-1 text-[0.6rem] text-neutral-400">Max {str(v, "max") || 30} characters - saves to order properties</p>
    </div>
  );
}

function VariantMatrix() {
  return (
    <div className="flex flex-wrap gap-1.5 p-4">
      {[["S", true], ["M", true], ["L", false], ["XL", true]].map(([t, ok]) => (
        <span key={String(t)} className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-[0.65rem] ${ok ? "border-neutral-300" : "border-neutral-200 opacity-45 line-through"}`}>
          {t}
          <i className={`not-italic font-extrabold ${ok ? "text-emerald-600" : "text-red-500"}`}>{ok ? "\u2713" : "\u2715"}</i>
        </span>
      ))}
    </div>
  );
}

function PricePerUnit({ v }: P) {
  return (
    <div className="p-4">
      <p className="m-0 text-lg font-extrabold">₹4,500</p>
      <p className="m-0 text-[0.65rem] text-neutral-500">₹450 / {str(v, "unit") || "100g"}</p>
    </div>
  );
}

function SubscribeSave({ v }: P) {
  const [sel, setSel] = useState<"onetime" | "sub">("onetime");
  return (
    <div className="grid gap-2 p-4">
      <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-neutral-300 p-3 text-[0.75rem]">
        <input type="radio" checked={sel === "onetime"} onChange={() => setSel("onetime")} className="accent-emerald-600" />
        <span>One-time purchase</span>
        <b className="ml-auto">₹4,500</b>
      </label>
      <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-emerald-400 bg-emerald-50/50 p-3 text-[0.75rem]">
        <input type="radio" checked={sel === "sub"} onChange={() => setSel("sub")} className="accent-emerald-600" />
        <span>Subscribe {str(v, "freq") || "monthly"} - save {str(v, "discount") || "10"}%</span>
        <b className="ml-auto">₹4,050</b>
      </label>
    </div>
  );
}

function CertificationBadges({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="flex flex-wrap gap-1.5 p-4">
      {rows.map((r) => (
        <span key={r} className="flex items-center gap-1 rounded-full border border-neutral-300 px-3 py-1.5 text-[0.62rem] font-bold text-neutral-600">
          <svg className="size-3 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1"/></svg>
          {r}
        </span>
      ))}
    </div>
  );
}

function LoyaltyPoints({ v }: P) {
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.7rem] text-neutral-600">
      <svg className="size-3.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.9 6.26 6.9.6-5.2 4.53 1.55 6.77L12 16.9l-6.15 3.26L7.4 13.4 2.2 8.86l6.9-.6z"/></svg>
      Earn <b>225 {str(v, "name") || "points"}</b> on this order
    </div>
  );
}

function CollectionHero({ v }: P) {
  return (
    <div className="p-4">
      <div className="relative aspect-[21/7] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#dbeafe,#fbcfe8)]">
        {on(v, "overlay") && <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />}
        <div className={`absolute inset-0 flex flex-col justify-end p-5 ${on(v, "overlay") ? "text-white" : "text-neutral-900"}`}>
          <p className="m-0 text-xl font-extrabold">New arrivals</p>
          <p className="m-0 mt-1 text-[0.7rem] opacity-90">The latest drops, all in one place</p>
          <p className="m-0 mt-1 text-[0.6rem] opacity-80">42 products</p>
        </div>
      </div>
    </div>
  );
}

function CategoryTiles({ v }: P) {
  const cols = Number(str(v, "cols")) || 4;
  const cats = ["New in", "Tees", "Bottoms", "Sale"];
  return (
    <div className="grid gap-2.5 p-4" style={{ gridTemplateColumns: `repeat(${Math.min(cols, 4)}, 1fr)` }}>
      {cats.slice(0, Math.min(cols, 4)).map((c, i) => (
        <div key={c} className="relative overflow-hidden rounded-xl">
          <div className="aspect-square" style={{ background: `linear-gradient(${135 + i * 50}deg,#e0e7ff,#fbcfe8,#bbf7d0)` }} />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-[0.62rem] font-bold">{c}</span>
        </div>
      ))}
    </div>
  );
}

function SocialShare({ v }: P) {
  return (
    <div className="flex items-center gap-3 p-4 text-[0.7rem]">
      <span className="font-semibold text-neutral-500">{str(v, "label") || "Share"}</span>
      {["WhatsApp", "X", "Pinterest"].map((s) => (
        <a key={s} href="#" className="font-bold text-emerald-600 hover:underline">{s}</a>
      ))}
    </div>
  );
}

function InstagramGrid({ v }: P) {
  const cols = Number(str(v, "cols")) || 6;
  return (
    <div className="p-4">
      <p className="m-0 mb-2.5 text-center text-[0.72rem] font-bold text-emerald-600">Follow {str(v, "handle") || "@yourstore"}</p>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(cols, 6)}, 1fr)` }}>
        {Array.from({ length: Math.min(cols, 6) }, (_, i) => (
          <div key={i} className="aspect-square rounded-lg" style={{ background: `linear-gradient(${135 + i * 40}deg,#e0e7ff,#fbcfe8,#bbf7d0)` }} />
        ))}
      </div>
    </div>
  );
}

function CustomLiquidSection() {
  return (
    <div className="grid place-items-center border-2 border-dashed border-neutral-200 p-8">
      <p className="m-0 text-xs text-neutral-400">Merchant&apos;s custom Liquid renders here</p>
    </div>
  );
}

function OpenNow({ v }: P) {
  const open = Number(str(v, "open")) || 10;
  const close = Number(str(v, "close")) || 21;
  const h = new Date().getHours();
  const isOpen = h >= open && h < close;
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.7rem] font-semibold">
      <span className={`size-2 rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
      {isOpen ? "Open now - replies within the hour" : "Closed - we reply next morning"}
    </div>
  );
}

function PriceDropAlert({ v }: P) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block p-4">
      <button type="button" onClick={() => setOpen(!open)} className="rounded-full border border-neutral-300 px-4 py-2 text-[0.68rem]">{str(v, "label") || "Notify me on price drop"}</button>
      {open && (
        <div className="absolute bottom-full left-4 mb-2 w-56 rounded-xl border border-neutral-200 bg-white p-3.5 shadow-lg">
          <p className="m-0 mb-2 text-[0.7rem] font-bold">Price drop alert</p>
          <div className="flex gap-1.5">
            <input type="email" placeholder="Your email" className="min-w-0 flex-1 rounded border border-neutral-300 px-2 py-1.5 text-[0.65rem] outline-none" />
            <button type="button" className="rounded bg-neutral-900 px-2.5 py-1.5 text-[0.6rem] font-bold text-white">Notify me</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ExitIntent({ v }: P) {
  const [show, setShow] = useState(true);
  if (!show) return <div className="p-4 text-center text-[0.65rem] text-neutral-400"><button type="button" className="underline" onClick={() => setShow(true)}>Show popup</button></div>;
  return (
    <div className="grid min-h-48 place-items-center bg-black/55 p-4" onClick={(e) => { if (e.target === e.currentTarget) setShow(false); }}>
      <div className="relative w-full max-w-56 rounded-2xl bg-white p-6 text-center">
        <button type="button" onClick={() => setShow(false)} className="absolute right-3 top-2.5 text-lg">&times;</button>
        <p className="m-0 text-base font-extrabold">{str(v, "heading") || "Before you go"}</p>
        <p className="m-0 mt-2 text-[0.7rem] text-neutral-500">{str(v, "text")}</p>
        <button type="button" className="mt-3.5 rounded-full bg-neutral-900 px-5 py-2 text-xs font-bold text-white">Back to cart</button>
      </div>
    </div>
  );
}

function FaqSearch({ v }: P) {
  const [q, setQ] = useState("");
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 6);
  const hits = rows.filter((r) => !q || r.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="p-4">
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search answers…" className="mb-3 w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-[0.78rem] outline-none" />
      {hits.map((r) => {
        const [qn, a] = r.split("|").map((s) => s.trim());
        return (
          <details key={r} className="border-b border-neutral-200 py-2.5 last:border-0">
            <summary className="cursor-pointer text-[0.78rem] font-semibold">{qn}</summary>
            <p className="m-0 mt-1.5 text-[0.7rem] text-neutral-600">{a}</p>
          </details>
        );
      })}
      {!hits.length && <p className="text-center text-[0.7rem] text-neutral-400">No matching questions</p>}
    </div>
  );
}

function ContactFormSection({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-72 p-4">
      <p className="m-0 mb-2.5 text-base font-extrabold">{str(v, "heading") || "Talk to us"}</p>
      {sent ? (
        <p className="m-0 text-[0.75rem] font-bold text-emerald-600">Thanks - we reply within a business day.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-2">
          <input required placeholder="Your name" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.75rem] outline-none" />
          <input required type="email" placeholder="Your email" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.75rem] outline-none" />
          <textarea required rows={3} placeholder="Your message" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.75rem] outline-none" />
          <button type="submit" className="w-fit rounded-lg bg-neutral-900 px-5 py-2 text-xs font-extrabold text-white">Send message</button>
        </form>
      )}
    </div>
  );
}

function TeamGrid({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {rows.map((r) => {
        const [n, role] = r.split("|").map((s) => s.trim());
        return (
          <div key={r} className="text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-neutral-100 text-xl font-extrabold">{n?.slice(0, 1)}</div>
            <p className="m-0 mt-2 text-[0.72rem] font-bold">{n}</p>
            <p className="m-0 text-[0.6rem] text-neutral-500">{role}</p>
          </div>
        );
      })}
    </div>
  );
}

function MapEmbed({ v }: P) {
  return (
    <div className="p-4">
      <p className="m-0 mb-2 text-sm font-extrabold">{str(v, "heading") || "Find us"}</p>
      <div className="grid aspect-video place-items-center rounded-xl bg-[linear-gradient(135deg,#dbeafe,#d1fae5)]">
        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[0.65rem] font-semibold shadow">{str(v, "query") || "Your address"}</span>
      </div>
    </div>
  );
}

function ComingSoon({ v }: P) {
  return (
    <div className="p-6 text-center">
      <p className="m-0 text-xl font-black">{str(v, "heading") || "Something big is coming"}</p>
      <div className="mt-4 flex justify-center gap-5">
        {["7", "14", "32"].map((n, i) => (
          <div key={i}>
            <b className="block text-3xl font-black tabular-nums">{n}</b>
            <small className="text-[0.58rem] uppercase tracking-wider text-neutral-400">{["days", "hours", "min"][i]}</small>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-5 flex max-w-60 gap-1.5">
        <input type="email" placeholder="Get notified at launch" className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-[0.72rem] outline-none" />
        <button type="button" className="rounded-lg bg-neutral-900 px-3.5 py-2 text-[0.65rem] font-bold text-white">Notify me</button>
      </div>
    </div>
  );
}

function InCartBadge({ v }: P) {
  return (
    <div className="p-4">
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-[0.65rem] font-bold text-emerald-700">
        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5"/></svg>
        {str(v, "label") || "In your cart"} - <a href="#" className="underline">view</a>
      </span>
    </div>
  );
}

function FeaturedProduct({ v }: P) {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 sm:items-center">
      <div className="aspect-square rounded-xl bg-[linear-gradient(135deg,#fef3c7,#fbcfe8)]" />
      <div>
        <p className="m-0 text-[0.6rem] font-bold uppercase tracking-widest text-emerald-600">Featured product</p>
        <p className="m-0 mt-1.5 text-lg font-extrabold">Linen overshirt</p>
        <p className="m-0 mt-1 text-base font-extrabold">₹2,499</p>
        <p className="m-0 mt-2 text-[0.72rem] leading-relaxed text-neutral-600">Garment-washed European linen, relaxed fit, mother-of-pearl buttons.</p>
        <button type="button" className="mt-3 rounded-full bg-neutral-900 px-5 py-2 text-xs font-bold text-white">{str(v, "cta") || "Shop this product"}</button>
      </div>
    </div>
  );
}

function SearchHero({ v }: P) {
  const chips = str(v, "chips").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="p-5 text-center">
      <p className="m-0 text-lg font-extrabold">{str(v, "heading") || "What are you looking for?"}</p>
      <div className="mx-auto mt-3.5 flex max-w-80 gap-1.5">
        <input type="search" placeholder="Search products…" className="flex-1 rounded-full border border-neutral-300 px-4 py-2.5 text-[0.78rem] outline-none" />
        <button type="button" className="grid size-10 place-items-center rounded-full bg-neutral-900 text-white">&#128269;</button>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {chips.map((c) => (
          <span key={c} className="rounded-full border border-neutral-300 px-3 py-1 text-[0.62rem]">{c}</span>
        ))}
      </div>
    </div>
  );
}

function MadeToOrder({ v }: P) {
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.7rem] text-neutral-600">
      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      {str(v, "text") || "Made to order"} - ships in {str(v, "days") || "5"} days
    </div>
  );
}

function FitNote({ v }: P) {
  const fit = str(v, "fit");
  const msg = fit === "small" ? "Runs small - consider sizing up" : fit === "large" ? "Runs large - consider sizing down" : "True to size - order your usual";
  return <div className="p-4 text-[0.7rem] text-neutral-600">{msg}</div>;
}

function WarrantyBadge({ v }: P) {
  return (
    <div className="m-4 flex items-center gap-2.5 rounded-lg border border-neutral-200 p-3">
      <svg className="size-5 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
      <div>
        <p className="m-0 text-[0.72rem] font-bold">{str(v, "term") || "1-year warranty"}</p>
        <p className="m-0 text-[0.6rem] text-neutral-500">{str(v, "detail")}</p>
      </div>
    </div>
  );
}

function CharityNote({ v }: P) {
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.7rem] text-neutral-600">
      <svg className="size-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 4 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z"/></svg>
      {str(v, "amount") || "₹50"} of every order goes to {str(v, "cause") || "a good cause"}
    </div>
  );
}

function MultiLocationStock({ v }: P) {
  const rows = str(v, "stores").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="grid gap-2 p-4">
      {rows.map((r) => {
        const [n, s] = r.split("|").map((x) => x.trim());
        const low = s?.includes("Low");
        return (
          <div key={r} className="flex items-center gap-2 text-[0.7rem]">
            <span className={`size-2 shrink-0 rounded-full ${low ? "bg-amber-500" : "bg-emerald-500"}`} />
            <span className="min-w-16 font-bold">{n}</span>
            <span className="text-neutral-500">{s}</span>
          </div>
        );
      })}
    </div>
  );
}

function VariantSwatches({ v }: P) {
  const [sel, setSel] = useState("Midnight");
  const sq = str(v, "shape") === "square";
  return (
    <div className="p-4">
      <p className="m-0 mb-2 text-[0.68rem] text-neutral-500">Colour: <b className="text-neutral-900">{sel}</b></p>
      <div className="flex gap-2">
        {([["#1e293b", "Midnight"], ["#15803d", "Forest"], ["#b91c1c", "Crimson"], ["#d4d4d4", "Cloud"]] as [string, string][]).map(([c, n]) => (
          <button key={n} type="button" onClick={() => setSel(n)} title={n} className={`size-6 border-2 p-0 ${sq ? "rounded-md" : "rounded-full"} ${sel === n ? "border-neutral-900 ring-2 ring-white ring-inset" : "border-neutral-300"}`} style={{ background: c }} />
        ))}
      </div>
    </div>
  );
}

function FrequentlyBought({ v }: P) {
  const [checked, setChecked] = useState<boolean[]>([true, true]);
  const extras: [string, number][] = [["Phone case", 79900], ["Charging cable", 49900]];
  const base = 249900;
  const total = base + extras.filter((_, i) => checked[i]).reduce((s, [, p]) => s + p, 0);
  return (
    <div className="m-4 rounded-xl border border-neutral-200 p-4">
      <p className="m-0 mb-2.5 text-[0.65rem] font-bold uppercase tracking-wider">{str(v, "heading") || "Frequently bought together"}</p>
      <label className="flex items-center gap-2.5 py-1.5 text-[0.72rem]">
        <input type="checkbox" checked disabled className="accent-emerald-600" />
        <span className="flex-1">This item: Smartphone</span>
        <b>₹2,499</b>
      </label>
      {extras.map(([n, p], i) => (
        <label key={n} className="flex items-center gap-2.5 py-1.5 text-[0.72rem]">
          <input type="checkbox" checked={checked[i]} onChange={() => setChecked(checked.map((c, j) => (j === i ? !c : c)))} className="accent-emerald-600" />
          <span className="flex-1">{n}</span>
          <b>₹{(p / 100).toFixed(0)}</b>
        </label>
      ))}
      <button type="button" className="mt-2.5 w-full rounded-xl bg-neutral-900 py-2.5 text-xs font-extrabold text-white">Add selected - ₹{(total / 100).toFixed(0)}</button>
    </div>
  );
}

function QuickView({ v }: P) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative p-4">
      <button type="button" onClick={() => setOpen(!open)} className="rounded-full border border-neutral-300 bg-white px-3.5 py-1.5 text-[0.62rem] font-bold">{str(v, "label") || "Quick view"}</button>
      {open && (
        <div className="absolute left-1/2 top-full z-10 w-44 -translate-x-1/2 rounded-xl border border-neutral-200 bg-white p-3 text-center shadow-lg">
          <button type="button" onClick={() => setOpen(false)} className="absolute right-2 top-1.5 text-sm">&times;</button>
          <div className="aspect-square rounded-lg bg-[linear-gradient(135deg,#e0e7ff,#fbcfe8)]" />
          <p className="m-0 mt-2 text-[0.7rem] font-bold">Linen overshirt</p>
          <p className="m-0 text-[0.65rem]">₹2,499</p>
          <a href="#" className="mt-1.5 inline-block text-[0.62rem] font-bold text-emerald-600">View full details &rarr;</a>
        </div>
      )}
    </div>
  );
}

function ImageRollover() {
  return (
    <div className="group relative w-48 p-4">
      <div className="aspect-[4/5] rounded-xl bg-[linear-gradient(135deg,#e0e7ff,#fbcfe8)] transition-opacity" />
      <div className="absolute inset-4 aspect-[4/5] rounded-xl bg-[linear-gradient(45deg,#bbf7d0,#dbeafe)] opacity-0 transition-opacity group-hover:opacity-100" />
      <p className="m-0 mt-2 text-[0.6rem] text-neutral-400">Hover to swap image</p>
    </div>
  );
}

function MegaMenuPanel({ v }: P) {
  const rows = str(v, "cols").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 3);
  return (
    <div className="m-4 grid gap-4 rounded-xl border border-neutral-200 bg-white p-5 sm:grid-cols-4">
      {rows.map((r) => {
        const [h, links] = r.split("|");
        return (
          <div key={r}>
            <p className="m-0 mb-2 text-[0.58rem] font-extrabold uppercase tracking-wider text-neutral-400">{h?.trim()}</p>
            {(links ?? "").split(",").map((l) => (
              <a key={l} href="#" className="block py-1 text-[0.7rem] hover:text-emerald-600">{l.trim()}</a>
            ))}
          </div>
        );
      })}
      <div className="flex flex-col justify-end gap-1 rounded-lg bg-emerald-50 p-3.5">
        <p className="m-0 text-[0.7rem] font-extrabold">Sale ends tonight</p>
        <a href="#" className="text-[0.6rem] font-bold text-emerald-600">Shop the sale &rarr;</a>
      </div>
    </div>
  );
}

function MobileBottomNav() {
  const items = [["Home", "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"], ["Search", "M21 21l-4.3-4.3M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"], ["Cart", "M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM2 2h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57L22 6H5"], ["Account", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"]];
  return (
    <div className="grid grid-cols-4 border-t border-neutral-200 bg-white">
      {items.map(([n, d]) => (
        <a key={n} href="#" className="flex flex-col items-center gap-0.5 py-2.5 text-[0.55rem] font-semibold">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
          {n}
        </a>
      ))}
    </div>
  );
}

function ProductFinderQuiz({ v }: P) {
  const [step, setStep] = useState(0);
  const qs = [
    { q: "What's your style?", opts: ["Minimal", "Bold", "Classic"] },
    { q: "Preferred fit?", opts: ["Slim", "Relaxed", "Oversized"] },
    { q: "Budget?", opts: ["Under ₹1k", "₹1-3k", "Premium"] },
  ];
  return (
    <div className="p-5 text-center">
      <p className="m-0 mb-3 text-sm font-extrabold">{str(v, "heading") || "Find your perfect fit"}</p>
      {step < qs.length ? (
        <div>
          <p className="m-0 mb-3 text-[0.82rem] font-semibold">{qs[step]?.q}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {(qs[step]?.opts ?? []).map((o) => (
              <button key={o} type="button" onClick={() => setStep(step + 1)} className="rounded-full border border-neutral-300 px-4 py-2 text-[0.72rem] hover:border-emerald-600">{o}</button>
            ))}
          </div>
          <p className="m-0 mt-2.5 text-[0.55rem] text-neutral-400">Step {step + 1} of {qs.length}</p>
        </div>
      ) : (
        <div>
          <p className="m-0 text-[0.82rem] font-semibold">Here&apos;s your match</p>
          <a href="#" className="mt-3 inline-block rounded-full bg-neutral-900 px-6 py-2.5 text-xs font-bold text-white">See the collection &rarr;</a>
          <button type="button" onClick={() => setStep(0)} className="mt-2 block text-[0.6rem] text-neutral-400 underline">Restart</button>
        </div>
      )}
    </div>
  );
}

function ImageAccordion({ v }: P) {
  const [active, setActive] = useState(0);
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="flex h-40 gap-1.5 p-4">
      {rows.map((r, i) => {
        const [t] = r.split("|");
        return (
          <button key={r} type="button" onClick={() => setActive(i)} className="relative flex-1 overflow-hidden rounded-xl text-left transition-all duration-300" style={{ flex: i === active ? 3 : 1, background: `linear-gradient(${135 + i * 60}deg,#e0e7ff,#fbcfe8,#bbf7d0)` }}>
            <span className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white ${i === active ? "" : "opacity-0"}`}>
              <p className="m-0 text-[0.72rem] font-extrabold">{t?.trim()}</p>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TabbedCollections({ v }: P) {
  const [tab, setTab] = useState(0);
  const rows = str(v, "tabs").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="p-4">
      <div className="mb-3 flex gap-2">
        {rows.map((r, i) => {
          const [t] = r.split("|");
          return (
            <button key={r} type="button" onClick={() => setTab(i)} className={`rounded-full border px-3.5 py-1.5 text-[0.68rem] font-semibold ${i === tab ? "border-transparent bg-neutral-900 text-white" : "border-neutral-300"}`}>{t?.trim()}</button>
          );
        })}
      </div>
      <div className="grid grid-cols-4 gap-2.5 max-sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="aspect-square rounded-xl" style={{ background: `linear-gradient(${135 + (i + tab * 2) * 40}deg,#e0e7ff,#fbcfe8,#bbf7d0)` }} />
            <p className="m-0 mt-1.5 text-[0.68rem] font-semibold">Product {i + 1}</p>
            <p className="m-0 text-[0.6rem] text-neutral-500">₹1,{499 + i * 300}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckoutProgress({ v }: P) {
  const cur = Number(str(v, "step")) || 1;
  return (
    <div className="flex gap-2 p-4">
      {["Cart", "Details", "Payment"].map((s, i) => (
        <span key={s} className={`flex items-center gap-1.5 text-[0.65rem] ${i + 1 === cur ? "font-bold" : "text-neutral-400"}`}>
          <span className={`grid size-5 place-items-center rounded-full border text-[0.58rem] font-bold ${i + 1 < cur ? "border-emerald-600 bg-emerald-600 text-white" : i + 1 === cur ? "border-neutral-900" : "border-neutral-300"}`}>{i + 1}</span>
          {s}
        </span>
      ))}
    </div>
  );
}

function WholesaleInquiry({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-72 p-4">
      <p className="m-0 mb-2.5 text-base font-extrabold">{str(v, "heading") || "Bulk order? Let's talk"}</p>
      {sent ? (
        <p className="m-0 text-[0.75rem] font-bold text-emerald-600">Thanks - our wholesale team will reach out.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-2">
          {["Your name", "Company / shop name", "Work email", "Approx. quantity"].map((p) => (
            <input key={p} required={!p.includes("quantity")} placeholder={p} className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.72rem] outline-none" />
          ))}
          <button type="submit" className="w-fit rounded-lg bg-neutral-900 px-4 py-2 text-xs font-extrabold text-white">Request wholesale pricing</button>
        </form>
      )}
    </div>
  );
}

function ReturnsRequest({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-72 p-4">
      <p className="m-0 mb-2.5 text-base font-extrabold">{str(v, "heading") || "Start a return"}</p>
      {sent ? (
        <p className="m-0 text-[0.75rem] font-bold text-emerald-600">Request received - we&apos;ll email the return label within a day.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-2">
          <input required placeholder="Order number (e.g. #1042)" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.72rem] outline-none" />
          <input required type="email" placeholder="Order email" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.72rem] outline-none" />
          <textarea required rows={2} placeholder="What went wrong?" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.72rem] outline-none" />
          <button type="submit" className="w-fit rounded-lg bg-neutral-900 px-4 py-2 text-xs font-extrabold text-white">Request return</button>
        </form>
      )}
      <p className="m-0 mt-2.5 text-[0.6rem] text-neutral-400">7-day returns, no questions asked</p>
    </div>
  );
}

function BundleBuilder({ v }: P) {
  const [sel, setSel] = useState<number[]>([]);
  const need = Number(str(v, "pick")) || 3;
  const items = [["Trail mix", 349], ["Granola", 449], ["Chips", 199], ["Bars", 249], ["Honey", 399], ["Tea", 299]];
  const total = sel.reduce((s, i) => s + (items[i]?.[1] as number ?? 0), 0);
  return (
    <div className="p-4">
      <p className="m-0 text-sm font-extrabold">{str(v, "heading") || "Build your bundle"}</p>
      <p className="m-0 mb-2.5 mt-0.5 text-[0.65rem] text-neutral-400">{sel.length < need ? `Pick ${need - sel.length} more` : "Bundle ready"}</p>
      <div className="grid grid-cols-3 gap-2">
        {items.map(([n, p], i) => (
          <button key={n} type="button" onClick={() => setSel(sel.includes(i) ? sel.filter((x) => x !== i) : sel.length < need ? [...sel, i] : sel)} className={`relative rounded-lg border-2 p-1.5 text-left ${sel.includes(i) ? "border-emerald-600" : "border-neutral-200"}`}>
            <div className="aspect-square rounded-md" style={{ background: `linear-gradient(${135 + i * 50}deg,#e0e7ff,#fbcfe8,#bbf7d0)` }} />
            <p className="m-0 mt-1 text-[0.58rem] font-semibold">{n}</p>
            <p className="m-0 text-[0.52rem] text-neutral-400">₹{p}</p>
            {sel.includes(i) && <span className="absolute right-2 top-2 grid size-4 place-items-center rounded-full bg-emerald-600 text-[0.55rem] text-white">&#10003;</span>}
          </button>
        ))}
      </div>
      <button type="button" disabled={sel.length !== need} className="mt-2.5 w-full rounded-lg bg-neutral-900 py-2 text-[0.65rem] font-extrabold text-white disabled:opacity-40">Add bundle - ₹{total}</button>
    </div>
  );
}

function QuantitySelector() {
  const [n, setN] = useState(1);
  return (
    <div className="p-4">
      <div className="inline-flex items-stretch overflow-hidden rounded-lg border border-neutral-300">
        <button type="button" onClick={() => setN(Math.max(1, n - 1))} className="w-9 bg-neutral-100 text-sm">&minus;</button>
        <input type="number" readOnly value={n} className="w-10 border-0 text-center text-sm outline-none" />
        <button type="button" onClick={() => setN(n + 1)} className="w-9 bg-neutral-100 text-sm">+</button>
      </div>
    </div>
  );
}

function SizeChartTable({ v }: P) {
  const rows = str(v, "rows").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="p-4">
      <table className="w-full border-collapse text-[0.7rem]">
        <thead><tr>{["Size", "Chest (in)", "Length (in)"].map((h) => <th key={h} className="pb-1.5 text-left text-[0.55rem] uppercase tracking-wider text-neutral-400">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r) => {
            const parts = r.split("|").map((s) => s.trim());
            return <tr key={r} className="border-t border-neutral-100">{parts.map((p, i) => <td key={i} className="py-1.5">{p}</td>)}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

function DeliveryDatePicker({ v }: P) {
  const [d, setD] = useState("");
  return (
    <div className="p-4">
      <label className="mb-1.5 block text-[0.68rem] font-semibold">{str(v, "label") || "Preferred delivery date"}</label>
      <input type="date" value={d} onChange={(e) => setD(e.target.value)} className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.75rem] outline-none" />
      <p className="m-0 mt-1 text-[0.55rem] text-neutral-400">Saves to order attributes</p>
    </div>
  );
}

function GiftMessageCart() {
  const [on, setOn] = useState(false);
  return (
    <div className="p-4">
      <label className="flex items-center gap-2 text-[0.72rem] font-semibold">
        <input type="checkbox" checked={on} onChange={() => setOn(!on)} className="accent-emerald-600" />
        This order is a gift
      </label>
      {on && <textarea rows={2} placeholder="Write your gift message…" className="mt-2 w-full resize-y rounded-lg border border-neutral-300 p-2.5 text-[0.7rem] outline-none" />}
    </div>
  );
}

function TermsCheckbox({ v }: P) {
  const [ok, setOk] = useState(false);
  return (
    <div className="p-4">
      <label className="flex items-center gap-2 text-[0.7rem]">
        <input type="checkbox" checked={ok} onChange={() => setOk(!ok)} className="accent-neutral-900" />
        {str(v, "text") || "I agree to the terms"}
      </label>
      <button type="button" disabled={!ok} className="mt-2.5 rounded-lg bg-neutral-900 px-5 py-2 text-xs font-bold text-white disabled:opacity-35">Checkout</button>
    </div>
  );
}

function SoldCount({ v }: P) {
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.7rem] text-neutral-600">
      <svg className="size-3.5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 2 2.9 6.26 6.9.6-5.2 4.53 1.55 6.77L12 16.9l-6.15 3.26L7.4 13.4 2.2 8.86l6.9-.6z"/></svg>
      <b className="font-extrabold">{str(v, "count")}</b> {str(v, "label") || "sold"}
    </div>
  );
}

function ProductCompareTable({ v }: P) {
  const rows = str(v, "rows").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="p-4">
      <table className="w-full border-collapse text-[0.7rem]">
        <thead><tr><th className="py-1.5 text-left" /><th className="py-1.5 text-left font-extrabold">{str(v, "p1")}</th><th className="py-1.5 text-left font-extrabold">{str(v, "p2")}</th></tr></thead>
        <tbody>
          {rows.map((r) => {
            const parts = r.split("|").map((s) => s.trim());
            return (
              <tr key={r} className="border-t border-neutral-100">
                <td className="py-1.5 font-bold">{parts[0]}</td>
                <td className="py-1.5">{parts[1]}</td>
                <td className="py-1.5">{parts[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LoadMore({ v }: P) {
  const [done, setDone] = useState(false);
  return (
    <div className="p-4 text-center">
      <div className="mb-3 grid grid-cols-4 gap-2">
        {Array.from({ length: done ? 8 : 4 }, (_, i) => (
          <div key={i} className="aspect-square rounded-lg" style={{ background: `linear-gradient(${135 + i * 40}deg,#e0e7ff,#fbcfe8)` }} />
        ))}
      </div>
      {!done && <button type="button" onClick={() => setDone(true)} className="rounded-full border border-neutral-300 px-6 py-2 text-[0.7rem] font-bold">{str(v, "label") || "Load more"}</button>}
    </div>
  );
}

function EmptyCart({ v }: P) {
  return (
    <div className="p-4 text-center">
      <p className="m-0 mb-3 text-sm font-extrabold">{str(v, "heading") || "Your cart is empty - try these"}</p>
      <div className="grid grid-cols-4 gap-2.5 text-left max-sm:grid-cols-2">
        {["Overshirt", "Chinos", "Cap", "Tote"].map((t, i) => (
          <div key={t}>
            <div className="aspect-square rounded-lg" style={{ background: `linear-gradient(${135 + i * 50}deg,#e0e7ff,#fbcfe8)` }} />
            <p className="m-0 mt-1.5 text-[0.65rem] font-semibold">{t}</p>
            <p className="m-0 text-[0.58rem] text-neutral-400">₹{1499 + i * 300}</p>
          </div>
        ))}
      </div>
      <a href="#" className="mt-3.5 inline-block text-[0.7rem] font-bold text-emerald-600">Browse everything &rarr;</a>
    </div>
  );
}

function NotFoundSearch({ v }: P) {
  const links = str(v, "links").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="p-5 text-center">
      <p className="m-0 text-lg font-extrabold">{str(v, "heading") || "Page not found"}</p>
      <div className="mx-auto mt-3.5 flex max-w-56 gap-1.5">
        <input type="search" placeholder="Search the store…" className="min-w-0 flex-1 rounded-full border border-neutral-300 px-3.5 py-2 text-[0.72rem] outline-none" />
        <button type="button" className="rounded-full bg-neutral-900 px-3.5 py-2 text-[0.65rem] font-bold text-white">Search</button>
      </div>
      <div className="mt-3.5 flex flex-wrap justify-center gap-3.5">
        {links.map((r) => {
          const [l] = r.split("|");
          return <a key={r} href="#" className="text-[0.65rem] font-semibold text-emerald-600">{l?.trim()}</a>;
        })}
      </div>
    </div>
  );
}

function ArticleToc() {
  return (
    <div className="p-4">
      <p className="m-0 mb-2 text-[0.6rem] text-neutral-400">4 min read</p>
      <div className="rounded-lg border border-neutral-200 p-3">
        <p className="m-0 text-[0.68rem] font-bold">On this page</p>
        <ul className="m-0 mt-2 list-none p-0 text-[0.7rem]">
          {["Why linen", "How it's made", "Care guide", "Our guarantee"].map((h) => (
            <li key={h} className="py-0.5"><a href="#" className="text-emerald-600 hover:underline">{h}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReferralCard({ v }: P) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="m-4 rounded-xl border border-dashed border-emerald-400 bg-emerald-50/50 p-4">
      <p className="m-0 text-sm font-extrabold">{str(v, "heading") || "Refer & earn"}</p>
      <p className="m-0 mt-1 text-[0.68rem] text-neutral-600">{str(v, "offer")}</p>
      <button type="button" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="mt-2.5 rounded-full bg-neutral-900 px-4 py-1.5 text-[0.65rem] font-bold text-white">{copied ? "Copied!" : "Copy your link"}</button>
    </div>
  );
}

function DonationCheckbox({ v }: P) {
  const [on, setOn] = useState(false);
  return (
    <div className="m-4 rounded-lg border border-dashed border-emerald-400 p-3">
      <label className="flex items-center gap-2 text-[0.7rem]">
        <input type="checkbox" checked={on} onChange={() => setOn(!on)} className="accent-emerald-600" />
        Add {str(v, "amount") || "₹10"} to {str(v, "cause") || "a good cause"}
      </label>
      {on && <p className="m-0 mt-1.5 text-[0.6rem] text-emerald-600">Donation added to cart</p>}
    </div>
  );
}

function A11yToolbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative p-4">
      <button type="button" onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-full border border-neutral-300 bg-white text-sm font-extrabold shadow">Aa</button>
      {open && (
        <div className="absolute bottom-full left-4 mb-1.5 grid w-28 gap-1 rounded-lg border border-neutral-200 bg-white p-2 shadow-lg">
          <button type="button" className="rounded border border-neutral-200 py-1 text-[0.6rem]">A+</button>
          <button type="button" className="rounded border border-neutral-200 py-1 text-[0.6rem]">A-</button>
          <button type="button" className="rounded border border-neutral-200 py-1 text-[0.6rem]">High contrast</button>
        </div>
      )}
    </div>
  );
}

function PreorderButton({ v }: P) {
  return (
    <div className="p-4">
      <button type="button" className="w-full rounded-xl bg-neutral-900 py-2.5 text-xs font-extrabold text-white">{str(v, "label") || "Pre-order"} - ships {str(v, "date") || "soon"}</button>
      <p className="m-0 mt-1.5 text-[0.6rem] text-neutral-400">Pay now, ships on {str(v, "date")}. Cancel anytime before dispatch.</p>
    </div>
  );
}

function PredictiveSearch({ v }: P) {
  const [q, setQ] = useState("");
  const items: [string, string][] = [["Linen overshirt", "#e0e7ff"], ["Cotton chinos", "#fbcfe8"], ["Canvas tote", "#bbf7d0"], ["Linen shirt", "#fde68a"], ["Denim jacket", "#e0e7ff"]];
  const hits = items.filter(([n]) => !q || n.toLowerCase().includes(q.toLowerCase())).slice(0, Number(str(v, "limit")) || 5);
  return (
    <div className="relative p-4">
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={str(v, "placeholder") || "Search…"} className="w-full rounded-full border border-neutral-300 px-4 py-2.5 text-[0.78rem] outline-none" />
      {q.length >= 2 && (
        <div className="absolute inset-x-4 top-full z-10 mt-1 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
          {hits.map(([n = "", c]) => (
            <a key={n} href="#" className="flex items-center gap-2.5 px-3 py-2 text-[0.72rem] hover:bg-neutral-50">
              <span className="size-8 rounded-md" style={{ background: c }} />
              {n}
            </a>
          ))}
          {!hits.length && <p className="p-3 text-center text-[0.65rem] text-neutral-400">No matches</p>}
        </div>
      )}
    </div>
  );
}

function ReviewSubmitForm({ v }: P) {
  const [stars, setStars] = useState(0);
  const [sent, setSent] = useState(false);
  return (
    <div className="m-4 rounded-xl border border-neutral-200 p-4">
      <p className="m-0 mb-2 text-[0.78rem] font-extrabold">{str(v, "heading") || "Share your experience"}</p>
      <div className="mb-2.5 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => setStars(n)} className={`p-0 text-xl ${n <= stars ? "text-amber-500" : "text-neutral-300"}`}>&#9733;</button>
        ))}
      </div>
      {sent ? (
        <p className="m-0 text-[0.72rem] font-bold text-emerald-600">Thanks - review received</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-2">
          <input required placeholder="Your name" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.7rem] outline-none" />
          <textarea required rows={2} placeholder="What did you think?" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.7rem] outline-none" />
          <button type="submit" className="w-fit rounded-lg bg-neutral-900 px-4 py-1.5 text-[0.65rem] font-bold text-white">Submit review</button>
        </form>
      )}
    </div>
  );
}

function AskQuestion({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="m-4 rounded-lg border border-neutral-200 p-3.5">
      <p className="m-0 mb-2 text-[0.7rem] font-bold">{str(v, "heading") || "Have a question?"}</p>
      {sent ? (
        <p className="m-0 text-[0.68rem] font-bold text-emerald-600">Question sent - we&apos;ll email the answer</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-1.5">
          <input required type="email" placeholder="Your email" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.68rem] outline-none" />
          <input required placeholder="Ask about this product" className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.68rem] outline-none" />
          <button type="submit" className="w-fit rounded-lg bg-neutral-900 px-3.5 py-1.5 text-[0.62rem] font-bold text-white">Ask</button>
        </form>
      )}
    </div>
  );
}

function ModelInfo({ v }: P) {
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.68rem] text-neutral-600">
      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      {str(v, "text") || "Model info"}
    </div>
  );
}

function SimilarProducts({ v }: P) {
  return (
    <div className="p-4">
      <p className="m-0 mb-2.5 text-[0.72rem] font-extrabold">{str(v, "heading") || "Similar styles"}</p>
      <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
        {["Alt 1", "Alt 2", "Alt 3", "Alt 4"].map((t, i) => (
          <div key={t}>
            <div className="aspect-square rounded-lg" style={{ background: `linear-gradient(${135 + i * 50}deg,#e0e7ff,#fbcfe8)` }} />
            <p className="m-0 mt-1 text-[0.62rem] font-semibold">{t}</p>
            <p className="m-0 text-[0.55rem] text-neutral-400">₹{1499 + i * 200}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrepaidDiscount({ v }: P) {
  return (
    <div className="m-4 flex items-start gap-2.5 rounded-lg bg-emerald-50 p-3">
      <svg className="mt-0.5 size-4 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      <div>
        <p className="m-0 text-[0.7rem] font-bold">Pay online - save {str(v, "pct") || "5"}% extra</p>
        <p className="m-0 mt-0.5 text-[0.6rem] text-neutral-500">{str(v, "codfee")}</p>
      </div>
    </div>
  );
}

function CompatibilityChecker({ v }: P) {
  const [sel, setSel] = useState("");
  const opts = str(v, "options").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 6);
  return (
    <div className="p-4">
      <label className="mb-1.5 block text-[0.68rem] font-semibold">{str(v, "label") || "Check compatibility"}</label>
      <select value={sel} onChange={(e) => setSel(e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-[0.72rem] outline-none">
        <option value="">Select model…</option>
        {opts.map((o) => <option key={o}>{o}</option>)}
      </select>
      {sel && <p className="m-0 mt-1.5 text-[0.65rem] font-bold text-emerald-600">Fits {sel} - you&apos;re good to go</p>}
    </div>
  );
}

function FileUpload({ v }: P) {
  const [file, setFile] = useState("");
  return (
    <div className="p-4">
      <label className="mb-1.5 block text-[0.68rem] font-semibold">{str(v, "label") || "Upload your file"}</label>
      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-neutral-300 p-3 text-[0.68rem] text-neutral-500">
        <span className="rounded-md border border-neutral-300 px-2.5 py-1 font-semibold">Choose file</span>
        {file || "No file chosen"}
        <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")} />
      </label>
      <p className="m-0 mt-1 text-[0.55rem] text-neutral-400">JPG/PNG, max 20MB - prints exactly as uploaded</p>
    </div>
  );
}

function NutritionFacts({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 6);
  return (
    <div className="m-4 rounded border-2 border-neutral-900 p-3 text-[0.7rem]">
      <p className="m-0 border-b-4 border-neutral-900 pb-1 text-base font-black">Nutrition Facts</p>
      <p className="m-0 border-b-2 border-neutral-900 py-1 text-[0.6rem]">Serving size: {str(v, "serving")}</p>
      {rows.map((r) => {
        const [n, val, dv] = r.split("|").map((s) => s.trim());
        return (
          <div key={r} className="flex gap-2 border-b border-neutral-200 py-1">
            <b className="flex-1">{n}</b>
            <span>{val}</span>
            {dv && <span className="font-bold">{dv}%</span>}
          </div>
        );
      })}
    </div>
  );
}

function RestockDate({ v }: P) {
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.7rem] text-neutral-600">
      <svg className="size-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
      Restocking <b>{str(v, "date") || "soon"}</b> - join the waitlist
    </div>
  );
}

function PriceMatch({ v }: P) {
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.7rem] text-neutral-600">
      <svg className="size-3.5 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
      {str(v, "text") || "Found it cheaper? We'll match it"}
    </div>
  );
}

function LoyaltyTiers({ v }: P) {
  const cur = Number(str(v, "current")) || 0;
  const needed = Number(str(v, "needed")) || 1;
  return (
    <div className="p-4">
      <p className="m-0 mb-2 text-[0.7rem]">You&apos;re <b>₹{needed - cur}</b> away from <b>{str(v, "next") || "Gold"}</b></p>
      <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full rounded-full bg-amber-500" style={{ width: `${Math.min(100, (cur / needed) * 100)}%` }} />
      </div>
      <div className="mt-1 flex justify-between text-[0.55rem] text-neutral-400">
        <span>Bronze</span><span>Silver</span><span>{str(v, "next") || "Gold"}</span>
      </div>
    </div>
  );
}

function CollectionFilters({ v }: P) {
  const [active, setActive] = useState("");
  const tags = str(v, "tags").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 6);
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {tags.map((t) => (
        <button key={t} type="button" onClick={() => setActive(t === active ? "" : t)} className={`rounded-full border px-3 py-1.5 text-[0.65rem] font-semibold ${active === t ? "border-transparent bg-neutral-900 text-white" : "border-neutral-300"}`}>{t}</button>
      ))}
    </div>
  );
}

function ReorderButton({ v }: P) {
  const [done, setDone] = useState(false);
  return (
    <div className="p-4">
      <button type="button" onClick={() => setDone(true)} className="rounded-full border border-neutral-900 px-4 py-1.5 text-[0.68rem] font-bold hover:bg-neutral-900 hover:text-white">
        {done ? "Added to cart" : str(v, "label") || "Buy again"}
      </button>
    </div>
  );
}

function WarrantyRegistration({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-72 p-4">
      <p className="m-0 text-base font-extrabold">{str(v, "heading") || "Activate warranty"}</p>
      <p className="m-0 mb-2.5 mt-1 text-[0.62rem] text-neutral-500">Register within 30 days of delivery for full {str(v, "term")} coverage.</p>
      {sent ? (
        <p className="m-0 text-[0.72rem] font-bold text-emerald-600">Registered - keep this confirmation</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-2">
          {["Order number", "Serial / product code", "Email"].map((p) => (
            <input key={p} required placeholder={p} className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.7rem] outline-none" />
          ))}
          <button type="submit" className="w-fit rounded-lg bg-neutral-900 px-4 py-2 text-xs font-extrabold text-white">Register warranty</button>
        </form>
      )}
    </div>
  );
}

function CallOrderButton({ v }: P) {
  return (
    <div className="p-4">
      <a href="#" className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-[0.68rem] font-bold hover:border-emerald-600 hover:text-emerald-600">
        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        {str(v, "label") || "Call to order"} - {str(v, "phone")}
      </a>
    </div>
  );
}

function DiscountProgress({ v }: P) {
  const [cur] = useState(3200);
  const threshold = Number(str(v, "threshold")) || 5000;
  const pct = Math.min(100, (cur / threshold) * 100);
  return (
    <div className="m-4 rounded-lg border border-dashed border-emerald-400 p-3.5">
      <p className="m-0 mb-2 text-[0.7rem] font-semibold">{cur >= threshold ? "Unlocked!" : `Add ₹${threshold - cur} more`}</p>
      <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="m-0 mt-2 text-[0.6rem] text-neutral-500">Unlock <b>{str(v, "reward") || "a discount"}</b> at ₹{threshold}</p>
    </div>
  );
}

function VipSignup({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="rounded-xl bg-emerald-50/50 p-6 text-center">
      <p className="m-0 text-base font-extrabold">{str(v, "heading") || "Get first access"}</p>
      <p className="m-0 mx-auto mt-1.5 max-w-64 text-[0.68rem] text-neutral-500">{str(v, "text")}</p>
      {sent ? (
        <p className="m-0 mt-3.5 text-[0.72rem] font-bold text-emerald-600">You&apos;re on the list</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mx-auto mt-3.5 flex max-w-56 gap-1.5">
          <input required type="email" placeholder="Your email" className="min-w-0 flex-1 rounded-full border border-neutral-300 px-3.5 py-2 text-[0.7rem] outline-none" />
          <button type="submit" className="rounded-full bg-neutral-900 px-3.5 py-2 text-[0.65rem] font-bold text-white">Join</button>
        </form>
      )}
    </div>
  );
}

function EventBanner({ v }: P) {
  return (
    <div className="m-4 flex items-center gap-2.5 rounded-full bg-red-600 px-4 py-2.5 text-white">
      <span className="size-2 animate-pulse rounded-full bg-white" />
      <span className="flex-1 text-[0.65rem] font-semibold">{str(v, "text") || "Live event"}</span>
      <span className="text-[0.62rem] font-extrabold">{str(v, "cta") || "Join"} &rarr;</span>
    </div>
  );
}

function MadeInBadge({ v }: P) {
  return (
    <div className="p-4">
      <span className="rounded-full border border-neutral-300 px-3 py-1 text-[0.62rem] font-bold">{str(v, "flag")} {str(v, "text") || "Made in India"}</span>
    </div>
  );
}

function CareIcons({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 p-4">
      {rows.map((r) => (
        <span key={r} className="flex items-center gap-1 text-[0.62rem] text-neutral-600">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
          {r}
        </span>
      ))}
    </div>
  );
}

function DownloadManual({ v }: P) {
  return (
    <div className="p-4">
      <a href="#" className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-[0.68rem] font-bold hover:border-emerald-600 hover:text-emerald-600">
        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        {str(v, "label") || "Download"}
      </a>
    </div>
  );
}

function RequestQuote({ v }: P) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block p-4">
      <button type="button" onClick={() => setOpen(!open)} className="rounded-full border border-neutral-900 px-4 py-2 text-[0.68rem] font-bold">{str(v, "label") || "Request a quote"}</button>
      {open && (
        <div className="absolute left-4 top-full z-10 mt-1 w-52 rounded-xl border border-neutral-200 bg-white p-3.5 shadow-lg">
          <p className="m-0 mb-2 text-[0.7rem] font-extrabold">Get bulk pricing</p>
          <div className="grid gap-1.5">
            <input placeholder="Name" className="rounded border border-neutral-300 px-2.5 py-1.5 text-[0.62rem] outline-none" />
            <input type="email" placeholder="Email" className="rounded border border-neutral-300 px-2.5 py-1.5 text-[0.62rem] outline-none" />
            <input placeholder="Product + qty" className="rounded border border-neutral-300 px-2.5 py-1.5 text-[0.62rem] outline-none" />
            <button type="button" className="rounded bg-neutral-900 py-1.5 text-[0.6rem] font-bold text-white">Send request</button>
          </div>
        </div>
      )}
    </div>
  );
}

function UgcSubmit({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="m-4 rounded-lg border border-dashed border-neutral-300 p-3.5">
      <p className="m-0 text-[0.75rem] font-extrabold">{str(v, "heading") || "Show us your style"}</p>
      <p className="m-0 mt-0.5 text-[0.6rem] text-neutral-500">Tag {str(v, "handle") || "@us"} on Instagram or send a pic</p>
      {sent ? (
        <p className="m-0 mt-2 text-[0.65rem] font-bold text-emerald-600">Shared - we&apos;ll credit you if featured</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-2 grid gap-1.5">
          <input placeholder="Link to your post or photo" className="rounded border border-neutral-300 px-2.5 py-1.5 text-[0.62rem] outline-none" />
          <input required type="email" placeholder="Email (to credit you)" className="rounded border border-neutral-300 px-2.5 py-1.5 text-[0.62rem] outline-none" />
          <button type="submit" className="w-fit rounded bg-neutral-900 px-3 py-1.5 text-[0.6rem] font-bold text-white">Share</button>
        </form>
      )}
    </div>
  );
}

function VideoPlayerSection({ v }: P) {
  return (
    <div className="p-4">
      <p className="m-0 mb-2 text-sm font-extrabold">{str(v, "heading") || "See it in action"}</p>
      <div className="grid aspect-video place-items-center rounded-xl bg-black">
        <span className="grid size-12 place-items-center rounded-full bg-white/20 text-xl text-white">&#9654;</span>
      </div>
    </div>
  );
}

function AmbassadorSignup({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-72 p-4">
      <p className="m-0 text-base font-extrabold">{str(v, "heading") || "Join the ambassador crew"}</p>
      <p className="m-0 mt-1 text-[0.62rem] text-neutral-500">{str(v, "text")}</p>
      {sent ? (
        <p className="m-0 mt-2 text-[0.7rem] font-bold text-emerald-600">Applied - we&apos;ll reach out</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-2.5 grid gap-2">
          {["Name", "Instagram handle", "Email"].map((p) => (
            <input key={p} required placeholder={p} className="rounded-lg border border-neutral-300 px-3 py-2 text-[0.68rem] outline-none" />
          ))}
          <button type="submit" className="w-fit rounded-lg bg-neutral-900 px-4 py-2 text-xs font-extrabold text-white">Apply</button>
        </form>
      )}
    </div>
  );
}

function CollectionNotify({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="m-4 rounded-lg bg-emerald-50/60 p-3.5">
      <p className="m-0 text-[0.72rem] font-semibold">Get notified when <b>{str(v, "label") || "the drop"}</b> goes live</p>
      {sent ? (
        <p className="m-0 mt-2 text-[0.65rem] font-bold text-emerald-600">You&apos;ll be first to know</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-2 flex gap-1.5">
          <input required type="email" placeholder="Your email" className="min-w-0 flex-1 rounded-full border border-neutral-300 px-3 py-1.5 text-[0.65rem] outline-none" />
          <button type="submit" className="rounded-full bg-neutral-900 px-3 py-1.5 text-[0.6rem] font-bold text-white">Notify me</button>
        </form>
      )}
    </div>
  );
}

function BirthdayCapture({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="m-4 rounded-lg border border-dashed border-amber-400 p-3.5">
      <p className="m-0 text-[0.75rem] font-extrabold">{str(v, "heading") || "Birthday perks"}</p>
      <p className="m-0 mt-0.5 text-[0.6rem] text-neutral-500">{str(v, "reward")}</p>
      {sent ? (
        <p className="m-0 mt-2 text-[0.65rem] font-bold text-emerald-600">Saved - gift incoming on your day</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-2 grid gap-1.5">
          <input required type="date" className="rounded border border-neutral-300 px-2.5 py-1.5 text-[0.65rem] outline-none" />
          <input required type="email" placeholder="Your email" className="rounded border border-neutral-300 px-2.5 py-1.5 text-[0.65rem] outline-none" />
          <button type="submit" className="w-fit rounded bg-neutral-900 px-3 py-1.5 text-[0.6rem] font-bold text-white">Save my birthday</button>
        </form>
      )}
    </div>
  );
}

function PhoneBar({ v }: P) {
  return (
    <div className="flex items-center justify-center gap-5 border-b border-neutral-200 px-4 py-2 text-[0.65rem] max-sm:flex-col max-sm:gap-1">
      <a href="#" className="flex items-center gap-1.5 font-bold">
        <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        {str(v, "phone")}
        <span className="font-normal text-neutral-400">{str(v, "hours")}</span>
      </a>
      {str(v, "wa") && (
        <a href="#" className="flex items-center gap-1 font-bold text-emerald-600">
          <svg className="size-3" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.8 9.8 0 0 1-1.51-5.22c0-5.41 4.4-9.81 9.82-9.81a9.76 9.76 0 0 1 6.93 2.87 9.74 9.74 0 0 1 2.87 6.94c0 5.41-4.4 9.82-9.81 9.82M20.44 3.55A11.76 11.76 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.32-1.65a11.9 11.9 0 0 0 5.66 1.44h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.5-8.41"/></svg>
          WhatsApp
        </a>
      )}
    </div>
  );
}

function SoldOutOverlay({ v }: P) {
  return (
    <div className="relative w-40 p-4">
      <div className="aspect-[4/5] rounded-xl bg-[linear-gradient(135deg,#e0e7ff,#fbcfe8)] opacity-60" />
      <span className="absolute left-6 top-6 rounded bg-neutral-900/90 px-2.5 py-1 text-[0.55rem] font-extrabold tracking-wider text-white">{str(v, "label") || "SOLD OUT"}</span>
    </div>
  );
}

function NotifyWhatsapp({ v }: P) {
  return (
    <div className="p-4">
      <a href="#" className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-xs font-bold text-white">
        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35"/></svg>
        {str(v, "label") || "Notify me"}
      </a>
    </div>
  );
}

function MobileMenuDrawer({ v }: P) {
  const [open, setOpen] = useState(false);
  const rows = str(v, "links").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 6);
  return (
    <div className="relative p-4">
      <button type="button" onClick={() => setOpen(true)} className="p-1.5" aria-label="Menu">
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
      {open && (
        <>
          <div className="absolute inset-0 z-10 bg-black/40" onClick={() => setOpen(false)} />
          <nav className="absolute bottom-0 left-0 top-0 z-20 w-52 overflow-y-auto bg-white p-4 shadow-xl">
            <button type="button" onClick={() => setOpen(false)} className="text-xl">&times;</button>
            {rows.map((r) => {
              const [l] = r.split("|");
              return <a key={r} href="#" onClick={(e) => e.preventDefault()} className="block border-b border-neutral-100 py-2.5 text-[0.78rem] font-semibold">{l?.trim()}</a>;
            })}
            <div className="mt-4 border-t border-neutral-100 pt-3">
              <p className="m-0 text-[0.6rem] text-neutral-400">Need help?</p>
              <a href="#" className="text-[0.78rem] font-bold text-emerald-600">{str(v, "phone")}</a>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}

function StickyCategoryNav({ v }: P) {
  const [active, setActive] = useState(0);
  const cats = str(v, "cats").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 7);
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-neutral-200 bg-white px-4 py-2.5 [scrollbar-width:none]">
      {cats.map((c, i) => (
        <button key={c} type="button" onClick={() => setActive(i)} className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[0.62rem] font-semibold ${i === active ? "border-transparent bg-neutral-900 text-white" : "border-neutral-300"}`}>{c}</button>
      ))}
    </div>
  );
}

function CallbackRequest({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="m-4 rounded-lg border border-neutral-200 p-3.5">
      <p className="m-0 mb-2 text-[0.72rem] font-extrabold">{str(v, "heading") || "Request a callback"}</p>
      {sent ? (
        <p className="m-0 text-[0.65rem] font-bold text-emerald-600">We&apos;ll call at your preferred time</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-1.5">
          <input required placeholder="Name" className="rounded-lg border border-neutral-300 px-2.5 py-1.5 text-[0.62rem] outline-none" />
          <input required type="tel" placeholder="Phone" className="rounded-lg border border-neutral-300 px-2.5 py-1.5 text-[0.62rem] outline-none" />
          <select className="rounded-lg border border-neutral-300 px-2.5 py-1.5 text-[0.62rem]">
            <option>Best time: morning</option><option>Best time: afternoon</option><option>Best time: evening</option>
          </select>
          <button type="submit" className="w-fit rounded-lg bg-neutral-900 px-3.5 py-1.5 text-[0.6rem] font-bold text-white">Call me back</button>
        </form>
      )}
    </div>
  );
}

function EmiPlansTable({ v }: P) {
  const rows = str(v, "rows").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 5);
  return (
    <div className="p-4">
      <p className="m-0 mb-2 text-[0.7rem] font-extrabold">No-cost EMI available</p>
      <table className="w-full border-collapse text-[0.65rem]">
        <thead><tr>{["Bank", "Tenure", "Per month"].map((h) => <th key={h} className="pb-1.5 text-left text-[0.52rem] uppercase tracking-wider text-neutral-400">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r) => {
            const parts = r.split("|").map((s) => s.trim());
            return (
              <tr key={r} className="border-t border-neutral-100">
                <td className="py-1.5">{parts[0]}</td><td className="py-1.5">{parts[1]} mo</td><td className="py-1.5 font-bold">{parts[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function UpiBadges() {
  return (
    <div className="flex flex-wrap gap-1.5 p-4">
      {["UPI", "GPay", "PhonePe", "Paytm", "Cards"].map((b) => (
        <span key={b} className="rounded border border-neutral-300 px-2.5 py-1 text-[0.55rem] font-extrabold">{b}</span>
      ))}
    </div>
  );
}

function SizeRecommender({ v }: P) {
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  let size = "";
  const hv = Number(h), wv = Number(w);
  if (hv && wv) {
    const bmi = wv / ((hv / 100) ** 2);
    size = bmi < 19 ? "S" : bmi < 23 ? "M" : bmi < 27 ? "L" : "XL";
  }
  return (
    <div className="m-4 rounded-lg border border-dashed border-neutral-300 p-3.5">
      <p className="m-0 mb-2 text-[0.68rem] font-bold">{str(v, "label") || "Find your size"}</p>
      <div className="flex gap-2">
        <input type="number" placeholder="Height (cm)" value={h} onChange={(e) => setH(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-2.5 py-1.5 text-[0.68rem] outline-none" />
        <input type="number" placeholder="Weight (kg)" value={w} onChange={(e) => setW(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-2.5 py-1.5 text-[0.68rem] outline-none" />
      </div>
      {size && <p className="m-0 mt-2 text-[0.65rem] font-bold text-emerald-600">Suggested size: {size}</p>}
    </div>
  );
}

function LoginPrompt({ v }: P) {
  return (
    <div className="m-4 flex items-center justify-between gap-3 rounded-lg bg-emerald-50/60 px-3.5 py-2.5">
      <p className="m-0 text-[0.68rem] font-semibold">{str(v, "text") || "Log in for member benefits"}</p>
      <a href="#" className="whitespace-nowrap text-[0.62rem] font-bold text-emerald-600">{str(v, "cta") || "Log in"} &rarr;</a>
    </div>
  );
}

function SslNote({ v }: P) {
  return (
    <div className="flex items-center justify-center gap-1.5 p-4 text-[0.6rem] text-neutral-500">
      <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      {str(v, "text") || "Secure checkout"}
    </div>
  );
}

function ArticleProgress() {
  const [pct, setPct] = useState(35);
  return (
    <div className="p-4">
      <input type="range" min="0" max="100" value={pct} onChange={(e) => setPct(Number(e.target.value))} className="mb-2 w-full accent-emerald-600" aria-label="Simulate scroll" />
      <div className="h-1 overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full bg-emerald-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function RelatedArticles({ v }: P) {
  const limit = Number(str(v, "limit")) || 3;
  return (
    <div className="p-4">
      <p className="m-0 mb-2.5 text-[0.75rem] font-extrabold">{str(v, "heading") || "Keep reading"}</p>
      <div className="grid grid-cols-3 gap-2.5 max-sm:grid-cols-1">
        {["Sizing guide", "Fabric care", "New drops"].slice(0, limit).map((t, i) => (
          <div key={t}>
            <div className="aspect-video rounded-lg" style={{ background: `linear-gradient(${135 + i * 60}deg,#e0e7ff,#fbcfe8)` }} />
            <p className="m-0 mt-1.5 text-[0.68rem] font-bold">{t}</p>
            <p className="m-0 text-[0.55rem] text-neutral-400">Jan {10 + i * 3}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuthorCard({ v }: P) {
  const name = str(v, "name") || "Author";
  return (
    <div className="m-4 flex items-center gap-3.5 rounded-xl border border-neutral-200 p-4">
      <div className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-600 text-base font-extrabold text-white">{name[0]}</div>
      <div>
        <p className="m-0 text-[0.75rem] font-extrabold">{name}</p>
        <p className="m-0 mt-0.5 text-[0.62rem] text-neutral-500">{str(v, "bio")}</p>
      </div>
    </div>
  );
}

function StaffPicks({ v }: P) {
  const rows = str(v, "items").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 3);
  return (
    <div className="p-4">
      <p className="m-0 mb-2.5 text-sm font-extrabold">{str(v, "heading") || "Staff picks"}</p>
      <div className="grid grid-cols-3 gap-2.5 max-sm:grid-cols-2">
        {rows.map((r, i) => {
          const parts = r.split("|").map((s) => s.trim());
          return (
            <div key={r} className="relative">
              <div className="aspect-[4/5] rounded-xl" style={{ background: `linear-gradient(${135 + i * 60}deg,#e0e7ff,#fbcfe8)` }} />
              <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-0.5 text-[0.52rem] font-extrabold">{parts[0]}&apos;s pick</span>
              <p className="m-0 mt-1.5 text-[0.65rem] font-bold capitalize">{parts[2]?.replace(/-/g, " ")}</p>
              <p className="m-0 text-[0.55rem] text-neutral-400">₹{1499 + i * 400}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MultiColumnFooter({ v }: P) {
  const rows = str(v, "cols").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="border-t border-neutral-200 px-5 py-5">
      <div className="grid gap-5 sm:grid-cols-3">
        {rows.map((r) => {
          const [h, links] = r.split("|");
          return (
            <div key={r}>
              <p className="m-0 mb-2 text-[0.55rem] font-extrabold uppercase tracking-wider text-neutral-400">{h?.trim()}</p>
              {(links ?? "").split(",").map((l) => (
                <a key={l} href="#" className="block py-1 text-[0.7rem] hover:text-emerald-600">{l.trim()}</a>
              ))}
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex justify-between border-t border-neutral-100 pt-4 text-[0.65rem]">
        <a href="#" className="font-bold">{str(v, "phone")}</a>
        <span className="text-neutral-400">GPLMart</span>
      </div>
    </div>
  );
}

function BusinessHours({ v }: P) {
  const rows = str(v, "hours").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 6);
  return (
    <div className="p-4">
      <p className="m-0 mb-2 flex items-center gap-1.5 text-[0.72rem] font-bold">
        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Store hours
      </p>
      {rows.map((r) => {
        const parts = r.split("|").map((s) => s.trim());
        return <p key={r} className="m-0 flex justify-between text-[0.65rem] text-neutral-600"><span>{parts[0]}</span><span>{parts[1]}</span></p>;
      })}
    </div>
  );
}

function PickupAvailability() {
  return (
    <div className="flex items-start gap-2.5 p-4">
      <svg className="mt-0.5 size-4 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
      <div>
        <p className="m-0 text-[0.7rem] font-bold">Pickup available at Connaught Place</p>
        <p className="m-0 mt-0.5 text-[0.6rem] text-neutral-400">Usually ready in 2 hours</p>
      </div>
    </div>
  );
}

function WhatsappOrderStatus({ v }: P) {
  return (
    <div className="p-4">
      <a href="#" className="inline-flex items-center gap-2 rounded-full border border-[#25d366] px-5 py-2 text-[0.68rem] font-bold text-[#128c7e]">
        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35"/></svg>
        {str(v, "label") || "Check on WhatsApp"}
      </a>
    </div>
  );
}

function CodPartialAdvance({ v }: P) {
  return (
    <div className="m-4 flex items-start gap-2.5 rounded-lg border border-dashed border-neutral-300 p-3">
      <svg className="mt-0.5 size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
      <div>
        <p className="m-0 text-[0.7rem] font-bold">COD with {str(v, "amount") || "a small"} advance</p>
        <p className="m-0 mt-0.5 text-[0.6rem] text-neutral-500">{str(v, "text")}</p>
      </div>
    </div>
  );
}

function OpenBoxBadge({ v }: P) {
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.7rem] text-neutral-600">
      <svg className="size-3.5 shrink-0 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
      {str(v, "text") || "Open box delivery available"}
    </div>
  );
}

function GstNote({ v }: P) {
  return <p className="m-0 p-4 text-[0.62rem] text-neutral-500">{str(v, "text") || "All prices include GST"}</p>;
}

function ShipZonesNote({ v }: P) {
  return (
    <div className="flex items-center gap-1.5 p-4 text-[0.68rem] text-neutral-600">
      <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
      {str(v, "text") || "Ships across India"}{str(v, "city") && ` · from ${str(v, "city")}`}
    </div>
  );
}

function BulkPricingNote({ v }: P) {
  return (
    <div className="p-4">
      <a href="#" className="text-[0.65rem] font-bold text-emerald-600 hover:underline">Ordering {str(v, "qty") || "20"}+ {str(v, "text") || "units?"} &rarr;</a>
    </div>
  );
}

function SampleRequest({ v }: P) {
  return (
    <div className="p-4">
      <a href="#" className="rounded-full border border-neutral-300 px-4 py-2 text-[0.65rem] font-bold hover:border-emerald-600 hover:text-emerald-600">
        {str(v, "label") || "Order a sample"} - {str(v, "price")}
      </a>
    </div>
  );
}

function EmiCalculator({ v }: P) {
  const [price, setPrice] = useState(str(v, "price") || "24990");
  const [months, setMonths] = useState(6);
  const monthly = Math.round(Number(price) / months);
  return (
    <div className="m-4 rounded-lg border border-neutral-200 p-3.5">
      <p className="m-0 mb-2 text-[0.7rem] font-extrabold">EMI calculator</p>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="mb-2 w-full rounded-lg border border-neutral-300 px-2.5 py-1.5 text-[0.68rem] outline-none" />
      <div className="flex gap-1.5">
        {[3, 6, 9, 12].map((m) => (
          <button key={m} type="button" onClick={() => setMonths(m)} className={`flex-1 rounded border py-1 text-[0.6rem] ${months === m ? "border-transparent bg-neutral-900 text-white" : "border-neutral-300"}`}>{m} mo</button>
        ))}
      </div>
      <p className="m-0 mt-2 text-[0.72rem] font-bold">₹{monthly.toLocaleString("en-IN")}/month for {months} months</p>
    </div>
  );
}

function DeliverySlotPicker() {
  const [slot, setSlot] = useState("");
  return (
    <div className="p-4">
      <label className="mb-1.5 block text-[0.68rem] font-semibold">Preferred delivery time</label>
      <select value={slot} onChange={(e) => setSlot(e.target.value)} className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-[0.7rem] outline-none">
        <option value="">Any time</option>
        <option>Morning (9am - 1pm)</option>
        <option>Afternoon (1pm - 5pm)</option>
        <option>Evening (5pm - 9pm)</option>
      </select>
      {slot && <p className="m-0 mt-1.5 text-[0.6rem] text-neutral-500">Saves to order attributes</p>}
    </div>
  );
}

function CheckoutTrustStrip() {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-neutral-200 p-4">
      {[["M3 11h18v11H3zM7 11V7a5 5 0 0 1 10 0v4", "Secure checkout"], ["M21 12a9 9 0 1 1-9-9 9 9 0 0 1 6.7 3.1M21 3v6h-6", "Easy returns"], ["M2 6h20v12H2zM12 10v4", "COD available"]].map(([d, t]) => (
        <span key={t} className="flex items-center gap-1.5 text-[0.6rem] text-neutral-500">
          <svg className="size-3 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={d}/></svg>
          {t}
        </span>
      ))}
    </div>
  );
}

function LanguageSelector({ v }: P) {
  const langs = str(v, "langs").split(",").map((s) => s.trim()).filter(Boolean);
  return (
    <div className="p-4">
      <select className="rounded-lg border border-neutral-300 px-3 py-1.5 text-[0.68rem] outline-none" aria-label="Language">
        {langs.map((l) => <option key={l}>{l}</option>)}
      </select>
    </div>
  );
}

function LiveChatStatus({ v }: P) {
  const on = str(v, "status") === "online";
  return (
    <div className="p-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-3.5 py-1.5 text-[0.65rem]">
        <span className={`size-2 rounded-full ${on ? "bg-emerald-500" : "bg-neutral-400"}`} />
        <b>Support chat{on ? " - online" : " - away"}</b>
        <span className="text-neutral-400">{str(v, "hours")}</span>
      </span>
    </div>
  );
}

function AllergenWarning({ v }: P) {
  return (
    <div className="m-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-[0.68rem]">
      <svg className="size-3.5 shrink-0 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/></svg>
      Contains: <b>{str(v, "items") || "allergens"}</b>
    </div>
  );
}

function ExpiryNote({ v }: P) {
  return <p className="m-0 p-4 text-[0.65rem] text-neutral-600">Best before <b>{str(v, "date") || "see label"}</b></p>;
}

function FragranceNotes({ v }: P) {
  const tiers = [["Top", str(v, "top")], ["Heart", str(v, "heart")], ["Base", str(v, "base")]];
  return (
    <div className="p-4">
      {tiers.map(([t, val]) => (
        <div key={t} className="flex gap-4 border-b border-neutral-100 py-1.5 text-[0.68rem] last:border-0">
          <span className="w-14 shrink-0 text-[0.55rem] font-extrabold uppercase tracking-wider text-neutral-400">{t}</span>
          <span>{val}</span>
        </div>
      ))}
    </div>
  );
}

function FabricComposition({ v }: P) {
  const rows = str(v, "parts").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="p-4">
      <div className="flex h-2 overflow-hidden rounded-full">
        {rows.map((r, i) => {
          const [, pct] = r.split("|");
          return <span key={r} className="h-full" style={{ width: `${pct?.trim()}%`, background: `hsl(${i * 60}, 60%, 70%)` }} />;
        })}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {rows.map((r, i) => {
          const [n, pct] = r.split("|").map((s) => s.trim());
          return (
            <span key={r} className="flex items-center gap-1 text-[0.58rem]">
              <span className="size-2 rounded-full" style={{ background: `hsl(${i * 60}, 60%, 70%)` }} />
              {n} {pct}%
            </span>
          );
        })}
      </div>
    </div>
  );
}

function TrendingSearches({ v }: P) {
  const terms = str(v, "terms").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 6);
  return (
    <div className="flex flex-wrap items-center gap-2 p-4">
      <span className="text-[0.55rem] font-extrabold uppercase tracking-wider text-neutral-400">Trending</span>
      {terms.map((t) => (
        <a key={t} href="#" className="rounded-full border border-neutral-300 px-3 py-1 text-[0.62rem]">{t}</a>
      ))}
    </div>
  );
}

function NoResultsSuggestions({ v }: P) {
  const links = str(v, "links").split("\n").map((r) => r.trim()).filter(Boolean).slice(0, 4);
  return (
    <div className="p-6 text-center">
      <p className="m-0 mb-3 text-[0.72rem] text-neutral-500">Nothing found - try these instead:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {links.map((r) => {
          const [l] = r.split("|");
          return <a key={r} href="#" className="rounded-full border border-neutral-300 px-4 py-2 text-[0.65rem] font-semibold">{l?.trim()}</a>;
        })}
      </div>
    </div>
  );
}

function OwnerReply({ v }: P) {
  return (
    <div className="ml-8 mr-4 mt-2 rounded-r-lg border-l-2 border-emerald-600 bg-emerald-50/50 p-3">
      <p className="m-0 mb-1 text-[0.58rem] font-extrabold text-emerald-600">Response from {str(v, "name") || "Store"}</p>
      <p className="m-0 text-[0.68rem] leading-relaxed">{str(v, "text")}</p>
    </div>
  );
}

function HelpfulVote() {
  const [voted, setVoted] = useState<"yes" | "no" | null>(null);
  const [n, setN] = useState({ yes: 3, no: 0 });
  return (
    <div className="flex items-center gap-2.5 p-4 text-[0.6rem]">
      <span className="text-neutral-400">Was this helpful?</span>
      {(["yes", "no"] as const).map((k) => (
        <button key={k} type="button" onClick={() => { if (!voted) { setVoted(k); setN({ ...n, [k]: n[k] + 1 }); } }} className={`rounded-full border px-3 py-1 ${voted === k ? "border-emerald-600 text-emerald-600" : "border-neutral-300"}`}>
          {k === "yes" ? "Yes" : "No"} ({n[k]})
        </button>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div className="p-4">
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[0.55rem] font-extrabold text-emerald-600">
        <svg className="size-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        Verified buyer
      </span>
    </div>
  );
}

function LimitedEdition({ v }: P) {
  return (
    <div className="p-4">
      <p className="m-0 inline-flex items-baseline gap-1 text-sm font-extrabold">
        #{str(v, "num") || "1"} <span className="text-[0.6rem] font-normal text-neutral-400">of</span> {str(v, "total") || "500"}
        <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[0.5rem] font-extrabold uppercase tracking-wider text-amber-700">limited edition</span>
      </p>
    </div>
  );
}

function FestivalBanner({ v }: P) {
  return (
    <div className="m-4">
      <a href="#" className="block rounded-lg border border-amber-300/30 bg-gradient-to-r from-amber-50 to-amber-50/40 px-4 py-3 text-center text-[0.72rem] font-bold">
        {str(v, "emoji")} {str(v, "festival") || "Festival"} Sale - {str(v, "offer") || "special offers"}
      </a>
    </div>
  );
}

function SocialUnlock({ v }: P) {
  const [shared, setShared] = useState(false);
  return (
    <div className="m-4 rounded-lg border border-dashed border-neutral-300 p-3.5">
      <p className="m-0 text-[0.72rem]">Share us on Instagram to unlock <b>{str(v, "offer") || "a discount"}</b></p>
      <button type="button" onClick={() => setTimeout(() => setShared(true), 1000)} className="mt-2 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 px-4 py-1.5 text-[0.65rem] font-bold text-white">Share on Instagram</button>
      {shared && (
        <div className="mt-3 border-t border-dashed border-neutral-300 pt-3">
          <p className="m-0 mb-1 text-[0.6rem]">Your code:</p>
          <code className="rounded-md bg-neutral-100 px-3 py-1.5 text-[0.78rem] font-extrabold tracking-wider">{str(v, "code") || "CODE"}</code>
        </div>
      )}
    </div>
  );
}

function CartDrawer({ v }: P) {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(2);
  const threshold = Number(str(v, "threshold")) || 0;
  const total = qty * 4900;
  const left = Math.max(0, threshold * 100 - total);
  return (
    <div className="relative h-64 overflow-hidden bg-neutral-50">
      {on(v, "floating") && (
        <button type="button" onClick={() => setOpen(true)} className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2.5 text-[0.65rem] font-bold text-white shadow-lg">
          Cart <span className="rounded-full bg-white/20 px-1.5">{qty}</span>
        </button>
      )}
      {open && <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />}
      <div className={`absolute right-0 top-0 flex h-full w-64 flex-col bg-white shadow-xl transition-transform duration-300 ${open ? "" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
          <p className="m-0 text-[0.7rem] font-extrabold">{str(v, "heading") || "Your cart"} <span className="text-neutral-400">{qty}</span></p>
          <button type="button" onClick={() => setOpen(false)} className="text-lg leading-none">&times;</button>
        </div>
        {threshold > 0 && (
          <div className="border-b border-neutral-100 px-4 py-2.5">
            <p className="m-0 mb-1 text-[0.55rem] font-semibold">{left > 0 ? `Rs ${left / 100} away from free shipping` : "Free shipping unlocked!"}</p>
            <div className="h-1.5 overflow-hidden rounded-full bg-neutral-200"><div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, (total / (threshold * 100)) * 100)}%` }} /></div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="flex gap-2.5 border-b border-neutral-100 pb-3">
            <div className="size-14 shrink-0 rounded-lg bg-neutral-200" />
            <div className="flex-1 text-[0.62rem]">
              <p className="m-0 font-bold">Merino cardigan</p>
              <p className="m-0 text-neutral-500">Rs 49.00</p>
              <span className="mt-1 inline-flex items-center gap-2 rounded-md border border-neutral-300 px-2 py-0.5">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>-</button><b>{qty}</b><button type="button" onClick={() => setQty(qty + 1)}>+</button>
              </span>
            </div>
            <button type="button" onClick={() => setQty(0)} className="self-start text-neutral-400">&times;</button>
          </div>
        </div>
        <div className="border-t border-neutral-200 px-4 py-3">
          <p className="m-0 mb-2 flex justify-between text-[0.65rem]"><span>Subtotal</span><b>Rs {(total / 100).toFixed(2)}</b></p>
          <div className="rounded-lg bg-neutral-900 py-2.5 text-center text-[0.65rem] font-bold text-white">Checkout</div>
        </div>
      </div>
    </div>
  );
}

function WishlistPage({ v }: P) {
  const items = [["Merino cardigan", "49.00"], ["Linen overshirt", "89.00"], ["Canvas tote", "35.00"]];
  return (
    <div className="p-6">
      <h2 className="m-0 mb-4 text-lg font-extrabold">{str(v, "heading") || "My wishlist"}</h2>
      <div className="grid grid-cols-3 gap-3">
        {items.map(([n, p]) => (
          <div key={n} className="overflow-hidden rounded-xl border border-neutral-200">
            <div className="relative aspect-square bg-neutral-100">
              <button type="button" className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-white/90 text-[0.6rem]">&times;</button>
            </div>
            <div className="p-2.5">
              <p className="m-0 text-[0.6rem] font-bold">{n}</p>
              <p className="m-0 mb-1.5 text-[0.58rem] text-neutral-500">Rs {p}</p>
              <div className="rounded-md bg-neutral-900 py-1.5 text-center text-[0.55rem] font-bold text-white">Add to cart</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScratchCard({ v }: P) {
  const [scratched, setScratched] = useState(false);
  return (
    <div className="flex h-56 items-center justify-center bg-black/50 p-4">
      <div className="relative w-64 rounded-2xl bg-white p-5 text-center">
        <button type="button" className="absolute right-2.5 top-2 text-lg text-neutral-400">&times;</button>
        <h2 className="m-0 mb-3 text-base font-extrabold">{str(v, "title") || "Scratch & win"}</h2>
        <div className="relative overflow-hidden rounded-lg">
          <code className="block py-4 text-base font-extrabold tracking-widest">{str(v, "code") || "LUCKY15"}</code>
          {!scratched ? (
            <button type="button" onClick={() => setScratched(true)} className="absolute inset-0 flex items-center justify-center text-[0.6rem] font-bold text-white" style={{ background: hex(v, "foil") }}>SCRATCH HERE</button>
          ) : null}
        </div>
        <p className="m-0 mt-2.5 text-[0.55rem] text-neutral-400">{scratched ? "Use the code at checkout" : "Click to simulate scratching"}</p>
      </div>
    </div>
  );
}

function BuyBox({ v }: P) {
  const accent = hex(v, "accent");
  const rows = [
    ["dot", "In stock - ready to ship"],
    ["check", "Free shipping over $50"],
    ["truck", "Order today - dispatched in 24 hours"],
    ["shield", "30-day money-back guarantee"],
    ["text", "Secure checkout - UPI, cards & COD"],
  ];
  return (
    <div className="grid gap-2 p-4">
      {rows.map(([k, t]) => (
        <p key={t} className="m-0 flex items-center gap-2 text-[0.62rem]">
          {k === "dot" ? <span className="size-2 shrink-0 rounded-full" style={{ background: accent }} />
            : k === "text" ? null
            : <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2"><path d={k === "check" ? "m5 13 4 4L19 7" : k === "truck" ? "M5 17h-2v-11a1 1 0 0 1 1-1h9v12m-8 0h8m4 0h2v-6h-6v6m0-9h4l4 4" : "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}/></svg>}
          <span className={k === "text" ? "font-bold" : ""}>{t}</span>
        </p>
      ))}
    </div>
  );
}

function StockAlert({ v }: P) {
  const [sent, setSent] = useState(false);
  return (
    <div className="m-4 rounded-xl border border-dashed border-neutral-300 p-4">
      <p className="m-0 text-[0.68rem] font-extrabold">{str(v, "heading") || "Sold out - notify me"}</p>
      <p className="m-0 mt-1 text-[0.58rem] text-neutral-500">{str(v, "sub")}</p>
      {sent ? (
        <p className="m-0 mt-3 text-[0.6rem] font-bold text-emerald-600">Done - we will email you as soon as it is back.</p>
      ) : (
        <div className="mt-3 flex gap-2">
          <input readOnly placeholder="you@email.com" className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-[0.62rem]" />
          <button type="button" onClick={() => setSent(true)} className="rounded-lg bg-neutral-900 px-3.5 py-1.5 text-[0.62rem] font-bold text-white">{str(v, "button") || "Notify me"}</button>
        </div>
      )}
    </div>
  );
}

function MegaMenu({ v }: P) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: hex(v, "bg") }} className={on(v, "sticky") ? "sticky top-0 z-10" : ""}>
      <div className="flex items-center gap-4 px-5 py-3">
        <span className="text-sm font-extrabold">{str(v, "logo_text") || "Store"}</span>
        <nav className="flex items-center gap-0.5 text-[0.68rem] font-semibold">
          <a href="#" className="rounded px-2.5 py-1.5">Home</a>
          <div className="relative">
            <a href="#" className="flex items-center gap-1 rounded px-2.5 py-1.5" onClick={(e) => { e.preventDefault(); setOpen(!open); }} style={{ color: open ? hex(v, "accent") : undefined }}>
              Shop <svg className="size-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </a>
            {open && (
              <div className="absolute left-0 top-full flex gap-6 border-t border-neutral-200 bg-white p-5 shadow-lg" onMouseLeave={() => setOpen(false)}>
                {[["New in", "Dresses", "Tops", "Denim"], ["Essentials", "Basics", "Knitwear", "Sale"]].map(([h, ...ls]) => (
                  <div key={h} className="grid content-start gap-1.5">
                    <a href="#" className="text-[0.55rem] font-extrabold uppercase tracking-wider" style={{ color: hex(v, "accent") }}>{h}</a>
                    {ls.map((l) => <a key={l} href="#" className="text-[0.6rem] text-neutral-500">{l}</a>)}
                  </div>
                ))}
                <div className="w-24 overflow-hidden rounded-lg bg-neutral-100">
                  <div className="h-16 bg-gradient-to-br from-amber-100 to-amber-200" />
                  <p className="p-1.5 text-[0.5rem] font-semibold">Spring lookbook</p>
                </div>
              </div>
            )}
          </div>
          <a href="#" className="rounded px-2.5 py-1.5">About</a>
          <a href="#" className="rounded px-2.5 py-1.5">Contact</a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <span className="relative">
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span className="absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full text-[0.4rem] font-extrabold text-white" style={{ background: hex(v, "accent") }}>2</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function SpinWheel({ v }: P) {
  const [spun, setSpun] = useState(false);
  const slices = ["10% off", "Try again", "Free gift", "15% off"];
  const cols = ["#0f172a", "#16a34a", "#7c3aed", "#b45309"];
  return (
    <div className="flex h-64 items-center justify-center bg-black/50 p-4">
      <div className="relative w-56 rounded-2xl bg-white p-4 text-center">
        <h2 className="m-0 mb-2 text-sm font-extrabold">{str(v, "title") || "Spin to win"}</h2>
        <div className="relative mx-auto size-36">
          <svg viewBox="0 0 100 100" className={`size-full transition-transform duration-[3000ms] ease-out ${spun ? "rotate-[1440deg]" : ""}`}>
            {slices.map((s, i) => {
              const a0 = (i * 90 - 90) * Math.PI / 180, a1 = ((i + 1) * 90 - 90) * Math.PI / 180;
              return (
                <g key={s}>
                  <path d={`M50 50 L${50 + 48 * Math.cos(a0)} ${50 + 48 * Math.sin(a0)} A48 48 0 0 1 ${50 + 48 * Math.cos(a1)} ${50 + 48 * Math.sin(a1)} Z`} fill={cols[i]} />
                  <text x="68" y="52" fontSize="7" fill="#fff" fontWeight="700" textAnchor="middle" transform={`rotate(${i * 90}, 50, 50)`}>{s}</text>
                </g>
              );
            })}
          </svg>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 border-x-8 border-t-[14px] border-x-transparent border-t-neutral-900" />
        </div>
        {spun ? (
          <div className="mt-3"><code className="rounded border border-dashed border-neutral-800 px-3 py-1 text-[0.7rem] font-extrabold tracking-widest">LUCKY15</code></div>
        ) : (
          <button type="button" onClick={() => setSpun(true)} className="mt-3 rounded-full bg-neutral-900 px-5 py-1.5 text-[0.62rem] font-bold text-white">{str(v, "spin_text") || "Spin the wheel"}</button>
        )}
      </div>
    </div>
  );
}

function QuickViewGrid({ v }: P) {
  const [open, setOpen] = useState(false);
  const cards = [["Merino cardigan", "49.00"], ["Linen overshirt", "89.00"], ["Canvas tote", "35.00"], ["Wool scarf", "29.00"]];
  return (
    <div className="relative p-5">
      <h2 className="m-0 mb-3 text-sm font-extrabold">{str(v, "heading") || "Shop the look"}</h2>
      <div className="grid grid-cols-4 gap-2.5">
        {cards.slice(0, Number(str(v, "limit")) || 8).map(([n, p]) => (
          <div key={n}>
            <div className="group relative aspect-square rounded-lg bg-neutral-100">
              <button type="button" onClick={() => setOpen(true)} className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-2.5 py-1 text-[0.45rem] font-extrabold opacity-0 transition-opacity group-hover:opacity-100">Quick view</button>
            </div>
            <p className="m-0 mt-1.5 text-[0.52rem] font-bold">{n}</p>
            <p className="m-0 text-[0.5rem] text-neutral-500">Rs {p}</p>
          </div>
        ))}
      </div>
      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40" onClick={() => setOpen(false)}>
          <div className="relative w-64 rounded-xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setOpen(false)} className="absolute right-2.5 top-2 text-lg">&times;</button>
            <div className="flex gap-3">
              <div className="size-20 shrink-0 rounded-lg bg-neutral-100" />
              <div className="min-w-0">
                <p className="m-0 text-[0.7rem] font-extrabold">Merino cardigan</p>
                <p className="m-0 mb-1.5 mt-0.5 text-[0.65rem] font-bold">Rs 49.00</p>
                <select className="mb-2 w-full rounded-md border border-neutral-300 px-1.5 py-1 text-[0.55rem]"><option>S</option><option>M</option><option>L</option></select>
                <div className="rounded-md bg-neutral-900 py-1.5 text-center text-[0.55rem] font-bold text-white">Add to cart</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function UpsellModal({ v }: P) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex h-56 items-center justify-center bg-neutral-100 p-4">
      <div className="rounded-lg border border-neutral-300 bg-white px-8 py-3 text-[0.68rem] font-bold">Add to cart</div>
      <button type="button" onClick={() => setOpen(true)} className="absolute bottom-3 text-[0.55rem] text-neutral-500 underline">simulate add-to-cart</button>
      {open && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/45">
          <div className="relative w-60 rounded-2xl bg-white p-5 text-center">
            <button type="button" onClick={() => setOpen(false)} className="absolute right-2.5 top-2 text-lg text-neutral-400">&times;</button>
            <p className="m-0 mb-3 text-[0.72rem] font-extrabold">{str(v, "heading") || "Complete your order"}</p>
            <div className="flex items-center gap-2.5 rounded-xl border border-neutral-200 p-2.5 text-left">
              <div className="size-12 shrink-0 rounded-lg bg-neutral-100" />
              <div>
                <p className="m-0 text-[0.62rem] font-bold">Silk sleep mask</p>
                <p className="m-0 mt-0.5 text-[0.58rem] text-neutral-500">Rs 19.00</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="mt-3 w-full rounded-lg bg-neutral-900 py-2 text-[0.62rem] font-bold text-white">{str(v, "add") || "Add it too"}</button>
            <button type="button" onClick={() => setOpen(false)} className="mt-2 text-[0.55rem] text-neutral-500 underline">No thanks, continue to cart</button>
          </div>
        </div>
      )}
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
  "responsive-slideshow": Slides,
  "delivery-estimator": Delivery,
  "size-chart-modal": SizeChart,
  "coupon-cards": Coupons,
  "trust-grid": TrustGrid,
  "price-display": Price,
  "promo-popup": PromoPopup,
  "countdown-timer": Countdown,
  "star-rating": StarRating,
  "stock-pulse": StockPulse,
  "sticky-buy-bar": StickyBuyBar,
  "free-shipping-bar": FreeShipBar,
  "benefit-marquee": Marquee,
  "payment-badges": PaymentBadges,
  "quantity-breaks": QuantityBreaks,
  "guarantee-strip": Guarantee,
  "recently-viewed": RecentlyViewed,
  "sold-out-notify": SoldOutNotify,
  "back-to-top": BackToTop,
  "scroll-progress": ScrollProgress,
  "cookie-consent": CookieConsent,
  "sale-badge": SaleBadge,
  "product-tabs": ProductTabs,
  "logo-marquee": LogoMarquee,
  "testimonial-slider": TestimonialSlider,
  "before-after": BeforeAfter,
  "emi-note": EmiNote,
  "cutoff-timer": CutoffTimer,
  "pairs-well-with": PairsWellWith,
  "spec-table": SpecTable,
  "gift-wrap": GiftWrap,
  "breadcrumb": Breadcrumb,
  "cart-upsell": CartUpsell,
  "image-zoom": ImageZoom,
  "complete-the-look": CompleteTheLook,
  "cod-checker": CodChecker,
  "ingredients-table": IngredientsTable,
  "ugc-grid": UgcGrid,
  "sales-notification": SalesNotification,
  "age-verify": AgeVerify,
  "store-locator": StoreLocator,
  "review-summary": ReviewSummary,
  "aspect-ratings": AspectRatings,
  "review-card": ReviewCard,
  "press-mentions": PressMentions,
  "expert-quote": ExpertQuote,
  "video-testimonial": VideoTestimonial,
  "image-hotspots": ImageHotspots,
  "stats-counter": StatsCounter,
  "wishlist-button": WishlistButton,
  "faq-schema": FaqSchema,
  "image-with-text": ImageWithText,
  "feature-icons": FeatureIcons,
  "product-scroller": ProductScroller,
  "story-slider": StorySlider,
  "bulk-order": BulkOrder,
  "timeline": TimelineSection,
  "rating-strip": RatingStrip,
  "bundle-save": BundleSave,
  "newsletter-discount": NewsletterDiscount,
  "video-banner": VideoBanner,
  "testimonial-wall": TestimonialWall,
  "collapsible-details": CollapsibleDetails,
  "usp-under-atc": UspUnderAtc,
  "vs-competitor": VsCompetitor,
  "gallery-grid": GalleryGrid,
  "cart-notes": CartNotes,
  "pills-nav": PillsNav,
  "checkout-trust": CheckoutTrust,
  "whatsapp-order": WhatsappOrder,
  "personalization-field": PersonalizationField,
  "variant-matrix": VariantMatrix,
  "price-per-unit": PricePerUnit,
  "subscribe-save": SubscribeSave,
  "certification-badges": CertificationBadges,
  "loyalty-points": LoyaltyPoints,
  "collection-hero": CollectionHero,
  "category-tiles": CategoryTiles,
  "social-share": SocialShare,
  "instagram-grid": InstagramGrid,
  "custom-liquid-section": CustomLiquidSection,
  "open-now": OpenNow,
  "price-drop-alert": PriceDropAlert,
  "exit-intent": ExitIntent,
  "faq-search": FaqSearch,
  "contact-form-section": ContactFormSection,
  "team-grid": TeamGrid,
  "map-embed": MapEmbed,
  "coming-soon": ComingSoon,
  "in-cart-badge": InCartBadge,
  "featured-product": FeaturedProduct,
  "search-hero": SearchHero,
  "made-to-order": MadeToOrder,
  "fit-note": FitNote,
  "warranty-badge": WarrantyBadge,
  "charity-note": CharityNote,
  "multi-location-stock": MultiLocationStock,
  "variant-swatches": VariantSwatches,
  "frequently-bought": FrequentlyBought,
  "quick-view": QuickView,
  "image-rollover": ImageRollover,
  "mega-menu-panel": MegaMenuPanel,
  "mobile-bottom-nav": MobileBottomNav,
  "product-finder-quiz": ProductFinderQuiz,
  "image-accordion": ImageAccordion,
  "tabbed-collections": TabbedCollections,
  "checkout-progress": CheckoutProgress,
  "wholesale-inquiry": WholesaleInquiry,
  "returns-request": ReturnsRequest,
  "bundle-builder": BundleBuilder,
  "quantity-selector": QuantitySelector,
  "size-chart-table": SizeChartTable,
  "delivery-date-picker": DeliveryDatePicker,
  "gift-message-cart": GiftMessageCart,
  "terms-checkbox": TermsCheckbox,
  "sold-count": SoldCount,
  "product-compare-table": ProductCompareTable,
  "load-more": LoadMore,
  "empty-cart": EmptyCart,
  "not-found-search": NotFoundSearch,
  "article-toc": ArticleToc,
  "referral-card": ReferralCard,
  "donation-checkbox": DonationCheckbox,
  "a11y-toolbar": A11yToolbar,
  "preorder-button": PreorderButton,
  "predictive-search": PredictiveSearch,
  "review-submit-form": ReviewSubmitForm,
  "ask-question": AskQuestion,
  "model-info": ModelInfo,
  "similar-products": SimilarProducts,
  "prepaid-discount": PrepaidDiscount,
  "compatibility-checker": CompatibilityChecker,
  "file-upload": FileUpload,
  "nutrition-facts": NutritionFacts,
  "restock-date": RestockDate,
  "price-match": PriceMatch,
  "loyalty-tiers": LoyaltyTiers,
  "collection-filters": CollectionFilters,
  "reorder-button": ReorderButton,
  "warranty-registration": WarrantyRegistration,
  "call-order-button": CallOrderButton,
  "discount-progress": DiscountProgress,
  "vip-signup": VipSignup,
  "event-banner": EventBanner,
  "made-in-badge": MadeInBadge,
  "care-icons": CareIcons,
  "download-manual": DownloadManual,
  "request-quote": RequestQuote,
  "ugc-submit": UgcSubmit,
  "video-player-section": VideoPlayerSection,
  "ambassador-signup": AmbassadorSignup,
  "collection-notify": CollectionNotify,
  "birthday-capture": BirthdayCapture,
  "phone-bar": PhoneBar,
  "sold-out-overlay": SoldOutOverlay,
  "notify-whatsapp": NotifyWhatsapp,
  "mobile-menu-drawer": MobileMenuDrawer,
  "sticky-category-nav": StickyCategoryNav,
  "callback-request": CallbackRequest,
  "emi-plans-table": EmiPlansTable,
  "upi-badges": UpiBadges,
  "size-recommender": SizeRecommender,
  "login-prompt": LoginPrompt,
  "ssl-note": SslNote,
  "article-progress": ArticleProgress,
  "related-articles": RelatedArticles,
  "author-card": AuthorCard,
  "staff-picks": StaffPicks,
  "multi-column-footer": MultiColumnFooter,
  "business-hours": BusinessHours,
  "pickup-availability": PickupAvailability,
  "whatsapp-order-status": WhatsappOrderStatus,
  "cod-partial-advance": CodPartialAdvance,
  "open-box-badge": OpenBoxBadge,
  "gst-note": GstNote,
  "ship-zones-note": ShipZonesNote,
  "bulk-pricing-note": BulkPricingNote,
  "sample-request": SampleRequest,
  "emi-calculator": EmiCalculator,
  "delivery-slot-picker": DeliverySlotPicker,
  "checkout-trust-strip": CheckoutTrustStrip,
  "language-selector": LanguageSelector,
  "live-chat-status": LiveChatStatus,
  "allergen-warning": AllergenWarning,
  "expiry-note": ExpiryNote,
  "fragrance-notes": FragranceNotes,
  "fabric-composition": FabricComposition,
  "trending-searches": TrendingSearches,
  "no-results-suggestions": NoResultsSuggestions,
  "owner-reply": OwnerReply,
  "helpful-vote": HelpfulVote,
  "verified-badge": VerifiedBadge,
  "limited-edition": LimitedEdition,
  "festival-banner": FestivalBanner,
  "social-unlock": SocialUnlock,
  "cart-drawer": CartDrawer,
  "wishlist-page": WishlistPage,
  "scratch-card": ScratchCard,
  "buy-box-booster": BuyBox,
  "stock-alert": StockAlert,
  "mega-menu": MegaMenu,
  "spin-wheel": SpinWheel,
  "quick-view-grid": QuickViewGrid,
  "upsell-modal": UpsellModal,
};

export function ExamplePreview({ id, values, className, style }: { id: string; values: Values; className?: string; style?: CSSProperties }) {
  const Cmp = map[id];
  return (
    <div className={`@container bg-white text-neutral-900 ${className ?? ""}`} style={style}>
      {Cmp ? <Cmp v={values} /> : null}
    </div>
  );
}
