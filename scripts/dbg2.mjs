import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const fs = require("node:fs");
const src = ts.transpileModule(fs.readFileSync("lib/playground/examples.ts","utf8"),{compilerOptions:{module:"commonjs"}}).outputText;
console.log("spreadArray defined:", src.includes("__spreadArray ="));
console.log("tslib import:", src.includes("tslib"));
const i = src.indexOf("__spreadArray");
console.log(src.slice(Math.max(0,i-300), i+50));
