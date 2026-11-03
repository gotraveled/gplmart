"use client";

import { useEffect, useState } from "react";

type Geo = { currency: string; units: number; addonUnits: number; display: string; addonDisplay: string };

/** Renders the geo-appropriate price. Defaults to INR display, swaps after /api/geo resolves. */
export function GeoPrice({ fallback = "₹499", className }: { fallback?: string; className?: string }) {
  const [display, setDisplay] = useState(fallback);
  useEffect(() => {
    fetch("/api/geo")
      .then((r) => (r.ok ? (r.json() as Promise<Geo>) : null))
      .then((g) => g && setDisplay(g.display))
      .catch(() => {});
  }, []);
  return <span className={className}>{display}</span>;
}

/** Same for the order-bump addon price. */
export function GeoAddonPrice({ fallback = "+₹499", className }: { fallback?: string; className?: string }) {
  const [display, setDisplay] = useState(fallback);
  useEffect(() => {
    fetch("/api/geo")
      .then((r) => (r.ok ? (r.json() as Promise<Geo>) : null))
      .then((g) => g && setDisplay(`+${g.addonDisplay}`))
      .catch(() => {});
  }, []);
  return <span className={className}>{display}</span>;
}
