import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface CreateAlumnoFormProps {
  onBack: () => void;
  // onSubmit: ( alumno: CreateAlumnoDTO ) => void;
}

export default function CreateAlumnoForm({ onBack }: CreateAlumnoFormProps) {
  const [ nombre, setNombre ] = useState("");
  const [ apellidoPaterno, setApellidoPaterno ] = useState("");
  const [ apellidoMaterno, setApellidoMaterno ] = useState("");
  const [ numeroDocumento, setNumeroDocumento ] = useState("");
  const [ direccion, setDireccion ] = useState("");

  const isFormValid = nombre.trim() !== "" && apellidoPaterno.trim() !== "" && apellidoMaterno.trim() !== "" && numeroDocumento.trim() !== "" && direccion.trim() !== "";

  // const handleSubmit = () => {
  //   onSubmit( { nombre, apellidoPaterno, apellidoMaterno, numeroDocumento, direccion, fechaNacimiento: new Date() } ); // TODO: Agregar la validacion correcta de la fecha de nacimiento
  // };

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
              <h1 className="text-xl font-bold text-white">Nuevo Alumno</h1>
              <p className="text-purple-200/60 text-sm">Completa los datos del Alumno</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="flex flex-col flex-1 gap-2 overflow-y-auto px-4 py-6 scrollbar-hide">
        <FieldGroup>
        <Field className="flex flex-col gap-1">
            <FieldLabel className='text-sm font-medium text-purple-200/70'>
              Nombre del Alumno
            </FieldLabel>
            <Input
              placeholder="Ingrese el nombre del Alumno"
              className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
              onChange={ ( e ) => setNombre( e.target.value ) }
            />
        </Field>
      </FieldGroup>

      <div className='grid grid-cols-2 gap-4'>
        <FieldGroup>
          <Field className="flex flex-col gap-1">
              <FieldLabel className='text-sm font-medium text-purple-200/70'>
                Apellido paterno
              </FieldLabel>
              <Input
                placeholder="Ingrese el apellido"
                className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
                onChange={ ( e ) => setApellidoPaterno( e.target.value ) }
              />
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field className="flex flex-col gap-1">
              <FieldLabel className='text-sm font-medium text-purple-200/70'>
                Apellido materno
              </FieldLabel>
              <Input
                placeholder="Ingrese el apellido"
                className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
                onChange={ ( e ) => setApellidoMaterno( e.target.value ) }
              />
          </Field>
        </FieldGroup>
      </div>

      <FieldGroup>
        <Field className="flex flex-col gap-1">
            <FieldLabel className='text-sm font-medium text-purple-200/70'>
              Número de documento
            </FieldLabel>
            <Input
              placeholder="Ingrese el número de documento"
              className="w-full rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-5 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400"
              onChange={ ( e ) => setNumeroDocumento( e.target.value)  }
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

      {/* Aca necesito pedir la fecha de nacimiento pero poniendo un picker de fechas */}
      <FieldGroup>
        <Field className="flex flex-col gap-1">
            <FieldLabel className='text-sm font-medium text-purple-200/70'>
              Selecciona la Fecha de Nacimiento
            </FieldLabel>
            <h1>AQUI VA EL PICKER</h1>
        </Field>
      </FieldGroup>

      </main> 

      {/* Footer button */}
      <div className="p-4 border-t border-purple-500/10">
        <Button
          // onClick={ handleSubmit }
          disabled={ !isFormValid }
          className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Crear Alumno
        </Button>
      </div>
    </div>
  );
}
