# Why each rule exists

Every rule in this skill was learned from a rejected video, on real client work across several brands and
product categories. If a rule looks excessive, this is the failure mode it prevents. Ignoring a rule tends to
reproduce the failure, at real money per second of generation.

Specifics (brand names, exact wording of feedback) have been generalised out of this file on purpose — it now
teaches the underlying lesson rather than repeating any one client's private comments.

---

## Variety

**Two approved videos for two different products once came out looking near-identical** — different
products, different copy, near-identical action sets. Nothing governed structure, so the generator found the
same shape every time regardless of what was fed into it. This is the origin of action families and the
no-repeat rule.

A client noted, in substance: *we keep asking for variety, and every video comes back structurally the same
as the last one, no matter what the copy says.*

`serve-moment` is the skeleton everyone defaults to when nothing is enforcing otherwise. Hence the 1-in-8 cap.
The same feedback pattern shows up across categories: a product opened, used and consumed/worn is the first
idea anyone reaches for, food or not.

Kid appeal (or, generically, the audience hook) and nutrition reassurance (or, generically, the value angle)
are named dimensions rather than prose precisely because leaving them as prose is how they quietly collapse
into the same two or three answers every time.

---

## Continuity

A film once showed an object entering frame with no visible cause, and separately showed the same physical
action repeated as if it were several different beats rather than one continuous event. Two separate faults:
beats written as phases of one event, so the same action repeated; and an object arriving with no cause. Hence:
each setup is a new action, and the fixed set is declared explicitly.

Worth noting the first attempted fix made it worse. A "causal continuity" rule was added requiring each beat
to follow physically from the last, which produced beats that were phases of one event — exactly the
repetition it was meant to prevent. The actual fix was declaring the fixed set (surface, props, entry point)
rather than chaining beats causally.

---

## Pacing

Early prompts defaulted to slow motion by habit, and feedback across several rounds converged on the same
point: unless a film is explicitly meant to be a slow, lingering piece, it should read as edited by someone
fast and confident, not as a single unbroken shot. Never default to slow.

**Uniform shot lengths read as flat.** A validator rule catches it: every shot at the same length is what
makes a film feel mechanical rather than edited. This was learned when a "make it faster" correction pushed
shot count until every shot hit the length floor and the film came out perfectly even — which itself read as
a new problem.

---

## Cut density is not controllable

Measured across five videos with identical instruction style, cuts requested and cuts actually delivered
diverged substantially and unpredictably — sometimes far fewer cuts than asked for, sometimes far more.

This skill's finishing pass deliberately does **not** cut — it does the logo, the fade and audio, nothing
else, because giving the finishing pass a fourth job (text/caption overlays) is what caused earlier rounds to
fail (see "Text" below). So cut density is handled by writing **at least three setups at every length**, which
raises the floor the generator is working from. The written setup count is a floor on cuts, never a ceiling.

---

## Text

Several rounds of on-screen text/caption overlay design failed before anyone looked closely at what real,
well-performing reference footage actually does. Feedback in substance: overlays looked unclassy, blocky, and
sometimes obscured the video entirely because they collided visually with whatever text the generator had
already rendered from the product's own packaging.

The resolution, in substance: give the text — the feature, the benefit — to the generator itself rather than
compositing a separate layer afterwards, since the generator was already rendering its own (garbled) text
pulled off the reference image's label, and the overlay was compositing on top of that mess rather than
replacing it. All text now lives in the generation prompt.

**Well-performing reference footage tends to have no background chip behind on-screen text.** It stays
legible because the shot is composed with reserved negative space, not because of a background panel — which
is why the prompt must reserve space rather than relying on a chip.

A consistent house-style preference across clients: no em dash in on-screen text. Worth asking about per
brand rather than assuming.

---

## Sound

A recurring complaint: an interaction sound (most often a bite, but the same pattern applies to a click, a
pour, a splash) appeared in every video regardless of whether the product was actually being interacted with
in that setup. Two causes: sound words leaking into action text without being scoped, and a brief that never
said what to leave out. Fixed by scoping interaction sound explicitly to the one setup where it happens, and
stating its absence everywhere else.

---

## Endings

A recurring complaint across early films: the video simply stops rather than resolving, which reads as
unfinished or broken even when nothing is technically wrong with the clip.

---

## Product form and material

A generator has been observed writing a dry, crumbly product as if it were pouring like a liquid — a
physically impossible action for that product. Caught in testing before it shipped on that occasion, but it
is exactly the class of error that ships unnoticed when nobody has explicitly reasoned about the product's
actual physical form before writing the setup list. This generalises well beyond food: a rigid gadget cannot
be "spread," a garment cannot be "crunched," a liquid cannot be "stacked."

---

## Reference images

A claim card (an image that is mostly marketing text, not a clean product photo) was once seeded as a
reference image. The generation failed outright rather than degrading gracefully: the prompt asked to lock
branding onto an image containing no clean product view, while simultaneously forbidding on-screen text over
an image made almost entirely of text. The filename said "product." It was not.

**Look at the image, every time**, rather than trusting what the filename claims it is.

---

## The reference photo leaks into the scene

On one film, the prompt asked for a specific seamless backdrop, and the finished film instead used the
surface visible in the reference photograph. The generator reads a reference image as evidence about the
whole scene, not only about the product, so a described surface competes with a photographed one and does
not reliably win — the carry-over has to be forbidden by name in the prompt.

The same film also came back with an unwanted colour panel behind the on-screen text, copied off the
product's own label styling, in a prompt that had asked for text with no background. Reserving negative space
is necessary and not sufficient; a background chip needs forbidding explicitly, by name.

Both are cheap to prevent in the prompt and cost a full regeneration to fix after the fact.

