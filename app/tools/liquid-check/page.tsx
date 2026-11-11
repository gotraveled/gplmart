import type { Metadata } from "next";
import { hasAccess } from "@/lib/access-gate";
import { LiquidChecker } from "./checker";

export const metadata: Metadata = {
  title: "Free Liquid syntax checker",
  description:
    "Paste Shopify Liquid and get instant syntax errors and best-practice warnings - deprecated tags, missing schema, external requests. Free tool, no signup.",
  alternates: { canonical: "/tools/liquid-check" },
};

export const dynamic = "force-dynamic";

export default async function LiquidCheckPage() {
  const member = await hasAccess();
  return <LiquidChecker member={member} />;
}
