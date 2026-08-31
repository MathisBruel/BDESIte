import { EventForm } from "@/components/admin/EventForm";
import { getAcademicYears } from "@/lib/data";

export default async function NewEventPage() {
  const years = await getAcademicYears();
  const yearOptions = years.map((y) => ({ id: y.id, label: y.label, isCurrent: y.isCurrent }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-spartan">Nouvel événement</h1>
        <p className="text-gray-500 text-sm mt-1">Créez un nouvel événement.</p>
      </div>
      <EventForm academicYears={yearOptions} />
    </div>
  );
}
