# Complete setup guide: the `ecom-product-video` skill

No prior experience with Claude, skills, or AI video tools is assumed. Every term is defined the
first time it's used — skip ahead past anything you already know.

---

## Part 1 — What this actually is

**What you end up with**: a short, professional-looking product video — the kind you'd see as an
Instagram Reel or ad — made entirely by AI, from one photo of your product and a few answers to
simple questions. No filming, no editing software, no design skill needed.

**How it works**: you're using an AI assistant called **Claude**. Claude can be given a bundle of
instructions called a **skill** — a detailed, packaged set of instructions for one specific job.
This skill's job is: take a product photo, ask you a handful of questions about the product,
design a shot-by-shot plan for a short video, then send that plan to a separate AI
video-generation company (either **Higgsfield** or **fal.ai** — two companies that turn text
descriptions and photos into real video footage) and hand you back the finished file.

**One important thing to understand before you start: this costs real money.** Higgsfield and
fal.ai are paid services — generating one video typically costs somewhere between $5 and $30
depending on length and quality, charged to whichever of those two accounts you connect. The
skill will always tell you the price and ask you to confirm *before* it spends anything, but you
do need an account with a payment method on one of those two services before any video can be
made. There is no free option for the actual video generation itself.

---

## Part 2 — A short glossary (read once, come back if you get stuck)

| Term | What it means here |
|---|---|
| **Claude Code** | The specific Claude product this skill runs inside — an AI assistant that can read files, run small programs, and use outside tools/services on your behalf, not just chat. |
| **Skill** | A bundle of instructions and small helper files you give to Claude so it knows how to do one specific job — in this case, making a product video. |
| **Prompt** | The text description sent to the video-generation AI describing exactly what should appear on screen. You never have to write this yourself — the skill writes it for you based on your answers. |
| **Generation** | The act of the AI actually producing a still image or a video from a prompt. Every generation costs money. |
| **MCP / Connector** | The technical name for how Claude is linked up to an outside service like Higgsfield, so it can use it directly instead of you copy-pasting things back and forth. |
| **API key** | A long, unique password-like code that identifies *you* to a service like fal.ai when a computer program (not you, by hand) talks to it. You generate one on that service's own website. |
| **Credential** | A safer way of storing an API key so that Claude can use it without you (or anyone reading the conversation) ever seeing the actual key text. |
| **Cloud environment** | A version of Claude Code that runs on a remote computer somewhere else, not your own machine — useful if you don't want to install anything locally. |
| **Aspect ratio** | The shape of the video frame — `9:16` is tall/vertical (Reels, Shorts, TikTok), `1:1` is square, `16:9` is wide/landscape (YouTube). |
| **Terminal / Command line** | A plain-text window where you type commands instead of clicking buttons. Only needed if you pick the "CLI" option below — the Desktop app option below avoids this entirely. |

---

## Part 3 — Everything you need before you start

Go through this list top to bottom. Don't skip the account creation steps even if they feel
unrelated to "using an AI skill" — nothing will work without them.

### 3.1 — A Claude account with Claude Code access

If you don't already have a Claude account, go to **claude.ai** and sign up (it just needs an
email address). Claude Code is a specific product/mode within the Claude ecosystem — if you're
not sure whether your account has access to it, that's a question for wherever you got pointed to
this skill from, since access details vary by plan.

### 3.2 — A video-generation provider account: Higgsfield or fal.ai

You need **at least one** of these two. If you're not sure which, **fal.ai is the simpler one to
set up yourself from scratch**, since Higgsfield is usually connected through Claude directly
rather than through its own separate signup you do first. This guide covers both.

**Setting up fal.ai, step by step:**

1. Go to **fal.ai** in your web browser.
2. Click **Sign up** (top right, or similar) and create an account — email and password, or
   sign in with Google.
3. Once logged in, find your **Dashboard**.
4. Go to **Billing** (or similar) and add a payment method. fal.ai charges you per generation,
   not a flat subscription — you're only charged for what you actually generate.
5. Go to **Dashboard → Keys** (sometimes written as `fal.ai/dashboard/keys`).
6. Click **Create new key** (or similarly labelled button).
7. **Copy the key it shows you immediately** — this long string of letters and numbers is your
   **API key**. Some services only show it once, so copy it somewhere safe (a private note, not
   anywhere public) before navigating away.
