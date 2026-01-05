import { cn } from "@/lib/utils";

interface LeverChipProps {
  leverId: string;
  leverName?: string;
  coverage?: number;
  onClick?: () => void;
  className?: string;
}

export function LeverChip({ leverId, leverName, coverage, onClick, className }: LeverChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        "bg-fretron-blue/10 text-fretron-blue border border-fretron-blue/20",
        "hover:bg-fretron-blue/20 transition-colors",
        "cursor-pointer",
        className
      )}
    >
      <span className="font-semibold">{leverId}</span>
      {leverName && (
        <>
          <span className="text-fretron-blue/60">·</span>
          <span className="max-w-[120px] truncate">{leverName}</span>
        </>
      )}
      {coverage !== undefined && (
        <>
          <span className="text-fretron-blue/60">·</span>
          <span className="text-fretron-blue/80">{coverage}%</span>
        </>
      )}
    </button>
  );
}
