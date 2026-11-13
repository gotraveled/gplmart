# The fast-cut composer: the script decides the shots

The third way to make a film, alongside clip-by-clip (`references/clip-by-clip.md`, hand-directed, one setup at
a time) and single-take (one continuous generation with no internal shot structure). This one sits between
them: **one generation, several fast cuts inside it, and the shot list is composed algorithmically** rather
than hand-written or left to chance.

Use it when the person says, in substance: *"just make it"*, *"you decide the shots"*, *"fast cut, don't ask me
seventeen questions"*, *"like [a reference video they show you]"*, or asks for a short energetic film without
wanting to approve each setup individually. It is not the default — clip-by-clip still is, because most people
want to see and approve each shot — but offer this explicitly whenever a request sounds like "just make it
fast."

---

## Why this exists, and what separates a film that reads as edited from one that reads flat

Measured against a real approved reference film against a rejected one of the same length, the difference was
**not** pacing — both cut roughly every 2.5 seconds. It was three specific, fixable things:

1. **Beats were phases of one event, not distinct actions.** A film that shows the same kind of thing
   happening twice reads as repetitive no matter how the two instances are worded. The composer draws every
   shot from a fixed vocabulary of **action families** (`references/shot-grammar.md`), and a family may never
   repeat inside one film.
2. **Shot lengths were uniform.** Every setup the same length is what makes a film feel like it's not ending,
   regardless of how fast the pacing language claims to be. The composer runs a **rising length curve** —
   short and snappy at the open, longest at the payoff.
3. **Too few written shots.** The generator treats a written shot as one continuous take and adds its own cuts
   inside it unreliably — measured as low as one cut every 4-6 seconds on some films and as many as 11 cuts
   from 7 written shots on another. The written shot count is a **floor on cuts, never a ceiling**, so it has
   to be set high enough on its own. The composer's default targets roughly **2.5-3s per written shot**, which
   sits inside the band independent research on fast-cut ecommerce product video converges on for 2026: a
   1-3 second hook, then feature beats in the 2-4 second range.

The composer enforces all three algorithmically, then a validator checks the result against every rule that
has ever come from a rejected film — physical plausibility, no repeats, dependency order (nothing poured or
worn before it was opened), timing, camera variety, and novelty against everything already made. **A model may
write anything; it may not ship anything that breaks a rule already paid for.**

---

## Works for any product, not just food

Every action family is gated on two independent axes, because physical form alone is not enough information:

- **Physical form** — `spread`, `liquid`, `solid`, `powder`, `rigid`, `fabric`, `jewellery`. What the material
  itself can do: a rigid object cannot be poured; fabric cannot be crunched; a jar cannot be worn.
- **Edible** — a true/false flag, independent of form. A skincare serum and a honey are both liquid, but only
  one of them is ever spread onto something and bitten. `use`, `spread`, `consume` and `crunch` (anything that
  assumes something is eaten or applied via a vehicle) require `edible: true`. Default `false` — get this
  wrong and a serum bottle gets "bitten" in the output.
- **Loose material / prop** — a third, separate flag (`looseMaterial`, defaults from the category). Several
  families (`impact`, `transform`, `arrange`, `tumble`, `dust`, `freeze`) describe the `material` field as
  discrete, countable pieces — berries dropping, nuts scattering. That reads as nonsense for a homogeneous
  liquid ("a thin golden-amber liquid... going from separate loose pieces to one combined mass"). Food
  categories (`spread`, `solid`, `powder`) default to `true`; everything else defaults to `false`. Override it
  explicitly only when a non-food product genuinely has a loose prop (loose beads beside a jewellery piece) or
  a food product genuinely has none.

Jewellery, fabric and rigid objects end up with a noticeably smaller usable family pool than food (no eating,
no loose pieces, no pouring) — expect fewer distinct archetypes to cycle through before the novelty check
starts asking for a repeat, and consider relaxing `cfg.noveltyThreshold` slightly for a high-frequency content
calendar in those categories specifically. This is an honest tradeoff, not a bug: those categories really do
have less physically plausible variety than a bag of snack pieces.

---

## The loop

