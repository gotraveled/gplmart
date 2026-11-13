# The ledger

One local file, `ledger.txt`, at the root of this skill. Its only job is stopping the skill making a
near-identical film twice for the same brand — or, since this skill serves many brands, stopping it defaulting
to the same handful of shapes across every brand it touches.

It is deliberately **local and network-free**. An earlier design for a single-brand version of this skill kept
its record only in a hosted spreadsheet, and the one time a session could not reach that host, the variety
check failed in exactly the situation it most needed to work — a film shipped checked against a handful of
rows someone happened to have pasted into a chat. A check that can be silently starved of its own data is
worse than no check, because it does not announce itself as broken.

---

## The shape of a row

Eight fields, pipe-separated, one row per video:

```
date | brand | product | families | archetype | pacing | hook | value_angle
```

Example row:

```
2026-09-21 | Aurora Skincare | Vitamin C Serum | orbit, drop, macro | detail-macro | snap-macro | ingredient-macro | dermatologist-backed
```

Nothing else belongs here. Not prompts, not URLs, not claims, not images. Those come from intake each time,
which is the whole point of not needing a database — and definitely not anything that could identify a
brand's unreleased product before launch, if this file is ever shared outside the team running the skill.

---

## Reading

```bash
node scripts/ledger.mjs read
```

Reads `ledger.txt` next to the skill root. No network, no credentials, nothing that can be blocked. Prints
`EMPTY` plainly if there are no rows yet — an empty ledger is not a clean slate, it is a disabled check, and
the skill should say so rather than silently proceeding as if nothing had ever been made.

## Checking overlap

```bash
node scripts/ledger.mjs overlap "reveal,open,macro" "Aurora Skincare"
```

Computes `(families in both) / (families in either)` — a Jaccard index — against every row for that brand (or
every row at all, if the brand argument is omitted), and prints the worst score. **0.5 or higher means choose
again.** This is the exact computation the design step in `SKILL.md` calls for; do not eyeball it, two shot
lists that look distinct on the page can still score high overlap.

## Writing

```bash
node scripts/ledger.mjs add "2026-09-21 | Aurora Skincare | Vitamin C Serum | orbit, drop, macro | detail-macro | snap-macro | ingredient-macro | dermatologist-backed"
```

Validates the field count, refuses an exact duplicate row, and appends. No network call, so nothing about
this step can fail for a reason outside the local machine.

**Write the row even when the film was rejected.** A shape that failed is one you especially do not want to
land on again, and the ledger tracks what has been tried, not only what was approved.

---

## If this skill is shared across many people or machines for the same brand

The local file only sees what has been generated on that machine. If several people are producing films for
the same brand from different machines, the ledger will not see each other's work unless the file is
synced somehow — committed to a shared repository the skill folder lives in, for instance, or copied
manually.

**If there is no shared record at all**, say so plainly before designing, and ask the person: *"paste the
last two or three lines from any record you have of recent films for this brand, or say 'none' if this is the
first."* A description is worse than a written row and far better than nothing — without either, the skill
will happily rebuild a recent film and nobody will notice until someone watching the brand's output does.

---

## Choosing, not just avoiding

Avoiding the last film for a brand is not the same as working through the space. For each of the rotated
dimensions — archetype, pacing, hook, value angle — pick the value that is **least recently used in the
ledger for this brand**, not merely one that is not a literal repeat.

```
pacing profiles   8 exist
ledger shows       fast-cut-energy (x4, most recent), speed-ramp, snap-macro
never used         product-spin, drone-sweep, stop-motion-pop, real-time-human, slow-luxe
choose from        the five never used, before reusing any of the three
```

Only when every value in a pool has been used for that brand does it wrap round to the least recent. Applied
across all four pools, this walks the whole space instead of orbiting whatever was picked last.

**Advance the pools by different amounts.** If archetype and pacing both step by one each film they travel in
lockstep, and eight values paired with eight values yields far fewer real combinations than the space
actually offers.
