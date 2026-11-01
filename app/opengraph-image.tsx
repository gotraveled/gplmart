import { ImageResponse } from "next/og";

export const alt = "GPLMart - digital products and resources marketplace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #070b14 0%, #131b2e 60%, #24401a 100%)",
          color: "#eef0ff",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, display: "flex" }}>
          GPL<span style={{ color: "#c8f542" }}>Mart</span>
        </div>
        <div style={{ fontSize: 40, color: "#a3aad1", marginTop: 24 }}>
          Shopify Liquid code and storefront components
        </div>
      </div>
    ),
    size,
  );
}
