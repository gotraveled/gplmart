# Shot grammar

Where variety actually comes from. Not from writing different words — from choosing a different **structure**.

Two films for different products can come out reading nearly identical despite different copy, if nothing
governs structure. That is why this file exists.

---

## Action families

One per setup. **None may repeat inside a film.** The family is the unit of variety.

| Family | What happens |
|---|---|
| `reveal` | the product comes into view, uncovered or revealed |
| `open` | pack, box, jar, lid or case is opened |
| `unbox` | outer packaging is removed to show what's inside |
| `impact` | something lands, hits, drops onto a surface |
| `orbit` | camera travels around the product |
| `use` | product is used, worn, held or operated |
| `spread` | applied across a surface |
| `macro` | one held extreme close-up of texture, material or detail |
| `consume` | a piece is actually eaten or applied (food, cosmetics) |
| `transform` | state changes: melts, sets, folds, unfolds, changes colour |
| `arrange` | pieces or components are placed into an order |
| `pullback` | frame widens to show the whole scene |
| `pour` | a stream falls from a vessel |
| `stack` | pieces build upward |
| `splash` | impact throws a crown or droplets |
| `drop` | something enters frame falling, or a single drop falls from the product |
| `freeze` | motion stops on a held beat |
| `swirl` | a spiral forms in a soft medium |
| `slice` | something is cut through |
| `dust` | fine particles fall or scatter |
| `rise` | something lifts up out of frame or a vessel |
| `tumble` | pieces roll and settle |
| `lineup` | several variants or components presented in a row |
| `shadow` | light and shadow move across the subject |
| `squeeze` | pressure forces product out or fabric compresses |
| `pourout` | dry pieces or contents cascade from a container |
| `crunch` | a piece breaks with an audible snap |
| `wear` | the product is put on, worn or fastened (apparel, jewellery, accessories) |
| `fold` | fabric or a flexible material folds or drapes into a new shape |
| `click` | a mechanical or digital interaction: a button, a lid, a latch, a screen lighting up |
| `flip` | the product or a component turns over to show another face |

### Gate by product form and material first

Reason about the specific product before picking, rather than defaulting to the nearest category. A few
worked examples:

| Form | Forbidden |
|---|---|
| **solid pieces (food, tablets, small hardware)** | `pour` `squeeze` `swirl` `splash` `use` `spread` `transform` |
| **spread / liquid / powder** | `pourout` `crunch` `stack` `dust` |
| **rigid single object (bottle, gadget, jar)** | `pourout` `crunch` `stack` `fold` `wear` |
| **fabric / apparel / soft goods** | `pour` `spread` `crunch` `dust` `splash` |
| **jewellery / small rigid accessory** | `pour` `spread` `crunch` `dust` `pourout` `fold` |

**Physical form is not the only gate.** Two more questions decide the vocabulary, independent of form:

- **Is it actually eaten or applied via a vehicle?** `use`, `spread`, `consume` and `crunch` all assume
  something is eaten or worked onto something else. A liquid is not automatically edible — a skincare serum
  and a honey are both liquid, but only one of them is ever bitten. Default to *no* unless the product is
  genuinely food or a cosmetic actually applied to skin/hair on camera.
- **Does a genuine loose prop exist?** `impact`, `transform`, `arrange`, `tumble`, `dust` and `freeze` all
  describe the loose material as discrete, countable pieces — berries dropping, nuts scattering. That reads as
  nonsense applied to a homogeneous liquid or a single rigid object with nothing loose beside it. Only reach
  for these families when there is a real prop that can plausibly scatter, stack or hang in the air — not a
  generic filler object invented to justify the family.

The fast-cut composer (`references/fastcut-composer.md`) encodes both of these as explicit flags
(`edible`, `looseMaterial`) and gates the vocabulary automatically. In hand-directed clip-by-clip mode, ask
the same two questions yourself before picking a family — it is the same physical-plausibility check either
way, just enforced by code in one mode and by judgement in the other.

### Ordering rules

- `drop` and `rise` are **entrances**. They belong first or not at all.
- `pourout` `crunch` `slice` `consume` need the product **open** first. Either put `open` earlier or establish
  it as already open.
