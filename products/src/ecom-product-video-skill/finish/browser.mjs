// browser.mjs — locate a usable headless Chrome without touching the network.
//
// Remotion's own ensureBrowser() downloads its browser from remotion.media on first use. Some sandboxes
// block that host outright even with network access otherwise enabled (see the README's egress note), which
// turns every run into a 403. Those same sandboxes often ship a Playwright Chromium already unpacked for
// their own tooling, at PLAYWRIGHT_BROWSERS_PATH — reuse that instead of trying, and failing, to fetch
// Remotion's own copy.

import { existsSync, readdirSync } from 'fs';
import path from 'path';

export function findPreinstalledBrowser() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH;
  if (!base || !existsSync(base)) return null;

  let entries;
  try {
    entries = readdirSync(base);
  } catch {
    return null;
  }

  // Headless shell first: it's the smaller build Remotion's own ensureBrowser() fetches, and it starts
  // faster than a full browser. Fall back to a full Chromium if that's all that's there.
  const candidates = [
    entries.find((e) => e.startsWith('chromium_headless_shell-')),
    entries.find((e) => e.startsWith('chromium-') && !e.startsWith('chromium_headless_shell-')),
  ].filter(Boolean);

  for (const dir of candidates) {
    const binary = dir.startsWith('chromium_headless_shell') ? 'headless_shell' : 'chrome';
    const exe = path.join(base, dir, 'chrome-linux', binary);
    if (existsSync(exe)) return exe;
  }
  return null;
}
