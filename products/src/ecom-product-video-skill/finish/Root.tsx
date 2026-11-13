import { AbsoluteFill, Composition, OffthreadVideo, staticFile } from 'remotion';
import { Finish } from './Finish';

const FPS = 30;

// A composition that needs no input media, used only by check.mjs to prove the render path really works.
// Loading @remotion/renderer is not the same as being able to render: the compositor binaries are separate
// executables, and a machine can load the module fine and still fail to run them (application control,
// blocked binaries, a broken install). Checking the cheap thing and assuming the expensive thing is what
// produced a film with no logo and no fade, which cannot be repaired without regenerating.
const SelfTest: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#A96F14' }} />
);

// Stage two of the same check. Rendering a blank frame never reads an input video, and reading one runs
// ffprobe - a different binary again, which a locked-down machine refuses with 'spawn UNKNOWN' while
// everything else succeeds. A blank-only check reported READY on exactly such a machine and the real render
// then died. selftest-input.mp4 is a 2-frame clip this project rendered itself, served from public/ so the
// path matches a real clip rather than a file:// URL, which OffthreadVideo will not take.
const SelfTestVideo: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile('selftest-input.mp4')} style={{ width: 64, height: 64 }} />
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Finish"
      component={Finish}
      durationInFrames={FPS * 9}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{ videoSrc: '', videoSrcs: [], clipDurations: [], audioSrc: null, logoSrc: null, showLogo: false, fadeOutSeconds: 0.7 }}
      // Width, height and duration all come from the clip itself at render time. Hardcoding 1080x1920 would
      // silently letterbox or crop any film generated at a different aspect ratio, and the skill offers four.
      calculateMetadata={async ({ props }) => {
        const p = props as any;
        return {
          durationInFrames: Math.max(1, Math.round((p.durationInSeconds ?? 9) * FPS)),
          width: p.width ?? 1080,
          height: p.height ?? 1920,
        };
      }}
    />

    <Composition
      id="SelfTest"
      component={SelfTest}
      durationInFrames={2}
      fps={FPS}
      width={64}
      height={64}
    />

    <Composition
      id="SelfTestVideo"
      component={SelfTestVideo}
      durationInFrames={2}
      fps={FPS}
      width={64}
      height={64}
    />
  </>
);
