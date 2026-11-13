# Generation on Higgsfield

Higgsfield is the default provider — see `references/providers.md` for when to fall back to fal.ai instead,
and for fal.ai's own calling convention. Everything below is Higgsfield-specific mechanics; the prompt itself
is written the same way regardless of provider.

Higgsfield MCP. Model `seedance_2_5`.

---

## Cost

**9 credits per second at 1080p.** Say the number before spending it.

The number depends on resolution:

| Resolution | Per second | 10s | 20s | 30s |
|---|---|---|---|---|
| 720p | 6.5 | 65 | 130 | 195 |
| **1080p** | **9.0** | **90** | **180** | **270** |

**Every figure below is the 1080p price**, because that is what a final delivery generates at. Confirm the
resolution the quoted price is for whenever quoting a number — a quote and a generation at different
resolutions is how a film comes back costing more than expected.

Linear within a resolution: four 5-second clips cost the same as one 20-second clip.

| Runtime | Credits |
|---|---|
| 8s | 52 |
| 9s | 59 |
| 15s | 135 |
| 20s | 180 |
| 30s | 270 |

**Over 30s Seedance clamps to 30 silently and bills for 30.** A 45s request costs the same as 30s and returns
30s. Never request more.

`get_cost: true` preflights without submitting, if you want it confirmed.

### Prove the frame first, for a small fraction of the cost

**Nano Banana Pro stills are 2 credits flat.** Against 59 for a 9-second film, that is roughly a 29:1 ratio,
and the still catches exactly what goes wrong: label or branding legibility, text placement, surface,
lighting, texture. Shoot setup 1 as a still, look at it, fix the prompt, and only then commit to motion. See
step 4b of `SKILL.md`.

---

## The call

```js
generate_video({ params: {
  model: "seedance_2_5",
  mode: "omni_reference",          // required with a reference image
  duration: 9,
  resolution: "1080p",
  aspect_ratio: "9:16",
  medias: [{ role: "start_image", value: "<media_id>" }],
  prompt: "<the full prompt>"
}})
```

**`mode` must be `omni_reference`** when passing any reference media. The default `t2v` rejects it outright:

```
422: mode 't2v' does not accept reference media; start_image and end_image are only
     allowed for mode 'omni_reference'
```

**Import the image first.** `media_import_url` with the image URL returns a `media_id`. A raw `https://` URL
in `medias` is rejected.

**Roles:** `start_image` for the primary product shot. `image_references` for additional angles.
`video_references` to match an existing film's look. `audio_references` for a supplied track.

---

## Decline presets

If the response carries a preset recommendation instead of a result, Higgsfield is offering to override your
prompt with a template. Decline and generate literally:

```js
generate_video({ params: { ...sameParams, declined_preset_id: "<the suggested id>" } })
```

Left unhandled this silently replaces a carefully composed prompt with a generic one.

---

## Waiting

`jobs_wait` polls up to 15s per call. A 9s clip typically takes **2 to 5 minutes**. Keep polling; do not
assume failure.

Terminal response carries `result_url`, a direct mp4.

---

## Multiple angles

One product, several photographs, one film. This is the normal case and it is worth setting up properly,
because it is the difference between a product that stays itself across every setup and one that quietly
drifts.

**Import every image.** `media_import_url` returns one `media_id` per image, and each one has to be imported
separately. A raw `https://` URL inside `medias` is rejected.

```js
medias: [
  { role: "start_image",      value: "<primary product shot, clean and isolated>" },
  { role: "image_references", value: "<opened / unpackaged view, if there is one>" },
  { role: "image_references", value: "<contents or components loose, if applicable>" },
  { role: "image_references", value: "<texture or material close-up>" }
]
```

### Match the angle to the setup that needs it

Do not just hand over every photo and hope. Each setup has a shot it wants, and naming that link in the prompt
is what makes the product hold together:

| Setup family | Wants |
|---|---|
| `reveal` `orbit` `drop` | the primary, sealed/closed product shot |
| `open` | the opened, unpackaged or unboxed view, if they have one |
| `pourout` `tumble` `arrange` `stack` | contents or components loose |
| `macro` `crunch` `slice` | the texture or material close-up |
| `spread` `swirl` `pour` | contents in motion, or the texture shot |

Then say it in `[THE PRODUCT]`: *"the sealed pack in setups 1 and 2, opened from setup 3, the same label
throughout."* The generator drifts branding detail between setups unless it is pinned, and a reference for
the state being asked for is the strongest pin there is.

