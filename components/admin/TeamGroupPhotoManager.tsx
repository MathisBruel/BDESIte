"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { updateYearGroupPhoto } from "@/lib/actions-years";
import { getImageUrl } from "@/lib/image-url";

interface Year {
  id: string;
  label: string;
  isCurrent: boolean;
  teamBackgroundImage: string | null;
}

export function TeamGroupPhotoManager({ years }: { years: Year[] }) {
  const [activeYearId, setActiveYearId] = useState(
    years.find((y) => y.isCurrent)?.id ?? years[0]?.id ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const activeYear = years.find((y) => y.id === activeYearId);
  const preview =
    localPreviews[activeYearId] ||
    (activeYear?.teamBackgroundImage ? getImageUrl(activeYear.teamBackgroundImage) : null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalPreviews((p) => ({ ...p, [activeYearId]: URL.createObjectURL(file) }));

    const fd = new FormData();
    fd.append("photo", file);

    setLoading(true);
    const toastId = toast.loading("Upload en cours...");
    const result = await updateYearGroupPhoto(activeYearId, fd);
    setLoading(false);

    if (result?.error) {
      toast.error(result.error, { id: toastId });
    } else {
      toast.success("Photo de groupe mise à jour !", { id: toastId });
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  if (years.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Photo de groupe</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Affichée en haut de la section équipe sur la page d&apos;accueil.
        </p>
      </div>

      {/* Tabs années */}
      {years.length > 1 && (
        <div className="flex border-b border-gray-100">
          {years.map((year) => (
            <button
              key={year.id}
              onClick={() => setActiveYearId(year.id)}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                activeYearId === year.id
                  ? "border-brand-red text-brand-red"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {year.label}
              {year.isCurrent && <span className="ml-1 text-green-500">●</span>}
            </button>
          ))}
        </div>
      )}

      <div className="p-6">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />

        {preview ? (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
            <Image src={preview} alt="Photo de groupe" fill className="object-cover object-top" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                disabled={loading}
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-2 bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Changer la photo
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
            className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 hover:border-brand-red hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-3 group"
          >
            <div className="p-3 rounded-full bg-gray-100 group-hover:bg-red-50 transition-colors">
              <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-brand-red" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                {loading ? "Upload en cours..." : "Ajouter une photo de groupe"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP</p>
            </div>
          </button>
        )}

        {preview && (
          <button
            type="button"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
            className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-medium text-gray-500 hover:text-brand-red transition-colors py-2 border border-gray-200 rounded-lg hover:border-brand-red"
          >
            <Upload className="w-3.5 h-3.5" />
            {loading ? "Upload en cours..." : "Remplacer la photo"}
          </button>
        )}
      </div>
    </div>
  );
}
