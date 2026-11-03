import { json } from "@/lib/http";
import { countryFromHeaders, geoPrice, geoTier } from "@/lib/geo";

export function GET(req: Request) {
  const country = countryFromHeaders(req.headers);
  return json({ country, tier: geoTier(country), ...geoPrice(country) });
}
