import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import minioClient, { BUCKET_NAME } from "@/lib/minio";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const results = {
      processed: 0,
      failed: 0,
      skipped: 0,
      totalSizeBefore: 0,
      totalSizeAfter: 0,
      errors: [] as string[],
    };

    // List all image objects in MinIO
    const objects: { name: string; size: number }[] = [];
    await new Promise<void>((resolve, reject) => {
      const stream = minioClient.listObjects(BUCKET_NAME, "images/", true);
      stream.on("data", (obj) => {
        if (obj.name && /\.(jpg|jpeg|png)$/i.test(obj.name)) {
          objects.push({ name: obj.name, size: obj.size ?? 0 });
        }
      });
      stream.on("end", resolve);
      stream.on("error", reject);
    });

    for (const obj of objects) {
      try {
        results.totalSizeBefore += obj.size;

        // Download from MinIO
        const objStream = await minioClient.getObject(BUCKET_NAME, obj.name);
        const chunks: Buffer[] = [];
        await new Promise<void>((resolve, reject) => {
          objStream.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
          objStream.on("end", resolve);
          objStream.on("error", reject);
        });
        const inputBuffer = Buffer.concat(chunks);

        // Convert to WebP, resize max 1920x1920
        const webpBuffer = await sharp(inputBuffer)
          .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();

        const webpName = obj.name.replace(/\.(jpg|jpeg|png)$/i, ".webp");

        // Upload WebP version
        await minioClient.putObject(BUCKET_NAME, webpName, webpBuffer, webpBuffer.length, {
          "Content-Type": "image/webp",
        });

        // Delete original
        await minioClient.removeObject(BUCKET_NAME, obj.name);

        results.totalSizeAfter += webpBuffer.length;
        results.processed++;

        // Update DB references
        // heroPhoto stores: /api/images/hero/filename.ext
        // others store: folder/filename.ext (relative path without /api/images/)
        const relPath = obj.name.replace(/^images\//, "");
        const newRelPath = relPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
        const oldApiPath = `/api/images/${relPath}`;
        const newApiPath = `/api/images/${newRelPath}`;

        await Promise.all([
          prisma.heroPhoto.updateMany({ where: { path: oldApiPath }, data: { path: newApiPath } }),
          prisma.event.updateMany({ where: { cover: relPath }, data: { cover: newRelPath } }),
          prisma.partner.updateMany({ where: { logo: relPath }, data: { logo: newRelPath } }),
          prisma.teamMember.updateMany({ where: { photo: relPath }, data: { photo: newRelPath } }),
          prisma.teamMembership.updateMany({ where: { photo: relPath }, data: { photo: newRelPath } }),
          prisma.academicYear.updateMany({ where: { teamBackgroundImage: relPath }, data: { teamBackgroundImage: newRelPath } }),
          prisma.product.updateMany({ where: { image: relPath }, data: { image: newRelPath } }),
        ]);
      } catch (error) {
        results.failed++;
        results.errors.push(`${obj.name}: ${String(error)}`);
      }
    }

    const savedMB = ((results.totalSizeBefore - results.totalSizeAfter) / 1024 / 1024).toFixed(2);

    return NextResponse.json({
      success: true,
      message: `Optimisation terminée: ${results.processed} images converties en WebP, ${savedMB}MB économisés`,
      results,
    });
  } catch (error) {
    return NextResponse.json({ error: `Erreur serveur: ${String(error)}` }, { status: 500 });
  }
}
