"use client";

import { useState } from "react";
import { categoryLabels } from "@/lib/utils";
import { X } from "lucide-react";

interface FiltersProps {
  categories: string[];
  cities: string[];
  onFilterChange: (filters: { category: string; city: string; search: string }) => void;
}

export function Filters({ categories, cities, onFilterChange }: FiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const update = (patch: Partial<{ search: string; category: string; city: string }>) => {
    const next = {
      search,
      category: selectedCategory,
      city: selectedCity,
      ...patch,
    };
    onFilterChange(next);
  };

  const hasFilters = search || selectedCategory || selectedCity;

  const reset = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedCity("");
    onFilterChange({ search: "", category: "", city: "" });
  };

  return (
    <div className="border border-brand-noir/10 bg-brand-craie p-5">
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Recherche texte */}
        <div className="flex-[2]">
          <label className="block font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/40 mb-2">
            Recherche
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); update({ search: e.target.value }); }}
            placeholder="Nom du partenaire…"
            className="w-full bg-white border border-brand-noir/15 px-4 py-2.5 font-lato text-sm text-brand-noir placeholder:text-brand-noir/30 focus:outline-none focus:border-brand-rouge transition-colors"
          />
        </div>

        {/* Catégorie */}
        <div className="flex-1">
          <label htmlFor="category" className="block font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/40 mb-2">
            Catégorie
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); update({ category: e.target.value }); }}
            className="w-full bg-white border border-brand-noir/15 px-4 py-2.5 font-lato text-sm text-brand-noir focus:outline-none focus:border-brand-rouge transition-colors cursor-pointer appearance-none"
          >
            <option value="">Toutes</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryLabels[cat] || cat}
              </option>
            ))}
          </select>
        </div>

        {/* Ville */}
        <div className="flex-1">
          <label htmlFor="city" className="block font-spartan font-black text-xs uppercase tracking-widest text-brand-noir/40 mb-2">
            Ville
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => { setSelectedCity(e.target.value); update({ city: e.target.value }); }}
            className="w-full bg-white border border-brand-noir/15 px-4 py-2.5 font-lato text-sm text-brand-noir focus:outline-none focus:border-brand-rouge transition-colors cursor-pointer appearance-none"
          >
            <option value="">Toutes</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Reset */}
        {hasFilters && (
          <div className="flex items-end">
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-rouge text-white font-spartan font-bold text-xs uppercase tracking-widest hover:bg-brand-noir transition-colors whitespace-nowrap"
            >
              <X className="h-3.5 w-3.5" />
              Effacer
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
