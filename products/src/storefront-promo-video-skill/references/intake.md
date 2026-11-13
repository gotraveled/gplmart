# Intake - question bank and spec schema

Ask these in ONE batch. Do not drip-feed questions.

1. Store/brand name?
2. One-line positioning? ("premium skincare for sensitive skin")
3. Logo file? (PNG/SVG transparent - required for end card)
4. Product photos? (3-6, plain background, product alone)
5. Top 3 claims? (verbatim from store copy - never paraphrase)
6. CTA? ("Shop now" / discount code / URL)
7. Duration? (15/20/25s)
8. Aspect ratio? (9:16 default, 1:1, 16:9)
9. Mood? (clean-minimal / bold-energy / premium-luxury / playful)

## promo-spec.json

```json
{
  "brand": "Store name",
  "positioning": "one line",
  "palette": {"primary": "#hex", "secondary": "#hex", "bg": "#hex"},
  "claims": ["verbatim claim 1", "verbatim claim 2"],
  "cta": {"text": "Shop now", "url": "https://..."},
  "durationSeconds": 20,
  "aspectRatio": "9:16",
  "mood": "clean-minimal",
  "logoFile": "path/to/logo.png"
}
```

Derive palette from the logo and product photos - do not invent brand colours.
