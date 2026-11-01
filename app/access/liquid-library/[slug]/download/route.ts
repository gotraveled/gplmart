import { getAccessState, getUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getPublishedSnippet } from "@/lib/snippets";
import { safeFilename } from "@/lib/snippet-utils";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!isSupabaseConfigured()) return new Response("Not configured", { status: 503 });
  const user = await getUser();
  if (!user) return new Response("Sign in required", { status: 401, headers: { "Cache-Control": "no-store" } });
  if ((await getAccessState(user)) !== "granted") return new Response("Forbidden", { status: 403, headers: { "Cache-Control": "no-store" } });
  if (!rateLimit(`dl:${user.id}:${clientIp(req.headers)}`, 60, 10 * 60_000)) return new Response("Too many requests", { status: 429 });

  const snippet = await getPublishedSnippet((await params).slug);
  if (!snippet) return new Response("Not found", { status: 404 });
  return new Response(snippet.code, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeFilename(snippet.filename)}"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
