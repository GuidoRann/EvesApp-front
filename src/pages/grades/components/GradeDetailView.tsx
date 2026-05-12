import { useState } from "react";
import {
  ChevronLeft,
  School,
  User,
  Clock,
  Calendar,
  Users,
  UserPlus,
  Search,
  Check,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export interface Alumno {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface GradeDetailData {
  id: string;
  numero: number;
  letra: string;
  turno: "mañana" | "tarde";
  divisionAnual: "bimestre" | "trimestre";
  escuela: {
    id: string;
    nombre: string;
  };
  maestraTitular: {
    id: string;
    nombre: string;
    email: string;
  };
  maestrasAdicionales: {
    id: string;
    nombre: string;
    email: string;
  }[];
  alumnos: Alumno[];
}

interface GradeDetailViewProps {
  grade: GradeDetailData;
  onBack: () => void;
  onUpdate?: (data: GradeDetailData) => void;
}

// Mock data for available teachers
const mockMaestras = [
  { id: "1", nombre: "Maria Gonzalez", email: "maria@escuela.com" },
  { id: "2", nombre: "Ana Lopez", email: "ana@escuela.com" },
  { id: "3", nombre: "Carmen Hernandez", email: "carmen@escuela.com" },
  { id: "4", nombre: "Laura Martinez", email: "laura@escuela.com" },
  { id: "5", nombre: "Sofia Rodriguez", email: "sofia@escuela.com" },
  { id: "6", nombre: "Patricia Sanchez", email: "patricia@escuela.com" },
];

export default function GradeDetailView({ grade, onBack, onUpdate }: GradeDetailViewProps) {
  const [gradeData, setGradeData] = useState<GradeDetailData>(grade);
  const [showMaestrasDrawer, setShowMaestrasDrawer] = useState(false);
  const [showAlumnosView, setShowAlumnosView] = useState(false);
  const [showAddAlumnoDrawer, setShowAddAlumnoDrawer] = useState(false);
  const [maestrasSearch, setMaestrasSearch] = useState("");
  const [newAlumno, setNewAlumno] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
  });

  const selectedMaestrasIds = gradeData.maestrasAdicionales.map((m) => m.id);

  const filteredMaestras = mockMaestras.filter(
    (m) =>
      m.nombre.toLowerCase().includes(maestrasSearch.toLowerCase()) &&
      m.id !== gradeData.maestraTitular.id
  );

  const toggleMaestraSelection = (maestra: { id: string; nombre: string; email: string }) => {
    setGradeData((prev) => {
      const isSelected = prev.maestrasAdicionales.some((m) => m.id === maestra.id);
      const newMaestras = isSelected
        ? prev.maestrasAdicionales.filter((m) => m.id !== maestra.id)
        : [...prev.maestrasAdicionales, maestra];
      
      const newData = { ...prev, maestrasAdicionales: newMaestras };
      onUpdate?.(newData);
      return newData;
    });
  };

  const handleAddAlumno = () => {
    if (newAlumno.nombre && newAlumno.apellidoPaterno) {
      const alumno: Alumno = {
        id: Date.now().toString(),
        ...newAlumno,
      };
      setGradeData((prev) => {
        const newData = { ...prev, alumnos: [...prev.alumnos, alumno] };
        onUpdate?.(newData);
        return newData;
      });
      setNewAlumno({ nombre: "", apellidoPaterno: "", apellidoMaterno: "" });
      setShowAddAlumnoDrawer(false);
    }
  };

  const handleRemoveAlumno = (alumnoId: string) => {
    setGradeData((prev) => {
      const newData = { ...prev, alumnos: prev.alumnos.filter((a) => a.id !== alumnoId) };
      onUpdate?.(newData);
      return newData;
    });
  };

  // Alumnos list view
  if (showAlumnosView) {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        {/* Header */}
        <div className="relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] pb-6 pt-4">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-[20%] top-6 h-1 w-1 animate-pulse rounded-full bg-white" />
            <div className="absolute right-[30%] top-10 h-0.5 w-0.5 animate-pulse rounded-full bg-white" />
            <div className="absolute left-[60%] top-16 h-1 w-1 animate-pulse rounded-full bg-white" />
          </div>

          <div className="relative px-4">
            <button
              onClick={() => setShowAlumnosView(false)}
              className="mb-4 flex items-center gap-1 text-purple-200 transition-colors hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm">Volver</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Lista de Alumnos</h1>
            <p className="mt-1 text-sm text-purple-200/70">
              {gradeData.numero}° Grado - Grupo {gradeData.letra}
            </p>
          </div>
        </div>

        {/* Alumnos list */}
        <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
          {gradeData.alumnos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <Users className="h-8 w-8 text-emerald-400" />
              </div>
              <p className="text-white font-medium">Sin alumnos</p>
              <p className="mt-1 text-sm text-purple-200/50">
                Agrega alumnos a este grado
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {gradeData.alumnos.map((alumno, index) => (
                <div
                  key={alumno.id}
                  className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-[#1a1025] p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-semibold text-emerald-400">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {alumno.nombre} {alumno.apellidoPaterno} {alumno.apellidoMaterno}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveAlumno(alumno.id)}
                    className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add button */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-purple-500/20 bg-background/95 p-4 backdrop-blur-sm">
          <Button
            onClick={() => setShowAddAlumnoDrawer(true)}
            className="w-full bg-emerald-600 py-6 text-base font-semibold text-white hover:bg-emerald-500"
          >
            <Plus className="mr-2 h-5 w-5" />
            Agregar Alumno
          </Button>
        </div>

        {/* Add Alumno Drawer */}
        <Drawer open={showAddAlumnoDrawer} onOpenChange={setShowAddAlumnoDrawer}>
          <DrawerContent className="border-purple-500/30 bg-[#110a24]">
            <DrawerHeader>
              <DrawerTitle className="text-white">Nuevo Alumno</DrawerTitle>
            </DrawerHeader>
            <div className="space-y-4 px-4 pb-6">
              <div>
                <label className="mb-2 block text-sm text-purple-200">Nombre *</label>
                <Input
                  placeholder="Nombre del alumno"
                  value={newAlumno.nombre}
                  onChange={(e) => setNewAlumno({ ...newAlumno, nombre: e.target.value })}
                  className="border-purple-500/30 bg-purple-900/20 text-white placeholder:text-purple-300/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-purple-200">Apellido Paterno *</label>
                <Input
                  placeholder="Apellido paterno"
                  value={newAlumno.apellidoPaterno}
                  onChange={(e) => setNewAlumno({ ...newAlumno, apellidoPaterno: e.target.value })}
                  className="border-purple-500/30 bg-purple-900/20 text-white placeholder:text-purple-300/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-purple-200">Apellido Materno</label>
                <Input
                  placeholder="Apellido materno"
                  value={newAlumno.apellidoMaterno}
                  onChange={(e) => setNewAlumno({ ...newAlumno, apellidoMaterno: e.target.value })}
                  className="border-purple-500/30 bg-purple-900/20 text-white placeholder:text-purple-300/50"
                />
              </div>
              <Button
                onClick={handleAddAlumno}
                disabled={!newAlumno.nombre || !newAlumno.apellidoPaterno}
                className="w-full bg-emerald-600 py-6 text-white hover:bg-emerald-500 disabled:opacity-50"
              >
                Agregar
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] pb-6 pt-4">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[20%] top-6 h-1 w-1 animate-pulse rounded-full bg-white" />
          <div className="absolute right-[30%] top-10 h-0.5 w-0.5 animate-pulse rounded-full bg-white" />
          <div className="absolute left-[60%] top-16 h-1 w-1 animate-pulse rounded-full bg-white" />
          <div className="absolute right-[15%] top-8 h-0.5 w-0.5 animate-pulse rounded-full bg-white" />
          <div className="absolute left-[10%] top-14 h-1 w-1 animate-pulse rounded-full bg-purple-300" />
        </div>

        <div className="relative px-4">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-1 text-purple-200 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm">Volver</span>
          </button>
          
          {/* Grade badge */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-2xl font-bold text-emerald-400">
                {gradeData.numero}º {gradeData.letra}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {gradeData.numero}° Grado - Grupo {gradeData.letra}
              </h1>
              <p className="mt-1 text-sm text-purple-200/70">{gradeData.escuela.nombre}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-8">
        {/* Info cards */}
        <div className="space-y-4">
          {/* Escuela */}
          <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <School className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="text-xs text-purple-200/50">Escuela</p>
                <p className="font-medium text-white">{gradeData.escuela.nombre}</p>
              </div>
            </div>
          </div>

          {/* Turno y Division */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                  <Clock className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-purple-200/50">Turno</p>
                  <p className="font-medium capitalize text-white">{gradeData.turno}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-purple-200/50">Division</p>
                  <p className="font-medium capitalize text-white">{gradeData.divisionAnual}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maestra Titular */}
          <div className="rounded-xl border border-purple-500/20 bg-[#1a1025] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <User className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="text-xs text-purple-200/50">Maestra Titular</p>
                <p className="font-medium text-white">{gradeData.maestraTitular.nombre}</p>
                <p className="text-xs text-purple-200/50">{gradeData.maestraTitular.email}</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-purple-500/20" />

          {/* Action buttons */}
          <p className="text-sm font-medium text-purple-200/70 mb-4">Gestionar</p>

          {/* Maestras Adicionales */}
          <button
            type="button"
            onClick={() => setShowMaestrasDrawer(true)}
            className="flex w-full items-center justify-between rounded-xl border border-purple-500/30 bg-purple-900/20 px-4 py-4 text-left transition-colors hover:bg-purple-900/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <UserPlus className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="font-medium text-white">Maestras Adicionales</p>
                <p className="text-sm text-purple-300/60">
                  {gradeData.maestrasAdicionales.length > 0
                    ? `${gradeData.maestrasAdicionales.length} maestra${gradeData.maestrasAdicionales.length > 1 ? "s" : ""} asignada${gradeData.maestrasAdicionales.length > 1 ? "s" : ""}`
                    : "Agregar otras maestras al grado"}
                </p>
              </div>
            </div>
            <ChevronLeft className="h-5 w-5 rotate-180 text-purple-400" />
          </button>

          {/* Lista de Alumnos */}
          <button
            type="button"
            onClick={() => setShowAlumnosView(true)}
            className="flex w-full items-center justify-between rounded-xl border border-purple-500/30 bg-purple-900/20 px-4 py-4 text-left transition-colors hover:bg-purple-900/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/30">
                <Users className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <p className="font-medium text-white">Lista de Alumnos</p>
                <p className="text-sm text-purple-300/60">
                  {gradeData.alumnos.length > 0
                    ? `${gradeData.alumnos.length} alumno${gradeData.alumnos.length > 1 ? "s" : ""} registrado${gradeData.alumnos.length > 1 ? "s" : ""}`
                    : "Gestionar lista de alumnos del grado"}
                </p>
              </div>
            </div>
            <ChevronLeft className="h-5 w-5 rotate-180 text-purple-400" />
          </button>
        </div>
      </div>

      {/* Maestras Drawer */}
      <Drawer open={showMaestrasDrawer} onOpenChange={setShowMaestrasDrawer}>
        <DrawerContent className="border-purple-500/30 bg-[#110a24]">
          <DrawerHeader>
            <DrawerTitle className="text-white">Seleccionar Maestras</DrawerTitle>
          </DrawerHeader>
          <p className="px-4 pb-4 text-sm text-purple-300/60">
            Selecciona las maestras adicionales para este grado
          </p>
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
              <Input
                placeholder="Buscar por nombre..."
                value={maestrasSearch}
                onChange={(e) => setMaestrasSearch(e.target.value)}
                className="border-purple-500/30 bg-purple-900/20 pl-10 text-white placeholder:text-purple-300/50"
              />
            </div>
          </div>
          <div className="max-h-[50vh] space-y-2 overflow-y-auto px-4 pb-6">
            {filteredMaestras.map((maestra) => {
              const isSelected = selectedMaestrasIds.includes(maestra.id);
              return (
                <button
                  key={maestra.id}
                  onClick={() => toggleMaestraSelection(maestra)}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-600/20"
                      : "border-purple-500/20 bg-purple-900/20 hover:bg-purple-900/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        isSelected ? "bg-emerald-500/30" : "bg-purple-600/50"
                      }`}
                    >
                      <User className={`h-5 w-5 ${isSelected ? "text-emerald-300" : "text-purple-200"}`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{maestra.nombre}</p>
                      <p className="text-sm text-purple-300/60">{maestra.email}</p>
                    </div>
                  </div>
                  {isSelected && <Check className="h-5 w-5 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
