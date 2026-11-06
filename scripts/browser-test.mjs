/* Real-browser snippet test.
   Renders every example (originals + generated section variants) with mocked Shopify data,
   loads it in Chromium with mocked storefront endpoints, fast-forwards timers, clicks the
   controls and reports JS errors, failed styles and mobile overflow.
   Needs playwright-core + a Chromium build (CHROME_PATH or the ms-playwright cache). */
import { createRequire } from "node:module";
import path from "node:path";
const require = createRequire(import.meta.url);
const tryReq = (n) => { try { return require(n); } catch { return require(require.resolve(n, { paths: [path.join(process.env.TEMP ?? "/tmp", "pw")] })); } };
const { chromium } = tryReq("playwright-core");
const { Liquid, Hash } = require("liquidjs");
const ts = require("typescript");
const fs = require("node:fs");

const src = ts.transpileModule(fs.readFileSync("lib/playground/examples.ts", "utf8"), { compilerOptions: { module: "commonjs" } }).outputText;
const m = { exports: {} };
new Function("module", "exports", "require", src)(m, m.exports, (n) => (n === "./types" ? {} : require(n)));
const { examples, asSectionFile, hasSectionVariant } = m.exports;

const img = { src: "/img.png", width: 600, height: 600, aspect_ratio: 1, alt: "x" };
const mkProduct = (i) => ({
  id: i, title: `Product ${i}`, handle: `p${i}`, url: `/products/p${i}`, price: 49900, compare_at_price: 59900, available: true, vendor: "ACME", type: "Shirt", tags: ["a", "b"],
  featured_image: img, images: [img, img, img], media: [], metafields: {}, description: "Nice product", quantity_rule: { min: 1, max: null, increment: 1 },
  selected_or_first_available_variant: { id: 100 + i, title: "M", price: 49900, available: true, inventory_quantity: 7, inventory_management: "shopify", sku: "S1", barcode: "1", featured_image: img },
  variants: [{ id: 100 + i, title: "M", price: 49900, available: true, inventory_quantity: 7 }, { id: 200 + i, title: "L", price: 49900, available: true, inventory_quantity: 3 }],
  options: ["Size"], options_with_values: [{ name: "Size", values: ["S", "M", "L"], selected_value: "M" }],
});
const products = [1, 2, 3, 4, 5, 6, 7, 8].map(mkProduct);
const collection = { title: "Collection", handle: "all", url: "/collections/all", image: img, products, products_count: 8, all_products_count: 8, description: "d" };
const menu = { title: "Main", links: [
  { title: "Home", url: "/", links: [] },
  { title: "Shop", url: "/collections/all", links: [{ title: "Women", url: "/collections/women", links: [{ title: "Dresses", url: "/d", links: [] }] }, { title: "Men", url: "/collections/men", links: [] }] },
  { title: "About", url: "/pages/about", links: [] },
] };
const baseScope = () => ({
  product: products[0], collection, collections: { all: collection, frontpage: collection }, all_products: Object.fromEntries(products.map((p) => [p.handle, p])),
  cart: { item_count: 2, total_price: 99800, currency: { iso_code: "INR" }, items: [{ key: "k", quantity: 1, product_title: "Product 1", final_line_price: 49900, image: "/img.png", url: "/products/p1" }] },
  routes: { root_url: "/", cart_url: "/cart", cart_add_url: "/cart/add", search_url: "/search", collections_url: "/collections", account_url: "/account", account_login_url: "/account/login", account_register_url: "/account/register", product_recommendations_url: "/recommendations/products", predictive_search_url: "/search/suggest", all_products_collection_url: "/collections/all", cart_change_url: "/cart/change", cart_update_url: "/cart/update" },
  shop: { name: "Test store", url: "https://shop.test", money_format: "₹{{amount}}", currency: "INR", metafields: {} },
  settings: {}, customer: null, request: { design_mode: false, host: "shop.test", page_type: "product" }, template: "product", page_title: "T",
  linklists: { "main-menu": menu }, page: { title: "Page", content: "c", url: "/pages/p" }, article: { title: "A", author: "Au", content: "<h2>One</h2><p>x</p>", url: "/blogs/n/a", published_at: "2024-01-01", image: img, excerpt: "e", tags: [] },
  blog: { title: "News", articles: [], url: "/blogs/news" }, search: { terms: "x", results: products, results_count: 8, performed: true },
  localization: { country: { iso_code: "IN", name: "India", currency: { iso_code: "INR", symbol: "₹" } }, language: { iso_code: "en", endonym_name: "English" }, available_countries: [], available_languages: [] },
  content_for_header: "", canonical_url: "https://shop.test/", form: { posted_successfully: false, errors: [] },
});

