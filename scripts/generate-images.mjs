/**
 * Generates the favicon set and the Open Graph images (og.png Turkish, og-en.png English) into public/.
 * Run with `pnpm images:generate` whenever the brand assets change.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const appIcon = path.join(root, 'src/assets/app-icon.png');

const BG = '#F4F4F2';
const INK = '#1A1A1A';
const MUTED = '#6B7280';
const PRIMARY = '#243C2C';
const ACCENT = '#9BD221';

const markSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 66" width="${size}" height="${Math.round((size * 66) / 96)}" fill="none">
  <circle cx="32.5" cy="33" r="27" stroke="${ACCENT}" stroke-width="11"/>
  <circle cx="63.5" cy="33" r="27" stroke="${PRIMARY}" stroke-width="11"/>
</svg>`;

/** Open Graph text per site language. `highlight` is the width of the accent bar under line two, fitted by eye. */
const OG = {
  tr: {
    file: 'og.png',
    line1: 'Kim kime ne borçlu,',
    line2: 'bir bakışta.',
    highlight: 426,
    sub: "Harcamayı gir, böl, IBAN'ı tek dokunuşla kopyala.",
    status: "APP STORE'DA · ANDROID YAKINDA · odesh.app",
  },
  en: {
    file: 'og-en.png',
    line1: 'Who owes whom,',
    line2: 'at a glance.',
    highlight: 438,
    sub: 'Log the expense, split it, copy the IBAN in one tap.',
    status: 'ON THE APP STORE · ANDROID SOON · odesh.app',
  },
};

const ogSvg = (o) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="0.85" cy="0.1" r="0.6">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.32"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${BG}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(96 96)">
    <g transform="scale(1.35)">
      <circle cx="32.5" cy="33" r="27" stroke="${ACCENT}" stroke-width="11" fill="none"/>
      <circle cx="63.5" cy="33" r="27" stroke="${PRIMARY}" stroke-width="11" fill="none"/>
    </g>
    <text x="150" y="66" font-family="Inter, Arial, Helvetica, sans-serif" font-size="56" font-weight="700" fill="${INK}" letter-spacing="-1.5">odesh</text>
  </g>
  <text x="96" y="330" font-family="Inter, Arial, Helvetica, sans-serif" font-size="88" font-weight="800" fill="${INK}" letter-spacing="-3.5">${o.line1}</text>
  <rect x="96" y="386" width="${o.highlight}" height="22" rx="6" fill="${ACCENT}" opacity="0.85"/>
  <text x="96" y="404" font-family="Inter, Arial, Helvetica, sans-serif" font-size="88" font-weight="800" fill="${PRIMARY}" letter-spacing="-3.5">${o.line2}</text>
  <text x="96" y="480" font-family="Inter, Arial, Helvetica, sans-serif" font-size="30" fill="${MUTED}">${o.sub}</text>
  <text x="96" y="548" font-family="Inter, Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="${PRIMARY}" letter-spacing="2">${o.status}</text>
</svg>`;

async function main() {
  await mkdir(publicDir, { recursive: true });
  const icon = await readFile(appIcon);

  const outputs = [
    ['favicon-32.png', 32],
    ['favicon-16.png', 16],
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
  ];
  for (const [name, size] of outputs) {
    await sharp(icon).resize(size, size).png().toFile(path.join(publicDir, name));
  }

  await writeFile(path.join(publicDir, 'icon.svg'), markSvg(96).trim() + '\n');
  for (const o of Object.values(OG)) {
    await sharp(Buffer.from(ogSvg(o))).png().toFile(path.join(publicDir, o.file));
  }

  console.log('Generated favicons and Open Graph images in public/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
