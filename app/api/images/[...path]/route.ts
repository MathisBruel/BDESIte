import { NextRequest, NextResponse } from 'next/server';
import minioClient, { BUCKET_NAME } from '@/lib/minio';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = params.path.join('/');
    
    const objectStream = await minioClient.getObject(BUCKET_NAME, imagePath);
    
    const chunks: Buffer[] = [];
    for await (const chunk of objectStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    
    const contentType = getContentType(imagePath);
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
}

function getContentType(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase();
  const types: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    avif: 'image/avif',
  };
  return types[ext || ''] || 'application/octet-stream';
}