8. Keep this tab open or the key copied — you'll need it in Part 5 below.

**Setting up Higgsfield**: Higgsfield doesn't typically need you to generate your own key up
front the way fal.ai does — instead, you connect it *from inside Claude* as a "connector." Full
steps are in Part 5 below. If you'd rather start with fal.ai and add Higgsfield later, that's
completely fine — you only need one to begin.

### 3.3 — A real photo of your product

This is a hard requirement — the skill will not start generating anything without one, and it
will never invent what your product looks like.

What makes a good photo:
- The product **by itself**, not held by a person, not on a shelf with other things.
- A **plain background** — a table, a plain wall, anything uncluttered.
- **No text or graphics already added** to the photo (no "SALE!" banners, no price tags stuck on
  top digitally) — just the real product as it looks.
- A phone photo is completely fine. It doesn't need to be professionally shot.

Save this photo somewhere you can easily find it again — your phone's camera roll, or a
`Downloads` or `Pictures` folder on your computer, wherever you'd normally find a photo.

---

## Part 4 — Picking which of the three options fits you

There are three ways to run this skill. Pick based on your own comfort level — none of them is
"better," they're just different starting points.

| If this describes you... | Use this option |
|---|---|
| I've never opened a black terminal/command-line window and typed commands, and I don't want to start now | **Option A — Desktop app** |
| I'm comfortable typing commands into a terminal, or I want to | **Option B — Local CLI** |
| Someone already set up a "cloud environment" link for me, or I specifically want to avoid installing anything on my own computer | **Option C — Cloud environment** |

If you're unsure, **start with Option A** — it needs the least prior knowledge.

---

## Option A — Claude Code Desktop app (recommended for first-timers)

### Step 1: Open the Claude Code desktop app

If you don't have it installed yet, this needs to come from wherever your organization or
account provides Claude Code access — it's a separate download/app from the regular claude.ai
website chat.

### Step 2: Find the "Upload skill" option

Inside the app, look for a **Skills** section — this is usually somewhere in a settings menu, a
sidebar, or a workspace/project panel, depending on the exact version of the app you have. Look
for wording like **"Skills," "Upload skill,"** or a **+** button near a list of skills.

When you find it and click **Upload skill**, you'll see a form that looks roughly like this:

```
Upload skill
Add a skill to your workspace. A security scan runs when you save.

Skill file
[ choose a file ]

Preview
[ shows the skill's name once a valid file is selected ]

Security scan
Ready — runs when you save

[ Save ]  [ Cancel ]
```

### Step 3: Choose the file

Click into the **Skill file** area and pick the file named **`ecom-product-video.skill.zip`** —
this is the file you were given. Navigate to wherever you saved it (probably your `Downloads`
folder) and select it.

A **Preview** should appear showing `ecom-product-video`, confirming it read the file correctly.
If you instead see a red warning about the file (for example, about the path or the file
structure), make sure you're uploading the `.zip` file exactly as given, not a file you've
unzipped and re-zipped yourself, since that can change the internal file structure the uploader
expects.

### Step 4: Save, and wait for the security scan

Click **Save**. A short automatic security scan runs — this is a standard, automatic check the
app does on every skill upload, nothing you need to do anything about. Once it finishes, the
skill will show up in your list of available skills.

### Step 5: Start a new conversation

Open a new chat in Claude Code, the same way you'd start any new conversation.

### Step 6: Ask for what you want

Type something like:

> *Use the ecom-product-video skill to make a video for my product.*

Claude should recognize this matches the skill you just uploaded and start using it. If it
doesn't seem to pick it up, you can be more explicit and literally reference it by name, or check
whether your version of the app has a way to select a skill directly before you start typing.

### Step 7: Attach your product photo

At some point early on, Claude will ask for a photo of your product. Attach it the same way you'd
attach any image to a chat message — usually a paperclip or **+** icon near where you type, or
you can drag-and-drop the image file directly into the chat window.

### Step 8: Answer the questions

Claude will ask you a short set of questions, one batch at a time, roughly:

