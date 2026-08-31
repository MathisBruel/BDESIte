"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useState, useRef } from "react";
import { createTeamMember, updateTeamMember } from "@/lib/actions-team";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { toast } from "sonner";
import { User, Briefcase, Mail, Link as LinkIcon, Camera } from "lucide-react";
import { getImageUrl } from "@/lib/image-url";
import Image from "next/image";

const teamMemberSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  role: z.string().min(2, "Le rôle est requis"),
  photoPosition: z.string().optional(),
  linkedin: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  email: z.string().optional().or(z.literal("")),
});

type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

interface AcademicYearOption {
  id: string;
  label: string;
  isCurrent: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  photoPosition?: string | null;
  links?: { linkedin?: string | null; instagram?: string | null; email?: string | null } | null;
  memberYearIds?: string[];
  memberYearPhotos?: Record<string, string>; // yearId → existing photo path
}

interface TeamMemberFormProps {
  member?: TeamMember;
  academicYears?: AcademicYearOption[];
}

const photoPositions = [
  { value: "top", label: "Haut" },
  { value: "center", label: "Centre" },
  { value: "bottom", label: "Bas" },
];

function YearPhotoInput({
  yearId,
  yearLabel,
  existingPhoto,
  onFileChange,
}: {
  yearId: string;
  yearLabel: string;
  existingPhoto?: string;
  onFileChange: (yearId: string, file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(existingPhoto ? getImageUrl(existingPhoto) : null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onFileChange(yearId, file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileChange(yearId, null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="mt-2 ml-7">
      <p className="text-xs text-gray-500 mb-1">Photo spécifique pour {yearLabel}</p>
      <div className="flex items-center gap-3">
        {preview ? (
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-200">
            <Image src={preview} alt="" fill className="object-cover" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <Camera className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs px-2 py-1 border border-gray-300 rounded hover:border-brand-red hover:text-brand-red transition-colors"
          >
            {preview ? "Changer" : "Ajouter"}
          </button>
          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs px-2 py-1 border border-red-200 text-red-500 rounded hover:bg-red-50 transition-colors"
            >
              Retirer
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export function TeamMemberForm({ member, academicYears = [] }: TeamMemberFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedYears, setSelectedYears] = useState<string[]>(
    member?.memberYearIds ?? academicYears.filter((y) => y.isCurrent).map((y) => y.id)
  );
  const [yearPhotos, setYearPhotos] = useState<Record<string, File | null>>({});

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

  const toggleYear = (id: string) => {
    setSelectedYears((prev) =>
      prev.includes(id) ? prev.filter((y) => y !== id) : [...prev, id]
    );
  };

  const handleYearPhoto = (yearId: string, file: File | null) => {
    setYearPhotos((prev) => ({ ...prev, [yearId]: file }));
  };

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
    selectedYears.forEach((id) => formData.append("yearIds[]", id));
    if (selectedImage) formData.append("photo", selectedImage);

    // Append per-year photos
    for (const [yearId, file] of Object.entries(yearPhotos)) {
      if (file && selectedYears.includes(yearId)) {
        formData.append(`yearPhoto_${yearId}`, file);
      }
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
        toast.success("Membre enregistré !", { id: toastId });
      }
    } catch (e) {
      console.error(e);
      toast.error("Erreur inattendue.", { id: toastId });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Colonne principale */}
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
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${form.formState.errors.name ? "border-red-500" : ""}`}
                  placeholder="Jean Dupont"
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
                    className={`w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${form.formState.errors.role ? "border-red-500" : ""}`}
                    placeholder="Président"
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
                    <option key={pos.value} value={pos.value}>{pos.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Années */}
          {academicYears.length > 0 && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Années académiques</h3>
              <p className="text-sm text-gray-500 mb-4">
                Cochez les années + ajoutez une photo spécifique si différente de la photo principale.
              </p>
              <div className="space-y-4">
                {academicYears.map((year) => (
                  <div key={year.id} className="border border-gray-100 rounded-lg p-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedYears.includes(year.id)}
                        onChange={() => toggleYear(year.id)}
                        className="h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300 rounded"
                      />
                      <span className="text-sm font-medium text-gray-900 group-hover:text-brand-red transition-colors">
                        {year.label}
                        {year.isCurrent && (
                          <span className="ml-2 text-xs text-green-600 font-normal">(en cours)</span>
                        )}
                      </span>
                    </label>

                    {selectedYears.includes(year.id) && (
                      <YearPhotoInput
                        yearId={year.id}
                        yearLabel={year.label}
                        existingPhoto={member?.memberYearPhotos?.[year.id]}
                        onFileChange={handleYearPhoto}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Liens */}
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

        {/* Colonne droite */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo principale</h3>
            <p className="text-xs text-gray-400 mb-3">Utilisée par défaut si aucune photo spécifique par année.</p>
            <ImageUpload
              label=""
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