```
1. INTAKE     the facts nobody can guess, in one message. Never look a product up.
2. PLAN       node composer/plan.mjs --spec <file> -- the script decides. Show the shot table and the cost.
3. GENERATE   one call, after the yes.
4. WATCH      all of it. Count the cuts. Check the text and the branding.
5. FINISH     the finishing pass: real logo, exact fade. See references/finishing.md.
6. RECORD     plan.mjs --record, which writes both the structural ledger and the shared human-readable one.
7. REVISE     one dimension per attempt. Know what is free (references/finishing.md, step 7 of SKILL.md).
```

---

## 1. Intake

Ask for all of these in **one prose message** — they are free text, a picker has nothing to offer. Ask every
time, for every product, even one filmed last week: this skill holds no catalogue.

| Field | Spec key | Why it cannot be guessed |
|---|---|---|
| Brand name | `brand` | Used for the shared ledger row and nowhere else in the prompt. |
| Product name, exactly as printed | `productName` | Goes on screen. |
| One clean product shot | (passed to the generator, not the spec) | A claim card or lifestyle image makes the generator fail outright. Look at the image; filenames lie. |
| Physical form | `productType` | `spread` / `liquid` / `solid` / `powder` / `rigid` / `fabric` / `jewellery`. Gates which actions are physically possible. |
| Is it actually eaten or applied via a vehicle? | `edible` | true/false. A liquid is not automatically edible. |
| What it's packaged in | `pack` | `jar` / `bottle` / `tube` / `squeeze-pack` / `pouch` / `box` / `case` / `wrapper` / `none`. Gates container-specific actions (a jar cannot be squeezed). |
| A loose prop material, if one exists | `material` | The discrete thing that can sit on the board as a prop (berries, nuts, petals) — or, if there is no natural prop, a short phrase describing the product's own surface, since `macro` uses this field either way. Never a generic filler like "a display stand" — that's what ends up under the macro lens. |
| What it looks/feels like up close | `inside` | Colour, texture, finish, how it behaves. You cannot write a texture nobody described. |
| Two claim lines, verbatim | `hookSmall` / `hookLarge` | A small intro line and a large accent line. The only words allowed on screen. Ask whether anything is not cleared for advertising. |

Then **duration**, as its own question, with the cost beside each option — see `references/generation.md` /
`references/providers.md` for the live per-second rate, since it depends on resolution and provider.

