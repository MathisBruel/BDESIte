"use client";

import { useState } from "react";
import { categoryLabels } from "@/lib/utils";

interface FiltersProps {
  categories: string[];
  cities: string[];
  onFilterChange: (filters: { category: string; city: string }) => void;
}

export function Filters({ categories, cities, onFilterChange }: FiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({ category, city: selectedCity });
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    onFilterChange({ category: selectedCategory, city });
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedCity("");
    onFilterChange({ category: "", city: "" });
  };

  return (
    <div className="bg-gradient-to-br from-brand-pale/30 to-white border-2 border-brand-yellow/30 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-bold font-spartan text-brand-red mb-2">
            🏷️ Catégorie
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all font-medium text-gray-700 hover:border-brand-red cursor-pointer"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {categoryLabels[cat] || cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="city" className="block text-sm font-bold font-spartan text-brand-red mb-2">
            📍 Ville
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white shadow-sm focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all font-medium text-gray-700 hover:border-brand-red cursor-pointer"
          >
            <option value="">Toutes les villes</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {(selectedCategory || selectedCity) && (
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-6 py-3 text-sm font-semibold text-brand-red hover:text-white bg-white hover:bg-brand-red border-2 border-brand-red rounded-xl transition-all hover:scale-105"
            >
              ✕ Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

