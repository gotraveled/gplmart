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
  const [result, setResult] = useState<string | null>(null);
  const fast = Number(v.fast) || 2;
  const slow = Number(v.slow) || 5;
  function check() {
    if (pin.length !== 6) {
      setError(true);
      return;
    }
    setError(false);
    const zones: [number, number][] = [[110001, 110096], [400001, 400104], [560001, 560110], [700001, 700160], [600001, 600130]];
    const p = parseInt(pin, 10);
    const days = zones.some(([a, b]) => p >= a && p <= b) ? fast : slow;
    const d = new Date();
    d.setDate(d.getDate() + days);
    setResult(d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }));
  }
  return (
    <div className="p-6">
      <span className="text-sm">{str(v, "heading", 40)}</span>
      {result === null ? (
        <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-300 bg-white">
          <input
            type="tel"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            placeholder="Enter 6-digit PIN code"
            aria-label="Enter delivery PIN code"
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setError(false); }}
            onKeyDown={(e) => { if (e.key === "Enter") check(); }}
            className="h-11 min-w-0 flex-1 px-3.5 text-sm outline-none"
          />
          <button type="button" onClick={check} className="w-20 border-l border-slate-200 bg-slate-50 text-sm font-semibold hover:bg-slate-900 hover:text-white">
            Check
          </button>
        </div>
      ) : (
        <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm">
          <span>Estimated delivery <strong>{result}</strong></span>
          <button type="button" onClick={() => { setResult(null); setPin(""); }} className="font-semibold underline" style={{ color: hex(v, "accent") }}>
            Change
          </button>
        </div>
      )}
      {error && <p role="alert" className="mt-1.5 text-xs text-[#b4234d]">Please enter a valid 6-digit PIN code.</p>}
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
  const accent = hex(v, "accent");
  const items = [
    ["Free shipping", "On prepaid orders"],
    ["Easy returns", "Within the policy window"],
    ["Quality checked", "Before dispatch"],
    ["Secure checkout", "All major methods"],
  ];
  return (
    <div className="p-6">
      <ul className={`grid list-none grid-cols-2 gap-3 p-0 ${str(v, "columns") === "4" ? "@lg:grid-cols-4" : ""}`}>
        {items.map(([t, s]) => (
          <li key={t} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg" style={{ color: accent, background: `${accent}14` }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
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
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Organic cotton tee</p>
      <p className="mt-0.5 text-lg font-semibold">Everyday Crew</p>
      <div className="mt-1.5 inline-flex items-center gap-2" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
        <span className="relative inline-block text-base leading-none tracking-widest text-neutral-300">
          ★★★★★
          <span className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-amber-500" style={{ width: `${pct}%` }} aria-hidden>
            ★★★★★
          </span>
        </span>
        <strong className="text-sm">{rating}</strong>
        {str(v, "count") && <span className="text-xs text-slate-500">({str(v, "count", 10)} reviews)</span>}
      </div>
      <p className="mt-2 text-[0.65rem] text-neutral-400">On a real product the score comes from the reviews metafield - the preview uses the settings on the left.</p>
    </div>
  );
}

function StockPulse({ v }: P) {
  const max = Number(v.threshold) || 10;
  const stock = Math.min(6, max); // preview shows the low-stock state
  return (
    <div className="p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Everyday Crew</p>
      <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[0.8rem] font-semibold text-red-700">
        <span className="size-2 animate-pulse rounded-full bg-red-500" aria-hidden />
        Selling fast - only <strong>{stock}</strong> left in stock
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
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-3.5 py-2.5 backdrop-blur">
        <span className="flex items-baseline gap-1.5">
          <strong className="text-base font-extrabold">₹499</strong>
          <s className="text-xs text-slate-400">₹799</s>
        </span>
        <button
          type="button"
          onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}
          className="rounded-full px-5 py-2 text-sm font-bold text-white"
          style={{ background: hex(v, "accent") }}
        >
          {added ? "Added!" : str(v, "label", 20)}
        </button>
      </div>
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
};

export function ExamplePreview({ id, values, className, style }: { id: string; values: Values; className?: string; style?: CSSProperties }) {
  const Cmp = map[id];
  return (
    <div className={`@container bg-white text-neutral-900 ${className ?? ""}`} style={style}>
      {Cmp ? <Cmp v={values} /> : null}
    </div>
  );
}
