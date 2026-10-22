/**
 * Normalizes personal photos for the "Beyond the code" carousel (run manually, not part of the build):
 *   node scripts/normalize-photos.mjs
 *
 * photos-inbox/<file>  ->  src/assets/personal/NN-<slug>.jpg   (list and order: scripts/photos.config.mjs)
 * - auto-orients (EXIF), converts to sRGB and strips ALL metadata (EXIF, GPS, XMP, ICC)
 * - crops to a common 3:2 ratio with a smart anchor (sharp "attention" by default, or `focus` per photo)
 * - max 1800 px wide (never upscales), JPEG q82 progressive (mozjpeg)
 * - idempotent: identical output is not rewritten; outputs no longer listed in the config are removed
 * - warns about portrait or small inputs
 *
 * HEIC/HEIF: sharp's prebuilt libvips cannot decode HEVC. If decoding fails, the script looks for an
 * already-converted copy next to the original (`<name>.decoded.jpg`, `<name>.jpg` or `<name>.png`) and
 * otherwise prints how to convert it (pillow-heif one-liner in .claude/deliverables/developer/notes.md).
 */
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import photos from './photos.config.mjs';

const INBOX = 'photos-inbox';
const OUT_DIR = 'src/assets/personal';
const RATIO = 3 / 2;
const MAX_WIDTH = 1800;
const MIN_WIDTH = 1200; // below this the photo looks soft on large screens
const QUALITY = 82;

const strategies = { attention: sharp.strategy.attention, entropy: sharp.strategy.entropy };
const isHeif = (file) => /\.(heic|heif)$/i.test(file);

/** Returns a path sharp can decode, or null (HEIC without a converted copy). */
async function resolveInput(file) {
  const input = path.join(INBOX, file);
  if (!existsSync(input)) return null;
  if (!isHeif(file)) return input;
  try {
    await sharp(input).resize(8).toBuffer(); // full decode test (metadata alone succeeds)
    return input;
  } catch {
    const base = path.join(INBOX, path.parse(file).name);
    const fallback = [`${base}.decoded.jpg`, `${base}.jpg`, `${base}.png`].find((p) => existsSync(p));
    if (fallback) {
      console.warn(`  ! ${file}: sharp cannot decode HEVC; using converted copy ${path.basename(fallback)}`);
      return fallback;
    }
    console.warn(
      `  ! ${file}: sharp cannot decode this HEIC. Convert it first (keeps it in ${INBOX}/), e.g.:\n` +
        `      python3 -m venv /tmp/heif && /tmp/heif/bin/pip install pillow pillow-heif\n` +
        `      /tmp/heif/bin/python -c "from pillow_heif import register_heif_opener; from PIL import Image, ImageOps; ` +
        `register_heif_opener(); ImageOps.exif_transpose(Image.open('${input}')).convert('RGB').save('${base}.decoded.jpg', quality=95)"\n` +
        `    (heif-convert from libheif-examples fails on this file.) Then run this script again.`,
    );
    return null;
  }
}

await mkdir(OUT_DIR, { recursive: true });
const expected = new Set();
let written = 0;
let unchanged = 0;
let skipped = 0;

for (const [i, { file, slug, focus = 'attention' }] of photos.entries()) {
  const name = `${String(i + 1).padStart(2, '0')}-${slug}.jpg`;
  const out = path.join(OUT_DIR, name);
  expected.add(name);
  console.log(`${file} -> ${out}`);

  const input = await resolveInput(file);
  if (!input) {
    skipped++;
    if (!existsSync(path.join(INBOX, file))) console.warn(`  ! missing ${path.join(INBOX, file)}`);
    if (existsSync(out)) console.warn(`  ! keeping the existing ${name}`);
    continue;
  }

  const meta = await sharp(input).metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  const w = swap ? meta.height : meta.width;
  const h = swap ? meta.width : meta.height;
  if (h > w) console.warn(`  ! portrait photo (${w}x${h}): a 3:2 crop will lose a lot; prefer a horizontal shot`);
  const cropWidth = Math.min(w, Math.floor(h * RATIO));
  const width = Math.min(MAX_WIDTH, cropWidth);
  const height = Math.round(width / RATIO);
  if (width < MIN_WIDTH) console.warn(`  ! small photo: ${width}px wide after cropping (recommended >= ${MIN_WIDTH}px)`);

  const buffer = await sharp(input)
    .rotate() // apply EXIF orientation
    .resize({ width, height, fit: 'cover', position: strategies[focus] ?? focus })
    .toColourspace('srgb')
    .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
    .toBuffer(); // sharp drops all metadata unless .withMetadata()/.keepMetadata() is used

  if (existsSync(out) && Buffer.compare(await readFile(out), buffer) === 0) {
    unchanged++;
    console.log(`  = unchanged (${width}x${height})`);
  } else {
    await writeFile(out, buffer);
    written++;
    console.log(`  + ${width}x${height}, ${Math.round(buffer.length / 1024)} KB (focus: ${focus})`);
  }
}

for (const f of await readdir(OUT_DIR)) {
  if (/^\d{2}-.+\.jpg$/.test(f) && !expected.has(f)) {
    await unlink(path.join(OUT_DIR, f));
    console.log(`- removed stale ${f}`);
  }
}

console.log(`\nDone: ${written} written, ${unchanged} unchanged, ${skipped} skipped.`);
console.log('Remember: alt text and captions go in src/data/profile.{en,es}.ts (same order).');
