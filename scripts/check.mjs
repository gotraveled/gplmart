import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const fs = require("node:fs");
const src = ts.transpileModule(fs.readFileSync("lib/playground/examples.ts","utf8"),{compilerOptions:{module:"commonjs"}}).outputText;
const m = {exports:{}};
new Function("module","exports","require",src)(m,m.exports,(n)=>n==="./types"?{}:require(n));
for (const id of ["wishlist-button","sold-out-notify","preorder-button","sales-notification","promo-popup","cart-upsell","quantity-breaks","free-shipping-bar","gift-wrap","spin-wheel","popup"]) {
  const ex = m.exports.getExample(id);
  console.log("=== " + id + " === " + ex.name + " [" + ex.kind + "/" + ex.category + "]");
  console.log("  " + ex.description.slice(0,140));
}
