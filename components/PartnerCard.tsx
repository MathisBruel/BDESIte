import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";
import type { Partner } from "@/lib/schemas";
import { categoryLabels } from "@/lib/utils";
import { migrateImagePath } from "@/lib/image-url";
import { getBlurPlaceholder } from "@/lib/blur-placeholders";

interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="group bg-white border border-brand-noir/10 hover:border-brand-rouge hover:shadow-lg transition-all duration-200 flex flex-col h-full">

      {/* Logo */}
      <div className="flex items-center justify-center h-28 bg-brand-craie border-b border-brand-noir/8 px-6 shrink-0">
        {partner.logo ? (
          <div className="relative w-20 h-14">
            <Image
              src={migrateImagePath(partner.logo)}
              alt={`Logo ${partner.name}`}
              fill
              sizes="80px"
              className="object-contain"
              loading="lazy"
              placeholder={getBlurPlaceholder(partner.logo) ? "blur" : "empty"}
              blurDataURL={getBlurPlaceholder(partner.logo)}
              unoptimized={migrateImagePath(partner.logo).startsWith("/api/images/")}
            />
          </div>
        ) : (
          <span className="font-spartan font-black text-4xl text-brand-noir/10">
            {partner.name[0]}
          </span>
        )}
      </div>

      {/* Catégorie + ville */}
      <div className="flex items-center justify-between gap-3 px-5 py-2.5 border-b border-brand-noir/8">
        <span className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge">
          {categoryLabels[partner.category] || partner.category}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <MapPin className="h-3 w-3 text-brand-noir/25" />
          <span className="font-lato text-xs text-brand-noir/40">{partner.city}</span>
        </div>
      </div>

      {/* Contenu */}
      <div className="flex-1 p-5">
        <h3 className="font-spartan font-black text-xl text-brand-noir group-hover:text-brand-rouge transition-colors leading-tight mb-4">
          {partner.name}
        </h3>

        <ul className="space-y-2">
          {partner.advantages.map((advantage, index) => (
            <li key={index} className="flex items-start gap-2 font-lato text-sm text-brand-noir/65">
              <span className="text-brand-rouge shrink-0 font-bold leading-snug">—</span>
              <span>{advantage}</span>
            </li>
          ))}
        </ul>

        {partner.conditions && (
          <p className="font-lato text-xs text-brand-noir/35 italic mt-4">{partner.conditions}</p>
        )}
      </div>

      {/* Liens */}
      {(partner.website || partner.address) && (
        <div className="flex border-t border-brand-noir/8 shrink-0">
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/45 hover:text-brand-rouge hover:bg-brand-craie transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Site web
            </a>
          )}
          {partner.address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partner.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir sur la carte"
              className={`flex items-center justify-center gap-2 px-4 py-3 font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/45 hover:text-brand-rouge hover:bg-brand-craie transition-colors ${partner.website ? "border-l border-brand-noir/8" : "flex-1"}`}
            >
              <MapPin className="h-3.5 w-3.5" />
              {!partner.website && "Localisation"}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
