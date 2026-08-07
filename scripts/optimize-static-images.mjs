#!/usr/bin/env node
/**
 * Shrinks the hand-placed images under public/images/ to the sizes the layout
 * actually renders them at, and writes the social preview card.
 *
 *   node scripts/optimize-static-images.mjs [--dry]
 *
 * WHY THIS EXISTS
 *
 * The gallery is already handled by process-gallery.mjs, which caps everything
 * at 1920px WebP. The hero and about-bento images are not — they were dropped
 * in by hand straight out of the source exports, at 4096px and up to 13MB of
 * PNG apiece. Next.js was quietly papering over that: `next/image` resized them
 * per request, so nobody ever downloaded the originals.
 *
 * `output: "export"` removes that safety net. A static export has no image
 * server, so whatever sits in public/ is exactly what the browser downloads,
 * and a 13MB PNG behind a 600px-wide bento tile becomes a real 13MB download on
 * the landing page. This script closes that gap at build time instead.
 *
 * HOW THE TARGET WIDTHS WERE PICKED
 *
 * From the `sizes` attribute at each call site, doubled for 2x displays, then
 * rounded up. They are deliberately not "big enough for anything" — that is the
 * habit that produced the 4096px files in the first place.
 *
 * FORMAT
 *
 * Every one of these PNGs carries an alpha channel, but most don't use it:
 * they're photographs exported with a channel that is opaque end to end. Those
 * get the channel dropped, which is a straight saving for free. The genuinely
 * cut-out images (the hero cars on transparent backgrounds) keep alpha and get
 * a higher quality floor, because WebP artefacts show up first along a hard
 * matte edge.
 *
 * Re-runnable: sources are removed once converted, so a second run is a no-op.
 */

import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY = process.argv.includes("--dry");

/**
 * Directories to sweep, with the widest the layout ever paints them.
 *
 * public/images/gallery is absent on purpose — process-gallery.mjs owns it, and
 * running both over the same files would re-encode already-lossy WebP.
 */
const TARGETS = [
  {
    dir: "public/images/hero",
    maxWidth: 480,
    // Hero.tsx: both the chip and the strip render inside CHIP_SIZE_CLASS,
    // which tops out at lg:w-[168px], with sizes="(min-width: 1024px) 160px".
    // 480 is ~3x that — headroom for a 3x phone and nothing more.
    note: "chips + strip, max 168px CSS",
  },
  {
    dir: "public/images/about",
    maxWidth: 1280,
    // AboutBento.tsx: sizes="(min-width: 1024px) 600px, 100vw", so 600px CSS on
    // desktop and full-width on a phone. 1280 covers 600 @2x and a 430px phone
    // at 3x alike.
    note: "bento tiles, max 600px CSS",
  },
];

/** Written from a gallery frame — see the social-card step at the bottom. */
const OG = {
  source: "public/images/gallery/white/white-01.webp",
  out: "public/seo/og.jpg",
  width: 1200,
  height: 630,
};

const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

function human(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
  return `${Math.round(bytes / 1024)}KB`;
}

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (SOURCE_EXT.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

async function convert(file, maxWidth) {
  const rel = path.relative(ROOT, file);
  const before = (await stat(file)).size;
  const image = sharp(file);
  const [meta, stats] = await Promise.all([image.metadata(), image.stats()]);

  // `hasAlpha` only says a channel exists; `isOpaque` says whether it carries
  // any information. Dropping a fully-opaque channel is lossless in appearance
  // and takes a quarter of the pixel data out of the encoder's hands.
  const keepAlpha = meta.hasAlpha && !stats.isOpaque;
  const width = Math.min(maxWidth, meta.width);
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");

  let pipeline = image.resize({ width, withoutEnlargement: true });
  if (!keepAlpha) pipeline = pipeline.removeAlpha();
  pipeline = pipeline.webp(
    keepAlpha
      ? { quality: 88, alphaQuality: 90, effort: 6 }
      : { quality: 80, effort: 6 },
  );

  if (DRY) {
    const buf = await pipeline.toBuffer();
    console.log(
      `  ${rel}\n    ${meta.width}px ${human(before)} -> ${width}px ${human(buf.length)}` +
        `  (alpha ${keepAlpha ? "kept" : "dropped"}, dry run)`,
    );
    return { before, after: buf.length };
  }

  // `out` differs from `file` only in extension, so there is no read/write
  // conflict and sharp can write straight to it.
  const info = await pipeline.toFile(out);

  // Only now is it safe to drop the source: the replacement is on disk.
  await unlink(file);

  console.log(
    `  ${rel}\n    ${meta.width}px ${human(before)} -> ${width}px ${human(info.size)}` +
      `  (alpha ${keepAlpha ? "kept" : "dropped"})`,
  );
  return { before, after: info.size };
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const target of TARGETS) {
    const dir = path.join(ROOT, target.dir);
    console.log(`\n${target.dir}  ->  max ${target.maxWidth}px  (${target.note})`);
    let touched = 0;
    for await (const file of walk(dir)) {
      const { before, after } = await convert(file, target.maxWidth);
      totalBefore += before;
      totalAfter += after;
      touched += 1;
    }
    if (touched === 0) console.log("  nothing to do (already converted)");
  }

  // The social card. Cropped rather than letterboxed: 1200x630 is far wider
  // than any photo in the set, and bars around a car read as a broken embed.
  // `attention` picks the crop window by edge density, which on these frames
  // lands on the car rather than on empty tarmac.
  const ogSource = path.join(ROOT, OG.source);
  try {
    await stat(ogSource);
    if (!DRY) {
      await sharp(ogSource)
        .resize({
          width: OG.width,
          height: OG.height,
          fit: "cover",
          position: sharp.strategy.attention,
        })
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toFile(path.join(ROOT, OG.out));
    }
    const size = DRY ? 0 : (await stat(path.join(ROOT, OG.out))).size;
    console.log(
      `\n${OG.out}  ->  ${OG.width}x${OG.height}${DRY ? " (dry run)" : ` ${human(size)}`}`,
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(
        `\n! ${OG.source} is missing — social card not written.\n` +
          `  Run scripts/process-gallery.mjs first, or point OG.source at another image.`,
      );
    } else throw error;
  }

  if (totalBefore > 0) {
    const saved = totalBefore - totalAfter;
    console.log(
      `\n${human(totalBefore)} -> ${human(totalAfter)}   saved ${human(saved)} ` +
        `(${Math.round((saved / totalBefore) * 100)}%)${DRY ? "  [dry run]" : ""}`,
    );
  }
}

await main();
