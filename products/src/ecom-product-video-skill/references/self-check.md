# Self-check

Run before generating. Costs nothing. A failed generation costs money and a round trip.

---

### Physics

- [ ] **No action contradicts the product's form or material.** Nothing rigid is poured or spread. Nothing
      liquid is crunched, stacked or dusted. Nothing fabric is treated as rigid.

- [ ] **Anything needing the product open has it open.** `pourout` `crunch` `slice` `consume` come after
      `open` or `unbox`, or the product is established as already open.

- [ ] **Nothing appears that was not established or shown arriving.**

### Variety

- [ ] **No action family repeats inside the film.**

- [ ] **No camera move repeats inside the film.**

- [ ] **Each setup is a new action, not the previous one continuing.**

- [ ] **Overlap with every ledger row for this brand/product line is under 0.5**, computed as
      `(families in both) / (families in either)` — not judged by eye.

- [ ] **The rotated dimensions are least-recently-used for this brand**, not merely different from last time.
      Archetype, pacing, hook, value angle.

- [ ] **Not `serve-moment` again.** Open, lift, spread, use, eat or wear is capped at 1 in 8 and never twice
      running.

### Timing

- [ ] **Setup lengths differ.** Not all equal.

- [ ] **The longest setup lands on the most spectacular action**, not a static beat.

- [ ] **Duration is at or under 30s.** Above 30 the model clamps silently and bills for 30.

### Inputs and frame

- [ ] **Every reference image has been looked at**, not trusted by filename. No claim card, no lifestyle
      shot, no burned-in text — in **any** slot, not just the primary one.

- [ ] **The scene is contained.** A table, counter, board or simple set. No large open environment, no
      aerial travel. `drone-sweep` means a tabletop glide.

- [ ] **On-screen text avoids the platform's UI bands.** For Instagram that is roughly the top 14%, right 15%
      and bottom 18%. Text placed there is covered by the interface, not by the composition.

### Claims

- [ ] **No claim has slipped in that was not verbatim from the brand's own source material.** If the category
      is regulated — health, beauty efficacy, financial, supplements — flag anything that reads as an outcome
      claim rather than an ingredient/spec-level fact back to the brand rather than putting it on screen.

### Text and sound

- [ ] **Every on-screen word is verbatim from the claims they supplied**, and none is a claim they flagged as
      not cleared. Follow their punctuation preference if they gave one.

- [ ] **All other text is forbidden explicitly**, and the composition reserves space for the text that is
      allowed.

- [ ] **Any interaction sound is scoped** to the setup where it actually happens, or ruled out entirely.

- [ ] **The ending resolves** rather than cutting hard on the last frame.

- [ ] **The frame has been proven on a still**, unless the same product, surface and text were proven on a
      recent film for this brand.

---

## The five gates

**None of these is a judgement call.** Each is a thing that either happened or did not.

- [ ] **The clip plan was shown, with a cost per clip, and they said yes** — before anything was generated.

- [ ] **Every clip has an approved still, and every still existed before any motion.** Not "the first one".
      Every one.

- [ ] **The cost was priced and said before each generation** (`get_cost` on Higgsfield, a computed estimate
      on fal.ai), and a yes came back each time.

- [ ] **What is left in the account was checked before each generation** (`balance` on Higgsfield, a running
      total on fal.ai), and no call was made that would leave the film unable to be fixed if it came back
      wrong.

- [ ] **Spend on this film has not passed twice the plan cost** — or it has, and they were asked in so many
      words and said keep going.

- [ ] **Every fault on a rejected clip was listed before it was regenerated**, and it was regenerated once,
      from its same still.

- [ ] **Clips still being argued about were at the lower resolution.** Full resolution only for a look that
      has been approved.

## Clip by clip

- [ ] **The plan was written and shown before anything was generated** — every clip, its seconds, its model,
      what it carries.

- [ ] **One still per clip, all of them before any motion**, and they were shown in a row.

- [ ] **Every still uses the same written surface, light, palette and camera**, word for word.

- [ ] **Each clip was animated from its own approved still** as `start_image`, not from a prompt alone.

- [ ] **Clips were shown separately and numbered, and a verdict was taken per clip.**

- [ ] **A rejected clip was regenerated from its same approved still**, with one change, and nothing else
      was touched.

- [ ] **Nothing was joined before they said so.**

- [ ] **Every clip is the same resolution.** The finishing pass refuses a mismatch; do not make it.

## After it generates

- [ ] Watch it before sending. All of it.
- [ ] **Count the cuts.** Asked for 3 setups and got one continuous take? The written setup count is a floor
      on cuts, never a guaranteed ceiling or an exact count — measure it before deciding anything.
- [ ] Is there text you did not ask for? The generator pulls label/packaging text off the reference image.
- [ ] Does the product's branding match the real thing across every setup?
- [ ] Does it end resolved?
- [ ] Print the ledger line for them to paste as a new row. See `references/ledger.md`.

If it is wrong, first ask **whether the change costs anything at all** — music, fade and logo are free
re-runs of the finishing pass. See step 7 of `SKILL.md`. Only picture and wording need a new generation.

If it does need regenerating, change **one** dimension. Changing several at once means the next result
teaches you nothing.

**Stop after the third attempt on the same film.** Three failures is not a prompt problem any more, it is a
brief problem — an impossible action, an unusable reference, or a request the model will not do. Say so, say
what has been spent, and settle it with the person rather than spending a fourth time to find out.
