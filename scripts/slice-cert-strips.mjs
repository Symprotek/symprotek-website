/**
 * One-off asset pipeline: slices the composite certification strips saved from
 * the legacy symprotek.com into individual badge PNGs.
 *
 * ---------------------------------------------------------------------------
 * THESE ARE STOPGAP ASSETS. The source strips are only 78px tall, so even
 * upscaled the badges are soft. They exist so the pages can be laid out and
 * reviewed with the real credentials rather than placeholder text. Replace
 * /public/images/certifications/*.png with vector-derived exports once the
 * real certificate artwork is available, then delete this script and the
 * /public/images/brand/certs-*-original.png sources.
 * ---------------------------------------------------------------------------
 *
 * Crop boundaries below were derived by scanning each strip for near-white
 * column gaps and then verified visually. They are hardcoded because the
 * sources are fixed files that will never change.
 *
 * Usage: npm run certs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const BRAND = "public/images/brand";
const OUT = "public/images/certifications";

/** [leftInclusive, rightExclusive] per badge, per source strip. */
const SOURCES = [
  {
    file: "certs-footer-original.png",
    crops: {
      itar: [2, 64],
      "iso-13485": [66, 252],
      "iso-9001": [252, 398],
      fda: [402, 496],
      "sba-8a": [497, 589],
      rohs: [592, 662],
    },
  },
  {
    file: "certs-banner-original.png",
    // ITAR / SBA / RoHS also appear here but at lower quality than the footer
    // strip, so only the two badges unique to this strip are taken.
    crops: {
      "mil-spec": [69, 127],
      "assembled-in-usa": [296, 393],
    },
  },
];

/** Upscale factor. Cannot add detail the 78px source lacks, but avoids
 *  browser-scaling artifacts at the sizes the badges actually render. */
const SCALE = 3;

await mkdir(OUT, { recursive: true });

for (const { file, crops } of SOURCES) {
  const src = `${BRAND}/${file}`;
  const { height } = await sharp(src).metadata();

  for (const [name, [left, right]] of Object.entries(crops)) {
    await sharp(src)
      .extract({ left, top: 0, width: right - left, height })
      .resize({ height: height * SCALE, kernel: "lanczos3" })
      .png({ compressionLevel: 9 })
      .toFile(`${OUT}/${name}.png`);
    console.log(`✓ ${name}.png  (${right - left}x${height} → ${SCALE}x)`);
  }
}
