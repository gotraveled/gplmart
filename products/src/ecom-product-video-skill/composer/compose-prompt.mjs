// compose-prompt.mjs -- builds the generation prompt for one fast-cut film. The SCRIPT decides the shots.
//
// WHY THIS SHAPE. A hand-directed clip-by-clip film (the other mode in this skill) is right when someone wants
// to approve every setup. It is wrong for "just make it, you decide" -- a request that answered by hand
// drifts back to the same skeleton every time: open, apply, eat. This composer derives the whole shot list
// algorithmically from a handful of facts (product name, physical form, duration) instead, so structure is
// enforced by code rather than remembered by whoever is running the skill that day.
//
// Measured against a real approved reference film (30s, 7 written shots, 11 actual cuts, shot lengths
// 2/3/4/4/5/5/7s) versus a rejected one of the same length (5 setups, every one exactly 6s, two real actions
// repeated as if they were different beats), three things separate a film that reads as edited from one that
// reads as AI-generated and flat:
//
//   1. BEATS MUST BE DISTINCT ACTIONS, not phases of one event. Shots are drawn from ACTION FAMILIES and a
//      family may never repeat in a film -- that is what structurally prevents "the same thing happening
//      twice."
//   2. SHOT LENGTHS MUST VARY. Uniform lengths read as flat regardless of how fast the pacing language claims
//      to be. Lengths here follow a rising curve: snappy hook, longer payoff.
//   3. WRITE ENOUGH SHOTS. The generator treats a written shot as one continuous take and will not subdivide
//      it, and it adds its own cuts inside a shot unreliably (measured: 7 written shots produced 11 cuts on
//      one film, 4-5 setups over 30s was measured at one cut every 6 seconds on another -- far too slow). The
//      reliable lever is the written shot count itself, set high enough that even the low end of what the
//      generator actually delivers still reads as fast.
//
// PRODUCT-AGNOSTIC BY DESIGN. This works for any physical form, not just food. Every action family is gated
// two ways: by PHYSICAL FORM (a rigid object cannot be poured; fabric cannot be crunched) and, separately, by
// whether the product is actually EDIBLE (a skincare serum is a liquid but nobody bites it -- "liquid" alone
// is not enough to allow "use"/"spread"/"consume"). See familiesForType().

// The model's hard duration cap. A request above this is silently clamped and billed at the cap -- verified
// via the cost preflight. Anything longer must be composed as multiple parts and joined.
export const MODEL_MAX_SECONDS = 30;

const LOOK = {
  'fast-cut-energy': { cam: 'a modern cinema camera, 35mm at f/2.0',    light: 'bright high-key light',  rule: 'hard cuts on movement, real time throughout, nothing drifting or floating' },
  'speed-ramp':      { cam: 'a portrait-length lens at f/1.2',          light: 'warm directional light', rule: 'each shot starts slow then ramps hard to full speed on the action' },
  'product-spin':    { cam: 'a portrait-length lens at f/1.2',          light: 'clean studio light',     rule: 'the surface beneath the product turns, or the camera orbits a full 360 degrees around the product at a steady cinematic pace, gimbal-smooth, never distorting, snapping to a held hero frame at the end' },
  'snap-macro':      { cam: 'a macro lens at f/2.8',                    light: 'raking side light',      rule: 'extreme macro cut rapidly, nothing held longer than a beat' },
  'drone-sweep':     { cam: 'a wide 24mm lens',                         light: 'soft natural light',     rule: 'gliding camera travel at TABLETOP SCALE, arcing across and around the set like a close FPV pass, never a landscape fly-over -- a large open environment plus aerial travel fails outright' },
  'stop-motion-pop': { cam: 'a standard 50mm lens at f/1.8',            light: 'even bright light',      rule: 'stop-motion style, items jump into position in quick staccato steps' },
  'real-time-human': { cam: 'a 35mm lens',                              light: 'natural window light',   rule: 'plain real-time motion, no ramping and no drifting' },
  'slow-luxe':       { cam: 'a portrait-length lens at f/1.2',          light: 'warm low golden light',  rule: 'one long unbroken move per shot, languid slow-motion macro' },
};

