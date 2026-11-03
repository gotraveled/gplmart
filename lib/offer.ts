/**
 * Single authoritative definition of the all-access offer.
 * The amount used for Razorpay orders is ALWAYS read here on the server; any
 * amount sent by the browser is ignored.
 * Change the price with ALL_ACCESS_PRICE_PAISE (49900 = INR 499.00).
 */
export const OFFER = {
  plan: "all_access",
  name: "GPLMart All-Access",
  currency: "INR",
  pricePaise: parsePaise(process.env.ALL_ACCESS_PRICE_PAISE),
  /** Optional paid add-on: extend members-area access from 30 days to 12 months. */
  extendedAddon: "extended_access_12m",
  extendedAddonPaise: 49900,
} as const;

function parsePaise(raw: string | undefined): number {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 100 ? n : 49900;
}

export function formatOfferPrice(paise: number = OFFER.pricePaise): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: OFFER.currency,
    maximumFractionDigits: paise % 100 ? 2 : 0,
  }).format(paise / 100);
}
