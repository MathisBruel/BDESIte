"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import minioClient, { BUCKET_NAME } from "./minio";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(2),
  type: z.string().min(2),
  price: z.string().transform((val) => parseFloat(val)),
  quantity: z.string().transform((val) => parseInt(val, 10)),
  active: z.string().optional(),
  order: z.string().optional().transform((val) => val ? parseInt(val, 10) : 0),
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

export async function createProduct(formData: FormData) {
  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    active: formData.get("active"),
    order: formData.get("order"),
  });

  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }

  const { name, type, price, quantity, active, order } = validatedFields.data;

  const imageFile = formData.get("image") as File;
  let imagePath = null;

  try {
    if (imageFile && imageFile.size > 0) {
      imagePath = await uploadImage(imageFile, "products");
    }

    await prisma.product.create({
      data: {
        name,
        type,
        price,
        quantity,
        active: active === "on",
        order: order || 0,
        image: imagePath,
      },
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return { error: "Erreur lors de la création du produit" };
  }

  revalidatePath("/admin/stock");
  revalidatePath("/confiserie");
  redirect("/admin/stock");
}

export async function updateProduct(id: string, formData: FormData) {
  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    active: formData.get("active"),
    order: formData.get("order"),
  });

  if (!validatedFields.success) {
    return { error: "Champs invalides" };
  }

  const { name, type, price, quantity, active, order } = validatedFields.data;

  const imageFile = formData.get("image") as File;
  let imagePath = undefined;

  try {
    if (imageFile && imageFile.size > 0) {
      imagePath = await uploadImage(imageFile, "products");
    }

    await prisma.product.update({
      where: { id },
      data: {
        name,
        type,
        price,
        quantity,
        active: active === "on",
        order: order || 0,
        ...(imagePath && { image: imagePath }),
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return { error: "Erreur lors de la modification du produit" };
  }

  revalidatePath("/admin/stock");
  revalidatePath("/confiserie");
  redirect("/admin/stock");
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return { error: "Erreur lors de la suppression du produit" };
  }

  revalidatePath("/admin/stock");
  revalidatePath("/confiserie");
}

export async function updateProductQuantity(id: string, quantity: number) {
  try {
    await prisma.product.update({
      where: { id },
      data: { quantity },
    });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return { error: "Erreur lors de la modification du stock" };
  }

  revalidatePath("/admin/stock");
  revalidatePath("/confiserie");
}
