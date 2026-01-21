/**
 * Base URL for MinIO bucket (public URL for client-side)
 * Uses NEXT_PUBLIC_ prefix to make it available on client-side
 */
const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_URL || 'http://localhost:9002/bde-images';

/**
 * Internal MinIO URL for server-side access (used by Next.js image optimization)
 */
const MINIO_INTERNAL_URL = process.env.MINIO_INTERNAL_URL || 'http://minio:9000/bde-images';

/**
 * Generates a full URL for an image stored in MinIO
 * @param path - Image path (e.g., 'assets/logo.png' or '/images/assets/logo.png')
 * @param useInternal - Whether to use internal URL (for server-side)
 * @returns Full URL to the image in MinIO
 */
export function getImageUrl(path: string, useInternal = false): string {
  // Remove /images/ prefix if present (for backward compatibility)
  const cleanPath = path.replace(/^\/images\//, '');
  
  // Remove leading slash if present
  const normalizedPath = cleanPath.replace(/^\//, '');
  
  const baseUrl = useInternal ? MINIO_INTERNAL_URL : MINIO_PUBLIC_URL;
  return `${baseUrl}/${normalizedPath}`;
}

/**
 * Migrates an old image path to the new MinIO URL
 * Uses API endpoint so Next.js can access MinIO via internal Docker network
 * @param oldPath - Old image path
 * @returns API endpoint URL or original URL if already a full URL
 */
export function migrateImagePath(oldPath: string): string {
  // If it's already a full URL, extract the path and convert to API endpoint
  if (oldPath.startsWith('http://') || oldPath.startsWith('https://')) {
    try {
      const url = new URL(oldPath);
      // Extract path after /storage/bde-images/ or /bde-images/
      let imagePath = url.pathname;
      
      // Remove /storage prefix if present
      imagePath = imagePath.replace(/^\/storage/, '');
      
      // Remove /bde-images prefix if present (can appear multiple times)
      imagePath = imagePath.replace(/^\/bde-images\/?/, '');
      imagePath = imagePath.replace(/\/bde-images\/?/g, '/');
      
      // Remove /images/ prefix if present
      imagePath = imagePath.replace(/^\/images\//, '');
      
      // Remove leading slash
      imagePath = imagePath.replace(/^\//, '');
      
      // Use API endpoint
      return `/api/images/${imagePath}`;
    } catch {
      // If URL parsing fails, try to extract path manually
      let path = oldPath;
      // Remove protocol and domain
      path = path.replace(/^https?:\/\/[^\/]+/, '');
      // Remove /storage/bde-images/ or /bde-images/
      path = path.replace(/^\/storage\/bde-images\/?/, '');
      path = path.replace(/^\/bde-images\/?/, '');
      path = path.replace(/\/bde-images\/?/g, '/');
      path = path.replace(/^\/images\//, '');
      path = path.replace(/^\//, '');
      return `/api/images/${path}`;
    }
  }
  
  // Remove /images/ prefix if present (for backward compatibility)
  const cleanPath = oldPath.replace(/^\/images\//, '').replace(/^\//, '');
  
  // Use API endpoint so Next.js can access MinIO via internal Docker network
  return `/api/images/${cleanPath}`;
}
