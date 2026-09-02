"use client";

import { useState, useMemo } from "react";
import { PartnerCard } from "@/components/PartnerCard";
import { Filters } from "@/components/Filters";
import { Container } from "@/components/ui/Container";
import type { Partner } from "@/lib/schemas";

interface PartnersClientProps {
  partners: Partner[];
  categories: string[];
  cities: string[];
}

export function PartnersClient({ partners, categories, cities }: PartnersClientProps) {
  const [filters, setFilters] = useState({ category: "", city: "", search: "" });

  const filteredPartners = useMemo(() => {
    return partners.filter((partner: Partner) => {
      const matchCategory = !filters.category || partner.category === filters.category;
      const matchCity = !filters.city || partner.city === filters.city;
      const matchSearch = !filters.search || partner.name.toLowerCase().includes(filters.search.toLowerCase());
      return matchCategory && matchCity && matchSearch;
    });
  }, [partners, filters]);

  return (
    <section className="bg-white border-t border-brand-noir/8">
      <Container>
        <div className="py-14">

          {/* Filtres */}
          <div className="mb-8">
            <Filters
              categories={categories}
              cities={cities}
              onFilterChange={setFilters}
            />
          </div>

          {/* Compteur */}
          <div className="mb-6">
            <p className="font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/35">
              {filteredPartners.length} partenaire{filteredPartners.length > 1 ? "s" : ""}{" "}
              {filters.search || filters.category || filters.city ? "trouvé" : "au total"}
              {filteredPartners.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Grille */}
          {filteredPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPartners.map((partner: Partner) => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-brand-noir/10">
              <p className="font-spartan font-black text-brand-noir/20 text-sm uppercase tracking-widest">
                Aucun partenaire trouvé
              </p>
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}
