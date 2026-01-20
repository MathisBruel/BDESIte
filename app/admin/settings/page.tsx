import { getSettings } from "@/lib/data";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-spartan">
          <span className="text-brand-red">Paramètres</span> du site
        </h1>
        <p className="text-gray-500 mt-1">Configurez les informations générales du BDE</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
