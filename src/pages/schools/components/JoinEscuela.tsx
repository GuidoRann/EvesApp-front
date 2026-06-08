import { Button } from '@/components/ui/button';
import type { EscuelaDTO } from '@/types/EscuelaTypes';
import { ArrowLeft, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useManagementEscuelas } from '../hooks/useManagementEscuela';


interface JoinEscuelaProps {
  onBack: () => void
}

export default function JoinEscuela( { onBack }: JoinEscuelaProps ) {
  const [ escuelas, setEscuelas ] = useState< EscuelaDTO[] >();
  const { listarEscuelas } = useManagementEscuelas();

  useEffect(() => {
      const fetchEscuelas = async () => {
        const escuelas = await listarEscuelas();
  
        setEscuelas( escuelas );
      };
  
        fetchEscuelas();
    }, []);

  return (
   <div className="mx-auto flex h-dvh bg-background max-w-md flex-col">
      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]">
        {/* Subtle sparkles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-6 left-[20%] h-1 w-1 rounded-full bg-white animate-pulse" />
          <div className="absolute top-10 right-[30%] h-0.5 w-0.5 rounded-full bg-white animate-pulse [animation-delay:0.5s]" />
          <div className="absolute top-16 left-[60%] h-1 w-1 rounded-full bg-white animate-pulse [animation-delay:1s]" />
          <div className="absolute top-8 right-[15%] h-0.5 w-0.5 rounded-full bg-white animate-pulse [animation-delay:0.3s]" />
          <div className="absolute top-14 left-[10%] h-1 w-1 rounded-full bg-amber-300 animate-pulse [animation-delay:0.7s]" />
        </div>
        
        <div className="relative px-4 pt-4 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={ onBack }
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">Unirme a una Escuela</h1>
              <p className="text-purple-200/60 text-sm">Selecciona la escuela a la que quieres unirte</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <LayoutGrid className="h-6 w-6 text-amber-400" />
            </div>
          </div>
        </div>

      </div>

      {/* Form */}
      <main className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">

        {/* TODO: Aqui la logica de mostrar las escuelas y dar la opcion 
        para que la persona pueda elegir una y luego unirse con el boton al final */}
        
      </main>

      {/* Footer button */}
      <div className="p-4 border-t border-purple-500/10">
        <Button
          onClick={ () => {} }
          className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Unirme
        </Button>
      </div>
    </div>
  )
}
