import { Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function GradesHeader() {
  const navigate = useNavigate();

  return (
    <div className='h-48 relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]'>
      {/* Subtle sparkles */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute top-6 left-[20%] h-1 w-1 rounded-full bg-white' />
        <div className='absolute top-10 right-[30%] h-0.5 w-0.5 rounded-full bg-white' />
        <div className='absolute top-16 left-[60%] h-1 w-1 rounded-full bg-white' />
        <div className='absolute top-8 right-[15%] h-0.5 w-0.5 rounded-full bg-white' />
        <div className='absolute top-20 left-[40%] h-0.5 w-0.5 rounded-full bg-white' />
        <div className='absolute top-14 left-[10%] h-1 w-1 rounded-full bg-purple-300' />
        <div className='absolute top-4 right-[40%] h-0.5 w-0.5 rounded-full bg-purple-200' />
      </div>
      {/* Header content */}
      <div className="relative z-10 flex flex-col px-4 pt-16">
        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-1">Mis Grados</h1>
        <p className="text-purple-200/70 text-sm mb-5">
          Gestiona tus grados y estudiantes
        </p>

        {/* Action buttons - always visible */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/20 rounded-xl text-white font-semibold transition-all duration-200">
            <UserPlus className="h-5 w-5" />
            <span>Unirme</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 active:scale-[0.98] rounded-xl text-white font-semibold transition-all duration-200 shadow-lg shadow-purple-500/25"
          onClick={() => { navigate("/grades/create") }}>
            <Plus className="h-5 w-5" />
            <span>Crear</span>
          </button>
        </div>
      </div>
    </div>
  );
};