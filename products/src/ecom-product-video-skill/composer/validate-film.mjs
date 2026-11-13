// validate-film.mjs -- the gate every fast-cut film passes through, whoever wrote it.
//
// WHY THIS IS THE IMPORTANT PIECE. A rule fixed only in the generator holds only while that exact generator is
// the one writing. The rules here move OUT of the generator and into a validator that runs on the finished
// shot list regardless of origin -- a model may write anything; it may not ship anything that breaks a rule
// already paid for in rejected videos.
//
// Every check below traces to a specific class of failure that actually happened on real generated films.
// Nothing here is hypothetical.
//
// Validates STRUCTURED shots, never prose. Parsing a rule back out of prose is the same class of guess that
// keeps going wrong; the composer emits `{family, seconds, action, camera, slow}` and this reads that shape.

import {
  ALL_FAMILIES, familiesForType, familySimilarity, shotCountFor, NOVELTY_THRESHOLD,
  NEEDS_OPEN, NEEDS_OPEN_EXTRA, SOLID_NEEDS_OPEN, ENTRANCE_ONLY, TOO_ALIKE, MODEL_MAX_SECONDS,
} from './compose-prompt.mjs';

/**
 * @param film   {{ shots: Array, durationSeconds: number, productType: string, edible?: boolean }}
 * @param opts   {{ history?: Array<string[]>, cfg?: object, strict?: boolean }}
 * @returns      {{ ok, errors: string[], warnings: string[], families: string[], fingerprint }}
 */
