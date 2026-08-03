import { useState } from "react";
import { Plus, ArrowLeft, ChevronLeft } from "lucide-react";
import CreateAlumnoView from './CreateAlumnoView';
import { useParams, useNavigate } from 'react-router-dom';
import { useGradoStore } from '@/stores/Grado.store';
import type { AlumnoType } from '@/types/AlumnoTypes';

type CurrentView = "list" | "create";

export default function AlumnosListView() {
  const [ currentView, setCurrentView ] = useState<CurrentView>( "list" );
  const { grado, addAlumno } = useGradoStore();
  
  if( !grado ) return null
  const alumnos = grado.listaAlumnos ?? [];

  const { gradoId } = useParams();
  const navigate = useNavigate();

  const handleCreateAlumno = () => {
      setCurrentView( "create" );
  };

  const handleSubmit = async ( alumno: AlumnoType ) => {
    addAlumno( alumno )
    setCurrentView( "list" );
  };

  if ( currentView === "create" ) {
    return (
      <CreateAlumnoView
        gradoId={ gradoId || "" }
        onBack={ () => setCurrentView( "list" ) }
        onSubmit={ handleSubmit }
      />
    );
  }
  
  return (
    <div className='mx-auto flex min-h-dvh max-w-md flex-col bg-background'>
      <div className='relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] pb-6 pt-4'>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute left-[20%] top-6 h-1 w-1 animate-pulse rounded-full bg-white' />
          <div className='absolute right-[30%] top-10 h-0.5 w-0.5 animate-pulse rounded-full bg-white' />
          <div className='absolute left-[60%] top-16 h-1 w-1 animate-pulse rounded-full bg-white' />
          <div className='absolute right-[15%] top-8 h-0.5 w-0.5 animate-pulse rounded-full bg-white' />
          <div className='absolute left-[10%] top-14 h-1 w-1 animate-pulse rounded-full bg-purple-300' />
        </div>

        <div className='relative px-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => navigate(`/grades/details/${ gradoId }`)}
                className='flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors'>
                <ArrowLeft className='h-5 w-5 text-white' />
              </button>
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className='text-2xl font-bold text-white'>Lista de Alumnos</h1>
                  <p className='mt-1 text-sm text-purple-200/70'>
                    { alumnos.length } alumno{ alumnos.length !== 1 ? "s" : "" } agregado{ alumnos.length !== 1 ? "s" : "" }
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={ () => handleCreateAlumno() }
              className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition-colors hover:bg-purple-500'>
              <Plus className='h-5 w-5' />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 px-4">
        { alumnos.map(( alumno, index ) => (
          <button
            type="button"
            onClick={ () => navigate( `/grades/${ gradoId }/students/${ alumno.alumnoId }` ) }
            className="flex w-full items-center justify-between rounded-xl border border-purple-500/30 bg-purple-900/20 px-4 py-4 text-left transition-colors hover:bg-purple-900/30"
          >
            <div className="flex items-center gap-3">
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/50'>
                    <span className='text-sm font-medium text-white'>{ index + 1 }</span>
                  </div>
              <div>
                <p className="font-bold text-white">{ alumno.apellidoPaterno }, { alumno.nombre }</p>
              </div>
            </div>
            <ChevronLeft className="h-5 w-5 rotate-180 text-purple-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
