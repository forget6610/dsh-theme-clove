// Host half of the Clove theme plugin.
//
// Serves the wallpaper and the mascot image. The real artwork is not part of
// this repo (it belongs to its original author), so if the local copy is
// missing we fall back to the neutral placeholders in assets/default/.

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

const ASSETS = {
  wallpaper: {
    path: '/dsh-clove-bg/wallpaper.jpg',
    type: 'image/jpeg',
    files: ['wallpaper.jpg', 'default/wallpaper.jpg'],
  },
  mascot: {
    path: '/dsh-clove-bg/mascot.png',
    type: 'image/png',
    files: ['mascot.png', 'default/mascot.png'],
  },
};

async function serve(asset, res) {
  for (const name of asset.files) {
    try {
      const body = await readFile(join(here, 'assets', name));
      res.writeHead(200, {
        'Content-Type': asset.type,
        'Content-Length': body.length,
        'Cache-Control': 'public, max-age=3600',
      });
      res.end(body);
      return;
    } catch {
      // try the next candidate
    }
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('not found');
}

export default {
  inject: ['webServer'],
  apply(ctx) {
    for (const asset of Object.values(ASSETS)) {
      try {
        const dispose = ctx.webServer.register({
          kind: 'exact',
          path: asset.path,
          handler: (_req, res) => serve(asset, res),
        });
        ctx.effect(() => dispose);
      } catch (err) {
        // another copy of the theme may already serve this path
        console.warn(`[clove-theme] ${asset.path} already served, skipping`);
      }
    }
    console.log('[clove-theme] host half active');
  },
};
