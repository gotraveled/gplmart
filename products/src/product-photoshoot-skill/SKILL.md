---
name: product-photoshoot-skill
description: Generate professional e-commerce product photos from a single phone photo - multiple angles, clean backgrounds, lifestyle scenes and marketplace-ready variants, via image-generation providers (fal.ai / Higgsfield). Use for product listings, Amazon/Flipkart/Meesho shots, ad creatives and catalogue images when a real photoshoot isn't possible.
---

# Product photoshoot from one photo

Turn one decent product photo into a full shoot: white-background hero, angled shots, detail macros,
lifestyle scenes and platform-specific crops. The product must stay TRUE to the original - this skill
exists to photograph the real item, never to redesign it.

No video, no presenter. Image generation only.

**Providers**: fal.ai (FLUX/Gemini image models) or Higgsfield image models. Costs are per-image
(cents, not dollars) - still confirm count + cost before batch generation.

---

## The shoot list (what gets generated)

Ask which shots the user needs - don't generate all by default:

| Shot | Use for |
|---|---|
| Hero white-bg | Marketplace main image (Amazon/Flipkart requirement) |
| 45-degree angle | Secondary listing image |
| Front + back | Full coverage shots |
| Macro detail | Texture/material close-up (fabric, ingredients, finish) |
| Flat lay | Catalogue/lifestyle context |
| In-use/lifestyle | Ad creatives, social posts |
| Size/scale reference | "fits in hand" style shots |

## Intake - one batch

1. Product photo (one clear shot, plain-ish background preferred)
2. Product name + category
3. Which shots from the list above? (or "all")
4. Background preference: pure white / brand colour / lifestyle scene
5. Platform target? (Amazon / Flipkart / Meesho / Instagram / generic) - affects crop and rules
6. Any text/labels that MUST appear verbatim? (ingredients, size, claims)

## Non-negotiable rules

- **Product fidelity first**: generated images must match the real product's shape, colour, label text
  and proportions. If the generator drifts (wrong logo, melted label, extra fingers on packaging),
  regenerate or adjust prompt - never ship a photo of a product that doesn't exist.
- **Text on packaging is sacred**: if the real label says "COLD PRESSED", the generated image must
  too - image models garble small text, so prefer angles that keep labels large or accept slight
  blur rather than wrong words.
- **No invented claims**: lifestyle scenes can show context, never fake before/after or results.
- **Platform rules**: Amazon main images = pure white bg, product only, no props/text. Know the
  platform's image rules before generating "compliant" shots.
- **Cost gate**: show shot list + per-image cost before generating anything.

## The pipeline

1. Intake → `shoot-spec.json` (product description, shots needed, bg, platform, constraints)
2. For each shot: write a detailed generation prompt preserving product identity
   - Always include: "same product as reference photo, identical label text, identical colours"
   - Negative constraints: "no extra objects, no text overlays, no watermark, no distorted label"
3. Generate stills → user reviews → regenerate rejects with specific feedback
4. Optional upscale/pass: platform-size export (2000px+ for Amazon, 1080x1080 for Instagram)
5. Deliver named files: `product-hero-white.jpg`, `product-angle-45.jpg`, etc.

## References

- `references/shot-list.md` - full shot taxonomy + prompt patterns per shot type
- `references/fidelity.md` - keeping product identity true across generations
- `references/platforms.md` - Amazon/Flipkart/Meesho/Instagram image rules
- `references/providers.md` - fal.ai/Higgsfield image model mechanics + costs
- `references/self-check.md` - pre-delivery checklist
