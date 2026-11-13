---
name: ecom-product-video
description: Make one e-commerce PRODUCT film end to end, interactively, for any brand or product - the product performing, with no presenter and no voiceover. Use for creating, generating, remaking or iterating on a product video, ad clip or B-roll for any e-commerce item. Covers intake, shot design, prompt writing, generation on Higgsfield (falling back to fal.ai when Higgsfield isn't available), a Remotion finishing pass for logo, fade and audio, and revision. Includes a fast-cut mode - "just make it", "you decide the shots", "fast cut", "like this reference video" - where a script composes several hard-cut shots (2-3s each, 360 orbits, drone-style sweeps) into one generation instead of directing every setup by hand. NOT for films with a spoken voiceover (narrated story) or a person to camera (talking review/UGC) - those need a different script-first workflow.
---

# One product film at a time, for any brand

The product performs, and nothing else is in frame. No presenter, no voiceover, no person to camera.
Everything here assumes that.

If someone asks for a voiceover or a person on camera, say plainly that this skill does not do it rather than
producing a product film with the wrong label. Mislabelling a film is exactly what a locked scope exists to
prevent.

This skill is **brand-agnostic**. It holds no product catalogue, no brand name, no fixed logo, and no fixed
generation account. Every run asks for the product, the claims, the images and the brand's own logo file
fresh — and it can run on **any** product in **any** e-commerce category: food, skincare, apparel,
electronics, homeware, jewellery, supplements, anything with a real product photo.

Every rule below exists because a specific film came back wrong somewhere, on some product. `references/why.md`
explains the reasoning behind the rules that are not self-evident; read it before deciding a rule is
excessive.

**Higgsfield (falling back to fal.ai) makes the film. Remotion finishes it.** Footage, cuts, on-screen text
and sound design all come out of the generation prompt. The finishing pass adds exactly three things the
generator cannot do — the real logo, the ending fade, and a supplied audio track — and nothing else. See
`references/finishing.md`.

---

## Provider: Higgsfield first, fal.ai if it isn't available

Decide this at the very start, before intake. Full detail in `references/providers.md`.

1. Higgsfield is the default generation provider.
2. If Higgsfield's tools are not connected, not authenticated, or out of balance — or the person explicitly
   asks for fal.ai — fall back to fal.ai. Say so in one line when it happens.
3. Everything downstream (the prompt template, the shot grammar, the still-before-motion gate, the spending
   discipline) is identical either way. Only the calling mechanics and the cost mechanics differ, and those
   are in `references/providers.md`.
4. If neither provider is reachable, stop and say so rather than guessing at a cost or a call that cannot
   actually be made.

---

## Which mode: clip-by-clip, single-take, or the fast-cut composer

Three ways to make the film. Decide this before intake, because it changes what gets asked.

| Mode | When | Reference |
|---|---|---|
| **Clip-by-clip** (default) | The person wants to see and approve each shot before it's animated. | `references/clip-by-clip.md` |
| **Single-take** | The whole point is one unbroken continuous movement a cut would break. | `SKILL.md`, "The loop" below |
| **Fast-cut composer** | "Just make it", "you decide the shots", "fast cut", "like this reference video", or any request for a short energetic film where the person does not want to direct each setup. A script composes several hard-cut shots (rising length curve, no repeated action or camera move, form- and edibility-gated, one 360-orbit-capable archetype) into **one generation**, validated before it's shown. | `references/fastcut-composer.md` |

The fast-cut composer is the right answer whenever someone shows a reference film and says "like this, but
faster to make" — it produces the same class of result (several hard cuts inside one generation, a rising
shot-length curve, real camera variety including 360° product orbits and tabletop drone-style sweeps) without
seventeen questions or one-clip-at-a-time approval. It still shows the full shot plan and the cost before
generating — that gate never goes away, only the shot-by-shot approval does.

---

## Write in English, unless told otherwise

By default, every word this skill produces is in **English** — the questions, the explanations, the prompt,
the delivery note, the ledger row. If the person doing intake writes in another language and no on-screen
text language has been specified, ask which language the **on-screen text and claims** should render in — it
does not have to match the conversation language, and for many brands it will not.

A skill picks up the conversational habits of whatever account it runs on. That is fine for the back-and-forth
with the person running it; it is not fine for the generation prompt, which should say explicitly what
language any on-screen text is in, because the generator renders exactly what it is told.

---

## The loop

