"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProduct, updateProduct } from "@/lib/actions-stock";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { toast } from "sonner";
import { Package, Euro, Hash, Layers } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  type: z.string().min(2, "Le type est requis"),
  price: z.string().min(1, "Le prix est requis"),
  quantity: z.string().min(1, "La quantité est requise"),
  order: z.string().optional(),
  active: z.boolean().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface Product {
  id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  image: string | null;
  active: boolean;
  order: number;
}

interface ProductFormProps {
  product?: Product;
}

const productTypes = [
  { value: "boisson", label: "Boisson" },
  { value: "snack", label: "Snack" },
  { value: "dessert", label: "Dessert" },
  { value: "autre", label: "Autre" },
];

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          type: product.type,
          price: product.price.toString(),
          quantity: product.quantity.toString(),
          order: product.order.toString(),
          active: product.active,
        }
      : {
          name: "",
          type: "boisson",
          price: "",
          quantity: "0",
          order: "0",
          active: true,
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    const toastId = toast.loading("Enregistrement en cours...");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("type", data.type);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("order", data.order || "0");
    if (data.active) formData.append("active", "on");

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      let result;
      if (product) {
        result = await updateProduct(product.id, formData);
      } else {
        result = await createProduct(formData);
      }

      if (result?.error) {
        toast.error(result.error, { id: toastId });
        setLoading(false);
      } else {
        toast.success("Produit enregistré avec succès !", { id: toastId });
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur inattendue est survenue.", { id: toastId });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" />
              Informations générales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du produit <span className="text-red-500">*</span>
                </label>
                <input
                  {...form.register("name")}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                    form.formState.errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Ex: Coca-Cola"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Layers className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <select
                    {...form.register("type")}
                    className={`w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                      form.formState.errors.type ? "border-red-500" : ""
                    }`}
                  >
                    {productTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (€) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...form.register("price")}
                    className={`w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                      form.formState.errors.price ? "border-red-500" : ""
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {form.formState.errors.price && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantité en stock <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    {...form.register("quantity")}
                    className={`w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                      form.formState.errors.quantity ? "border-red-500" : ""
                    }`}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordre d&apos;affichage
                </label>
                <input
                  type="number"
                  min="0"
                  {...form.register("order")}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Image</h3>
            <ImageUpload
              label="Image du produit"
              defaultImage={product?.image || undefined}
              onImageChange={setSelectedImage}
            />
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut</h3>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...form.register("active")}
                  id="active"
                  className="h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="active" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                  Produit actif (visible sur le site)
                </label>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button type="submit" disabled={loading} className="w-full justify-center">
                {loading ? "Enregistrement..." : product ? "Mettre à jour" : "Créer le produit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
