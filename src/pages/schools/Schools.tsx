import { useState } from "react";
import CreateEscuelaForm from './components/CreateEscuelaForm';
import EscuelaDetailView from './components/EscuelaDetailView';
import SchoolCard from './components/SchoolCard';
import SchoolsHeader from './components/SchoolsHeader';
import type { CreateEscuelaDTO, EscuelaDTO } from '@/types/EscuelaTypes';

type ViewState = "list" | "create" | "detail";

export default function SchoolsPage() {
  const [ schools, setSchools ] = useState<EscuelaDTO[]>();
  const [ view, setView ] = useState<ViewState>( "list" );
  const [ selectedSchool, setSelectedSchool ] = useState<EscuelaDTO | null>( null );

  const handleCreateClick = () => {
    setView("create");
  };

  const handleJoinClick = () => {
    console.log("Unirse a escuela");
  };

  const handleSchoolClick = (school: EscuelaDTO) => {
    setSelectedSchool(school);
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedSchool(null);
  };

  // const handleCreateSubmit = ( escuela: CreateEscuelaDTO ) => {
  //   const newSchool: CreateEscuelaDTO = {
  //     nombre: escuela.nombre,
  //     numero: escuela.numero,
  //     direccion: escuela.direccion,
  //     grados: [],
  //     maestras: []
  //   };
  //   setSchools([...schools, newSchool]);
  //   setView("list");
  // };

  if ( view === "create" ) {
    return <CreateEscuelaForm onBack={ handleBack } onSubmit={ () => {} } />;
  }

  if ( view === "detail" && selectedSchool ) {
    return <EscuelaDetailView escuela={ selectedSchool } onBack={ handleBack } />;
  }

  if ( !schools ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex h-dvh bg-background max-w-md flex-col">
      <SchoolsHeader onCreateClick={ handleCreateClick } onJoinClick={ handleJoinClick } />
      <main className="flex-1 overflow-y-auto px-4 scrollbar-hide">
        {/* Stats summary */}
        <div className="flex gap-3 py-5">
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-amber-400">{ schools.length }</span>
            <p className="text-purple-200/50 text-xs mt-0.5">Escuelas</p>
          </div>
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-white">
              { schools.reduce( ( acc, s ) => acc + s.grados.length, 0 ) }
            </span>
            <p className="text-purple-200/50 text-xs mt-0.5">Grados</p>
          </div>
        </div>

        {/* Schools list */}
        <div className="flex flex-col gap-3 pb-24">
          { schools.map(( school ) => (
            <SchoolCard
              key={ school.escuelaId }
              name={ school.nombre }
              location={ school.direccion }
              gradesCount={ school.grados.length }
              onClick={ () => handleSchoolClick( school ) }
            />
          ))}
        </div>
      </main>
    </div>
  );
}
