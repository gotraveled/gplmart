// plan.mjs -- the script decides the film.
//
//   node plan.mjs --spec spec.json                 -> prints the plan (shot list, prompt, families, cost)
//   node plan.mjs --spec spec.json --json          -> same, as JSON, for the skill to read back
//   node plan.mjs --record plan.json --verdict pending [--note "..."]   -> appends the film to film-history.json
//                                                                          AND to the shared ledger.txt
//
// WHY THIS EXISTS. The clip-by-clip mode (`references/clip-by-clip.md`) asks a long list of questions and
// hand-writes each setup. That is right for a client who wants to direct every shot. It is wrong for "give me
// the fast one, you decide what is interesting" -- a real, common request. This file takes the FEW facts
// nobody can guess (product name, physical form, whether it's edible, the two claim lines, runtime), rotates
// the creative dimensions (archetype, hook, value angle) by least-recently-used against the shared ledger, and
// hands everything to compose-prompt.mjs. The composer picks action families, shot lengths, camera moves and
// the one slow shot; the validator refuses anything that breaks a rule already paid for in a rejected film.
// Nothing here re-implements either.

import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import {
  composeFilm, ALL_ARCHETYPES, loadLedger, approvalWeights, MODEL_MAX_SECONDS,
} from './compose-prompt.mjs';
import { validateFilm } from './validate-film.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HISTORY = path.join(HERE, 'film-history.json');
const SHARED_LEDGER_SCRIPT = path.join(HERE, '..', 'scripts', 'ledger.mjs');
// 1080p Seedance rate on Higgsfield (see references/generation.md). Override with --credits-per-second for a
// 720p run, or for fal.ai's per-second rate -- see references/providers.md, the two are not the same number.
const DEFAULT_CREDITS_PER_SECOND = 9.0;

const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i === -1 ? d : process.argv[i + 1]; };
const flag = (n) => process.argv.includes('--' + n);

// The two halves of the dual-audience mandate: what makes someone stop scrolling, and what makes it worth
// buying. Keys match references/shot-grammar.md's hook/value-angle lists; the sentence is what actually
// reaches the generator, because a bare key like "stretch-and-drip" tells a video model nothing on its own.
const HOOKS = {
  'bounce-and-scatter': 'ingredients or components drop, bounce, roll and scatter across the surface with real physics, playful chaos',
  'color-pop':          'saturated high-contrast colour is the star, the product\'s own colours against a bright clean background',
  'stretch-and-drip':   'the satisfying pull, product stretching off a utensil or drizzling in a ribbon, a slow sticky pull',
  'pop-in-assembly':    'items jump into frame in staccato steps and build something, a stack, a row, a finished arrangement',
  'splash-impact':      'something lands in something, a piece dropping in, a dollop hitting the surface, impact and crown',
  'reveal-surprise':    'a hidden interior exposed, a bite taken, a pack opened, a piece snapped to show what is inside',
  'rotate-and-catch-light': 'the product turning to catch and throw light off every facet or surface',
  'unfold-and-drape':   'a folded or packed material unfolding and settling into its natural drape or shape',
  'speed-play':         'the fun IS the tempo, whip-fast cuts and spins that feel like a game',
};
const VALUE_ANGLES = {
  'whats-not-in-it':      'what is not in it, nothing artificial, nothing cut, read straight off the label or spec',
  'whats-really-in-it':   'the real named ingredients or materials, seen whole and recognisable in the product',
  'made-differently':     'a process or sourcing choice that is shown, not claimed',
  'key-spec-or-material': 'the specific number or material fact printed on the pack or spec sheet, and nothing more',
  'single-source-origin': 'provenance as the proof, one source, one place, unmixed',
  'label-check':          'the label turned to camera and read, what is communicated is exactly what is in it',
  'everyday-fit':         'where it fits in a real routine, at home, at work, on the go',
  'expert-backed':        'something a buyer can choose without second-guessing, plain and credible, never fear-based',
};
// Tempo-coupled: "the fun IS the tempo" cannot run under a languid profile.
const PACING_INCOMPATIBLE = { 'speed-play': ['slow-luxe', 'real-time-human'] };
// The skeleton everyone reaches for. Capped at roughly 1 in 8 and never twice running; two approved films
// once came out 70% identical because both were serve-moment.
const SERVE_MOMENT_EVERY = 8;
// Staging several of the brand's own units in one shot needs more than one reference image, or the generator
// has to invent the others -- which is a brand-consistency risk, not just a variety one. Only on request.
const ARCHETYPES_ON_REQUEST = ['lineup-family'];
// What the product ships in decides what can physically happen to its container, separate from the product's
// own material gating in compose-prompt.mjs. A jar cannot be squeezed; a squeeze-pack cannot be twisted open.
const PACK_BANS = {
  'jar': ['squeeze'], 'bottle': ['squeeze'], 'tube': [],
  'squeeze-pack': ['open'], 'pouch': [], 'box': [], 'case': ['squeeze', 'pour', 'spread'],
  'wrapper': [], 'none': [],
};

