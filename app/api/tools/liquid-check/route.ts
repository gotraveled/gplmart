import { Liquid } from "liquidjs";
import { hasAccess } from "@/lib/access-gate";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const liquid = new Liquid({ strictVariables: false, strictFilters: false, greedy: false });

const MAX_LEN = 100_000;

interface Finding {
  severity: "error" | "warning" | "info";
  message: string;
  line?: number;
}

export async function POST(req: Request) {
  const member = await hasAccess();
  const limit = member ? 120 : 20;
  const windowMs = 60 * 60_000;
  if (!rateLimit(`lc:${clientIp(req.headers)}`, limit, windowMs)) {
    return Response.json({ error: `Rate limit reached (${limit}/hour${member ? " member" : ""}). Try again later.` }, { status: 429 });
  }

  let code = "";
  try {
    const body = await req.json();
    code = String(body.code ?? "").slice(0, MAX_LEN);
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!code.trim()) return Response.json({ error: "Paste some Liquid first." }, { status: 400 });

  const findings: Finding[] = [];
  let ok = true;

  try {
    liquid.parse(code);
  } catch (e) {
    ok = false;
    const err = e as { message?: string; token?: { getPosition?: () => { getLine?: () => number } } };
    let line: number | undefined;
    try {
      const pos = err.token?.getPosition?.();
      line = pos?.getLine?.();
    } catch { /* ignore */ }
    findings.push({ severity: "error", message: err.message ?? "Liquid parse error", line });
  }

  // Heuristic warnings (parse can't catch these)
  const includeRe = /\{%\s*-?\s*include\b/g;
  if (includeRe.test(code)) {
    findings.push({ severity: "warning", message: "{% include %} is deprecated in OS 2.0 - prefer {% render %} (render isolates scope and is faster)." });
  }
  if (/\{%\s*-?\s*style\b/.test(code)) {
    findings.push({ severity: "warning", message: "{% style %} only works in sections - use {% stylesheet %} for snippets and sections on OS 2.0." });
  }
  if (!/\{%\s*-?\s*schema\b/.test(code) && /\{\{\s*section\.settings/.test(code)) {
    findings.push({ severity: "warning", message: "Uses section.settings but has no {% schema %} block - the theme editor won't show settings for it." });
  }
  const renders = (code.match(/\{%\s*-?\s*render\b/g) ?? []).length;
  if (renders > 8) findings.push({ severity: "info", message: `${renders} render tags - deep nesting slows render time; consider consolidating.` });
  const external = code.match(/https?:\/\/[^\s"')]+/g) ?? [];
  const nonShopify = external.filter((u) => !/shopify|cdn\.shopify|fonts\.googleapis|fonts\.gstatic/.test(u));
  if (nonShopify.length) findings.push({ severity: "warning", message: `${nonShopify.length} external URL(s) detected (${nonShopify[0]?.slice(0, 60)}…) - external requests can hurt page speed and break if the host changes.` });

  return Response.json({ ok, findings, member, limit });
}
