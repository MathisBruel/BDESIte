import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import minioClient, { BUCKET_NAME } from "@/lib/minio";
import { getImageUrl } from "@/lib/image-url";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "Fichier manquant" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Type de fichier non autorisé" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 5MB)" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `events-content/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const minioPath = `images/${filename}`;

  await minioClient.putObject(BUCKET_NAME, minioPath, buffer, file.size, {
    "Content-Type": file.type,
  });

  return NextResponse.json({ url: getImageUrl(filename) });
}
