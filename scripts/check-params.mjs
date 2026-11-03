/* Checks every snippet's usage render params are actually referenced by its liquid. */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const fs = require("node:fs");

const src = ts.transpileModule(fs.readFileSync("lib/playground/examples.ts", "utf8"), { compilerOptions: { module: "commonjs" } }).outputText;
const m = { exports: {} };
new Function("module", "exports", "require", src)(m, m.exports, (n) => (n === "./types" ? {} : require(n)));
const { examples } = m.exports;

const issues = [];
for (const ex of examples) {
  if (ex.kind !== "snippet") continue;
  const f = ex.files(ex.defaults);
  if (!f.usage) continue;
  const um = f.usage.match(/{%\s*render\s+'([^']+)'(.*)%}/s);
  if (!um) { issues.push(`${ex.id}: usage tag unparsable: ${f.usage.slice(0, 80)}`); continue; }
  const params = [...um[2].matchAll(/([a-z_][a-z0-9_]*)\s*:/g)].map((x) => x[1]);
  for (const p of params) {
    if (!new RegExp("\\b" + p + "\\b").test(f.liquid)) issues.push(`${ex.id}: usage passes "${p}" but liquid never uses it`);
  }
}
console.log(issues.length ? issues.join("\n") : "all render params are used by their snippets");
