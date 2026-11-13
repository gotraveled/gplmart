import fs from "node:fs";
import { zipSync, strToU8 } from "fflate";
import { hasAccess } from "@/lib/access-gate";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getProduct, productFilePath } from "@/lib/products";

const MIME: Record<string, string> = {
  ".pdf": "application/pdf",
  ".md": "text/markdown; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function contentType(file: string): string {
  return MIME[file.slice(file.lastIndexOf("."))] ?? "application/octet-stream";
}

function fileBuffer(fp: string): ArrayBuffer {
  const buf = fs.readFileSync(fp);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

function fileBytes(fp: string): Uint8Array {
  const buf = fs.readFileSync(fp);
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await hasAccess())) return new Response("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
  if (!rateLimit(`pdl:${clientIp(req.headers)}`, 30, 10 * 60_000)) return new Response("Too many requests", { status: 429 });

  const p = getProduct((await params).slug);
  if (!p) return new Response("Not found", { status: 404 });

  const url = new URL(req.url);
  const single = url.searchParams.get("file");

  if (single) {
    if (!p.files.includes(single)) return new Response("Not found", { status: 404 });
    const fp = productFilePath(p.slug, single);
    if (!fp) return new Response("Product file missing", { status: 500 });
    return new Response(fileBuffer(fp), {
      headers: {
        "Content-Type": contentType(single),
        "Content-Disposition": `attachment; filename="${single.split("/").pop()}"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-store",
      },
    });
  }

  const entries: Record<string, Uint8Array> = {};
  for (const rel of p.files) {
    const fp = productFilePath(p.slug, rel);
    if (!fp) return new Response("Product file missing", { status: 500 });
    entries[`${p.slug}/${rel}`] = fileBytes(fp);
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
