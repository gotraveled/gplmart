# Ecom Product Video Skill

An AI-agent skill bundle that turns one product photo into a professional short product film - shot plan, prompt engineering, generation via Higgsfield/fal.ai, and a Remotion finishing pass for logo, fade and audio. No presenter, no voiceover - the product performs.

## What's inside

- `SKILL.md` - the skill definition (drop into Claude Code / any skill-compatible agent)
- `SETUP-GUIDE.md` - complete beginner setup guide (accounts, providers, API keys, cloud/local/desktop options)
- `PROMPT-STRUCTURE-GUIDE.md` - how the shot-prompt structure works
- `docs/example-prompt.md` - a real filled-in example prompt (Lay's chips case study)
- `references/` - 11 deep-dive docs: intake, shot grammar, prompt template, providers, finishing, ledger, self-check
- `composer/` - Node scripts that compose and validate multi-shot "fast-cut" film specs
- `finish/` - Remotion finishing pass (npm install, then `finish.mjs`)
- `scripts/ledger.mjs` - film-history ledger so repeat products don't regenerate identical films
- `ledger.txt` - the ledger data file

## Requirements

- A skill-compatible AI agent (Claude Code, or any agent that reads SKILL.md)
- A generation provider account: Higgsfield or fal.ai (paid per generation, ~$5-30/video)
- Node.js 18+ for the composer and finishing scripts

## License

GPL-3.0-or-later - GPLMart original packaging. The skill instructs your own AI agent; video generation costs are paid to the provider you connect.