// --- ACTION FAMILIES ---------------------------------------------------------------------------------
// The unit of variety. Each is a DIFFERENT KIND of thing happening -- not a different moment of the same thing
// happening. A film may use each family at most once, which is what structurally prevents "the nuts falling
// again and again". Each returns a shot description given the product, its loose material and the archetype's
// serving vehicle (food-adjacent archetypes only -- see vehicleFor()).
//
// `v` (vehicle) is named in the set() line before it is used in an action, so whatever gets eaten/applied was
// established before it was used. Every archetype defaulting to the same vehicle is how three films in a row
// end up "opening, spreading on bread, eating" -- vehicles are chosen per archetype and may be overridden.
const ACTIONS = {
  reveal:    (p, m, v) => 'the ' + p + ' stands centred and square to camera, then snaps to a locked hero frame',
  impact:    (p, m, v) => m + ' drop into frame and strike the surface hard, bouncing and scattering outward',
  open:      (p, m, v) => 'fingers grip the ' + p + '\'s lid or seal and open it fast, giving way',
  orbit:     (p, m, v) => 'the camera travels a full 360-degree circle around the ' + p + ' at a steady cinematic pace, gimbal-smooth, as light rakes across it',
  use:       (p, m, v) => 'a utensil digs into the ' + p + ' and drags out a thick loaded portion that stretches before it breaks',
  spread:    (p, m, v) => 'the portion is worked onto ' + v + ' already waiting in frame, in one confident uneven stroke',
  macro:     (p, m, v) => 'one extreme macro shot holding on the surface of ' + m + ', so close the texture fills the whole frame, light raking across it to pick out the detail',
  consume:   (p, m, v, t, ctx) => t === 'solid'
    ? 'a hand picks up a single piece and bites into it, the broken edge visible'
    : ctx?.hasPortion
      ? 'a hand lifts ' + v + ', now loaded with that portion, and takes a real bite out of it'
      : 'a hand lifts ' + v + ' loaded with the ' + p + ' and takes a real bite out of it',
  transform: (p, m, v) => m + ' visibly change state in front of camera, going from separate loose pieces to one combined mass',
  arrange:   (p, m, v) => m + ' jump into a neat pattern around the ' + p + ' in quick staccato steps',
  pullback:  (p, m, v) => 'the camera pulls back to reveal the whole set at once, the ' + p + ' sitting at the centre of it',
  pour:      (p, m, v) => 'a thick stream of the ' + p + ' pours down from above, clearly arriving from outside the top of frame',
  stack:     (p, m, v) => 'pieces are stacked upward into a tower that wobbles and just holds',
  splash:    (p, m, v) => 'a piece lands into the ' + p + ' and throws up a bright splash that hangs mid-air',
  drop:      (p, m, v) => 'the ' + p + ' itself drops into frame from above and lands upright hard, everything around it jumping',
  freeze:    (p, m, v) => 'everything stops dead in mid-air at once and stays there, ' + m + ' hanging motionless around the ' + p,
  swirl:     (p, m, v) => 'the ' + p + ' and a paler swirl are folded together and marble into each other without fully mixing',
  slice:     (p, m, v, t) => t === 'solid'
    ? 'a single piece is cut clean through and the two halves fall apart, showing the inside'
    : v + ' is cut clean through and the two halves fall apart, revealing the inside',
  dust:      (p, m, v) => 'a soft cloud of fine particles bursts up and drifts slowly back down through the light',
  rise:      (p, m, v) => 'the ' + p + ' rises up into frame from below, coming to rest dead centre',
  tumble:    (p, m, v) => m + ' roll and tumble across the surface in every direction, one wobbling to a stop on its edge',
  lineup:    (p, m, v) => 'several units of the product snap into a straight row one after another, the featured one landing last',
  shadow:    (p, m, v) => 'a hard light sweeps across the set, the shadow of the ' + p + ' travelling over the surface behind it',
  squeeze:   (p, m, v) => 'the ' + p + ' is squeezed out in one thick continuous coil that curls into a spiral',
  pourout:   (p, m, v) => 'the ' + p + ' is tipped and its pieces pour out in a rush, piling up below',
  crunch:    (p, m, v) => 'a single piece is snapped in half in extreme close-up, fragments flying off the break',
  // Added for non-food categories: apparel, jewellery, hardware, accessories.
  wear:      (p, m, v) => 'a hand lifts the ' + p + ' and puts it on or fastens it, settling into place and catching the light',
  fold:      (p, m, v) => 'the ' + p + ' is lifted and folds or drapes over itself in one smooth motion, its shape changing as it settles',
  click:     (p, m, v) => 'a hand presses or turns a control on the ' + p + ' and it responds, a light, a latch or a mechanism activating',
  flip:      (p, m, v) => 'the ' + p + ' is turned over in one motion, showing the other side before settling back',
};

// --- PRODUCT GATING -----------------------------------------------------------------------------------
// Two independent gates, because "liquid" alone is not enough information. A skincare serum and a honey are
// both liquid, but only one of them is ever spread onto something and bitten.
//
// 1. PHYSICAL FORM -- what the material itself can do. A rigid object cannot be poured; fabric cannot be
//    crunched; a jar of jam cannot be worn.
// 2. EDIBLE -- whether the product is actually eaten/applied via a vehicle at all. Only when true do
//    `use`, `spread`, `consume` and `crunch` (all of which assume something edible) become available.
export const PRODUCT_TYPES = ['spread', 'liquid', 'solid', 'powder', 'rigid', 'fabric', 'jewellery'];

// `use` (a utensil digging in and dragging out a portion that stretches before it breaks) and `spread`
// (working that portion onto a vehicle) are both specifically SPOONABLE physics -- they describe a paste or
// thick liquid, not a rigid piece or a fine powder. Solid pieces and powder are edible but neither is ever
// "dug into with a utensil" the way a jam or a nut butter is, so both are banned here regardless of the
// edible flag, the same way the original design (SPOONABLE_ONLY) had it before this was generalised.
const FORM_FORBIDDEN = {
  spread:    ['pourout', 'stack', 'dust', 'wear', 'fold', 'click', 'flip'],
  liquid:    ['stack', 'dust', 'spread', 'wear', 'fold', 'click', 'flip'],
  solid:     ['pour', 'squeeze', 'swirl', 'splash', 'spread', 'use', 'wear', 'fold', 'click', 'flip'],
  powder:    ['slice', 'stack', 'spread', 'squeeze', 'use', 'wear', 'fold', 'click', 'flip'],
  rigid:     ['pour', 'spread', 'squeeze', 'swirl', 'splash', 'use', 'pourout', 'dust', 'fold'],
  fabric:    ['pour', 'spread', 'squeeze', 'swirl', 'splash', 'use', 'pourout', 'dust', 'stack', 'slice', 'click'],
  jewellery: ['pour', 'spread', 'squeeze', 'swirl', 'splash', 'use', 'pourout', 'dust', 'stack', 'slice', 'fold', 'transform'],
};
// Actions that only make sense when something is actually eaten or applied via a vehicle. Gated separately
// from physical form: a liquid or a spread is not automatically edible (a serum, a cosmetic cream).
const EDIBLE_ONLY = ['use', 'spread', 'consume', 'crunch'];

