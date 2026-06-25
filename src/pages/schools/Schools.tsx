import { useEffect, useState } from "react";
import CreateEscuelaForm from './components/CreateEscuelaForm';
import EscuelaDetailView from './components/EscuelaDetailView';
import EscuelaCard from './components/EscuelaCard';
import Escuelaheader from './components/EscuelaHeader';
import type { CreateEscuelaDTO, EscuelaDTO } from '@/types/EscuelaTypes';
import { useManagementEscuelas } from './hooks/useManagementEscuela';
import { BottomNav } from '@/components/BottomNav';
import JoinEscuela from './components/JoinEscuela';
import { useMaestraStore } from '@/stores/Maestra.store';

type ViewState = "list" | "create" | "detail" | "join";

export default function EscuelaPage() {
  const [ escuelas, setEscuelas ] = useState< EscuelaDTO[] >( [] );
  const [ view, setView ] = useState<ViewState>( "list" );
  const [ selectedEscuela, setSelectedEscuela ] = useState<EscuelaDTO | null>( null );
  const [ searchQuery, setSearchQuery ] = useState("");

  const { createEscuela } = useManagementEscuelas();
  const maestra = useMaestraStore( state => state.maestra );

  const filteredSchools = escuelas?.filter(( escuela ) => {
    const query = searchQuery.trim().toLowerCase();

    if ( !query ) return true;

    return (
      escuela.nombre.toLowerCase().includes( query ) ||
      escuela.direccion.toLowerCase().includes( query )
    );
  });

  useEffect(() => {
    const fetchEscuelas = async () => {
      const escuelas = maestra?.escuelas || [];

      setEscuelas( escuelas );
    };

    if ( view === "list" ) {
      fetchEscuelas();
    }
  }, [ view ]);

  const handleCreateClick = () => {
    setView( "create" );
  };

  const handleJoinClick = () => {
    setView( "join" );
  };

  const handleSchoolClick = ( escuela: EscuelaDTO ) => {
    setSelectedEscuela( escuela );
    setView( "detail" );
  };

  const handleBack = () => {
    setView( "list" );
    setSelectedEscuela( null );
  };


  const handleCreateSubmit = async ( escuela: CreateEscuelaDTO ) => {
    const newSchool: CreateEscuelaDTO = {
      nombre: escuela.nombre,
      numero: escuela.numero,
      direccion: escuela.direccion,
      telefono: escuela.telefono
    };

    await createEscuela( newSchool );
    setView( "list" );
  };

  if ( view === "create" ) {
    return <CreateEscuelaForm onBack={ handleBack } onSubmit={ handleCreateSubmit } />;
  }

  if ( view === "join" ) {
    return <JoinEscuela onBack={ handleBack } />;
  }

  if ( view === "detail" && selectedEscuela ) {
    return <EscuelaDetailView escuela={ selectedEscuela } onBack={ handleBack } />;
  }

  return (
    <div className="mx-auto flex h-dvh bg-background max-w-md flex-col">
      <Escuelaheader
        onCreateClick={ handleCreateClick }
        onJoinClick={ handleJoinClick }
        searchQuery={ searchQuery }
        onSearchChange={ setSearchQuery }
      />
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
           { filteredSchools.length > 0 ? (
            filteredSchools.map(( escuela ) => (
              <EscuelaCard
                key={ escuela.escuelaId }
                name={ escuela.nombre }
                location={ escuela.direccion }
                gradesCount={ escuela.listaGrados?.length ?? 0 }
                onClick={ () => handleSchoolClick( escuela ) }
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-white font-medium">Sin resultados</p>
              <p className="text-purple-200/50 text-sm mt-1">
                No se encontraron escuelas para &quot;{ searchQuery }&quot;
              </p>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
