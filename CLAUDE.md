# danuvest-web

Static landing page for Danuvest SRL, a construction company in Moldova.
Astro 4, SSG, **zero framework JavaScript**. Content is edited through Decap CMS
at `/admin`. The site is bilingual — Romanian at `/`, Russian at `/ru/` — and
code and comments are English.

The README (Romanian) is the reference for *why* things are the way they are.
This file is the short list of what breaks.

## Commands

```bash
npm run dev        # dev server on :4321  (also .claude/launch.json → "danuvest-dev")
npm run build      # → dist/
npm run preview    # serve dist/ locally
npm run check      # astro check (types)
npm run cms        # local CMS proxy (launch.json → "danuvest-cms"); run alongside
                   # dev, then open /admin/index.html (dev does not serve /admin/)
```

Two generators, run by hand, not part of the build:

```bash
node scripts/build-brand.mjs                          # regenerates brand/
python3 scripts/crop-project-photos.py ~/Downloads/Poze  # regenerates the 24 project photos (needs ImageMagick 7)
```

## Four things that stop the build

All four are deliberate `throw`s — they fail loudly instead of shipping a hole
in the page. If you hit one, fix the input, don't remove the guard.

1. **`Projects: missing image ...`** — [Projects.astro](src/components/Projects.astro)
   resolves photos by slug from `src/assets/projects/<slug>-1.jpg … -4.jpg`.
   Rename a slug in `projects.json` (or from the CMS) and the build dies.
   The number of files must equal the number of entries in that project's
   `photos` array, and `-1` doubles as the card cover.
2. **`Fleet: missing image ...`** — same coupling in [Fleet.astro](src/components/Fleet.astro),
   one photo per machine: `src/assets/fleet/<slug>.jpg`.
3. **`Icon.astro: unknown icon name "..."`** — [Icon.astro](src/components/Icon.astro)
   holds the whole inline SVG set and rejects anything not in it. Valid names
   are listed in the error and in [docs/icon-map.md](docs/icon-map.md).
4. **`Tracking: "..." is not a GA4 measurement ID`** (or Meta Pixel ID) —
   [Tracking.astro](src/components/Tracking.astro) validates
   `src/data/tracking.json`. GA4 is `G-` + capitals/digits; the pixel is digits.

The slug guards bite in **both languages**: `src/data/ru/projects.json` and
`src/data/ru/fleet.json` must carry the same slugs as the Romanian files.

**Adding or replacing a photo is a developer task, not a CMS edit.** The CMS
cannot touch images at all.

## Images

**Never put images in `public/`.** Files there are copied verbatim and
unoptimized — that is how the site once shipped a 6.3 MB JPEG. Images go in
`src/assets/` and render through `<Image />` from `astro:assets`, which emits
resized WebP/AVIF.

CI enforces this: [ci.yml](.github/workflows/ci.yml) fails if **any single file
exceeds 450 KB** or `dist/` as a whole exceeds **7 MB**. A correctly resized
site photo lands at 100–200 KB; anything past 450 KB has bypassed
`astro:assets`. `dist/` currently sits around **6.9 MB** — it holds every
`srcset` variant, which is far more than a visitor downloads. That is ~200 KB
under the cap: the next batch of photos will trip it, so decide then whether to
raise the total or trim derivatives.

All 24 project photos are cropped to **16:9** to match the card frame; a
different ratio gets re-cropped by the browser and loses the framing. The crops
are one line per photo in `scripts/crop-project-photos.py`, which also warns
when a crop reaches the ~91% height band where phone date stamps are burned in.

## Content

`src/data/*.json` — one file per section, all CMS-editable: `site`, `hero`,
`services`, `projects`, `fleet`, `about`, `contact`, `footer`. Changing a
field's shape means updating the Decap config in `public/admin/` too, or
editors get a form that no longer matches the data. Icon fields are dropdowns
by design, not free text — the `Icon.astro` guard above is why.

**Russian** lives in `src/data/ru/*.json`, same files, same shape.
[i18n.ts](src/i18n.ts) types the Russian set against the Romanian one, so a
field added on one side only fails `npm run check`. In the CMS the Russian
forms reuse the Romanian field lists through YAML anchors (`&site_fields` →
`*site_fields`) — change a field once and both forms follow. Screen-reader
labels and script text that are not content live in `i18n.ts` (`ui`), not
the CMS. Components take a `lang` prop and read through `getContent(lang)`;
never import `src/data/*.json` directly into a component again.

Section order lives in [Home.astro](src/layouts/Home.astro), shared by
`src/pages/index.astro` (ro) and `src/pages/ru/index.astro` (ru), and is
currently: Hero → About → Services → Projects → Fleet → Contact. The README's
section table is out of order and predates the Fleet section.

**Tracking** is configured by `src/data/tracking.json` (also in the CMS). Both
IDs empty = no banner, no third-party script, nothing rendered. With an ID,
Google/Meta load only after the visitor accepts the consent banner; clicks on
`tel:` / WhatsApp / `viber:` / `mailto:` links send `click_phone`,
`click_whatsapp`, `click_viber`, `click_email` to GA4 and `Contact` to Meta.

The navbar collapses to the hamburger below **1024px**, not 768 — six links,
the CTA and the language switch do not fit side by side below that
(`responsive.css`).

Styles are one file per section under `src/styles/`, entry point `main.css`,
tokens in `tokens.css`.

## Deploy

Two targets. A DNS apex can point at one host, so **Netlify owns `danuvest.md`**
and GitHub Pages is a build-verified mirror.

- Both deploy on every push to `main`, via workflows in `.github/workflows/`.
- **`netlify.toml` is not read on the live path.** Only `dist/` is uploaded, and
  the file sits at the repo root. What actually applies is `public/_headers`
  and `public/_redirects`, which Astro copies verbatim into `dist/`. Edit those.
  Keep `netlify.toml` in sync anyway — it becomes authoritative the moment
  anyone connects git deploys.
- **Do not connect the repo to Netlify's git integration.** It is deliberately
  unconnected; connecting it would reactivate `netlify.toml` on top of
  `public/_headers` and give two header sources that drift apart silently.
- The Pages build runs with `DEPLOY_TARGET=gh-pages`, which flips `site` and
  `base` in `astro.config.mjs` and strips `CNAME`.

There is intentionally **no Content-Security-Policy**. The long comment in
`netlify.toml` explains why — note that part of it is now stale: it cites a
hero background hotlinked from `images.unsplash.com` and a `src/index.css`,
both of which are gone (the hero image is a local asset; see the note in
`src/styles/hero.css`). The `/admin` and inline-JSON-LD arguments still stand.

## Pins and constraints

- **Astro 4.** Moving to Astro 7 is a separate migration. Astro 4 has reported
  vulnerabilities; most concern SSR/middleware, which this static site does not
  use — the relevant one is dev-server file reads.
- **`@astrojs/sitemap` pinned at 3.2.1.** 3.7+ uses an Astro 5 hook and breaks
  the build on Astro 4.
- **No framework JS.** The vanilla scripts are: the navbar (scroll background
  + mobile menu), the Projects gallery, the Fleet showcase, and the consent /
  tracking script. Don't reach for React or Preact to solve something here.
