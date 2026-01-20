import { getEvents, getPartners } from "@/lib/data";
import { Event, Partner } from "@/lib/schemas";
import { StatsCard } from "@/components/admin/StatsCard";
import { Calendar, Users, Eye, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/format-date";

export default async function AdminDashboard() {
  const events = await getEvents();
  const partners = await getPartners();

  const activePartners = partners.filter((p: any) => p.active).length;
  const upcomingEvents = events.filter((e: any) => new Date(e.date) >= new Date()).length;

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-900 font-spartan mb-2">
            Tableau de bord <span className="text-brand-red">Sup&apos;RNova</span>
          </h1>
          <p className="text-gray-500 text-lg">Bienvenue sur l&apos;interface d&apos;administration de votre BDE.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Événements à venir"
          value={upcomingEvents}
          icon={Calendar}
          description="Sur le total des événements"
          className="border-l-4 border-l-brand-red hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Partenaires Actifs"
          value={activePartners}
          icon={Users}
          description={`${partners.length} partenaires au total`}
          className="border-l-4 border-l-brand-yellow hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Total Événements"
          value={events.length}
          icon={TrendingUp}
          description="Depuis le début de l'année"
          className="border-l-4 border-l-gray-800 hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Vues du site"
          value="1.2k"
          icon={Eye}
          description="Ce mois-ci"
          trend={{ value: 12, label: "vs mois dernier", positive: true }}
          className="border-l-4 border-l-brand-red hover:shadow-md transition-shadow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 font-spartan flex items-center gap-2">
            <span className="w-2 h-8 bg-brand-red rounded-full"></span>
            Événements récents
          </h2>
          <div className="space-y-4">
            {events.slice(0, 5).map((event: any) => (
              <div key={event.slug} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 group">
                <div>
                  <p className="font-bold text-gray-900 font-spartan group-hover:text-brand-red transition-colors">{event.title}</p>
                  <p className="text-xs text-gray-500 font-medium">{formatDate(event.date)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${event.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {event.published ? 'Publié' : 'Brouillon'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 font-spartan flex items-center gap-2">
            <span className="w-2 h-8 bg-brand-yellow rounded-full"></span>
            Derniers partenaires
          </h2>
          <div className="space-y-4">
            {partners.slice(0, 5).map((partner: any) => (
              <div key={partner.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100 group">
                <div>
                  <p className="font-bold text-gray-900 font-spartan group-hover:text-brand-yellow transition-colors">{partner.name}</p>
                  <p className="text-xs text-gray-500 font-medium">{partner.category}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${partner.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {partner.active ? 'Actif' : 'Inactif'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
