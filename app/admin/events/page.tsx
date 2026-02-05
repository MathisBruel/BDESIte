import { getEvents } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { deleteEvent } from "@/lib/actions-events";
import { Plus, Pencil, Calendar, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";
import { formatDate } from "@/lib/format-date";
import { Event } from "@/lib/schemas";

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-spartan">Événements</h1>
          <p className="text-gray-500 text-sm mt-1">Gérez les événements de l&apos;association.</p>
        </div>
        <Button href="/admin/events/new" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvel événement
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">Événement</th>
                <th className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">Date & Lieu</th>
                <th className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">Statut</th>
                <th className="px-6 py-4 font-semibold text-gray-900 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event: any) => (
                <tr key={event.slug} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {event.cover ? (
                          <Image
                            src={getImageUrl(event.cover)}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Calendar className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{event.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{event.place}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={event.published ? "published" : "draft"} />
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/events/${event.slug}`}
                        className="p-2 text-gray-500 hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton
                        action={async () => {
                          "use server";
                          await deleteEvent(event.slug);
                        }}
                        confirmMessage="Êtes-vous sûr de vouloir supprimer cet événement ?"
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Aucun événement trouvé. Créez-en un pour commencer !
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
