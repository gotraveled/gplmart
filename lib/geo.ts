/**
 * Geo pricing: India pays in INR, the rest of the world in USD.
 * Resolved from the visitor's country - never trusted from the client.
 */
export const GEO_PRICE = {
  in: { currency: "INR", units: 49900, display: "₹499" },
  intl: { currency: "USD", units: 499, display: "$4.99" },
} as const;

export type GeoTier = keyof typeof GEO_PRICE;

/** India gets INR pricing; every other country (US, CA, EU, ...) gets USD. */
export function geoTier(country: string | null | undefined): GeoTier {
  return country?.toUpperCase() === "IN" ? "in" : "intl";
}

export function geoPrice(country: string | null | undefined) {
  return GEO_PRICE[geoTier(country)];
}

/** Vercel injects x-vercel-ip-country on edge requests; unknown country falls back to USD pricing. */
export function countryFromHeaders(headers: Headers): string | null {
  return headers.get("x-vercel-ip-country") ?? headers.get("cf-ipcountry");
}
