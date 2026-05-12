import { Plus, Users, Search } from "lucide-react";
import { useState } from "react";

interface GradesHeaderProps {
  onCreateClick?: () => void;
  onJoinClick?: () => void;
}
export default function GradesHeader({ onCreateClick, onJoinClick }: GradesHeaderProps) {
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
    <div className='h-48 relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]'>
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-6 left-[20%] h-1 w-1 rounded-full bg-white' />
        <div className='absolute top-10 right-[30%] h-0.5 w-0.5 rounded-full bg-white' />
        <div className='absolute top-16 left-[60%] h-1 w-1 rounded-full bg-white' />
        <div className='absolute top-8 right-[15%] h-0.5 w-0.5 rounded-full bg-white' />
        <div className='absolute top-20 left-[40%] h-0.5 w-0.5 rounded-full bg-white' />
        <div className='absolute top-14 left-[10%] h-1 w-1 rounded-full bg-purple-300' />
        <div className='absolute top-4 right-[40%] h-0.5 w-0.5 rounded-full bg-purple-200' />
      </div>

      <div className="relative z-10 flex flex-col px-4 pt-12 pb-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Mis Grados</h1>
            <p className="text-purple-200/60 text-sm mt-0.5">
              Gestiona tus clases
            </p>
          </div>
          <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 transition-colors">
            <Search className="h-5 w-5 text-white/80" />
          </button>
        </div>

        <div className="flex bg-white/5 rounded-lg p-1 gap-1">
          <button 
            onClick={() => handleTabClick("create")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "create" 
                ? "bg-emerald-500 text-white shadow-lg" 
                : "text-purple-200/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo grado</span>
          </button>
          <button 
            onClick={() => handleTabClick("join")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              activeTab === "join" 
                ? "bg-emerald-500 text-white shadow-lg" 
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
};