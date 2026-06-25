import { Button } from '@/components/ui/button';
import type { EscuelaDTO } from '@/types/EscuelaTypes';
import { ArrowLeft, Hash, LayoutGrid, MapPin, School } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useManagementEscuelas } from '../hooks/useManagementEscuela';
import EscuelaCard from './EscuelaCard';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useMaestraStore } from '@/stores/Maestra.store';


interface JoinEscuelaProps {
  onBack: () => void
}

export default function JoinEscuela( { onBack }: JoinEscuelaProps ) {
  const [ escuelas, setEscuelas ] = useState< EscuelaDTO[] >();
  const { listarEscuelas, unirmeAEscuela } = useManagementEscuelas();
  const [ escuelaSearch, setEscuelaSearch ] = useState("");
  const [ selectedEscuela, setSelectedEscuela ] = useState<EscuelaDTO | null>( null );
  const maestra = useMaestraStore((state) => state.maestra);

  useEffect(() => {
    const fetchEscuelas = async () => {
      const escuelas = await listarEscuelas();
  
      setEscuelas( escuelas );
    };
  
    fetchEscuelas();
  }, []);

  const handleSchoolClick = ( escuela: EscuelaDTO ) => {
    setSelectedEscuela( escuela );
  };

  const handleUnirme = async () => {
    await unirmeAEscuela( selectedEscuela?.escuelaId! );
    
    setSelectedEscuela( null );
  };

  const filteredEscuelas = escuelas?.filter(
    ( e ) =>
      e.nombre.toLowerCase().includes( escuelaSearch.toLowerCase() )
  );


  return (
    <div className='mx-auto flex h-dvh bg-background max-w-md flex-col'>
      {/* Header */}
      <div className='relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]'>
        {/* Subtle sparkles */}
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-6 left-[20%] h-1 w-1 rounded-full bg-white animate-pulse' />
          <div className='absolute top-10 right-[30%] h-0.5 w-0.5 rounded-full bg-white animate-pulse [animation-delay:0.5s]' />
          <div className='absolute top-16 left-[60%] h-1 w-1 rounded-full bg-white animate-pulse [animation-delay:1s]' />
          <div className='absolute top-8 right-[15%] h-0.5 w-0.5 rounded-full bg-white animate-pulse [animation-delay:0.3s]' />
          <div className='absolute top-14 left-[10%] h-1 w-1 rounded-full bg-amber-300 animate-pulse [animation-delay:0.7s]' />
        </div>

        <div className='relative px-4 pt-4 pb-6'>
          <div className='flex items-center gap-3'>
            <button
              onClick={ onBack }
              className='flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors'>
              <ArrowLeft className='h-5 w-5 text-white' />
            </button>
            <div className='flex-1'>
              <h1 className='text-xl font-bold text-white'>Unirme a una Escuela</h1>
              <p className='text-purple-200/60 text-sm'>Selecciona la escuela a la que quieres unirte</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className='flex-1 overflow-y-auto px-4 py-6 scrollbar-hide'>
        <Input
          value={ escuelaSearch }
          onChange={ ( e ) => setEscuelaSearch( e.target.value ) }
          placeholder='Buscar escuela'
          className="py-5 border-purple-500/30 bg-purple-900/20 pl-10 text-white placeholder:text-purple-300/50"
        />
        <div className='flex flex-col gap-3 pt-5 pb-24'>
          { filteredEscuelas?.map(( escuela ) => {
            const yaUnida = maestra?.escuelas?.some(
              ( escuelaMaestra ) => escuelaMaestra.escuelaId === escuela.escuelaId
            );

            return(
              <EscuelaCard
                key={ escuela.escuelaId }
                name={ escuela.nombre }
                location={ escuela.direccion }
                gradesCount={ escuela.listaGrados?.length || 0 }
                alreadyJoined={ yaUnida }
                onClick={() => handleSchoolClick( escuela )}
              />
            )
          })}
        </div>
      </main>
      <Drawer
        open={ !!selectedEscuela }
        onOpenChange={ ( open ) => { if ( !open ) setSelectedEscuela( null ); } }>
        <DrawerContent className='bg-[#1a1025] border-purple-500/20 max-w-md mx-auto h-[85vh]'>
          <DrawerHeader className='sr-only'>
            <DrawerTitle>{ selectedEscuela?.nombre }</DrawerTitle>
            <DrawerDescription>Datos de la escuela</DrawerDescription>
          </DrawerHeader>

          <div className='flex flex-1 flex-col overflow-y-auto px-6 pt-6'>
            {/* Hero */}
            <div className='flex flex-col items-center text-center'>
              <div className='h-20 w-60 rounded-2xl bg-amber-500/15 flex items-center justify-center'>
                <School className='h-10 w-10 text-amber-400' />
              </div>
              <h2 className='mt-4 text-2xl font-bold text-white text-balance'>
                { selectedEscuela?.nombre }
              </h2>
              <p className='mt-1 text-sm text-purple-200/50'>Datos de la escuela</p>
            </div>

            {/* Detalles como lista limpia */}
            <div className='mt-8 flex flex-col'>
              <div className='flex items-center gap-4 py-4 border-b border-purple-500/10'>
                <Hash className='h-5 w-5 text-amber-400/80 shrink-0' />
                <span className='text-sm text-purple-200/50 w-20'>Numero</span>
                <span className='flex-1 text-right text-white font-medium truncate'>
                  { selectedEscuela?.numero }
                </span>
              </div>
              <div className='flex items-center gap-4 py-4'>
                <MapPin className='h-5 w-5 text-amber-400/80 shrink-0' />
                <span className='text-sm text-purple-200/50 w-20'>Direccion</span>
                <span className='flex-1 text-right text-white font-medium truncate'>
                  { selectedEscuela?.direccion }
                </span>
              </div>
            </div>
          </div>

          {/* Footer button */}
          <div className='p-6'>
            <Button
              onClick={ handleUnirme }
              className='w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold'>
              Unirme
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
     
    </div>
  );
}
