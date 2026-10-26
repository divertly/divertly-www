// Local preview of dist/ with Cloudflare-Pages-style clean URLs (/pricing -> pricing.html).
// Run: npm run serve   (PORT=3000 npm run serve to change the port)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT) || 8080;
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".JPG": "image/jpeg",
  ".gif": "image/gif", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain",
};

const resolve = (urlPath) => {
  const f = path.join(root, path.normalize(urlPath === "/" ? "/index.html" : urlPath));
  if (!f.startsWith(root)) return null;
  for (const c of [f, f + ".html"]) if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  return null;
};

http.createServer((req, res) => {
  const file = resolve(decodeURIComponent(req.url.split("?")[0]));
  const notFound = !file;
  const target = file || path.join(root, "404.html");
  res.writeHead(notFound ? 404 : 200, { "content-type": types[path.extname(target)] || "application/octet-stream" });
  fs.createReadStream(target).pipe(res);
}).listen(port, () => console.log(`Serving dist/ at http://localhost:${port}`));
