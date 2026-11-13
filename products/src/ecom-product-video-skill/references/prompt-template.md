# Prompt template

Seedance (on either provider) treats a written setup as **one continuous take**. It will not subdivide it for
you. Write the film as a small number of explicit setups and let it find its own cuts inside them.

Fill every section. The sections that get skipped are the ones that produce the rejections.

---

## Template

```
[FORMAT]
A {duration}-second vertical {aspect} product film for {Product Name, exactly as the brand writes it}.
{pacing profile} energy. {N} distinct setups, cutting between them.

[THE FIXED SET]
Everything happens on {surface}. In frame from the start: {props that are present at frame one}.
The {product} {enters at setup N by ... / is present from the start}.
Nothing else appears at any point. Nothing arrives without being shown arriving.

[THE PRODUCT]
{Exact product description: shape, packaging or housing, colour, distinguishing marks}. {If applicable:
inside/underneath it is {colour, texture, how it behaves}.} The product's branding must stay {legible / soft}
and must not change between setups.

[SETUP 1 — {family}]  ~{n}s
{One new action, stated concretely and physically. What moves, what it does, where it lands.}
Camera: {one move, used only here}.
Light: {direction and quality}.

[SETUP 2 — {family}]  ~{n}s
{A NEW action that follows from setup 1. Not setup 1 continuing.}
Camera: {a different move}.

[ON-SCREEN TEXT]
Setup {n}: the words "{small intro line}" appear small above, then "{LARGE ACCENT LINE}" appears
large and bold beneath it, in {brand colour}, positioned {where}, in {language, if not English}.
Reserve space for it: {the upper third stays soft and out of focus / the left of frame stays empty}.
No other text, letters, numbers, labels, watermarks or captions appear anywhere in the film at any point.

[SOUND]
{Music description, or "ambient only", or "silent"}.
{Either: "Interaction sound (bite / click / pour / zip, as applicable) belongs only to setup N. No such sound
in any other setup." OR: "There is no interaction sound in this film anywhere."}

[ENDING]
The film ends on {a held beat / the product settled}, resolved and settled rather than stopping
mid-action.
{IF the finishing pass will run:  Do NOT fade to black; the last frame stays full brightness.}
{IF it will NOT run:              Then fade gently and evenly to black over the last half second.}

[DO NOT]
No hands or people in frame{, except ...}. No logo, no watermark, no brand mark of any kind.
No text beyond the words named above. No slow motion{ unless the profile is slow}.
No cuts to black mid-film.
No coloured box, panel, chip or banner behind any text. The words sit directly on the film.
The surface and background are only what is described above. Do not carry over the surface,
table or backdrop from the reference photograph.
```

---

## Why each section is there

**FORMAT** — states setup count up front. The model needs to know it is cutting at all; without it you get
one continuous take, and a single unbroken shot reads as slow regardless of how dynamic the motion within it
is.

**THE FIXED SET** — the continuity contract. An object appearing mid-shot with no cause reads as broken
continuity to anyone watching. Declaring the set is what prevents it.

**THE PRODUCT** — the model pulls branding detail off the reference image and will drift it between setups
if not pinned.

**SETUPS** — one family each, each a genuinely new action. Beats written as phases of one event read as a
stutter rather than a story beat.

**ON-SCREEN TEXT** — all text is the generator's job now. It must be named exactly, placed, and everything
else forbidden, because the model renders its own text from the packaging/label if not constrained. The
reserved space matters: real, well-liked reference footage tends to have **no background chip** behind
text — it stays legible because the shot is composed with empty space for it.

**SOUND** — an interaction sound (a bite, a click, a splash) tends to appear even in films where nothing is
being interacted with, until this is scoped explicitly.

**ENDING** — two jobs, and the second one depends on the environment.

Always ask the film to RESOLVE: the last beat settles instead of stopping mid-action. An abrupt ending reads
as unfinished even when the film is otherwise fine.

The fade is conditional. **Check whether the finishing pass can run before writing this section.** If it can,
forbid the fade here and let Remotion do it exactly — a clip that already fades would fade twice, going to
black and back. If it cannot run, ask the generator for the fade, because otherwise nothing adds one and the
film ends on a hard cut, which is the original complaint this section exists to prevent.

Getting this backwards costs a whole generation. There is no way to add a fade afterwards without the pass
that was unavailable in the first place.

**DO NOT** — negative constraints work on Seedance and are cheaper than a regeneration. The logo line is not
optional: without it the generator invents a brand mark from the packaging, which is worse than having none.

Two more lines that are worth stating explicitly on every prompt, learned the hard way on real films:

*The chip.* Asked for text with no background, the model has been observed putting a rounded colour chip
behind the accent line, copying panel styling off the product's own label or packaging. Real reference
footage usually has no chip anywhere — text stays legible because the shot reserves space for it. Reserving
the space is necessary and it is not sufficient; the chip has to be forbidden by name.

*The surface.* A prompt can specify one backdrop and the finished film can use the surface from the reference
photograph instead. The model treats a reference image as evidence about the whole scene, not just the
product, so a stated surface competes with a pictured one and does not reliably win. Forbid the carry-over
explicitly.

---

## Worked example, 9s, rigid product with a liquid inside

```
[FORMAT]
A 9-second vertical 9:16 product film for Aurora Vitamin C Serum.
fast-cut-energy. 2 distinct setups, cutting between them.

[THE FIXED SET]
Everything happens on pale veined marble under soft daylight. In frame from the start: the sealed
glass bottle standing upright, and a small brushed-brass tray beneath it. Nothing else appears at
any point.

[THE PRODUCT]
A cylindrical amber glass bottle with a black dropper cap, a small cream label centred on the front.
Inside is a thin golden-amber serum that catches light and moves slowly, like a light oil. The label
must stay legible and must not change between setups.

[SETUP 1 — orbit]  ~4s
The camera arcs slowly around the standing bottle, the label rotating into full view and holding
there for a beat.
Camera: a slow 90-degree arc at bottle height.
Light: warm daylight from the upper left, a soft reflection sliding across the glass as it turns.

[SETUP 2 — drop]  ~5s
The dropper lifts from the bottle, a single bead of serum falls and lands on the marble, spreading
into a small glossy pool.
Camera: a fast push in to a macro framing of the falling drop and its landing.

[ON-SCREEN TEXT]
Setup 2: the words "Dermatologist-formulated" appear small above, then "10% VITAMIN C" appears large
and bold beneath it, in warm gold, in the lower third. Reserve space: the lower third of the marble
stays empty and softly out of focus.
No other text, letters, numbers, labels, watermarks or captions appear anywhere in the film.

[SOUND]
Light, clean, minimal chime-based texture, no vocals. There is no interaction sound in this film
beyond the soft sound of the single drop landing in setup 2 — nothing else.

[ENDING]
The film ends on the drop settled on the marble, resolved rather than stopping mid-action.
Do NOT fade to black; the last frame stays full brightness.

[DO NOT]
No hands or people in frame. No logo, no watermark, no brand mark of any kind. No text beyond the
words named above. No slow motion.
```

Note what it does: two setups for 9 seconds, `orbit` before `drop` so the bottle and label are established
before anything moves, no `pour` or `spread` written as a whole-bottle action because the moment chosen is a
single controlled drop, uneven shot lengths, one camera move each, text on the setup with room for it, and
interaction sound scoped to exactly the one moment it happens.
