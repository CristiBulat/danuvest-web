/**
 * Generates every DANUVEST brand asset from the vector masters.
 *
 *   node scripts/build-brand.mjs
 *
 * Outputs land in brand/ — SVG lockups, print-ready sticker files with bleed and a
 * die-cut contour, and PNG exports. Everything derives from scripts/brand/mark.mjs,
 * so editing the mark there and re-running updates all of it.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

import {
  MARK_PATH, MARK_W, MARK_H, goldGradient,
  GOLD_LIGHT, GOLD_MID, GOLD_DARK, GOLD_FLAT, CHARCOAL,
} from './brand/mark.mjs';
import { outlineText, CAP_HEIGHT } from './brand/type.mjs';

const OUT = 'brand';
const WORDMARK = 'DANUVEST';
const TAGLINE = 'COMPANIE DE CONSTRUCȚII';

/** Ink colours for the two grounds the lockups have to work on. */
const onDark = { ground: CHARCOAL, word: '#ffffff', rule: GOLD_MID };
const onLight = { ground: null, word: CHARCOAL, rule: GOLD_DARK };

/**
 * Contour colours for the square sticker. Only the frame changes between these — mark,
 * wordmark and tagline stay put, so the set reads as one logo in different trims rather
 * than several different logos. All chosen to hold contrast against the charcoal ground.
 */
const FRAME_COLOURS = {
  gold: GOLD_MID,
  white: '#ffffff',
  red: '#d0432f',
  orange: '#e07b39',
  steel: '#aab4c0',
  green: '#4a9e6f',
};

const round = (n) => +n.toFixed(2);

/**
 * Places the mark so it is `height` tall with its top-left at (x, y). The gold gradient
 * is declared in the mark's own coordinate space, so it rides along with this transform
 * and stays locked to the artwork at any size.
 */
function placeMark(x, y, height, fill) {
  const s = height / MARK_H;
  return `<g transform="translate(${round(x)} ${round(y)}) scale(${round(s * 1000) / 1000})"><path fill="${fill}" d="${MARK_PATH}"/></g>`;
}

const markWidthFor = (height) => (height / MARK_H) * MARK_W;

/** Text block scaled to an exact target width; returns the SVG plus its cap height. */
function placeText({ d, width }, targetWidth, x, baselineY, fill, size) {
  const s = targetWidth / width;
  return {
    svg: `<g transform="translate(${round(x)} ${round(baselineY)}) scale(${round(s * 10000) / 10000})"><path fill="${fill}" d="${d}"/></g>`,
    capHeight: size * CAP_HEIGHT * s,
  };
}

async function typeset() {
  const SIZE = 100;
  return {
    word: await outlineText(WORDMARK, { weight: 700, size: SIZE, tracking: 0.12 }),
    tag: await outlineText(TAGLINE, { weight: 500, size: SIZE, tracking: 0.22 }),
    SIZE,
  };
}

/* ------------------------------------------------------------------ lockups -- */

/**
 * Stacked lockup used by both the square and the circular badge: mark, wordmark,
 * hairline rule, tagline. Returns the group plus the stack's overall height so the
 * caller can centre it.
 */
function stack(type, { markH, wordW, tagW, ink }) {
  const { word, tag, SIZE } = type;
  const GAP_MARK = markH * 0.20;
  const GAP_RULE = markH * 0.115;
  const GAP_TAG = markH * 0.105;

  const wordCap = (wordW / word.width) * SIZE * CAP_HEIGHT;
  const tagCap = (tagW / tag.width) * SIZE * CAP_HEIGHT;
  const ruleW = wordW * 0.42;

  let y = 0;
  const parts = [placeMark(-markWidthFor(markH) / 2, y, markH, 'url(#gold)')];

  y += markH + GAP_MARK + wordCap;
  parts.push(placeText(word, wordW, -wordW / 2, y, ink.word, SIZE).svg);

  y += GAP_RULE;
  parts.push(`<rect x="${round(-ruleW / 2)}" y="${round(y)}" width="${round(ruleW)}" height="2.5" fill="${ink.rule}"/>`);

  y += 2.5 + GAP_TAG + tagCap;
  parts.push(placeText(tag, tagW, -tagW / 2, y, ink.rule, SIZE).svg);

  return { svg: parts.join('\n    '), height: y };
}

