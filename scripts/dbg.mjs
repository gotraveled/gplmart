import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const fs = require("node:fs");
const src = ts.transpileModule(fs.readFileSync("lib/playground/examples.ts","utf8"),{compilerOptions:{module:"commonjs"}}).outputText;
const m = {exports:{}};
new Function("module","exports","require",src)(m,m.exports,(n)=>n==="./types"?{}:require(n));
let n=0, errs=[];
for (const e of m.exports.examples.filter(x=>x.kind==="snippet")) {
  const f = m.exports.asSectionFile(e, e.files(e.defaults));
  const sch = f.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
  try { const s=JSON.parse(sch[1]); for (const st of s.settings||[]) { if (st.type==="select" && !Array.isArray(st.options)) errs.push(e.id+": select w/o options"); } }
  catch(er) { errs.push(e.id+": "+er.message.slice(0,60)); }
  fs.writeFileSync("dawn-main/sections/gpl-"+e.id+".liquid", f);
  n++;
}
console.log("wrote "+n+"; errors: "+(errs.length?errs.join("; ").slice(0,400):"none"));