// Least-recently-used over the ledger. A value never used sorts first; otherwise the one used longest ago.
function leastRecentlyUsed(pool, ledger, key) {
  const lastIdx = Object.fromEntries(pool.map(v => [v, Infinity]));
  ledger.forEach((f, i) => { const v = f[key]; if (v in lastIdx && lastIdx[v] === Infinity) lastIdx[v] = i; });
  return [...pool].sort((a, b) => lastIdx[b] - lastIdx[a]);
}

function buildPlan(spec) {
  const ledger = loadLedger(HISTORY);
  const history = ledger.map(f => f.families).filter(Array.isArray);
  const weights = approvalWeights(ledger);

  const durationSeconds = Math.min(MODEL_MAX_SECONDS, Number(spec.durationSeconds || 20));
  const productType = spec.productType || 'spread';
  const edible = !!spec.edible;
  // Whether `material` is a genuine loose, prop-able ingredient (berries, nuts, petals) rather than a
  // description of the product's own homogeneous substance. Defaults by category; override with
  // spec.looseMaterial when a food product has none, or a non-food product genuinely has a loose prop.
  const hasProp = spec.looseMaterial ?? ['spread', 'solid', 'powder'].includes(productType);
  const pacingProfile = spec.pacingProfile || 'fast-cut-energy';
  const creditsPerSecond = Number(spec.creditsPerSecond || DEFAULT_CREDITS_PER_SECOND);
  const cfg = { ...(spec.cfg || {}) };
  cfg.banFamilies = [...new Set([...(cfg.banFamilies || []), ...(PACK_BANS[spec.pack] || [])])];

  // Rotate the creative dimensions. Each pool advances independently so they never travel in lockstep.
  const hookOrder = leastRecentlyUsed(Object.keys(HOOKS), ledger, 'hook')
    .filter(k => !(PACING_INCOMPATIBLE[k] || []).includes(pacingProfile));
  const hook = spec.hook || hookOrder[0];
  const valueAngle = spec.valueAngle || leastRecentlyUsed(Object.keys(VALUE_ANGLES), ledger, 'valueAngle')[0];

  let archOrder = leastRecentlyUsed(ALL_ARCHETYPES().filter(a => !ARCHETYPES_ON_REQUEST.includes(a)), ledger, 'archetype');
  const sinceServe = ledger.findIndex(f => f.archetype === 'serve-moment');
  if (sinceServe !== -1 && sinceServe < SERVE_MOMENT_EVERY) archOrder = archOrder.filter(a => a !== 'serve-moment');
  if (spec.sceneArchetype) archOrder = [spec.sceneArchetype, ...archOrder.filter(a => a !== spec.sceneArchetype)];

  // Try archetypes in rotation order until the validator passes. The composer is deterministic per
  // (product, archetype), so a failing combination fails every time; moving to the next archetype is the only
  // lever that changes the outcome, and it keeps the film inside the variety window rather than loosening the
  // rule.
  let chosen = null, lastResult = null;
  for (const sceneArchetype of archOrder) {
    const film = composeFilm({
      productName: spec.productName, sceneArchetype, pacingProfile, durationSeconds,
      material: spec.material, productType, edible, hasProp, servingVehicle: spec.servingVehicle || null,
      hookSmall: spec.hookSmall, hookLarge: spec.hookLarge,
      kidDevice: HOOKS[hook] || hook, nutritionAngle: VALUE_ANGLES[valueAngle] || valueAngle,
      soundtrack: spec.soundtrack || null, history, weights, cfg,
    });
    const result = validateFilm({ shots: film.shots, durationSeconds, productType, edible, hasProp }, { history, cfg, strict: true });
    lastResult = { sceneArchetype, result };
    if (result.ok) { chosen = { sceneArchetype, film, result }; break; }
  }
  if (!chosen) {
    throw new Error('no archetype produced a film the validator accepts. Last: ' + lastResult.sceneArchetype + ' -> ' + lastResult.result.errors.join('; '));
  }

  // The fade direction depends on whether the finishing pass will run -- get it wrong and the film has no
  // fade at all, unrecoverable without regenerating.
  const ending = spec.finishing === 'none'
    ? 'ENDING: the film resolves on a settled final beat rather than stopping mid-action, then fades gently and evenly to black over the last half second.'
    : 'ENDING: the film resolves on a settled final beat rather than stopping mid-action. Do NOT fade to black; the last frame stays at full brightness.';
  const logo = 'No logo, no watermark, no brand mark of any kind anywhere in the film beyond the branding already printed on the product/pack.';
  const inside = spec.inside ? 'THE PRODUCT UP CLOSE: ' + spec.inside + '. It behaves that way in every shot.' : '';
  const instruction = spec.instruction ? 'CLIENT NOTE: ' + spec.instruction : '';
  const prompt = [chosen.film.prompt, inside, ending, logo, instruction].filter(Boolean).join(' ');

  return {
    productName: spec.productName, brand: spec.brand || null, productType, edible, pack: spec.pack || null,
    durationSeconds, pacingProfile, sceneArchetype: chosen.sceneArchetype, hook, valueAngle,
    shotCount: chosen.film.shots.length, families: chosen.film.families,
    shots: chosen.film.shots.map(s => ({ n: s.family, from: s.startAt, to: s.endAt, seconds: s.seconds, slow: !!s.slow, camera: s.camera, action: s.action })),
    warnings: chosen.result.warnings || [],
    novelty: chosen.result.fingerprint || null,
    credits: Math.round(durationSeconds * creditsPerSecond),
    creditsPerSecond,
    prompt,
  };
}

