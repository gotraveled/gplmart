import { describe, expect, it, vi } from "vitest";
import { deliveryUrlFor, isAllowedDeliveryUrl, resolveAccess } from "./access-rules";
import { OFFER, formatOfferPrice } from "./offer";
import { rateLimit } from "./rate-limit";
import { buildPreviewDoc, filterSnippets, safeFilename } from "./snippet-utils";

describe("resolveAccess", () => {
  it("denies without an entitlement", () => {
    expect(resolveAccess({ hasEntitlement: false, isAdmin: false, contentReady: true })).toBe("no_entitlement");
  });
  it("holds entitled customers until content is ready", () => {
    expect(resolveAccess({ hasEntitlement: true, isAdmin: false, contentReady: false })).toBe("content_pending");
  });
  it("grants entitled customers when ready, and admins always", () => {
    expect(resolveAccess({ hasEntitlement: true, isAdmin: false, contentReady: true })).toBe("granted");
    expect(resolveAccess({ hasEntitlement: false, isAdmin: true, contentReady: false })).toBe("granted");
  });
});

describe("delivery URL protection", () => {
  it("never reads the URL for unauthorised states", async () => {
    const read = vi.fn(async () => "https://drive.google.com/x");
    expect(await deliveryUrlFor("no_entitlement", read)).toBeNull();
    expect(await deliveryUrlFor("content_pending", read)).toBeNull();
    expect(read).not.toHaveBeenCalled();
  });
  it("returns the URL only when granted and valid", async () => {
    expect(await deliveryUrlFor("granted", async () => "https://drive.google.com/drive/folders/abc")).toBe("https://drive.google.com/drive/folders/abc");
    expect(await deliveryUrlFor("granted", async () => "javascript:alert(1)")).toBeNull();
    expect(await deliveryUrlFor("granted", async () => "")).toBeNull();
  });
  it("only allows https google.com URLs", () => {
    expect(isAllowedDeliveryUrl("http://drive.google.com/x")).toBe(false);
    expect(isAllowedDeliveryUrl("https://evil-google.com/x")).toBe(false);
    expect(isAllowedDeliveryUrl("https://drive.google.com/x")).toBe(true);
  });
});

describe("offer", () => {
  it("defaults to INR 499 server-side", () => {
    expect(OFFER.pricePaise).toBe(49900);
    expect(OFFER.currency).toBe("INR");
    expect(formatOfferPrice()).toContain("499");
  });
});

describe("rate limit", () => {
  it("blocks after the limit within a window and resets after", () => {
    const k = `t-${Math.random()}`;
    expect([1, 2, 3].map(() => rateLimit(k, 2, 1000, 0))).toEqual([true, true, false]);
    expect(rateLimit(k, 2, 1000, 2000)).toBe(true);
  });
});

describe("snippet utilities", () => {
  const cats = [{ slug: "cart", name: "Cart" }, { slug: "nav", name: "Navigation" }];
  const items = [
    { slug: "a", title: "Shipping bar", description: "Free shipping", category_slug: "cart", tags: ["progress"], is_demo: false, version: "", compatibility: "" },
    { slug: "b", title: "Breadcrumbs", description: "Trail", category_slug: "nav", tags: ["a11y"], is_demo: false, version: "", compatibility: "" },
  ];
  it("searches title, description, category and tags", () => {
    expect(filterSnippets(items, cats, "shipping", "").map((s) => s.slug)).toEqual(["a"]);
    expect(filterSnippets(items, cats, "navigation", "").map((s) => s.slug)).toEqual(["b"]);
    expect(filterSnippets(items, cats, "a11y", "").map((s) => s.slug)).toEqual(["b"]);
  });
  it("filters by category", () => {
    expect(filterSnippets(items, cats, "", "cart")).toHaveLength(1);
    expect(filterSnippets(items, cats, "zzz", "")).toHaveLength(0);
  });
  it("builds previews with a locked-down CSP and no script allowance", () => {
    const doc = buildPreviewDoc("<p>x</p>");
    expect(doc).toContain("default-src 'none'");
    expect(doc).not.toContain("script-src");
  });
  it("sanitises download filenames", () => {
    expect(safeFilename("../../etc/passwd")).toBe("snippet.liquid");
    expect(safeFilename("my snippet.liquid")).toBe("my-snippet.liquid");
  });
});

import { checkoutOpen } from "./checkout-gate";

describe("checkout gate", () => {
  it("keeps live checkout closed unless explicitly enabled and content is ready", () => {
    expect(checkoutOpen({ testMode: false, liveEnabled: false, contentReady: true })).toBe(false);
    expect(checkoutOpen({ testMode: false, liveEnabled: true, contentReady: false })).toBe(false);
    expect(checkoutOpen({ testMode: false, liveEnabled: true, contentReady: true })).toBe(true);
    expect(checkoutOpen({ testMode: true, liveEnabled: false, contentReady: false })).toBe(true);
  });
});
