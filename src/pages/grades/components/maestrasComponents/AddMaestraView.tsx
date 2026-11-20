import { Button } from '@/components/ui/button';
import { ArrowLeft, Hash, Loader2, MapPin, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useGradoStore } from '@/stores/Grado.store';
import MaestraCard from './MaestraCard';
import { useState } from 'react';
import type { MaestraType } from '@/types/MaestraTypes';
import { useMaestraStore } from '@/stores/Maestra.store';
import { useManagementGrados } from '../../hooks/useManagementGrados';
import { toast } from 'sonner';

interface addMaestraProps {
  onBack: () => void
}

export default function AddMaestraView( { onBack }: addMaestraProps ) {
  const [ maestraSearch, setMaestraSearch ] = useState("");
  const [ selectedMaestra, setSelectedMaestra ] = useState<MaestraType | null>( null );

  const [ isCreating, setIsCreating ] = useState( false );

  const { agregarMaestra } = useManagementGrados();

  const listaMaestras = useMaestraStore( ( state ) => state.listaMaestras ?? [] );

  const { addMaestra } = useGradoStore();

  const grado = useGradoStore( ( state ) => state.grado );

  const filteredMaestras = listaMaestras.filter(
    ( e ) =>
      `${ e.nombre } ${ e.apellido }`
        .toLowerCase()
        .includes( maestraSearch.toLowerCase() )
  );

  const handleMaestraClick = ( maestra: MaestraType ) => {
    setSelectedMaestra( maestra );
  };

  const handleSubmit = async () => {
    if ( !selectedMaestra || !grado?.gradoId ) return;
    setIsCreating(true);

    try {
      await agregarMaestra( grado.gradoId, selectedMaestra.maestraId );  
      
      addMaestra( selectedMaestra! );
      
      toast.success( 'Maestra agregada exitosamente!' );

      onBack();
    } catch ( error ) {
      console.log("Error al agregar maestra: ", error );
      toast.error( "No se pudo agregar la maestra" );
    } finally {
      setIsCreating( false );
    }
  }
  
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
              <h1 className='text-xl font-bold text-white'>Agregar maestras al grado</h1>
              <p className='text-purple-200/60 text-sm'>Selecciona la maestra que quieras agregar al grado</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className='flex-1 overflow-y-auto px-4 py-6 scrollbar-hide'>
        <Input
          value={ maestraSearch }
          onChange={ ( e ) => setMaestraSearch( e.target.value ) }
          placeholder='Buscar maestra'
          className="py-5 border-purple-500/30 bg-purple-900/20 pl-10 text-white placeholder:text-purple-300/50"
        />
        <div className='flex flex-col gap-3 pt-5 pb-24'>
          { filteredMaestras?.map(( maestra ) => {
            const maestraTitular = grado?.maestraTitular?.maestraId === maestra.maestraId;
            
            const yaUnida = grado?.maestrasAdicionales?.some(
              ( gradoMaestra ) => gradoMaestra.maestraId === maestra.maestraId
            );


            return(
              <MaestraCard
                key={ maestra.maestraId }
                maestra={ maestra }
                alreadyJoined={ yaUnida || maestraTitular }
                onClick={ () => handleMaestraClick( maestra ) }
              />
            )
          })}
        </div>
      </main>
      <Drawer
        open={ !!selectedMaestra }
        onOpenChange={ ( open ) => { if ( !open ) setSelectedMaestra( null ) } }>
        <DrawerContent className='bg-[#1a1025] border-purple-500/20 max-w-md mx-auto h-[85vh]'>
          <DrawerHeader className='sr-only'>
            <DrawerTitle>{ selectedMaestra?.nombre }</DrawerTitle>
            <DrawerDescription>Datos de la maestra</DrawerDescription>
          </DrawerHeader>

          <div className='flex flex-1 flex-col overflow-y-auto px-6 pt-6'>
            {/* Hero */}
            <div className='flex flex-col items-center text-center'>
              <div className='h-20 w-60 rounded-2xl bg-cyan-500/15 flex items-center justify-center'>
                <User className='h-10 w-10 text-cyan-400' />
              </div>
              <h2 className='mt-4 text-2xl font-bold text-white text-balance'>
                { selectedMaestra?.nombre } { selectedMaestra?.apellido }
              </h2>
              <p className='mt-1 text-sm text-purple-200/50'>Datos de la maestra</p>
            </div>

            {/* Detalles como lista limpia */}
            <div className='mt-8 flex flex-col'>
              <div className='flex items-center gap-4 py-4 border-b border-purple-500/10'>
                <Hash className='h-5 w-5 text-cyan-400/80 shrink-0' />
                <span className='text-sm text-purple-200/50 w-20'>Email</span>
                <span className='flex-1 text-right text-white font-medium truncate'>
                  { selectedMaestra?.email }
                </span>
              </div>
              <div className='flex items-center gap-4 py-4'>
                <MapPin className='h-5 w-5 text-cyan-400/80 shrink-0' />
                <span className='text-sm text-purple-200/50 w-20'>Escuelas como titular</span>
                <span className='flex-1 text-right text-white font-medium truncate'>
                  { selectedMaestra?.gradosComoTitular?.length }
                </span>
              </div>
            </div>
          </div>

          {/* Footer button */}
          <div className='p-6'>
            <Button
              onClick={ handleSubmit }
              className='w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold'>
              { isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Agregar maestra"
              ) }
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
     
    </div>
  );
}
