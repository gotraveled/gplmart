import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const fs = require("node:fs");
const src = ts.transpileModule(fs.readFileSync("lib/playground/examples.ts","utf8"),{compilerOptions:{module:"commonjs"}}).outputText;
const m = {exports:{}};
new Function("module","exports","require",src)(m,m.exports,(n)=>n==="./types"?{}:require(n));
const { examples, asSectionFile, completeFile } = m.exports;
const issues = [];
const customEls = new Set();
for (const ex of examples) {
  const f = ex.files(ex.defaults);
  const files = [completeFile(f)];
  if (ex.kind === "snippet") files.push(asSectionFile(ex, f));
  for (const file of files) {
    // custom element names must be hyphenated + unique per file
    for (const mm of file.matchAll(/customElements\.define\('([^']+)'/g)) {
      if (!mm[1].includes("-")) issues.push(ex.id+": bad custom el "+mm[1]);
      if (customEls.has(mm[1])) issues.push(ex.id+": DUPLICATE custom element "+mm[1]+" (install conflict!)");
      customEls.add(mm[1]);
    }
    // duplicate setting ids inside schema
    const sch = file.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
    if (sch) { const s = JSON.parse(sch[1]); const ids = (s.settings||[]).filter(x=>x.id).map(x=>x.id); if (new Set(ids).size !== ids.length) issues.push(ex.id+": dup setting ids"); }
    // hardcoded localhost/debug
    if (/localhost|127\.0\.0\.1|console\.log\(/.test(file)) issues.push(ex.id+": debug artifact");
    // empty schema settings array is fine; check presets exist
    if (sch && !/"presets"\s*:\s*\[/.test(sch[1])) issues.push(ex.id+": no presets");
  }
}
console.log(issues.length ? issues.join("\n") : "all install-safety checks clean");
console.log("custom elements:", customEls.size, "unique names");
