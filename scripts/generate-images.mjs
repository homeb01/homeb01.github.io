/**
 * One-off generator for static images in public/ (run manually, not part of the build):
 *   node scripts/generate-images.mjs
 * - public/og.png            1200x630 default Open Graph image (site tokens: bg, fg, muted, accent gradient)
 * - public/apple-touch-icon.png  180x180 from public/favicon.svg
 * - public/favicon.ico       32x32 PNG-in-ICO from public/favicon.svg
 * Text uses system fonts (librsvg); re-run after changing name/role.
 */
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const NAME = 'Homero Barragán';
const ROLE = 'Software Engineer · Data Science · Applied AI';
const URL_TEXT = 'homeb01.github.io';
const font = "Ubuntu, 'Liberation Sans', 'DejaVu Sans', sans-serif";

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5B3DF5"/><stop offset="1" stop-color="#C2255C"/>
    </linearGradient>
    <linearGradient id="text" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#5B3DF5"/><stop offset="1" stop-color="#C2255C"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.12" cy="0" r="0.7">
      <stop offset="0" stop-color="#5B3DF5" stop-opacity="0.22"/><stop offset="1" stop-color="#5B3DF5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.92" cy="0.1" r="0.6">
      <stop offset="0" stop-color="#C2255C" stop-opacity="0.16"/><stop offset="1" stop-color="#C2255C" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#FBFAF8"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <g transform="translate(96 96)">
    <rect width="96" height="96" rx="24" fill="url(#accent)"/>
    <text x="44" y="64" text-anchor="middle" font-family="${font}" font-size="48" font-weight="700" letter-spacing="-2" fill="#FFFFFF">hb</text>
    <circle cx="74" cy="60" r="5.5" fill="#FFFFFF"/>
  </g>
  <text x="96" y="370" font-family="${font}" font-size="96" font-weight="700" letter-spacing="-3" fill="#17141F">${NAME}</text>
  <rect x="96" y="402" width="160" height="8" rx="4" fill="url(#text)"/>
  <text x="96" y="470" font-family="${font}" font-size="38" font-weight="500" fill="#5A5668">${ROLE}</text>
  <text x="96" y="550" font-family="${font}" font-size="28" font-weight="500" fill="url(#text)">${URL_TEXT}</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og.png');

// Rasterize the favicon with Arial-like metrics (Liberation Sans), as it renders on most systems.
const favicon = Buffer.from(
  (await readFile('public/favicon.svg', 'utf8')).replace(/font-family="[^"]*"/, `font-family="'Liberation Sans', Arial, sans-serif"`),
);
await sharp(favicon, { density: 600 }).resize(180, 180).flatten({ background: '#FBFAF8' }).png().toFile('public/apple-touch-icon.png');

// ICO container with a single 32x32 PNG image (supported by every modern browser).
const png32 = await sharp(favicon, { density: 300 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); entry.writeUInt8(32, 1); entry.writeUInt8(0, 2); entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4); entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png32.length, 8); entry.writeUInt32LE(6 + 16, 12);
await writeFile('public/favicon.ico', Buffer.concat([header, entry, png32]));

console.log('Generated public/og.png, public/apple-touch-icon.png, public/favicon.ico');
