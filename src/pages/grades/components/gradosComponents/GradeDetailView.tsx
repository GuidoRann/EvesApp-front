import { useEffect } from "react";
import {
  ChevronLeft,
  School,
  User,
  Clock,
  Calendar,
  Users,
  ArrowLeft,
} from "lucide-react";
import type { GradoType } from '@/types/GradoTypes';
import { useManagementGrados } from '../../hooks/useManagementGrados';
import { useParams, useNavigate } from 'react-router-dom';
import { useGradoStore } from '@/stores/Grado.store';

export default function GradeDetailView() {
  const { gradoId } = useParams()
  const navigate = useNavigate();
  const { obtenerGrado } = useManagementGrados();
  const { setGrado } = useGradoStore();
  const { grado } = useGradoStore();

  useEffect(() => {
    if( !gradoId ) return;

    const traerGrado = async () => {
      const gradoData: GradoType = await obtenerGrado( gradoId );

      setGrado( gradoData );
    }

    traerGrado();
  }, [ gradoId ]);

  if( !grado ) return null;

  const handleBack = () => {
    navigate('/grades')
  }

  const handleListaAlumnos = () => {
    navigate(`/grades/${ gradoId }/students`);    
  };


  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-background">
      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] pb-6 pt-4">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[20%] top-6 h-1 w-1 animate-pulse rounded-full bg-white" />
          <div className="absolute right-[30%] top-10 h-0.5 w-0.5 animate-pulse rounded-full bg-white" />
          <div className="absolute left-[60%] top-16 h-1 w-1 animate-pulse rounded-full bg-white" />
          <div className="absolute right-[15%] top-8 h-0.5 w-0.5 animate-pulse rounded-full bg-white" />
          <div className="absolute left-[10%] top-14 h-1 w-1 animate-pulse rounded-full bg-purple-300" />
        </div>

        <div className="relative px-4">
          
          {/* Grade badge */}
          <div className="flex items-center gap-4">
            <button
              onClick={ handleBack }
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">
                { grado.numero }° Grado - Grupo { grado.letra }
              </h1>
              <p className="mt-1 text-sm text-purple-200/70">{ grado.escuela?.nombre }</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-8">
        {/* Info cards */}
        <div className="space-y-4">
          {/* Escuela */}
          <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <School className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="text-xs text-purple-200/50">Escuela</p>
                <p className="font-medium text-white">{ grado.escuela?.nombre }</p>
              </div>
            </div>
          </div>

          {/* Turno y Division */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                  <Clock className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-purple-200/50">Turno</p>
                  <p className="font-medium capitalize text-white">{ grado.turno }</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-purple-200/50">Division Anual</p>
                  <p className="font-medium capitalize text-white">{ grado.divisionAnual }</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maestra Titular */}
          <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <User className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="text-xs text-purple-200/50">Maestra Titular</p>
                <p className="font-medium text-white">{ grado.maestraTitular?.nombre } { grado.maestraTitular?.apellido }</p>
                <p className="text-xs text-purple-200/50">{ grado.maestraTitular?.email }</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-purple-500/20" />

          {/* Action buttons */}
          <p className="text-sm font-medium text-purple-200/70 mb-4">Gestionar</p>

          {/* Vista de Alumnos */}
          <button
            type="button"
            onClick={ () => handleListaAlumnos() }
            className="flex w-full items-center justify-between rounded-xl border border-purple-500/30 bg-purple-900/20 px-4 py-4 text-left transition-colors hover:bg-purple-900/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <Users className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="font-medium text-white">Lista de Alumnos</p>
                <p className="text-sm text-purple-300/60">
                  { grado.listaAlumnos.length > 0
                    ? `${ grado.listaAlumnos.length } alumno${ grado.listaAlumnos.length === 1 ? "" : "s" } registrado${ grado.listaAlumnos.length === 1 ? "" : "s" }`
                    : "Gestionar lista de alumnos del grado" }
                </p>
              </div>
            </div>
            <ChevronLeft className="h-5 w-5 rotate-180 text-purple-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
