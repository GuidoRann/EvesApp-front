import { useState } from "react";
import { ChevronLeft, Search, School, Check, ArrowLeft, LayoutGrid, Loader2 } from "lucide-react";
import { Button} from "@/components/ui/button";
import { Input} from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useEscuelaStore } from '@/stores/Escuela.store';
import type { CreateGradoDTO } from '@/types/GradoTypes';
import { useManagementGrados } from '../../hooks/useManagementGrados';
import { useMaestraStore } from '@/stores/Maestra.store';
import { toast } from 'sonner';
import type { EscuelaDTO } from '@/types/EscuelaTypes';

interface CreateGradoFormProps {
  onBack?: () => void;
}

export default function CreateGradoForm({ onBack }: CreateGradoFormProps) {
  const escuelas = useEscuelaStore( state => state.listaDeEscuelas ); //TODO: generar el store de escuelas al entrar en la app

  const [ selectedEscuela, setSelectedEscuela ] = useState<EscuelaDTO | null>( null );

  const [ escuelaId, setEscuelaId ] = useState<string>("");
  const [ numero, setNumero ] = useState<string>("");
  const [ letra, setLetra ] = useState<string>("");
  const [ turno, setTurno ] = useState<string>("");
  const [ divisionAnual, setDivisionAnual ] = useState<string>("");

  const [ isCreating, setIsCreating ] = useState(false);

  const [ escuelaSearch, setEscuelaSearch ] = useState("");
  const [ showEscuelaDrawer, setShowEscuelaDrawer ] = useState(false);

  const { crearGrado } = useManagementGrados();

  const maestra = useMaestraStore( ( state ) => state.maestra );

  const filteredEscuelas = escuelas.filter(( e ) => e.nombre.toLowerCase().includes( escuelaSearch.toLowerCase() ));


  const isFormValid = escuelaId.trim() !== "" && numero.trim() !== "" && letra.trim() !== "" && turno.trim() !== "" && divisionAnual.trim() !== "";


  const handleSubmit = async () => {
    if ( !maestra ) return;
    setIsCreating(true);

    try {
      const grado: CreateGradoDTO = {
        escuelaId,
        numero,
        letra,
        turno,
        divisionAnual,
        maestraTitularId: maestra.maestraId,
        listaAlumnos: []
      };

      await crearGrado( grado );

      toast.success('✅ Grado creado exitosamente!');
      
    } catch (error) {
      console.error("Error al crear grado:", error);
      toast.error("No se pudo crear el grado");
    } finally {
      setIsCreating( false );
    }

    
  };

  return (
    <div className='mx-auto flex min-h-dvh flex-col max-w-md bg-background'>
      {/* Header */}
      <div className='relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] pb-6 pt-4'>
        {/* Sparkles */}
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute left-[20%] top-6 h-1 w-1 animate-pulse rounded-full bg-white' />
          <div className='absolute right-[30%] top-10 h-0.5 w-0.5 animate-pulse rounded-full bg-white' />
          <div className='absolute left-[60%] top-16 h-1 w-1 animate-pulse rounded-full bg-white' />
          <div className='absolute right-[15%] top-8 h-0.5 w-0.5 animate-pulse rounded-full bg-white' />
          <div className='absolute left-[10%] top-14 h-1 w-1 animate-pulse rounded-full bg-purple-300' />
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
              <h1 className="text-xl font-bold text-white">Nuevo Grado</h1>
              <p className="text-purple-200/60 text-sm">Configura los datos de tu nuevo grado</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <LayoutGrid className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className='flex-1 space-y-6 overflow-y-auto px-4 py-6 pb-24'>
        <FieldGroup>
          {/* Escuela */}
          <Field>
            <FieldLabel className='text-purple-100'>Escuela *</FieldLabel>
            <button
              type='button'
              onClick={() => setShowEscuelaDrawer(true)}
              className='flex w-full items-center justify-between rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-3 text-left transition-colors hover:bg-purple-900/30'>
              <div className='flex items-center gap-3'>
                <School className='h-5 w-5 text-purple-400' />
                <span className={ selectedEscuela ? "text-white" : "text-purple-300/50" }>
                  { selectedEscuela?.nombre || "Seleccionar escuela" }
                </span>
              </div>
              <ChevronLeft className='h-5 w-5 rotate-180 text-purple-400' />
            </button>
          </Field>

          {/* Numero y Letra */}
          <div className='grid grid-cols-2 gap-4'>
            <Field>
              <FieldLabel className='text-purple-100'>Grado *</FieldLabel>
              <Select value={ numero } onValueChange={( value ) => setNumero( value ) }>
                <SelectTrigger className='w-full border-purple-500/30 bg-purple-900/20 text-white py-5'>
                  <SelectValue placeholder='Numero' />
                </SelectTrigger>
                <SelectContent className='border-purple-500/30 bg-[#1a0a2e]'>
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <SelectItem
                      key={ num }
                      value={ num.toString() }
                      className='text-white focus:bg-purple-800/50 focus:text-white'>
                      { num }°
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel className='text-purple-100'>Grupo *</FieldLabel>
              <Select value={ letra } onValueChange={( value ) => setLetra( value )}>
                <SelectTrigger className='w-full border-purple-500/30 bg-purple-900/20 text-white py-5'>
                  <SelectValue placeholder='Letra' />
                </SelectTrigger>
                <SelectContent className='border-purple-500/30 bg-[#1a0a2e]'>
                  {["A", "B", "C", "D", "E"].map(( letra ) => (
                    <SelectItem
                      key={ letra }
                      value={ letra }
                      className='text-white focus:bg-purple-800/50 focus:text-white'>
                      { letra }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          {/* Turno */}
          <Field>
            <FieldLabel className='text-purple-100'>Turno *</FieldLabel>
            <Select value={ turno } onValueChange={( value ) => setTurno( value )}>
              <SelectTrigger className='w-full border-purple-500/30 bg-purple-900/20 text-white py-5'>
                <SelectValue placeholder='Seleccionar turno' />
              </SelectTrigger>
              <SelectContent className='border-purple-500/30 bg-[#1a0a2e]'>
                <SelectItem value='mañana' className='text-white focus:bg-purple-800/50 focus:text-white'>
                  Mañana
                </SelectItem>
                <SelectItem value='tarde' className='text-white focus:bg-purple-800/50 focus:text-white'>
                  Tarde
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Division Anual */}
          <Field>
            <FieldLabel className='text-purple-100'>Division Anual *</FieldLabel>
            <Select
              value={ divisionAnual }
              onValueChange={( value ) => setDivisionAnual( value )}>
              <SelectTrigger className='w-full border-purple-500/30 bg-purple-900/20 text-white py-5'>
                <SelectValue placeholder='Seleccionar division' />
              </SelectTrigger>
              <SelectContent className='border-purple-500/30 bg-[#1a0a2e]'>
                <SelectItem value='bimestre' className='text-white focus:bg-purple-800/50 focus:text-white'>
                  Bimestre
                </SelectItem>
                <SelectItem value='trimestre' className='text-white focus:bg-purple-800/50 focus:text-white'>
                  Trimestre
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </div>

      {/* Submit Button */}
      <div className="p-4 border-t border-purple-500/10">
         <Button
          onClick={ handleSubmit }
          disabled={ !isFormValid || isCreating }
          className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          { isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando...
            </>
          ) : (
            "Crear Grado"
          ) }
        </Button>
      </div>

      {/* Escuela Drawer */}
      <Drawer
          open={showEscuelaDrawer}
          onOpenChange={setShowEscuelaDrawer}
        >
          <DrawerContent className="mx-auto max-w-md border-purple-500/30 bg-[#110a24]">
            
            <DrawerHeader>
              <DrawerTitle className="text-white">
                Seleccionar Escuela
              </DrawerTitle>
            </DrawerHeader>

            <div className="px-4 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />

                <Input
                  placeholder="Buscar escuela..."
                  value={escuelaSearch}
                  onChange={(e) => setEscuelaSearch(e.target.value)}
                  className="border-purple-500/30 bg-purple-900/20 pl-10 text-white placeholder:text-purple-300/50"
                />
              </div>
            </div>

            <div className="max-h-[50vh] space-y-2 overflow-y-auto px-4 pb-6">
              {filteredEscuelas.map((escuela) => (
                <button
                  key={escuela.escuelaId}
                  onClick={() => {
                    setEscuelaId(escuela.escuelaId);
                    setSelectedEscuela(escuela);
                    setShowEscuelaDrawer(false);
                    setEscuelaSearch("");
                  }}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                    escuelaId === escuela.escuelaId
                      ? "border-purple-500 bg-purple-600/30"
                      : "border-purple-500/20 bg-purple-900/20 hover:bg-purple-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <School className="h-5 w-5 text-purple-400" />

                    <span className="text-white">
                      {escuela.nombre}
                    </span>
                  </div>

                  {escuelaId === escuela.escuelaId && (
                    <Check className="h-5 w-5 text-purple-400" />
                  )}
                </button>
              ))}
            </div>

          </DrawerContent>
        </Drawer>
    </div>
  );
}
