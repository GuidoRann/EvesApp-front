import { Users, BookOpen } from "lucide-react";

export interface GradeCardProps {
  numero: number;
  letra: string;
  turno: "mañana" | "tarde";
  nombreEscuela: string;
  cantidadEstudiantes?: number;
  onClick?: () => void;
}

export default function GradeCard({ numero, letra, turno, nombreEscuela, cantidadEstudiantes, onClick }: GradeCardProps) {
  return (
    <button
      onClick={ onClick }
      className="w-full flex flex-col bg-[#1a1025] hover:bg-[#201328] active:scale-[0.98] border border-purple-500/10 rounded-2xl transition-all duration-200 overflow-hidden"
    >
      {/* Color verde superior del boton */}
      <div className="h-1.5 w-full bg-emerald-500" />
      
      <div className="p-4 flex gap-4">
        {/* Numero y letra del grado */}
        <div className="shrink-0 h-16 w-16 rounded-xl flex items-center justify-center bg-emerald-500/15">
          <span className="text-emerald-400 font-bold text-xl">{ numero }º { letra }</span>
        </div>

        {/* Info del grado */}
        <div className="flex-1 flex flex-col items-start text-left min-w-0 py-1">
          <span className="text-white font-semibold truncate w-full text-left">
            { numero }º Grado - Grupo { letra }
          </span>
          <span className="text-purple-200/50 text-xs mt-0.5 truncate w-full">
            { nombreEscuela }
          </span>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-purple-200/50 text-xs">
              <BookOpen className="h-3 w-3" />
              <span className="capitalize">{turno}</span>
            </div>
            { cantidadEstudiantes !== undefined && (
              <div className="flex items-center gap-1 text-emerald-400/70 text-xs font-medium">
                <Users className="h-3 w-3" />
                <span>{ cantidadEstudiantes } alumnos</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
