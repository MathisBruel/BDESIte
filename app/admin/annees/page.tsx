import { getAcademicYears } from "@/lib/data";
import { deleteAcademicYear, setCurrentYear } from "@/lib/actions-years";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { Plus, Pencil, Star } from "lucide-react";
import Link from "next/link";

export default async function AdminAnneesPage() {
  const years = await getAcademicYears();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-spartan">Années académiques</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gérez les années scolaires. L'année "en cours" est utilisée pour les nouvelles inscriptions et le filtre par défaut.
          </p>
        </div>
        <Button href="/admin/annees/new" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle année
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-gray-900">Année</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Période</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Événements</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Membres</th>
              <th className="px-6 py-4 font-semibold text-gray-900">Statut</th>
              <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {years.map((year) => (
              <tr key={year.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    {year.isCurrent && <Star className="w-4 h-4 text-amber-500 fill-amber-400" />}
                    {year.label}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">{year.slug}</div>
                </td>
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  {new Date(year.startDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Paris" })}
                  {" → "}
                  {new Date(year.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Paris" })}
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700 font-medium">{year._count.events}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700 font-medium">{year._count.memberships}</span>
                </td>
                <td className="px-6 py-4">
                  {year.isCurrent ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      En cours
                    </span>
                  ) : (
                    <form>
                      <button
                        formAction={async () => {
                          "use server";
                          await setCurrentYear(year.id);
                        }}
                        className="text-xs text-gray-500 hover:text-amber-600 hover:underline"
                      >
                        Définir en cours
                      </button>
                    </form>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/annees/${year.id}`}
                      className="p-2 text-gray-500 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton
                      action={async () => {
                        "use server";
                        await deleteAcademicYear(year.id);
                      }}
                      confirmMessage={`Supprimer l'année ${year.label} ? Les événements liés ne seront pas supprimés.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {years.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  Aucune année créée.{" "}
                  <Link href="/admin/annees/new" className="text-brand-red hover:underline">
                    Créez-en une maintenant.
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
