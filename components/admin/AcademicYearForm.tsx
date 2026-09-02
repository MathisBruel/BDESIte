"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { createAcademicYear, updateAcademicYear } from "@/lib/actions-years";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { toast } from "sonner";

const schema = z.object({
  label: z.string().min(3, "Requis"),
  slug: z.string().min(3, "Requis"),
  startDate: z.string(),
  endDate: z.string(),
  isCurrent: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

interface AcademicYearFormProps {
  initialData?: {
    id: string;
    label: string;
    slug: string;
    startDate: Date | string;
    endDate: Date | string;
    isCurrent: boolean;
    teamBackgroundImage?: string | null;
  };
}

export function AcademicYearForm({ initialData }: AcademicYearFormProps) {
  const [loading, setLoading] = useState(false);
  const [bgImage, setBgImage] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          label: initialData.label,
          slug: initialData.slug,
          startDate: new Date(initialData.startDate).toISOString().split("T")[0],
          endDate: new Date(initialData.endDate).toISOString().split("T")[0],
          isCurrent: initialData.isCurrent,
        }
      : {
          label: "",
          slug: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
        },
  });

  const autoSlug = () => {
    const val = form.getValues("label").trim();
    if (val) form.setValue("slug", val.toLowerCase().replace(/\s+/g, "-"));
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("label", data.label);
    fd.append("slug", data.slug);
    fd.append("startDate", data.startDate);
    fd.append("endDate", data.endDate);
    if (data.isCurrent) fd.append("isCurrent", "on");
    if (bgImage) fd.append("teamBackgroundImage", bgImage);

    const toastId = toast.loading("Enregistrement...");
    try {
      let result;
      if (initialData) {
        result = await updateAcademicYear(initialData.id, fd);
      } else {
        result = await createAcademicYear(fd);
      }
      if (result?.error) {
        toast.error(result.error, { id: toastId });
        setLoading(false);
      } else {
        toast.success("Année enregistrée !", { id: toastId });
      }
    } catch {
      toast.error("Erreur inattendue", { id: toastId });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("label")}
            onBlur={autoSlug}
            placeholder="2026-2027"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-brand-red focus:ring-brand-red"
          />
          {form.formState.errors.label && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.label.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            {...form.register("slug")}
            placeholder="2026-2027"
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-brand-red focus:ring-brand-red font-mono"
          />
          {form.formState.errors.slug && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.slug.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Début <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...form.register("startDate")}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-brand-red focus:ring-brand-red"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fin <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...form.register("endDate")}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-brand-red focus:ring-brand-red"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <input
            type="checkbox"
            {...form.register("isCurrent")}
            id="isCurrent"
            className="h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300 rounded"
          />
          <div>
            <label htmlFor="isCurrent" className="text-sm font-medium text-gray-900 cursor-pointer">
              Année en cours
            </label>
            <p className="text-xs text-gray-500 mt-0.5">
              Cocher déplacera le statut "en cours" sur cette année et désactivera les autres.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Photo de groupe</h3>
        <p className="text-xs text-gray-400 mb-4">
          Affichée dans la section équipe de la page d&apos;accueil pour cette année. Sinon, la photo par défaut est utilisée.
        </p>
        <ImageUpload
          label=""
          defaultImage={initialData?.teamBackgroundImage || undefined}
          onImageChange={setBgImage}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : initialData ? "Mettre à jour" : "Créer l'année"}
        </Button>
        <Button variant="outline" href="/admin/annees" type="button">
          Annuler
        </Button>
      </div>

    </form>
  );
}
