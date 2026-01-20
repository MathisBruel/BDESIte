import { Badge } from "@/components/ui/Badge";
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

type StatusType = "published" | "draft" | "active" | "inactive" | "pending" | "archived";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className = "" }: StatusBadgeProps) {
  const config = {
    published: {
      variant: "default" as const,
      icon: CheckCircle,
      defaultLabel: "Publié",
      className: "bg-brand-red/10 text-brand-red border-brand-red/20",
    },
    draft: {
      variant: "outline" as const,
      icon: Clock,
      defaultLabel: "Brouillon",
      className: "bg-gray-100 text-gray-600 border-gray-200",
    },
    active: {
      variant: "default" as const,
      icon: CheckCircle,
      defaultLabel: "Actif",
      className: "bg-brand-yellow/10 text-brand-yellow-dark border-brand-yellow/20 text-yellow-700",
    },
    inactive: {
      variant: "outline" as const,
      icon: XCircle,
      defaultLabel: "Inactif",
      className: "bg-red-50 text-red-600 border-red-100",
    },
    pending: {
      variant: "outline" as const,
      icon: AlertCircle,
      defaultLabel: "En attente",
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200",
    },
    archived: {
      variant: "outline" as const,
      icon: Clock,
      defaultLabel: "Archivé",
      className: "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200",
    },
  };

  const { icon: Icon, defaultLabel, className: styleClass } = config[status];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${styleClass} ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{label || defaultLabel}</span>
    </div>
  );
}
