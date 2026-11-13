# Launch intake + spec schema

## Questions (one batch)

1. Store name?
2. Launch type? (new store / new collection / restock / seasonal drop / rebrand)
3. Launch date or "live now"?
4. Logo file? (PNG/SVG transparent)
5. Product photos? (4-8 from the launch collection, plain backgrounds)
6. The offer, verbatim? (code, %, free shipping terms - copy exactly)
7. Store URL for the end card?
8. Duration? (15/20/25s) + aspect ratio? (9:16 default)
9. Mood? (hype-drop / premium / playful / minimal-luxury)

## launch-spec.json

```json
{
  "store": "Store name",
  "launchType": "new-collection",
  "launchDate": "2026-11-20",
  "offer": {"text": "LAUNCH WEEK - 20% OFF", "code": "NEW20"},
  "url": "https://store.com",
  "products": ["hero product name", "second", "third"],
  "palette": {"primary": "#hex", "bg": "#hex"},
  "durationSeconds": 20,
  "aspectRatio": "9:16",
  "mood": "hype-drop",
  "logoFile": "path/to/logo.png"
}
```

Derive palette from logo + product photos. Offer text goes on screen VERBATIM - never embellish.
