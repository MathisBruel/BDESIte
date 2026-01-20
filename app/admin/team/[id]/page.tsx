import { getTeamMemberById } from "@/lib/data";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { notFound } from "next/navigation";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-spartan">
          Modifier <span className="text-brand-red">{member.name}</span>
        </h1>
        <p className="text-gray-500 mt-1">Modifiez les informations du membre</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <TeamMemberForm member={member} />
      </div>
    </div>
  );
}