// Actions whose text treats the "material" prop as discrete, countable pieces -- berries, nuts, petals,
// dropping, tumbling or freezing mid-air individually. That reads as nonsense for a homogeneous substance
// ("a thin golden-amber liquid visibly change state... from separate loose pieces to one combined mass").
// Gated by whether the spec actually supplies a loose, prop-able material, independent of physical form or
// edibility -- a liquid serum has neither loose pieces nor food status; a jam has both.
const PROP_ONLY = ['impact', 'transform', 'arrange', 'tumble', 'dust', 'freeze'];

export const ALL_FAMILIES = () => Object.keys(ACTIONS);
export const ALL_ARCHETYPES = () => Object.keys(SCENES);
export function familiesForType(productType, edible, hasProp = true) {
  const formBanned = new Set(FORM_FORBIDDEN[productType] || FORM_FORBIDDEN.solid);
  const edibleBanned = edible ? [] : EDIBLE_ONLY;
  const propBanned = hasProp ? [] : PROP_ONLY;
  return Object.keys(ACTIONS).filter(f => !formBanned.has(f) && !edibleBanned.includes(f) && !propBanned.includes(f));
}

// Families that only make sense once the product is already open. Enforced by validateArcs() and pickFamilies().
export const NEEDS_OPEN_EXTRA = ['squeeze', 'swirl'];
export const NEEDS_OPEN = ['pour', 'use', 'spread', 'splash'];
// Actions that need a loose piece already out of the pack -- pourout tips the pack itself, the rest handle a
// piece that came from it. A film that poured pieces out of a box it never opened is the same defect class as
// something appearing from nowhere, in the solid/non-food vocabulary.
export const SOLID_NEEDS_OPEN = ['pourout', 'crunch', 'slice', 'consume'];

export const ENTRANCE_ONLY = ['drop', 'rise'];

// Pairs that are technically different families but read as the same shot on screen. Only one of each pair
// may appear in a film.
export const TOO_ALIKE = [['crunch', 'slice'], ['impact', 'tumble'], ['pour', 'squeeze'], ['reveal', 'rise']];

// --- OPENINGS AND ENDINGS ----------------------------------------------------------------------------
// Openings and endings are pools in their own right, rotated per film -- not wherever the archetype's arc
// happened to start, and not always the same forced closer. A film that always opens on `reveal` and always
// ends on `consume` is most of how two otherwise-different films end up measuring as near-identical.
export const OPENERS = ['reveal', 'impact', 'macro', 'drop', 'rise', 'arrange', 'lineup', 'shadow', 'tumble', 'orbit'];
export const CLOSERS = ['consume', 'pullback', 'freeze', 'stack', 'splash', 'reveal', 'swirl', 'squeeze', 'dust', 'lineup', 'wear', 'flip'];

// Jaccard similarity between two family sets: shared / total distinct. 1.0 is identical, 0 is nothing in common.
export function familySimilarity(a, b) {
  const A = new Set(a), B = new Set(b);
  const shared = [...A].filter(x => B.has(x)).length;
  const union = new Set([...A, ...B]).size;
  return union === 0 ? 0 : shared / union;
}

// Chooses the family list for one film, actively steering AWAY from what has been made recently.
//
// `history` is a list of previously-used family arrays, most recent first. The picker searches every
// opener x closer x arc-offset combination and takes the first whose worst similarity against recent history
// falls under NOVELTY_THRESHOLD; if none does, it takes the least similar available rather than failing, so
// planning never blocks. It also insists on at least one family absent from the last few films, which is what
// makes each video carry something genuinely new rather than merely being a reshuffle.
export const NOVELTY_THRESHOLD = 0.5;
const NOVELTY_LOOKBACK = 6;

