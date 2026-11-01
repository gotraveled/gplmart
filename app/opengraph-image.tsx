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
          background: "linear-gradient(135deg, #060818 0%, #1a2050 60%, #3b2f9e 100%)",
          color: "#eef0ff",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, display: "flex" }}>
          GPL<span style={{ color: "#8b7cff" }}>Mart</span>
        </div>
        <div style={{ fontSize: 40, color: "#a3aad1", marginTop: 24 }}>
          Digital products and resources for builders of the web
        </div>
      </div>
    ),
    size,
  );
}