- `wear` needs the product visible and identifiable first — do not open on a garment already worn with no
  establishing shot.
- These pairs are too alike to sit in one film: `crunch`+`slice`, `impact`+`tumble`, `pour`+`squeeze`,
  `reveal`+`rise`, `open`+`unbox`.
- `consume` / `use` is **not** a mandatory ending. Forcing it as every closer is what produces samey films
  across a whole product range.

---

## Scene archetypes

The skeleton. Pick one, then draw families that serve it.

| Archetype | Shape |
|---|---|
| `ingredient-origin` | a raw material or component becomes the finished product |
| `unbox-reveal` | packaging arrives, opens, contents revealed |
| `texture-study` | close study of what it is made of |
| `pour-cascade` | product falls, streams or cascades |
| `lineup-family` | the range or variants presented together |
| `contrast-cut` | this versus the alternative |
| `craft-build` | something is assembled step by step |
| `spin-showcase` | product turns, seen from all sides |
| `stack-play` | pieces build a structure |
| `serve-moment` | opened, lifted, applied, used, eaten or worn |
| `detail-macro` | one sustained close study of a single feature — a clasp, a seam, a dropper, a texture |

**`serve-moment` is capped at roughly 1 in 8 and may never run twice in a row.** It is the skeleton everyone
reaches for by default, and it is the fastest way for a whole content run to feel interchangeable across
different products.

---

## Causal arcs, not repeated phases

Each setup must be a **new action that follows from the previous one**. Not the same action continuing.

Beats written as phases of one event read as a visible stutter — the same motion repeating rather than the
story advancing.

**Declare the fixed set** in the prompt: the surface, the props, and the moment the product enters. Nothing
may appear in frame that was not established or shown physically arriving.

---

## Camera

Never repeat a move inside one film.

`fast push in` · `pull back to the whole surface` · `top-down drop` · `low orbit` · `whip pan` ·
`rack focus from foreground` · `low slider at product height` · `tilt up the front` · `crash zoom on a detail` ·
`overhead spin` · `handheld snap reframe` · `180 degree arc` · `full 360-degree orbit`

**Scope drone-sweep to tabletop.** A landscape fly-over combined with a large open environment fails outright
on Seedance. Keep it a glide across a counter, a rail, or a simple set — a drone-style pass at tabletop scale,
not an aerial flyover.

**Writing a 360° orbit.** Say the full mechanic, not just the word "orbit" — a bare "orbit around it" produces
inconsistent speed and framing. The wording that reads reliably as an intentional, professional move:

> *the camera orbits a full 360 degrees around the product at a steady, cinematic pace; the product stays
> centred in frame throughout, gimbal-smooth motion, never distorting or warping, snapping to a locked hero
> frame at the end.*

**Keep the rotation speed moderate.** Extremely fast rotation reads as distortion rather than motion — ask for
a "steady cinematic pace", not a "fast spin", unless the pacing profile is explicitly meant to be manic. Pair
it with the `product-spin` pacing profile (`references/fastcut-composer.md`) when the orbit is the whole
point of the shot, or `orbit` as one family among several otherwise.

**Cut density, measured.** Independent research on fast-cut ecommerce product video (2026) converges on
roughly a 1-3 second hook followed by feature beats in the 2-4 second range — close to what this skill already
targets (2.5-3s average per written shot). A film that cuts much slower than that, however fast its pacing
language claims to be, reads as templated rather than edited.

---

## Shot lengths

Vary them. Uniform lengths read as flat — every shot at the same 2s mark is what makes a film feel
mechanical rather than edited.

Minimum 2s per setup. At 8-9s with two setups that is roughly 4s and 5s, or 3s and 6s. Not 4.5 and 4.5.

Land the longest setup on the most spectacular action — the splash, the pour, the reveal, the drop — not on
a static beat.

---

## The fun is the product performing

Avoid relying on a presenter or a person on camera — that is the whole premise of this skill. Instead, appeal
is carried by **real physical motion**: falling, splashing, dripping, stretching, bouncing, rotating,
catching light, with real physics and real weight for whatever the product actually is.

It is *not* colour grading over a static shot, and it is not a generic sweep with nothing actually happening.
The films that land are the ones where the product itself is doing something specific and true to what it
physically is.
