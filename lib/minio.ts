import { Client } from 'minio';

const computeConfig = () => {
  const endpointStr = process.env.MINIO_ENDPOINT || 'localhost';
  
  // If it's just a hostname like 'minio' or 'localhost'
  if (!endpointStr.includes('://') && !endpointStr.includes(':')) {
    return { endPoint: endpointStr, port: 9000, useSSL: false };
  }

  // If it has a protocol or port, parse it as a URL
  try {
    const urlStr = endpointStr.startsWith('http') ? endpointStr : `http://${endpointStr}`;
    const url = new URL(urlStr);
    return {
      endPoint: url.hostname,
      port: url.port ? parseInt(url.port) : 9000,
      useSSL: url.protocol === 'https:',
    };
  } catch (e) {
    console.warn('Failed to parse MINIO_ENDPOINT, falling back to defaults:', e);
    return { endPoint: 'localhost', port: 9000, useSSL: false };
  }
};

const config = computeConfig();

const minioClient = new Client({
  endPoint: config.endPoint,
  port: config.port,
  useSSL: config.useSSL,
  accessKey: process.env.MINIO_ROOT_USER || 'minioadmin',
  secretKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin',
});

export const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'bde-images';

/**
 * Ensures the MinIO bucket exists and is publicly accessible
 */
export async function ensureBucketExists() {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    
    if (!exists) {
      console.log(`Creating bucket: ${BUCKET_NAME}`);
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
      
      // Set public read policy for all objects in the bucket
      const policy = {
        Version: '2012-10-17',
        Statement: [{
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
        }],
      };
      
      await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
      console.log(`✓ Bucket ${BUCKET_NAME} created and configured`);
    } else {
      console.log(`✓ Bucket ${BUCKET_NAME} already exists`);
    }
  } catch (error) {
    console.error('Error ensuring bucket exists:', error);
    throw error;
  }
}

export default minioClient;
