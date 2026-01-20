"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTeamMember, updateTeamMember } from "@/lib/actions-team";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { toast } from "sonner";
import { User, Briefcase, Mail, Link as LinkIcon } from "lucide-react";

const teamMemberSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  role: z.string().min(2, "Le rôle est requis"),
  photoPosition: z.string().optional(),
  linkedin: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  email: z.string().optional().or(z.literal("")),
});

type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  photoPosition?: string | null;
  links?: {
    linkedin?: string | null;
    instagram?: string | null;
    email?: string | null;
  } | null;
}

interface TeamMemberFormProps {
  member?: TeamMember;
}

const photoPositions = [
  { value: "top", label: "Haut" },
  { value: "center", label: "Centre" },
  { value: "bottom", label: "Bas" },
];

export function TeamMemberForm({ member }: TeamMemberFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: member
      ? {
          name: member.name,
          role: member.role,
          photoPosition: member.photoPosition || "center",
          linkedin: member.links?.linkedin || "",
          instagram: member.links?.instagram || "",
          email: member.links?.email || "",
        }
      : {
          name: "",
          role: "",
          photoPosition: "center",
          linkedin: "",
          instagram: "",
          email: "",
        },
  });

  const onSubmit = async (data: TeamMemberFormValues) => {
    setLoading(true);
    const toastId = toast.loading("Enregistrement en cours...");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("role", data.role);
    formData.append("photoPosition", data.photoPosition || "center");
    if (data.linkedin) formData.append("linkedin", data.linkedin);
    if (data.instagram) formData.append("instagram", data.instagram);
    if (data.email) formData.append("email", data.email);

    if (selectedImage) {
      formData.append("photo", selectedImage);
    }

    try {
      let result;
      if (member) {
        result = await updateTeamMember(member.id, formData);
      } else {
        result = await createTeamMember(formData);
      }

      if (result?.error) {
        toast.error(result.error, { id: toastId });
        setLoading(false);
      } else {
        toast.success("Membre enregistré avec succès !", { id: toastId });
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
              <User className="w-5 h-5 text-gray-500" />
              Informations générales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  {...form.register("name")}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                    form.formState.errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Ex: Jean Dupont"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rôle <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register("role")}
                    className={`w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${
                      form.formState.errors.role ? "border-red-500" : ""
                    }`}
                    placeholder="Ex: Président"
                  />
                </div>
                {form.formState.errors.role && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.role.message}</p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position de la photo
                </label>
                <select
                  {...form.register("photoPosition")}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                >
                  {photoPositions.map((pos) => (
                    <option key={pos.value} value={pos.value}>
                      {pos.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-gray-500" />
              Liens et contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    {...form.register("email")}
                    className="w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                    placeholder="jean.dupont@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  {...form.register("linkedin")}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                <input
                  {...form.register("instagram")}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo</h3>
            <ImageUpload
              label="Photo du membre"
              defaultImage={member?.photo}
              onImageChange={setSelectedImage}
            />
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <Button type="submit" disabled={loading} className="w-full justify-center">
              {loading ? "Enregistrement..." : member ? "Mettre à jour" : "Créer le membre"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
