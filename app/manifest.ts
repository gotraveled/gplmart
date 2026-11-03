import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GPLMart",
    short_name: "GPLMart",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070b14",
    theme_color: "#070b14",
    icons: [
      { src: "/app/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/app/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
  };
}
