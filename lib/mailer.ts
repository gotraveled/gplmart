import "server-only";

/**
 * Transactional email via Resend (plain fetch - no SDK dependency).
 * Configure RESEND_API_KEY + EMAIL_FROM. When unset, sendMail is a no-op that
 * returns false so callers can fall back to Supabase's built-in auth emails.
 */
const apiKey = () => process.env.RESEND_API_KEY ?? "";
const from = () => process.env.EMAIL_FROM ?? "GPLMart <hello@gplmart.com>";

export function isMailerConfigured(): boolean {
  return Boolean(apiKey());
}

export async function sendMail(opts: { to: string; subject: string; html: string; text?: string }): Promise<boolean> {
  const key = apiKey();
  if (!key || !opts.to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: from(), to: [opts.to], subject: opts.subject, html: opts.html, text: opts.text }),
    });
    if (!res.ok) console.error("resend failed", res.status, (await res.text()).slice(0, 200));
    return res.ok;
  } catch (e) {
    console.error("resend error", e instanceof Error ? e.message : e);
    return false;
  }
}

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gplmart.com").replace(/\/$/, "");
}
