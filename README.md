# odesh.app

Marketing website for the odesh mobile app, served at [odesh.app](https://odesh.app).

## Stack

- [Astro](https://astro.build) static output, no client framework
- Turkish at the root (`/`), English under `/en/`
- Legal documents as Markdown content collections, Turkish only
- Self-hosted Inter via Fontsource
- Deployed by Netlify on every push to `main` (build: `pnpm build`, publish: `dist`). Was on
  GitHub Pages until 09-22 — moved because of the `.well-known/` issues below; `ci.yml` still runs
  typecheck+build on PRs, it just doesn't deploy anything.

## Development

Requires Node 24 and pnpm 10. The exact Node version is pinned in `.nvmrc` and `.npmrc`; pnpm downloads it automatically.

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm check      # Astro and TypeScript diagnostics
pnpm build      # static output in dist/
pnpm preview    # serve dist/ locally
```

## Project layout

```
src/
  config/site.ts         site-wide constants (store links, legal version)
  i18n/                  route helpers and TR / EN dictionaries
  components/            layout pieces, home sections, phone mockups
  content/legal/         Kullanım Koşulları, Aydınlatma Metni, Veri Silme
  pages/                 index, en/, ozellikler/, en/features/, yasal/, 404
  scripts/               small client scripts (carousel, demos, reveal)
scripts/generate-images.mjs   favicon set and Open Graph image
```

## Routes

| Turkish                | English                        |
| ---------------------- | ------------------------------ |
| `/`                    | `/en/`                         |
| `/ozellikler/iban/`    | `/en/features/iban/`           |
| `/ozellikler/bolusme/` | `/en/features/splitting/`      |
| `/ozellikler/defter/`  | `/en/features/ledger/`         |
| `/ozellikler/doviz/`   | `/en/features/multi-currency/` |
| `/yasal/kosullar/`     | same page (Turkish prevails)   |
| `/yasal/aydinlatma/`   | same page                      |
| `/yasal/veri-silme/`   | same page                      |

`/join/{token}` and `/join-group/{token}` aren't real routes — they're Supabase-issued runtime
tokens, so they can't be static-generated. Netlify serves `404.html` for any unmatched path, and
`src/pages/404.astro` detects those two path shapes client-side and swaps in an "open in odesh"
view (deep link + store badges) instead of a real 404. Keep this in mind before changing 404
styling or routing.

`public/.well-known/` holds `apple-app-site-association` and `assetlinks.json` for iOS Universal
Links / Android App Links (mirrors `odesh` app repo's `app.json` `associatedDomains`/
`intentFilters`, which must point at this same host). `public/_headers` forces
`Content-Type: application/json` on both — Netlify reads it natively, no extra config.

**History (why this isn't on GitHub Pages anymore):** it was, until 09-22. Two problems compounded
there: `actions/upload-pages-artifact` excludes top-level dotfiles/dot-directories by default, so
`.well-known/` silently never reached the deployed site (404, no build error) until
`include-hidden-files: true` was added; separately, GitHub Pages has no way to override response
headers at all, so even once the files deployed, the AASA file came back as
`application/octet-stream` instead of `application/json` and Universal Links wouldn't verify. Both
are moot on Netlify, but if this ever moves again, check for both.

## Going live in the stores

Set `storesLive: true` and the real store URLs in `src/config/site.ts`. The badges become links and the labels switch from "Yakında" to "İndir".

## Regenerating images

```sh
pnpm images:generate
```

Reads `src/assets/app-icon.png` and writes the favicon set and `public/og.png`.