export function pickFamilies(scene, shotCount, seed, history = [], productType = 'spread', edible = true, weights = null, cfg = {}, hasProp = true) {
  const banned = new Set(cfg.banFamilies || []);
  const allowed = new Set(familiesForType(productType, edible, hasProp).filter(f => !banned.has(f)));
  const openerPool = OPENERS.filter(f => allowed.has(f) && !(cfg.banOpeners || []).includes(f));
  const closerPool = CLOSERS.filter(f => allowed.has(f) && !(cfg.banClosers || []).includes(f));
  const threshold = typeof cfg.noveltyThreshold === 'number' ? cfg.noveltyThreshold : NOVELTY_THRESHOLD;
  const required = (cfg.requireFamilies || []).filter(f => allowed.has(f));
  const deps = productType === 'solid' || !edible
    ? [...NEEDS_OPEN, ...NEEDS_OPEN_EXTRA, ...SOLID_NEEDS_OPEN]
    : [...NEEDS_OPEN, ...NEEDS_OPEN_EXTRA];
  const recent = history.slice(0, 18);
  const recentlyUsed = new Set(history.slice(0, NOVELTY_LOOKBACK).flat());
  let best = null;

  for (let o = 0; o < openerPool.length; o++) {
    for (let c = 0; c < closerPool.length; c++) {
      for (let off = 0; off < scene.arc.length; off++) {
        const opener = openerPool[(o + seed) % openerPool.length];
        const closer = closerPool[(c + seed) % closerPool.length];
        if (opener === closer) continue;
        const middle = [];
        const substitutes = [...allowed].filter(f => !ENTRANCE_ONLY.includes(f) && f !== opener && f !== closer);
        for (let i = 0; i < scene.arc.length && middle.length < shotCount - 2; i++) {
          const f = scene.arc[(off + i) % scene.arc.length];
          if (f === opener || f === closer || middle.includes(f)) continue;
          if (allowed.has(f)) { middle.push(f); continue; }
          // this archetype wants a family this product cannot do -- give the slot to the product's own
          // vocabulary rather than dropping it
          const sub = substitutes.find(x => !middle.includes(x));
          if (sub) middle.push(sub);
        }
        const families = [opener, ...middle, closer];
        if (families.length < shotCount) {
          const spare = [...allowed].filter(f => !families.includes(f) && !ENTRANCE_ONLY.includes(f));
          while (families.length < shotCount && spare.length) {
            families.splice(families.length - 1, 0, spare.splice((seed + families.length) % spare.length, 1)[0]);
          }
        }
        if (families.length < shotCount) continue;
        const openAt = families.indexOf('open');
        const dependents = deps.filter(d => families.includes(d));
        if (dependents.length && openAt === -1) continue;
        if (dependents.some(d => families.indexOf(d) < openAt)) continue;
        if (families.some((f, idx) => ENTRANCE_ONLY.includes(f) && idx !== 0)) continue;
        if (TOO_ALIKE.some(([a, b]) => families.includes(a) && families.includes(b))) continue;

        const worst = recent.length ? Math.max(...recent.map(h => familySimilarity(families, h))) : 0;
        const fresh = families.filter(f => !recentlyUsed.has(f)).length;
        const liked = weights ? families.reduce((a, f) => a + (weights[f] || 0), 0) : 0;
        const score = worst - (fresh * 0.05) - (liked * 0.02);
        if (!best || score < best.score) best = { families, score, worst, fresh };
        for (const need of required) {
          if (families.includes(need)) continue;
          const needsOpen = [...NEEDS_OPEN, ...NEEDS_OPEN_EXTRA,
            ...((productType === 'solid' || !edible) ? SOLID_NEEDS_OPEN : [])].includes(need);
          const openIdx = families.indexOf('open');
          const usable = [];
          for (let k = 1; k < families.length - 1; k++) {
            if (required.includes(families[k])) continue;
            if (families[k] === 'open' && deps.some(d => families.includes(d))) continue;
            if (needsOpen && openIdx !== -1 && k < openIdx) continue;
            usable.push(k);
          }
          if (usable.length) families[usable[usable.length - 1]] = need;
          else families.splice(families.length - 1, 0, need);
        }
        if (new Set(families).size !== families.length) continue;
        if (worst < threshold && fresh >= 1) return best.families;
      }
    }
  }
  return best ? best.families : scene.arc.slice(0, shotCount);
}

// --- ARCHETYPES: a fixed SET (continuity) + an ARC of DISTINCT action families ------------------------
// Each arc lists most of the action vocabulary in an order that suits that archetype, deliberately longer
// than any single film needs so a film takes a window of it. `veh` is the serving vehicle for a food-adjacent
// (edible) archetype -- deliberately different per archetype so the eating shot is never the same twice, and
// always named in set() so it is established before anything is done with it. For a non-edible product `veh`
// is simply unused (see vehicleFor()). Any spec may override the vehicle with `servingVehicle`.
const SCENES = {
  'ingredient-origin': { veh: 'a plain serving surface',
                         set: (p, m, v) => 'a single pale stone slab holding ' + m + (v ? ' and ' + v : '') + ', with the ' + p + ' arriving partway through',
                         arc: ['impact','tumble','macro','transform','reveal','open','dust','arrange','orbit','stack','shadow','splash','pour','use','spread','freeze','pullback'] },
  'unbox-reveal':      { veh: 'a plain serving surface',
                         set: (p, m, v) => 'one clean bright tabletop holding the sealed ' + p + (v ? ', ' + v : '') + ' and ' + m,
                         arc: ['drop','reveal','open','macro','impact','orbit','squeeze','use','spread','arrange','splash','pour','stack','shadow','transform','slice','pullback'] },
  'texture-study':     { veh: 'a plain serving surface',
                         set: (p, m, v) => 'the surface of the ' + p + ' filling frame, its pack' + (v ? ' and ' + v : '') + ' entering later, with ' + m + ' around it',
                         arc: ['macro','open','swirl','splash','pour','use','reveal','shadow','orbit','impact','spread','slice','transform','dust','arrange','stack','pullback'] },
  'pour-cascade':      { veh: 'a plain serving surface',
                         set: (p, m, v) => 'one marble slab that stays in frame throughout, holding ' + m + (v ? ', ' + v : '') + ' and the ' + p,
                         arc: ['reveal','impact','open','pour','splash','freeze','macro','orbit','squeeze','use','spread','tumble','arrange','stack','dust','transform','pullback'] },
  'lineup-family':     { veh: 'a plain serving surface',
                         set: (p, m, v) => 'one long counter with several units of the product standing in a row, ' + p + ' among them' + (v ? ', ' + v + ' at the near end,' : '') + ' and ' + m + ' scattered along it',
                         arc: ['lineup','arrange','orbit','reveal','open','macro','use','spread','impact','shadow','stack','splash','pour','tumble','transform','rise','pullback'] },
  'contrast-cut':      { veh: 'a plain serving surface',
                         set: (p, m, v) => 'one counter carrying both a plain reference and the ' + p + ' at the same time, with' + (v ? ' ' + v + ' and' : '') + ' ' + m,
                         arc: ['reveal','macro','open','use','spread','slice','impact','orbit','splash','pour','arrange','shadow','stack','dust','transform','swirl','pullback'] },
  'craft-build':       { veh: 'a plain serving surface',
                         set: (p, m, v) => 'one surface' + (v ? ' holding ' + v + ' and' : '') + ' filling up shot by shot, the ' + p + ' and ' + m + ' beside it throughout',
                         arc: ['reveal','open','use','spread','slice','arrange','impact','macro','stack','pour','squeeze','splash','orbit','dust','transform','rise','pullback'] },
  'spin-showcase':     { veh: 'a plain serving surface',
                         set: (p, m, v) => 'a turntable holding the ' + p + ' on a clean seamless background' + (v ? ', ' + v : '') + ' and ' + m + ' resting around its base',
                         arc: ['rise','reveal','orbit','macro','open','pour','swirl','splash','use','spread','shadow','impact','arrange','freeze','stack','transform','pullback'] },
  'serve-moment':      { veh: 'a plain serving surface',
                         set: (p, m, v) => 'one board holding the ' + p + ', a utensil' + (v ? ', ' + v : '') + ' and ' + m + ', all present from the start',
                         arc: ['open','use','spread','slice','macro','impact','orbit','reveal','splash','squeeze','pour','arrange','dust','stack','transform','tumble','pullback'] },
  'stack-play':        { veh: 'a plain serving surface',
                         set: (p, m, v) => 'one bright tabletop where ' + m + (v ? ' and ' + v : '') + ' are arranged around the ' + p,
                         arc: ['arrange','stack','tumble','impact','macro','reveal','drop','orbit','open','use','spread','splash','pour','dust','freeze','transform','pullback'] },
};

