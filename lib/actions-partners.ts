"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import minioClient, { BUCKET_NAME } from "./minio";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Removed local pool/adapter/prisma init

const partnerSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  city: z.string().min(2),
  website: z.string().optional().or(z.literal("")),
  address: z.string().optional(),
  conditions: z.string().optional(),
  active: z.string().optional(), // Checkbox sends "on" or undefined
  advantages: z.string().optional(),
});

async function uploadImage(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  
  await minioClient.putObject(BUCKET_NAME, filename, buffer, file.size, {
    "Content-Type": file.type,
  });

  return filename;
}

export async function createPartner(formData: FormData) {
  const validatedFields = partnerSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    city: formData.get("city"),
    website: formData.get("website") || "",
    address: formData.get("address") || "",
    conditions: formData.get("conditions") || "",
    active: formData.get("active"),
    advantages: formData.get("advantages") || "",
  });

  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }

  const { name, category, city, website, address, conditions, active, advantages } = validatedFields.data;
  
  const logoFile = formData.get("logo") as File;
  let logoPath = null;

  try {
    if (logoFile && logoFile.size > 0) {
      logoPath = await uploadImage(logoFile, "partners");
    }

    const advantagesList = advantages 
      ? advantages.split("\n").map(s => s.trim()).filter(s => s.length > 0)
      : [];

    await prisma.partner.create({
      data: {
        name,
        category,
        city,
        website: website || null,
        address: address || null,
        conditions: conditions || null,
        active: active === "on",
        advantages: advantagesList,
        logo: logoPath,
      },
    });
  } catch (error) {
    console.error("Error creating partner:", error);
    return { error: "Erreur lors de la création du partenaire" };
  }

  revalidatePath("/admin/partners");
  revalidatePath("/partenaires");
  redirect("/admin/partners");
}

export async function updatePartner(id: string, formData: FormData) {
  const validatedFields = partnerSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    city: formData.get("city"),
    website: formData.get("website") || "",
    address: formData.get("address") || "",
    conditions: formData.get("conditions") || "",
    active: formData.get("active"),
    advantages: formData.get("advantages") || "",
  });

  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }

  const { name, category, city, website, address, conditions, active, advantages } = validatedFields.data;
  
  const logoFile = formData.get("logo") as File;
  let logoPath = undefined;

  try {
    if (logoFile && logoFile.size > 0) {
      logoPath = await uploadImage(logoFile, "partners");
    }

    const advantagesList = advantages 
      ? advantages.split("\n").map(s => s.trim()).filter(s => s.length > 0)
      : [];

    await prisma.partner.update({
      where: { id },
      data: {
        name,
        category,
        city,
        website: website || null,
        address: address || null,
        conditions: conditions || null,
        active: active === "on",
        advantages: advantagesList,
        ...(logoPath && { logo: logoPath }),
      },
    });
  } catch (error) {
    console.error("Error updating partner:", error);
    return { error: "Erreur lors de la modification du partenaire" };
  }

  revalidatePath("/admin/partners");
  revalidatePath("/partenaires");
  redirect("/admin/partners");
}

export async function deletePartner(id: string) {
  try {
    await prisma.partner.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting partner:", error);
    return { error: "Erreur lors de la suppression du partenaire" };
  }

  revalidatePath("/admin/partners");
  revalidatePath("/partenaires");
}
