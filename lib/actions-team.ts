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

export async function createTeamMember(formData: FormData) {
  const validatedFields = teamMemberSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    photoPosition: formData.get("photoPosition") || "center",
    linkedin: formData.get("linkedin") || "",
    instagram: formData.get("instagram") || "",
    email: formData.get("email") || "",
  });

  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }

  const { name, role, photoPosition, linkedin, instagram, email } = validatedFields.data;

  const photoFile = formData.get("photo") as File;
  let photoPath = "/images/team/default.png";

  try {
    if (photoFile && photoFile.size > 0) {
      photoPath = await uploadImage(photoFile, "team");
    }

    await prisma.teamMember.create({
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

  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }

  const { name, role, photoPosition, linkedin, instagram, email } = validatedFields.data;

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
    await prisma.teamMember.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return { error: "Erreur lors de la suppression du membre" };
  }

  revalidatePath("/admin/team");
  revalidatePath("/");
}