The film is made **clip by clip**. Each clip is 4 to 10 seconds, generated on its own from its own approved
still, reviewed on its own, and joined at the end when they say so. A wrong clip is regenerated alone.

```
0. PROVIDER    Higgsfield, or fall back to fal.ai. Say which. references/providers.md.
1. INTAKE      ask, and stop until answered. Never invent a claim or a product fact.
2. DESIGN      pick the shot structure. Variety is enforced here, not hoped for.
3. PLAN        every clip written down - what is in it, seconds, model, cost. Shown. Approved.
4. STILLS      one still per clip, ALL of them before any motion. Shown in a row. Approved.
5. GENERATE    one clip at a time, from its approved still. Cost said and agreed each time.
6. REVIEW      each clip on its own, numbered. A verdict per clip.
7. REDO        only the rejected ones. Every fault listed first; one regeneration fixes all. Same still.
8. JOIN        when they say so. Logo, fade, audio go on here. references/finishing.md.
9. LOG         the ledger row.
```

`references/clip-by-clip.md` has each step in full. If the person wants the script to decide the shots instead
of directing each one, use the fast-cut composer instead — `references/fastcut-composer.md` — which still
shows a full shot plan and cost before generating, it just composes the shot list algorithmically rather than
one setup at a time.

**Single take is the exception, not the alternative.** One generation of up to 30 seconds is the right call
only for a film whose whole point is one continuous movement that a cut would break. It keeps the model's own
internal cuts; it also means a wrong five seconds costs the whole film again. Say which one this film is at
intake, and default to clip by clip.

---

## Spending. Five gates, not five suggestions.

A morning once ran hundreds of credits in under two hours on repeated whole-film regenerations, because every
rule below existed only as advice. **Advice did not stop it.** These are gates: the skill does not proceed
past one without what it asks for. They hold on both providers — see `references/providers.md` for how the
mechanics differ on fal.ai.

**1. The plan is the gate.** Nothing is generated until the clip plan — every clip, its seconds, its model,
its cost — has been shown and they have said yes to it.

**2. No motion without an approved still.** For every clip. The still is not offered, it is required. A wrong
surface costs a few percent of a still versus a whole clip in motion, and it cannot be seen any other way.

**3. Say the cost and get a yes before every generation.** Not once at intake — before every call that
spends. On Higgsfield, `get_cost: true` prices it without submitting; use it, then ask. On fal.ai, compute the
estimate from the model's published rate and say it is an estimate.

**4. Balance floor.** On Higgsfield, check `balance` before every generation; if the call would leave fewer
than **100 credits**, stop and say so — that is the margin for fixing the film being made. On fal.ai, keep a
running total in the conversation and apply the same discipline.

**5. Per-film cap.** When the spend on one film passes **twice its plan cost**, stop. Show the running total.
Ask, in so many words, whether to keep going. Do not continue on an implied yes.

**And two rules for redoing a clip:**

- **Collect every fault first.** Watch the whole clip, list everything wrong with it, then regenerate once
  with all of it fixed. Regenerating on the first fault found, then the next, then the next, is the single
  most avoidable way to burn a budget in an afternoon.
- **Lower resolution until the look is approved, full resolution for the final.** A clip whose composition is
  still being argued about does not need delivery resolution.

---

## 1. Intake

Ask the questions in `references/intake.md`. Ask them in batches of three or four, not one at a time, and not
all at once.

**Ask free-text questions in prose. Only use a multiple-choice picker for real choices.** The product name,
the images, the description and the claims have no fixed set of answers, so a picker has nothing to offer and
fails. Form, duration, ratio, pacing and the rest do have closed sets and a picker suits them.

The first batch is therefore prose, because the blocking questions are mostly free text.

**Ask for the product every time. Never look one up.** Not from a catalogue, not from an earlier
conversation, not even for a product filmed last week. Brands add products, redesign packs and rewrite
claims, and a brand-new product with new images and a new description is the normal case, not the exception.
Offering a menu of known products is a bug: it makes a new product feel unsupported and it risks building a
film on a label or claim that has since changed.

**This skill holds no brand identity of its own. Every run needs the brand's own logo file** to finish the
film correctly — see question 18 in `references/intake.md`. Without it, the film ships with no logo rather
than a borrowed or invented one.

**Seven answers are mandatory. Do not proceed without them:**

