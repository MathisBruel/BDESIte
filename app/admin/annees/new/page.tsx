import { AcademicYearForm } from "@/components/admin/AcademicYearForm";

export default function NewAcademicYearPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-spartan">Nouvelle année académique</h1>
        <p className="text-gray-500 text-sm mt-1">Créez une nouvelle année scolaire.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <AcademicYearForm />
      </div>
    </div>
  );
}
