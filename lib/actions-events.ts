"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import minioClient, { BUCKET_NAME } from "./minio";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Removed local pool/adapter/prisma init

const eventSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  date: z.string(),
  place: z.string().min(3),
  description: z.string().min(10),
  ticketUrl: z.string().optional().or(z.literal("")),
  published: z.string().optional(), // Checkbox sends "on" or undefined
});

async function uploadImage(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  
  await minioClient.putObject(BUCKET_NAME, filename, buffer, file.size, {
    "Content-Type": file.type,
  });

  return filename;
}

export async function createEvent(formData: FormData) {
  const validatedFields = eventSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    date: formData.get("date"),
    place: formData.get("place"),
    description: formData.get("description"),
    ticketUrl: formData.get("ticketUrl") || "",
    published: formData.get("published"),
  });

  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }

  const { title, slug, date, place, description, ticketUrl, published } = validatedFields.data;
  
  const coverFile = formData.get("cover") as File;
  let coverPath = undefined;

  if (coverFile && coverFile.size > 0) {
    coverPath = await uploadImage(coverFile, "events");
  }

  try {


    await prisma.event.create({
      data: {
        title,
        slug,
        date: new Date(date),
        place,
        description,
        ticketUrl: ticketUrl || null,
        published: published === "on",
        cover: coverPath || null,
      },
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return { error: "Erreur lors de la création de l'événement" };
  }

  revalidatePath("/admin/events");
  revalidatePath("/evenements");
  redirect("/admin/events");
}

export async function updateEvent(slug: string, formData: FormData) {
  const validatedFields = eventSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    date: formData.get("date"),
    place: formData.get("place"),
    description: formData.get("description"),
    ticketUrl: formData.get("ticketUrl") || "",
    published: formData.get("published"),
  });

  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }

  const { title, slug: newSlug, date, place, description, ticketUrl, published } = validatedFields.data;
  
  const coverFile = formData.get("cover") as File;
  let coverPath = undefined;

  try {
    if (coverFile && coverFile.size > 0) {
      coverPath = await uploadImage(coverFile, "events");
    }

    await prisma.event.update({
      where: { slug },
      data: {
        title,
        slug: newSlug,
        date: new Date(date),
        place,
        description,
        ticketUrl: ticketUrl || null,
        published: published === "on",
        ...(coverPath && { cover: coverPath }),
      },
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return { error: "Erreur lors de la modification de l'événement" };
  }

  revalidatePath("/admin/events");
  revalidatePath("/evenements");
  redirect("/admin/events");
}

export async function deleteEvent(slug: string) {
  try {
    await prisma.event.delete({
      where: { slug },
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return { error: "Erreur lors de la suppression de l'événement" };
  }

  revalidatePath("/admin/events");
  revalidatePath("/evenements");
}