/**
 * Inset contour, concentric with the rounded corner — the radius has to shrink by the
 * same amount as the inset or the frame's corners drift away from the card's.
 */
function squareFrame(size, radius, colour) {
  const inset = size * 0.032;
  return `<rect x="${round(inset)}" y="${round(inset)}" width="${round(size - inset * 2)}" height="${round(size - inset * 2)}" rx="${round(size * radius - inset)}" fill="none" stroke="${colour}" stroke-width="${round(size * 0.009)}"/>`;
}

function squareLockup(type, { size = 1000, ink = onDark, radius = 0.15, frame = null } = {}) {
  const { svg, height } = stack(type, { markH: size * 0.24, wordW: size * 0.78, tagW: size * 0.715, ink });
  const top = (size - height) / 2;
  const bg = ink.ground
    ? `<rect width="${size}" height="${size}" rx="${size * radius}" fill="${ink.ground}"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>${goldGradient('gold', MARK_W, MARK_H)}</defs>
  ${bg}
  ${frame ? squareFrame(size, radius, frame) : ''}
  <g transform="translate(${size / 2} ${round(top)})">
    ${svg}
  </g>
</svg>
`;
}

function circleLockup(type, { size = 1000, ink = onDark } = {}) {
  const r = size / 2;
  const { svg, height } = stack(type, { markH: size * 0.225, wordW: size * 0.695, tagW: size * 0.64, ink });
  const top = (size - height) / 2;
  // Three dots close the bottom arc, where the design brief left the curved text out.
  const dots = [-1, 0, 1]
    .map((i) => `<circle cx="${round(r + i * size * 0.036)}" cy="${round(size * 0.822)}" r="${round(size * 0.009)}" fill="${ink.rule}"/>`)
    .join('');
  const ground = ink.ground ? `<circle cx="${r}" cy="${r}" r="${r}" fill="${ink.ground}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>${goldGradient('gold', MARK_W, MARK_H)}</defs>
  ${ground}
  <circle cx="${r}" cy="${r}" r="${round(r - size * 0.032)}" fill="none" stroke="${ink.rule}" stroke-width="${round(size * 0.009)}"/>
  <g transform="translate(${r} ${round(top)})">
    ${svg}
  </g>
  ${dots}
</svg>
`;
}

function horizontalLockup(type, { height = 420, ink = onDark, frame = null } = {}) {
  const { word, tag, SIZE } = type;
  const pad = height * 0.19;
  const markH = height - pad * 2;
  const markW = markWidthFor(markH);
  const gap = height * 0.15;

  const wordW = markH * 2.5;
  const tagW = wordW * 0.985;
  const wordCap = (wordW / word.width) * SIZE * CAP_HEIGHT;
  const tagCap = (tagW / tag.width) * SIZE * CAP_HEIGHT;

  const textX = pad + markW + gap;
  const width = textX + Math.max(wordW, tagW) + pad;

  // Optically centre the text block against the mark rather than the canvas.
  const blockH = wordCap + height * 0.075 + tagCap;
  const blockTop = pad + (markH - blockH) / 2;

  // Rounded, because a sharp corner on vinyl is the first thing to lift and peel.
  const rx = height * 0.06;
  const inset = height * 0.055;
  const bg = ink.ground ? `<rect width="${round(width)}" height="${height}" rx="${round(rx)}" fill="${ink.ground}"/>` : '';
  const contour = frame
    ? `<rect x="${round(inset)}" y="${round(inset)}" width="${round(width - inset * 2)}" height="${round(height - inset * 2)}" rx="${round(rx - inset > 0 ? rx - inset : 0)}" fill="none" stroke="${frame}" stroke-width="${round(height * 0.019)}"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(width)} ${height}" width="${round(width)}" height="${height}">
  <defs>${goldGradient('gold', MARK_W, MARK_H)}</defs>
  ${bg}
  ${contour}
  ${placeMark(pad, pad, markH, 'url(#gold)')}
  ${placeText(word, wordW, textX, blockTop + wordCap, ink.word, SIZE).svg}
  ${placeText(tag, tagW, textX, blockTop + blockH, ink.rule, SIZE).svg}
</svg>
`;
}

