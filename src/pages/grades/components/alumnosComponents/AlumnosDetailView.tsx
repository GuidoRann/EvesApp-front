import { useGradoStore } from '@/stores/Grado.store';
import { ArrowLeft, Calendar, Clock, School, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreateFamiliarView from '../familiarComponents/CreateFamiliarView';
import type { FamiliarType } from '@/types/FamiliarTypes';

type CurrentView = "list" | "create";

export default function AlumnosDetailView() {
  const [ currentView, setCurrentView ] = useState<CurrentView>( "list" );
  const { alumnoId } = useParams();
  const { grado } = useGradoStore();
  const navigate = useNavigate();

  const alumno = grado?.listaAlumnos?.find( ( a ) => a.alumnoId === alumnoId );

  if ( !alumno ) return null;
  if ( !grado ) return null;

  const formatNumber = ( value: string ) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSubmit = async ( familiar: FamiliarType ) => {
    setCurrentView( "list" );
  }

  if( currentView === "create" ) {
    return (
      <CreateFamiliarView 
        onBack={ () => setCurrentView( "list" ) } 
        onSubmit={ handleSubmit } 
      />
    )
  }

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
              onClick={ () => navigate( `/grades/${ grado.gradoId }/students` ) }
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">
                { alumno.apellidoPaterno } { alumno.nombre }
              </h1>
              <p className="mt-1 text-sm text-purple-200/70">DNI: { formatNumber( alumno.numeroDocumento ) }</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-8">
        {/* Info cards */}
        <div className="space-y-4">

          {/* Grado y Division */}
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
                  <p className="text-xs text-purple-200/50">Grado</p>
                  <p className="font-medium capitalize text-white">{ grado.numero }º { grado.letra }</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direccion */}
          <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <School className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="text-xs text-purple-200/50">Dirección</p>
                <p className="font-medium text-white">{ alumno.direccion }</p>
              </div>
            </div>
          </div>

          {/* Numero de Documento */}
          <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <User className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="text-xs text-purple-200/50">Numero de Documento</p>
                <p className="font-medium text-white">{ formatNumber( alumno.numeroDocumento ) }</p>
              </div>
            </div>
          </div>

          

          {/* Numero de Documento */}
          <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <User className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="text-xs text-purple-200/50">Numero de Documento</p>
                <p className="font-medium text-white">{ formatNumber( alumno.barrio ) }</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-purple-500/20" />

          {/* Action buttons */}
          <div className="flex text-sm font-medium text-purple-200/70 items-center justify-between">
            <p className="mb-4">Familiares</p>
            <button 
              onClick={ () => setCurrentView( "create" ) }
              className="flex items-center gap-2 rounded-full bg-purple-600/30 px-4 py-2 hover:bg-purple-600/50 mb-4">
                Agregar Familiar
            </button>
          </div>

          {/* Lista Familiares */}
          <div>

          </div>

        </div>
      </div>
    </div>
  );
}
