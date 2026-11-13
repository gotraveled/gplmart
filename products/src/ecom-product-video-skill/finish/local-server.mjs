// local-server.mjs — serve one local file over http(s) so Remotion can load it.
//
// Remotion's asset downloader (used both by parseMedia's duration/dimension probe and by OffthreadVideo
// inside the rendered composition) only accepts http:// and https:// sources — it rejects file:// outright
// ("Can only download URLs starting with http:// or https://"). A --in/--audio flag pointing at a path on
// disk therefore cannot be handed to Remotion directly; it has to be served. Range support matters too:
// parseMedia refuses a source that does not answer Content-Range.

import http from 'http';
import { createReadStream, statSync } from 'fs';
import path from 'path';

const CONTENT_TYPES = {
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.m4a': 'audio/mp4',
  '.aac': 'audio/aac',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

// Starts a server bound to localhost only — this file is never meant to be reachable from outside the
// machine running the render.
export function serveLocalFile(filePath) {
  const size = statSync(filePath).size;
  const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';

  const server = http.createServer((req, res) => {
    const head = { 'Content-Type': contentType, 'Accept-Ranges': 'bytes' };
    if (req.method === 'HEAD') {
      res.writeHead(200, { ...head, 'Content-Length': size });
      return res.end();
    }
    const range = req.headers.range;
    if (range) {
      const match = /bytes=(\d*)-(\d*)/.exec(range);
      const start = match[1] ? Number(match[1]) : 0;
      const end = match[2] ? Number(match[2]) : size - 1;
      res.writeHead(206, { ...head, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
      createReadStream(filePath, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { ...head, 'Content-Length': size });
    createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      const name = encodeURIComponent(path.basename(filePath));
      resolve({
        url: `http://127.0.0.1:${port}/${name}`,
        close: () => new Promise((r) => server.close(r)),
      });
    });
  });
}
