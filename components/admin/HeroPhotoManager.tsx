"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Trash2, Upload, Eye, EyeOff, ImageIcon, Loader2 } from "lucide-react";
import { addHeroPhoto, deleteHeroPhoto, toggleHeroPhoto, seedDefaultHeroPhotos, updateHeroPhotoPosition } from "@/lib/actions-hero";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

interface HeroPhoto {
  id: string;
  path: string;
  position: string;
  order: number;
  active: boolean;
}

interface HeroPhotoManagerProps {
  initialPhotos: HeroPhoto[];
}

export function HeroPhotoManager({ initialPhotos }: HeroPhotoManagerProps) {
  const [photos, setPhotos] = useState<HeroPhoto[]>(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const toastId = toast.loading("Upload en cours...");

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("photo", file);
      const result = await addHeroPhoto(fd);
      if (result?.error) {
        toast.error(result.error, { id: toastId });
        setUploading(false);
        return;
      }
    }

    toast.success("Photo(s) ajoutée(s) !", { id: toastId });
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    window.location.reload();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette photo ?")) return;
    const toastId = toast.loading("Suppression...");
    const result = await deleteHeroPhoto(id) as { error?: string; success?: boolean };
    if (result?.error) {
      toast.error(result.error, { id: toastId });
    } else {
      toast.success("Photo supprimée", { id: toastId });
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    const result = await toggleHeroPhoto(id, !current);
    if (result?.error) {
      toast.error(result.error);
    } else {
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, active: !current } : p)));
    }
  };

  const handlePosition = async (id: string, position: "center top" | "center 25%" | "center center" | "center 75%" | "center bottom") => {
    await updateHeroPhotoPosition(id, position);
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, position } : p)));
  };

  const handleSeed = async () => {
    setSeeding(true);
    const toastId = toast.loading("Initialisation des photos par défaut...");
    const result = await seedDefaultHeroPhotos();
    if (result?.error) {
      toast.error(result.error, { id: toastId });
    } else {
      toast.success("Photos par défaut ajoutées !", { id: toastId });
      window.location.reload();
    }
    setSeeding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{photos.length} photo(s) · {photos.filter((p) => p.active).length} active(s)</p>
        </div>
        <div className="flex gap-3">
          {photos.length === 0 && (
            <Button variant="outline" onClick={handleSeed} disabled={seeding}>
              {seeding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ImageIcon className="w-4 h-4 mr-2" />}
              Photos par défaut
            </Button>
          )}
          <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
            Ajouter photo(s)
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Aucune photo hero</p>
          <p className="text-sm">Ajoutez des photos ou utilisez les photos par défaut</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`rounded-xl overflow-hidden border-2 transition-all ${
                photo.active ? "border-brand-red/20" : "border-gray-200 opacity-50"
              }`}
            >
              {/* Thumbnail */}
              <div className="aspect-[4/3] relative bg-gray-100 group">
                <Image
                  src={photo.path}
                  alt="Photo hero"
                  fill
                  className="object-cover"
                  style={{ objectPosition: photo.position }}
                  sizes="(max-width: 768px) 50vw, 20vw"
                  unoptimized={photo.path.startsWith("/photos-hero/")}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleToggle(photo.id, photo.active)}
                    className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
                    title={photo.active ? "Désactiver" : "Activer"}
                  >
                    {photo.active ? <Eye className="w-4 h-4 text-gray-700" /> : <EyeOff className="w-4 h-4 text-gray-700" />}
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-2 bg-white/90 rounded-lg hover:bg-red-50 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Position picker */}
              <div className="bg-white px-2 py-2 flex items-center gap-1 justify-between">
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Cadrage</span>
                <div className="flex gap-1">
                  {([
                    { value: "center top",    label: "H",   title: "Haut" },
                    { value: "center 25%",    label: "H-C", title: "Haut-Centre" },
                    { value: "center center", label: "C",   title: "Centre" },
                    { value: "center 75%",    label: "B-C", title: "Bas-Centre" },
                    { value: "center bottom", label: "B",   title: "Bas" },
                  ] as const).map(({ value, label, title }) => (
                    <button
                      key={value}
                      onClick={() => handlePosition(photo.id, value)}
                      title={title}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase transition-colors ${
                        photo.position === value
                          ? "bg-brand-red text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