/**
 * Guards the ACTION TEXT itself, which the arc validator never looks at.
 *
 *  - SOUND WORDS IN AN ACTION. An action says what the camera SEES; sound is briefed once, at the end of the
 *    prompt. A sound word sitting inside a shot is how one interaction sound leaks across a whole film, so
 *    every video has it whether or not it is actually happening in that shot.
 *  - SUB-SHOT LISTS. The generator will not subdivide a written shot -- it morphs between subjects instead,
 *    which reads as unnatural rather than as an edit.
 */
export function validateActions() {
  const SOUND = /(audible|thud|sound|noise|crackle|sizzle|whoosh|pop(?:ping)? sound)/i;
  const SUBSHOT = /(each held|a rapid run of|in \d+ quick cuts|series of .* details)/i;
  const problems = [];
  const probe = { p: 'PRODUCT', m: 'MATERIAL', v: 'VEHICLE' };
  for (const [name, fn] of Object.entries(ACTIONS)) {
    for (const t of ['spread', 'solid']) {
      let text;
      try { text = fn(probe.p, probe.m, probe.v, t, { hasPortion: true }); } catch { continue; }
      if (SOUND.test(text)) problems.push(`${name} (${t}): names a SOUND -- "${text.match(SOUND)[0]}". Sound is briefed once at the end of the prompt.`);
      if (SUBSHOT.test(text)) problems.push(`${name} (${t}): asks for sub-shots -- "${text.match(SUBSHOT)[0]}". The generator will not subdivide a shot.`);
    }
  }
  return problems;
}

// Guards the ordering invariant above. Called by `--check`.
export function validateArcs() {
  const problems = [];
  for (const [name, scene] of Object.entries(SCENES)) {
    const openAt = scene.arc.indexOf('open');
    if (openAt === -1) continue;
    for (const dep of [...NEEDS_OPEN, ...NEEDS_OPEN_EXTRA]) {
      const at = scene.arc.indexOf(dep);
      if (at !== -1 && at < openAt) problems.push(name + ': "' + dep + '" at ' + at + ' precedes "open" at ' + openAt);
    }
    if (new Set(scene.arc).size !== scene.arc.length) problems.push(name + ': arc repeats a family');
    if (scene.arc.includes('consume')) problems.push(name + ': `consume` should not be in an arc, it is a closer');
    for (const f of scene.arc) if (!ACTIONS[f]) problems.push(name + ': unknown family "' + f + '"');
  }
  return problems;
}

// --- SHOT LENGTH CURVE -------------------------------------------------------------------------------
// A reference approved film ran 2/3/4/4/5/5/7 -- it opens snappy and lets the payoff breathe. Uniform lengths
// were what made every rejected film "feel like it's not ending". Weights rise from 0.55 to 1.5 across the
// film.
function shotLengths(total, n, seed) {
  const w = Array.from({ length: n }, (_, i) => 0.55 + (0.95 * i) / Math.max(1, n - 1));
  const j = [0, 0.12, -0.1, 0.08, -0.14, 0.05];
  for (let i = 0; i < n; i++) w[i] += j[(seed + i) % j.length];
  const sum = w.reduce((a, b) => a + b, 0);
  const out = w.map(x => Math.max(2, Math.round((x / sum) * total)));
  let diff = total - out.reduce((a, b) => a + b, 0);
  while (diff !== 0) {
    const idx = out.indexOf(Math.max(...out));
    out[idx] += diff > 0 ? 1 : -1;
    diff += diff > 0 ? -1 : 1;
  }
  return out;
}

