# Providers - Higgsfield first, fal.ai fallback

Decide BEFORE intake.

1. Higgsfield default. If its tools are not connected/authenticated/out of balance -> fal.ai, say so in one line.
2. Neither reachable -> stop and say so; never guess a call that cannot run.

## Mechanics

- Higgsfield: MCP connector inside the agent. Cost shown per generation in its UI.
- fal.ai: needs FAL_KEY credential scoped to fal.run, queue.fal.run, rest.fal.ai, v3b.fal.media. Cost ~$5-30 per 15-25s vertical video depending on model and duration.

## Cost discipline

- ALWAYS show shot plan + cost estimate before generating
- Generate a cheap still first when aspect ratio or composition is uncertain - prove dimensions before paying for motion
- Free fixes (music, fade, logo, CTA text) via finishing pass - do not re-generate for those
