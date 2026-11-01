export interface AccessContext {
  hasEntitlement: boolean;
  isAdmin: boolean;
  contentReady: boolean;
}

export type AccessState = "granted" | "no_entitlement" | "content_pending";

/** Admins can preview protected areas. Customers need an active entitlement AND the content marked ready. */
export function resolveAccess(ctx: AccessContext): AccessState {
  if (ctx.isAdmin) return "granted";
  if (!ctx.hasEntitlement) return "no_entitlement";
  return ctx.contentReady ? "granted" : "content_pending";
}

/** The delivery URL is only read (and therefore only returned) when access is granted. */
export async function deliveryUrlFor(state: AccessState, readUrl: () => Promise<string>): Promise<string | null> {
  if (state !== "granted") return null;
  const url = (await readUrl()).trim();
  return isAllowedDeliveryUrl(url) ? url : null;
}

export function isAllowedDeliveryUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" && (u.hostname === "google.com" || u.hostname.endsWith(".google.com"));
  } catch {
    return false;
  }
}
