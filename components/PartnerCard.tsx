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
    <div className="group bg-white flex flex-col h-full hover:outline hover:outline-1 hover:outline-brand-rouge transition-all">

      {/* Bandeau catégorie + logo */}
      <div className="flex items-center justify-between gap-4 px-5 py-3 bg-brand-craie border-b border-brand-noir/8">
        <span className="font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/40">
          {categoryLabels[partner.category] || partner.category}
        </span>
        {partner.logo && (
          <div className="relative w-8 h-8 shrink-0">
            <Image
              src={migrateImagePath(partner.logo)}
              alt={`Logo ${partner.name}`}
              fill
              sizes="32px"
              className="object-contain"
              loading="lazy"
              placeholder={getBlurPlaceholder(partner.logo) ? "blur" : "empty"}
              blurDataURL={getBlurPlaceholder(partner.logo)}
              unoptimized={migrateImagePath(partner.logo).startsWith("/api/images/")}
            />
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="flex-1 p-5">
        <div className="flex items-start gap-1.5 mb-3">
          <MapPin className="h-3.5 w-3.5 text-brand-noir/30 shrink-0 mt-0.5" />
          <span className="font-lato text-xs text-brand-noir/40">{partner.city}</span>
        </div>

        <h3 className="font-spartan font-black text-xl text-brand-noir leading-tight mb-4 group-hover:text-brand-rouge transition-colors">
          {partner.name}
        </h3>

        <ul className="space-y-1.5">
          {partner.advantages.map((advantage, index) => (
            <li key={index} className="flex items-start gap-2 font-lato text-sm text-brand-noir/65">
              <span className="text-brand-rouge shrink-0 font-bold leading-snug">—</span>
              <span>{advantage}</span>
            </li>
          ))}
        </ul>

        {partner.conditions && (
          <p className="font-lato text-xs text-brand-noir/35 italic mt-3">{partner.conditions}</p>
        )}
      </div>

      {/* Actions */}
      {(partner.website || partner.address) && (
        <div className="flex border-t border-brand-noir/8">
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/50 hover:text-brand-rouge hover:bg-brand-craie transition-colors"
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
              className={`flex items-center justify-center gap-2 px-4 py-3 font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/50 hover:text-brand-rouge hover:bg-brand-craie transition-colors ${partner.website ? "border-l border-brand-noir/8" : "flex-1"}`}
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
