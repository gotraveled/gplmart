import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/contact", "/licensing", "/refund-policy", "/privacy-policy", "/terms"].map((p) => ({
    url: absoluteUrl(p),
    priority: p === "/" ? 1 : 0.6,
  }));
}
