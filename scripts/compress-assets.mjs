import sharp from 'sharp';
import { statSync } from 'node:fs';

const targets = [
  { name: 'anger-furious', width: 720, quality: 80 },
  { name: 'anger-calm', width: 720, quality: 80 },
  { name: 'video-bg', width: 720, quality: 78 },
];

console.log('压缩 PNG → WebP\n');

for (const t of targets) {
  const src = `src/assets/${t.name}.png`;
  const dst = `src/assets/${t.name}.webp`;

  const before = statSync(src).size;
  const info = await sharp(src)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: t.quality, effort: 4 })
    .toFile(dst);

  const after = info.size;
  const ratio = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `  ${t.name}:  ${(before / 1024).toFixed(0)} KB  →  ${(after / 1024).toFixed(0)} KB  (-${ratio}%)`,
  );
}

console.log('\n完成');