- Your product's exact name
- What it's physically made of (solid, liquid, powder, fabric, etc.) and whether it's edible
- What it looks or feels like up close (texture, color, finish)
- Any claims or selling points — **copy these directly from your own packaging or product
  listing**, word for word. Don't paraphrase; the skill treats this as real marketing/legal text,
  not creative writing.
- How long you want the video (anywhere from about 4 to 30 seconds)
- What shape the video should be (`9:16` for Instagram Reels/TikTok/YouTube Shorts is the normal
  choice)
- Your brand's logo file, if you have one and want it added — this is optional

Answer in your own words, in full sentences — you don't need to format anything specially.

### Step 9: Review the plan before anything is generated

Before spending any money, Claude will show you a **shot plan** — a numbered list of what will
happen in each few-second segment of the video — along with an **estimated cost**. Read through
it. If something's off (too slow, missing an idea you wanted, wrong mood), say so specifically
and ask for a change before saying yes. This step is free; only the actual generation afterward
costs money.

### Step 10: Say yes, and wait

Once the plan looks right, confirm you want to proceed. The video generation itself typically
takes anywhere from about one to five minutes depending on length. Claude will let you know once
it's ready.

### Step 11: Review and save the result

Watch the whole video once it's back — don't just assume it's correct because a file appeared.
Check it actually matches what you asked for. If it's off in some way, tell Claude specifically
what's wrong and whether you want to try again (which usually costs money again) or whether it's
something that can be fixed for free (music, the ending fade, and the logo can often be changed
without a full new generation — ask about this before assuming a fix requires paying again).

Once you're happy with it, save the video file to your computer the way you'd save any file
attachment from a chat.

---

## Option B — Claude Code CLI, running locally on your own computer

Choose this if you're already comfortable typing commands into a terminal (also called a
"command line" or "command prompt" — a plain text window where you type instructions instead of
clicking).

### Step 1: Install the Claude Code command-line tool

Follow Anthropic's own installation instructions for the `claude` command for your operating
system, if you haven't already installed it.

### Step 2: Find or create your project's skills folder

Skills for the Claude Code CLI usually live in a folder named `.claude/skills/` inside whichever
project folder you're working in (a "project folder" here just means any folder on your computer
you're using for this work — it can be a brand-new empty folder). If that `.claude/skills/`
folder doesn't exist yet, create it.

### Step 3: Unzip the skill into that folder

Unzip `ecom-product-video.skill.zip` so you end up with this exact structure:

```
your-project-folder/
  .claude/
    skills/
      ecom-product-video/
        SKILL.md
        references/
        composer/
        finish/
        scripts/
        ledger.txt
```

If your computer's built-in unzip tool creates an extra nested folder (like
`ecom-product-video/ecom-product-video/...`), move the inner folder up one level so the structure
matches exactly what's shown above.

### Step 4: Open a terminal in that project folder

However you normally open a terminal, navigate (`cd`) into your project folder — the one that
contains the `.claude` folder you just set up.

### Step 5: Start Claude Code

Type:
```bash
claude
```
and press Enter.

### Step 6: Ask for what you want, same as Option A

```
Use the ecom-product-video skill to make a video for my product.
```

Then follow the same Steps 7-11 as in Option A above (attach the photo, answer the questions,
review the plan, say yes, review the result).

### Step 7: Set up the finishing pass (optional, but recommended)

One part of this skill — adding your real logo and a precise ending fade — runs as a small
program on your own computer instead of through the paid AI service, so it doesn't cost anything
per use. It needs a one-time install:

```bash
cd .claude/skills/ecom-product-video/finish
npm install
```

(This requires **Node.js** to already be installed on your computer — if the `npm` command isn't
recognized, you'll need to install Node.js first, from `nodejs.org`.)

This downloads roughly 400 MB the first time (mostly a small embedded browser used for rendering)
and only needs to happen once. Claude will offer to run this for you automatically the first time
it's needed, and you can just say yes when it asks rather than typing the command yourself.

### Step 8: Connect your provider (Higgsfield or fal.ai)

See **Part 5** below.

---

## Option C — A Claude Code cloud/remote environment

Choose this if you don't want to install anything on your own computer, or if you were given
access to a cloud environment already set up by someone else.

A cloud environment is a version of Claude Code running on a remote computer you access through
your browser, rather than software installed on your own machine.

### Step 1: Open or create the cloud environment

Follow whatever flow your Claude Code product provides for creating a new cloud environment —
this is usually a button somewhere labelled **"New environment,"** **"Cloud session,"** or
similar.

### Step 2: Upload the skill

Inside that environment's settings, find **Upload skill** (the same form shown in Option A, Step
2 above) and upload `ecom-product-video.skill.zip`.

