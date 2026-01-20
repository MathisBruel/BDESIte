import { TeamMemberForm } from "@/components/admin/TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-spartan">
          Nouveau <span className="text-brand-red">Membre</span>
        </h1>
        <p className="text-gray-500 mt-1">Ajoutez un nouveau membre au BDE</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <TeamMemberForm />
      </div>
    </div>
  );
}
