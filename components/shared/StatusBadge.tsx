import { cn, getKPIStatusColor, getKPIStatusLabel } from "@/lib/utils";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "on_track" | "at_risk" | "off_track";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const icons = {
    on_track: CheckCircle2,
    at_risk: AlertCircle,
    off_track: XCircle,
  };

  const Icon = icons[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        getKPIStatusColor(status),
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{getKPIStatusLabel(status)}</span>
    </div>
  );
}
