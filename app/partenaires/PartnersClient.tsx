"use client";

import { useState, useMemo } from "react";
import { PartnerCard } from "@/components/PartnerCard";
import { Filters } from "@/components/Filters";
import { EmptyState } from "@/components/EmptyState";
import type { Partner } from "@/lib/schemas";

interface PartnersClientProps {
  partners: Partner[];
  categories: string[];
  cities: string[];
}

export function PartnersClient({ partners, categories, cities }: PartnersClientProps) {
  const [filters, setFilters] = useState({ category: "", city: "" });

  const filteredPartners = useMemo(() => {
    return partners.filter((partner: Partner) => {
      const matchCategory = !filters.category || partner.category === filters.category;
      const matchCity = !filters.city || partner.city === filters.city;
      return matchCategory && matchCity;
    });
  }, [partners, filters]);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="mb-8">
          <Filters
            categories={categories}
            cities={cities}
            onFilterChange={(newFilters) => setFilters(newFilters)}
          />
        </div>

        <div className="mb-6">
          <p className="font-lato text-sm text-brand-noir/45">
            {filteredPartners.length} partenaire{filteredPartners.length > 1 ? "s" : ""} trouvé
            {filteredPartners.length > 1 ? "s" : ""}
          </p>
        </div>

        {filteredPartners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPartners.map((partner: Partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aucun partenaire trouvé"
            description="Essayez de modifier vos filtres pour voir plus de résultats."
          />
        )}

      </div>
    </section>
  );
}
