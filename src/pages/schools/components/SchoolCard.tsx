import { MapPin, School } from "lucide-react";

export interface SchoolCardProps {
  name: string;
  location: string;
  gradesCount?: number;
  onClick?: () => void;
}

export default function SchoolCard({ name, location, gradesCount, onClick }: SchoolCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex flex-col bg-[#1a1025] hover:bg-[#201328] active:scale-[0.98] border border-purple-500/10 rounded-2xl transition-all duration-200 overflow-hidden"
    >
      {/* Top colored bar - always amber/orange */}
      <div className="h-1.5 w-full bg-amber-500" />
      
      <div className="p-4 flex gap-4">
        {/* Large icon area - always amber/orange */}
        <div className="shrink-0 h-16 w-16 rounded-xl flex items-center justify-center bg-amber-500/15">
          <School className="h-8 w-8 text-amber-400" />
        </div>

        {/* School info */}
        <div className="flex-1 flex flex-col items-start text-left min-w-0 py-1">
          <span className="text-white font-semibold truncate w-full text-left">{name}</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-purple-200/50 text-xs">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{location}</span>
            </div>
            {gradesCount !== undefined && (
              <span className="text-amber-400/70 text-xs font-medium">
                {gradesCount} {gradesCount === 1 ? "grado" : "grados"}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
