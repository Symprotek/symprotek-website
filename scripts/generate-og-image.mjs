/**
 * Generates the static social-share card at app/opengraph-image.png.
 *
 * Run with: npm run og
 *
 * Why a script rather than Next's ImageResponse: the @vercel/og build bundled
 * with Next 14 fails to load under Node 22+ (fileURLToPath on its own module
 * URL), which breaks `next build` outright. Generating a static PNG once and
 * committing it sidesteps the issue entirely and costs nothing at runtime.
 *
 * Re-run this after changing the tagline or the certification list.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "app", "opengraph-image.png");

const WIDTH = 1200;
const HEIGHT = 630;

/* Keep in sync with the `brand` colours in tailwind.config.ts. */
const BRAND_RED = "#e2231a";
const BRAND_DARK = "#0b2044";

const TAGLINE = "Turnkey PCB Assembly &amp; Global Supply Chain";
const SUBLINE = "Milpitas, California · Since 1994";
const BADGES = [
  "ITAR Registered",
  "SBA 8(a)",
  "ISO 9001",
  "ISO 13485",
  "Made in USA",
];

const FONT =
  "Segoe UI, Helvetica Neue, Helvetica, Arial, DejaVu Sans, sans-serif";

/** Approximate advance width so badge pills can be sized without measuring. */
const badgeWidth = (text) => Math.round(text.length * 11.5 + 40);

let badgeX = 72;
const badges = BADGES.map((label) => {
  const w = badgeWidth(label);
  const node = `
    <rect x="${badgeX}" y="470" width="${w}" height="52" rx="8"
          fill="none" stroke="#3a5480" stroke-width="2" />
    <text x="${badgeX + w / 2}" y="504" fill="#c8d4e4" font-size="22"
          font-family="${FONT}" text-anchor="middle">${label}</text>`;
  badgeX += w + 14;
  return node;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <pattern id="traces" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M0 40h24l10-10h22l10 10h14M40 0v24l-10 10v22l10 10v14"
            fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1.5" />
      <circle cx="40" cy="40" r="3.5" fill="#ffffff" fill-opacity="0.05" />
    </pattern>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BRAND_DARK}" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#traces)" />
  <rect x="0" y="0" width="12" height="${HEIGHT}" fill="${BRAND_RED}" />

  <text x="72" y="180" font-family="${FONT}" font-size="72" font-weight="800">
    <tspan fill="#ffffff">Sym</tspan><tspan fill="${BRAND_RED}">protek</tspan>
  </text>

  <text x="72" y="272" fill="#ffffff" font-size="44" font-family="${FONT}">${TAGLINE}</text>
  <text x="72" y="336" fill="#93a4bd" font-size="28" font-family="${FONT}">${SUBLINE}</text>

  ${badges}
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync(OUT, png);
console.log(`Wrote ${OUT} (${WIDTH}x${HEIGHT}, ${png.length} bytes)`);