function printPlan(p) {
  const pad = (s, n) => String(s).padEnd(n);
  console.log('\n' + p.productName + ' -- ' + p.durationSeconds + 's, ' + p.shotCount + ' shots, ' + p.pacingProfile);
  console.log('archetype ' + p.sceneArchetype + ' | hook ' + p.hook + ' | value angle ' + p.valueAngle);
  console.log('\n' + pad('#', 3) + pad('sec', 8) + pad('family', 11) + 'action');
  p.shots.forEach((s, i) => console.log(pad(i + 1, 3) + pad(s.from + '-' + s.to + 's', 8) + pad(s.n + (s.slow ? '*' : ''), 11) + s.action));
  console.log('\n* = the one slow shot');
  if (p.warnings.length) console.log('\nwarnings: ' + p.warnings.join(' | '));
  console.log('\nCOST: ~' + p.credits + ' credits/units (' + p.durationSeconds + 's x ' + p.creditsPerSecond + '/s)');
  console.log('\n--- PROMPT ---\n' + p.prompt + '\n');
}

function record(planFile, verdict, note) {
  const p = JSON.parse(readFileSync(planFile, 'utf8'));
  const h = existsSync(HISTORY) ? JSON.parse(readFileSync(HISTORY, 'utf8')) : { films: [] };
  const date = new Date().toISOString().slice(0, 10);
  h.films.unshift({
    date, product: p.productName, brand: p.brand, archetype: p.sceneArchetype,
    pacing: p.pacingProfile, hook: p.hook, valueAngle: p.valueAngle,
    durationSeconds: p.durationSeconds, shotCount: p.shotCount, verdict: verdict || 'pending',
    families: p.families, ...(note ? { note } : {}),
  });
  writeFileSync(HISTORY, JSON.stringify(h, null, 2));

  // Mirror into the shared, human-readable ledger (scripts/ledger.mjs) so the clip-by-clip mode's variety
  // check sees fast-cut films too, and vice versa -- both modes draw from one pool.
  const row = [date, p.brand || 'unknown-brand', p.productName, p.families.join(', '),
    p.sceneArchetype, p.pacingProfile, p.hook, p.valueAngle].join(' | ');
  try {
    execFileSync('node', [SHARED_LEDGER_SCRIPT, 'add', row], { stdio: 'inherit' });
  } catch (e) {
    console.error('could not write to the shared ledger (scripts/ledger.mjs) -- paste this row in by hand:');
    console.error(row);
  }
  console.log(row);
}

if (arg('record')) {
  record(arg('record'), arg('verdict'), arg('note'));
} else if (arg('spec')) {
  const spec = JSON.parse(readFileSync(arg('spec'), 'utf8'));
  for (const k of ['productName', 'material', 'hookSmall', 'hookLarge']) {
    if (!spec[k]) { console.error('spec is missing ' + k); process.exit(1); }
  }
  const plan = buildPlan(spec);
  if (flag('json')) console.log(JSON.stringify(plan, null, 2)); else printPlan(plan);
} else {
  console.error('usage: node plan.mjs --spec spec.json [--json]   |   node plan.mjs --record plan.json [--verdict pending] [--note "..."]');
  process.exit(1);
}
