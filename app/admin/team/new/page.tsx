import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { getAcademicYears } from "@/lib/data";

export default async function NewTeamMemberPage() {
  const years = await getAcademicYears();
  const yearOptions = years.map((y) => ({ id: y.id, label: y.label, isCurrent: y.isCurrent }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-spartan">
          Nouveau <span className="text-brand-red">Membre</span>
        </h1>
        <p className="text-gray-500 mt-1">Ajoutez un nouveau membre au BDE</p>
      </div>
      <TeamMemberForm academicYears={yearOptions} />
    </div>
  );
}
