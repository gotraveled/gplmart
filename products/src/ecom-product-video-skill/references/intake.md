# Intake

Eighteen questions. Seven block, eleven have defaults. Works for any product category — food, skincare,
apparel, electronics, homeware, jewellery, supplements, anything with a real photo.

---

## How to ask

Two kinds of question, and using the wrong mechanism for one of them fails outright.

**Free text — ask in plain prose, in the message. Never through a multiple-choice picker.** These have no
fixed set of answers; a picker needs two to four discrete options and there are none to offer.

> 1 product name · 2 images · 4 what it looks/feels like · 5 claims/selling points · 15 reference video ·
> 16 what to avoid · 17 must-have moment · 18 logo file

**A real choice — a picker is fine, and faster than typing.** These have a small closed set.

> 3 form/material · 6 duration · 7 aspect ratio · 8 surface · 9 the hook · 10 the value angle · 11 pacing ·
> 12 on-screen text yes/no · 13 audio route · 14 provider · 17 where it runs

**So the first batch is prose, not a picker**, because the blocking questions are mostly free text. Ask for
the name, the images, the form/material, what it looks or feels like and the claims in one clear message.
Form is a choice but belongs with them — describe it as an open question ("what is it, physically, and how
does it behave when handled?") rather than a fixed picker, because the answer space spans every product
category there is.

Ask in batches of three or four. Not one at a time, and not all eighteen at once.

**There is no catalogue. Ask every time, for every product, including ones made before.**

This matters more than it looks. Brands add products, change packaging, redesign labels, launch new
variants, and a film for a product launching next week has to be as easy as one for a product filmed last
month. So the skill holds no list of products, no stored images, no cached claims, no stored brand identity.
Everything comes from the person, fresh, on every run.

Do not look a product up. Not in a catalogue, not from a previous conversation. Even for a product filmed
before, ask again: the packaging may have changed and the claims may have been reworded, and a film built on
an old label is a reprint, not an edit.

The only thing carried between runs is the ledger, and it holds columns about *shape* — families, archetype,
pacing — never product facts, never claims.

Guessing a product's texture, material or claim is how a film gets rejected for a reason nobody can fix in
the edit.

---

## Blocking. Do not generate without these.

### 1. Product name, exactly as the brand writes it
Goes on screen and into the prompt. Two spellings or capitalisations of a name are different products to a
reader. Ask them to copy it, not type it from memory.

### 2. Product images
Ask for **as many angles as they have**. A clean product shot is the minimum; an opened/unpackaged view,
contents or components loose, and a texture or material close-up all help, when the product has them.

**The primary shot must be a clean, isolated product shot.** Product alone, plain or simple background, no
burned-in marketing text, no claim-card layout, no lifestyle scene. Reference images with any of those tend
to make the generation fail outright rather than degrade gracefully.

**Ask what each image shows, one line each.** Sealed/boxed, opened, contents or components loose, a
texture/material close-up, worn or in use. That mapping decides which reference goes with which setup, and
it is the thing that keeps the product consistent across the film. Filenames do not tell you: `product-2.jpg`
could be an unpackaged shot or a claim card, and one of those fails the generation outright.

**Opening an upload widget: set it to the number of angles you asked for.** If the tool used to collect
images takes a max-files parameter, set it to the number of angles agreed, not a low default — the person
cannot add a fifth image to a widget that was opened for two, however many they actually have.

Label the request with the **angles wanted**, not a generic "product photos". A vague ask is how a film ends
up capped at two references when the brand actually had five useful ones.

*Look at every image before using it.* A claim card or a lifestyle photo passed in as a reference tends to
fail the generation outright: the prompt asks to lock branding onto an image while forbidding on-screen text
over an image that is mostly text. The filename saying "product" is not verification. Look at it.

### 3. Product form and material
Ask openly: *"What is it, physically — solid, liquid, powder, fabric, rigid object, something else — and how
does it behave when handled?"* This gates which actions are physically possible and prevents the single most
common failure: the generator showing an action the product cannot actually do.

Some worked examples, as a guide rather than an exhaustive list:

| Kind | Examples | Can | Cannot |
|---|---|---|---|
| **spread / paste** | nut butter, cosmetic cream, adhesive | spread, swirl, squeeze, stretch, dollop | pour out, crunch, stack, dust |
| **liquid** | honey, juice, serum, perfume | pour, drizzle, ribbon, splash | crunch, stack, dust |
| **solid pieces** | snack pieces, tablets, small hardware | pour out, tumble, stack, dust, crunch if edible | pour, spread, swirl, squeeze, splash |
| **powder** | drink mix, cosmetic powder, protein powder | dust, pour, bloom, dissolve | crunch, slice, stack |
| **rigid single object** | a bottle, a gadget, a jar, a tool | rotate, open/close, click, be picked up and set down | pour, spread, crunch, dissolve |
| **fabric / apparel** | a garment, a bag, a towel | unfold, drape, fold, be worn, stretch within fabric limits | pour, crunch, dissolve, stack rigidly |
| **jewellery / small accessory** | a ring, a watch, a pendant | rotate, catch light, be placed, be worn | pour, spread, crunch, dust |

Get this wrong and the film shows a rigid gadget being "poured" or a garment being "crunched". Reasoning
about the actual object in front of you, rather than pattern-matching to the nearest example above, is the
part that actually prevents this.

### 4. What it looks or feels like, up close
Colour, texture, finish, material, how it behaves when touched or moved: "matte, cool to the touch, holds a
crisp edge"; "glossy, viscous, catches light as it moves"; "soft-brushed cotton, drapes rather than holds a
shape." For a product with no meaningful interior (a sealed gadget, a piece of jewellery) this can be about
surface finish and material instead.

You cannot write a texture or finish nobody has described to you, and a generic one reads as stock footage.

### 5. Claims or selling points, verbatim from the brand's own source material
Ask them to copy the claim or selling-point text exactly from their packaging, spec sheet or product listing.
This is the **only** text permitted on screen.

Also ask: **is anything on this list not cleared for advertising, or does this category have restrictions on
what can be claimed?** Regulated categories — health, beauty efficacy, financial, supplements, anything with
an outcome claim — are the ones where this matters most. On-screen text is a real-world claim, not a
creative surface, and it is the brand's call which claims are safe to run, not the skill's.

### 6. Duration

Ask this on its own. It drives structure and cost, and bundling it with the aspect ratio forces a combined
choice that hides most of the options.

| | | Rough cost |
|---|---|---|
| **8-9s** | the default. Three setups. | lowest of the standard lengths |
| 12-15s | three or four setups | ~1.5-2x the 8-9s film |
| 20s | four or five setups | ~2.5-3x |
| 25-30s | five or six setups | ~4-4.5x |
| custom | anything from 4s to 30s | linear per second — see `references/generation.md` / `references/providers.md` |

**Three setups is the floor at every length.** Two reads as slow whatever happens inside them.

**Also offer the teaser, but only as a named choice:** *"or a slow one-to-two shot teaser, a coming-soon or a
single detail study, which is deliberately different from the rest."* It is the only format allowed to be
slow. Never pick it just because the runtime is short.

**Hard floor 4s, hard ceiling 30s.** Above 30 the model clamps to 30 silently and bills for 30, so a 45s
request costs the same as 30s and returns 30s.

### 7. Aspect ratio

A separate question.

| | Use |
|---|---|
| **9:16** | vertical phone. Reels, Shorts, TikTok. The default. |
| **1:1** | square feed posts |
| **3:4 or 4:5** | portrait feed, taller than square without being full vertical — confirm which the chosen model actually supports; not every model offers both |
| **16:9** | YouTube, web embeds, TV |
| **4:3** | older/boxy, rarely wanted |
| **21:9** | ultrawide cinematic |

Check the current model's supported ratio list before promising one — it varies by model and provider, and an
unsupported ratio should be said plainly rather than silently substituted.

---

## Defaults offered, override welcome

### 8. Where is it shot
A surface and setting appropriate to the product: a marble counter, a warm wood board, pale stone, a seamless
colour backdrop, a styled flat-lay, a simple studio sweep for apparel or hardware.

Keep it a **contained product scene** — a table, counter, board or simple set. Large open environments with
sweeping aerial camera tend to fail outright rather than producing a weak result.

### 9. The hook — what makes someone stop scrolling
What makes this specific product visually arresting for its specific audience. Examples, not a fixed list:
`bounce-and-scatter` · `color-pop` · `stretch-and-drip` · `pop-in-assembly` · `splash-impact` ·
`reveal-surprise` · `rotate-and-catch-light` · `unfold-and-drape` · `speed-play`

The fun is carried by **the product performing**, not by a person on camera and not by colour grading over a
static shot.

### 10. The value angle — what makes it worth buying
The named fact that makes it feel worth the price, in the brand's own language. Examples, not a fixed list:
`whats-not-in-it` · `whats-really-in-it` · `made-differently` · `key-spec-or-material` · `single-source-origin` ·
`craftsmanship` · `everyday-fit` · `expert-backed`

The hook and the value angle should reinforce each other, not compete.

### 11. Pacing
`fast-cut-energy` · `speed-ramp` · `product-spin` · `snap-macro` · `drone-sweep` (scoped to tabletop) ·
`stop-motion-pop` · `real-time-human` · `slow-luxe`

**Never default to slow.** Slow is one option, appropriate mainly to a 1-2 setup teaser.

### 12. On-screen text
Ask whether they want any. Then:

- **Which claim or line.** Verbatim, from question 5.
- **Two tiers reads best**: a small intro line, then a large accent line, if the brand has reference footage
  that does this — otherwise ask what they'd prefer.
- **No CTA button, no "Shop now"**, unless the brand specifically wants one and has referenced it working
  for them before.
- **A brand colour**, not plain white, if they have one.
- **Punctuation preference** — ask if they have a house style (many brands avoid the em dash on-screen).

### 13. Audio
Four options, ask which:

1. **They supply a track** — it goes to the FINISHING pass, not to the generator, and the prompt then asks
   for ambient only. Two music beds fight otherwise. See `references/generation.md`.

   **Then ask where the file lives.** It decides whether the track is usable at all, and it cannot be sorted
   out afterwards without regenerating:

   | Where the track is | Route |
   |---|---|
   | A local file, and the finishing pass runs here | `--audio ./track.mp3`. Fine |
   | An https URL | Works either way, including a remote runner if one is configured |
   | A local file, and the pass cannot run here | **No route** without first getting it to a URL |

   In that last case say so before generating, and settle it then: get the file to a URL, or drop back to
   describing the music for the generator. Discovering it after the clip exists means the prompt already
   asked for ambient-only and the film has no music at all.
2. **They describe what they want** — "light playful marimba, upbeat, no vocals"
3. **Ambient only** — the sound of the product itself, if it makes one, or simple room tone
4. **Silent** — they will add music later

The generator produces audio by default. If they want silence, say so explicitly in the prompt.

**Scope any interaction sound** — a bite, a click, a zip, a splash, a snap. Name the setup where it actually
happens, and forbid it elsewhere. Left unsaid, generators tend to add it everywhere.

### 14. Generation provider
Ask, or decide per `references/providers.md`: Higgsfield by default, fal.ai if Higgsfield is not connected
or they specifically want fal.ai. Say which one is in use before quoting any cost.

### 15. A reference video to match
Optional. If they have a film whose look they want, ask for it and pass it as a video reference. Describe
what specifically they like about it — pace, palette, camera — because "like this one" is not directable on
its own.

### 16. What to avoid
Ask directly. "Anything from a previous video you did not like?" Cheaper than discovering it in review.

### 17. Must-have moment
Anything that has to be in frame. A specific detail, the product label facing camera, a particular action.

### 17b. Where it will run
Instagram Reels, YouTube Shorts, a website hero, an in-store screen, a marketplace listing video. Affects
safe margins: Instagram's UI covers roughly the top 14%, right 15% and bottom 18%, so keep text out of those
bands unless the destination is different.

### 18. The brand's logo file
Ask for it now, not at delivery time. A transparent PNG is best. Without it, the finishing pass has nothing
to place, and the honest answer is a film with no logo rather than one where the generator invents or
approximates a mark — see "What this cannot do" in `SKILL.md`. If they do not have one ready, confirm that
shipping without a logo for now is fine, and that it can be added later with a free re-run of the finishing
pass once supplied.
