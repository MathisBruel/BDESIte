"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { createEvent, updateEvent } from "@/lib/actions-events";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { toast } from "sonner";
import { Calendar, MapPin, Link as LinkIcon, FileText, Type } from "lucide-react";

const eventSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  slug: z.string().min(3, "Le slug est requis"),
  date: z.string(),
  time: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  endTime: z.string().optional().or(z.literal("")),
  place: z.string().min(3, "Le lieu est requis"),
  description: z.string().min(10, "La description doit être plus détaillée"),
  ticketUrl: z.string().url().optional().or(z.literal("")),
  photosUrl: z.string().url().optional().or(z.literal("")),
  academicYearId: z.string().optional().or(z.literal("")),
  published: z.boolean().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface AcademicYearOption {
  id: string;
  label: string;
  isCurrent: boolean;
}

interface EventFormProps {
  initialData?: any;
  academicYears?: AcademicYearOption[];
}

function extractDateTimeComponents(dateTime: Date | string | null | undefined) {
  if (!dateTime) return { date: "", time: "" };
  const d = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
  const iso = d.toISOString();
  const [dateStr, timeStr] = iso.split("T");
  return { date: dateStr, time: timeStr.substring(0, 5) };
}

export function EventForm({ initialData, academicYears = [] }: EventFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { date: defaultDate, time: defaultTime } = extractDateTimeComponents(initialData?.date);
  const { date: defaultEndDate, time: defaultEndTime } = extractDateTimeComponents(initialData?.endDate);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData ? {
      title: initialData.title || "",
      slug: initialData.slug || "",
      date: defaultDate,
      time: defaultTime,
      endDate: defaultEndDate,
      endTime: defaultEndTime,
      place: initialData.place || "",
      description: initialData.description || "",
      ticketUrl: initialData.ticketUrl || "",
      photosUrl: initialData.photosUrl || "",
      academicYearId: initialData.academicYearId || "",
      published: initialData.published ?? false,
    } : {
      title: "",
      slug: "",
      date: new Date().toISOString().split("T")[0],
      time: "20:00",
      endDate: "",
      endTime: "",
      place: "",
      description: "",
      ticketUrl: "",
      photosUrl: "",
      academicYearId: academicYears.find((y) => y.isCurrent)?.id ?? "",
      published: false,
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    setLoading(true);
    const toastId = toast.loading("Enregistrement en cours...");

    // Combine date + time into ISO string
    const combineDateTimeString = (date: string, time: string): string => {
      if (!date) return "";
      if (!time) return `${date}T00:00:00Z`;
      return `${date}T${time}:00Z`;
    };

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("date", combineDateTimeString(data.date, data.time || ""));
    if (data.endDate) {
      formData.append("endDate", combineDateTimeString(data.endDate, data.endTime || ""));
    }
    formData.append("place", data.place);
    formData.append("description", data.description);
    if (data.ticketUrl) formData.append("ticketUrl", data.ticketUrl);
    if (data.photosUrl) formData.append("photosUrl", data.photosUrl);
    if (data.academicYearId) formData.append("academicYearId", data.academicYearId);
    if (data.published) formData.append("published", "on");

    if (selectedImage) {
      formData.append("cover", selectedImage);
    }

    try {
      let result;
      if (initialData) {
        result = await updateEvent(initialData.slug, formData);
      } else {
        result = await createEvent(formData);
      }

      if (result?.error) {
        toast.error(result.error, { id: toastId });
        setLoading(false);
      } else {
        toast.success("Événement enregistré !", { id: toastId });
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
              <Type className="w-5 h-5 text-gray-500" />
              Informations générales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre <span className="text-red-500">*</span>
                </label>
                <input
                  {...form.register("title")}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${form.formState.errors.title ? "border-red-500" : ""}`}
                  placeholder="Soirée d'intégration"
                />
                {form.formState.errors.title && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL) <span className="text-red-500">*</span>
                </label>
                <input
                  {...form.register("slug")}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border font-mono ${form.formState.errors.slug ? "border-red-500" : ""}`}
                  placeholder="soiree-integration-2025"
                />
                {form.formState.errors.slug && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.slug.message}</p>
                )}
              </div>

              {academicYears.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Année académique
                  </label>
                  <select
                    {...form.register("academicYearId")}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                  >
                    <option value="">— Non assigné —</option>
                    {academicYears.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.label}{year.isCurrent ? " (en cours)" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date début <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        {...form.register("date")}
                        className={`w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${form.formState.errors.date ? "border-red-500" : ""}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure début <span className="text-gray-400 font-normal">(optionnel)</span>
                    </label>
                    <input
                      type="time"
                      {...form.register("time")}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date fin <span className="text-gray-400 font-normal">(optionnel)</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="date"
                        {...form.register("endDate")}
                        className="w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure fin <span className="text-gray-400 font-normal">(optionnel)</span>
                    </label>
                    <input
                      type="time"
                      {...form.register("endTime")}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lieu <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register("place")}
                    className={`w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border ${form.formState.errors.place ? "border-red-500" : ""}`}
                    placeholder="Campus de Rennes"
                  />
                </div>
                {form.formState.errors.place && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.place.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" />
              Détails
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...form.register("description")}
                  rows={6}
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-3 border ${form.formState.errors.description ? "border-red-500" : ""}`}
                  placeholder="Description détaillée de l'événement..."
                />
                {form.formState.errors.description && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien billetterie</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register("ticketUrl")}
                    className="w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                    placeholder="https://billetterie..."
                  />
                </div>
                {form.formState.errors.ticketUrl && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.ticketUrl.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien galerie photos</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    {...form.register("photosUrl")}
                    className="w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2.5 border"
                    placeholder="https://photos.app.goo.gl/..."
                  />
                </div>
                {form.formState.errors.photosUrl && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.photosUrl.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Colonne droite */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Média</h3>
            <ImageUpload
              label="Image de couverture"
              defaultImage={initialData?.cover}
              onImageChange={setSelectedImage}
            />
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publication</h3>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...form.register("published")}
                  id="published"
                  className="h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="published" className="ml-3 block text-sm font-medium text-gray-900 cursor-pointer">
                  Publier l&apos;événement
                </label>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button type="submit" disabled={loading} className="w-full justify-center">
                {loading ? "Enregistrement..." : initialData ? "Mettre à jour" : "Créer l'événement"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
