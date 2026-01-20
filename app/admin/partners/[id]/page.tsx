import { PartnerForm } from "@/components/admin/PartnerForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

// Removed local pool/adapter/prisma init

export default async function EditPartnerPage({ params }: { params: { id: string } }) {
  const partner = await prisma.partner.findUnique({
    where: { id: params.id },
  });

  if (!partner) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Modifier le Partenaire</h2>
      <PartnerForm initialData={partner} />
    </div>
  );
}
