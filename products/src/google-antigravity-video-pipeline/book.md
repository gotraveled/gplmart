# The Google Antigravity Viral Video Pipeline

**Build a repeatable, AI-assisted faceless video production system - from raw audio to a rendered 1080x1920 MP4 - using Google Antigravity, open-source tools and prompt-led workflows.**

This is the practical, step-by-step version of the workflow. No fluff, no hype - just the exact folder structure, tools, prompts and review gates that turn an AI coding assistant into a video production line.

---

## Who this is for

- Creators publishing faceless reels/shorts who want a repeatable system, not one-off experiments
- Developers and automation builders who want to wire AI agents (Google Antigravity) into a media pipeline
- Small teams that need consistent output quality without hiring an editor

## What you'll be able to do

- Set up a clean, agent-friendly project workspace in under 10 minutes
- Install and verify a 4-tool video engine (motion graphics, ffmpeg, transcription, voiceover)
- Turn reference reels into a reusable `style.json` visual identity sheet
- Generate storyboards, review them, and render final vertical MP4s on demand
- Re-run the whole pipeline for every new video with copy-paste prompts

---

## Chapter 1 - Why a pipeline beats one-off prompting

If you've watched creators automate video editing with AI, you've seen the pattern: the ones who get consistent results aren't prompting harder - they're running a **pipeline**. A pipeline means:

- **Fixed structure** - every project has the same folders, so the agent always knows where things live
- **Fixed tools** - the same small set of utilities handle every stage, so failures are debuggable
- **Fixed review gates** - you approve a storyboard *before* a render burns compute
- **Reusable identity** - a style sheet means video #50 looks like video #1

The alternative - describing a video from scratch every time - produces inconsistent output and burns tokens on re-explaining the same requirements.

### The 4-step master framework

```
01  Clean workspace setup
02  Install 4 power tools
03  Decode a creator style (once)
04  Storyboard review → render → export
```

Steps 1-3 are one-time setup. Step 4 is the loop you repeat for every video.

---

## Chapter 2 - Step 01: Build the production workspace

### Folder structure

Create one clean project folder. Keep source media, style references and finished exports strictly separate - mixed folders are the #1 cause of agent confusion.

```
Viral Reel Studio/
├── Raw Footage/        ← voiceover audio, mic recordings, raw clips
├── Style Reference/    ← 2-3 downloaded reference reels + style.json
└── Export/             ← final 1080x1920 MP4s
```

**Rules that matter:**

- `Raw Footage/` holds *inputs only* - never put renders here
- `Style Reference/` holds the references used to build `style.json` - keep them even after decoding
- `Export/` is write-only for the pipeline - review files here, archive winners elsewhere

### Connect it to Google Antigravity

1. Open Google Antigravity on your desktop
2. Drag the entire `Viral Reel Studio` folder into the workspace
3. Verify the agent can list the three subfolders before continuing - if it can't see them, file access isn't granted yet

> **Why drag the folder, not individual files?** Antigravity treats the workspace root as its working context. A single root folder means every prompt can reference paths like `Raw Footage/voiceover.mp3` without ambiguity.

---

## Chapter 3 - Step 02: Install the 4 engine tools

The pipeline needs four capabilities. You don't have to use these exact tools - but you need *a* tool for each role, verified working before you build on it.

| Role | Tool | What it does |
|---|---|---|
| Motion graphics | **HyperFrames** | Renders kinetic popup cards, CSS-based animations, text overlays |
| Video processing | **FFmpeg** | Cutting, trimming, loudness normalisation, SFX mixing, final encoding |
| Transcription | **OpenAI Whisper** | Speech-to-text with word-level timestamps for captions |
| Voiceover | **Edge-TTS / ElevenLabs** | Natural-sounding AI voice generation (Edge-TTS is free) |

### Verification philosophy

Before building the pipeline, prove each tool works standalone:

