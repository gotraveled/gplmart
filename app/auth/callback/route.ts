import { NextResponse } from "next/server";
import { grantAccess } from "@/lib/access-gate";
import { safeNext } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { createServiceClient } from "@/lib/supabase/admin";
import { createSessionClient } from "@/lib/supabase/server";
import { ilikeEmail } from "@/lib/members";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const explicitNext = url.searchParams.get("next");
  const next = safeNext(explicitNext);
  if (code && isSupabaseConfigured()) {
    const supabase = await createSessionClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Magic-link emails also unlock the members area when the email has a paid
      // order - but only when no explicit destination was requested (password
      // reset links always carry next=/reset-password).
      const email = data.user?.email ?? "";
      if (!explicitNext && email) {
        const { data: order } = await createServiceClient()
          .from("orders")
          .select("id")
          .ilike("customer_email", ilikeEmail(email))
          .eq("status", "paid")
          .limit(1)
          .maybeSingle();
        if (order) {
          await grantAccess();
          return NextResponse.redirect(new URL("/access", url.origin));
        }
      }
      return NextResponse.redirect(new URL(next, url.origin));
    }
  }
  return NextResponse.redirect(new URL("/access?error=callback", url.origin));
}
