import { getTeamMemberById, getAcademicYears } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { notFound } from "next/navigation";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [member, years, memberships] = await Promise.all([
    getTeamMemberById(id),
    getAcademicYears(),
    prisma.teamMembership.findMany({ where: { teamMemberId: id } }),
  ]);

  if (!member) notFound();

  const yearOptions = years.map((y) => ({ id: y.id, label: y.label, isCurrent: y.isCurrent }));
  const memberYearIds = memberships.map((m) => m.academicYearId);
  const memberYearPhotos: Record<string, string> = {};
  for (const m of memberships) {
    if (m.photo) memberYearPhotos[m.academicYearId] = m.photo;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-spartan">
          Modifier <span className="text-brand-red">{member.name}</span>
        </h1>
        <p className="text-gray-500 mt-1">Modifiez les informations du membre</p>
      </div>
      <TeamMemberForm
        member={{ ...member, memberYearIds, memberYearPhotos }}
        academicYears={yearOptions}
      />
    </div>
  );
}
