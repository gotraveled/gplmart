# Finishing pass (Remotion)

The generator cannot: place your real logo file, do a precise ending fade, or mux a supplied audio track.
The Remotion pass does exactly those three things - nothing else.

1. `npm install` in the finish/ directory (one-time, ~400MB for the renderer)
2. Input: generated MP4(s) + logo PNG + optional audio track + promo-spec.json
3. Output: final MP4 - logo end card (last 2-3s), fade out, audio mixed under -14 LUFS
4. Check `finish/check.mjs` output - it validates duration, resolution, audio presence

Do not edit generated footage in the finishing pass - if footage is wrong, regenerate that shot.
