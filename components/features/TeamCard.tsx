import Image from "next/image";
import type { TeamMember } from "@/lib/schemas";
import { getImageUrl } from "@/lib/image-url";
import { BLUR_GRAY } from "@/lib/image-blur";
import { Instagram, Linkedin, Mail } from "lucide-react";

interface TeamCardProps {
  member: TeamMember;
}

const positionMap: Record<string, string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
  left: "object-left",
  right: "object-right",
  "top-left": "object-left-top",
  "top-right": "object-right-top",
  "bottom-left": "object-left-bottom",
  "bottom-right": "object-right-bottom",
};

export function TeamCard({ member }: TeamCardProps) {
  const positionClass = positionMap[member.photoPosition || "center"] || "object-center";
  const hasLinks = member.links && (member.links.instagram || member.links.linkedin || member.links.email);

  return (
    <div className="group bg-white border border-brand-noir/10 hover:border-brand-rouge transition-colors flex items-center gap-4 p-4">

      {/* Photo */}
      <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-brand-noir/5">
        {member.photo ? (
          <Image
            src={getImageUrl(member.photo)}
            alt={member.name}
            fill
            sizes="64px"
            quality={75}
            loading="lazy"
            placeholder="blur"
            blurDataURL={BLUR_GRAY}
            className={`object-cover ${positionClass}`}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="font-spartan font-black text-2xl text-brand-noir/15">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-spartan font-black text-xs uppercase tracking-widest text-brand-rouge leading-none mb-1 truncate">
          {member.role}
        </div>
        <h3 className="font-spartan font-black text-brand-noir text-base leading-tight truncate">
          {member.name}
        </h3>

        {hasLinks && (
          <div className="flex gap-3 mt-2">
            {member.links?.instagram && (
              <a
                href={member.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram de ${member.name}`}
                className="text-brand-noir/25 hover:text-brand-rouge transition-colors"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
            )}
            {member.links?.linkedin && (
              <a
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn de ${member.name}`}
                className="text-brand-noir/25 hover:text-brand-rouge transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            )}
            {member.links?.email && (
              <a
                href={`mailto:${member.links.email}`}
                aria-label={`Email de ${member.name}`}
                className="text-brand-noir/25 hover:text-brand-rouge transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
