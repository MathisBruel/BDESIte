import { NextRequest, NextResponse } from 'next/server';

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'localhost';
const MINIO_PORT = process.env.MINIO_PORT || '9000';
const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'bde-images';

function getMinioBaseUrl() {
  const ep = MINIO_ENDPOINT;
  if (ep.startsWith('http://') || ep.startsWith('https://')) {
    return `${ep}/${BUCKET_NAME}`;
  }
  return `http://${ep}:${MINIO_PORT}/${BUCKET_NAME}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const pathFromUrl = params.path.join('/');
    const minioUrl = `${getMinioBaseUrl()}/images/${pathFromUrl}`;

    const res = await fetch(minioUrl);

    if (!res.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const contentType = res.headers.get('content-type') || getContentType(pathFromUrl);
    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    };
    const cl = res.headers.get('content-length');
    if (cl) headers['Content-Length'] = cl;

    return new NextResponse(res.body, { headers });
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
