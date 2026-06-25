import { BottomNav } from '@/components/BottomNav';
import { useState } from "react";
import CreateGradoForm from './components/CreateGradoForm';
import GradeDetailView, { type GradeDetailData } from './components/GradeDetailView';
import GradeCard from './components/GradesCard';
import GradesHeader from './components/GradesHeader';

const gradosComoTitular: GradeDetailData[] = [
  {
    id: "1",
    numero: 4,
    letra: "A",
    turno: "mañana",
    divisionAnual: "bimestre",
    escuela: { id: "1", nombre: "Escuela Primaria Benito Juárez" },
    maestraTitular: { id: "1", nombre: "Maria Gonzalez", email: "maria@escuela.com" },
    maestrasAdicionales: [],
    alumnos: [
      { id: "1", nombre: "Juan", apellidoPaterno: "Perez", apellidoMaterno: "Lopez" },
      { id: "2", nombre: "Ana", apellidoPaterno: "Martinez", apellidoMaterno: "Garcia" },
    ],
  }
];

const gradosComoMaestra: GradeDetailData[] = [
  {
    id: "2",
    numero: 3,
    letra: "B",
    turno: "tarde",
    divisionAnual: "trimestre",
    escuela: { id: "1", nombre: "Escuela Primaria Benito Juárez" },
    maestraTitular: { id: "2", nombre: "Ana Lopez", email: "ana@escuela.com" },
    maestrasAdicionales: [
      { id: "3", nombre: "Carmen Hernandez", email: "carmen@escuela.com" },
    ],
    alumnos: [],
  },
  {
    id: "3",
    numero: 5,
    letra: "C",
    turno: "mañana",
    divisionAnual: "bimestre",
    escuela: { id: "2", nombre: "Colegio Montessori" },
    maestraTitular: { id: "4", nombre: "Laura Martinez", email: "laura@escuela.com" },
    maestrasAdicionales: [],
    alumnos: [],
  },
  {
    id: "4",
    numero: 6,
    letra: "A",
    turno: "tarde",
    divisionAnual: "trimestre",
    escuela: { id: "3", nombre: "Instituto Educativo del Valle" },
    maestraTitular: { id: "5", nombre: "Sofia Rodriguez", email: "sofia@escuela.com" },
    maestrasAdicionales: [],
    alumnos: [],
  },
];

type ViewState = "list" | "detail" | "create" | "join";

export default function Grades() {
  const [ gradosTitular, setGradosTitular ] = useState<GradeDetailData[]>( gradosComoTitular );
  const [ gradosMaestra, setGradosMaestra ] = useState<GradeDetailData[]>( gradosComoMaestra );
  const [ currentView, setCurrentView ] = useState<ViewState>( "list" );
  const [ selectedGrade, setSelectedGrade ] = useState<GradeDetailData | null>( null );
  const [ searchQuery, setSearchQuery ] = useState("");

  const handleCreateClick = () => {
    setCurrentView( "create" );
  };

  const handleJoinClick = () => {
    setCurrentView( "join" );
  };

  const handleGradeClick = ( grade: GradeDetailData ) => {
    setSelectedGrade( grade );
    setCurrentView( "detail" );
  };

  const handleBackToList = () => {
    setCurrentView( "list" );
    setSelectedGrade( null );
  };

  // Create view
  if ( currentView === "create" ) {
    return (
      <CreateGradoForm
        onBack={ handleBackToList }
        onSubmit={( data: any ) => {
          console.log( "Grado creado:", data );
          handleBackToList();
        }}
      />
    );
  }

  // Detail view
  if ( currentView === "detail" && selectedGrade ) {
    return (
      <GradeDetailView
        grade={ selectedGrade }
        onBack={ handleBackToList }
        // onUpdate={ handleUpdateGrade }
      />
    );
  }

  return (
    <div className='mx-auto flex h-dvh bg-background max-w-md flex-col'>
      <GradesHeader 
        onCreateClick={ handleCreateClick } 
        onJoinClick={ handleJoinClick }
        searchQuery={ searchQuery }
        onSearchChange={ setSearchQuery }
      />
      <main className="flex-1 overflow-y-auto px-4 scrollbar-hide">

        {/* Cantidad de grados y cantidad de alumnos */}
        <div className="flex gap-3 py-5">
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-emerald-400">{ gradosTitular.length }</span>
            <p className="text-purple-200/50 text-xs mt-0.5">Grados Titular</p>
          </div>
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-2xl font-bold text-white">{ gradosMaestra.length }</span>
            <p className="text-purple-200/50 text-xs mt-0.5">Grados General</p>
          </div>
        </div>

        {/* Grades list */}
        <div className="flex flex-col gap-3 pb-24">
          <h1 className="mt-3 font-bold text-center">Grados Como Maestra Titular</h1>
          <div className="mb-3 border-t border-purple-500/20" />
          { gradosTitular.map(( grado ) => (
            <GradeCard
              key={ grado.id }
              numero={ grado.numero }
              letra={ grado.letra }
              turno={ grado.turno }
              nombreEscuela={ grado.escuela.nombre }
              cantidadEstudiantes={ grado.alumnos.length }
              onClick={() => handleGradeClick( grado )}
            />
          ))}
          <h1 className="mt-3 font-bold text-center">Grados Como Maestra General</h1>
          <div className="mb-3 border-t border-purple-500/20" />
          { gradosMaestra.map(( grado ) => (
            <GradeCard
              key={ grado.id }
              numero={ grado.numero }
              letra={ grado.letra }
              turno={ grado.turno }
              nombreEscuela={ grado.escuela.nombre }
              cantidadEstudiantes={ grado.alumnos.length }
              onClick={() => handleGradeClick( grado )}
            />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
