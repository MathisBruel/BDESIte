import { EventForm } from "@/components/admin/EventForm";
import { prisma } from "@/lib/prisma";
import { getAcademicYears } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [event, years] = await Promise.all([
    prisma.event.findUnique({ where: { slug } }),
    getAcademicYears(),
  ]);

  if (!event) notFound();

  const formattedEvent = {
    ...event,
    date: new Date(event.date).toISOString().split("T")[0],
    endDate: event.endDate ? new Date(event.endDate).toISOString().split("T")[0] : "",
    ticketUrl: event.ticketUrl || "",
    photosUrl: event.photosUrl || "",
    academicYearId: event.academicYearId || "",
  };

  const yearOptions = years.map((y) => ({ id: y.id, label: y.label, isCurrent: y.isCurrent }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-spartan">
          Modifier — <span className="text-brand-red">{event.title}</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Modifiez les informations de l'événement.</p>
      </div>
      <EventForm initialData={formattedEvent} academicYears={yearOptions} />
    </div>
  );
}