- FFmpeg: `ffmpeg -version` and transcode one test clip
- Whisper: transcribe 30 seconds of any audio file
- HyperFrames: render one sample animation
- Edge-TTS: generate one 10-second voiceover

> A tool that "should work" but hasn't been run once will fail at 2am mid-render. Verify first, automate second.

### The engine auto-install prompt

Copy-paste this to Antigravity to have it audit your system:

```
Mera ek video-editing project hai. Mere system par Node.js, Python, FFmpeg aur Whisper installed hain ya nahi, check karo. Agar koi tool missing hai, toh installation se pehle mujhe required changes dikhao. Mere approval ke baad install karo, phir har tool ko test karke confirm karo ki video-rendering engine ready hai.
```

*(Translation: "I have a video-editing project. Check whether Node.js, Python, FFmpeg and Whisper are installed. If anything is missing, show me the required changes before installing. Install only after my approval, then test every tool and confirm the rendering engine is ready.")*

**What good output looks like:** a dependency report listing installed/missing tools, a proposed install plan awaiting your approval, then per-tool test results. If the agent starts installing without asking, your prompt guardrails aren't strict enough - restate "approval ke baad" (only after approval).

---

## Chapter 4 - Step 03: Decode a creator style

This is the step that separates amateur output from a recognisable channel. Instead of designing every video from scratch, you analyse 2-3 reference reels **once** and produce a reusable `style.json`.

### Choosing references

