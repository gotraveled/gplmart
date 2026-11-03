/* ThemeCheck all 4 theme roots, report only offenses inside gpl-* files. */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const tc = require("@shopify/theme-check-node");
const path = require("node:path");

const roots = [
  ["Dawn (Shopify official OS2)", "dawn-main"],
  ["Theme Lab (community starter)", "shopify-theme-lab-main/shopify"],
  ["Starter Theme (Shopify OS1)", "starter-theme-master/src"],
  ["Skeleton Theme (Shopify newest)", "skeleton-theme-main"],
];

for (const [label, root] of roots) {
  const abs = path.resolve(root).replace(/\\/g, "/");
  try {
    const offenses = await tc.check(abs, undefined);
    const ours = (offenses ?? []).filter((o) => o.uri?.includes("gpl-"));
    const real = ours.filter((o) => o.check !== "OrphanedSnippet");
    console.log(`\n=== ${label} ===`);
    console.log(`gpl-* offenses: ${ours.length} (orphans ignored: ${ours.length - real.length})`);
    const byCheck = {};
    for (const o of real) (byCheck[o.check] ??= []).push(o);
    for (const [c, list] of Object.entries(byCheck)) {
      console.log(`  ## ${c} (${list.length})`);
      for (const o of list.slice(0, 5)) console.log(`    ${o.uri?.split(/[\\/]/).pop()}: ${o.message?.split("\n")[0].slice(0, 110)}`);
      if (list.length > 5) console.log(`    ... +${list.length - 5} more`);
    }
    if (!real.length) console.log("  clean (no real offenses)");
  } catch (e) {
    console.log(`\n=== ${label} === ERROR: ${e.message.slice(0, 150)}`);
  }
}
