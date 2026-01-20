import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const OUTPUT_FILE = path.join(process.cwd(), 'lib', 'blur-placeholders.ts');

interface BlurPlaceholders {
  [key: string]: string;
}

async function generateBlurPlaceholder(filePath: string): Promise<string> {
  const buffer = await sharp(filePath)
    .resize(10, 10, { fit: 'inside' })
    .blur()
    .toBuffer();
  
  const base64 = buffer.toString('base64');
  const mimeType = filePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
  return `data:${mimeType};base64,${base64}`;
}

async function processDirectory(dir: string, placeholders: BlurPlaceholders, baseDir: string): Promise<void> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'team old') continue;
      await processDirectory(fullPath, placeholders, baseDir);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        try {
          const relativePath = '/' + path.relative(baseDir, fullPath).replace(/\\/g, '/');
          const blurDataURL = await generateBlurPlaceholder(fullPath);
          placeholders[relativePath] = blurDataURL;
          console.log(`✅ Generated blur for: ${relativePath}`);
        } catch (error) {
          console.error(`❌ Error processing ${entry.name}:`, error);
        }
      }
    }
  }
}

async function main() {
  console.log('🖼️ Generating blur placeholders...\n');

  const placeholders: BlurPlaceholders = {};
  const publicDir = path.join(process.cwd(), 'public');
  
  await processDirectory(IMAGES_DIR, placeholders, publicDir);

  const output = `export const blurPlaceholders: Record<string, string> = ${JSON.stringify(placeholders, null, 2)};

export function getBlurPlaceholder(src: string): string | undefined {
  const cleanSrc = src.startsWith('/') ? src : '/' + src;
  return blurPlaceholders[cleanSrc];
}
`;

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`\n📄 Generated: ${OUTPUT_FILE}`);
  console.log(`📊 Total placeholders: ${Object.keys(placeholders).length}`);
  console.log('\n🎉 Blur placeholders generation completed!');
}

main().catch(console.error);