// Shot count drives everything else. Measured: a reference film got 11 cuts from 7 written shots because the
// generator added cuts inside them, and a low shot count (4-5 over 30s) was measured as far too slow at any
// pacing description. So written shot count behaves as a FLOOR on cuts, never a ceiling, and the floor has to
// be set high enough on its own.
export function shotCountFor(durationSeconds, seed, cfg = {}) {
  // 2.8s average target by default -- research on fast-cut ecommerce product video (2026) converges on
  // roughly 2-4s per shot for feature beats, with a 1-3s hook. 2.8s sits inside that band; override with
  // cfg.shotSecondsTarget if a faster or slower cut rate is wanted.
  const base = Math.round(durationSeconds / (cfg.shotSecondsTarget || 2.8));
  const floor = Math.max(3, Math.round(durationSeconds / 4));

  // CEILING. shotLengths() cannot cut a shot below 2s, so past a certain shot count every shot lands on 2 and
  // the film comes out perfectly uniform -- which is exactly the flatness this whole design exists to avoid.
  // The binding constraint is that seconds must not divide evenly onto the floor: with n shots at a 2s
  // minimum, at least one spare second has to be left over for some shot to be longer, i.e.
  // n <= (total-1)/2.
  const varietyCeiling = Math.max(floor, Math.floor((durationSeconds - 1) / 2));
  const wanted = Math.min(13, base + [0, 1, -1, 1, 0][seed % 5]);
  return Math.max(floor, Math.min(varietyCeiling, wanted));
}

export const CAMERA_MOVES = [
  'a fast push in toward the subject', 'a pull back opening out to the whole surface',
  'a top-down drop straight down onto it', 'a low orbit travelling around it',
  'a whip pan that snaps across and lands on it', 'a rack focus from a foreground piece onto it',
  'a low slider gliding across at product height', 'a tilt climbing up the front of it',
  'a crash zoom onto one small detail', 'an overhead spin rotating above it',
  'a handheld snap reframe that lands hard', 'a 180 degree arc sweeping around behind it',
  'a full 360-degree orbit at a steady cinematic pace, gimbal-smooth',
];

const IMPERFECTIONS = {
  edible: ['a smear on the rim', 'one piece rolled out of the arrangement', 'an uneven edge where it was spread',
           'a drip running down the outside', 'a soft matte fingerprint on the surface', 'a crumb scatter across the board'],
  dry:    ['a scatter across the board', 'one piece rolled out of the arrangement', 'a piece sitting slightly askew',
           'a light dusting of fine particles on the surface', 'a soft matte fingerprint nearby', 'one item angled off the grid'],
};

const DEFAULT_MATERIAL = 'the loose material that goes into or around it';

export function renderShots(shots) {
  return shots.map((sh, i) =>
    'SHOT ' + (i + 1) + ' (' + sh.startAt + '-' + sh.endAt + 's): ' + sh.action + '.' +
    // `orbit`'s own action text already fully narrates the camera's move (a 360-degree circle at a steady,
    // gimbal-smooth pace) -- appending a second, independently-picked camera line on top of it produced a
    // direct contradiction in the shipped prompt ("...at a steady cinematic pace... Camera: a fast push in
    // toward the subject."), asking the generator to orbit slowly and push in fast in the same shot. `sh.camera`
    // is still assigned and still checked for no-repeat by the validator; it just isn't restated in the text
    // for this one family, since the action already said it.
    (sh.family === 'orbit' ? '' : ' Camera: ' + sh.camera + '.') +
    (sh.slow ? ' Run this one shot in slow motion, the only slow shot in the film.' : '')
  ).join(' ');
}

// The serving vehicle only applies to an edible product. A rigid/fabric/jewellery item, or a non-edible liquid
// or spread (a serum, a cosmetic cream), gets a neutral display prop instead -- never a food vehicle.
function vehicleFor(productType, edible, scene, override) {
  if (override) return override;
  if (!edible) return null;
  return productType === 'solid' || productType === 'powder' ? 'a small serving surface' : scene.veh;
}

