import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const fs = require("node:fs");
const path = require("node:path");
const src = ts.transpileModule(fs.readFileSync("lib/playground/examples.ts","utf8"),{compilerOptions:{module:"commonjs"}}).outputText;
const m = {exports:{}};
new Function("module","exports","require",src)(m,m.exports,(n)=>n==="./types"?{}:require(n));
const { examples, completeFile, asSectionFile, hasSectionVariant } = m.exports;
const roots = [
  ["dawn-main","sections","snippets"],
  ["shopify-theme-lab-main/shopify","sections","snippets"],
  ["starter-theme-master/src","sections","snippets"],
  ["skeleton-theme-main","sections","snippets"],
];
for (const [root, sec, sni] of roots) {
  fs.mkdirSync(path.join(root, sec), {recursive:true});
  fs.mkdirSync(path.join(root, sni), {recursive:true});
  for (const ex of examples) {
    fs.writeFileSync(path.join(root, ex.kind==="section"?sec:sni, "gpl-"+ex.id+".liquid"), completeFile(ex.files(ex.defaults)));
    if (ex.kind === "snippet") {
      if (hasSectionVariant(ex)) fs.writeFileSync(path.join(root, sec, "gpl-"+ex.id+"-sec.liquid"), asSectionFile(ex, ex.files(ex.defaults)));
    }
  }
}
console.log(`wrote ${examples.length} + ${examples.filter((e) => hasSectionVariant(e)).length} variants x 4 themes`);
