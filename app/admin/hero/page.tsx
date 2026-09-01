import { getHeroPhotos } from "@/lib/actions-hero";
import { HeroPhotoManager } from "@/components/admin/HeroPhotoManager";
import { ImageIcon } from "lucide-react";

export default async function AdminHeroPage() {
  const photos = await getHeroPhotos();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-spartan flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-brand-red" />
            Photos Hero
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gérez les photos du diaporama en page d&apos;accueil.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <HeroPhotoManager initialPhotos={photos} />
      </div>
    </div>
  );
}