/* Data scenarios: conditional components only render when their data exists, so give them some. */
function applyScenario(id, scope) {
  const p = scope.product, v = p.selected_or_first_available_variant;
  const soldOut = () => { p.available = false; v.available = false; p.variants.forEach((x) => (x.available = false)); };
  const S = {
    "star-rating": () => { p.metafields = { reviews: { rating: { value: { rating: "4.5" } }, rating_count: { value: "120" } } }; },
    "sale-badge": () => { v.compare_at_price = 59900; },
    "size-chart-modal": () => { p.metafields = { custom: { size_chart: { value: img } } }; },
    "sold-out-notify": soldOut, "sold-out-overlay": soldOut, "similar-products": soldOut, "stock-alert": soldOut,
    "pickup-availability": () => { v.store_availabilities = [{ pick_up_enabled: true, available: true, location: { name: "Main store", address: { city: "Pune" } }, pick_up_time: "Usually ready in 24 hours" }]; },
    "load-more": () => { scope.paginate = { next: { url: "/collections/all?page=2" }, previous: null, pages: 3, current_page: 1, items: 24 }; },
    "empty-cart": () => { scope.cart = { item_count: 0, total_price: 0, items: [] }; },
    "before-after": () => { p.media = [{ preview_image: img }, { preview_image: img }]; },
    "variant-swatches": () => { p.options_with_values = [{ name: "Color", values: ["Red", "Blue", "Green"], selected_value: "Red" }]; p.options = ["Color"]; },
    "bundle-save": () => { scope.all_products["your-product-handle"] = products[1]; },
    "cart-upsell": () => { scope.all_products["your-product-handle"] = products[1]; },
    "recently-viewed": () => { /* populated from localStorage by the script itself */ },
  };
  S[id]?.();
}

const pickSettingValue = (s) => {
  if (s.default !== undefined) return s.default;
  switch (s.type) {
    case "product": return products[0];
    case "collection": return collection;
    case "image_picker": return img;
    case "link_list": return menu;
    case "url": return "/collections/all";
    case "checkbox": return false;
    case "number": case "range": return s.min ?? 1;
    case "color": return "#336699";
    case "select": return s.options?.[0]?.value ?? "";
    case "text": case "textarea": case "richtext": case "inline_richtext": return "";
    case "video_url": return "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    default: return "";
  }
};
function sectionCtx(file) {
  const sch = file.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
  if (!sch) return null;
  const s = JSON.parse(sch[1]);
  const settings = Object.fromEntries((s.settings ?? []).filter((x) => x.id).map((x) => [x.id, pickSettingValue(x)]));
  const defs = Object.fromEntries((s.blocks ?? []).map((b) => [b.type, b]));
  const mk = (type, i) => ({ id: `b${i}`, type, shopify_attributes: "", settings: Object.fromEntries(((defs[type]?.settings) ?? []).filter((x) => x.id).map((x) => [x.id, pickSettingValue(x)])) });
  const presetBlocks = s.presets?.[0]?.blocks ?? [];
  let blocks = presetBlocks.map((b, i) => mk(b.type, i));
  if (!blocks.length && s.blocks?.length) blocks = [0, 1, 2].map((i) => mk(s.blocks[0].type, i));
  return { id: "sec1", settings, blocks, blocks_size: blocks.length };
}