---

## Environments

Large open environments combined with sweeping aerial camera movement tend to fail outright on Seedance
rather than producing a weak result. Keep product films to a contained scene: a table, counter, board or
simple set. If the chosen pacing profile is a drone-sweep style move, scope it to a tabletop glide instead of
a landscape fly-over.

---

## The logo

A brand's logo is typically a precise asset with its own guidelines: defined clear space, a minimum size, and
explicit rules about what must never be done to it (recolouring, stretching, cropping). A generation model
cannot reliably honour any of that.

Remotion draws the real file instead. This skill carries that finishing pass in `finish/`, so **where it can
run, the logo is exact** — that is the whole reason the pass exists, and why it takes the brand's own logo
file fresh on every run rather than shipping with one baked in.

Where the pass cannot run, the honest options are to leave the logo off or add it afterwards. Asking the
generator to draw it breaks brand rules quietly, and that stays true regardless of environment or brand. See
`finishing.md` for the one variant worth testing (passing the logo as a reference image) and the cheap still
that would settle whether it is viable for a given brand's specific logo.

---

### Five gates, because advice did not hold on its own

On one especially costly morning, an account went from a full balance to nearly nothing in under two hours:
several single-take generations in the 20-30 second range, hundreds of credits, and several films out, more
than half of them the same clip regenerated repeatedly in a short window, chasing one fault at a time rather
than collecting every fault before a single regeneration.

Every rule that would have stopped it was already in this skill, as advice. Say the cost. Prove the frame.
Stop after three attempts. **They were advice, and in a hurry advice gets skipped.** That is not a criticism
of whoever was in a hurry; it is what advice is.

So the rules that protect a budget became gates: things the skill does not proceed past without what they
ask for. A plan shown and agreed. A still per clip, all before motion. The cost said and a yes before each
call. A balance floor. A cap at twice the plan. And on a redo, every fault listed before one regeneration
rather than one fault per regeneration.

This is the same lesson as the ledger and the resolution-mismatch failure (a price quoted at one resolution,
billed at another), now applied to money generally: **a rule in prose is advice, and a rule in the self-check
is a rule.**

### Clip by clip is the spine, not a mode

Clip-by-clip generation was added as an option beside single-take generation, and within days a client asked
for it to become the default — and they were right to: an option beside the default is not what anyone
reaches for when they are in a hurry, and in a hurry is exactly when the choice matters most. The sequence in
this skill is now clip by clip by default; single take is the stated exception, for a film whose whole point
is one unbroken movement that a cut would break.

---

## The fast-cut composer: why a third mode, and what it's measured against

Clip-by-clip and single-take both assume a person is directing the shots, one way or another. A real,
recurring request is different: "just make it, you decide" — someone who wants a short, energetic film
without seventeen intake questions or approving each setup one at a time. Answering that by hand tends to
drift back to the same skeleton every time (open, apply, eat), because nothing is actually enforcing
structural variety across a whole product range when a person is improvising it fresh each time under time
pressure.

**What separates a film that reads as professionally edited from one that reads flat, measured against a real
approved reference film versus a rejected one of the same length:** both cut at almost the same rate — roughly
2.5 seconds per shot on average. The difference was not pacing. It was three specific things: beats that were
genuinely distinct actions rather than phases of one event repeated; shot lengths on a rising curve rather
than uniform; and enough written shots that even the low end of what the generator actually delivers still
reads as fast, since the generator treats a written shot as one continuous take and adds its own cuts inside
it unreliably — anywhere from one cut every four-to-six seconds to several cuts per written shot, measured
across different films.

**Verified directly, not just inherited from an old failure log.** A real reference film supplied for this
work (30s, 1080x1920) was measured with scene-cut detection rather than eyeballed: 10 shots, cuts landing at
2.27s, 4.83s, 8.83s, 12.67s, 14.07s, 17.67s, 18.97s, 22.07s and 27.67s, averaging 3.0 seconds per shot. The
content alternated a hero product shot, a macro texture shot, an action shot (ingredients dropping, a knife
spreading, a drip stretching) and back to a hero close — never the same kind of shot twice in a row. That
alternation, not just the raw cut rate, is what the action-family system (no family repeats in one film)
exists to guarantee automatically rather than rely on a person noticing the pattern by feel.

**Independent research on 2026 fast-cut ecommerce product video** converges on the same band this skill
already targeted: a 1-3 second hook, then feature beats in roughly the 2-4 second range, with viewers needing
just enough time to read a shot before the cut lands — not a flat "faster is always better" instruction. And
on 360° product rotation specifically: the wording that reads reliably as an intentional move is naming the
full mechanic — a steady, cinematic pace, the subject held centred throughout, gimbal-smooth, explicitly *not*
fast or distorting — rather than the bare word "orbit," which produces inconsistent results on its own.

**Product-agnostic by construction, not by afterthought.** The action-family vocabulary that makes this
possible already existed for the hand-directed mode in this skill; the composer just enforces it
algorithmically instead of by judgement. Porting it surfaced one real gap worth naming: several actions
(`impact`, `transform`, `arrange`, `tumble`, `dust`, `freeze`) describe a "material" prop as discrete,
countable pieces — berries scattering, nuts tumbling — and produced nonsense when tested against a
homogeneous liquid ("a thin golden-amber liquid... going from separate loose pieces to one combined mass").
The fix was not a special case for liquids specifically, but a general third gate alongside physical form and
edibility: whether a genuine loose, prop-able material exists at all, independent of what the product's own
form is. A rigid object or a liquid can have one (loose beads beside a ring, honeycomb beside a jar of honey)
or not (a skincare serum, a plain signet ring) — the flag, not the category, decides.

