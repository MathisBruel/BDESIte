"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Zap, AlertCircle } from "lucide-react";

export function ImageOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleOptimize = async () => {
    if (!confirm("Êtes-vous sûr ? Cela va optimiser et compresser toutes les images du site.")) {
      return;
    }

    setIsOptimizing(true);
    const toastId = toast.loading("Optimisation en cours... Cela peut prendre quelques minutes.");

    try {
      const response = await fetch("/api/admin/optimize-images", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Erreur lors de l'optimisation", { id: toastId });
        return;
      }

      setResults(data.results);
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(`Erreur: ${String(error)}`, { id: toastId });
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium text-blue-900">Optimisation des images</h3>
          <p className="text-sm text-blue-800 mt-1">
            Cette action va compresser toutes les images de votre site et créer des versions WebP pour améliorer les performances de chargement. Cela peut prendre quelques minutes.
          </p>
        </div>
      </div>

      <Button
        onClick={handleOptimize}
        disabled={isOptimizing}
        className="gap-2"
      >
        <Zap className="w-4 h-4" />
        {isOptimizing ? "Optimisation en cours..." : "Optimiser toutes les images"}
      </Button>

      {results && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg space-y-2">
          <div className="font-medium text-green-900">Résultats de l'optimisation:</div>
          <ul className="text-sm text-green-800 space-y-1">
            <li>✓ Images traitées: {results.processed}</li>
            <li>✓ Taille avant: {(results.totalSizeBefore / 1024 / 1024).toFixed(2)} MB</li>
            <li>✓ Taille après: {(results.totalSizeAfter / 1024 / 1024).toFixed(2)} MB</li>
            {results.failed > 0 && (
              <li className="text-red-600">⚠ Erreurs: {results.failed}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
