import { useState } from "react";
import { ArrowLeft, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateEscuelaFormProps {
  onBack: () => void;
  onSubmit: ( escuela: { nombre: string; numero: string; direccion: string } ) => void;
}

export default function CreateEscuelaForm({ onBack, onSubmit }: CreateEscuelaFormProps) {
  const [ nombre, setNombre ] = useState("");
  const [ numero, setNumero ] = useState("");
  const [ direccion, setDireccion ] = useState("");

  const isFormValid = nombre.trim() !== "" && numero.trim() !== "" && direccion.trim() !== "";

  const handleSubmit = () => {
    if (isFormValid) {
      onSubmit({ nombre, numero, direccion });
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
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <School className="h-6 w-6 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
        <div className="flex flex-col gap-5">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-purple-200/80">
              Nombre de la escuela <span className="text-red-400">*</span>
            </label>
            <Input
              placeholder="Ej: Escuela Primaria Benito Juarez"
              value={ nombre }
              onChange={( e ) => setNombre( e.target.value )}
              className="bg-[#1a1025] border-purple-500/20 text-white placeholder:text-purple-200/30 focus:border-amber-500/50 focus:ring-amber-500/20"
            />
          </div>

          {/* Numero */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-purple-200/80">
              Numero <span className="text-red-400">*</span>
            </label>
            <Input
              placeholder="Ej: 123"
              value={ numero }
              onChange={( e ) => setNumero( e.target.value )}
              className="bg-[#1a1025] border-purple-500/20 text-white placeholder:text-purple-200/30 focus:border-amber-500/50 focus:ring-amber-500/20"
            />
          </div>

          {/* Direccion */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-purple-200/80">
              Direccion <span className="text-red-400">*</span>
            </label>
            <Input
              placeholder="Ej: Calle Principal #456, Col. Centro"
              value={ direccion }
              onChange={( e ) => setDireccion( e.target.value )}
              className="bg-[#1a1025] border-purple-500/20 text-white placeholder:text-purple-200/30 focus:border-amber-500/50 focus:ring-amber-500/20"
            />
          </div>
        </div>
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
