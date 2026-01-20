/**
 * Base URL for MinIO bucket
 * Uses NEXT_PUBLIC_ prefix to make it available on client-side
 */
const MINIO_BASE_URL = process.env.NEXT_PUBLIC_MINIO_URL || 'http://localhost:9000/bde-images';

/**
 * Generates a full URL for an image stored in MinIO
 * @param path - Image path (e.g., 'assets/logo.png' or '/images/assets/logo.png')
 * @returns Full URL to the image in MinIO
 */
export function getImageUrl(path: string): string {
  // Remove /images/ prefix if present (for backward compatibility)
  const cleanPath = path.replace(/^\/images\//, '');
  
  // Remove leading slash if present
  const normalizedPath = cleanPath.replace(/^\//, '');
  
  return `${MINIO_BASE_URL}/${normalizedPath}`;
}

/**
 * Migrates an old image path to the new MinIO URL
 * Handles both relative paths and full URLs
 * @param oldPath - Old image path
 * @returns MinIO URL or original URL if already a full URL
 */
export function migrateImagePath(oldPath: string): string {
  // If it's already a full URL (http/https), return as-is
  if (oldPath.startsWith('http://') || oldPath.startsWith('https://')) {
    return oldPath;
  }
  
  // Otherwise, convert to MinIO URL
  return getImageUrl(oldPath);
}