const liquid = new Liquid({ strictVariables: false, strictFilters: false });
for (const f of ["image_url", "asset_url", "stylesheet_tag", "script_tag", "t", "url", "link_to", "link_to_type", "font_face", "font_url", "font_modify", "video_tag", "external_video_tag", "product_img_url", "img_url", "inline_asset_content", "file_url", "metafield_tag", "metafield_text", "weight_with_unit", "time_tag", "preload_tag", "unit_price", "structured_data", "color_to_rgb", "color_to_hsl", "color_to_hex", "color_modify", "color_lighten", "color_darken", "color_mix", "color_contrast", "color_brightness", "handleize", "placeholder_svg_tag", "media_tag", "model_viewer_tag"]) {
  liquid.registerFilter(f, (v) => (f === "image_url" || f === "img_url" || f === "product_img_url" ? "/img.png" : f === "color_to_rgb" ? "51 102 153" : typeof v === "string" ? v : ""));
}
liquid.registerFilter("image_tag", (_v, ...args) => { const kv = Object.fromEntries(args.filter(Array.isArray)); return `<img src="/img.png" width="600" height="600" alt="${kv.alt ?? ""}" loading="lazy"${kv.class ? ` class="${kv.class}"` : ""}>`; });
liquid.registerFilter("money", (v) => `₹${(Number(v) / 100).toFixed(2)}`);
liquid.registerFilter("money_without_currency", (v) => (Number(v) / 100).toFixed(2));
liquid.registerFilter("newline_to_br", (v) => String(v ?? "").replace(/\n/g, "<br />"));
liquid.registerFilter("json", (v) => JSON.stringify(v ?? null));
liquid.registerFilter("handleize", (v) => String(v ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
liquid.registerFilter("camelize", (v) => String(v ?? "").replace(/[-_ ]+(.)/g, (_, c) => c.toUpperCase()));
liquid.registerFilter("pluralize", (v, s, p) => (Number(v) === 1 ? s : p));
liquid.registerFilter("date", (v) => String(v ?? ""));
liquid.registerTag("form", { parse(tk, rest) { this.tpl = []; const stream = this.liquid.parser.parseStream(rest); stream.on("tag:endform", () => stream.stop()).on("template", (t) => this.tpl.push(t)).on("end", () => { throw new Error("unclosed form"); }); stream.start(); }, *render(ctx, emitter) { emitter.write("<form method=\"post\" action=\"/contact\">"); yield this.liquid.renderer.renderTemplates(this.tpl, ctx, emitter); emitter.write("</form>"); } });
for (const t of ["schema", "stylesheet", "javascript"]) liquid.registerTag(t, { parse(tk, rest) { const stream = this.liquid.parser.parseStream(rest); stream.on(`tag:end${t}`, () => stream.stop()).on("template", () => {}).on("end", () => {}); stream.start(); }, render() { return ""; } });
liquid.registerTag("section", { parse() {}, render() { return ""; } });

// capture render params from a snippet's usage line
const cap = new Liquid({ strictVariables: false, strictFilters: false });
cap.registerTag("render", { parse() { this.tokenizer.skipBlank(); this.tokenizer.readValue(); this.tokenizer.skipBlank(); if (this.tokenizer.peek() === ",") this.tokenizer.advance(); this.hash = new Hash(this.tokenizer.remaining()); }, *render(ctx) { ctx.environments.__params = yield this.hash.render(ctx); return ""; } });
async function usageParams(usage, scope) { const env = { ...scope }; await cap.parseAndRender(usage ?? "", env); return env.__params ?? {}; }
const block = (file, tag) => (file.match(new RegExp(`{%-?\\s*${tag}\\s*-?%}([\\s\\S]*?){%-?\\s*end${tag}\\s*-?%}`)) ?? [])[1] ?? "";

const cases = [];
for (const ex of examples) {
  const f = ex.files(ex.defaults);
  const original = [f.liquid, f.css ? `{% stylesheet %}${f.css}{% endstylesheet %}` : "", f.js ? `{% javascript %}${f.js}{% endjavascript %}` : ""].join("\n");
  cases.push({ id: ex.id, kind: ex.kind, variant: "file", file: original, usage: f.usage });
  if (hasSectionVariant(ex)) cases.push({ id: ex.id, kind: "snippet", variant: "as-section", file: asSectionFile(ex, f) });
}

const only = process.argv[2];
const exe = process.env.CHROME_PATH ?? `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1248/chrome-win64/chrome.exe`;
const browser = await chromium.launch({ executablePath: exe });
const problems = [];
const emptyOut = [];
let ran = 0;
const CART = { token: "t", item_count: 1, total_price: 49900, items: [{ id: 101, key: "101:abc", quantity: 1, product_title: "Product 1", title: "Product 1", final_line_price: 49900, line_price: 49900, price: 49900, image: "/img.png", url: "/products/p1", variant_id: 101 }], attributes: {}, note: "", currency: "INR" };

for (const c of cases.filter((x) => !only || x.id === only)) {
  const scope = baseScope();
  applyScenario(c.id, scope);
  const sec = sectionCtx(c.file);
  let html;
  try {
    if (sec) scope.section = { ...sec, blocks: sec.blocks };
    else scope.section = { id: "sec1", settings: {}, blocks: [] };
    let params = {};
    if (c.usage) params = await usageParams(c.usage, scope);
    const body = c.file.replace(/{%-?\s*(schema|stylesheet|javascript)\s*-?%}[\s\S]*?{%-?\s*end\1\s*-?%}/g, "");
    html = await liquid.parseAndRender(body, { ...scope, ...params });
  } catch (e) { problems.push({ id: c.id, variant: c.variant, type: "render", msg: String(e.message).slice(0, 140) }); continue; }
  if (process.env.DEBUG) console.log(`[${c.id}/${c.variant}] html:`, html.trim().slice(0, 300) || "(empty)");
  const css = block(c.file, "stylesheet"), js = block(c.file, "javascript");
  const page = await browser.newPage({ viewport: { width: 320, height: 640 } });
  const errs = new Set();
  page.on("pageerror", (e) => errs.add("pageerror: " + String(e).slice(0, 140)));
  page.on("console", (mm) => { if (mm.type() === "error" && !/Failed to load resource/.test(mm.text())) errs.add("console: " + mm.text().slice(0, 140)); });
  await page.route("**/*", (route) => {
    const u = new URL(route.request().url()), p = u.pathname;
    const json = (o) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(o) });
    if (p === "/") return route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><html><head><meta name=viewport content='width=device-width,initial-scale=1'><style>:root{--color-foreground:18 18 18;--color-background:255 255 255;--color-button:18 18 18;--color-button-text:255 255 255}body{margin:0;font:16px/1.5 system-ui}*,*::before,*::after{box-sizing:border-box}img,svg,video,canvas{max-width:100%}img{height:auto}</style></head><body></body></html>" });
    if (p === "/cart.js" || p === "/cart/change.js" || p === "/cart/update.js" || p === "/cart/add.js") return json(p === "/cart/add.js" ? { items: CART.items } : CART);
    if (/^\/products\/.+\.js$/.test(p)) return json({ ...products[0], featured_image: "/img.png", url: "/products/p1", variants: products[0].variants, description: "<p>d</p>" });
    if (p.startsWith("/recommendations/products")) return route.fulfill({ status: 200, contentType: "text/html", body: "<div class='x'></div>" });
    if (p.startsWith("/search/suggest")) return json({ resources: { results: { products: products.slice(0, 3).map((x) => ({ ...x, image: "/img.png" })), collections: [], pages: [], articles: [], queries: [] } } });
    if (p === "/img.png") return route.fulfill({ status: 200, contentType: "image/png", body: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", "base64") });
    return route.fulfill({ status: 200, contentType: "text/html", body: "<html><body>stub</body></html>" });
  });
  try {
    await page.clock.install();
    await page.goto("http://shop.test/", { waitUntil: "domcontentloaded" });
    await page.evaluate(({ html, css, js }) => {
      localStorage.setItem("gpl-wishlist", JSON.stringify(["p1", "p2"]));
      const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
      document.body.insertAdjacentHTML("beforeend", html);
      const sc = document.createElement("script"); sc.textContent = js; document.body.appendChild(sc);
    }, { html, css, js });
    await page.clock.fastForward(20000);
    const btns = await page.locator("button:visible, summary:visible, [role=tab]:visible").all();
    for (const b of btns.slice(0, 14)) { await b.click({ timeout: 800, noWaitAfter: true, force: true }).catch(() => {}); await page.clock.fastForward(400); }
    const inputs = await page.locator("input[type=text]:visible, input[type=email]:visible, input[type=tel]:visible, input[type=number]:visible, input[type=range]:visible, textarea:visible, select:visible").all();
    for (const i of inputs.slice(0, 6)) { await i.evaluate((el) => { if (el.tagName === "SELECT") { el.selectedIndex = Math.min(1, el.options.length - 1); } else if (el.type === "range" || el.type === "number") { el.value = el.max || "5"; } else el.value = "test"; el.dispatchEvent(new Event("input", { bubbles: true })); el.dispatchEvent(new Event("change", { bubbles: true })); }).catch(() => {}); }
    await page.clock.fastForward(1500);
    const over = await page.evaluate(() => { const W = document.documentElement.clientWidth; return Math.max(0, Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - W); });
    const empty = await page.evaluate(() => document.body.innerText.trim().length === 0 && document.body.querySelectorAll("img,svg,canvas,input,button").length === 0);
    const a11y = await page.evaluate(() => {
      const out = [];
      const name = (e) => (e.textContent || "").trim() || e.getAttribute("aria-label") || e.getAttribute("title") || e.querySelector("img[alt]:not([alt=''])") || e.getAttribute("aria-labelledby");
      document.querySelectorAll("button").forEach((b) => { if (!name(b)) out.push("button without accessible name"); });
      document.querySelectorAll("a[href]").forEach((a) => { if (!name(a)) out.push("link without accessible name"); });
      document.querySelectorAll("input:not([type=hidden]):not([type=submit]):not([type=button]),select,textarea").forEach((i) => {
        if (!(i.labels?.length || i.getAttribute("aria-label") || i.getAttribute("aria-labelledby") || i.closest("label") || i.getAttribute("placeholder"))) out.push(`${i.tagName.toLowerCase()}[type=${i.type}] without label`);
      });
      document.querySelectorAll("img:not([alt])").forEach(() => out.push("img missing alt attribute"));
      return [...new Set(out)];
    });
    for (const a of a11y) errs.add("a11y: " + a);
    if (over > 2) errs.add(`mobile overflow ${over}px at 320`);
    if (empty) emptyOut.push(c.id + (c.variant === "as-section" ? " [as-section]" : ""));
  } catch (e) { if (!/Execution context was destroyed|navigation/.test(String(e))) errs.add("harness: " + String(e).slice(0, 120)); }
  await page.close();
  ran++;
  if (errs.size) problems.push({ id: c.id, variant: c.variant, type: "browser", msg: [...errs].join(" | ") });
}
await browser.close();
console.log(`browser-tested ${ran}/${cases.filter((x) => !only || x.id === only).length} cases | problems: ${problems.length}`);
for (const p of problems) console.log(`- ${p.id} [${p.variant}] ${p.type}: ${p.msg}`);
console.log(`empty output with mock data (usually conditional/data-driven - review): ${emptyOut.length}`, emptyOut.join(", "));
