"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPartner, updatePartner } from "@/lib/actions-partners";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { toast } from "sonner";
import { Building2, MapPin, Globe, FileText, CheckCircle } from "lucide-react";

const partnerSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  category: z.string().min(2, "La catégorie est requise"),
  city: z.string().min(2, "La ville est requise"),
  website: z.string().url().optional().or(z.literal("")),
  address: z.string().optional(),
  conditions: z.string().optional(),
  active: z.boolean().optional(),
  advantages: z.string().optional(),
});

type PartnerFormValues = z.infer<typeof partnerSchema>;

interface PartnerFormProps {
  initialData?: any;
}

export function PartnerForm({ initialData }: PartnerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          advantages: initialData.advantages.join("\n"),
        }
      : {
          name: "",
          category: "",
          city: "",
          website: "",
          address: "",
          conditions: "",
          active: true,
          advantages: "",
        },
  });

  const onSubmit = async (data: PartnerFormValues) => {
    setLoading(true);
    const toastId = toast.loading("Enregistrement en cours...");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("city", data.city);
    if (data.website) formData.append("website", data.website);
    if (data.address) formData.append("address", data.address);
    if (data.conditions) formData.append("conditions", data.conditions);
    if (data.active) formData.append("active", "on");
    if (data.advantages) formData.append("advantages", data.advantages);

    if (selectedLogo) {
      formData.append("logo", selectedLogo);
    }

    try {
      let result;
      if (initialData) {
        result = await updatePartner(initialData.id, formData);
      } else {
        result = await createPartner(formData);
      }

      if (result?.error) {
        toast.error(result.error, { id: toastId });
        setLoading(false);
      } else {
        toast.success("Partenaire enregistré avec succès !", { id: toastId });
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
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-gray-500" />
              Informations du partenaire
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  {...form.register("name")}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                    form.formState.errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Nom du partenaire"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <input
                  {...form.register("category")}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                    form.formState.errors.category ? "border-red-500" : ""
                  }`}
                  placeholder="ex: Restauration"
                />
                {form.formState.errors.category && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.category.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register("city")}
                    className={`w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                      form.formState.errors.city ? "border-red-500" : ""
                    }`}
                    placeholder="Rennes"
                  />
                </div>
                {form.formState.errors.city && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.city.message}</p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                <input
                  {...form.register("address")}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                  placeholder="Adresse complète"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Web</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register("website")}
                    className={`w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                      form.formState.errors.website ? "border-red-500" : ""
                    }`}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              Offre & Avantages
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avantages (un par ligne)</label>
                <textarea
                  {...form.register("advantages")}
                  rows={4}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-3 border"
                  placeholder="- 10% sur tout le magasin&#10;- Un verre offert"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conditions</label>
                <textarea
                  {...form.register("conditions")}
                  rows={2}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-3 border"
                  placeholder="Conditions particulières..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media & Status */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo</h3>
            <ImageUpload
              label="Logo du partenaire"
              defaultImage={initialData?.logo}
              onImageChange={setSelectedLogo}
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
                  Partenaire Actif
                </label>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button type="submit" disabled={loading} className="w-full justify-center">
                {loading ? "Enregistrement..." : initialData ? "Mettre à jour" : "Créer le partenaire"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
