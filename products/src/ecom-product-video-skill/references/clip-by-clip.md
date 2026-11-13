# Clip by clip

The second way to make a film, alongside the single-take one this skill also supports. **Ask which at
intake.** Both are real; this one costs the same on the first attempt and far less on every attempt after.

Clients ask for this once they understand the credit math: a wrong five seconds of a 30-second single-take
film means regenerating the whole 30 seconds. Split into clips, only the wrong clip is redone.

---

## Why this exists, in one table

Prices are linear within a resolution, so a film split into clips costs exactly what it costs whole. The
difference is entirely in what a mistake costs.

| 20-second film at 1080p | Single take | Clip by clip |
|---|---|---|
| First attempt | 180 credits | 180 + ~8 for stills |
| One clip wrong | **+180** | **+45** |
| Two clips wrong | +360 | +90 |

A single bad morning of repeated whole-film regenerations can burn through most of a budget producing only a
handful of usable films, most of the spend going toward the same clip regenerated several times. Clip by
clip, the same morning costs a fraction of that.

---

## The sequence

```
1. PLAN      every clip written down: what is in it, how long, which model. Shown. Nothing generated.
2. STILLS    one still per clip, a small flat cost each. Shown side by side.
3. APPROVE   they approve the stills. This is where surface, branding and light get decided.
4. ANIMATE   each clip from its approved still, as start_image. One at a time.
5. REVIEW    each clip on its own, numbered, with what it carries.
6. REDO      a rejected clip regenerates from the SAME approved still. Only that one.
7. JOIN      when they say so, and not before.
```

**Steps 1 to 3 cost almost nothing and decide almost everything.** A wrong surface, illegible branding, the
reference photo's own table leaking into the shot — all of it shows on a cheap still, and none of it is
cheaper to find later.

---

## 1. The plan

A numbered table, before anything is spent:

```
#  Seconds  Model         What is in it                                    Carries
1  4        seedance_2_5  the bottle standing, camera arcing around it     silent
2  5        seedance_2_5  a single drop falling and landing on marble      text: "10% VITAMIN C"
```

Show it and wait. This is the last free moment to move a boundary, and it is also most of the review they
will do later, so agreeing the shape now makes that review short.

**Clip length: 4 to 10 seconds.** The model will not go below 4. Above 10 the saving on a redo starts to
shrink. One or two setups per clip.

**Cut where the film would cut anyway.** Where the action changes. A clip boundary is a hard cut in the
finished film; put it where a cut belongs.

---

## 2 and 3. Stills, then approval

**One still per clip, all of them before any motion.** Not one still for the film; one for each clip. Each
is the frame that clip opens on, and it becomes that clip's `start_image`.

**Continuity is planned here, not hoped for later.** Every still for the film uses the same written surface,
the same light, the same palette, the same camera — word for word in the prompt. Then put them in a row and
look. A still that does not belong with the others is a small fraction of the cost to redo now versus
discovering it in motion.

The standard is the same as for a face across a photoshoot: **would a stranger say these are from one film?**

Show the row. Wait for approval of every still. Then, and only then, motion.

---

## 4. Animate

Each clip, one at a time:

```js
generate_video({ params: {
  model: "seedance_2_5",
  mode: "omni_reference",
  prompt: "<this clip's setup, from the plan>",
  duration: <this clip's seconds>,
  resolution: "1080p",
  aspect_ratio: "<as asked>",
  medias: [
    { role: "start_image",      value: "<this clip's approved still>" },
    { role: "image_references", value: "<the product, if it is in this clip>" }
  ]
}})
```

**The still is the anchor.** It fixes the composition and the surface; the prompt describes only the motion
that happens from there. A prompt that re-describes the whole scene fights the still.

**Lower resolution for the first pass on a concept, full resolution once the look is approved.** Every rule
about passing `resolution` explicitly still applies — a default that is lower than intended does not announce
itself, so always state it.

---

## 5 and 6. Review, then redo only what failed

Show the clips separately, numbered, in one message:

```
Clip 1  (0:00-0:04)  bottle orbiting        silent
Clip 2  (0:04-0:09)  drop falling and landing   "10% VITAMIN C"
```

Ask for a verdict **per clip**. "Which numbers are fine and which need changing" — not "what do you think".

**A rejected clip regenerates from its same approved still.** The composition was already right; only the
motion is being redone. Change **one thing** in the motion prompt, and stop after the third attempt on the
same clip.

**An approved clip is finished.** Do not touch it because a neighbour changed.

---

## 7. Join

Only when they say so.

```bash
node finish.mjs --in <clip 1> --in <clip 2> --in <clip 3> --out final.mp4 --logo <path> --fade 0.7
```

Or on a remote runner if one is configured for this project, with the clips passed in order.

Every clip must be the same size. The pass refuses a mismatch by name rather than scaling one silently.

**The join is a hard cut, deliberately.** These films are built on hard cuts throughout, so a cut between
clips reads as another edit. A crossfade at the seam would be the one soft transition in the film and would
read as a mistake.

---

## What this mode gives up

Say it at intake, because it is a creative trade and not only a technical one.

**The generator's own cuts.** Generated as one take, it finds match cuts and motion-continuous transitions
inside the setups on its own. Split into clips, every join is ours and every join is hard. For most of these
films that is fine — they are built on hard cuts anyway. For a film whose whole point is one continuous
movement, single take is still the right call.

**A little continuity risk.** Two generations are two rolls for the surface and the light. The stills are how
that risk is managed, and they manage it well — but it is not zero, which is why the row of stills gets
looked at before a single clip is paid for.

---

## The ledger

One row for the film, never one per clip. The families column lists every family used across all the clips,
exactly as it would for a single take.
