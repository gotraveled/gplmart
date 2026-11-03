/* Validates every playground example's merged one-file output:
   - Liquid parses (liquidjs)
   - {% schema %} JSON valid + Shopify spec (presets on sections, unique ids)
   - JS parses (node vm)
   - CSS brace balance
   - Tag rules: schema only in sections, stylesheet/javascript allowed in both
*/
import { Liquid } from "liquidjs";
import { createRequire } from "node:module";
import ts from "typescript";
import fs from "node:fs";
import vm from "node:vm";

const src = ts.transpileModule(fs.readFileSync("lib/playground/examples.ts", "utf8"), { compilerOptions: { module: "commonjs" } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", src)(mod, mod.exports, (n) => (n === "./types" ? {} : createRequire(import.meta.url)(n)));
const { examples, completeFile } = mod.exports;

const liquid = new Liquid({ strictVariables: false, strictFilters: false });
const SETTING_TYPES = new Set([
  "text","textarea","richtext","inline_richtext","number","range","select","checkbox","radio","text_alignment","font_picker",
  "color","color_background","color_scheme","collection","blog","page","product","product_list","collection_list","link_list",
  "link","image_picker","video","video_url","url","icon","header","paragraph","article","html","liquid","metaobject","metaobject_list",
]);

const errs = [], warns = [];
const seen = { schema: 0, stylesheet: 0, javascript: 0 };

for (const ex of examples) {
  const tag = `[${ex.id}]`;
  const files = ex.files(ex.defaults);
  const full = completeFile(files);

  // 1. Liquid syntax - strip Shopify's raw blocks (schema/stylesheet/javascript are
  // not liquid tags in standard parsers; content inside them isn't Liquid anyway)
  const liquidPart = full
    .replace(/{%\s*schema\s*%}[\s\S]*?{%\s*endschema\s*%}/g, "")
    .replace(/{%\s*stylesheet\s*%}[\s\S]*?{%\s*endstylesheet\s*%}/g, "")
    .replace(/{%\s*javascript\s*%}[\s\S]*?{%\s*endjavascript\s*%}/g, "")
    .replace(/{%-?\s*form\s[^%]*%}[\s\S]*?{%-?\s*endform\s*-?%}/g, ""); // Shopify's form tag isn't in liquidjs
  try {
    liquid.parse(liquidPart);
  } catch (e) {
    errs.push(`${tag} liquid parse: ${e.message}`);
    continue;
  }

  // 2. Schema
  const schema = full.match(/{%\s*schema\s*%}([\s\S]*?){%\s*endschema\s*%}/);
  if (schema) {
    seen.schema++;
    let s;
    try {
      s = JSON.parse(schema[1]);
    } catch (e) {
      errs.push(`${tag} schema JSON: ${e.message.slice(0, 80)}`);
      continue;
    }
    if (!s.name) errs.push(`${tag} schema missing "name"`);
    if (ex.kind === "section" && !Array.isArray(s.presets)) errs.push(`${tag} section schema missing "presets"`);
    if (s.settings) {
      const ids = new Set();
      for (const st of s.settings) {
        if (st.type && !SETTING_TYPES.has(st.type)) warns.push(`${tag} unusual setting type "${st.type}"`);
        if (st.id) {
          if (ids.has(st.id)) errs.push(`${tag} duplicate setting id "${st.id}"`);
          ids.add(st.id);
        }
      }
      // settings referenced in liquid vs defined
      const used = [...full.matchAll(/section\.settings\.([a-z0-9_]+)/g)].map((m) => m[1]);
      for (const u of new Set(used)) if (!ids.has(u)) errs.push(`${tag} liquid uses section.settings.${u} not defined in schema`);
    }
    if (ex.kind === "snippet") errs.push(`${tag} snippet must not contain {% schema %}`);
  } else if (ex.kind === "section") {
    errs.push(`${tag} section missing {% schema %}`);
  }

  // 3. Tag pairing/order — only top-level tags allowed
  for (const t of ["stylesheet", "javascript", "schema"]) {
    const opens = (full.match(new RegExp(`{%\\s*${t}\\s*%}`, "g")) || []).length;
    const closes = (full.match(new RegExp(`{%\\s*end${t}\\s*%}`, "g")) || []).length;
    if (opens !== closes) errs.push(`${tag} unpaired {% ${t} %} (open ${opens}/close ${closes})`);
    if (opens > 1) warns.push(`${tag} ${opens} {% ${t} %} blocks`);
    if (opens) seen[t]++;
  }

  // 4. JS syntax (in vm context - DOM not needed for parse)
  if (files.js) {
    try {
      new vm.Script(files.js);
    } catch (e) {
      errs.push(`${tag} js parse: ${e.message.slice(0, 80)}`);
    }
  }

  // 5. Liquid-in-JS / JS-in-liquid leaks + JS ternary in liquid
  if (files.js && /{{|{%/.test(files.js)) errs.push(`${tag} liquid syntax inside JS (not evaluated by Shopify)`);
  if (/{{\s*[^}]*\?\s*'[^']*'\s*:/.test(files.liquid)) errs.push(`${tag} ternary in liquid output (Liquid has no ?:)`);

  // 6. CSS braces
  if (files.css) {
    const open = (files.css.match(/{/g) || []).length, close = (files.css.match(/}/g) || []).length;
    if (open !== close) errs.push(`${tag} css unbalanced braces ${open}/${close}`);
  }

  // 7. Snippet render-tag hygiene
  if (ex.kind === "snippet") {
    if (!files.usage) errs.push(`${tag} snippet missing usage render tag`);
    if (/section\.settings/.test(full)) errs.push(`${tag} snippet references section.settings`);
  }
}

console.log(`checked ${examples.length} examples | sections+schema:${seen.schema} stylesheet:${seen.stylesheet} javascript:${seen.javascript}`);
if (warns.length) console.log("\nWARNINGS:\n" + warns.join("\n"));
if (errs.length) { console.log("\nERRORS (" + errs.length + "):\n" + errs.join("\n")); process.exit(1); }
console.log("ALL VALID");
