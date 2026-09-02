"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import Link from "next/link";
import { GripVertical, Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTeamMember, reorderTeamMemberships } from "@/lib/actions-team";
import { migrateImagePath } from "@/lib/image-url";

interface Member {
  id: string;
  name: string;
  role: string;
  photo: string | null;
  photoPosition: string | null;
  membershipRole?: string;
  membershipOrder?: number;
  linkedin?: string | null;
  instagram?: string | null;
  email?: string | null;
}

interface Props {
  members: Member[];
  yearId: string | null;
}

function SortableCard({ member, yearId }: { member: Member; yearId: string | null }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden flex items-center gap-0 hover:shadow-md transition-shadow"
    >
      {/* Poignée drag */}
      <div
        {...attributes}
        {...listeners}
        className="px-3 py-4 self-stretch flex items-center cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors border-r border-gray-100 shrink-0"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      {/* Photo */}
      <div className="relative w-16 h-16 shrink-0 bg-gray-100 m-3 rounded overflow-hidden">
        {member.photo && (
          <Image
            src={migrateImagePath(member.photo)}
            alt={member.name}
            fill
            className="object-cover"
            style={{ objectPosition: member.photoPosition || "center" }}
            sizes="64px"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-3 pr-3">
        <p className="font-spartan font-black text-sm text-gray-900 truncate">{member.name}</p>
        <p className="text-xs text-brand-red font-medium truncate">{member.membershipRole || member.role}</p>
        {member.membershipRole && member.membershipRole !== member.role && (
          <p className="text-xs text-gray-400 truncate">Base : {member.role}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 pr-3 shrink-0">
        <Link href={`/admin/team/${member.id}${yearId ? `?year=${yearId}` : ""}`}>
          <Button variant="outline" size="sm" className="text-gray-600">
            <Edit className="w-3.5 h-3.5" />
          </Button>
        </Link>
        <DeleteButton
          action={deleteTeamMember.bind(null, member.id)}
          confirmMessage="Supprimer ce membre ?"
        />
      </div>
    </div>
  );
}

export function TeamMembersSortable({ members: initialMembers, yearId }: Props) {
  const [members, setMembers] = useState(initialMembers);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = members.findIndex((m) => m.id === active.id);
      const newIndex = members.findIndex((m) => m.id === over.id);
      const reordered = arrayMove(members, oldIndex, newIndex);
      setMembers(reordered);

      if (!yearId) return;
      setSaving(true);
      try {
        await reorderTeamMemberships(yearId, reordered.map((m) => m.id));
      } finally {
        setSaving(false);
      }
    },
    [members, yearId]
  );

  return (
    <div className="space-y-2">
      {saving && (
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <Loader2 className="w-3 h-3 animate-spin" />
          Sauvegarde de l&apos;ordre…
        </div>
      )}
      {!yearId && (
        <p className="text-xs text-gray-400 mb-3">
          Sélectionnez une année pour activer le glisser-déposer.
        </p>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={members.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {members.map((member) => (
              <SortableCard key={member.id} member={member} yearId={yearId} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
