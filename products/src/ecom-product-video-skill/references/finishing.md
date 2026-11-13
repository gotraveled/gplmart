# The finishing pass

The generator (Higgsfield or fal.ai) makes the film. Remotion does three things it cannot, and nothing else.

| | Why the generator cannot |
|---|---|
| **Logo** | A precise brand asset: clear space, a minimum size, don'ts specific to the brand's own guidelines. A generation model approximating it breaks those rules quietly. |
| **Ending fade** | The generator can be asked and sometimes obliges. Doing it here is exact every time. An abrupt cut reads as unfinished. |
| **Supplied audio track** | The generator makes its own audio; it cannot lay someone else's track over it. |

**It must not grow a fourth job.** Captions and CTAs do not belong here — text layered on top of a clip whose
generator already renders its own text from the packaging collides with it and reads as unclassy. All text
stays in the generation prompt.

**This pass carries no brand identity of its own.** There is no logo baked in — every run supplies its own
logo file with `--logo`, because this skill serves any brand, not one. See below.

---

## Setup, once

Needs Node 18+ and roughly 300 MB of packages, plus a ~113 MB headless Chrome that Remotion downloads on the
first render.

```bash
cd .claude/skills/ecom-product-video/finish
npm install
node finish.mjs --in <any mp4 url> --out ./test.mp4 --no-logo   # first run is slow; Chrome downloads
```

**Run it from the skill folder itself.** If the folder is copied elsewhere (a temp directory, a different
drive root) the install has been seen to fail for reasons that were never fully diagnosed. If a render fails
somewhere unexpected, try it from this folder before debugging anything else.

Known failure modes, recorded in case they come back:

| Failure | What it was |
|---|---|
| `ffprobe.exe` exits with a nonzero, unfamiliar code | a DLL load failure. The same binary fails standalone even in a working install; Remotion normally sets the environment up for it and something about a bare install can fail to. |
| `parseMedia` rejects `file://` | needs `reader: nodeReader` for local paths. |
| `EPERM: operation not permitted, symlink` | Remotion links `public/` into the bundle. Windows refuses without Developer Mode or admin. |

Run `node check.mjs` once in any new environment before relying on it — a different OS or sandbox may behave
differently even if it worked elsewhere.

---

## Running it

```bash
node finish.mjs --in <clip url or path> --out <path> --logo <path/to/brand-logo.png> [--audio <path>] [--no-logo] [--fade 0.7]
```

`--in` takes the generator's result URL **directly**. No need to download the clip first.

| Flag | Default | |
|---|---|---|
| `--in` | required | https URL or local path. Repeat it to join several clips, in order |
| `--out` | required | where to write |
| `--logo` | none | path to this brand's own logo file (PNG with transparency recommended) |
| `--audio` | none | a track to lay over the clip |
| `--no-logo` | logo on if `--logo` is given | omit the watermark even if a logo file was supplied |
| `--fade` | `0.7` | seconds of fade to black at the end |

**Always pass `--logo` for a brand that has one.** Without it, and without `--no-logo`, the film ships with no
watermark by default — silent, not broken, but confirm with the person that shipping without a logo is
intended for this run.

Duration and frame size are **measured from the clip**, not assumed. Hardcoding 1080x1920 would silently
letterbox or crop anything that was not 9:16, and the skill offers several ratios.

A fade longer than a third of the clip is shortened automatically and reported — a 0.7s fade on a 1.5s clip
would otherwise start before frame zero.

---

## Running it somewhere else: a remote runner

When there is no shell at all, the render can happen elsewhere instead, if the project this skill lives in
has a CI workflow set up for it (for example a GitHub Actions `workflow_dispatch` job that checks out this
folder and runs `finish.mjs`). That is project-specific infrastructure, not something this skill ships with
by default — set one up once per project if it is needed, following the same shape as `finish.mjs`'s own
flags: a clip URL in, a logo path or asset, an optional audio URL, out comes a finished file as a downloadable
artifact.

If no such runner exists and the local shell genuinely cannot run the pass, this is unavailable — see "When
it cannot run" below.

---

## Audio: the one interaction that matters

`<Audio>` layers **over** the clip's own sound rather than replacing it. The generator's own ambient and
effects keep playing underneath, which is usually what you want.

