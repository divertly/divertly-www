# www

Public divert.ly site, served from `dist/` on Cloudflare Pages.

Pages are built from `src/` (layout, partials, `pages/*.html`) into `dist/*.html`. Edit `src/`, then run `npm run build` (or `node src/build.mjs`) and commit the result. The build lists any `[confirm ...]` / `[placeholder ...]` text still on the site.

Static assets (`dist/css`, `dist/js`, `dist/img`, `dist/fonts`) are edited in place. `dist/legal.html`, `privacy-policy.html` and `terms-of-service.html` are hand-maintained.
