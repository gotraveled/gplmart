# How to use this skill (step by step)

This folder is an AI-agent skill. It does NOT run by itself - you give it to an AI coding agent (Claude Code, Devin, Cursor agent, etc.) and the agent follows the instructions inside.

## What you need first

1. **An AI agent that supports skills** - Claude Code Desktop app (easiest), Claude Code CLI, Devin, or similar. If your agent doesn't support skills, you can still paste `SKILL.md` + the `references/` files into a chat as context.
2. **For video/image skills only**: a generation provider account - Higgsfield or fal.ai (paid per generation). Text-only skills (copy, SEO, ads) need nothing extra.
3. **Node.js** installed - needed for the helper scripts in video skills.

## Option A - Claude Code Desktop app (easiest)

1. Download the product zip from your GPLMart dashboard (Members area > Products)
2. Unzip it - you'll see `SKILL.md`, `references/`, `README.md`
3. In Claude Code Desktop: find **Skills > Upload skill**
4. Upload the whole skill folder (or re-zip just this skill's contents and upload that)
5. Start a new chat and say: *"Use the [skill-name] skill to [your task]"*
6. The agent will ask the intake questions (product name, photos, offer, etc.) - answer them
7. Review the plan/cost it shows BEFORE saying yes to generation
8. Get your output (video file, copy document, audit report)

## Option B - Claude Code CLI / terminal

1. Unzip the product into your project folder:
   ```
   your-project/
     .claude/
       skills/
         <skill-name>/
           SKILL.md
           references/
   ```
2. Open terminal in that folder, run `claude`
3. Type: *"Use the <skill-name> skill to [task]"*
4. Follow the same intake → plan → approve → output flow

## Option C - No skill support? Paste as context

Open `SKILL.md`, read it, then paste it + the relevant `references/*.md` files into any AI chat (ChatGPT, Claude.ai web, Gemini) along with your task. The agent will follow the same instructions manually.

## The typical flow (all skills)

```
1. You ask for the task        → agent loads SKILL.md
2. Agent asks intake questions → you answer in one batch
3. Agent shows plan + cost     → you review and approve (or adjust)
4. Agent produces output       → you review, request fixes, done
```

## Tips

- **Be specific in your first message**: "Make a 20s launch video for my Diwali kurti collection, 25% off with code DIWALI25" beats "make me a video"
- **Have assets ready**: product photos, logo file, price/offer details - the agent will ask for them
- **Review before approving spend**: video/image skills always show cost first - never skip that step
- **Iterate freely on text skills**: copy/SEO/ads skills cost nothing - ask for 3 variations, pick the best
- **Keep the skill updated**: if GPLMart releases a new version, re-download and replace the folder

## Troubleshooting

| Problem | Fix |
|---|---|
| Agent doesn't recognize the skill | Say the exact skill name: "Use the ecom-product-video skill" |
| Agent asks too many questions | Answer in one batch - the intake is designed to be answered together |
| Generation fails / provider error | Check your fal.ai/Higgsfield account has balance and the key is set |
| Output not what you wanted | Describe specifically what's wrong - "caption covers the face" beats "it's bad" |
| Skill folder won't upload | Make sure SKILL.md is at the ROOT of the folder, not nested inside another folder |


