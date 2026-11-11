import { zipSync, strToU8 } from "fflate";
import { hasAccess } from "@/lib/access-gate";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getPack, packSnippets } from "@/lib/packs";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await hasAccess())) return new Response("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
  if (!rateLimit(`pck:${clientIp(req.headers)}`, 30, 10 * 60_000)) return new Response("Too many requests", { status: 429 });

  const pack = getPack((await params).slug);
  if (!pack) return new Response("Not found", { status: 404 });
  const items = packSnippets(pack);
  if (!items.length) return new Response("Pack is empty", { status: 500 });

  const entries: Record<string, Uint8Array> = {};
  const readme = [
    `# ${pack.title}`,
    ``,
    pack.description,
    ``,
    `Included snippets (${items.length}):`,
    ...items.map((s) => `- ${s.example.name} -> ${s.file}`),
    ``,
    `Install: back up your theme, create each file under the matching folder`,
    `(snippets/ or sections/), then render or add via the theme editor.`,
    `Every file is self-contained - Liquid with embedded {% stylesheet %} and {% javascript %}.`,
    ``,
    `License: GPL-3.0-or-later (GPLMart original). See gplmart.com/licensing`,
    ``,
  ].join("\n");
  entries["README.md"] = strToU8(readme);
  for (const s of items) entries[`${pack.slug}/${s.file}`] = strToU8(s.code);

  const zipped = zipSync(entries, { level: 6 });
  return new Response(zipped, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="gplmart-pack-${pack.slug}.zip"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
