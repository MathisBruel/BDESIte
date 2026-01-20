import { getPartners } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { deletePartner } from "@/lib/actions-partners";
import { Plus, Pencil, Building2, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";
import { Partner } from "@/lib/schemas";

export default async function AdminPartnersPage() {
  const partners = await getPartners();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-spartan">Partenaires</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez les partenaires et leurs avantages.</p>
        </div>
        <Button href="/admin/partners/new" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouveau partenaire
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900">Partenaire</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Catégorie & Lieu</th>
                <th className="px-6 py-4 font-semibold text-gray-900">Statut</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {partners.map((partner: any) => (
                <tr key={partner.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 p-2 border border-gray-100">
                        {partner.logo ? (
                          <Image
                            src={getImageUrl(partner.logo)}
                            alt={partner.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Building2 className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="font-medium text-gray-900">{partner.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-gray-700 font-medium">
                        {partner.category}
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{partner.city}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={partner.active ? "active" : "inactive"} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/partners/${partner.id}`}
                        className="p-2 text-gray-500 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        action={async () => {
                          "use server";
                          await deletePartner(partner.id);
                        }}
                        confirmMessage="Êtes-vous sûr de vouloir supprimer ce partenaire ?"
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {partners.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Aucun partenaire trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
