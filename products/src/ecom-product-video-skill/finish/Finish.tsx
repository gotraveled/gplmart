// Finish.tsx — the only edit pass. Three jobs the generator genuinely cannot do, and nothing else.
//
// Deliberately small. An earlier version of a project like this one layered captions and a CTA here too, and
// every round came back rejected as unclassy and blocky. The cause was two text layers colliding, because
// Seedance renders its own text from the product's own packaging/label and this composited on top of it. All
// text now lives in the generation prompt. This file must not grow one.
//
//   1. LOGO   a precise brand asset, supplied fresh per run via `logoSrc` — this pass carries no brand
//             identity of its own. A generation model approximating a logo breaks brand guidelines quietly,
//             so the brand's real file goes on here instead.
//   2. FADE   an abrupt cut reads as unfinished. Seedance can be asked for a fade and sometimes obliges;
//             doing it here is exact every time.
//   3. AUDIO  a supplied track. Seedance generates its own audio but cannot lay someone else's over it.
//   4. JOIN   several clips back to back, on hard cuts. Not a text layer, so it does not break the rule
//             above. Short clips, approved one at a time, only the wrong one regenerated, then joined. The
//             join is a HARD CUT deliberately. These films are built on hard cuts throughout, so a cut
//             between clips reads as another edit; a crossfade at the seam would be the one soft transition
//             in the film and would read as a mistake.

import { AbsoluteFill, Audio, Img, OffthreadVideo, Series, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export type FinishProps = {
  videoSrc: string;             // single-clip path, and clip 1 when several are given
  videoSrcs?: string[];         // every clip, in order. One entry means no join
  clipDurations?: number[];     // seconds per clip, measured by finish.mjs; parallel to videoSrcs
  audioSrc: string | null;
  logoSrc: string | null;       // this brand's own logo file for this run, or null for no logo
  showLogo: boolean;
  fadeOutSeconds: number;
};

export const Finish: React.FC<FinishProps> = ({ videoSrc, videoSrcs, clipDurations, audioSrc, logoSrc, showLogo, fadeOutSeconds }) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Fade the whole composition, image and audio together, over the last stretch. Fading only the image leaves
  // sound running under black, which reads as a mistake rather than an ending.
  const fadeFrames = Math.max(1, Math.round(fadeOutSeconds * fps));
  const opacity = interpolate(frame, [durationInFrames - fadeFrames, durationInFrames - 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const clips = videoSrcs && videoSrcs.length > 0 ? videoSrcs : [videoSrc];
  const videoStyle = { width, height, objectFit: 'cover' as const };

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', opacity }}>
      {clips.length === 1 ? (
        <OffthreadVideo src={clips[0]} style={videoStyle} />
      ) : (
        <Series>
          {clips.map((src, i) => {
            // Each clip plays for exactly its own measured length. Falling back to an even split would
            // drift the cuts off the real clip ends, which is the one thing a join must not do.
            const seconds = clipDurations?.[i] ?? durationInFrames / fps / clips.length;
            return (
              <Series.Sequence key={`${i}-${src}`} durationInFrames={Math.max(1, Math.round(seconds * fps))}>
                <OffthreadVideo src={src} style={videoStyle} />
              </Series.Sequence>
            );
          })}
        </Series>
      )}

      {/* Layered OVER the clip's own audio, not replacing it. If Seedance also generated music the two beds
          fight, so the generation prompt must ask for ambient only whenever a track is supplied here. */}
      {audioSrc ? <Audio src={audioSrc} /> : null}

      {/* Tight into the corner, small and quiet — a watermark should sit tight in the actual corner of the
          frame (small margin, not a generous inset), never floating noticeably inward. Only rendered when a
          logoSrc was actually supplied for this run; this pass has no default brand mark of its own. */}
      {showLogo && logoSrc ? (
        <Img
          src={logoSrc}
          style={{
            position: 'absolute',
            top: height * 0.035,
            right: width * 0.035,
            height: height * 0.055,
            opacity: 0.92,
            filter: 'drop-shadow(0 0.05em 0.15em rgba(0,0,0,0.45))',
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};
