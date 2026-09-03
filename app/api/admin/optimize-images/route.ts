import { NextRequest, NextResponse } from "next/server";
import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const imageDir = join(process.cwd(), "public", "images");
    const results = {
      processed: 0,
      failed: 0,
      totalSizeBefore: 0,
      totalSizeAfter: 0,
      errors: [] as string[],
    };

    // Recursive function to process images in directories
    async function processDirectory(dir: string) {
      try {
        const entries = await readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = join(dir, entry.name);

          if (entry.isDirectory()) {
            await processDirectory(fullPath);
          } else if (entry.isFile()) {
            const ext = entry.name.toLowerCase().split(".").pop();
            if (["jpg", "jpeg", "png"].includes(ext || "")) {
              try {
                const buffer = await readFile(fullPath);
                results.totalSizeBefore += buffer.length;

                // Optimize image
                let optimized;
                if (ext === "png") {
                  optimized = await sharp(buffer)
                    .png({ quality: 80, compressionLevel: 9 })
                    .toBuffer();
                } else {
                  optimized = await sharp(buffer)
                    .jpeg({ quality: 80, progressive: true })
                    .toBuffer();
                }

                // Also save WebP version
                const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
                const webpBuffer = await sharp(buffer)
                  .webp({ quality: 80 })
                  .toBuffer();

                await writeFile(fullPath, optimized);
                await writeFile(webpPath, webpBuffer);

                results.totalSizeAfter += optimized.length + webpBuffer.length;
                results.processed++;
              } catch (error) {
                results.failed++;
                results.errors.push(`${fullPath}: ${String(error)}`);
              }
            }
          }
        }
      } catch (error) {
        results.errors.push(`Erreur lecture dossier ${dir}: ${String(error)}`);
      }
    }

    await processDirectory(imageDir);

    const savedMB = ((results.totalSizeBefore - results.totalSizeAfter) / 1024 / 1024).toFixed(2);

    return NextResponse.json({
      success: true,
      message: `Optimisation terminée: ${results.processed} images traitées, ${savedMB}MB économisés`,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Erreur serveur: ${String(error)}` },
      { status: 500 }
    );
  }
}