export function composePrompt(opts) {
  const {
    productName, sceneArchetype, pacingProfile, hookSmall, hookLarge,
    material = DEFAULT_MATERIAL, kidDevice, nutritionAngle, productType = 'spread', edible = false,
    servingVehicle = null, soundtrack = null, part = 1, partsTotal = 1, partStartAt = 0, cfg = {},
  } = opts;
  // Default: assume a discrete, prop-able material for the food-adjacent categories (an ingredient that can
  // sit on the board -- berries, nuts, petals), and assume none for liquid/rigid/fabric/jewellery, where
  // "material" more often describes the product's own homogeneous substance rather than a loose prop. Override
  // explicitly with spec.looseMaterial when a non-food product genuinely has a loose prop (e.g. loose beads
  // beside a jewellery piece) or a food product genuinely has none.
  const hasProp = opts.hasProp ?? ['spread', 'solid', 'powder'].includes(productType);

  const seed = (productName || '').length + part;
  const durationSeconds = Math.min(MODEL_MAX_SECONDS, opts.durationSeconds || 28);
  const shotCount = opts.shotCount || shotCountFor(durationSeconds, seed, cfg);
  const look = LOOK[pacingProfile] || LOOK['fast-cut-energy'];
  const scene = SCENES[sceneArchetype] || SCENES['serve-moment'];
  const name = productName || 'the product';
  const vehicle = vehicleFor(productType, edible, scene, servingVehicle);
  const imp = edible ? IMPERFECTIONS.edible : IMPERFECTIONS.dry;

  const families = opts._families
    || pickFamilies(scene, shotCount, seed + (part - 1) * 7, opts.history || [], productType, edible, opts.weights || null, cfg, hasProp);

  const lens = shotLengths(durationSeconds, families.length, seed);
  // ONE shot in the film runs slow while everything else stays real-time -- contrast is what reads as edited;
  // uniform speed is what reads as slow motion. It lands on the most spectacular family present, never the
  // opener or the payoff, rather than a fixed position.
  const SPECTACLE = ['splash', 'freeze', 'crunch', 'dust', 'slice', 'stack', 'impact', 'pour', 'tumble', 'swirl', 'transform', 'arrange', 'orbit'];
  const slowIdx = cfg.slowShot === false ? -1 : (() => {
    for (const fam of SPECTACLE) {
      const at = families.indexOf(fam);
      if (at > 0 && at < families.length - 1) return at;
    }
    return Math.max(1, Math.min(families.length - 2, 2 + (seed % 2)));
  })();

  let t = 0;
  const shots = families.map((fam, i) => {
    const start = t; t += lens[i];
    const movePool = CAMERA_MOVES.filter(mv => !(cfg.banCameraMoves || []).some(b => mv.includes(b)));
    return {
      family: fam,
      startAt: partStartAt + start,
      endAt: partStartAt + t,
      seconds: lens[i],
      action: ACTIONS[fam](name, material, vehicle, productType, { hasPortion: families.includes('use') || families.includes('spread') }),
      camera: movePool[((i * 5) + seed) % movePool.length],
      slow: i === slowIdx,
    };
  });
  const finalShots = opts._shots || shots;
  const shotLines = opts._renderShots ? opts._renderShots(finalShots) : renderShots(finalShots);

  const partNote = partsTotal > 1
    ? ' This is part ' + part + ' of ' + partsTotal + ' of one continuous film; it must match the other parts exactly in surface, lighting, background and product placement so they cut together seamlessly.'
    : '';
  const textNote = partsTotal > 1 && part > 1
    ? 'TEXT: no on-screen text at all in this part.'
    : "TEXT: clean sans-serif in the upper-left over empty negative space, a small line reading '" + hookSmall + "' above a larger bolder line reading '" + hookLarge + "', holding legibly throughout.";

  return [
    sceneArchetype.replace(/-/g, ' ') + ' film for ' + name + ', shot on ' + look.cam + ', ' + look.light + '.',
    "Preserve the product's exact identity from the reference image: lock the label artwork, logo, brand name, typography, colours and pack shape. Do not redraw, restyle or invent any label text or brand mark.",
    'CONTINUITY: the whole film happens on ' + (opts._setLine || scene.set(name, material, vehicle)) + '. Nothing appears in frame unless it was already established or is shown physically arriving. Keep the same surface, lighting and background in every shot.' + partNote,
    'PACE: ' + look.rule + '. Hard cuts roughly every ' + (durationSeconds / finalShots.length).toFixed(1) + ' seconds or faster, never slower. ' + finalShots.length + ' distinct shots across ' + durationSeconds + ' seconds, cutting hard on every shot change, and cutting again WITHIN a shot wherever the action allows. Shot lengths deliberately vary from short and snappy to longer at the end.',
    'VARIETY RULE: every shot is a DIFFERENT KIND of action from every other shot in this film. Never show the same event twice, never show a settled or static arrangement, never let a shot simply hold. Each shot moves the film forward.',
    'CAMERA: every shot uses a DIFFERENT camera move, named per shot below. Never leave the camera static and never reuse a move.',
    kidDevice ? 'ENERGY: bright, playful and immediately eye-catching -- ' + kidDevice + '.' : '',
    nutritionAngle ? 'The product should read as genuinely credible to a buyer watching: ' + nutritionAngle + '.' : '',
    textNote,
    shotLines,
    'Keep the product\'s branding clean and legible while the set stays naturally imperfect, including ' + imp[seed % imp.length] + ' and ' + imp[(seed + 3) % imp.length] + '.',
    'No people beyond a hand where the shot needs one, no environment clutter, no objects teleporting into frame. No other on-screen text, no subtitles, no duplicate wording anywhere in frame.',
    (() => {
      const eatsAt = finalShots.findIndex(sh => sh.family === 'consume' || sh.family === 'crunch');
      const eatRule = eatsAt === -1
        ? 'There is NO eating or biting in this film: no biting, chewing, crunching or mouth sound anywhere.'
        : 'Eating sound belongs ONLY to shot ' + (eatsAt + 1) + ', where a piece is actually bitten. No biting, chewing or crunching sound in any other shot.';
      return 'Sound: ' + (soundtrack
        ? soundtrack + ' Keep the natural production sound of the product audible underneath it.'
        : 'No score. Production audio only.') + ' ' + eatRule;
    })(),
  ].filter(Boolean).join(' ');
}

