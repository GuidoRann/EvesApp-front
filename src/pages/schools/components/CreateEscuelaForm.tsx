import { useState } from "react";
import { ArrowLeft, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CreateEscuelaDTO } from '@/types/EscuelaTypes';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface CreateEscuelaFormProps {
  onBack: () => void;
  onSubmit: ( escuela: CreateEscuelaDTO ) => void;
}

export default function CreateEscuelaForm({ onBack, onSubmit }: CreateEscuelaFormProps) {
  const [ nombre, setNombre ] = useState("");
  const [ numero, setNumero ] = useState("");
  const [ direccion, setDireccion ] = useState("");
  const [ telefono, setTelefono ] = useState("");

  const isFormValid = nombre.trim() !== "" && numero.trim() !== "" && direccion.trim() !== "" && telefono.trim() !== "";

  const handleSubmit = () => {
    onSubmit( { nombre, numero, direccion, telefono } );
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
              <h1 className="text-xl font-bold text-white">Nueva Escuela</h1>
              <p className="text-purple-200/60 text-sm">Completa los datos de la escuela</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="flex flex-col flex-1 gap-2 overflow-y-auto px-4 py-6 scrollbar-hide">
        <FieldGroup>
        <Field className="flex flex-col gap-1">
            <FieldLabel className='text-sm font-medium text-purple-200/70'>
              Nombre de la escuela
            </FieldLabel>
            <Input
              placeholder="Ingrese el nombre de la escuela"
              className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
              onChange={ ( e ) => setNombre( e.target.value ) }
            />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field className="flex flex-col gap-1">
            <FieldLabel className='text-sm font-medium text-purple-200/70'>
              Número de la escuela
            </FieldLabel>
            <Input
              placeholder="Ingrese el nombre de la escuela"
              className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
              onChange={ ( e ) => setNumero( e.target.value ) }
            />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field className="flex flex-col gap-1">
            <FieldLabel className='text-sm font-medium text-purple-200/70'>
              Direccion 
            </FieldLabel>
            <Input
              placeholder="Ingrese el nombre de la escuela"
              className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
              onChange={ ( e ) => setDireccion( e.target.value ) }
            />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field className="flex flex-col gap-1">
            <FieldLabel className='text-sm font-medium text-purple-200/70'>
              Telefono 
            </FieldLabel>
            <Input
              placeholder="Ingrese el telefono de la escuela"
              className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
              onChange={ ( e ) => setTelefono( e.target.value ) }
            />
        </Field>
      </FieldGroup>
      </main> 

      {/* Footer button */}
      <div className="p-4 border-t border-purple-500/10">
        <Button
          onClick={ handleSubmit }
          disabled={ !isFormValid }
          className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Crear Escuela
        </Button>
      </div>
    </div>
  );
}
