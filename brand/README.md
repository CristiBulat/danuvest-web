# DANUVEST brand assets

Everything here is generated. Don't hand-edit these files — change the source and rebuild:

```bash
npm run brand
```

- `scripts/brand/mark.mjs` — the building mark's geometry and the gold gradient
- `scripts/brand/type.mjs` — sets Inter as vector outlines
- `scripts/build-brand.mjs` — assembles the lockups and exports

## What's here

| File | Use |
| --- | --- |
| `danuvest-mark.svg` | Mark alone, gold gradient, transparent ground |
| `danuvest-mark-flat.svg` | Mark alone, single flat gold — for screen print or cut vinyl |
| `lockup-square.svg` | Stacked lockup, rounded square, gold contour |
| `lockup-square-avatar.svg` | Same without the contour — **use this for profile pictures** |
| `variants/square-*.svg` | The square in six contour colours |
| `lockup-circle.svg` | Stacked lockup, circular badge, dark ground |
| `lockup-horizontal.svg` | Mark left / text right, dark ground |
| `variants/horizontal-*.svg` | The horizontal in six contour colours |
| `lockup-horizontal-light.svg` | Same, for white and light grounds |
| `print/sticker-circle-80mm.svg` | Ø80mm vinyl sticker, 3mm bleed, die line |
| `print/sticker-square-70mm.svg` | 70mm square vinyl sticker, 3mm bleed, die line |
| `print/sticker-square-70mm-*.svg` | The same, one per contour colour |
| `print/decal-horizontal-150mm-*.svg` | 150 × 57.4mm vehicle/hoarding decal, one per colour |
| `print/*-300dpi.png` | 300dpi rasters, if a shop won't take vector |
| `export/icon-512.png`, `icon-1024.png` | Square avatar (WhatsApp, Facebook, Instagram) |
| `export/badge-512.png`, `badge-1024.png` | Circular badge, transparent corners |
| `export/horizontal-2400.png` | Wide lockup for letterheads and email signatures |

## Colours

| | Hex |
| --- | --- |
| Charcoal ground | `#1c1c24` |
| Gold, gradient light → mid → dark | `#ecc97a` → `#cca059` → `#9e7333` |
| Gold, flat | `#c9a84c` |

These match the website's CSS tokens in `src/styles/tokens.css`, so sticker and site stay in step.

### Contour colours

Available on both the square and the horizontal lockup. Only the frame changes between
variants — the mark, wordmark and tagline are identical in all of them, so the set reads
as one logo in different trims.

| | Hex |
| --- | --- |
| Gold (default) | `#cca059` |
| White | `#ffffff` |
| Red | `#d0432f` |
| Orange | `#e07b39` |
| Steel | `#aab4c0` |
| Green | `#4a9e6f` |

**Don't use a framed square as a profile picture.** Most platforms crop avatars to a
circle, which cuts the frame's corners off and leaves it looking broken. Use
`lockup-square-avatar.svg` (or `export/icon-*.png`, which is built from it) there, and keep
the framed versions for stickers and print.

## For the print shop

The sticker SVGs are set in real millimetres and carry a **3mm bleed** on every side — the
artwork runs past the trim on purpose. Cut on the `CutContour` layer; it's a guide and
must not print.

All text is already converted to outlines, so no fonts need to travel with the files.

Two things worth saying to whoever prints these:

- **Ask for a printed proof before a full run.** The gold on screen is RGB. It will not
  match ink exactly, and gold is one of the worst offenders for this. Pantone 465 C is in
  the right neighbourhood, but treat that as a starting point for the conversation, not a
  spec — let the shop match against a proof.
- **The gradient needs digital print.** If they're doing cut vinyl or screen printing
  instead, give them `danuvest-mark-flat.svg`, which is one solid gold.

## Note on the source

The original logo only existed as a 256×256 JPEG (`src/assets/logo.jpg`) with its dark
background baked in — too small to print and impossible to place on a light ground. The
mark here is a vector rebuild traced from that file, matching it to within edge
antialiasing. If the original vector artwork ever turns up, it should replace the geometry
in `scripts/brand/mark.mjs`.
