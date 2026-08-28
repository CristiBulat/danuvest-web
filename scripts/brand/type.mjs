/**
 * Sets text as vector outlines, so the print files carry no font dependency.
 *
 * Inter ships from @fontsource as per-weight woff2 subsets, so each weight needs two
 * files: `latin` covers the wordmark, `latin-ext` carries the Romanian ț. Glyphs are
 * pulled one at a time and advanced by hand — that applies our own letter-spacing and
 * sidesteps opentype.js's shaper, which throws on Inter's GSUB table.
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const opentype = require('opentype.js');
const wawoff2 = require('wawoff2');

const FONT_DIR = 'node_modules/@fontsource/inter/files';
const cache = new Map();

async function loadWeight(weight) {
  if (cache.has(weight)) return cache.get(weight);
  const subsets = [];
  // Sequential on purpose: wawoff2 hands back a view into its WASM heap, so two
  // concurrent decompressions overwrite each other. Copy out before the next call.
  for (const subset of ['latin', 'latin-ext']) {
    const woff2 = readFileSync(`${FONT_DIR}/inter-${subset}-${weight}-normal.woff2`);
    const heapView = await wawoff2.decompress(woff2);
    const ttf = new Uint8Array(heapView).buffer;
    subsets.push(opentype.parse(ttf));
  }
  cache.set(weight, subsets);
  return subsets;
}

/** First subset that actually has the character; `latin` wins for everything but ț/ș. */
function resolve(subsets, char) {
  const font = subsets.find((f) => f.charToGlyphIndex(char) !== 0);
  if (!font) throw new Error(`No Inter subset covers ${JSON.stringify(char)} (U+${char.codePointAt(0).toString(16).toUpperCase()})`);
  return font;
}

/**
 * Outlines `text` at `size` units, letter-spaced by `tracking` (in ems, CSS-style).
 * Returns the path data plus the advance width, so callers can centre it themselves.
 * Trailing tracking is excluded from the width — otherwise centred text sits left.
 */
export async function outlineText(text, { weight = 700, size = 100, tracking = 0 } = {}) {
  const subsets = await loadWeight(weight);
  const chars = [...text];
  const gap = tracking * size;

  let x = 0;
  let d = '';
  chars.forEach((char, i) => {
    const font = resolve(subsets, char);
    const glyph = font.charToGlyph(char);
    d += glyph.getPath(x, 0, size).toPathData(2);
    x += (glyph.advanceWidth / font.unitsPerEm) * size;
    if (i < chars.length - 1) x += gap;
  });

  return { d, width: x };
}

/** Cap height for vertical centring — Inter's cap is 0.727em. */
export const CAP_HEIGHT = 0.727;
