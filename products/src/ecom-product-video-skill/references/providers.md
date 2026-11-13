# Provider: Higgsfield first, fal.ai as fallback

This skill talks to one of two generation providers. **Higgsfield is the default.** fal.ai is the fallback —
used when Higgsfield is not connected, not authenticated, out of balance, or the person running the skill
asks for fal.ai specifically.

Decide this **once, at intake**, and say which one is in use before any cost is quoted. Do not silently
switch mid-film — a plan quoted in Higgsfield credits and paid in fal.ai dollars is confusing, and the two
have different cost mechanics (see below).

---

## 1. Decide which provider

Ask, or work it out:

1. **Did the person ask for a specific provider?** ("use fal", "no Higgsfield account here") — honour it.
2. **Otherwise, check whether Higgsfield's MCP tools are available and working** in this session — a
   `generate_video` / `generate_image` / `media_import_url` tool set, or a tool search that finds one. If a
   trial call or a balance check fails with an auth error, or the tools are not present at all, Higgsfield is
   not usable here.
3. **If Higgsfield is unavailable for any reason, fall back to fal.ai** and say so in one line: *"Higgsfield
   isn't connected here, so this film will generate on fal.ai instead — the workflow is the same, the cost
   model is different, see below."*
4. **If neither is available**, stop and say so. Do not proceed on a guess about pricing or a model that
   cannot actually be called.

Everything downstream of this — the prompt template, the shot grammar, the spending discipline, the
still-before-motion gate — is the same regardless of provider. Only the calling mechanics and the cost
mechanics change.

---

## 2. Higgsfield (default)

Full mechanics are in `references/generation.md`. Summary:

- MCP tools: `media_import_url`, `generate_image` (stills, model `nano_banana_pro`), `generate_video` (model
  `seedance_2_5`), `get_cost`, `balance`, `jobs_wait`.
- Cost is **account credits**. `get_cost: true` preflights a call without submitting; `balance` shows what is
  left. The five spending gates in `SKILL.md` are written against this mechanic directly.
- A raw image/video URL is never passed straight into `medias` — import it first with `media_import_url` and
  pass the returned `media_id`.

## 3. fal.ai (fallback)

fal.ai has no MCP-native "credits balance" the way Higgsfield does — cost is per-call, published in USD per
model on the model's fal.ai page, billed straight to the account behind the API key. The spending discipline
in `SKILL.md` still applies; only the mechanism for pricing and checking it changes.

**Verify the exact model slug before the first real generation of a session.** fal.ai's catalog changes, and
guessing a slug from memory risks calling a renamed or retired model. Two ways to confirm it:

- If a fal.ai MCP server is connected in this environment, use its catalog/search tool (or `ToolSearch` for a
  tool whose name contains `fal`) to find the current still-image and image-to-video model IDs, rather than
  assuming the ones below are still current.
- Otherwise, check `https://fal.ai/models` for the current slug of the model family you need.

As of this skill being written, the closest equivalents to the Higgsfield pair are:

| Job | Higgsfield | fal.ai family (confirm exact slug before use) |
|---|---|---|
| Still, from a reference image | `nano_banana_pro` | the Nano Banana / Gemini image family, e.g. `fal-ai/nano-banana` or `fal-ai/gemini-25-flash-image` variants |
| Image-to-video, product motion | `seedance_2_5` | the ByteDance Seedance family under `fal-ai/bytedance/seedance/...` |

### Calling convention

fal.ai is a plain HTTPS queue API. If an MCP tool for fal.ai is connected, prefer it — it wraps the same
calls. Otherwise, call it directly:

```bash
# submit — returns a request_id immediately, does not block
curl -s -X POST "https://queue.fal.run/<model-id>" \
  -H "Authorization: Key $FAL_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "<the full prompt>", "image_url": "<https url of the reference image>", ...other model-specific fields}'

# poll
curl -s "https://queue.fal.run/<model-id>/requests/<request_id>/status" \
  -H "Authorization: Key $FAL_KEY"

# fetch the result once status is COMPLETED
curl -s "https://queue.fal.run/<model-id>/requests/<request_id>" \
  -H "Authorization: Key $FAL_KEY"
```

- `FAL_KEY` is an API key, set as an environment variable — never print it, never put it in a prompt or a
  committed file.
- fal.ai takes reference images as **plain https URLs**, not an imported media ID — there is no
  `media_import_url` equivalent to run first. If the image is only local, it needs to be reachable at an
  https URL first (a fal.ai upload endpoint, or any other host).
- The result payload carries a direct file URL for the finished still or clip — that URL is what feeds
  `finish.mjs --in` exactly the way Higgsfield's `result_url` does.
- Polling cadence: a few seconds between status checks is reasonable; a 9s clip is a comparable wait to
  Higgsfield, typically a couple of minutes.
- There is no preset system to decline (Higgsfield's `declined_preset_id` has no fal.ai equivalent) — a
  literal prompt is what gets sent, always.

### Cost discipline on fal.ai

The same five gates apply, adapted:

1. **The plan is still the gate.** Show every clip, its seconds, its estimated USD cost, before generating.
2. **No motion without an approved still.** Unchanged — a still on fal.ai's image model is a small fraction
   of a video generation's cost, same logic as Higgsfield.
3. **Say the estimated cost and get a yes before every generation.** Compute it from the model's published
   per-second or per-generation rate on its fal.ai page; there is no `get_cost` preflight call, so this is a
   calculation, not a query — say so if the number is an estimate rather than a quote.
4. **No balance check exists** the way Higgsfield's `balance` does. If the fal.ai account's billing/usage can
   be read (dashboard, or a billing API if the account exposes one), check it before a large generation.
   Otherwise, keep a running total in the conversation and apply the same discipline: do not keep generating
   past what was agreed without asking again.
5. **Per-film cap.** Identical: stop and ask once spend on one film passes twice its planned cost.

### What does not change

Everything else in this skill — the prompt template, one-still-per-clip, the shot grammar, the ledger, the
finishing pass — is provider-agnostic. The generation prompt is written exactly the same way for fal.ai's
Seedance as for Higgsfield's; only the transport differs. `finish.mjs` takes a plain URL for `--in` regardless
of which provider produced it.

---

## 4. Telling the two apart in conversation

Say which provider is active whenever it is not obvious, especially right after a fallback:

> "Generating on fal.ai for this film since Higgsfield isn't connected here — same shot plan, same gates,
> cost is billed per call in USD rather than credits."

Never let the person discover which provider ran only when they see the bill.
