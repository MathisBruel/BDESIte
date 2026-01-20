"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteButtonProps {
  action: () => Promise<void | { error?: string }>;
  confirmMessage: string;
}

export function DeleteButton({ action, confirmMessage }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm(confirmMessage)) return;

    setLoading(true);
    try {
      const result = await action();
      if (result && typeof result === 'object' && 'error' in result) {
        toast.error(result.error);
      } else {
        toast.success("Suppression réussie");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button
        type="submit"
        disabled={loading}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        title="Supprimer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}
