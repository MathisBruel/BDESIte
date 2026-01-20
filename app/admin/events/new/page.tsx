import { EventForm } from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Nouvel Événement</h2>
      <EventForm />
    </div>
  );
}
