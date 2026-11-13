// check.mjs — can the finishing pass actually run here?
//
//   node check.mjs        ->  prints READY, or NOT READY plus the reason. Exit 0 / 1.
//
// WHY THIS IS NOT A ONE-LINER, twice over.
//
// The obvious check is `require('@remotion/renderer')`. That only proves the JavaScript is present. Rendering
// shells out to separate compositor binaries which a locked-down machine can refuse while the import succeeds.
// That false pass cost a real film: the check said READY, so the prompt told Seedance "do NOT fade to black"
// and reserved the fade for Remotion, and the render then died. The delivered film had no logo AND no fade,
// and neither can be added afterwards without regenerating at full cost.
//
// Rendering a blank frame is not enough either. Reading an input video runs ffprobe, a different binary again,
// and on the same machine that fails with `spawn UNKNOWN` while a blank render succeeds. So this checks twice:
// once with nothing, once pulling a real clip in.
//
// Running `ffmpeg -version` is no substitute for either stage: the bundled binary fails standalone even where
// rendering works, because Remotion sets up its own environment for it.

import { bundle } from '@remotion/bundler';
import { ensureBrowser, openBrowser, renderMedia, selectComposition } from '@remotion/renderer';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { findPreinstalledBrowser } from './browser.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const tmp = mkdtempSync(path.join(tmpdir(), 'ecom-video-check-'));

let browser = null;

const fail = async (stage, err) => {
  if (browser) { try { await browser.close(true, 'check', false); } catch {} }
  try { rmSync(tmp, { recursive: true, force: true }); } catch {}
  console.log('NOT READY');
  console.log(`failed at: ${stage}`);
  console.log(String(err && err.message ? err.message : err).split('\n').slice(0, 3).join('\n'));
  console.log('');
  console.log('The finishing pass cannot run here. Ask Seedance for the ending fade in the prompt, expect');
  console.log('no logo, and say so when delivering. Do not promise free music, fade or logo changes:');
  console.log('without the pass, every one of them is a paid regeneration.');
  process.exit(1);
};

let serveUrl;
try {
  serveUrl = await bundle({ entryPoint: path.join(HERE, 'index.ts'), publicDir: path.join(HERE, 'public') });
} catch (e) { await fail('bundling the composition', e); }

// A missing browser is a download, not a verdict. Fetch it before judging anything, or every clean machine
// reports NOT READY for a reason that fixes itself in two minutes. Skip the fetch entirely when a Chrome is
// already sitting on disk (e.g. a Playwright install) — some sandboxes block remotion.media outright even
// with network access otherwise enabled, and there is nothing to prove by downloading a second browser.
const browserExecutable = findPreinstalledBrowser();
if (!browserExecutable) {
  try {
    await ensureBrowser();
  } catch (e) { await fail('downloading headless Chrome', e); }
}

try {
  browser = await openBrowser('chrome', {
    chromiumOptions: { gl: 'angle' },
    ...(browserExecutable ? { browserExecutable } : {}),
  });
} catch (e) { await fail('launching headless Chrome', e); }

// Stage 1 — render with no input at all. Exercises Chrome, the compositor and h264 encoding.
try {
  const composition = await selectComposition({ serveUrl, id: 'SelfTest', puppeteerInstance: browser });
  await renderMedia({
    composition, serveUrl, codec: 'h264', outputLocation: path.join(tmp, 'probe1.mp4'),
    puppeteerInstance: browser, concurrency: 1, timeoutInMilliseconds: 120_000,
  });
} catch (e) { await fail('rendering two frames (the compositor binaries)', e); }

// Stage 2 — render one that pulls a video in, which is what calls ffprobe.
try {
  const composition = await selectComposition({ serveUrl, id: 'SelfTestVideo', puppeteerInstance: browser });
  await renderMedia({
    composition, serveUrl, codec: 'h264', outputLocation: path.join(tmp, 'probe2.mp4'),
    puppeteerInstance: browser, concurrency: 1, timeoutInMilliseconds: 120_000,
  });
} catch (e) { await fail('reading an input video (ffprobe)', e); }

try { await browser.close(true, 'check', false); } catch {}
try { rmSync(tmp, { recursive: true, force: true }); } catch {}

console.log('READY');
console.log('Rendered a real clip from a real input, so the logo, the ending fade and a supplied audio');
console.log('track all work here.');
process.exit(0);
