import { getTeamMembers } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Users, Edit } from "lucide-react";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTeamMember } from "@/lib/actions-team";
import { getImageUrl, migrateImagePath } from "@/lib/image-url";
import Image from "next/image";

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-spartan">
            Gestion de l&apos;<span className="text-brand-red">Équipe</span>
          </h1>
          <p className="text-gray-500 mt-1">Gérez les membres du BDE</p>
        </div>
        <Link href="/admin/team/new">
          <Button className="bg-brand-red hover:bg-brand-red/90 text-white w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau membre
          </Button>
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun membre</h3>
          <p className="text-gray-500 mb-4">Commencez par ajouter votre premier membre.</p>
          <Link href="/admin/team/new">
            <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un membre
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member: any) => (
            <div
              key={member.id || member.name}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                {member.photo && (
                  <Image
                    src={migrateImagePath(member.photo)}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: member.photoPosition || "center",
                    }}
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 font-spartan mb-1">
                  {member.name}
                </h3>
                <p className="text-brand-red font-medium text-sm mb-4">{member.role}</p>

                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  {member.links?.linkedin && (
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded">LinkedIn</span>
                  )}
                  {member.links?.instagram && (
                    <span className="bg-pink-50 text-pink-600 px-2 py-1 rounded">Instagram</span>
                  )}
                  {member.links?.email && (
                    <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded">Email</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {member.id && (
                    <>
                      <Link href={`/admin/team/${member.id}`} className="flex-1">
                        <Button variant="outline" className="w-full text-gray-600">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                      </Link>
                      <DeleteButton
                        action={deleteTeamMember.bind(null, member.id)}
                        confirmMessage="Êtes-vous sûr de vouloir supprimer ce membre ?"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