Everything else has a sensible default and may be left out: `sceneArchetype`, `hook`, `valueAngle`,
`pacingProfile` (default `fast-cut-energy`), `servingVehicle` (override the archetype's default food vehicle),
`soundtrack` (a description; otherwise production audio only), `instruction` (a free-text client note carried
into the prompt), `cfg.banFamilies`. Leaving a field unspecified means the composer rotates it by
least-recently-used against the shared ledger, which is the point of this mode.

---

## 2. Plan

**First decide whether the finishing pass will run** — see step 3 of `SKILL.md`. It changes one line of the
prompt (`finishing: "runner"` vs `finishing: "none"` in the spec) and getting it wrong costs a regeneration.

Write the spec to the scratchpad:

```json
{
  "brand": "Aurora Skincare",
  "productName": "Aurora Vitamin C Serum",
  "productType": "liquid",
  "edible": false,
  "pack": "bottle",
  "material": "runs slowly, catches and refracts light as it moves",
  "inside": "faintly viscous, not watery, a warm golden-amber colour",
  "hookSmall": "Dermatologist-formulated",
  "hookLarge": "10% VITAMIN C",
  "durationSeconds": 20,
  "finishing": "runner"
}
```

```bash
cd .claude/skills/ecom-product-video/composer
node plan.mjs --spec <scratchpad>/spec.json            # readable: shot table, cost, prompt
node plan.mjs --spec <scratchpad>/spec.json --json > <scratchpad>/plan.json
```

The composer tries archetypes in rotation order until the validator passes, so the plan it prints has already
cleared: no family repeated, no camera move repeated, form- and edibility-gated actions, `open` before
anything that needs an open product, no two too-alike families, shot lengths on a rising curve, and under 50%
overlap with every film in `composer/film-history.json`. Do not re-check these by eye.

**Show the person the shot table and the cost, then stop.** Something like:

> Here is the film the composer planned: 8 shots in 20s, `ingredient-origin`, hook `bounce-and-scatter`, value
> angle `whats-not-in-it`. [table] **~180 credits.** Shall I generate?

If they want a different shape, change the spec (an archetype, a banned family, a duration), re-run, show it
again. Planning is free. Generating is not.

**Optional cheap proof.** For a product, surface or branding never filmed before, a still of shot 1 answers
what no spec field can: does the label render, does the text land where reserved, does the surface look right.
Offer it; do not force it. See step 4b of `SKILL.md`.

---

## 3. Generate

Only after the yes. Import the product shot and pass the returned id/URL per the active provider — see
`references/generation.md` (Higgsfield) or `references/providers.md` (fal.ai). A raw local path is never
accepted directly.

```
model:        the provider's Seedance-family model
mode:         omni_reference (Higgsfield) / the image-to-video endpoint (fal.ai)
medias:       [{ role: "start_image", value: <the imported product shot> }]
resolution:   1080p
aspect_ratio: 9:16 unless asked otherwise
duration:     as planned, never above 30
prompt:       the `prompt` field from plan.json, verbatim
```

If the provider recommends a preset, **decline it** and generate literally — a preset replaces the whole
prompt, including the shot list, the variety rule, the text placement and the sound scoping.

---

## 4. Watch

Before sending anything, watch all of it. A green job status is not a review.

- **Count the cuts.** The generator treats a written shot as one take and adds cuts inside it unpredictably;
  the written count is a floor, never a ceiling. Measure, then decide.
- **Is there text you did not ask for?** The generator pulls label text off the reference image.
- **Does the branding match the real product in every shot?**
- **Does it end resolved**, on a settled beat, at full brightness (finishing pass runs) or faded (it doesn't)?
- **Did anything appear that was never established?** The composer's continuity line exists specifically to
  prevent this.

---

## 5. Finish

Same finishing pass as the rest of the skill — see `references/finishing.md`. Nothing about the fast-cut mode
changes how it runs; `--in` still takes the result URL directly, `--logo` still needs the brand's own file.

---

## 6. Record

Variety only works if the ledger knows what was made.

```bash
node plan.mjs --record <scratchpad>/plan.json --verdict pending --note "job <id>"
```

That appends the film to `composer/film-history.json` (the structural ledger this composer reads for novelty
scoring) **and** mirrors a summary row into the shared `ledger.txt` that `references/ledger.md` documents, so
a film made in this mode and one made clip-by-clip both count against each other's variety check. When the
result is approved or rejected, update the verdict in `film-history.json` — `approvalWeights()` uses it to
lean toward what actually gets approved, without ever overriding the novelty constraint.

---

## 7. Revise

**First ask whether the change costs anything.** With the finishing pass available, three changes are free,
re-run on the same clip: a different or removed music track, a different fade, the logo on or off or swapped.
Anything in the picture or the on-screen wording is a full regeneration.

| They say | Change in the spec |
|---|---|
| "too slow" | shorter `durationSeconds`, or `cfg.shotSecondsTarget: 2.3` |
| "same as last one" | a different `sceneArchetype`; the ledger already prevents family overlap |
| "why is it doing X" | `cfg.banFamilies: ["X"]` |
| "text unreadable" | this is composition, not font size; the prompt reserves the upper-left, check whether shot 1 filled it |
| "looks fake" | make `inside` more specific: real weight, how it actually moves |
| "I want a 360 spin" | `cfg.requireFamilies: ["orbit"]`, or `sceneArchetype: "spin-showcase"` |

**Change one dimension per attempt.** **Stop after the third attempt on the same film** — three failures is a
brief problem, not a prompt problem.

---

## Reference: dev/test commands

```bash
node composer/compose-prompt.mjs --demo      # print a sample film for every archetype
node composer/compose-prompt.mjs --check     # validate every archetype's arc and every action's text
node composer/compose-prompt.mjs --shape     # print the shot-count/length curve at several durations
node composer/compose-prompt.mjs --novelty   # simulate a 15-film run and report worst similarity
node composer/validate-film.mjs              # run the validator against the composer across product categories
```

## What this mode cannot do

- **Direct individual shots.** That's clip-by-clip. Here the composer decides; the levers are the spec fields
  and `cfg`, not rewriting the shot list by hand.
- **Draw the logo.** Same rule as everywhere else in this skill — the prompt forbids it, the finishing pass
  adds the real file.
- **Control cut density exactly.** Written shots are a floor. Measured, not assumed.
- **Invent a claim.** If a line is not in the brand's own source material, that's their decision.
- **Remember between sessions** except through `composer/film-history.json` and the shared `ledger.txt`.
