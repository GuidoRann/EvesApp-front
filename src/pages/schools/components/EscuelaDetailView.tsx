import { useEffect, useState } from "react";
import {
  ArrowLeft,
  School,
  MapPin,
  Hash,
  BookOpen,
  Users,
  ChevronRight,
  Search,
  PhoneIcon,
  User,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EscuelaDetailViewProps {
  escuela: EscuelaDTO;
  onBack: () => void;
}

export default function EscuelaDetailView({ escuela, onBack }: EscuelaDetailViewProps) {
  const [ maestrasOpen, setMaestrasOpen ] = useState( false );
  const [ maestrasSearch, setMaestrasSearch ] = useState( "" );
  const [ gradosOpen, setGradosOpen ] = useState( false );
  const [ gradosSearch, setGradosSearch ] = useState( "" );
  const [ availableMaestras, setAvailableMaestras ] = useState< MaestraDTO[] >( [] );


  useEffect(() => {
    setAvailableMaestras( escuela.maestras ?? [] );
  }, [ escuela ]);

  // Filtro para buscar maestras
  const filteredMaestras = availableMaestras.filter(
    ( m ) =>
      m.nombre.toLowerCase().includes( maestrasSearch.toLowerCase() ) ||
      m.email.toLowerCase().includes( maestrasSearch.toLowerCase() )
  );

  // Filtro para separar grados por turnos
  const filteredGrados = escuela.listaGrados?.filter(
    (g) => !gradosSearch || g.turno === gradosSearch
  );

  const handleOpenGrados = () => {
    setGradosSearch( "" );
    setGradosOpen( true );
  };

  const handleOpenMaestras = () => {
    setMaestrasOpen( true );
  };

  return (
    <div className="mx-auto flex h-dvh bg-background max-w-md flex-col">
      <div className="relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24]">
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
          </div>
        </div>
      </div>

      {/* Contenido general */}
      <main className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
        {/* Informacion de la escuela */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 ">
            {/* Nombre */}
            <div className="flex w-3/4 gap-4 p-4  bg-[#1a1025] border border-purple-500/20 rounded-xl">
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <School className="h-5 w-5 text-purple-300" />
              </div>
              <div className="flex flex-col">
                <p className="text-purple-200/50 text-xs">Nombre</p>
                <p className="text-white font-medium">{ escuela.nombre }</p>
              </div>
            </div>

            {/* Numero */}
            <div className="flex items-center justify-center gap-4 w-1/4 p-4 bg-[#1a1025] border border-purple-500/20 rounded-xl">
              <div className="flex flex-col justify-center items-center">
                <p className="text-purple-200/50 text-xs">Numero</p>
                <p className="text-white font-medium">{ escuela.numero }</p>
              </div>
            </div>
          </div>

          {/* Direccion */}
          <div className="flex items-center gap-4 p-4 bg-[#1a1025] border border-purple-500/20 rounded-xl">
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-purple-200/50 text-xs">Direccion</p>
              <p className="text-white font-medium">{ escuela.direccion }</p>
            </div>
          </div>

          {/* telefono */}
          <div className="flex items-center gap-4 p-4 bg-[#1a1025] border border-purple-500/20 rounded-xl">
            <div className="h-10 w-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <PhoneIcon className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-purple-200/50 text-xs">Telefono</p>
              <p className="text-white font-medium">{ escuela.telefono ?? "Sin telefono" }</p>
            </div>
          </div>
        </div>

        <div className="my-6 border-t border-purple-500/20" />

        <p className="text-sm font-medium text-purple-200/70 mb-4">Gestionar</p>

        {/* Botones de accion */}
        <div className="flex flex-col gap-3">
          {/* Grados */}
          <button 
            onClick={ handleOpenGrados } 
            className="flex w-full items-center justify-between gap-4 rounded-xl border border-purple-500/30 bg-purple-900/20 px-4 py-4 text-left transition-colors hover:bg-purple-900/30">
            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-purple-300" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-medium">Lista de Grados</p>
              <p className="text-purple-300/60 text-xs">
                { escuela.listaGrados?.length > 0
                  ? `${escuela.listaGrados.length} ${escuela.listaGrados.length === 1 ? "grado" : "grados"}`
                  : "Sin grados asignados" }
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-purple-200/30" />
          </button>

          {/* Maestras */}
          <button
            onClick={ handleOpenMaestras }
            className="flex w-full items-center justify-between gap-4 rounded-xl border border-purple-500/30 bg-purple-900/20 px-4 py-4 text-left transition-colors hover:bg-purple-900/30"
          >
            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-300" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-medium">Maestras de la Escuela</p>
              <p className="text-purple-300/60 text-xs">
                { availableMaestras?.length > 0
                  ? `${ availableMaestras.length } ${ availableMaestras.length === 1 ? "maestra" : "maestras" }`
                  : "Sin maestras asignadas" }
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-purple-200/30" />
          </button>
        </div>
      </main>

      {/* Lista de grados pertenecientes al grado */}
      <Drawer open={ gradosOpen } onOpenChange={ setGradosOpen }>
        <DrawerContent className="max-w-md mx-auto h-[85vh] flex flex-col bg-[#1a1025] border-purple-500/20">
          <DrawerHeader>
            <DrawerTitle className="text-white">
              Grados de la Escuela
            </DrawerTitle>
            <DrawerDescription className="text-purple-200/60">
              Estos son los grados pertenecientes a la escuela
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col flex-1 px-4 pb-4 overflow-hidden">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-200/40" />
              <Select
                value={ gradosSearch }
                onValueChange={ setGradosSearch }
              >
                <SelectTrigger className="pl-10 w-full bg-[#110a24] border-purple-500/20 text-white placeholder:text-purple-200/30">
                  <SelectValue placeholder="Seleccionar turno" />
                </SelectTrigger>

                <SelectContent className="bg-[#110a24] border-purple-500/20 text-white">
                  <SelectItem value="Mañana">Mañana</SelectItem>
                  <SelectItem value="Tarde">Tarde</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
              {filteredGrados?.map(( grado ) => {
                return (
                  <div
                    key={ grado.gradoId }
                    className="flex items-center gap-3 p-3 rounded-xl transition-all bg-[#110a24] border border-purple-500/10 hover:border-purple-500/30"
                  >
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-purple-500/20">
                      <User className="h-4 w-4 text-purple-300" />
                    </div>

                    <div className="flex-1 text-left">
                      <p className="text-white text-sm font-medium">
                        {grado.letra} {grado.numero}
                      </p>
                      <p className="text-white text-sm font-medium">
                        {grado.turno}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => setGradosOpen( false )}
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white"
            >
              Cerrar
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Lista de maestras pertenecientes al grado */}
      <Drawer open={maestrasOpen} onOpenChange={setMaestrasOpen}>
        <DrawerContent className="max-w-md mx-auto h-[85vh] flex flex-col bg-[#1a1025] border-purple-500/20">
          <DrawerHeader>
            <DrawerTitle className="text-white">
              Maestras de la Escuela
            </DrawerTitle>
            <DrawerDescription className="text-purple-200/60">
              Estas son todas las maestras registradas en esta escuela
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col flex-1 px-4 pb-4 overflow-hidden">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-200/40" />
              <Input
                placeholder="Buscar maestra..."
                value={maestrasSearch}
                onChange={(e) => setMaestrasSearch(e.target.value)}
                className="pl-10 bg-[#110a24] border-purple-500/20 text-white placeholder:text-purple-200/30"
              />
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
              {filteredMaestras.map((maestra) => {
                return (
                  <div
                    key={maestra.maestraId}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all bg-[#110a24] border border-purple-500/10 hover:border-purple-500/30"
                  >
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-purple-500/20">
                      <User className="h-4 w-4 text-purple-300" />
                    </div>

                    <div className="flex-1 text-left">
                      <p className="text-white text-sm font-medium">
                        {maestra.nombre}
                      </p>
                      <p className="text-purple-200/40 text-xs">
                        {maestra.email}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => setMaestrasOpen(false)}
              className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white"
            >
              Cerrar
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
