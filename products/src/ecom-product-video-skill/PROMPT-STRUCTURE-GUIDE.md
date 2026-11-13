# How to brief a fast-cut product video, for any product

This is the reusable pattern behind a good fast-cut result from this skill — not tied to any
specific product. Fill in the blanks for whatever you're making a video for.

It's written from real experience getting this right after several attempts: the first attempts
that came out flat or boring, and what specifically changed to fix each one, are called out as we
go, so you understand *why* the structure works, not just what to copy.

---

## 1. The facts the skill needs from you

These aren't optional — the skill will ask for them before doing anything:

| Fact | Example (generic) | Why it matters |
|---|---|---|
| Brand and product name | "Acme — Wildflower Honey" | Goes on screen exactly as given |
| A real, clean product photo | plain background, product alone | The one hard requirement — nothing generates without it |
| Physical form | liquid / solid pieces / powder / spread / rigid / fabric / jewellery | Decides which actions are even physically possible |
| Is it edible / actually used on camera | yes/no | A liquid isn't automatically "spread on something and eaten" — a skincare serum and a honey are both liquid, only one gets bitten |
| What it's packaged in | jar / bottle / pouch / box / case / none | Some actions need the pack open first, or can't apply to that container |
| Real claims, verbatim | from your own packaging or listing | The only text allowed on screen — never invented |
| Duration | you choose, 4-30 seconds typically | Drives how many shots fit |
| Aspect ratio | usually 9:16 for Reels/Shorts | Confirm before spending on the real video, not after |

---

## 2. The structure that actually works: a mini story, not a product hold

The single biggest lesson from getting this right: **a film that just shows the sealed product
for the whole runtime reads as flat, no matter how "fast" the cuts are described as being.**
What actually reads as energetic and professional is a short, complete **story arc** — even in
15-30 seconds. The shape that worked:

```
1. OPENER       something happens immediately — the pack opens, or a hero reveal. Never a static hold.
2. INGREDIENT   what it's made of, shown as real, recognisable components — not just described.
3. THE MOMENT   one genuinely surprising or satisfying beat — a transformation, a reveal, a pour.
4. PAYOFF       the product itself, shown doing what it does — texture, motion, a signature move.
5. THE USE      it gets used, worn, applied, or eaten — a real human moment, not just product-on-a-table.
6. ENDING       resolved, settled, not cut off mid-action. This is the shot the eye rests on.
```

You don't need exactly six shots — the point is the *arc*, not the count. A 15-second film might
compress this to four beats; a 30-second one might give each beat more room. What matters is that
every beat is a **genuinely different kind of action**, never two shots doing variations of the
same thing.

### The lesson that mattered most: show the ingredients, don't just say them

An early attempt described the claims in on-screen text but showed nothing except the sealed
package for the entire runtime. It technically had "variety" in its written shot list, but it
read as "just the packet for thirty seconds" — because the model's actual output collapsed
several different written actions into visually similar product-hero shots.

The fix: **make the raw materials themselves a visible character in the film.** If your product
comes from ingredients, show them — separately, recognisably, before they become the product.
This alone is what turns "here's our product" into "here's how our product is made," which reads
as a real story rather than a spec sheet.

### The transformation trick: a hard cut, not a morph

If you want to show "raw materials become the finished product," **do not ask the model to show
one thing melting or merging into another** — that's unreliable and tends to look uncanny even
when it works. Instead, write it as an explicit **hard cut**:

> *"Hard cut, no dissolve, no morphing: in the exact same framing and light, the raw materials
> are now the finished product, [doing something physically appropriate — pouring, tumbling,
> settling] in the spot the materials occupied a moment before."*

This works because a hard cut is something the edit does, not something the model has to
simulate physically. It reads as an intentional "reveal," not a glitch.

### Know your medium: single generation vs. joined clips

This skill has two ways to get fast cuts, and they trade off against each other:

- **One continuous generation** (the "fast-cut composer" mode) can hit genuinely short cuts —
  2-3 seconds each — because they're internal beats within one generation, not separate paid
  calls. The trade-off: a "hard cut" instruction inside one continuous generation is a
  best-effort ask, not a guarantee. The model sometimes blends or simplifies a beat instead of
  cutting cleanly.
- **Separately generated clips joined afterward** guarantee a real, clean hard cut at the join —
  because the join *is* a real video edit, not a request the model has to obey. The trade-off:
  each separate clip has a minimum length (commonly 4 seconds on the models this skill uses), so
  you can't get clips shorter than that in this mode.

If a specific cut needs to be *guaranteed* clean (a big reveal moment, a product transformation),
lean toward joined clips for that one beat. If you want maximum pace throughout and can accept
some unpredictability on the trickiest beat, use the single continuous generation.

---

## 3. Camera and technique vocabulary worth knowing

- **360° product rotation**: don't just say "orbit around it." Say the full mechanic — *"the
  camera orbits a full 360 degrees around the product at a steady, cinematic pace, the product
  staying centred throughout, gimbal-smooth motion, never distorting, snapping to a locked hero
  frame at the end."* A bare "orbit" produces inconsistent speed and framing; the detailed
  version reads as intentional.
- **Never ask for very fast rotation** — it reads as distortion, not energy. Steady and smooth
  beats fast and chaotic for anything involving a full camera rotation.
- **Vary every shot's camera move.** Repeating a camera move (two shots both using a slow push-in,
  for example) is one of the most common ways a film reads as repetitive even when the subject
  matter differs.
- **Vary shot lengths.** A film where every shot is exactly the same length reads as flat no
  matter how fast that length is. A rising curve — short and snappy at the open, a little more
  room for the payoff — reads as edited by a human, not machine-generated.
- **One slow-motion beat, never more.** Contrast is what makes a moment feel deliberate. If
  everything is slow, nothing reads as special.
- **Scope any interaction sound explicitly** (a bite, a click, a splash) to the one shot it
  actually happens in, and say plainly that it does not happen anywhere else. Left unscoped,
  generators tend to add that sound to every shot regardless of what's on screen.

---

## 4. What NOT to do

- **Don't let a shot merely hold.** Every beat should be something happening, not a static
  product photo with motion added as an afterthought.
- **Don't ask the generator to draw a logo.** It will approximate a brand mark, which breaks
  brand guidelines in ways that are worse than having no logo at all. Add the real logo file
  afterward with the finishing pass instead.
- **Don't invent claims.** Anything on screen has to come from the product's own real packaging
  or listing — never something reasoned out or assumed to sound good.
- **Don't skip proving the frame first.** Before spending on a full video, check a single still
  image against your brief — does the product look right, does the text land where you wanted
  it, is the background correct. A still costs a small fraction of what a video does, and it
  catches most problems before they're expensive.
