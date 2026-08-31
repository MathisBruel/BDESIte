"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import minioClient, { BUCKET_NAME } from "./minio";

const yearSchema = z.object({
  label: z.string().min(3, "Label requis (ex: 2025-2026)"),
  slug: z.string().min(3, "Slug requis"),
  startDate: z.string(),
  endDate: z.string(),
  isCurrent: z.string().optional(),
});

async function uploadImage(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const minioPath = `images/${filename}`;
  await minioClient.putObject(BUCKET_NAME, minioPath, buffer, file.size, {
    "Content-Type": file.type,
  });
  return filename;
}

export async function createAcademicYear(formData: FormData) {
  const parsed = yearSchema.safeParse({
    label: formData.get("label"),
    slug: formData.get("slug"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    isCurrent: formData.get("isCurrent"),
  });

  if (!parsed.success) return { error: "Champs invalides" };

  const { label, slug, startDate, endDate, isCurrent } = parsed.data;
  const setCurrent = isCurrent === "on";

  const bgFile = formData.get("teamBackgroundImage") as File | null;
  let teamBackgroundImage: string | undefined;

  try {
    if (bgFile && bgFile.size > 0) {
      teamBackgroundImage = await uploadImage(bgFile, "years");
    }

    if (setCurrent) {
      await prisma.academicYear.updateMany({ data: { isCurrent: false } });
    }
    await prisma.academicYear.create({
      data: {
        label,
        slug,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isCurrent: setCurrent,
        ...(teamBackgroundImage ? { teamBackgroundImage } : {}),
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Erreur lors de la création" };
  }

  revalidatePath("/admin/annees");
  revalidatePath("/");
  redirect("/admin/annees");
}

export async function updateAcademicYear(id: string, formData: FormData) {
  const parsed = yearSchema.safeParse({
    label: formData.get("label"),
    slug: formData.get("slug"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    isCurrent: formData.get("isCurrent"),
  });

  if (!parsed.success) return { error: "Champs invalides" };

  const { label, slug, startDate, endDate, isCurrent } = parsed.data;
  const setCurrent = isCurrent === "on";

  const bgFile = formData.get("teamBackgroundImage") as File | null;
  let teamBackgroundImage: string | undefined;

  try {
    if (bgFile && bgFile.size > 0) {
      teamBackgroundImage = await uploadImage(bgFile, "years");
    }

    if (setCurrent) {
      await prisma.academicYear.updateMany({
        where: { NOT: { id } },
        data: { isCurrent: false },
      });
    }
    await prisma.academicYear.update({
      where: { id },
      data: {
        label,
        slug,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isCurrent: setCurrent,
        ...(teamBackgroundImage ? { teamBackgroundImage } : {}),
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Erreur lors de la mise à jour" };
  }

  revalidatePath("/admin/annees");
  revalidatePath("/");
  redirect("/admin/annees");
}

export async function deleteAcademicYear(id: string) {
  try {
    await prisma.academicYear.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    return { error: "Erreur lors de la suppression" };
  }
  revalidatePath("/admin/annees");
}

export async function updateYearGroupPhoto(yearId: string, formData: FormData) {
  const file = formData.get("photo") as File;
  if (!file || file.size === 0) return { error: "Aucune image sélectionnée" };
  try {
    const path = await uploadImage(file, "years");
    await prisma.academicYear.update({
      where: { id: yearId },
      data: { teamBackgroundImage: path },
    });
  } catch (e) {
    console.error(e);
    return { error: "Erreur upload" };
  }
  revalidatePath("/admin/team");
  revalidatePath("/");
}

export async function setCurrentYear(id: string) {
  try {
    await prisma.$transaction([
      prisma.academicYear.updateMany({ data: { isCurrent: false } }),
      prisma.academicYear.update({ where: { id }, data: { isCurrent: true } }),
    ]);
  } catch (error) {
    console.error(error);
    return { error: "Erreur" };
  }
  revalidatePath("/admin/annees");
  revalidatePath("/");
}
