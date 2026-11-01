import { describe, expect, it } from "vitest";
import { tokenize, toLines } from "./highlight";
import { examples, getExample } from "./playground/examples";

describe("tokenize", () => {
  it("round-trips source exactly for every playground file", () => {
    for (const ex of examples) {
      const f = ex.files(ex.defaults);
      for (const [lang, code] of [["liquid", f.liquid], ["css", f.css], ["js", f.js], ["liquid", f.usage]] as const) {
        if (!code) continue;
        expect(tokenize(code, lang).map((t) => t.v).join("")).toBe(code);
      }
    }
  });
  it("colours liquid delimiters, keywords and filters", () => {
    const toks = tokenize("{% if x %}{{ y | default: 'a' }}{% endif %}", "liquid");
    expect(toks.some((t) => t.t === "delim" && t.v.includes("{{"))).toBe(true);
    expect(toks.some((t) => t.t === "keyword" && t.v === "if")).toBe(true);
    expect(toks.some((t) => t.t === "filter" && t.v.includes("default"))).toBe(true);
  });
  it("splits into lines without losing characters", () => {
    const code = "a\nb\n\nc";
    const lines = toLines(tokenize(code, "text"));
    expect(lines).toHaveLength(4);
    expect(lines.map((l) => l.map((t) => t.v).join("")).join("\n")).toBe(code);
  });
});

describe("playground examples", () => {
  it("ships a healthy set of examples with unique ids", () => {
    expect(examples.length).toBeGreaterThanOrEqual(14);
    expect(new Set(examples.map((e) => e.id)).size).toBe(examples.length);
  });
  it("every control has a default and every example produces Liquid", () => {
    for (const ex of examples) {
      for (const c of ex.controls) {
        expect(ex.defaults[c.id], `${ex.id}.${c.id}`).not.toBeUndefined();
      }
      const f = ex.files(ex.defaults);
      expect(f.liquid.length).toBeGreaterThan(20);
      expect(f.usage === undefined || f.usage.includes("render")).toBe(true);
    }
  });
  it("section examples carry a schema block", () => {
    for (const ex of examples.filter((e) => e.kind === "section")) {
      expect(ex.files(ex.defaults).liquid).toContain("{% schema %}");
    }
  });
  it("install guides exist for all examples", () => {
    for (const ex of examples) expect(ex.install.length).toBeGreaterThanOrEqual(3);
  });
  it("unknown ids fall back to the first example", () => {
    expect(getExample("nope").id).toBe(examples[0]!.id);
  });
});