**Ask what each image actually shows** rather than guessing from the filename. An image called `product-2.jpg`
could be an unpackaged view or a claim card, and one of those makes the whole generation fail.

**More is not automatically better.** Four or five useful angles beat ten near-identical ones. If a shot does
not serve a setup in this film, leave it out.

Do not pass a claim card, a lifestyle photo, or anything with burned-in text. See `why.md`. **This applies to
every image, not only the primary one** — a claim card slipped in as the fourth reference fails the
generation just as completely as one passed as the first.

---

## Audio

Seedance generates audio by default. There are two places a track can go in, and picking the wrong one gives
two music beds fighting.

**If they supplied a music file** — do NOT pass it here. Ask Seedance for ambient only, and lay the track on
in the finishing pass, which is exact and can be swapped without regenerating:

    [SOUND]
    Ambient room tone and the sound of the product only. No music, no score, no melody.

**If they only described what they want** — put the description in the prompt's SOUND section and let Seedance
compose it. Cheaper than sourcing a track, and it lands with the picture.

**Ambient only, no music at all** — say so in the prompt, as above.

**Silent** — `generate_audio: false`, and say "no audio" in the prompt too.

**Do not reach for `generate_audio: false` when a track is being supplied.** It is tempting, because a
parameter is more reliable than asking in the prompt. But it removes *all* Seedance audio, including the
ambient and product sounds, and the finishing pass layers a track **over** those rather than replacing them.
Killing them leaves a film with music and nothing else, which sounds hollow. Ask for ambient-only in the
prompt and let the track sit on top.

**`audio_references` exists but is unverified.** Seedance 2.5 accepts an audio media role, so a supplied
track could in principle go in at generation time and skip the finishing pass entirely — which would matter
on a machine where the pass cannot run. Two cautions. The role is called a *reference*, and in every other
slot on this model a reference **steers** rather than reproduces, so it may return a soundalike rather than
their track. And audio baked in at generation cannot be swapped afterwards: changing the music becomes a paid
regeneration instead of a free re-run of the finishing pass. Test it before offering it, and keep it as the
fallback, never the default.

Either way, scope any interaction sound explicitly. Left unsaid it tends to appear in every video regardless
of whether anything is actually being touched or eaten.

---

## Revisions

Every regeneration is billed in full. A 9-second re-roll is another 59 credits, so the cheapest revision is
the one that was not needed — which is what step 4b of `SKILL.md` exists for.

When a change is needed anyway, there are two routes:

**First check it is not free.** Music, fade and logo all live in the finishing pass and cost nothing to
change. See step 7 of `SKILL.md`. Only picture and on-screen text need Higgsfield.

**Rehearse an expensive film on a cheaper model.** Seedance 2.0 Mini is **2.5 credits/second** against 6.5,
so a 12s structural test is 30 credits where the real thing is 108. Worth it when the film is long or the
structure is untried, since a 30s film is 270 credits to get wrong. Caps at 15s and 720p, and it takes
`image_references` rather than `omni_reference`, so it proves **pacing and whether the beats read** — not
final fidelity. Skip it for a routine 9s film, where a 2-credit still is enough.

**Regenerate with one dimension changed.** The default. Change exactly one thing so the next result tells
you whether that thing was the problem. Changing pacing, structure and text together means the outcome
teaches you nothing and the next attempt is another guess.

**`mode: "video_edit"`.** Seedance can edit one reference video rather than building a new one. Be clear
about what this does and does not buy:

| | |
|---|---|
| Cost | **Billed by the reference video's duration.** A 9s edit is ~59 credits, the same as generating |
| Saves | Not money per attempt. It stops you re-rolling the parts that were already right |
| Worth it when | The lighting, product and composition landed and one beat is wrong |
| Not worth it when | The structure is wrong. Rebuild it properly |
| Status | Verify on something disposable before relying on it for a client-facing film |

`duration` and `aspect_ratio` are ignored in this mode; the output follows the reference video.

---

## If it fails

| Symptom | Cause |
|---|---|
| 422 on media | `mode` is not `omni_reference` |
| Generation fails outright, no partial | Reference image is a claim card or has burned-in text |
| Same, on a sweeping landscape shot | Large open environment plus aerial travel. Scope to tabletop/contained scene. |
| Garbled text in frame | Seedance rendering label or packaging text. Forbid all other text explicitly. |
| One continuous take, no cuts | Setup count not stated up front in FORMAT |
| Returned 30s when more was asked | Expected. Hard cap. |
| A preset was applied instead of the prompt | Decline it and regenerate |
