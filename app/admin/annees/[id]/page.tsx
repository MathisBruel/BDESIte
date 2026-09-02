import { getAcademicYearById } from "@/lib/data";
import { AcademicYearForm } from "@/components/admin/AcademicYearForm";
import { notFound } from "next/navigation";

export default async function EditAcademicYearPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const year = await getAcademicYearById(id);

  if (!year) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-spartan">
          Modifier — <span className="text-brand-red">{year.label}</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Modifiez les informations de cette année académique.</p>
      </div>
      <AcademicYearForm initialData={year} />
    </div>
  );
}
