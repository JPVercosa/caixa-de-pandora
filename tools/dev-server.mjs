import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = normalize(join(fileURLToPath(new URL('../site/', import.meta.url))));
const port = Number(process.env.PANDORA_PORT || 4173);
const localConfig = JSON.stringify({
  preview: process.env.PANDORA_PREVIEW === '1' || process.env.PANDORA_PREVIEW === 'true',
  previewDate: process.env.PANDORA_PREVIEW_DATE || undefined,
  skipPassword: process.env.PANDORA_SKIP_PASSWORD === '1' || process.env.PANDORA_SKIP_PASSWORD === 'true',
  reset: process.env.PANDORA_RESET === '1' || process.env.PANDORA_RESET === 'true'
});
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };

const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const file = normalize(join(root, requested));
  if (!file.startsWith(root)) { response.writeHead(403); response.end('Forbidden'); return; }
  try {
    await stat(file);
    let body = await readFile(file);
    if (file.endsWith('index.html')) {
      const injection = `<script>globalThis.__PANDORA_LOCAL__=${localConfig};</script>`;
      body = Buffer.from(body.toString().replace('</head>', `${injection}</head>`));
    }
    response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(body);
  } catch {
    response.writeHead(404); response.end('Not found');
  }
});

server.listen(port, () => console.log(`Caixa de Pandora: http://localhost:${port}`));
