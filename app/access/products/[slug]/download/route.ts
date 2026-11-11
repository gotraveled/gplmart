import fs from "node:fs";
import { zipSync, strToU8 } from "fflate";
import { hasAccess } from "@/lib/access-gate";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getProduct, productFilePath } from "@/lib/products";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await hasAccess())) return new Response("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
  if (!rateLimit(`pdl:${clientIp(req.headers)}`, 30, 10 * 60_000)) return new Response("Too many requests", { status: 429 });

  const p = getProduct((await params).slug);
  if (!p) return new Response("Not found", { status: 404 });

  const entries: Record<string, Uint8Array> = {};
  for (const rel of p.files) {
    const fp = productFilePath(p.slug, rel);
    if (!fp) return new Response("Product file missing", { status: 500 });
    entries[`${p.slug}/${rel}`] = strToU8(fs.readFileSync(fp, "utf8"));
  }
  const zipped = zipSync(entries, { level: 6 });
  return new Response(zipped, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="gplmart-${p.slug}.zip"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
