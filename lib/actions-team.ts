"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import minioClient, { BUCKET_NAME } from "./minio";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const teamMemberSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  photoPosition: z.string().optional(),
  linkedin: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  email: z.string().optional().or(z.literal("")),
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

async function syncMemberships(
  memberId: string,
  yearIds: string[],
  baseRole: string,
  yearPhotos: Record<string, string> = {}
) {
  await prisma.teamMembership.deleteMany({ where: { teamMemberId: memberId } });

  for (let i = 0; i < yearIds.length; i++) {
    const yearId = yearIds[i];
    await prisma.teamMembership.create({
      data: {
        teamMemberId: memberId,
        academicYearId: yearId,
        role: baseRole,
        photo: yearPhotos[yearId] || null,
        order: i,
      },
    });
  }
}

export async function createTeamMember(formData: FormData) {
  const validatedFields = teamMemberSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    photoPosition: formData.get("photoPosition") || "center",
    linkedin: formData.get("linkedin") || "",
    instagram: formData.get("instagram") || "",
    email: formData.get("email") || "",
  });

  if (!validatedFields.success) return { error: "Champs invalides" };

  const { name, role, photoPosition, linkedin, instagram, email } = validatedFields.data;
  const yearIds = formData.getAll("yearIds[]").map(String).filter(Boolean);
  const photoFile = formData.get("photo") as File;
  let photoPath = "/images/team/default.png";

  try {
    if (photoFile && photoFile.size > 0) {
      photoPath = await uploadImage(photoFile, "team");
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        photo: photoPath,
        photoPosition: photoPosition || "center",
        linkedin: linkedin || null,
        instagram: instagram || null,
        email: email || null,
      },
    });

    if (yearIds.length > 0) {
      const yearPhotos: Record<string, string> = {};
      for (const yearId of yearIds) {
        const yPhotoFile = formData.get(`yearPhoto_${yearId}`) as File;
        if (yPhotoFile && yPhotoFile.size > 0) {
          yearPhotos[yearId] = await uploadImage(yPhotoFile, "team");
        }
      }
      await syncMemberships(member.id, yearIds, role, yearPhotos);
    }
  } catch (error) {
    console.error("Error creating team member:", error);
    return { error: "Erreur lors de la création du membre" };
  }

  revalidatePath("/admin/team");
  revalidatePath("/");
  redirect("/admin/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const validatedFields = teamMemberSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    photoPosition: formData.get("photoPosition") || "center",
    linkedin: formData.get("linkedin") || "",
    instagram: formData.get("instagram") || "",
    email: formData.get("email") || "",
  });

  if (!validatedFields.success) return { error: "Champs invalides" };

  const { name, role, photoPosition, linkedin, instagram, email } = validatedFields.data;
  const yearIds = formData.getAll("yearIds[]").map(String).filter(Boolean);
  const photoFile = formData.get("photo") as File;
  let photoPath = undefined;

  try {
    if (photoFile && photoFile.size > 0) {
      photoPath = await uploadImage(photoFile, "team");
    }

    await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        role,
        photoPosition: photoPosition || "center",
        linkedin: linkedin || null,
        instagram: instagram || null,
        email: email || null,
        ...(photoPath && { photo: photoPath }),
      },
    });

    const yearPhotos: Record<string, string> = {};
    for (const yearId of yearIds) {
      const yPhotoFile = formData.get(`yearPhoto_${yearId}`) as File;
      if (yPhotoFile && yPhotoFile.size > 0) {
        yearPhotos[yearId] = await uploadImage(yPhotoFile, "team");
      }
    }
    await syncMemberships(id, yearIds, role, yearPhotos);
  } catch (error) {
    console.error("Error updating team member:", error);
    return { error: "Erreur lors de la modification du membre" };
  }

  revalidatePath("/admin/team");
  revalidatePath("/");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return { error: "Erreur lors de la suppression du membre" };
  }
  revalidatePath("/admin/team");
  revalidatePath("/");
}

export async function reorderTeamMemberships(
  yearId: string,
  orderedMemberIds: string[]
) {
  await Promise.all(
    orderedMemberIds.map((memberId, index) =>
      prisma.teamMembership.updateMany({
        where: { academicYearId: yearId, teamMemberId: memberId },
        data: { order: index },
      })
    )
  );
  revalidatePath("/admin/team");
  revalidatePath("/");
}
