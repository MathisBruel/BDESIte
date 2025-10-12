import Image from "next/image";
import { Badge } from "./Badge";
import { Button } from "./Button";
import type { Partner } from "@/lib/schemas";
import { categoryLabels } from "@/lib/utils";

interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold font-spartan text-brand-black mb-1">
            {partner.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{partner.city}</span>
            <span>•</span>
            <span>{categoryLabels[partner.category] || partner.category}</span>
          </div>
        </div>
        {partner.logo && (
          <div className="relative w-16 h-16 ml-4 flex-shrink-0">
            <Image
              src={partner.logo}
              alt={`Logo ${partner.name}`}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>

      <Badge variant="red" className="w-fit mb-4">
        Carte BDE requise
      </Badge>

      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-2">Avantages :</h4>
        <ul className="space-y-1 mb-4">
          {partner.advantages.map((advantage, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start">
              <span className="text-brand-red mr-2 flex-shrink-0">•</span>
              <span>{advantage}</span>
            </li>
          ))}
        </ul>

        {partner.conditions && (
          <p className="text-xs text-gray-500 italic mb-4">{partner.conditions}</p>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        {partner.website && (
          <Button
            href={partner.website}
            variant="primary"
            className="flex-1 text-sm"
          >
            Voir le site
          </Button>
        )}
        {partner.address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partner.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Voir sur la carte"
          >
            📍
          </a>
        )}
      </div>
    </div>
  );
}