- Pick reels in your niche whose pacing, captions and colour language you want
- Only use references you have the right to analyse (your own content, licensed material, or public content for personal workflow study - check the platform's terms)
- 2-3 references is enough - more creates contradictory signals

### The style decoder prompt

Drop your references into `Style Reference/` and paste:

```
Style Reference folder mein maine 2 sample reels rakhi hain. Inka audio aur video frame-by-frame inspect karo aur ek reusable style.json banao. Ismein ye details include karo:
1. Primary & secondary colours - background, borders, highlights.
2. Typography - headline font, caption size, letter spacing.
3. Sound design - whoosh, click, ding aur other SFX ke timestamps.
4. Mascot / character - position, scale aur animation triggers.
Reference se jo cheez confidently identify na ho, use guess karne ke bajaye "unknown" mark karo.
Output: Ek master style sheet jo aapki future reels mein consistent visual language apply karne mein help karegi.
```

### What a good `style.json` contains

```json
{
  "colors": {
    "background": "#0B0B0F",
    "primary": "#C8F542",
    "secondary": "#8B5CF6",
    "text": "#FFFFFF",
    "caption_bg": "rgba(0,0,0,0.65)"
  },
  "typography": {
    "headline_font": "Montserrat Black",
    "caption_font": "Inter SemiBold",
    "caption_size_px": 64,
    "letter_spacing": "-0.02em"
  },
  "sound": {
    "whoosh_at": [0.0, 4.2],
    "click_sfx": "subtle, -18dB under voice",
    "music_bed": "lo-fi, -24dB under voice"
  },
  "layout": {
    "safe_zone_top": 220,
    "safe_zone_bottom": 320,
    "caption_position": "lower-third",
    "mascot_position": "right-third"
  }
}
```

> **The "unknown" rule matters.** Models hallucinate details confidently. Forcing `unknown` on anything it can't verify prevents a wrong guess from becoming permanent brand DNA.

---

## Chapter 5 - Step 04: Storyboard review → render → export

Never let the agent render blind. The storyboard gate exists because a bad render costs minutes of compute *and* your review patience.

### The workflow

1. Drop your voiceover audio (or topic script) into `Raw Footage/`
2. Ask for a storyboard first - scene-by-scene preview stills
3. Review and give feedback (font size, caption placement, SFX levels)
4. Only after you say **"Proceed"** does it render the final MP4

### The storyboard & render prompt

```
Raw Footage folder se mera audio pick karo. Master style sheet use karke audio ke according 6-8 scenes ka visual storyboard banao. Har scene ke preview stills dikhao. Main feedback de sakun - jaise font size, caption placement ya SFX volume. Mere "Proceed" kehne ke baad hi 1080x1920 MP4 render karo aur Export folder mein save karo. Render complete hone par output file path aur basic validation report dikhao.
```

### Why "Proceed" matters

Without an explicit approval gate, agents optimise for finishing - they'll render the first plausible storyboard. With it, you catch:

- Captions covering faces or key visual elements
- Wrong colour palette drifting from `style.json`
- SFX drowning the voiceover
- Scene pacing that doesn't match the audio energy

---

## Chapter 6 - The final checklist (run it every time)

Before publishing any render:

- [ ] Voiceover and source media reviewed for noise/clicks
- [ ] `style.json` applied consistently across all scenes
- [ ] Storyboard approved before rendering started
- [ ] Captions transcribed accurately (Whisper word-level, not auto-guess)
- [ ] Audio loudness normalised to platform standard (-14 LUFS for most platforms)
- [ ] Framing respects platform safe zones (no UI overlap)
- [ ] Final file is 1080x1920 MP4, H.264, saved in `Export/`
- [ ] File plays correctly on a phone screen, not just desktop

---

## Chapter 7 - Troubleshooting the common failures

| Symptom | Likely cause | Fix |
|---|---|---|
| Agent can't find files | Workspace root not the project folder | Re-drag `Viral Reel Studio/` as workspace root |
| Captions drift out of sync | Whisper model too small / noisy audio | Use `medium` model, denoise audio first with ffmpeg `afftdn` |
| Render is silent | Audio stream not mapped in ffmpeg | Check `-map 0:a?` flags; verify source has audio |
| Colours look washed out | Wrong colour space in ffmpeg | Add `-vf scale=...:out_color_matrix=bt709` |
| Voice sounds robotic | Edge-TTS voice mismatch | Try a different voice ID; ElevenLabs for premium tone |
| Agent ignores style.json | Prompt didn't reference the file path | Always say "use Style Reference/style.json" explicitly |

---

## Chapter 8 - Scaling the pipeline

Once one video flows cleanly:

1. **Batch topics**: give the agent a list of 5 video concepts; it drafts 5 storyboards for review in one session
2. **Template scenes**: turn your best-performing scene layouts into reusable HyperFrames components
3. **Analytics loop**: note which hooks/retention points worked, feed that back into style.json and prompt templates
4. **Multi-platform crops**: render 9:16 master, derive 1:1 and 16:9 cuts with ffmpeg in the same pipeline

---

## Appendix A - Complete prompt library

**Engine audit** (Chapter 3), **style decoder** (Chapter 4), **storyboard & render** (Chapter 5) - copy-paste ready above. Two more worth keeping:

**Batch concept generation:**
```
Mere niche ke liye 5 faceless reel concepts banao. Har concept ke liye: hook (pehle 3 second), core message, visual style suggestion, estimated duration. Mere audience ke liye most engaging order mein arrange karo.
```

**Caption fix pass:**
```
Export folder ki latest video ke captions review karo. Whisper transcript se match karke har caption ki spelling, timing aur readability check karo. Galtiyan fix karke captions.srt update karo, phir video re-render mat karo - sirf caption file update karo.
```

---

## Appendix B - Tool cost reality check

| Tool | Cost | Notes |
|---|---|---|
| Google Antigravity | Free tier available | Agent runs locally; usage limits vary |
| FFmpeg | Free, open source | The workhorse - learn its basics |
| Whisper | Free (local) | `whisper.cpp` or `faster-whisper` for speed |
| Edge-TTS | Free | Good enough for most faceless content |
| ElevenLabs | Paid tiers | noticeably more human; worth it for hero content |
| HyperFrames | Varies | Verify current licensing before commercial use |

> Always verify tool licensing and availability on your own system before building a commercial workflow on top of it.

---

*GPLMart - practical digital resources for creators, merchants and developers. One membership, everything included.*
