#!/usr/bin/env node
/**
 * Turns a folder of raw car photos/videos into web-ready gallery assets.
 *
 *   node scripts/process-gallery.mjs <source-dir>
 *
 * The source folder is expected to be grouped into one subfolder per car
 * colour (Russian or English names both work — see COLOUR_ALIASES):
 *
 *   source-dir/
 *     белый/      IMG_001.jpg  IMG_002.jpg  clip.mp4
 *     зелёный/    ...
 *     интерьер/   ...
 *
 * For every image it writes a full-size WebP (max 1920px wide) plus a small
 * thumbnail; for every video it transcodes to web-friendly H.264 MP4 and
 * extracts a poster frame. Finally it writes src/lib/gallery-manifest.json,
 * which is the single source of truth the gallery page reads — so adding
 * photos never means hand-editing a TypeScript array.
 *
 * Re-runnable: existing outputs are overwritten, the manifest is rebuilt
 * from scratch.
 */

import { execFile } from "node:child_process";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import sharp from "sharp";

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(import.meta.dirname, "..");
const IMAGE_OUT = path.join(ROOT, "public/images/gallery");
const VIDEO_OUT = path.join(ROOT, "public/videos");
const MANIFEST = path.join(ROOT, "src/lib/gallery-manifest.json");

const FULL_WIDTH = 1920;
const THUMB_WIDTH = 640;
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic", ".avif"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm", ".m4v"]);

/**
 * Folder name (lowercased) -> canonical colour slug. Both the Russian names
 * the photos are grouped under and their English equivalents are accepted,
 * so the source folder can be organised either way.
 */
const COLOUR_ALIASES = {
  белый: "white",
  white: "white",
  白外: "white",
  серый: "gray",
  grey: "gray",
  gray: "gray",
  ash: "gray",
  灰外: "gray",
  бежевый: "beige",
  beige: "beige",
  米外: "beige",
  фиолетовый: "purple",
  фиолет: "purple",
  purple: "purple",
  "twilight-purple": "purple",
  зелёный: "green",
  зеленый: "green",
  green: "green",
  "forest-green": "green",
  绿外: "green",
  интерьер: "interior",
  салон: "interior",
  interior: "interior",
};

function toSlug(dirName) {
  const key = dirName.trim().toLowerCase();
  return COLOUR_ALIASES[key] ?? key.replace(/[^a-z0-9]+/gi, "-");
}

async function processImage(srcPath, outDir, slug, index) {
  const base = `${slug}-${String(index).padStart(2, "0")}`;
  const fullRel = `/images/gallery/${slug}/${base}.webp`;
  const thumbRel = `/images/gallery/${slug}/${base}-thumb.webp`;

  const pipeline = sharp(srcPath).rotate(); // honour EXIF orientation
  const { width, height } = await pipeline.metadata();

  await pipeline
    .clone()
    .resize({ width: FULL_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, `${base}.webp`));

  await pipeline
    .clone()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(path.join(outDir, `${base}-thumb.webp`));

  return {
    type: "photo",
    src: fullRel,
    thumb: thumbRel,
    width: Math.min(width ?? FULL_WIDTH, FULL_WIDTH),
    height: Math.round(
      ((height ?? FULL_WIDTH) * Math.min(width ?? FULL_WIDTH, FULL_WIDTH)) /
        (width ?? FULL_WIDTH),
    ),
  };
}

async function processVideo(srcPath, imageDir, videoDir, slug, index) {
  const base = `${slug}-v${String(index).padStart(2, "0")}`;
  const outVideo = path.join(videoDir, `${base}.mp4`);
  const posterPng = path.join(videoDir, `${base}-poster.png`);

  // Scale to max 1280 wide, keep even dimensions (H.264 requirement).
  await execFileAsync("ffmpeg", [
    "-y",
    "-i", srcPath,
    "-vf", "scale='min(1280,iw)':-2",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "26",
    "-movflags", "+faststart",
    "-c:a", "aac",
    "-b:a", "128k",
    outVideo,
  ]);

  // Poster frame at 1s (falls back to first frame on very short clips).
  await execFileAsync("ffmpeg", [
    "-y",
    "-ss", "1",
    "-i", outVideo,
    "-frames:v", "1",
    posterPng,
  ]).catch(() =>
    execFileAsync("ffmpeg", ["-y", "-i", outVideo, "-frames:v", "1", posterPng]),
  );

  const posterRel = `/images/gallery/${slug}/${base}-poster.webp`;
  await sharp(posterPng)
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(path.join(imageDir, `${base}-poster.webp`));
  await rm(posterPng, { force: true });

  const { stdout } = await execFileAsync("ffprobe", [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height",
    "-of", "csv=p=0",
    outVideo,
  ]);
  const [width, height] = stdout.trim().split(",").map(Number);

  return {
    type: "video",
    src: `/videos/${base}.mp4`,
    thumb: posterRel,
    poster: posterRel,
    width,
    height,
  };
}

async function main() {
  const sourceDir = process.argv[2];
  if (!sourceDir) {
    console.error("usage: node scripts/process-gallery.mjs <source-dir>");
    process.exit(1);
  }

  const groups = (await readdir(sourceDir, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  if (groups.length === 0) {
    console.error(
      `no colour subfolders found in ${sourceDir} — expected e.g. белый/, зелёный/`,
    );
    process.exit(1);
  }

  await mkdir(VIDEO_OUT, { recursive: true });
  const manifest = {};

  for (const group of groups) {
    const slug = toSlug(group);
    const imageDir = path.join(IMAGE_OUT, slug);
    await mkdir(imageDir, { recursive: true });

    const files = (await readdir(path.join(sourceDir, group)))
      .filter((f) => !f.startsWith("."))
      .sort();

    const items = [];
    let photoIndex = 0;
    let videoIndex = 0;

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const srcPath = path.join(sourceDir, group, file);
      try {
        if (IMAGE_EXT.has(ext)) {
          items.push(
            await processImage(srcPath, imageDir, slug, ++photoIndex),
          );
        } else if (VIDEO_EXT.has(ext)) {
          items.push(
            await processVideo(srcPath, imageDir, VIDEO_OUT, slug, ++videoIndex),
          );
        } else {
          continue;
        }
        process.stdout.write(`  ${slug}/${file}\n`);
      } catch (err) {
        console.warn(`  ! skipped ${group}/${file}: ${err.message}`);
      }
    }

    if (items.length > 0) manifest[slug] = items;
    console.log(
      `${slug}: ${items.filter((i) => i.type === "photo").length} фото, ` +
        `${items.filter((i) => i.type === "video").length} видео`,
    );
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nmanifest → ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
