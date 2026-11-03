import { ImageResponse } from "next/og";
import meta from "@/lib/playground/snippet-meta.json";

export const runtime = "nodejs";
export const alt = "GPLMart Shopify Liquid snippet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ex = meta.find((e) => e.id === slug);
  const name = ex?.name ?? "Shopify snippet";
  const category = ex?.category ?? "GPLMart library";
  const free = ex?.free ?? false;
  const kind = ex?.kind === "section" ? "section" : "snippet";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #070b14 0%, #131b2e 60%, #24401a 100%)",
          color: "#eef0ff",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, display: "flex" }}>
          GPL<span style={{ color: "#c8f542" }}>Mart</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, color: "#c8f542" }}>{category}</div>
          <div style={{ fontSize: 84, fontWeight: 700, marginTop: 12 }}>{name}</div>
          <div style={{ fontSize: 34, color: "#a3aad1", marginTop: 20, display: "flex" }}>
            Shopify Liquid {kind} code - paste into any OS 2.0 theme
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a3aad1" }}>
          {free ? "FREE source code" : "Members source"} - gplmart.com/snippets/{slug}
        </div>
      </div>
    ),
    size,
  );
}
