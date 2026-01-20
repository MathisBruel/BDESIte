"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const settingsSchema = z.object({
  association: z.string().min(2),
  year: z.string().min(4),
  email: z.string().email(),
  shopUrl: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  discord: z.string().optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
});

export async function updateSettings(formData: FormData) {
  const validatedFields = settingsSchema.safeParse({
    association: formData.get("association"),
    year: formData.get("year"),
    email: formData.get("email"),
    shopUrl: formData.get("shopUrl") || "",
    instagram: formData.get("instagram") || "",
    discord: formData.get("discord") || "",
    facebook: formData.get("facebook") || "",
    linkedin: formData.get("linkedin") || "",
  });

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error);
    return { error: "Champs invalides" };
  }

  const { association, year, email, shopUrl, instagram, discord, facebook, linkedin } = validatedFields.data;

  try {
    await prisma.settings.upsert({
      where: { id: 1 },
      update: {
        association,
        year,
        email,
        shopUrl: shopUrl || null,
        instagram: instagram || null,
        discord: discord || null,
        facebook: facebook || null,
        linkedin: linkedin || null,
      },
      create: {
        id: 1,
        association,
        year,
        email,
        shopUrl: shopUrl || null,
        instagram: instagram || null,
        discord: discord || null,
        facebook: facebook || null,
        linkedin: linkedin || null,
      },
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return { error: "Erreur lors de la modification des paramètres" };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
