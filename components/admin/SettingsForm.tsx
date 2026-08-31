"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { updateSettings } from "@/lib/actions-settings";
import { toast } from "sonner";
import { Settings, Globe, Mail, Share2 } from "lucide-react";

const settingsSchema = z.object({
  association: z.string().min(2, "Le nom est requis"),
  year: z.string().min(4, "L'année est requise"),
  email: z.string().email("Email invalide"),
  shopUrl: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  discord: z.string().optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
  linkedin: z.string().optional().or(z.literal("")),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

interface SettingsData {
  id?: number;
  association: string;
  year: string;
  email: string;
  shopUrl?: string | null;
  instagram?: string | null;
  discord?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
}

interface SettingsFormProps {
  settings: SettingsData;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      association: settings.association,
      year: settings.year,
      email: settings.email,
      shopUrl: settings.shopUrl || "",
      instagram: settings.instagram || "",
      discord: settings.discord || "",
      facebook: settings.facebook || "",
      linkedin: settings.linkedin || "",
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    setLoading(true);
    const toastId = toast.loading("Enregistrement en cours...");

    const formData = new FormData();
    formData.append("association", data.association);
    formData.append("year", data.year);
    formData.append("email", data.email);
    if (data.shopUrl) formData.append("shopUrl", data.shopUrl);
    if (data.instagram) formData.append("instagram", data.instagram);
    if (data.discord) formData.append("discord", data.discord);
    if (data.facebook) formData.append("facebook", data.facebook);
    if (data.linkedin) formData.append("linkedin", data.linkedin);

    try {
      const result = await updateSettings(formData);

      if (result?.error) {
        toast.error(result.error, { id: toastId });
      } else {
        toast.success("Paramètres enregistrés avec succès !", { id: toastId });
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur inattendue est survenue.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-brand-red" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-spartan">Informations générales</h2>
            <p className="text-sm text-gray-500">Informations de base du BDE</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l&apos;association <span className="text-red-500">*</span>
            </label>
            <input
              {...form.register("association")}
              className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                form.formState.errors.association ? "border-red-500" : ""
              }`}
              placeholder="Ex: BDE SUP'RNOVA"
            />
            {form.formState.errors.association && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.association.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Année scolaire <span className="text-red-500">*</span>
            </label>
            <input
              {...form.register("year")}
              className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                form.formState.errors.year ? "border-red-500" : ""
              }`}
              placeholder="Ex: 2025-2026"
            />
            {form.formState.errors.year && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.year.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-brand-yellow/20 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-brand-black" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-spartan">Contact</h2>
            <p className="text-sm text-gray-500">Coordonnées de contact</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email de contact <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...form.register("email")}
              className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                form.formState.errors.email ? "border-red-500" : ""
              }`}
              placeholder="contact@bde.fr"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL de la boutique</label>
            <input
              {...form.register("shopUrl")}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
              placeholder="https://boutique.bde.fr"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Share2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-spartan">Réseaux sociaux</h2>
            <p className="text-sm text-gray-500">Liens vers vos réseaux sociaux</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              {...form.register("instagram")}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
              placeholder="https://instagram.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discord</label>
            <input
              {...form.register("discord")}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
              placeholder="https://discord.gg/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input
              {...form.register("facebook")}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
              placeholder="https://facebook.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              {...form.register("linkedin")}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
              placeholder="https://linkedin.com/company/..."
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
        <Button type="submit" disabled={loading} className="px-8">
          {loading ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
      </div>
    </form>
  );
}