| | Why it blocks |
|---|---|
| Product name, exactly as it appears in their branding | Goes on screen. Wrong name is a reprint, not an edit. |
| A clean isolated product shot | A claim-card or lifestyle image makes the generator fail outright, not degrade |
| Product **form / material** (what it physically is and how it behaves) | Decides which actions are physically possible |
| Key visual or material detail (texture, finish, what's inside/underneath) | You cannot write a texture or finish you have not been told |
| Claims or selling points, verbatim from their own source material | On-screen text is a real-world claim, not a creative flourish |
| Duration | Drives structure and cost. Ask on its own. |
| Aspect ratio | Ask separately. |

Everything else has a sensible default. Offer the default, let them override.

---

## 2. Design the shot structure

**Duration decides setups. Never the other way round.**

| Runtime | Written setups | Pacing band |
|---|---|---|
| 8-9s | **3** | fast |
| 12-15s | 3-4 | fast |
| 20s | 4-5 | fast |
| 25-30s | 5-6 | fast |
| **teaser, on request only** | **1-2** | slow allowed |

**Three is the floor.** Even at 8 seconds. A film with two setups reads as slow no matter how much motion is
inside them — a single unbroken shot reads as slow regardless of how dynamic the motion within it is. Three
setups in 9 seconds is roughly 3s each, which is the intended density, not a rush.

Above 30s the model silently clamps to 30 **and bills for 30**. Never request more.

A written setup is a **camera and subject arrangement**, not a cut. The generator decides its own internal
cuts and is unreliable about the count — do not expect the number of written setups to equal the number of
cuts in the output. The written setup count is a **floor on cuts, never a ceiling**, which is exactly why the
floor is three rather than two.

### The slow teaser is opt-in, never a default

One to two setups, slow and lingering, is a real format — a "coming soon", a single held texture or detail
study. But it only exists **when someone asks for it**. Never choose it to fill a short runtime.

Tempo follows setup count, and this is the only slot where slow is permitted:

| Setups | Pacing |
|---|---|
| 1-2 | slow profiles allowed. Teaser only |
| 3 | middle |
| 4-6 | fast. Never slow |

Then pick, using `references/shot-grammar.md`:

- **Action families**, one per setup, none repeating inside the film. This is the unit of variety.
- **Filter by product form and material first.** A rigid object cannot be poured or spread; a garment cannot
  be crunched; a liquid cannot be stacked. Reason about the actual physical properties of this specific
  product before picking a family — do not default to food-style actions for a non-food product.
- **A hook** — what makes someone stop scrolling for this specific product and audience.
- **A value angle** — the one fact that makes it worth buying, in this brand's own words.
- **A pacing profile.** Never default to slow motion. The words "slow motion" belong in a prompt only when
  the profile is genuinely slow.

**Check it against the ledger — all of it, computed.** See "The ledger" below. Overlap is
`(families in both) / (families in either)`. Any row scoring **0.5 or higher means choose again.** Judging
this by eye is unreliable — two approved films can look distinct to a person and still score high overlap.

**Then rotate, do not merely avoid.** For archetype, pacing, hook and value angle, pick the value **least
recently used in the ledger for this brand/product line**, not just one that is not a literal repeat.
Avoiding the last film keeps you next to it; rotating walks the space. Advance the pools by different amounts
so they do not travel in lockstep.

Without this the skill drifts back to the same film every time.

---

## The ledger

Variety needs memory. It lives in a plain local file, `ledger.txt`, in this skill folder — see
`references/ledger.md` for the format and the script that reads and writes it.

**Before designing**, read it:

```bash
node scripts/ledger.mjs read
```

Compute the overlap against **every row for this brand or product line**, not just the recent ones. **0.5 or
higher means choose again.**

**If the ledger comes back empty, say so.** An empty ledger is not a clean slate for variety purposes, it is a
disabled check — nothing is stopping the skill rebuilding a recent film. If a record of recent films exists
outside this file (a shared sheet, a Slack thread, someone's memory), backfill from it before designing.

**After a successful run**, append the row:

```bash
node scripts/ledger.mjs add "<date> | <brand> | <product> | <families> | <archetype> | <pacing> | <hook> | <value angle>"
```

The line to print or record:

```
2026-09-21 | Aurora Skincare | Vitamin C Serum | reveal, macro, drop | texture-study | snap-macro | ingredient-macro | dermatologist-backed
date       | brand           | product          | families            | archetype     | pacing     | hook            | value angle
```

If there is no ledger yet for this brand, ask them to describe the last couple of films they made, or accept
that the check will not catch anything this first time and say so plainly.

---

## 3. Write the prompt

**First, find out whether the finishing pass can run. Before writing a word of the prompt.**

```bash
cd .claude/skills/ecom-product-video/finish && node check.mjs
```

It prints `READY` or `NOT READY` with the reason, and it decides by **actually rendering two frames** rather
than by loading a module. Loading the render library only proves the JavaScript is present; rendering shells
out to separate compositor binaries that a locked-down machine can refuse while the import succeeds. A false
`READY` here means a prompt that told the generator "do not fade to black" and reserved the fade for
Remotion — and then the render dies, leaving a film with **no logo and no fade**, unrecoverable without
regenerating at full cost.

Running `ffmpeg -version` is not a substitute either: the bundled binary fails standalone even on a machine
where rendering works, because Remotion sets up its own environment for it. A real render is the only honest
test. It takes some seconds and downloads Chrome the first time.

**If that fails, do not give up on it — install it.** Where there is a shell, the pass is one command away.

> The finishing pass is not installed yet. It adds the logo and the ending fade. Installing takes a few
> minutes and downloads about 400 MB, once. Shall I?

```bash
cd .claude/skills/ecom-product-video/finish && npm install
```

Then run the READY check again. The **first render** is also slow — Remotion pulls a headless Chrome the
first time it is used. That is expected, and it only happens once.

**If it still says NOT READY, try a remote runner before giving up on the logo**, if this repository has one
configured (a GitHub Actions workflow that runs `finish.mjs` elsewhere). If none is set up, this is genuinely
unavailable — see "When it cannot run" in step 6.

It decides where the fade comes from, and getting that wrong costs a regeneration:

| Finishing pass | The `[ENDING]` section says | Result |
|---|---|---|
| **available** | *do NOT fade to black* | Remotion adds an exact fade, plus the logo |
| **not available** | *fade gently to black over the last half second* | The generator fades it. No logo. |

Decide this now because it cannot be fixed afterwards. A clip generated on the assumption Remotion would
fade it, then delivered without Remotion, has **no logo and no fade** and the only remedy is generating it
again.

The same check governs audio. A supplied music track only goes to the finishing pass if the pass can run; if
it cannot, the track cannot be laid on at all and the honest options are to describe the music to the
generator instead, or hand the clip over for someone to add the track themselves.

Then follow `references/prompt-template.md` exactly. It is a template because free-written prompts drift.

The parts that matter most, and are most often skipped:

- **State the fixed set.** Surface, props, and when the product enters frame. Nothing may appear that was not
  established or shown arriving.
- **Each setup is a NEW action**, not the previous one continuing. Beats that are phases of one event read as
  a stutter, not a cut.
- **Name the on-screen text and where it sits**, and reserve space for it in the composition. Text needs
  somewhere to live or it lands on top of the subject.
- **Scope sound explicitly.** Say which setup, if any, has an interaction sound (a bite, a click, a zip, a
  pour). Left unsaid, the generator tends to add one everywhere.
- **Say what must NOT appear.** No text beyond what you named, no hands unless asked for, no logo.

---

## 4. Check before spending

Run down `references/self-check.md`. It costs nothing. A failed generation costs money and a round trip.

The three that catch the most:

1. Does any action contradict the product's physical form or material?
2. Does any camera move or action repeat inside the film?
3. Is every on-screen word verbatim from the claims they gave you?

---

## 4b. The still for every clip. Not optional.

**Gate 2. No clip is generated until its opening still has been approved.** One still per clip, all of them
before any motion, shown in a row so continuity can be seen — same surface, same light, same palette across
every one.

A still-image model (Nano Banana Pro on Higgsfield, the equivalent on fal.ai — see `references/providers.md`)
costs a small fraction of a video generation. A wrong still is cheap to redo; a wrong clip in motion is not.
It answers the questions that actually fail:

- Does the product label or branding render legibly, and is it correct?
- Does the on-screen text land in the space the composition reserved for it?
- Is the surface, the lighting and the palette right?
- Does the product's material or texture look like what they described?

None of those can be predicted from an intake answer. They can only be looked at. Fix the prompt, reshoot the
still for a small additional cost, and only commit to motion once the frame is right.

**The approved still becomes that clip's `start_image`.** That is what makes a rejected clip cheap to redo:
the composition is already right, only the motion is regenerated.

---

## 5. Generate — one clip at a time

**One clip per call, from that clip's approved still.** Full call shape for both providers is in
`references/generation.md` (Higgsfield) and `references/providers.md` (fal.ai).

**Before every call: say the cost, check what is left in the account, get a yes.** Gates 3 and 4. Then
generate. Then show that one clip and wait for its verdict before the next.

Import the product image first (Higgsfield: `media_import_url`; fal.ai: it must already be at an https URL)
before passing it as a reference — a raw local path is never accepted directly.

If the provider offers a preset recommendation instead of the literal prompt, decline it and generate
literally — presets override the prompt.

---

## 6. Finish

```bash
cd .claude/skills/ecom-product-video/finish
node finish.mjs --in <result_url> --out <path> --logo <path/to/brand-logo.png> [--audio <track>] [--no-logo] [--fade 0.7]
```

`--in` takes the generator's result URL directly; no download needed. Duration and frame size are measured
from the clip, so any aspect ratio works.

**`--logo` points at the brand's own logo file for this run.** This skill carries no logo of its own — pass
the file supplied at intake (question 18). Omit `--logo` and pass `--no-logo` if no logo file was supplied
and the person is fine shipping without one for now.

**If a track is supplied here, the generation prompt must have asked for ambient only.** Remotion layers audio
over the clip's own sound rather than replacing it, so generator-made music plus a supplied track gives two
music beds fighting. `references/finishing.md` has the wording.

### When it cannot run

Some environments have no shell at all. **Do not present a menu of options.** Deliver the video and state the
gap in one line:

> Here is the film. The finishing pass cannot run here, so it has no logo and no fade. To add them, run this
> on a machine with Node: `node finish.mjs --in <url> --out final.mp4 --logo <path>`

Then carry on. Offering several infrastructure choices mid-run turns a delivered video into a support ticket.

Never say a video is finished when the pass did not run.

---

## 7. Revise

They will iterate. That is the point of one-at-a-time.

### Ask one question first: does this change cost anything?

**Three kinds of change are free**, because they live in the finishing pass and it re-runs on the same clip as
many times as you like. Regenerating for any of these burns real money for nothing:

| They ask for | Cost | How |
|---|---|---|
| Different music, or remove it | **0** | re-run `finish.mjs --audio <new track>` |
| Longer, shorter or no ending fade | **0** | `--fade 1.2`, or `--fade 0` |
| Logo on or off, or a different logo file | **0** | `--logo <other file>` or `--no-logo` |
| Anything in the picture | full | regenerate |
| On-screen wording | full | regenerate — text lives in the prompt |

So before touching the generator, check which side of that line the request falls on. Treating a free-run
music or fade change as a regeneration is the most avoidable spend there is.

This only holds where the finishing pass runs. Where it does not, music and fade are baked in and every
change is a regeneration — one more reason to get it installed.

### Collect every fault before regenerating

Watch the whole clip. List everything wrong with it. **Then regenerate once**, with all of it addressed. Three
regenerations to fix one fault at a time is strictly worse than one regeneration that fixes all three. A
rejected clip regenerates **from its same approved still** — the composition was already right.

### Keep a running total

State what this film has cost so far when it goes past one regeneration. A number in front of someone changes
what they ask for next, and nobody wants to discover the total at the end of the month.

**Change one dimension per attempt.** Changing pacing and structure and text together means the next result
teaches you nothing about which change worked.

Common asks and the actual lever:

| They say | Change |
|---|---|
| "too slow" | fewer setups, faster profile, shorter runtime |
| "boring / same as last one" | different archetype and family set, not just new words |
| "text is unreadable" | reserve negative space in the composition, not a bigger font |
| "looks fake / too CGI" | name real physics: weight, gravity, how it actually moves |
| "nothing happens" | the action families are too passive, pick performing ones |

---

## What this cannot do

Say these plainly if they come up. Do not let them be discovered in a review.

- **The generator must never draw the logo.** A generation model approximating a brand mark breaks brand
  rules quietly, which is worse than having none. The prompt forbids it; the finishing pass adds the real
  file the brand supplied. Do not pass the logo as a reference image hoping it gets copied faithfully without
  testing it first.
- **Without the finishing pass there is no logo and no fade.** Say so rather than implying the video is
  finished.
- **Cut density is not controllable.** The written setup count is a floor, not a promise. Short runtimes hide
  this because two setups is the right answer anyway; longer ones do not.
- **The generator renders its own text** from label or packaging detail in the reference image. That is why
  the prompt must name the exact words and forbid everything else.
- **Nothing is remembered between videos** beyond the ledger row — and only if it was actually written.
- **Claims cannot be invented.** If they want a claim that is not in their own source material, that is a
  decision for the brand, not a prompt change.
