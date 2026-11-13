// ledger.mjs — a local, network-free variety ledger for the ecom-product-video skill.
//
// This skill serves any brand, so it carries no shared external sheet the way a single-brand pipeline might.
// Instead the ledger is one plain text file, `ledger.txt`, sitting next to this script's parent folder
// (the skill root). It reads and writes with no network call and no credentials, which is the point: a
// variety check that depends on reaching some external host will fail exactly when it is needed most, and
// silently reading three rows pasted into a chat instead of the whole record is worse than an honest "the
// check did not run."
//
// Usage:
//   node scripts/ledger.mjs read
//   node scripts/ledger.mjs add "<date> | <brand> | <product> | <families> | <archetype> | <pacing> | <hook> | <value angle>"
//   node scripts/ledger.mjs overlap "<family,family,...>" "<brand>"   -- prints the Jaccard overlap against
//                                                                          every stored row for that brand
//
// Row shape, eight fields, pipe-separated:
//   date | brand | product | families (comma-separated) | archetype | pacing | hook | value angle
//
// One row per film. Never one row per clip in a clip-by-clip film — the families column lists every family
// used across all the clips in that film.

import { existsSync, readFileSync, appendFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LEDGER_PATH = path.join(HERE, '..', 'ledger.txt');
const HEADER = 'date | brand | product | families | archetype | pacing | hook | value_angle';

function ensureFile() {
  if (!existsSync(LEDGER_PATH)) writeFileSync(LEDGER_PATH, HEADER + '\n');
}

function readRows() {
  ensureFile();
  const lines = readFileSync(LEDGER_PATH, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);
  const [, ...rows] = lines; // drop the header
  return rows.map((line) => {
    const parts = line.split('|').map((p) => p.trim());
    const [date, brand, product, families, archetype, pacing, hook, value_angle] = parts;
    return { date, brand, product, families: (families || '').split(',').map((f) => f.trim()).filter(Boolean), archetype, pacing, hook, value_angle, raw: line };
  });
}

function jaccard(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  let inBoth = 0;
  for (const f of setA) if (setB.has(f)) inBoth++;
  return inBoth / union.size;
}

const [, , cmd, ...rest] = process.argv;

if (cmd === 'read') {
  ensureFile();
  const rows = readRows();
  if (rows.length === 0) {
    console.log('EMPTY — no rows yet. This is not a clean slate for variety purposes, it is a disabled');
    console.log('check: nothing will catch a repeat until at least one row exists. Say so plainly and');
    console.log('backfill from whatever record of recent films exists before designing.');
    process.exit(0);
  }
  console.log(readFileSync(LEDGER_PATH, 'utf8').trimEnd());
  process.exit(0);
}

if (cmd === 'add') {
  const row = rest[0];
  if (!row) {
    console.error('usage: node scripts/ledger.mjs add "<date> | <brand> | <product> | <families> | <archetype> | <pacing> | <hook> | <value angle>"');
    process.exit(1);
  }
  const parts = row.split('|').map((p) => p.trim());
  if (parts.length !== 8) {
    console.error(`row has ${parts.length} fields, expected 8: date | brand | product | families | archetype | pacing | hook | value_angle`);
    process.exit(1);
  }
  ensureFile();
  const existing = readRows();
  if (existing.some((r) => r.raw === row.trim())) {
    console.log('this exact row is already in the ledger — not duplicating it.');
    process.exit(0);
  }
  appendFileSync(LEDGER_PATH, row.trim() + '\n');
  console.log(`appended to ${LEDGER_PATH}`);
  process.exit(0);
}

if (cmd === 'overlap') {
  const [familiesArg, brandArg] = rest;
  if (!familiesArg) {
    console.error('usage: node scripts/ledger.mjs overlap "<family,family,...>" ["<brand>"]');
    process.exit(1);
  }
  const newFamilies = familiesArg.split(',').map((f) => f.trim()).filter(Boolean);
  const rows = readRows().filter((r) => !brandArg || r.brand.toLowerCase() === brandArg.toLowerCase());
  if (rows.length === 0) {
    console.log(`no rows${brandArg ? ` for brand "${brandArg}"` : ''} — overlap check has nothing to compare against.`);
    process.exit(0);
  }
  let worst = 0;
  for (const r of rows) {
    const score = jaccard(newFamilies, r.families);
    const flag = score >= 0.5 ? '  <-- 0.5 or higher, choose again' : '';
    console.log(`${score.toFixed(2)}  ${r.date}  ${r.brand} / ${r.product}  (${r.families.join(', ')})${flag}`);
    if (score > worst) worst = score;
  }
  console.log(`\nworst overlap: ${worst.toFixed(2)}${worst >= 0.5 ? ' -- too close, choose again' : ' -- passes'}`);
  process.exit(0);
}

console.error('usage: node scripts/ledger.mjs <read|add|overlap> [args]');
process.exit(1);
