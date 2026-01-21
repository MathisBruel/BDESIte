/**
 * Migrates an old image path to the new API endpoint
 * Handles various path formats and converts them to /api/images/...
 * 
 * Database stores paths like: "events/photo.jpg" or "team/mathis.png"
 * API expects: /api/images/events/photo.jpg
 * MinIO stores: images/events/photo.jpg (API adds 'images/' prefix)
 * 
 * @param oldPath - Old image path (can be relative path or full URL)
 * @returns API endpoint URL
 */
export function migrateImagePath(oldPath: string): string {
  if (!oldPath) return '';
  
  let cleanPath = oldPath;
  
  // If it's already an API path, return as-is
  if (cleanPath.startsWith('/api/images/')) {
    return cleanPath;
  }
  
  // If it's a full URL, extract the path
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    try {
      const url = new URL(cleanPath);
      cleanPath = url.pathname;
    } catch {
      // If URL parsing fails, continue with the path as-is
    }
  }
  
  // Remove /api/images prefix if present
  cleanPath = cleanPath.replace(/^\/api\/images\//, '');
  
  // Remove /storage prefix if present
  cleanPath = cleanPath.replace(/^\/storage/, '');
  
  // Remove /bde-images prefix if present (can appear multiple times)
  cleanPath = cleanPath.replace(/^\/bde-images\/?/, '');
  cleanPath = cleanPath.replace(/\/bde-images\/?/g, '/');
  
  // Remove /images/ prefix if present (API endpoint will add it)
  cleanPath = cleanPath.replace(/^\/images\//, '');
  cleanPath = cleanPath.replace(/^images\//, '');
  
  // Remove leading slash
  cleanPath = cleanPath.replace(/^\//, '');
  
  // If path is empty or invalid, return as-is
  if (!cleanPath) return oldPath;
  
  // Return API endpoint URL
  return `/api/images/${cleanPath}`;
}

/**
 * Generates a full URL for an image stored in MinIO (for uploads)
 * @param path - Image path relative to the images folder
 * @returns Full MinIO path for storage
 */
export function getImageUrl(path: string): string {
  // Remove /images/ prefix if present
  let cleanPath = path.replace(/^\/images\//, '').replace(/^images\//, '');
  
  // Remove leading slash if present
  cleanPath = cleanPath.replace(/^\//, '');
  
  return `/api/images/${cleanPath}`;
}
