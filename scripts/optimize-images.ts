import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 80;

async function optimizeImage(filePath: string): Promise<void> {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return;
  }

  const stats = fs.statSync(filePath);
  const sizeKB = stats.size / 1024;

  if (sizeKB < 500) {
    console.log(`⏭️ Skip (< 500KB): ${path.basename(filePath)} (${sizeKB.toFixed(0)}KB)`);
    return;
  }

  console.log(`🔄 Optimizing: ${path.basename(filePath)} (${sizeKB.toFixed(0)}KB)`);

  const image = sharp(filePath);
  const metadata = await image.metadata();

  let pipeline = image;

  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, undefined, { withoutEnlargement: true });
  }
  if (metadata.height && metadata.height > MAX_HEIGHT) {
    pipeline = pipeline.resize(undefined, MAX_HEIGHT, { withoutEnlargement: true });
  }

  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const optimizedPath = path.join(dir, `${baseName}_optimized${ext}`);

  if (ext === '.png') {
    await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toFile(optimizedPath);
  } else {
    await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(optimizedPath);
  }

  const newStats = fs.statSync(optimizedPath);
  const newSizeKB = newStats.size / 1024;

  try {
    fs.unlinkSync(filePath);
    fs.renameSync(optimizedPath, filePath);
    const reduction = ((sizeKB - newSizeKB) / sizeKB * 100).toFixed(1);
    console.log(`✅ Optimized: ${path.basename(filePath)} (${sizeKB.toFixed(0)}KB → ${newSizeKB.toFixed(0)}KB, -${reduction}%)`);
  } catch (err) {
    const reduction = ((sizeKB - newSizeKB) / sizeKB * 100).toFixed(1);
    console.log(`⚠️ Saved as new file: ${baseName}_optimized${ext} (${sizeKB.toFixed(0)}KB → ${newSizeKB.toFixed(0)}KB, -${reduction}%)`);
    console.log(`   → Delete "${baseName}${ext}" and rename "_optimized" manually`);
  }
}

async function processDirectory(dir: string): Promise<void> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'team old') {
        console.log(`⏭️ Skipping old team folder`);
        continue;
      }
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      try {
        await optimizeImage(fullPath);
      } catch (error) {
        console.error(`❌ Error processing ${entry.name}:`, error);
      }
    }
  }
}

async function main() {
  console.log('🖼️ Starting image optimization...\n');
  console.log(`📁 Directory: ${IMAGES_DIR}`);
  console.log(`📐 Max dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}`);
  console.log(`🎨 Quality: ${QUALITY}%\n`);

  await processDirectory(IMAGES_DIR);

  console.log('\n🎉 Image optimization completed!');
}

main().catch(console.error);
