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
};

export function ExamplePreview({ id, values, className, style }: { id: string; values: Values; className?: string; style?: CSSProperties }) {
  const Cmp = map[id];
  return (
    <div className={`@container bg-white text-neutral-900 ${className ?? ""}`} style={style}>
      {Cmp ? <Cmp v={values} /> : null}
    </div>
  );
}
