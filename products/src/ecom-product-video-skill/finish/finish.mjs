// finish.mjs — the finishing pass. Called by the ecom-product-video skill after the generator (Higgsfield or
// fal.ai) returns a clip.
//
//   node finish.mjs --in <clip> [--in <clip> ...] --out <path> [--logo <path>] [--audio <path>] [--no-logo] [--fade 0.7]
//
// Several --in flags join the clips back to back, in order, on hard cuts. This is the assembly Remotion
// handles here: generate short clips, approve each on its own, regenerate only the wrong one, then join. A
// wrong short clip is a small fraction of the cost to redo compared to a wrong whole-film regeneration.
//
// `--in` accepts an https URL directly, which is what the generator returns, so there is no need to download
// the clip first. A local path also works: it is served from a small local http server for the duration of
// the render, because Remotion's asset downloader (used both to probe duration/dimensions and inside the
// rendered composition) only accepts http(s) sources and rejects file:// outright.
//
// `--logo` points at the brand's own logo file for this run. This pass carries no logo of its own — it
// serves any brand, so the file is supplied fresh each time, the same way the product images and claims are.
//
// Duration and dimensions are MEASURED from the clip rather than assumed. Hardcoding them silently letterboxed
// or cropped anything that was not 9:16, and the skill offers several aspect ratios.

import { bundle } from '@remotion/bundler';
import { openBrowser, renderMedia, selectComposition } from '@remotion/renderer';
import { parseMedia } from '@remotion/media-parser';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findPreinstalledBrowser } from './browser.mjs';
import { serveLocalFile } from './local-server.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
}
const flag = (name) => process.argv.includes(`--${name}`);
function args(name) {
  const out = [];
  for (let i = 0; i < process.argv.length - 1; i++) {
    if (process.argv[i] === `--${name}`) out.push(process.argv[i + 1]);
  }
  return out;
}

const inputs = args('in');
const output = arg('out');
if (inputs.length === 0 || !output) {
  console.error('usage: node finish.mjs --in <clip> [--in <clip> ...] --out <path> [--logo <path>] [--audio <path>] [--no-logo] [--fade 0.7]');
  process.exit(1);
}

for (const input of inputs) {
  if (!/^https?:\/\//.test(input) && !existsSync(input)) {
    console.error(`clip not found: ${input}`);
    process.exit(1);
  }
}

const audioArg = arg('audio');
if (audioArg && !/^https?:\/\//.test(audioArg) && !existsSync(audioArg)) {
  console.error(`audio file not found: ${audioArg}`);
  process.exit(1);
}

// No logo ships with this pass — it serves any brand, so the file is supplied per run. `--no-logo` always
// wins; otherwise a logo shows only if a real file/URL was actually given.
const logoArg = arg('logo');
if (logoArg && !/^https?:\/\//.test(logoArg) && !existsSync(logoArg)) {
  console.error(`logo file not found: ${logoArg}`);
  process.exit(1);
}
if (!flag('no-logo') && !logoArg) {
  console.log('no --logo given, so this render has no logo. Pass --logo <path> for a branded output, or --no-logo to silence this line.');
}

// Servers stay open for the whole render (parseMedia's probe and the browser both need to reach them) and
// are torn down together at the end, however the process exits.
const closeLocalServers = [];
async function toSrc(p) {
  if (/^https?:\/\//.test(p)) return p;
  const { url, close } = await serveLocalFile(path.resolve(p));
  closeLocalServers.push(close);
  return url;
}

const videoSrcs = [];
for (const input of inputs) videoSrcs.push(await toSrc(input));
const audioSrc = audioArg ? await toSrc(audioArg) : null;
const logoSrc = logoArg ? await toSrc(logoArg) : null;

// Measure every clip rather than assume. parseMedia reads the real duration and frame size straight from
// the container. The join needs each clip's own length so the cuts land where the clips actually end.
const clipDurations = [];
let width, height;
for (let i = 0; i < videoSrcs.length; i++) {
  try {
    const meta = await parseMedia({ src: videoSrcs[i], fields: { durationInSeconds: true, dimensions: true } });
    if (!meta.durationInSeconds || !meta.dimensions?.width || !meta.dimensions?.height) {
      throw new Error('no duration or dimensions reported');
    }
    clipDurations.push(meta.durationInSeconds);
    if (i === 0) {
      width = meta.dimensions.width;
      height = meta.dimensions.height;
    } else if (meta.dimensions.width !== width || meta.dimensions.height !== height) {
      // Two clips of different sizes cannot be cut together without one being scaled or cropped, and
      // doing that silently is how a film ends up with one soft clip in the middle. Refuse and say which.
      console.error(`clip ${i + 1} is ${meta.dimensions.width}x${meta.dimensions.height} but clip 1 is ${width}x${height}. ` +
        'Every clip in a join must be the same size; regenerate the odd one at the right resolution.');
      await Promise.all(closeLocalServers.map((close) => close()));
      process.exit(1);
    }
  } catch (e) {
    console.error(`could not read clip ${i + 1} (${e.message}). Check the URL or path is reachable.`);
    await Promise.all(closeLocalServers.map((close) => close()));
    process.exit(1);
  }
}
const durationInSeconds = clipDurations.reduce((a, b) => a + b, 0);
const videoSrc = videoSrcs[0];

const fadeOutSeconds = Number(arg('fade', '0.7'));
// A fade longer than the clip would start before frame zero and render the whole film fading.
const fade = Math.min(fadeOutSeconds, Math.max(0.1, durationInSeconds / 3));
if (fade !== fadeOutSeconds) {
  console.log(`fade shortened to ${fade.toFixed(2)}s so it stays inside a ${durationInSeconds.toFixed(1)}s clip`);
}

const inputProps = {
  videoSrc,
  videoSrcs,
  clipDurations,
  audioSrc,
  logoSrc,
  showLogo: !flag('no-logo') && !!logoSrc,
  fadeOutSeconds: fade,
  durationInSeconds,
  width,
  height,
};

console.log(`finishing ${width}x${height}, ${durationInSeconds.toFixed(1)}s` +
  `${videoSrcs.length > 1 ? `, ${videoSrcs.length} clips joined (${clipDurations.map((d) => d.toFixed(1)).join(' + ')})` : ''}` +
  `${inputProps.showLogo ? ', logo' : ', no logo'}` +
  `${inputProps.audioSrc ? ', audio track' : ''}` +
  `, ${fade.toFixed(2)}s fade`);

const serveUrl = await bundle({
  entryPoint: path.join(HERE, 'index.ts'),
  publicDir: path.join(HERE, 'public'),
});

// One browser, closed explicitly. Left to itself renderMedia spawns a Chrome per call and never reaps it; a
// batch once left 47 orphaned processes and the second render died out of memory.
const browserExecutable = findPreinstalledBrowser();
const puppeteerInstance = await openBrowser('chrome', {
  chromiumOptions: { gl: 'angle' },
  ...(browserExecutable ? { browserExecutable } : {}),
});
try {
  const composition = await selectComposition({ serveUrl, id: 'Finish', inputProps, puppeteerInstance });
  await renderMedia({
    composition, serveUrl, codec: 'h264', outputLocation: output,
    inputProps, puppeteerInstance, concurrency: 1, timeoutInMilliseconds: 180_000,
  });
} finally {
  await puppeteerInstance.close(true, 'finished', false);
  await Promise.all(closeLocalServers.map((close) => close()));
}

console.log(`done -> ${output}`);
process.exit(0);
