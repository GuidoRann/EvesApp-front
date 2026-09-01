import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import type { CreateFamiliarDTO, FamiliarType } from '@/types/FamiliarTypes';
import ParentescoSwitch from './ParentescoSwitch';
import { useParams } from 'react-router-dom';
import { useManagementFamiliar } from '../../hooks/useManagementFamiliar';

interface CreateFamiliarViewProps {
  onBack: () => void;
  onSubmit: ( familiar: FamiliarType ) => void;
}

export default function CreateFamiliarView({ onBack, onSubmit }: CreateFamiliarViewProps) {
  const [ nombre, setNombre ] = useState("");
  const [ apellido, setApellido ] = useState("");
  const [ direccion, setDireccion ] = useState("");
  const [ numeroTelefono, setNumeroTelefono ] = useState("");
  const [ ocupacion, setOcupacion ] = useState("");
  const [ numeroDocumento, setNumeroDocumento ] = useState("");
  const [ parentesco, setParentesco ] = useState("");

  const [ isCreating, setIsCreating ] = useState(false);

  const { crearFamiliar } = useManagementFamiliar();

  const { alumnoId } = useParams();

  const isFormValid = nombre.trim() !== "" && apellido.trim() !== "" && direccion.trim() !== "" &&  numeroTelefono.trim() !== "" && ocupacion.trim() !== "" && numeroDocumento.trim() !== "";

  const formatNumber = ( value: string ) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSubmit = async () => {
    if (!parentesco || !alumnoId) return;

    setIsCreating(true);

    try {
      const familiar: CreateFamiliarDTO = {
        nombre,
        apellido,
        direccion,
        numeroTelefono,
        ocupacion,
        numeroDocumento,
      };
  
      const newFamiliar: FamiliarType = await crearFamiliar( familiar, parentesco, alumnoId );
  
      toast.success('✅ Familiar creado exitosamente!');
      
      onSubmit( newFamiliar );

    } catch ( error ) {
      console.error("Error al crear familiar:", error);
      toast.error("No se pudo crear el familiar");
    } finally {
      setIsCreating( false );
    }
  };

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
          <div className="absolute top-14 left-[10%] h-1 w-1 rounded-full bg-emerald-300 animate-pulse [animation-delay:0.7s]" />
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
              <h1 className="text-xl font-bold text-white">Nuevo Familiar</h1>
              <p className="text-purple-200/60 text-sm">Completa los datos del Familiar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="flex flex-col flex-1 gap-2 overflow-y-auto px-4 py-6 scrollbar-hide">
        <FieldGroup>
        <Field className="flex flex-col gap-1">
            <FieldLabel className='text-sm font-medium text-purple-200/70'>
              Nombre
            </FieldLabel>
            <Input
              placeholder="Ingrese el nombre del Familiar"
              className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
              onChange={ ( e ) => setNombre( e.target.value ) }
            />
        </Field>
      </FieldGroup>

        <FieldGroup>
          <Field className="flex flex-col gap-1">
              <FieldLabel className='text-sm font-medium text-purple-200/70'>
                Apellido
              </FieldLabel>
              <Input
                placeholder="Ingrese el apellido"
                className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
                onChange={ ( e ) => setApellido( e.target.value ) }
              />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="flex flex-col gap-1">
              <FieldLabel className='text-sm font-medium text-purple-200/70'>
                Dirección
              </FieldLabel>
              <Input
                placeholder="Ingrese la dirección"
                className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
                onChange={ ( e ) => setDireccion( e.target.value ) }
              />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="flex flex-col gap-1">
              <FieldLabel className='text-sm font-medium text-purple-200/70'>
                Número de Telefono
              </FieldLabel>
              <Input
                placeholder="Ingrese el número telefono"
                className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
                onChange={ ( e ) => setNumeroTelefono( e.target.value ) }
              />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="flex flex-col gap-1">
              <FieldLabel className='text-sm font-medium text-purple-200/70'>
                Ocupación
              </FieldLabel>
              <Input
                placeholder="Ingrese la ocupación"
                className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
                onChange={ ( e ) => setOcupacion( e.target.value ) }
              />
          </Field>
        </FieldGroup>

         <FieldGroup>
          <Field className="flex flex-col gap-1">
              <FieldLabel className='text-sm font-medium text-purple-200/70'>
                Número de documento
              </FieldLabel>
              <Input
                inputMode="numeric"
                placeholder="Ingrese el Número de documento"
                className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
                value={ formatNumber( numeroDocumento ) }
                onChange={ ( e ) => setNumeroDocumento( e.target.value.replace(/\D/g, "") ) }
              />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="flex flex-col gap-1">
            <ParentescoSwitch
              value={ parentesco }
              onChange={ setParentesco }
            />
          </Field>
        </FieldGroup>
        

      </main> 

      {/* Footer button */}
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
            "Crear Familiar"
          ) }
        </Button>
      </div>
    </div>
  );
}

