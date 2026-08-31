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
    <div className="group bg-white border border-brand-noir/8 hover:border-brand-rouge transition-colors flex flex-col h-full">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 p-6 border-b border-brand-noir/8">
        <div className="flex-1 min-w-0">
          <h3 className="font-spartan font-black text-lg text-brand-noir leading-tight mb-1 group-hover:text-brand-rouge transition-colors">
            {partner.name}
          </h3>
          <div className="flex items-center gap-1.5 font-lato text-xs text-brand-noir/45">
            <MapPin className="h-3 w-3 shrink-0" />
            <span>{partner.city}</span>
            <span>·</span>
            <span>{categoryLabels[partner.category] || partner.category}</span>
          </div>
        </div>
        {partner.logo && (
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src={migrateImagePath(partner.logo)}
              alt={`Logo ${partner.name}`}
              fill
              sizes="48px"
              className="object-contain"
              loading="lazy"
              placeholder={getBlurPlaceholder(partner.logo) ? "blur" : "empty"}
              blurDataURL={getBlurPlaceholder(partner.logo)}
              unoptimized={migrateImagePath(partner.logo).startsWith("/api/images/")}
            />
          </div>
        )}
      </div>

      {/* Avantages */}
      <div className="flex-1 p-6">
        <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge mb-3">
          Carte BDE requise
        </div>
        <ul className="space-y-1.5 mb-4">
          {partner.advantages.map((advantage, index) => (
            <li key={index} className="flex items-start gap-2 font-lato text-sm text-brand-noir/70">
              <span className="text-brand-rouge mt-0.5 shrink-0 font-bold">—</span>
              <span>{advantage}</span>
            </li>
          ))}
        </ul>
        {partner.conditions && (
          <p className="font-lato text-xs text-brand-noir/40 italic">{partner.conditions}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex border-t border-brand-noir/8">
        {partner.website && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/60 hover:text-brand-rouge hover:bg-brand-craie transition-colors"
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
            className={`flex items-center justify-center gap-2 px-4 py-3 font-spartan font-bold text-xs uppercase tracking-widest text-brand-noir/60 hover:text-brand-rouge hover:bg-brand-craie transition-colors ${partner.website ? "border-l border-brand-noir/8" : "flex-1"}`}
          >
            <MapPin className="h-3.5 w-3.5" />
            {!partner.website && "Localisation"}
          </a>
        )}
      </div>
    </div>
  );
}
