"use server";

import { prisma } from "@/lib/prisma";
import minioClient, { BUCKET_NAME } from "./minio";
import { revalidatePath } from "next/cache";

const DEFAULT_PHOTOS = Array.from({ length: 20 }, (_, i) => `/photos-hero/hero-${String(i + 1).padStart(2, "0")}.jpg`);
const DEFAULT_POSITION = "center center";

export async function getHeroPhotos() {
  try {
    const photos = await prisma.heroPhoto.findMany({
      orderBy: { order: "asc" },
    });
    return photos;
  } catch {
    return [];
  }
}

export async function seedDefaultHeroPhotos() {
  const existing = await prisma.heroPhoto.count();
  if (existing > 0) return { error: "Photos déjà initialisées" };

  await prisma.heroPhoto.createMany({
    data: DEFAULT_PHOTOS.map((path, i) => ({ path, position: DEFAULT_POSITION, order: i, active: true })),
  });

  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true };
}

export async function addHeroPhoto(formData: FormData) {
  const file = formData.get("photo") as File;
  if (!file || file.size === 0) return { error: "Aucun fichier fourni" };

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `hero/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const minioPath = `images/${filename}`;

  await minioClient.putObject(BUCKET_NAME, minioPath, buffer, file.size, {
    "Content-Type": file.type,
  });

  const lastPhoto = await prisma.heroPhoto.findFirst({ orderBy: { order: "desc" } });
  const order = (lastPhoto?.order ?? -1) + 1;

  await prisma.heroPhoto.create({
    data: { path: `/api/images/${filename}`, position: DEFAULT_POSITION, order, active: true },
  });

  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true };
}

export async function deleteHeroPhoto(id: string) {
  const photo = await prisma.heroPhoto.findUnique({ where: { id } });
  if (!photo) return { error: "Photo introuvable" };

  if (photo.path.startsWith("/api/images/")) {
    const minioPath = "images/" + photo.path.replace("/api/images/", "");
    try {
      await minioClient.removeObject(BUCKET_NAME, minioPath);
    } catch {
      // ignore if already gone
    }
  }

  await prisma.heroPhoto.delete({ where: { id } });

  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true };
}

export async function toggleHeroPhoto(id: string, active: boolean): Promise<{ error?: string; success?: boolean }> {
  await prisma.heroPhoto.update({ where: { id }, data: { active } });
  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true };
}

export async function updateHeroPhotoPosition(id: string, position: "center top" | "center 25%" | "center center" | "center 75%" | "center bottom"): Promise<{ error?: string; success?: boolean }> {
  await prisma.heroPhoto.update({ where: { id }, data: { position } });
  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true };
}

export async function reorderHeroPhotos(ids: string[]) {
  await Promise.all(ids.map((id, i) => prisma.heroPhoto.update({ where: { id }, data: { order: i } })));
  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true };
}
