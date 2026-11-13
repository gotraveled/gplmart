---
name: storefront-promo-video
description: Make a short brand/storefront promo video end to end for any e-commerce store - hero product shots, store highlights and a call-to-action, generated via Higgsfield (falling back to fal.ai) with a Remotion finishing pass. Use for store launch videos, ad creatives, "about our store" reels and seasonal promos. NOT for single-product films (use ecom-product-video) or narrated/voiceover videos.
---

# Storefront promo film at a time, for any brand

A promo film shows the *store*, not one product: hero shots, range/bestsellers, brand mood, and a closing
call-to-action. No presenter, no voiceover - visuals and on-screen text carry it.

If someone asks for a voiceover or a person to camera, say plainly this skill does not do it.

This skill is brand-agnostic: it asks for the store name, logo file, product photos, selling points and
the CTA fresh every run. It can run on any e-commerce store in any category.

**Higgsfield first, fal.ai fallback.** Same provider rules as the product-film skill - see
`references/providers.md`.

---

## Which mode

| Mode | When |
|---|---|
| **Storyboard-first** (default) | Show and approve each scene's still before animating |
| **Fast-cut** | "Just make it" - a script composes hard-cut shots into one generation |

Both modes always show the full shot plan and cost estimate before generating. That gate never goes away.

---

## The promo structure (5 beats, ~15-25s)

Every promo follows the same arc - adapt timing to the requested duration:

1. **Hook (0-3s)** - the boldest visual: hero product hero-shot or brand statement text over product footage
2. **Range (3-8s)** - 2-3 products or collections in quick succession, hard cuts
3. **Proof/mood (8-14s)** - texture shots, lifestyle context, "why us" visual (craft, ingredients, tech)
4. **Offer/CTA (14-20s)** - the promotion or differentiator, big readable text
5. **Logo close (20-25s)** - brand logo + URL/domain, clean end card

## Intake - ask once, batch the questions

1. Store/brand name and one-line positioning ("premium X for Y")
2. Logo file (PNG/SVG with transparency) - required for the end card
3. 3-6 product photos (plain background, product alone) or store screenshots
4. Top 3 selling points / claims - verbatim from the store's own copy
5. The CTA: what should the viewer do? ("Shop now", "Use code X", URL)
6. Duration (15/20/25s recommended) and aspect ratio (9:16 default)
7. Mood: clean-minimal / bold-energy / premium-luxury / playful

## Shot grammar for promos

- Every shot must be a *different* action or camera move - no repeated orbit, no repeated push-in
- One 360-orbit maximum per film (usually the hero shot)
- Text overlays: max 6 words per card, 2-3 cards total - promos die from text walls
- The end card is the only place the logo appears; never let the generator draw logos mid-film
- Colour palette comes from the brand's actual assets, not generic "nice" colours

## The pipeline

1. Intake answers → `style.json` equivalent: `promo-spec.json` (brand, palette, fonts, claims, CTA, mood)
2. Shot plan: numbered scenes with duration, action, camera move, on-screen text - shown for approval
3. Cost estimate shown and confirmed before any generation
4. Generate per-scene or as one fast-cut generation (provider mechanics in `references/providers.md`)
5. Finishing pass (Remotion): real logo end card, ending fade, optional audio track - `references/finishing.md`
6. Review gate: watch the whole film once; fixes that don't need regeneration (music, fade, logo, CTA text) are free - ask before paying for a re-render

## Rules that exist because films came back wrong

- Never invent claims - only verbatim store copy goes on screen
- Never generate the logo inside footage - it's composited in finishing
- Never skip the cost confirmation - generation is paid, always
- Never deliver without the review checklist in `references/self-check.md`

## References

- `references/intake.md` - question bank and spec schema
- `references/shot-grammar.md` - camera moves, pacing curve, text rules
- `references/providers.md` - Higgsfield/fal.ai calling mechanics and costs
- `references/finishing.md` - Remotion pass details
- `references/self-check.md` - pre-delivery checklist

---

*Part of GPLMart All-Access - GPL-3.0-or-later - © GPLMart - gplmart.com*

