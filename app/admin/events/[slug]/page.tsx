import { EventForm } from "@/components/admin/EventForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

// Removed local pool/adapter/prisma init

export default async function EditEventPage({ params }: { params: { slug: string } }) {
  const event = await prisma.event.findUnique({
    where: { slug: params.slug },
  });

  if (!event) {
    notFound();
  }

  // Convert dates to string for the form
  const formattedEvent = {
    ...event,
    date: new Date(event.date).toISOString().split("T")[0],
    ticketUrl: event.ticketUrl || "",
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Modifier l&apos;Événement</h2>
      <EventForm initialData={formattedEvent} />
    </div>
  );
}