/* -------------------------------------------------------------------- print -- */

/**
 * Wraps a lockup for a print shop: real millimetre dimensions, 3mm of bleed on every
 * side, and a magenta CutContour path on its own layer marking the die line. Text is
 * already outlined, so no fonts need to travel with the file.
 */
function printSticker(inner, { widthMm, heightMm = widthMm, srcW = 1000, srcH = srcW, bleedMm = 3, shape, cornerRatio = 0.15 }) {
  const w = widthMm + bleedMm * 2;
  const h = heightMm + bleedMm * 2;
  const rMm = Math.min(widthMm, heightMm) * cornerRatio;
  const circle = shape === 'circle';

  const bleedShape = circle
    ? `<circle cx="${w / 2}" cy="${h / 2}" r="${w / 2}" fill="${CHARCOAL}"/>`
    : `<rect width="${round(w)}" height="${round(h)}" rx="${round(rMm)}" fill="${CHARCOAL}"/>`;
  const cut = circle
    ? `<circle cx="${w / 2}" cy="${h / 2}" r="${widthMm / 2}"/>`
    : `<rect x="${bleedMm}" y="${bleedMm}" width="${round(widthMm)}" height="${round(heightMm)}" rx="${round(rMm)}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg"
  width="${round(w)}mm" height="${round(h)}mm" viewBox="0 0 ${round(w)} ${round(h)}">
  <!-- Artwork extends into a ${bleedMm}mm bleed on all sides. Trim/cut on the
       CutContour layer below; it is a guide only and must not print. -->
  <g id="bleed">${bleedShape}</g>
  <g id="artwork" transform="translate(${bleedMm} ${bleedMm}) scale(${round(widthMm / srcW)} ${round(heightMm / srcH)})">
    ${inner}
  </g>
  <g id="CutContour" fill="none" stroke="#ec008c" stroke-width="0.25">
    ${cut}
  </g>
</svg>
`;
}

/** Strips the outer <svg> wrapper so a lockup can be nested inside the print file. */
const unwrap = (svg) => svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');

/* -------------------------------------------------------------------- build -- */

const png = (svg, size, file) =>
  sharp(Buffer.from(svg)).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png().toFile(`${OUT}/${file}`);

