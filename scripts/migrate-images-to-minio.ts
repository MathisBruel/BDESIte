import fs from 'fs';
import path from 'path';
import minioClient, { BUCKET_NAME, ensureBucketExists } from '../lib/minio';

/**
 * Upload a directory recursively to MinIO
 */
async function uploadDirectory(dirPath: string, prefix: string = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const objectName = prefix ? `${prefix}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Recursively upload subdirectories
      await uploadDirectory(fullPath, objectName);
    } else {
      // Upload file
      console.log(`Uploading ${objectName}...`);
      
      try {
        await minioClient.fPutObject(BUCKET_NAME, objectName, fullPath, {
          'Content-Type': getContentType(entry.name),
        });
        console.log(`✓ Uploaded ${objectName}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${objectName}:`, error);
      }
    }
  }
}

/**
 * Get MIME type based on file extension
 */
function getContentType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const types: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  };
  return types[ext] || 'application/octet-stream';
}

/**
 * Main migration function
 */
async function main() {
  console.log('🚀 Starting image migration to MinIO...\n');
  
  try {
    // Ensure bucket exists and is configured
    await ensureBucketExists();
    console.log('');

    // Upload all images from public/images
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    if (!fs.existsSync(imagesDir)) {
      console.error(`Error: Images directory not found at ${imagesDir}`);
      process.exit(1);
    }

    console.log(`Uploading images from: ${imagesDir}\n`);
    await uploadDirectory(imagesDir);

    console.log('\n✅ Migration complete!');
    console.log(`\nYou can view your images at:`);
    console.log(`- MinIO Console: http://localhost:9001`);
    console.log(`- Bucket URL: ${process.env.NEXT_PUBLIC_MINIO_URL || 'http://localhost:9000/bde-images'}`);
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
main();
