/* Runs Shopify ThemeCheck against Dawn + all generated gpl-* files. */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const tc = require("@shopify/theme-check-node");

const offenses = await tc.check(require("node:path").resolve("dawn-main").replace(/\\/g, "/"), undefined);
const ours = (offenses ?? []).filter((o) => o.uri?.includes("gpl-"));
console.log(`total offenses: ${(offenses ?? []).length}, in gpl-* files: ${ours.length}`);
const byCheck = {};
for (const o of ours) (byCheck[o.check] ??= []).push(o);
for (const [check, list] of Object.entries(byCheck)) {
  console.log(`\n## ${check} (${list.length})`);
  for (const o of list.slice(0, 8)) console.log(`  ${o.uri?.split(/[\\/]/).pop()}: ${o.message?.split("\n")[0].slice(0, 130)}`);
  if (list.length > 8) console.log(`  ... +${list.length - 8} more`);
}
