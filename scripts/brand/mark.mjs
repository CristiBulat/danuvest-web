/**
 * The DANUVEST building mark, rebuilt as vector.
 *
 * Traced from src/assets/logo.jpg (256x256 JPEG) by extracting the gold mask and
 * reading every edge off the scanlines. Coordinates below are in that original
 * 256px space; `markSvg()` normalises them into a 0 0 810 945 viewBox.
 *
 * The artwork is five gold volumes standing on a stepped base, separated by dark
 * gaps rather than outlines. Two diagonals repeat throughout: the roofline runs at
 * dx/dy -1.35, everything else (block tops, the notch, the separator that crosses
 * the tall band) runs at -1.5.
 */

const OX = 86;
const OY = 58;
const SCALE = 10;

export const MARK_W = 810;
export const MARK_H = 945;

/** Gold sampled off the original: light at top-left, deep amber at bottom-right. */
export const GOLD_LIGHT = '#ecc97a';
export const GOLD_MID = '#cca059';
export const GOLD_DARK = '#9e7333';
/** Flat gold for single-colour output — the site's --accent. */
export const GOLD_FLAT = '#c9a84c';
/** The site's --primary, used as the dark ground. */
export const CHARCOAL = '#1c1c24';

const pt = ([x, y]) => `${+((x - OX) * SCALE).toFixed(1)} ${+((y - OY) * SCALE).toFixed(1)}`;

/**
 * Volumes are allowed to overlap — they share one user-space gradient, so overlap is
 * invisible and saves fighting with hairline seams. That only holds if every subpath
 * winds the same way, otherwise `nonzero` cancels the overlap into a hole.
 */
const poly = (points) => {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    area += x1 * y2 - x2 * y1;
  }
  const wound = area < 0 ? [...points].reverse() : points;
  return `M${wound.map(pt).join('L')}Z`;
};

/** The inverted-V: peaked roof, left leg cut short by the separator, right leg to the base. */
const chevron = poly([
  [132.5, 58.5],  // apex
  [105.5, 78.5],  // roofline down-left
  [105.5, 97.0],  // outer edge down to the separator
  [114.5, 91.0],  // separator diagonal, up-right
  [114.5, 81.0],  // inner edge up
  [124.5, 75.5],  // wedge apex
  [124.5, 147.0], // right leg down into the base
  [132.5, 147.0],
]);

/** Low block at the left, with a slot notched out of its lower half. */
const leftBlock = poly([
  [91.0, 111.5],
  [106.5, 101.2], // slanted top
  [106.5, 111.5],
  [98.5, 116.7],  // notch, slanted top
  [98.5, 144.5],
  [91.0, 144.5],
]);

/** The tall band below the separator — visually continues the chevron's left leg. */
const tallBand = poly([
  [106.0, 101.0],
  [114.5, 95.3],
  [114.5, 144.5],
  [106.0, 144.5],
]);

/** Big tower at the right. Floats clear of the base on a dark gap. */
const tower = poly([
  [136.0, 61.0],
  [154.5, 83.5],
  [154.5, 137.5],
  [136.0, 137.5],
]);

/** Small stepped block at the far right. */
const farBlock = poly([
  [158.0, 117.8],
  [167.0, 126.8],
  [167.0, 147.0],
  [158.0, 147.0],
]);

/** Stepped plinth: taller under the right half, full width along the bottom. */
const base = poly([
  [124.5, 141.0],
  [167.0, 141.0],
  [167.0, 152.5],
  [86.0, 152.5],
  [86.0, 146.8],
  [124.5, 146.8],
]);

export const MARK_PATH = [chevron, leftBlock, tallBand, tower, farBlock, base].join('');

/**
 * Gold gradient tied to the mark's bounding box in user space, so separate volumes
 * (and any overlap between them) share one continuous ramp with no visible seams.
 */
export function goldGradient(id, w = MARK_W, h = MARK_H) {
  return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="${h}">
      <stop offset="0" stop-color="${GOLD_LIGHT}"/>
      <stop offset=".45" stop-color="${GOLD_MID}"/>
      <stop offset="1" stop-color="${GOLD_DARK}"/>
    </linearGradient>`;
}

/** Standalone mark on a transparent ground. `flat` swaps the gradient for solid gold. */
export function markSvg({ flat = false } = {}) {
  const fill = flat ? GOLD_FLAT : 'url(#g)';
  const defs = flat ? '' : `<defs>${goldGradient('g')}</defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_W} ${MARK_H}" width="${MARK_W}" height="${MARK_H}">
  ${defs}
  <path fill="${fill}" fill-rule="nonzero" d="${MARK_PATH}"/>
</svg>
`;
}
