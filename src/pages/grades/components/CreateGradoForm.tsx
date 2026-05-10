import { useState } from "react";
import {
  ChevronLeft,
  Search,
  School,
  User,
  Check,
  Users,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import AlumnosListView from './AlumnosListView';

import { useNavigate } from 'react-router-dom';
import type { AlumnoType } from '@/types/AlumnoTypes';

// Data de muestra, cambiar por data real del backend
const mockEscuelas = [
  { id: "1", nombre: "Escuela Primaria Benito Juarez" },
  { id: "2", nombre: "Escuela Primaria Miguel Hidalgo" },
  { id: "3", nombre: "Escuela Primaria Jose Maria Morelos" },
  { id: "4", nombre: "Escuela Primaria Emiliano Zapata" },
];

const mockMaestras = [
  { id: "1", nombre: "Maria Gonzalez", email: "maria@escuela.com" },
  { id: "2", nombre: "Ana Lopez", email: "ana@escuela.com" },
  { id: "3", nombre: "Carmen Hernandez", email: "carmen@escuela.com" },
  { id: "4", nombre: "Laura Martinez", email: "laura@escuela.com" },
  { id: "5", nombre: "Sofia Rodriguez", email: "sofia@escuela.com" },
  { id: "6", nombre: "Patricia Sanchez", email: "patricia@escuela.com" },
];

interface CreateGradoFormProps {
  onSubmit?: ( data: GradoFormData ) => void;
}

interface GradoFormData {
  escuelaId: string;
  numero: string;
  letra: string;
  turno: string;
  divisionAnual: string;
  maestraTitularId: string;
  maestrasIds: string[];
  alumnos: AlumnoType[];
}

export default function CreateGradoForm({
  onSubmit,
}: CreateGradoFormProps) {
  const [ formData, setFormData ] = useState<GradoFormData>({
    escuelaId: "",
    numero: "",
    letra: "",
    turno: "",
    divisionAnual: "",
    maestraTitularId: "",
    maestrasIds: [],
    alumnos: [],
  });

  const navigate = useNavigate();
  const [ escuelaSearch, setEscuelaSearch ] = useState("");
  const [ maestraSearch, setMaestraSearch ] = useState("");
  const [ maestrasSearch, setMaestrasSearch ] = useState("");
  const [ showEscuelaDrawer, setShowEscuelaDrawer ] = useState(false);
  const [ showMaestraDrawer, setShowMaestraDrawer ] = useState(false);
  const [ showMaestrasDrawer, setShowMaestrasDrawer ] = useState(false);
  const [ showAlumnosView, setShowAlumnosView ] = useState(false);

  const selectedEscuela = mockEscuelas.find( ( e ) => e.id === formData.escuelaId );
  const selectedMaestra = mockMaestras.find(
    ( m ) => m.id === formData.maestraTitularId
  );
  const selectedMaestras = mockMaestras.filter(( m ) =>
    formData.maestrasIds.includes( m.id )
  );

  const filteredEscuelas = mockEscuelas.filter(( e ) =>
    e.nombre.toLowerCase().includes( escuelaSearch.toLowerCase() )
  );

  const filteredMaestras = mockMaestras.filter(( m ) =>
    m.nombre.toLowerCase().includes( maestraSearch.toLowerCase() )
  );

  const filteredMaestrasMultiple = mockMaestras.filter(( m ) =>
    m.nombre.toLowerCase().includes( maestrasSearch.toLowerCase() )
  );

  const isFormValid =
    formData.escuelaId &&
    formData.numero &&
    formData.letra &&
    formData.turno &&
    formData.divisionAnual &&
    formData.maestraTitularId;

  const handleSubmit = () => {
    if ( isFormValid && onSubmit ) {
      onSubmit( formData );
    }
  };

  const toggleMaestraSelection = ( maestraId: string ) => {
    setFormData(( prev ) => ({
      ...prev,
      maestrasIds: prev.maestrasIds.includes( maestraId )
        ? prev.maestrasIds.filter( ( id ) => id !== maestraId )
        : [ ...prev.maestrasIds, maestraId ],
    }));
  };

  // Si estamos en la vista de alumnos, mostrar esa vista
  if ( showAlumnosView ) {
    return (
      <AlumnosListView
        alumnos={ formData.alumnos }
        onBack={() => setShowAlumnosView( false )}
        onSave={( alumnos: any ) => setFormData({ ...formData, alumnos })}
      />
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] pb-6 pt-4">
        {/* Sparkles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[20%] top-6 h-1 w-1 animate-pulse rounded-full bg-white" />
          <div className="absolute right-[30%] top-10 h-0.5 w-0.5 animate-pulse rounded-full bg-white" />
          <div className="absolute left-[60%] top-16 h-1 w-1 animate-pulse rounded-full bg-white" />
          <div className="absolute right-[15%] top-8 h-0.5 w-0.5 animate-pulse rounded-full bg-white" />
          <div className="absolute left-[10%] top-14 h-1 w-1 animate-pulse rounded-full bg-purple-300" />
        </div>

        <div className="relative px-4">
          <button
            onClick={() => navigate( -1 )}
            className="mb-4 flex items-center gap-1 text-purple-200 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm">Volver</span>
          </button>
          <h1 className="text-2xl font-bold text-white">Crear Grado</h1>
          <p className="mt-1 text-sm text-purple-200/70">
            Configura los datos de tu nuevo grado
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6 pb-24">
        <FieldGroup>
          {/* Escuela */}
          <Field>
            <FieldLabel className="text-purple-100">Escuela *</FieldLabel>
            <button
              type="button"
              onClick={() => setShowEscuelaDrawer( true )}
              className="flex w-full items-center justify-between rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-3 text-left transition-colors hover:bg-purple-900/30"
            >
              <div className="flex items-center gap-3">
                <School className="h-5 w-5 text-purple-400" />
                <span
                  className={
                    selectedEscuela ? "text-white" : "text-purple-300/50"
                  }
                >
                  { selectedEscuela?.nombre || "Seleccionar escuela" }
                </span>
              </div>
              <ChevronLeft className="h-5 w-5 rotate-180 text-purple-400" />
            </button>
          </Field>

          {/* Numero y Letra */}
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel className="text-purple-100">Grado *</FieldLabel>
              <Select
                value={ formData.numero }
                onValueChange={( value ) =>
                  setFormData({ ...formData, numero: value })
                }
              >
                <SelectTrigger className="w-full border-purple-500/30 bg-purple-900/20 text-white">
                  <SelectValue placeholder="Numero" />
                </SelectTrigger>
                <SelectContent className="border-purple-500/30 bg-[#1a0a2e]">
                  {[ "1°", "2°", "3°", "4°", "5°", "6°", "7°" ].map(( num ) => (
                    <SelectItem
                      key={ num }
                      value={ num }
                      className="text-white focus:bg-purple-800/50 focus:text-white"
                    >
                      { num }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel className="text-purple-100">Grupo *</FieldLabel>
              <Select
                value={ formData.letra }
                onValueChange={( value ) =>
                  setFormData({ ...formData, letra: value })
                }
              >
                <SelectTrigger className="w-full border-purple-500/30 bg-purple-900/20 text-white">
                  <SelectValue placeholder="Letra" />
                </SelectTrigger>
                <SelectContent className="border-purple-500/30 bg-[#1a0a2e]">
                  {[ "A", "B", "C", "D", "E" ].map(( letra ) => (
                    <SelectItem
                      key={ letra }
                      value={ letra }
                      className="text-white focus:bg-purple-800/50 focus:text-white"
                    >
                      { letra }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          {/* Turno */}
          <Field>
            <FieldLabel className="text-purple-100">Turno *</FieldLabel>
            <Select
              value={ formData.turno }
              onValueChange={( value ) =>
                setFormData({ ...formData, turno: value })
              }
            >
              <SelectTrigger className="w-full border-purple-500/30 bg-purple-900/20 text-white">
                <SelectValue placeholder="Seleccionar turno" />
              </SelectTrigger>
              <SelectContent className="border-purple-500/30 bg-[#1a0a2e]">
                <SelectItem
                  value="mañana"
                  className="text-white focus:bg-purple-800/50 focus:text-white"
                >
                  Mañana
                </SelectItem>
                <SelectItem
                  value="tarde"
                  className="text-white focus:bg-purple-800/50 focus:text-white"
                >
                  Tarde
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Division Anual */}
          <Field>
            <FieldLabel className="text-purple-100">
              Division Anual *
            </FieldLabel>
            <Select
              value={ formData.divisionAnual }
              onValueChange={( value ) =>
                setFormData({ ...formData, divisionAnual: value })
              }
            >
              <SelectTrigger className="w-full border-purple-500/30 bg-purple-900/20 text-white">
                <SelectValue placeholder="Seleccionar division" />
              </SelectTrigger>
              <SelectContent className="border-purple-500/30 bg-[#1a0a2e]">
                <SelectItem
                  value="bimestre"
                  className="text-white focus:bg-purple-800/50 focus:text-white"
                >
                  Bimestre
                </SelectItem>
                <SelectItem
                  value="trimestre"
                  className="text-white focus:bg-purple-800/50 focus:text-white"
                >
                  Trimestre
                </SelectItem>
              </SelectContent>
            </Select>
          </Field>

          {/* Maestra Titular */}
          <Field>
            <FieldLabel className="text-purple-100">
              Maestra Titular *
            </FieldLabel>
            <button
              type="button"
              onClick={() => setShowMaestraDrawer(true)}
              className="flex w-full items-center justify-between rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-3 text-left transition-colors hover:bg-purple-900/30"
            >
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-purple-400" />
                <span
                  className={
                    selectedMaestra ? "text-white" : "text-purple-300/50"
                  }
                >
                  { selectedMaestra?.nombre || "Seleccionar maestra" }
                </span>
              </div>
              <ChevronLeft className="h-5 w-5 rotate-180 text-purple-400" />
            </button>
          </Field>
        </FieldGroup>

        {/* Seccion Opcional */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-purple-200/70">
            Campos opcionales
          </p>

          {/* Maestras Adicionales */}
          <button
            type="button"
            onClick={() => setShowMaestrasDrawer( true )}
            className="flex w-full items-center justify-between rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-4 text-left transition-colors hover:bg-purple-900/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <UserPlus className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="font-medium text-white">Maestras Adicionales</p>
                <p className="text-sm text-purple-300/60">
                  { selectedMaestras.length > 0
                    ? `${ selectedMaestras.length } maestra${ selectedMaestras.length > 1 ? "s" : "" } seleccionada${ selectedMaestras.length > 1 ? "s" : "" }`
                    : "Agregar otras maestras al grado" }
                </p>
              </div>
            </div>
            <ChevronLeft className="h-5 w-5 rotate-180 text-purple-400" />
          </button>

          {/* Lista de Alumnos */}
          <button
            type="button"
            onClick={() => setShowAlumnosView( true )}
            className="flex w-full items-center justify-between rounded-lg border border-purple-500/30 bg-purple-900/20 px-4 py-4 text-left transition-colors hover:bg-purple-900/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <Users className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="font-medium text-white">Lista de Alumnos</p>
                <p className="text-sm text-purple-300/60">
                  { formData.alumnos.length > 0
                    ? `${ formData.alumnos.length } alumno${ formData.alumnos.length > 1 ? "s" : "" } agregado${ formData.alumnos.length > 1 ? "s" : "" }`
                    : "Crear lista de alumnos del grado"}
                </p>
              </div>
            </div>
            <ChevronLeft className="h-5 w-5 rotate-180 text-purple-400" />
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-purple-500/20 bg-background/95 p-4 backdrop-blur-sm">
        <Button
          onClick={ handleSubmit }
          disabled={ !isFormValid }
          className="w-full bg-linear-to-r from-purple-600 to-purple-500 py-6 text-base font-semibold text-white hover:from-purple-500 hover:to-purple-400 disabled:opacity-50"
        >
          Crear Grado
        </Button>
      </div>

      {/* Escuela Modal */}
      <Drawer open={ showEscuelaDrawer } onOpenChange={ setShowEscuelaDrawer }>
        <DrawerContent className="border-purple-500/30 bg-[#110a24]">
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
                value={ escuelaSearch }
                onChange={( e ) => setEscuelaSearch( e.target.value )}
                className="border-purple-500/30 bg-purple-900/20 pl-10 text-white placeholder:text-purple-300/50"
              />
            </div>
          </div>
          <div className="max-h-[50vh] space-y-2 overflow-y-auto px-4 pb-6">
            {filteredEscuelas.map(( escuela ) => (
              <button
                key={ escuela.id }
                onClick={() => {
                  setFormData({ ...formData, escuelaId: escuela.id });
                  setShowEscuelaDrawer( false );
                  setEscuelaSearch( "" );
                }}
                className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                  formData.escuelaId === escuela.id
                    ? "border-purple-500 bg-purple-600/30"
                    : "border-purple-500/20 bg-purple-900/20 hover:bg-purple-900/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <School className="h-5 w-5 text-purple-400" />
                  <span className="text-white">{ escuela.nombre }</span>
                </div>
                { formData.escuelaId === escuela.id && (
                  <Check className="h-5 w-5 text-purple-400" />
                ) }
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Maestra Titular Modal */}
      <Drawer open={ showMaestraDrawer } onOpenChange={ setShowMaestraDrawer }>
        <DrawerContent className="border-purple-500/30 bg-[#110a24]">
          <DrawerHeader>
            <DrawerTitle className="text-white">
              Seleccionar Maestra Titular
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
              <Input
                placeholder="Buscar por nombre..."
                value={ maestraSearch }
                onChange={( e ) => setMaestraSearch( e.target.value )}
                className="border-purple-500/30 bg-purple-900/20 pl-10 text-white placeholder:text-purple-300/50"
              />
            </div>
          </div>
          <div className="max-h-[50vh] space-y-2 overflow-y-auto px-4 pb-6">
            {filteredMaestras.map(( maestra ) => (
              <button
                key={ maestra.id }
                onClick={() => {
                  setFormData({ ...formData, maestraTitularId: maestra.id });
                  setShowMaestraDrawer(false);
                  setMaestraSearch("");
                }}
                className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                  formData.maestraTitularId === maestra.id
                    ? "border-purple-500 bg-purple-600/30"
                    : "border-purple-500/20 bg-purple-900/20 hover:bg-purple-900/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/50">
                    <User className="h-5 w-5 text-purple-200" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{ maestra.nombre }</p>
                    <p className="text-sm text-purple-300/60">{ maestra.email }</p>
                  </div>
                </div>
                { formData.maestraTitularId === maestra.id && (
                  <Check className="h-5 w-5 text-purple-400" />
                ) }
              </button>
            ))}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Maestras Multiples Modal */}
      <Drawer open={ showMaestrasDrawer } onOpenChange={ setShowMaestrasDrawer }>
        <DrawerContent className="border-purple-500/30 bg-[#110a24]">
          <DrawerHeader>
            <DrawerTitle className="text-white">
              Seleccionar Maestras
            </DrawerTitle>
          </DrawerHeader>
          <p className="px-4 pb-4 text-sm text-purple-300/60">
            Selecciona las maestras adicionales para este grado
          </p>
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
              <Input
                placeholder="Buscar por nombre..."
                value={ maestrasSearch }
                onChange={( e ) => setMaestrasSearch( e.target.value )}
                className="border-purple-500/30 bg-purple-900/20 pl-10 text-white placeholder:text-purple-300/50"
              />
            </div>
          </div>
          <div className="max-h-[40vh] space-y-2 overflow-y-auto px-4">
            { filteredMaestrasMultiple.map(( maestra ) => {
              const isSelected = formData.maestrasIds.includes( maestra.id );
              return (
                <button
                  key={ maestra.id }
                  onClick={() => toggleMaestraSelection( maestra.id )}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                    isSelected
                      ? "border-purple-500 bg-purple-600/30"
                      : "border-purple-500/20 bg-purple-900/20 hover:bg-purple-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/50">
                      <User className="h-5 w-5 text-purple-200" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{ maestra.nombre }</p>
                      <p className="text-sm text-purple-300/60">
                        { maestra.email }
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded border ${
                      isSelected
                        ? "border-purple-500 bg-purple-600"
                        : "border-purple-500/30"
                    }`}
                  >
                    { isSelected && <Check className="h-4 w-4 text-white" /> }
                  </div>
                </button>
              );
            })}
          </div>
          <div className="border-t border-purple-500/20 p-4">
            <Button
              onClick={() => setShowMaestrasDrawer( false )}
              className="w-full bg-purple-600 text-white hover:bg-purple-500"
            >
              Confirmar ({ formData.maestrasIds.length } seleccionadas)
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
