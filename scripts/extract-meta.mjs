import fs from "node:fs";
const src = fs.readFileSync("lib/playground/examples.ts", "utf8");
const out = [];
const re = /\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*description:\s*(?:"([^"]*)"|`[^`]{0,400}`),\s*category:\s*"([^"]+)",\s*kind:\s*"(section|snippet)"/g;
let m;
while ((m = re.exec(src))) out.push({ id: m[1], name: m[2], category: m[4], kind: m[5] });
fs.writeFileSync("lib/playground/snippet-meta.json", JSON.stringify(out));
console.log("extracted:", out.length);