**But if the generator also made music, two music beds fight.** So whenever a track is being supplied here,
the generation prompt must ask for ambient only:

```
[SOUND]
Ambient room tone and the sound of the product only. No music, no score, no melody.
```

Get this the wrong way round and the result is muddy in a way that is hard to diagnose from the file.

The fade covers image and audio together. Fading only the picture leaves sound running under black, which
reads as a mistake rather than an ending.

---

## Which environment is this?

**Do not try to detect the host product by name.** What matters is a single capability — **can commands run
here.**

`node check.mjs` in this folder answers it, and it answers by **rendering two frames** — not by importing a
module. Loading the render library proves only that the JavaScript is there; the render itself runs separate
compositor binaries that a locked-down machine can refuse while the import succeeds. A false pass produces a
delivered film with no logo and no fade.

| What happens | What it means | Route |
|---|---|---|
| `READY` | pass installed | Full. Logo, fade, supplied audio |
| Fails, `npm install` works | shell exists, was not set up | Full, after a one-time install |
| No shell at all | sandbox will not start | Reduced. See below |

Capability, not branding. It stays correct across projects and clients.

---

## When it cannot run

Two different situations, and they need different answers.

**Not installed, but a shell exists.** Do not report this as a failure and move on — **install it**. Ask
once, then run `npm install` in this folder. It is a few minutes and about 400 MB, one time, and after it the
logo, the fade and supplied audio all work for good.

**No shell at all.** Some sandboxed environments report this as permanent — retrying does not help and
`npm install` cannot run either.

In both cases, **check before generating, not after** — see step 3 of `SKILL.md`. The check decides whether
the prompt asks the generator for the fade. Discovering the pass is unavailable after the clip exists means a
film with no logo AND no fade, and the only remedy is generating it again.

**Before delivering without a logo, try a remote runner if one is configured for this project.** See above. A
local render being impossible does not automatically mean the film has to ship unfinished.

When it cannot run **and no runner is reachable either**, deliver the video and say so in one line:

> Here is the film. The finishing pass cannot run here, so it has no logo and no fade. To add them, run this
> on a machine with Node: `node finish.mjs --in <url> --out final.mp4 --logo <path>`

If they had supplied an audio track, say that too — it could not be laid on either, and they should know
before they go looking for it in the file. Then the line becomes:

> Here is the film. This machine cannot run the finishing pass, so two things are missing and you will need
> to add them: the logo, and the music track you sent. Everything else — the cuts, the on-screen text, the
> ending fade — is already in the file.

Say it **once**, plainly, with the video. Not as a menu, not as an apology, and not spread across three
messages.

### Can the generator put the logo on instead?

Asked often, and the honest answer is **not as things stand**. The prompt forbids the generator from drawing
any brand mark for a specific reason: left free it invents one off the packaging, and an approximated logo
breaks the brand's own rules quietly, which is worse than an obviously missing one. Most brand guidelines
define clear space, a minimum size, and explicit don'ts that a video model will not hold across setups — it
already drifts label detail between shots unless pinned.

There is **one variant worth testing**, and it is not the same thing: passing the real logo file as an
`image_references` media, so the model is reproducing a supplied asset rather than inventing a mark. It may
still warp it frame to frame.

**Settle it with a still before building anything on it.** A still-image generation costs a small fraction of
a video: generate one frame with the logo passed as a reference and look at it. If the mark is clean, sharp
and correctly proportioned, this becomes a real route for machines with no shell. If it is soft, warped or
re-lettered, it is closed, and the answer stays: the client adds the logo, or someone runs the finishing pass
for them.

Until that test passes for a given brand's logo, **do not** ask the generator for the logo.

---

**Do not present a menu of options.** Offering several infrastructure choices mid-run turns a delivered video
into a support ticket. Deliver, state the gap, move on.

Never claim a video has been finished when it has not.

---

## Licensing

`@remotion/media-parser` prints a licence notice on every run:

> Some companies are required to obtain a license to use @remotion/media-parser.

It is left visible on purpose. Remotion is free below a company-size threshold and paid above it. Confirm
which side of that threshold the organisation running this skill falls on before relying on it at scale, and
do not silence the notice to hide that question.