async function main() {
  await mkdir(`${OUT}/print`, { recursive: true });
  await mkdir(`${OUT}/export`, { recursive: true });
  await mkdir(`${OUT}/variants`, { recursive: true });
  await mkdir(`${OUT}/export/variants`, { recursive: true });

  const type = await typeset();

  // Framed for stickers; unframed for avatars, where a circular crop would slice the
  // frame's corners off and leave it looking broken.
  const square = squareLockup(type, { frame: FRAME_COLOURS.gold });
  const squareAvatar = squareLockup(type);
  const circle = circleLockup(type);
  const horizontal = horizontalLockup(type);
  const horizontalLight = horizontalLockup(type, { ink: onLight });
  // The horizontal's width falls out of the typography, so read it back off the viewBox.
  const hSrcW = Number(horizontal.match(/viewBox="0 0 ([\d.]+)/)[1]);

  const files = {
    'danuvest-mark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_W} ${MARK_H}" width="${MARK_W}" height="${MARK_H}">\n  <defs>${goldGradient('gold', MARK_W, MARK_H)}</defs>\n  <path fill="url(#gold)" d="${MARK_PATH}"/>\n</svg>\n`,
    'danuvest-mark-flat.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_W} ${MARK_H}" width="${MARK_W}" height="${MARK_H}">\n  <path fill="${GOLD_FLAT}" d="${MARK_PATH}"/>\n</svg>\n`,
    'lockup-square.svg': square,
    'lockup-square-avatar.svg': squareAvatar,
    'lockup-circle.svg': circle,
    'lockup-horizontal.svg': horizontal,
    'lockup-horizontal-light.svg': horizontalLight,
    'print/sticker-circle-80mm.svg': printSticker(unwrap(circleLockup(type, { ink: { ...onDark, ground: null } })), { widthMm: 80, shape: 'circle' }),
    'print/sticker-square-70mm.svg': printSticker(unwrap(squareLockup(type, { ink: { ...onDark, ground: null }, frame: FRAME_COLOURS.gold })), { widthMm: 70, shape: 'square' }),
  };

  // The decal keeps the lockup's own aspect so the artwork is never stretched.
  const decalW = 150;
  const decalH = round((decalW / hSrcW) * 420);

  for (const [name, colour] of Object.entries(FRAME_COLOURS)) {
    files[`variants/square-${name}.svg`] = squareLockup(type, { frame: colour });
    files[`variants/horizontal-${name}.svg`] = horizontalLockup(type, { frame: colour });
    files[`print/sticker-square-70mm-${name}.svg`] = printSticker(
      unwrap(squareLockup(type, { ink: { ...onDark, ground: null }, frame: colour })),
      { widthMm: 70, shape: 'square' },
    );
    files[`print/decal-horizontal-150mm-${name}.svg`] = printSticker(
      unwrap(horizontalLockup(type, { ink: { ...onDark, ground: null }, frame: colour })),
      { widthMm: decalW, heightMm: decalH, srcW: hSrcW, srcH: 420, shape: 'rect', cornerRatio: 0.06 },
    );
  }

  for (const [name, svg] of Object.entries(files)) await writeFile(`${OUT}/${name}`, svg);

  await Promise.all([
    png(squareAvatar, 512, 'export/icon-512.png'),
    png(squareAvatar, 1024, 'export/icon-1024.png'),
    png(circle, 512, 'export/badge-512.png'),
    png(circle, 1024, 'export/badge-1024.png'),
    ...Object.keys(FRAME_COLOURS).map((name) =>
      png(files[`variants/square-${name}.svg`], 1024, `export/variants/square-${name}-1024.png`)),
    ...Object.keys(FRAME_COLOURS).map((name) =>
      sharp(Buffer.from(files[`variants/horizontal-${name}.svg`]))
        .resize(2400, Math.round((2400 / hSrcW) * 420)).png()
        .toFile(`${OUT}/export/variants/horizontal-${name}-2400.png`)),
  ]);

  // 300dpi rasters, the safe universal fallback if a shop cannot take vector.
  const dpi = 300;
  const mmToPx = (mm) => Math.round((mm / 25.4) * dpi);
  await sharp(Buffer.from(files['print/sticker-circle-80mm.svg']), { density: dpi })
    .resize(mmToPx(86), mmToPx(86)).png().toFile(`${OUT}/print/sticker-circle-80mm-300dpi.png`);
  await sharp(Buffer.from(files['print/sticker-square-70mm.svg']), { density: dpi })
    .resize(mmToPx(76), mmToPx(76)).png().toFile(`${OUT}/print/sticker-square-70mm-300dpi.png`);

  await sharp(Buffer.from(files['print/decal-horizontal-150mm-gold.svg']), { density: dpi })
    .resize(mmToPx(decalW + 6), mmToPx(decalH + 6)).png()
    .toFile(`${OUT}/print/decal-horizontal-150mm-300dpi.png`);

  await sharp(Buffer.from(horizontal)).resize(2400, Math.round((2400 / hSrcW) * 420)).png()
    .toFile(`${OUT}/export/horizontal-2400.png`);

  const pngCount = 4 + Object.keys(FRAME_COLOURS).length * 2 + 4;
  console.log(`Wrote ${Object.keys(files).length} SVGs + ${pngCount} PNGs to ${OUT}/`);
}

main().catch((err) => { console.error(err); process.exit(1); });
