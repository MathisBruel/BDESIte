import sharp from "sharp";
import minioClient, { BUCKET_NAME } from "./minio";

const CONVERTIBLE_EXTS = new Set(['jpg', 'jpeg', 'png', 'webp']);

export async function uploadImage(file: File, folder: string): Promise<string> {
  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const baseName = file.name.replace(/\.[^.]+$/, '').replace(/\s+/g, '-');

  let buffer: Buffer;
  let outputName: string;
  let contentType: string;

  if (CONVERTIBLE_EXTS.has(ext)) {
    buffer = await sharp(inputBuffer)
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    outputName = `${baseName}.webp`;
    contentType = 'image/webp';
  } else {
    buffer = inputBuffer;
    outputName = file.name.replace(/\s+/g, '-');
    contentType = file.type;
  }

  const filename = `${folder}/${Date.now()}-${outputName}`;
  const minioPath = `images/${filename}`;

  await minioClient.putObject(BUCKET_NAME, minioPath, buffer, buffer.length, {
    'Content-Type': contentType,
  });

  return filename;
}
