"use client";

import { useEffect, useState } from "react";

type Geo = { currency: string; units: number; display: string };

let cached: Geo | null = null;
function fetchGeo(): Promise<Geo | null> {
  if (cached) return Promise.resolve(cached);
  return fetch("/api/geo")
    .then((r) => (r.ok ? (r.json() as Promise<Geo>) : null))
    .then((g) => {
      cached = g;
      return g;
    })
    .catch(() => null);
}

/** Renders the geo-appropriate price; invisible placeholder until /api/geo resolves so the wrong currency never flashes. */
export function GeoPrice({ fallback = "₹499", className }: { fallback?: string; className?: string }) {
  const [state, setState] = useState<{ text: string; ready: boolean }>(() =>
    cached ? { text: cached.display, ready: true } : { text: fallback, ready: false },
  );
  useEffect(() => {
    let alive = true;
    const t = setTimeout(() => alive && setState((s) => (s.ready ? s : { text: fallback, ready: true })), 1500);
    fetchGeo().then((g) => {
      if (alive && g) setState({ text: g.display, ready: true });
    });
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [fallback]);
  return (
    <span className={`transition-opacity duration-300 ${state.ready ? "opacity-100" : "opacity-0"} ${className ?? ""}`}>
      {state.text}
    </span>
  );
}