### Step 3: Connect your provider

Cloud environments run in a restricted, extra-secure network setup, which means fal.ai
specifically needs one extra setup step beyond what Option A/B need. Full details are in **Part
5** below — read that section carefully if you're using fal.ai in a cloud environment, since it's
the part most likely to trip up a first attempt.

### Step 4: Start a session and ask for what you want

Same as Option A, Steps 5-11.

---

## Part 5 — Connecting Higgsfield or fal.ai: the actual steps

Do this once per provider you plan to use, before your first real generation.

### Connecting Higgsfield

Higgsfield is normally added as a **connector** — a link between Claude and the Higgsfield
service, so Claude can call it directly.

- **In claude.ai or the Desktop app**: look for **Settings → Connectors** (sometimes labelled
  **Integrations**), search for "Higgsfield," and follow its connect/authorize flow.
- **In the CLI**: connectors are typically added with the `claude mcp add` command, or configured
  in a project's MCP settings file. If the exact command isn't obvious, run `claude mcp --help`
  for the current options in your installed version.
- **In a cloud environment**: check that environment's own **Connectors** or **Tools** settings.
  Some cloud environments come with Higgsfield already connected at the account level; others
  need it added per environment.

The first time you connect it, expect a short sign-up or trial-activation step on Higgsfield's
side — this is normal.

### Connecting fal.ai — for Option A (Desktop) or Option B (local CLI)

You already generated an API key in Part 3.2 above. Now you need to make it available to Claude
as an **environment variable** — a named value your computer's programs can read, kept separate
from your normal files so it doesn't end up saved anywhere visible by accident.

**Never paste your API key directly into a chat message.** Only set it the way described below.

**On macOS or Linux**, open a terminal and type, replacing the placeholder with your real key:
```bash
export FAL_KEY=your-actual-key-here
```
This only lasts for that one terminal window. To make it permanent, add that same line to a file
called `~/.zshrc` or `~/.bashrc` (whichever your system uses) using a text editor, then restart
your terminal.

**On Windows, using PowerShell**, open PowerShell and type:
```powershell
$env:FAL_KEY = "your-actual-key-here"
```
This only lasts for that one PowerShell window. To make it permanent instead, type:
```powershell
setx FAL_KEY "your-actual-key-here"
```
then close and reopen PowerShell before using it again — `setx` doesn't apply to the window you
ran it in.

Then start (or restart) Claude Code from that same terminal window, so it can see the key.

### Connecting fal.ai — for Option C (cloud environment)

This is the part that took the most trial and error to get right the first time — follow it
exactly rather than improvising, since a couple of small details (below) are easy to get wrong
and don't fail loudly when they are.

1. Open your cloud environment's settings — look for an **"Edit environment"** option.
2. You'll likely see two different places to add information: a plain **"Environment variables"**
   text box, and a separate, more secure section usually called **"API credentials"**. **Use the
   credentials section, not the plain text box** — the plain box is typically visible to anyone
   using that environment, which is fine for harmless settings but wrong for a real API key.