export function composeFilm(opts) {
  const scene = SCENES[opts.sceneArchetype] || SCENES['serve-moment'];
  const seed = (opts.productName || '').length + (opts.part || 1);
  const cfg = opts.cfg || {};
  const durationSeconds = Math.min(MODEL_MAX_SECONDS, opts.durationSeconds || 28);
  const shotCount = opts.shotCount || shotCountFor(durationSeconds, seed, cfg);
  const productType = opts.productType || 'spread';
  const hasProp = opts.hasProp ?? ['spread', 'solid', 'powder'].includes(productType);
  const families = pickFamilies(scene, shotCount, seed + ((opts.part || 1) - 1) * 7,
    opts.history || [], productType, opts.edible ?? false, opts.weights || null, cfg, hasProp);
  let shots = null;
  const prompt = composePrompt({ ...opts, _families: families, _renderShots: (s) => { shots = s; return renderShots(s); } });
  return { prompt, families, shots, shotCount, durationSeconds };
}

// Split a target runtime into parts that each fit under the model cap.
export function planParts(targetSeconds) {
  if (targetSeconds <= MODEL_MAX_SECONDS) return [targetSeconds];
  const n = Math.ceil(targetSeconds / MODEL_MAX_SECONDS);
  const per = Math.floor(targetSeconds / n);
  const parts = Array(n).fill(per);
  parts[n - 1] += targetSeconds - per * n;
  return parts;
}

export function loadHistory(path = 'film-history.json') {
  return loadLedger(path).map(f => f.families).filter(Array.isArray);
}

export function loadLedger(path = 'film-history.json') {
  try { return JSON.parse(readFileSync(path, 'utf8')).films || []; } catch { return []; }
}

// How often each family appears in APPROVED films minus how often in REJECTED ones, normalised. Novelty stays
// a hard constraint; this only breaks ties between candidates that already pass it, so it nudges toward what
// is actually liked without ever steering the picker into repeating itself.
export function approvalWeights(ledger = loadLedger()) {
  const w = {};
  for (const f of ledger) {
    const delta = f.verdict === 'approved' ? 1 : f.verdict === 'rejected' ? -1 : 0;
    if (!delta) continue;
    for (const fam of f.families || []) w[fam] = (w[fam] || 0) + delta;
  }
  const max = Math.max(1, ...Object.values(w).map(Math.abs));
  for (const k of Object.keys(w)) w[k] /= max;
  return w;
}

// --- CLI ---------------------------------------------------------------------------------------------
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
const arg = process.argv[2];
if (!isMain) {
  // imported as a library: run nothing
} else if (arg === '--demo') {
  for (const a of Object.keys(SCENES)) {
    const p = composePrompt({
      productName: 'Aurora Vitamin C Serum', sceneArchetype: a, pacingProfile: 'fast-cut-energy',
      durationSeconds: 28, material: 'a thin golden-amber liquid', productType: 'liquid', edible: false,
      hookSmall: 'Dermatologist-formulated', hookLarge: '10% VITAMIN C',
    });
    console.log('\n=== ' + a + ' ===');
    console.log(p.slice(p.indexOf('SHOT 1'), p.indexOf('Keep the product')).trim());
  }
} else if (arg === '--novelty') {
  const CYCLE = [28, 32, 26, 40, 30, 25, 36, 29, 45, 27, 33, 26, 38, 31, 14];
  const ARCH = Object.keys(SCENES);
  const history = loadHistory();
  console.log('seeded history: ' + history.length + ' film(s)');
  let worstAll = 0;
  for (let i = 0; i < 15; i++) {
    const d = CYCLE[i % CYCLE.length];
    const scene = SCENES[ARCH[(i * 7) % ARCH.length]];
    const n = shotCountFor(Math.min(MODEL_MAX_SECONDS, d), i);
    const fams = pickFamilies(scene, n, i, history, 'spread', true);
    const worst = history.length ? Math.max(...history.slice(0, 18).map(h => familySimilarity(fams, h))) : 0;
    worstAll = Math.max(worstAll, worst);
    console.log(String(i + 1).padStart(2) + '  ' + String(d + 's').padStart(4) + '  ' +
      ARCH[(i * 7) % ARCH.length].padEnd(18) + (worst * 100).toFixed(0).padStart(3) + '%  ' + fams.join(' > '));
    history.unshift(fams);
  }
  console.log('\nworst similarity across the run: ' + (worstAll * 100).toFixed(0) + '%  (threshold ' + (NOVELTY_THRESHOLD * 100) + '%)');
} else if (arg === '--check') {
  const problems = [...validateArcs(), ...validateActions()];
  if (problems.length) { console.error('VALIDATION FAILED:'); for (const p of problems) console.error('  ' + p); process.exit(1); }
  console.log('validation passed: ' + Object.keys(SCENES).length + ' archetypes and ' + Object.keys(ACTIONS).length + ' actions, ordering, uniqueness, no sound words, no sub-shot lists');
} else if (arg === '--shape') {
  for (const d of [15, 20, 25, 28, 30, 36, 40, 45]) {
    const parts = planParts(d);
    const shape = parts.map((pd, i) => {
      const n = shotCountFor(pd, 12 + i);
      return pd + 's/' + n + ' shots [' + shotLengths(pd, n, 12 + i).join(',') + ']';
    }).join('  +  ');
    console.log(String(d).padStart(2) + 's total -> ' + parts.length + ' part(s): ' + shape);
  }
} else {
  console.log('usage: node composer/compose-prompt.mjs --demo | --check | --shape | --novelty');
}
