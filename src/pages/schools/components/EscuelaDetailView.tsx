import { useState } from "react";
import {
  ArrowLeft,
  School,
  MapPin,
  Hash,
  BookOpen,
  Users,
  ChevronRight,
  Search,
  Check,
  UserPlus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import type { EscuelaDTO } from '@/types/EscuelaTypes';
import type { MaestraDTO } from '@/types/MaestraTypes';

interface EscuelaDetailViewProps {
  escuela: EscuelaDTO;
  onBack: () => void;
}

// Mock data for available teachers
// const availableMaestras: MaestraDTO[] = [
//   { maestraId: "1", nombre: "Maria Garcia", email: "maria@escuela.com" },
//   { id: "2", nombre: "Ana Martinez", email: "ana@escuela.com" },
//   { id: "3", nombre: "Laura Rodriguez", email: "laura@escuela.com" },
//   { id: "4", nombre: "Carmen Lopez", email: "carmen@escuela.com" },
//   { id: "5", nombre: "Sofia Hernandez", email: "sofia@escuela.com" },
// ];

export default function EscuelaDetailView({ escuela, onBack }: EscuelaDetailViewProps) {
  const [ maestrasOpen, setMaestrasOpen ] = useState( false );
  const [ maestrasSearch, setMaestrasSearch ] = useState( "" );
  const [ selectedMaestras, setSelectedMaestras ] = useState< MaestraDTO[] >( escuela.maestras );
  const [ tempSelectedMaestras, setTempSelectedMaestras ] = useState< MaestraDTO[] >( [] );
  const [ availableMaestras, setAvailableMaestras ] = useState< MaestraDTO[] >( escuela.maestras );

  // Filter teachers based on search
  const filteredMaestras = availableMaestras.filter(
    ( m ) =>
      m.nombre.toLowerCase().includes(maestrasSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(maestrasSearch.toLowerCase())
  );

  const handleOpenMaestras = () => {
    setTempSelectedMaestras([...selectedMaestras]);
    setMaestrasOpen(true);
  };

  const toggleMaestraSelection = (maestra: MaestraDTO) => {
    const isSelected = tempSelectedMaestras.some((m) => m.maestraId === maestra.maestraId);
    if (isSelected) {
      setTempSelectedMaestras(tempSelectedMaestras.filter((m) => m.maestraId !== maestra.maestraId));
    } else {
      setTempSelectedMaestras([...tempSelectedMaestras, maestra]);
    }
  };

  const handleSaveMaestras = () => {
    setSelectedMaestras(tempSelectedMaestras);
    setMaestrasOpen(false);
  };

  const removeMaestra = (maestraId: string) => {
    setSelectedMaestras(selectedMaestras.filter((m) => m.maestraId !== maestraId));
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
              <h1 className="text-xl font-bold text-white truncate">{ escuela.nombre }</h1>
              <p className="text-purple-200/60 text-sm">Detalle de la escuela</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <School className="h-6 w-6 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
        {/* School Info Cards */}
        <div className="flex flex-col gap-3">
          {/* Nombre */}
          <div className="flex items-center gap-4 p-4 bg-[#1a1025] border border-purple-500/10 rounded-xl">
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <School className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-purple-200/50 text-xs">Nombre</p>
              <p className="text-white font-medium">{ escuela.nombre }</p>
            </div>
          </div>

          {/* Numero */}
          <div className="flex items-center gap-4 p-4 bg-[#1a1025] border border-purple-500/10 rounded-xl">
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <Hash className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-purple-200/50 text-xs">Numero</p>
              <p className="text-white font-medium">{ escuela.numero }</p>
            </div>
          </div>

          {/* Direccion */}
          <div className="flex items-center gap-4 p-4 bg-[#1a1025] border border-purple-500/10 rounded-xl">
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-purple-200/50 text-xs">Direccion</p>
              <p className="text-white font-medium">{ escuela.direccion }</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-purple-500/10 my-6" />

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {/* Grados - Read only for now */}
          <button className="flex items-center gap-4 p-4 bg-[#1a1025] border border-purple-500/10 rounded-xl hover:bg-[#201328] transition-colors">
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-medium">Lista de Grados</p>
              <p className="text-purple-200/50 text-xs">
                { escuela.grados.length > 0
                  ? `${escuela.grados.length} ${escuela.grados.length === 1 ? "grado" : "grados"}`
                  : "Sin grados asignados" }
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-purple-200/30" />
          </button>

          {/* Maestras */}
          <button
            onClick={ handleOpenMaestras }
            className="flex items-center gap-4 p-4 bg-[#1a1025] border border-purple-500/10 rounded-xl hover:bg-[#201328] transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <Users className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-medium">Maestras de la Escuela</p>
              <p className="text-purple-200/50 text-xs">
                { selectedMaestras.length > 0
                  ? `${selectedMaestras.length} ${selectedMaestras.length === 1 ? "maestra" : "maestras"}`
                  : "Sin maestras asignadas" }
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-purple-200/30" />
          </button>
        </div>

        {/* Selected Maestras Preview */}
        { selectedMaestras.length > 0 && (
          <div className="mt-4">
            <p className="text-purple-200/50 text-xs mb-2 px-1">Maestras asignadas</p>
            <div className="flex flex-col gap-2">
              { selectedMaestras.map(( maestra ) => (
                <div
                  key={ maestra.maestraId }
                  className="flex items-center gap-3 p-3 bg-[#1a1025] border border-purple-500/10 rounded-xl"
                >
                  <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 text-xs font-medium">
                      { maestra.nombre.charAt( 0 ) }
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{ maestra.nombre }</p>
                    <p className="text-purple-200/40 text-xs">{ maestra.email }</p>
                  </div>
                  <button
                    onClick={() => removeMaestra( maestra.maestraId )}
                    className="h-8 w-8 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Maestras Drawer */}
      <Drawer open={ maestrasOpen } onOpenChange={ setMaestrasOpen }>
        <DrawerContent className="bg-[#1a1025] border-purple-500/20">
          <DrawerHeader>
            <DrawerTitle className="text-white">Maestras de la Escuela</DrawerTitle>
            <DrawerDescription className="text-purple-200/60">
              Selecciona las maestras que pertenecen a esta escuela
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-200/40" />
              <Input
                placeholder="Buscar maestra..."
                value={ maestrasSearch }
                onChange={( e ) => setMaestrasSearch( e.target.value )}
                className="pl-10 bg-[#110a24] border-purple-500/20 text-white placeholder:text-purple-200/30"
              />
            </div>
            <div className="max-h-64 overflow-y-auto flex flex-col gap-2">
              { filteredMaestras.map(( maestra ) => {
                const isSelected = tempSelectedMaestras.some(( m ) => m.maestraId === maestra.maestraId);
                return (
                  <button
                    key={ maestra.maestraId }
                    onClick={() => toggleMaestraSelection( maestra )}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isSelected
                        ? "bg-amber-500/20 border border-amber-500/30"
                        : "bg-[#110a24] border border-purple-500/10 hover:border-purple-500/30"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        isSelected ? "bg-amber-500" : "bg-purple-500/20"
                      }`}
                    >
                      { isSelected ? (
                        <Check className="h-4 w-4 text-white" />
                      ) : (
                        <UserPlus className="h-4 w-4 text-purple-300" />
                      ) }
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-white text-sm font-medium">{ maestra.nombre }</p>
                      <p className="text-purple-200/40 text-xs">{ maestra.email }</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <Button
              onClick={ handleSaveMaestras }
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white"
            >
              Guardar ( { tempSelectedMaestras.length } seleccionadas )
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