3. Click **"+ Add credential"** (or similarly worded).
4. Fill in the form as follows:

   | Field | What to enter |
   |---|---|
   | Name | `FAL_KEY` (or any label you'll recognize — this is just for you) |
   | Credential type | **Bearer** — pick this from the dropdown; it's the closest built-in option even though the exact wording will differ slightly from what fal.ai needs (next step fixes that) |
   | Allowed websites | Add all four of these, as separate entries: `fal.run`, `queue.fal.run`, `rest.fal.ai`, `v3b.fal.media` |
   | Custom header — Name | `Authorization` |
   | Custom header — Prefix | Change this to **`Key`** — by default it will say `Bearer`, and you need to manually change that text to just the word `Key` instead. This is the single most common mistake: fal.ai's service specifically expects `Authorization: Key <your-key>`, not the `Bearer` wording almost every other API uses. |
   | Custom header — Value | Paste your actual fal.ai API key here |

5. **Why all four websites, not just one**: fal.ai's service is actually spread across several
   different addresses depending on what's happening — one for starting a generation, one for
   checking on it, one for uploading your photo, and one for where the uploaded file itself is
   stored. If you only add one or two, some things will work and others will silently fail later
   in the process. Adding all four up front avoids that.
6. Save the credential.
7. If things still don't work after this — calls to fal.ai timing out or failing — your cloud
   environment may also have a separate, broader **"Network access"** setting (sometimes with a
   label like "Trusted") that needs to be widened too, on top of the credential itself. Check for
   a "learn more" or documentation link next to that setting if you hit this.

---

## Part 6 — A tip that will save you real money the first time

Before generating a full video, ask Claude to **generate one still image first, and show you
that image's actual returned width and height in pixels** — not just tell you the shape is
correct.

Here's why this matters: on the video models this skill uses, the shape of the finished *video*
is often copied from whatever still image is fed into it, rather than being something you set
separately on the video generation itself. So a mistake in the video's shape usually traces back
to the still image, and a still image costs a few cents to check versus tens of dollars for a
full video. Confirming the still is correct first, every time, is a genuinely worthwhile habit.

---

## Part 7 — What to actually expect, start to finish

1. **You'll be asked a short set of questions** — no technical knowledge needed to answer them.
2. **You'll be shown a full plan and a price before anything is generated.** Nothing happens
   without your explicit yes.
3. **Generation takes a few minutes.** This is normal — you don't need to do anything while it
   runs.
4. **Watch the result properly before deciding it's done.** AI video generation doesn't always
   perfectly follow every instruction — check it actually matches what you asked for.
5. **Some changes are free, some cost money again.** Changing the music, the ending fade, or the
   logo can usually be redone for free. Changing anything that actually appears in the picture
   requires paying for a new generation. Ask which category your change falls into before
   assuming either way.

---

## Part 8 — Troubleshooting

| Problem | Likely cause | What to do |
|---|---|---|
| "It won't generate anything" | No product photo attached yet | Attach a real, plain photo of the product — nothing proceeds without this |
| fal.ai calls fail, time out, or hang | A required host is missing from the credential's "Allowed websites" list | Add all four: `fal.run`, `queue.fal.run`, `rest.fal.ai`, `v3b.fal.media` |
| fal.ai says the request isn't authorized | The header prefix is wrong | It must read `Authorization: Key <your key>` — the word must be `Key`, not `Bearer` |
| The finished video is the wrong shape (e.g. square instead of tall) | The reference still image wasn't actually the shape you asked for | Ask for the still's real pixel dimensions before generating video, every time, not just the requested setting |
| The finishing pass (logo/fade) won't run | Node.js isn't installed, or you're on a locked-down machine that can't run it | Say yes when Claude offers to install it; if it genuinely can't run there, it will tell you plainly and deliver the video without those extra touches |
| You're not sure if something is "free to change" or "costs money again" | This isn't always obvious from the outside | Just ask directly — "does this cost anything?" — before requesting a change |

---

## Part 9 — A quick end-to-end checklist

Print this out or keep it open the first time you do this, start to finish:

- [ ] I have a Claude account with Claude Code access
- [ ] I have signed up for fal.ai and/or Higgsfield
- [ ] I have added a payment method to that account
- [ ] I have generated and safely copied my fal.ai API key (if using fal.ai)
- [ ] I have a real, plain, isolated photo of my product saved somewhere findable
- [ ] I have uploaded `ecom-product-video.skill.zip` as a skill
- [ ] I have connected my chosen provider (Higgsfield connector, or the `FAL_KEY` set up correctly)
- [ ] I have started a chat and asked for a video
- [ ] I have attached my product photo when asked
- [ ] I have reviewed the shot plan and the price before saying yes
- [ ] I have watched the finished video properly, not just assumed it's correct