export function validateFilm(film, opts = {}) {
  const errors = [];
  const warnings = [];
  const { history = [], cfg = {} } = opts;
  const shots = Array.isArray(film?.shots) ? film.shots : [];
  const productType = film?.productType || 'spread';
  const edible = film?.edible ?? false;
  const hasProp = film?.hasProp ?? ['spread', 'solid', 'powder'].includes(productType);
  const target = film?.durationSeconds;

  if (!shots.length) {
    return { ok: false, errors: ['film has no shots'], warnings, families: [], fingerprint: null };
  }

  const families = shots.map(s => s.family);
  const known = new Set(ALL_FAMILIES());
  const legal = new Set(familiesForType(productType, edible, hasProp));

  // --- 1. vocabulary ------------------------------------------------------------------------------------
  for (const [i, f] of families.entries()) {
    if (!known.has(f)) errors.push(`shot ${i + 1}: "${f}" is not a known action family`);
    else if (!legal.has(f)) {
      // The defect: an inedible/rigid product told to "pour" or "spread", or an edible-only action (bite,
      // crunch) attached to a product that was never marked edible.
      errors.push(`shot ${i + 1}: "${f}" is not valid for a ${productType} product${edible ? '' : ' marked not edible'}`);
    }
  }

  // --- 2. no repeats ------------------------------------------------------------------------------------
  // The defect: the same kind of action shown twice, which reads as repetitive no matter how the two
  // instances are worded.
  const seen = new Map();
  for (const [i, f] of families.entries()) {
    if (seen.has(f)) errors.push(`shot ${i + 1}: "${f}" already used in shot ${seen.get(f) + 1}`);
    else seen.set(f, i);
  }

  // --- 3. look-alike pairs ------------------------------------------------------------------------------
  for (const [a, b] of TOO_ALIKE) {
    if (families.includes(a) && families.includes(b)) {
      errors.push(`"${a}" and "${b}" read as the same shot on screen; use one or the other`);
    }
  }

  // --- 4. dependency order ------------------------------------------------------------------------------
  // The defect: something appearing out of a container that was never opened. A film cannot pour, spread or
  // dig out of a pack it never opened, and cannot do it before opening.
  const openAt = families.indexOf('open');
  const depList = productType === 'solid' || !edible
    ? [...NEEDS_OPEN, ...NEEDS_OPEN_EXTRA, ...SOLID_NEEDS_OPEN]
    : [...NEEDS_OPEN, ...NEEDS_OPEN_EXTRA];
  const dependents = depList.filter(d => families.includes(d));
  if (dependents.length && openAt === -1) {
    errors.push(`uses ${dependents.join(', ')} but the product is never opened`);
  } else {
    for (const d of dependents) {
      const at = families.indexOf(d);
      if (at < openAt) errors.push(`shot ${at + 1} "${d}" happens before the product is opened (shot ${openAt + 1})`);
    }
  }

  // --- 5. entrances -------------------------------------------------------------------------------------
  for (const [i, f] of families.entries()) {
    if (ENTRANCE_ONLY.includes(f) && i !== 0) {
      errors.push(`shot ${i + 1}: "${f}" is an entrance and is only valid as the opening shot`);
    }
  }

  // --- 6. learned overrides ------------------------------------------------------------------------------
  for (const f of cfg.banFamilies || []) {
    if (families.includes(f)) errors.push(`"${f}" is banned by a learned override from feedback`);
  }
  for (const f of cfg.requireFamilies || []) {
    if (!families.includes(f)) errors.push(`"${f}" is required by a learned override but is missing`);
  }
  if (families[0] && (cfg.banOpeners || []).includes(families[0])) {
    errors.push(`"${families[0]}" is banned as an opening shot by a learned override`);
  }
  if (families.at(-1) && (cfg.banClosers || []).includes(families.at(-1))) {
    errors.push(`"${families.at(-1)}" is banned as a closing shot by a learned override`);
  }

  // --- 7. timing ----------------------------------------------------------------------------------------
  const sum = shots.reduce((a, s) => a + (s.seconds || 0), 0);
  if (target && sum !== target) errors.push(`shot lengths total ${sum}s but the film is ${target}s`);
  if (target > MODEL_MAX_SECONDS) errors.push(`${target}s exceeds the ${MODEL_MAX_SECONDS}s model cap; split into parts`);
  for (const [i, s] of shots.entries()) {
    if (!s.seconds || s.seconds < 2) errors.push(`shot ${i + 1}: ${s.seconds}s is below the 2s floor`);
  }

  // The defect: several identical-length holds, which reads as "not ending". A good film opens short and lets
  // the payoff breathe.
  const lens = shots.map(s => s.seconds);
  if (new Set(lens).size === 1 && lens.length > 2) {
    errors.push(`every shot is ${lens[0]}s; uniform lengths are what made rejected films feel flat`);
  }
  if (lens.at(-1) < lens[0]) {
    warnings.push(`film ends on its shortest shot (${lens.at(-1)}s vs ${lens[0]}s opening); the payoff usually wants room`);
  }

  // --- 8. density ---------------------------------------------------------------------------------------
  // The defect: too few written setups over a long runtime, measured at one cut every 6s or slower. A
  // reference approved film measured 2.5s per cut.
  if (target) {
    const perShot = target / shots.length;
    const expected = shotCountFor(target, 0, cfg);
    if (perShot > 4.6) errors.push(`${shots.length} shots across ${target}s is ${perShot.toFixed(1)}s per shot; too slow (expected around ${expected} shots)`);
    if (perShot < 1.8) warnings.push(`${perShot.toFixed(1)}s per shot is very dense; check it still reads`);
  }

  // --- 9. slow shot -------------------------------------------------------------------------------------
  // The defect: a film that reads as slow motion throughout. Contrast is what reads as edited.
  const slow = shots.filter(s => s.slow).length;
  if (slow > 1) errors.push(`${slow} slow shots; at most one shot per film may run slow`);
  if (cfg.slowShot === false && slow > 0) errors.push('a learned override disabled slow shots but this film has one');

  // --- 10. camera ---------------------------------------------------------------------------------------
  const moves = shots.map(s => (s.camera || '').trim().toLowerCase());
  if (moves.some(m => !m)) errors.push('every shot must name a camera move');
  const dupMove = moves.find((m, i) => m && moves.indexOf(m) !== i);
  if (dupMove) errors.push(`camera move "${dupMove}" is used more than once`);

  // --- 11. novelty --------------------------------------------------------------------------------------
  // The defect: two approved films measured 70% alike against each other.
  const threshold = typeof cfg.noveltyThreshold === 'number' ? cfg.noveltyThreshold : NOVELTY_THRESHOLD;
  let worst = 0, worstIdx = -1;
  history.slice(0, 18).forEach((h, i) => {
    const sim = familySimilarity(families, h);
    if (sim > worst) { worst = sim; worstIdx = i; }
  });
  if (worst >= threshold) {
    const msg = `${(worst * 100).toFixed(0)}% similar to a film ${worstIdx + 1} back (threshold ${(threshold * 100).toFixed(0)}%)`;
    // A near-miss is a warning rather than a hard failure: past a full arc's length some overlap is
    // arithmetic, and failing a film for it would loop the picker forever with nothing left to choose.
    if (worst >= threshold + 0.15) errors.push(msg);
    else warnings.push(msg);
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    families,
    fingerprint: { families, shotCount: shots.length, durationSeconds: target, productType, edible, hasProp },
  };
}

