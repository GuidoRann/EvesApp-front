import { BottomNav } from '@/components/BottomNav';
import { useState } from "react";
import CreateGradoForm from './components/gradosComponents/CreateGradoForm';
import GradeCard from './components/gradosComponents/GradesCard';
import GradesHeader from './components/gradosComponents/GradesHeader';
import { useManagementGrados } from './hooks/useManagementGrados';
import { useMaestraStore } from '@/stores/Maestra.store';
import type { GradoDTO } from '@/types/GradoTypes';
import { useNavigate } from "react-router-dom";

type ViewState = "list" | "detail" | "create" | "join";

export default function Grades() {
  const [ currentView, setCurrentView ] = useState<ViewState>( "list" );
  const [ searchQuery, setSearchQuery ] = useState("");
  const { crearGrado } = useManagementGrados();
  const navigate = useNavigate();

  const maestra = useMaestraStore(( state ) => state.maestra);
  const gradosTitular = maestra?.gradosComoTitular || [];
  const gradosMaestra = maestra?.gradosGeneral || [];

  const handleCreateClick = () => {
    setCurrentView( "create" );
  };

  const handleJoinClick = () => {
    setCurrentView( "join" );
  };

  const handleGradeClick = ( grade: GradoDTO ) => {
    navigate( `/grades/details/${ grade.gradoId }` );
  };

  const handleBackToList = () => {
    setCurrentView( "list" );
  };

  // Create view
  if ( currentView === "create" ) {
    return (
      <CreateGradoForm
        onBack={ handleBackToList }
        onSubmit={( data: any ) => {
          crearGrado( data );
          handleBackToList();
        }}
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
            { gradosTitular.length != 0 ? 
              <span className="text-2xl font-bold text-emerald-400">{ gradosTitular.length }</span>
              :
              <span className="text-2xl font-bold text-white">{ 0 }</span>
            }
            <p className="text-purple-200/50 text-xs mt-0.5">Grados Titular</p>
          </div>
          <div className="flex-1 bg-[#1a1025] border border-purple-500/10 rounded-xl p-3 text-center">
            { gradosMaestra.length != 0 ? 
              <span className="text-2xl font-bold text-emerald-400">{ gradosMaestra.length }</span>
              :
              <span className="text-2xl font-bold text-white">{ 0 }</span>
            }
            {/* <span className="text-2xl font-bold text-white">{ gradosMaestra.length }</span> */}
            <p className="text-purple-200/50 text-xs mt-0.5">Grados General</p>
          </div>
        </div>

        {/* Grades list */}
        <div className="flex flex-col gap-3 pb-24">
          <h1 className="mt-3 font-bold text-center">Grados Como Maestra Titular</h1>
          <div className="mb-3 border-t border-purple-500/20" />
          { gradosTitular.map(( grado ) => (
            <GradeCard
              key={ grado.gradoId }
              numero={ grado.numero }
              letra={ grado.letra }
              turno={ grado.turno }
              nombreEscuela={ grado.escuela?.nombre }
              cantidadEstudiantes={ grado.alumnos?.length }
              onClick={() => handleGradeClick( grado )}
            />
          ))}
          <h1 className="mt-3 font-bold text-center">Grados Como Maestra General</h1>
          <div className="mb-3 border-t border-purple-500/20" />
          { gradosMaestra.map(( grado ) => (
            <GradeCard
              key={ grado.gradoId }
              numero={ grado.numero }
              letra={ grado.letra }
              turno={ grado.turno }
              nombreEscuela={ grado.escuela?.nombre }
              cantidadEstudiantes={ grado.alumnos?.length }
              onClick={() => handleGradeClick( grado )}
            />
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

