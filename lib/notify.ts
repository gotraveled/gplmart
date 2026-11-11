import "server-only";
import { sendMail } from "@/lib/mailer";

const adminEmail = () => process.env.ADMIN_NOTIFY_EMAIL ?? "vijay0262@gmail.com";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Internal notification email to the store owner. No-op when mailer isn't configured. */
export async function notifyAdmin(subject: string, fields: Record<string, string | number | null | undefined>): Promise<void> {
  const to = adminEmail();
  if (!to) return;
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `<tr><td style="padding:4px 14px 4px 0;color:#666;white-space:nowrap">${esc(k)}</td><td><b>${esc(String(v))}</b></td></tr>`)
    .join("");
  await sendMail({
    to,
    subject: `[GPLMart] ${subject}`,
    text: `${subject}\n\n${Object.entries(fields).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
    html: `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;color:#111">
<h3 style="margin-bottom:12px">${esc(subject)}</h3>
<table style="border-collapse:collapse;font-size:14px">${rows}</table>
<p style="color:#999;font-size:12px;margin-top:16px">Sent automatically by gplmart.com</p></div>`,
  }).catch(() => false);
}
