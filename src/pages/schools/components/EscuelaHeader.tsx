import { Plus, Users, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SchoolsHeaderProps {
  onCreateClick?: () => void;
  onJoinClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export default function EscuelaHeader({ onCreateClick, onJoinClick, searchQuery, onSearchChange }: SchoolsHeaderProps) {
  const [ activeTab, setActiveTab ] = useState<"create" | "join" | null>(null);
  const [ searchOpen, setSearchOpen ] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ( searchOpen ) {
      inputRef.current?.focus();
    }
  }, [ searchOpen ]);

  const toggleSearch = () => {
    if ( searchOpen ) {
      onSearchChange?.( "" );
    }
    setSearchOpen(( prev ) => !prev);
  };

  const handleTabClick = ( tab: "create" | "join" ) => {
    if ( activeTab === tab ) {
      setActiveTab( null );
    } else {
      setActiveTab( tab );
      if ( tab === "create" ) onCreateClick?.();
      if ( tab === "join" ) onJoinClick?.();
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
          <button
            onClick={ toggleSearch }
            aria-label={ searchOpen ? "Cerrar busqueda" : "Buscar escuelas" }
            className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
              searchOpen ? "bg-amber-500 text-white" : "bg-white/10 hover:bg-white/15 text-white/80"
            }`}
          >
            { searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>
        </div>

        {/* Expanding search bar */}
        <div
          className={`grid transition-all duration-300 ease-out ${
            searchOpen ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-200/50" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Buscar por nombre o direccion..."
                className="w-full h-11 pl-10 pr-9 rounded-lg bg-white/10 border border-white/10 text-white text-sm placeholder:text-purple-200/40 outline-none focus:border-amber-400/50 focus:bg-white/15 transition-colors"
              />
              { searchQuery && (
                <button
                  onClick={() => onSearchChange?.("")}
                  aria-label="Limpiar"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-200/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action tabs - horizontal segmented control style with amber/orange */}
        <div className="flex bg-white/5 rounded-lg p-1 gap-1">
          <button 
            onClick={() => handleTabClick( "create" )}
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
            onClick={() => handleTabClick( "join" )}
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
