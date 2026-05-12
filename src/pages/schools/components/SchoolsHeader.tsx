import { Plus, Users, Search } from "lucide-react";
import { useState } from "react";

interface SchoolsHeaderProps {
  onCreateClick?: () => void;
  onJoinClick?: () => void;
}

export default function SchoolsHeader({ onCreateClick, onJoinClick }: SchoolsHeaderProps) {
  const [activeTab, setActiveTab] = useState<"create" | "join" | null>(null);

  const handleTabClick = (tab: "create" | "join") => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
      if (tab === "create") onCreateClick?.();
      if (tab === "join") onJoinClick?.();
    }
  };

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]">
      {/* Subtle sparkles */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-6 left-[20%] h-1 w-1 rounded-full bg-white" />
        <div className="absolute top-10 right-[30%] h-0.5 w-0.5 rounded-full bg-white" />
        <div className="absolute top-16 left-[60%] h-1 w-1 rounded-full bg-white" />
        <div className="absolute top-8 right-[15%] h-0.5 w-0.5 rounded-full bg-white" />
        <div className="absolute top-14 left-[10%] h-1 w-1 rounded-full bg-purple-300" />
      </div>

      {/* Header content */}
      <div className="relative z-10 flex flex-col px-4 pt-12 pb-5">
        {/* Title row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Escuelas</h1>
            <p className="text-purple-200/60 text-sm mt-0.5">
              Centros educativos
            </p>
          </div>
          {/* Search icon button */}
          <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 transition-colors">
            <Search className="h-5 w-5 text-white/80" />
          </button>
        </div>

        {/* Action tabs - horizontal segmented control style with amber/orange */}
        <div className="flex bg-white/5 rounded-lg p-1 gap-1">
          <button 
            onClick={() => handleTabClick("create")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "create" 
                ? "bg-amber-500 text-white shadow-lg" 
                : "text-purple-200/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Nueva escuela</span>
          </button>
          <button 
            onClick={() => handleTabClick("join")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "join" 
                ? "bg-amber-500 text-white shadow-lg" 
                : "text-purple-200/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Unirme</span>
          </button>
        </div>
      </div>
    </div>
  );
}
