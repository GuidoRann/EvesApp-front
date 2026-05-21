import { useState } from "react";
import CreateEscuelaForm from './components/CreateEscuelaForm';
import EscuelaDetailView from './components/EscuelaDetailView';
import SchoolCard from './components/EscuelaCard';
import SchoolsHeader from './components/EscuelaHeader';
import type { CreateEscuelaDTO, EscuelaDTO } from '@/types/EscuelaTypes';
import { useManagementEscuelas } from './hooks/useManagementEscuela';
import Loading from '@/components/Loading';
import { BottomNav } from '@/components/BottomNav';

type ViewState = "list" | "create" | "detail";

export default function EscuelaPage() {
  const [ escuelas, setEscuelas ] = useState<EscuelaDTO[]>();
  const [ view, setView ] = useState<ViewState>( "list" );
  const [ selectedEscuela, setSelectedEscuela ] = useState<EscuelaDTO | null>( null );
  const { createEscuela } = useManagementEscuelas();

  const handleCreateClick = () => {
    setView("create");
  };

  const handleJoinClick = () => {
    console.log("Unirse a escuela");
  };

  const handleSchoolClick = ( escuela: EscuelaDTO ) => {
    setSelectedEscuela( escuela );
    setView( "detail" );
  };

  const handleBack = () => {
    setView( "list" );
    setSelectedEscuela( null );
  };


  // TODO: Conectar el create con el backend
  const handleCreateSubmit = ( escuela: CreateEscuelaDTO ) => {
    const newSchool: CreateEscuelaDTO = {
      nombre: escuela.nombre,
      numero: escuela.numero,
      direccion: escuela.direccion
    };

    createEscuela( newSchool );
    
    setView( "list" );
  };

  if ( view === "create" ) {
    return <CreateEscuelaForm onBack={ handleBack } onSubmit={ handleCreateSubmit } />;
  }

  if ( view === "detail" && selectedEscuela ) {
    return <EscuelaDetailView escuela={ selectedEscuela } onBack={ handleBack } />;
  }

  return (
    <div className="mx-auto flex h-dvh bg-background max-w-md flex-col">
      <SchoolsHeader onCreateClick={ handleCreateClick } onJoinClick={ handleJoinClick } />
      <main className="flex-1 overflow-y-auto px-4 scrollbar-hide">
        {/* Stats summary */}
        <div className="flex gap-3 py-5">
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-amber-400">{ escuelas?.length || 0 }</span>
            <p className="text-purple-200/50 text-xs mt-0.5">Escuelas</p>
          </div>
        </div>

        {/* Schools list */}
        <div className="flex flex-col gap-3 pb-24">
          { escuelas?.map(( escuela ) => (
            <SchoolCard
              key={ escuela.escuelaId }
              name={ escuela.nombre }
              location={ escuela.direccion }
              gradesCount={ escuela.grados.length }
              onClick={ () => handleSchoolClick( escuela ) }
            />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
