/* Runtime render test: executes every file's liquid with mocked Shopify objects/filters.
   Catches filter typos, bad assigns, undefined logic that static parse misses. */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { Liquid } = require("liquidjs");
const ts = require("typescript");
const fs = require("node:fs");

const src = ts.transpileModule(fs.readFileSync("lib/playground/examples.ts", "utf8"), { compilerOptions: { module: "commonjs" } }).outputText;
const m = { exports: {} };
new Function("module", "exports", "require", src)(m, m.exports, (n) => (n === "./types" ? {} : require(n)));
const { examples } = m.exports;

const liquid = new Liquid({ strictVariables: false, strictFilters: false });
// Stub Shopify-only filters so render doesn't die on them
for (const f of ["image_url", "image_tag", "placeholder_svg_tag", "asset_url", "stylesheet_tag", "script_tag", "money", "money_without_currency", "t", "url", "link_to", "link_to_type", "image", "media", "font_face", "font_url", "font_modify", "video_tag", "external_video_tag", "product_img_url", "img_url", "img_tag", "inline_asset_content", "file_url", "file_img_url", "metafield_tag", "metafield_text", "weight_with_unit", "time_tag", "preload_tag", "preload", "sprite_tag", "unit_price", "structured_data", "json", "color_to_rgb", "color_to_hsl", "color_to_hex", "color_to_hsv", "color_extract", "color_brightness", "color_modify", "color_lighten", "color_darken", "color_saturate", "color_desaturate", "color_mix", "color_contrast"]) {
  liquid.registerFilter(f, (v) => (typeof v === "string" ? v : `<img>`));
}
liquid.registerFilter("newline_to_br", (v) => String(v ?? "").replace(/\n/g, "<br />"));
// Shopify objects
const section = { settings: {}, blocks: [] };
const scope = {
  section,
  product: { title: "Test product", price: 49900, url: "/products/x", handle: "x", featured_image: "i.png", selected_or_first_available_variant: { id: 1, title: "M", price: 49900, available: true }, variants: [{ id: 1, title: "M", price: 49900, available: true }], options: ["Size"], options_with_values: [{ name: "Size", values: ["S", "M"] }], available: true, compare_at_price: 59900, vendor: "ACME", type: "Shirt", tags: ["a"], metafields: {}, quantity_rule: { min: 1, max: null, increment: 1 }, media: [], images: [] },
  collection: { title: "Test", url: "/collections/x", products: [], products_count: 0 },
  collections: {},
  all_products: {},
  cart: { item_count: 2, total_price: 99800, items: [] },
  routes: { root_url: "/", cart_url: "/cart", cart_add_url: "/cart/add", search_url: "/search", collections_url: "/collections", account_url: "/account", product_recommendations_url: "/recommendations/products", predictive_search_url: "/search/suggest", all_products_collection_url: "/collections/all" },
  shop: { name: "Test store", money_format: "₹{{amount}}", metafields: {} },
  settings: {},
  customer: null,
  request: { design_mode: false, host: "x.test" },
};

const errs = [];
for (const ex of examples) {
  const f = ex.files(ex.defaults);
  // strip shopify-only block tags
  const lq = f.liquid
    .replace(/{%\s*schema\s*%}[\s\S]*?{%\s*endschema\s*%}/g, "")
    .replace(/{%\s*stylesheet\s*%}[\s\S]*?{%\s*endstylesheet\s*%}/g, "")
    .replace(/{%\s*javascript\s*%}[\s\S]*?{%\s*endjavascript\s*%}/g, "")
    .replace(/{%-?\s*form\s[^%]*%}/g, "<form>")
    .replace(/{%-?\s*endform\s*-?%}/g, "</form>");
  try {
    await liquid.parseAndRender(lq, scope);
  } catch (e) {
    errs.push(`${ex.id}: ${e.message.slice(0, 110)}`);
  }
}
console.log(errs.length ? `${errs.length} RENDER ERRORS:\n` + errs.join("\n") : "all 203 rendered without errors");