/** One-line report for logs. */
export function reportFilm(result, label = '') {
  const head = `${result.ok ? 'PASS' : 'FAIL'}  ${label}`;
  const lines = [head];
  for (const e of result.errors) lines.push(`   error   ${e}`);
  for (const w of result.warnings) lines.push(`   warn    ${w}`);
  return lines.join('\n');
}

// --- CLI: prove the validator accepts what the deterministic composer produces ---------------------------
import { fileURLToPath } from 'url';
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { composeFilm, loadHistory, planParts, ALL_ARCHETYPES } = await import('./compose-prompt.mjs');

  const CATALOGUE = [
    ['Aurora Vitamin C Serum', 'liquid', false, 'a thin golden-amber liquid'],
    ['Aurora Rich Night Cream', 'spread', false, 'a whipped ivory cream'],
    ['Crunch Trail Mix Bites', 'solid', true, 'roasted mixed nuts and dried fruit pieces'],
    ['Sundrop Honey', 'liquid', true, 'amber honey that runs slowly and catches light'],
    ['Everyday Merino Tee', 'fabric', false, 'soft brushed merino wool'],
    ['Halo Signet Ring', 'jewellery', false, 'polished brushed gold'],
  ];
  const CYCLE = [28, 32, 26, 40, 30, 25, 36, 29, 45, 27, 33, 26, 38, 31, 14];
  const ARCH = ALL_ARCHETYPES();
  const history = loadHistory();

  let pass = 0, fail = 0, warned = 0;
  for (let i = 0; i < 30; i++) {
    const [name, productType, edible, material] = CATALOGUE[i % CATALOGUE.length];
    const archetype = ARCH[(i * 7) % ARCH.length];
    const total = CYCLE[i % CYCLE.length];
    for (const [pi, partSeconds] of planParts(total).entries()) {
      const film = composeFilm({
        productName: name, sceneArchetype: archetype, pacingProfile: 'fast-cut-energy',
        durationSeconds: partSeconds, material, productType, edible,
        hookSmall: 'x', hookLarge: 'y', part: pi + 1, partsTotal: planParts(total).length,
        history,
      });
      const r = validateFilm({ ...film, productType, edible }, { history });
      if (r.ok) pass++; else fail++;
      if (r.warnings.length) warned++;
      if (!r.ok) console.log(reportFilm(r, `${name} / ${archetype} / ${partSeconds}s`));
      history.unshift(r.families);
    }
  }
  console.log(`\nvalidator vs its own composer: ${pass} passed, ${fail} failed, ${warned} with warnings`);
  process.exitCode = fail ? 1 : 0;
}
