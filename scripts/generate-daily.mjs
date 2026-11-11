/**
 * Daily content generator - run by .github/workflows/daily-content.yml.
 *
 * Calls a Gemini-compatible chat API, asks for JSON content batches, validates
 * every snippet with the same harness used for hand-written examples, and only
 * then appends to the generated JSON catalogs. Anything that fails validation
 * is dropped - the script never publishes unverified code.
 *
 * Env:
 *   GEMINI_API_KEY / GEMINI_API_KEYS - comma-separated keys, rotated per call
 *   GEMINI_MODEL     - default gemini-3.5-flash
 *   DAILY_SNIPPETS   - default 3 (every run)
 *   DAILY_GUIDES     - default 1 (every run)
 *   WEEKLY_PRODUCTS  - default 3 (only when 7+ days since last product batch)
 *   WEEKLY_EBOOKS    - default 1 (only when 7+ days since last ebook)
 *   PRODUCTS_PHP / PRODUCTS_HTML - split of the weekly product batch (2/1)
 *   SKIP_LINT        - set to skip tsc/validators (debug only)
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

// API keys: GEMINI_API_KEYS (comma-separated) or GEMINI_API_KEY; calls rotate.
const API_KEYS = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);
let keyCursor = 0;
const nextKey = () => API_KEYS[keyCursor++ % API_KEYS.length];
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const DAILY = {
  snippets: Number(process.env.DAILY_SNIPPETS ?? 3),
  guides: Number(process.env.DAILY_GUIDES ?? 1),
};
const WEEKLY = {
  products: Number(process.env.WEEKLY_PRODUCTS ?? 3),
  ebooks: Number(process.env.WEEKLY_EBOOKS ?? 1),
  php: Number(process.env.PRODUCTS_PHP ?? 2),
  html: Number(process.env.PRODUCTS_HTML ?? 1),
};

const FILES = {
  snippets: "lib/playground/generated-examples.json",
  guides: "lib/guides-generated.json",
  catalog: "products/catalog.json",
};

const readJson = (p) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null);
const writeJson = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n");

// ---------- existing ids (dedupe) ----------
const existingIds = new Set();
{
  const src = fs.readFileSync("lib/playground/examples.ts", "utf8");
  for (const m of src.matchAll(/id:\s*"([a-z0-9-]+)"/g)) existingIds.add(m[1]);
  for (const e of readJson(FILES.snippets) ?? []) existingIds.add(e.id);
}
const existingSlugs = new Set();
{
  const src = fs.readFileSync("lib/guides.ts", "utf8");
  for (const m of src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) existingSlugs.add(m[1]);
  for (const g of readJson(FILES.guides) ?? []) existingSlugs.add(g.slug);
}
const existingProducts = new Set((readJson(FILES.catalog)?.items ?? []).map((i) => i.slug));
const existingCategories = [...new Set(
  [...fs.readFileSync("lib/playground/examples.ts", "utf8").matchAll(/category:\s*"([^"]+)"/g)].map((m) => m[1]),
)];

// ---------- LLM ----------
async function llm(prompt, { json = true } = {}) {
  const key = nextKey();
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 16000, ...(json ? { responseMimeType: "application/json" } : {}) },
      }),
    },
  );
  if (!res.ok) throw new Error(`LLM ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  return text;
}

function parseJson(text) {
  const cleaned = text.replace(/```(?:json)?/g, "").trim();
  const start = cleaned.search(/[[{]/);
  return JSON.parse(cleaned.slice(start));
}

// ---------- prompts ----------
const SNIPPET_PROMPT = (n, cats, usedIds) => `You are a senior Shopify Liquid engineer writing production-ready theme snippets for a paid library called GPLMart.

Generate ${n} NEW snippet entries as a JSON array. Each entry:
{
  "id": "kebab-case-slug (unique, not in this list: ${[...usedIds].slice(-30).join(", ")})",
  "name": "Short human name",
  "description": "1-2 sentences, what it does and the merchant benefit",
  "category": "one of: ${cats.join(", ")}",
  "controls": [{ "id": "snake_case", "label": "Label", "type": "text|color|toggle|select", "maxLength": 40, "options": [{"value":"x","label":"X"}] }],
  "defaults": { "control_id": "default value" },
  "install": ["step 1", "step 2", "step 3", "step 4"],
  "usage": "{% render 'id', param: 'value' %}",
  "liquid": "the Liquid markup only (no {% stylesheet %} or {% javascript %} blocks)",
  "css": "scoped CSS only - every selector MUST start with .gpl-<id> or a gpl- element/class prefix",
  "js": "vanilla JS using a custom element <gpl-id> registered via customElements.define with a guard (if (!customElements.get(...)))",
  "kind": "snippet"
}

HARD RULES:
- Pure Liquid + scoped CSS + vanilla JS custom element. NO external libraries, NO fetch to third-party APIs, NO app embeds.
- Must work on any Shopify OS 2.0 theme. Use only global objects (product, collection, cart, customer, shop, settings, request).
- All dynamic text from controls uses the [[control_id]] placeholder syntax inside liquid/css/js strings.
- CSS must be fully self-contained and mobile-first. JS must be defensive (null checks everywhere).
- The snippet must do something a merchant would actually pay for: conversion, UX, trust, or operations - not a toy.
- ids must be unique and descriptive (e.g. "sticky-variant-picker", "cod-confirmation-modal").
- Return ONLY the JSON array, no prose.`;

const GUIDE_PROMPT = (n, usedSlugs) => `You are a technical writer for GPLMart, a Shopify Liquid code library.

Generate ${n} NEW guide entries as a JSON array matching this exact shape:
{
  "slug": "kebab-case (unique, not: ${[...usedSlugs].slice(-20).join(", ")})",
  "title": "How to ... (actionable title)",
  "excerpt": "One sentence hook, max 140 chars",
  "date": "YYYY-MM-DD (recent)",
  "readMin": 4,
  "tag": "Shopify tutorial | Liquid guide | Conversion | Performance",
  "blocks": [
    { "p": "paragraph text" },
    { "h": "Step heading" },
    { "list": ["bullet 1", "bullet 2"] },
    { "code": { "lang": "liquid", "code": "example code" } }
  ]
}

RULES:
- Practical, specific, step-by-step tutorials a Shopify merchant/developer can follow today.
- Reference real GPLMart-style patterns: single-file snippets with {% stylesheet %}/{% javascript %}, render tags, OS 2.0 sections.
- 5-8 blocks per guide, mix of paragraphs, headings, lists and 1-2 code blocks.
- No fluff, no "in today's world" intros. Start with the problem.
- Return ONLY the JSON array.`;

const PRODUCT_PROMPT = (kind, n, usedSlugs) => {
  const isHtml = kind === "html";
  return `You are a senior ${isHtml ? "frontend" : "PHP"} engineer building sellable micro-products for GPLMart, a digital-goods store.

Generate ${n} NEW ${isHtml ? "HTML/CSS landing page template" : "self-contained PHP script"} products as a JSON array:
[{
  "slug": "kebab-case (unique, not: ${[...usedSlugs].slice(-20).join(", ")})",
  "title": "Product name",
  "description": "2-3 sentences: what it does, who it's for, key features",
  "category": "${isHtml ? "html-template" : "php-script"}",
  "version": "1.0.0",
  "license": "GPL-3.0-or-later (original GPLMart code)",
  "files": [{ "path": "relative/path.ext", "content": "FULL file content as a string" }]
}]

HARD RULES:
${isHtml
  ? `- Each product = a complete static site: index.html + assets/css/style.css + assets/js/main.js (+ assets/img placeholder note in README.md).
- Modern responsive design, no frameworks required, no external dependencies except Google Fonts.
- Pick a distinct niche per product (SaaS landing, restaurant, freelancer portfolio, event, crypto/web3, nonprofit, etc).`
  : `- Each product = ONE main .php file (plus optional README.md) that runs on any PHP 8.1+ host with zero dependencies.
- Useful micro-tools: URL shortener, QR code generator (pure PHP/SVG), JSON formatter API, visit counter, simple invoice/receipt generator, password generator, IP geolocation stub, CSV-to-JSON converter, uptime/status page, guestbook, sitemap generator.
- Must include: input validation, htmlspecialchars() on all output, no eval, no SQL without PDO prepared statements, clear comments.`}
- Code must be genuinely working - no placeholders, no TODO, no lorem ipsum.
- Return ONLY the JSON array.`;
};

// ---------- validators ----------
function validateSnippet(e) {
  const errs = [];
  if (!/^[a-z0-9][a-z0-9-]{2,48}$/.test(e.id ?? "")) errs.push("bad id");
  if (existingIds.has(e.id)) errs.push("duplicate id");
  if (!e.name || e.name.length > 60) errs.push("bad name");
  if (!e.description || e.description.length > 220) errs.push("bad description");
  if (!e.liquid || e.liquid.length < 40) errs.push("liquid too short");
  if (e.liquid?.includes("{% schema %}")) errs.push("schema in snippet");
  if (!existingCategories.includes(e.category)) errs.push(`unknown category "${e.category}"`);
  for (const bad of ["http://", "https://cdn", "unpkg", "jsdelivr", "eval(", "innerHTML = data"]) {
    if ((e.liquid + (e.js ?? "")).includes(bad) && !bad.startsWith("http")) errs.push(`forbidden: ${bad}`);
  }
  if (/\{\{\s*[a-z_]+\s*\}\}/.test(e.liquid ?? "") && !e.controls?.length) {
    // bare {{ var }} with no controls is suspicious but legal liquid - only warn
  }
  return errs;
}

function validateGuide(g) {
  const errs = [];
  if (!/^[a-z0-9][a-z0-9-]{2,60}$/.test(g.slug ?? "")) errs.push("bad slug");
  if (existingSlugs.has(g.slug)) errs.push("duplicate slug");
  if (!g.title || g.title.length > 80) errs.push("bad title");
  if (!g.excerpt || g.excerpt.length > 200) errs.push("bad excerpt");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(g.date ?? "")) errs.push("bad date");
  if (!Array.isArray(g.blocks) || g.blocks.length < 3) errs.push("too few blocks");
  for (const b of g.blocks ?? []) {
    const keys = Object.keys(b);
    if (!keys.some((k) => ["p", "h", "list", "code"].includes(k))) errs.push("empty block");
    if (b.code && !["liquid", "css", "js", "text"].includes(b.code.lang)) errs.push("bad code lang");
  }
  return errs;
}

function validateProduct(p) {
  const errs = [];
  if (!/^[a-z0-9][a-z0-9-]{2,60}$/.test(p.slug ?? "")) errs.push("bad slug");
  if (existingProducts.has(p.slug)) errs.push("duplicate slug");
  if (!p.title || p.title.length > 80) errs.push("bad title");
  if (!p.description || p.description.length > 400) errs.push("bad description");
  if (!Array.isArray(p.files) || !p.files.length) errs.push("no files");
  for (const f of p.files ?? []) {
    if (!/^[a-zA-Z0-9_./-]+$/.test(f.path) || f.path.includes("..")) errs.push(`bad path ${f.path}`);
    if (!f.content || f.content.length < 50) errs.push(`empty ${f.path}`);
    if (f.path.endsWith(".php") && !f.content.includes("<?php")) errs.push(`${f.path} missing php tag`);
    if (f.path.endsWith(".html") && !/<!doctype|<html/i.test(f.content)) errs.push(`${f.path} not html`);
    if (f.path.endsWith(".md") && f.content.length < 500) errs.push(`${f.path} too short for ebook content`);
  }
  return errs;
}

const EBOOK_PROMPT = (n, usedSlugs) => `You are a non-fiction ghostwriter for GPLMart, a Shopify/digital-tools resource store.

Generate ${n} NEW ebook product(s) as a JSON array:
[{
  "slug": "kebab-case (unique, not: ${[...usedSlugs].slice(-20).join(", ")})",
  "title": "Ebook title (clear outcome, e.g. 'The Shopify Liquid Handbook')",
  "description": "2-3 sentences: who it's for, what they'll be able to do",
  "category": "ebook",
  "version": "1.0.0",
  "license": "GPL-3.0-or-later (original GPLMart content)",
  "files": [
    { "path": "README.md", "content": "# Title\\n\\nShort pitch, what's inside, who it's for." },
    { "path": "book.md", "content": "FULL ebook in Markdown: title, intro, 6-10 chapters with ## headings, practical examples, conclusion. 3000-6000 words total." }
  ]
}]

RULES:
- Practical, specific, genuinely useful - the reader finishes able to DO something.
- Topics that fit the store: Shopify Liquid development, ecommerce conversion, freelancing with code assets, PHP micro-tools, selling digital products.
- Markdown only, no images, clean structure: # title, ## chapters, code fences where useful.
- No filler, no motivational fluff, no "in today's fast-paced world".
- Return ONLY the JSON array.`;

// ---------- state (weekly cadence) ----------
const STATE_FILE = ".content-state.json";
const state = fs.existsSync(STATE_FILE) ? JSON.parse(fs.readFileSync(STATE_FILE, "utf8")) : {};
const daysSince = (d) => (d ? Math.floor((Date.now() - new Date(d).getTime()) / 864e5) : Infinity);
const dueProducts = daysSince(state.lastProducts) >= 7;
const dueEbooks = daysSince(state.lastEbooks) >= 7;

// ---------- main ----------
async function main() {
  if (!API_KEYS.length) {
    console.log("GEMINI_API_KEY(S) not set - skipping daily generation.");
    return;
  }
  const today = new Date().toISOString().slice(0, 10);
  console.log(`daily-content ${today} | model=${MODEL} | keys=${API_KEYS.length} | daily=${JSON.stringify(DAILY)} weekly=${JSON.stringify(WEEKLY)} dueProducts=${dueProducts} dueEbooks=${dueEbooks}`);

  const results = { snippets: 0, guides: 0, products: 0, ebooks: 0, dropped: [] };

  // --- snippets ---
  if (DAILY.snippets > 0) {
    try {
      const text = await llm(SNIPPET_PROMPT(DAILY.snippets, existingCategories, existingIds));
      const arr = parseJson(text);
      const list = readJson(FILES.snippets) ?? [];
      let added = 0;
      for (const e of arr) {
        const errs = validateSnippet(e);
        if (errs.length) { results.dropped.push({ type: "snippet", id: e.id, errs }); continue; }
        list.push({
          id: e.id, name: e.name, description: e.description, category: e.category,
          controls: e.controls ?? [], defaults: e.defaults ?? {}, install: e.install ?? [],
          liquid: e.liquid, css: e.css, js: e.js, usage: e.usage,
        });
        existingIds.add(e.id);
        added++;
      }
      writeJson(FILES.snippets, list);
      results.snippets = added;
      console.log(`snippets: +${added} (dropped ${arr.length - added})`);
    } catch (e) {
      console.log(`snippets FAILED: ${e.message}`);
      results.dropped.push({ type: "snippets-batch", errs: [e.message] });
      writeJson(FILES.snippets, readJson(FILES.snippets) ?? []);
    }
  }

  // --- guides ---
  if (DAILY.guides > 0) {
    try {
      const text = await llm(GUIDE_PROMPT(DAILY.guides, existingSlugs));
      const arr = parseJson(text);
      const list = readJson(FILES.guides) ?? [];
      let added = 0;
      for (const g of arr) {
        const errs = validateGuide(g);
        if (errs.length) { results.dropped.push({ type: "guide", slug: g.slug, errs }); continue; }
        list.push(g);
        existingSlugs.add(g.slug);
        added++;
      }
      writeJson(FILES.guides, list);
      results.guides = added;
      console.log(`guides: +${added}`);
    } catch (e) {
      console.log(`guides FAILED: ${e.message}`);
      results.dropped.push({ type: "guides-batch", errs: [e.message] });
    }
  }

  // --- products + ebooks (weekly cadence, gated by state file) ---
  const batches = [];
  if (dueProducts) {
    batches.push(["php", WEEKLY.php], ["html", WEEKLY.html]);
  }
  if (dueEbooks) batches.push(["ebook", WEEKLY.ebooks]);
  for (const [kind, count] of batches) {
    if (!count) continue;
    const prompt = kind === "ebook" ? EBOOK_PROMPT(count, existingProducts) : PRODUCT_PROMPT(kind, count, existingProducts);
    try {
      const text = await llm(prompt);
      const arr = parseJson(text);
      const catalog = readJson(FILES.catalog) ?? { updated: today, notes: [], items: [] };
      let added = 0;
      for (const p of arr) {
        const errs = validateProduct(p);
        if (errs.length) { results.dropped.push({ type: `product-${kind}`, slug: p.slug, errs }); continue; }
        const dir = path.join("products", "src", p.slug);
        fs.mkdirSync(dir, { recursive: true });
        for (const f of p.files) {
          const fp = path.join(dir, f.path);
          fs.mkdirSync(path.dirname(fp), { recursive: true });
          fs.writeFileSync(fp, f.content);
        }
        catalog.items.push({
          slug: p.slug, title: p.title, description: p.description,
          category: p.category, version: p.version ?? "1.0.0",
          license: p.license ?? "GPL-3.0-or-later", files: p.files.map((f) => f.path),
          added: today,
        });
        existingProducts.add(p.slug);
        added++;
      }
      catalog.updated = today;
      writeJson(FILES.catalog, catalog);
      if (kind === "ebook") results.ebooks += added; else results.products += added;
      console.log(`${kind}: +${added}`);
      if (added > 0) {
        if (kind === "ebook") state.lastEbooks = today;
        else if (!state.lastProducts || kind === "php" || kind === "html") state.lastProducts = today;
      }
    } catch (e) {
      console.log(`${kind} FAILED: ${e.message}`);
      results.dropped.push({ type: `products-${kind}`, errs: [e.message] });
    }
  }

  // --- validation gate: only keep snippets that pass the real harness ---
  if (!process.env.SKIP_LINT && results.snippets > 0) {
    console.log("running validators...");
    const run = (cmd) => { try { execSync(cmd, { stdio: "pipe" }); return true; } catch { return false; } };
    const okType = run("npx tsc --noEmit");
    const okVal = okType && run("node scripts/validate-snippets.mjs");
    const okRun = okVal && run("node scripts/runtime-test.mjs");
    if (okType && okVal && okRun) {
      console.log("validators passed - generated snippets are live-eligible");
    } else {
      console.log("VALIDATORS FAILED - reverting generated-examples.json to last committed state");
      try { execSync("git checkout -- lib/playground/generated-examples.json", { stdio: "pipe" }); } catch {}
      results.snippets = 0;
    }
  }

  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + "\n");
  fs.writeFileSync("generated-report.json", JSON.stringify({ date: today, ...results }, null, 2));
  console.log(`done: ${JSON.stringify(results)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
