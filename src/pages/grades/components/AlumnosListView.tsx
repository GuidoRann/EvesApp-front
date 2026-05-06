import { useState } from "react";
import { ChevronLeft, Plus, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Alumno {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

interface AlumnosListViewProps {
  alumnos: Alumno[];
  onBack: () => void;
  onSave: (alumnos: Alumno[]) => void;
}

export default function AlumnosListView({
  alumnos: initialAlumnos,
  onBack,
  onSave,
}: AlumnosListViewProps) {
  const [alumnos, setAlumnos] = useState<Alumno[]>(initialAlumnos);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlumno, setNewAlumno] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
  });

  const handleAddAlumno = () => {
    if (newAlumno.nombre && newAlumno.apellidoPaterno) {
      const alumno: Alumno = {
        id: Date.now().toString(),
        ...newAlumno,
      };
      setAlumnos([...alumnos, alumno]);
      setNewAlumno({ nombre: "", apellidoPaterno: "", apellidoMaterno: "" });
      setShowAddModal(false);
    }
  };

  const handleRemoveAlumno = (id: string) => {
    setAlumnos(alumnos.filter((a) => a.id !== id));
  };

  const handleSave = () => {
    onSave(alumnos);
    onBack();
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] pb-6 pt-4">
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
            onClick={onBack}
            className="mb-4 flex items-center gap-1 text-purple-200 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="text-sm">Volver</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Lista de Alumnos</h1>
              <p className="mt-1 text-sm text-purple-200/70">
                {alumnos.length} alumno{alumnos.length !== 1 ? "s" : ""} agregado{alumnos.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition-colors hover:bg-purple-500"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lista de alumnos */}
      <div className="flex-1 px-4 py-6">
        {alumnos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-900/30">
              <User className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-lg font-medium text-purple-200">Sin alumnos</p>
            <p className="mt-1 text-sm text-purple-300/50">
              Toca el boton + para agregar alumnos
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alumnos.map((alumno, index) => (
              <div
                key={alumno.id}
                className="flex items-center justify-between rounded-lg border border-purple-500/20 bg-purple-900/20 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/50">
                    <span className="text-sm font-medium text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      {alumno.nombre} {alumno.apellidoPaterno} {alumno.apellidoMaterno}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveAlumno(alumno.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-red-400 transition-colors hover:bg-red-900/30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Boton Guardar */}
      <div className="sticky bottom-0 border-t border-purple-500/20 bg-background/95 p-4 backdrop-blur-sm">
        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-500 py-6 text-base font-semibold text-white hover:from-purple-500 hover:to-purple-400"
        >
          Guardar Lista
        </Button>
      </div>

      {/* Modal Agregar Alumno */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="border-purple-500/30 bg-[#110a24]">
          <DialogHeader>
            <DialogTitle className="text-white">Agregar Alumno</DialogTitle>
          </DialogHeader>
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel className="text-purple-100">Nombre *</FieldLabel>
              <Input
                placeholder="Nombre del alumno"
                value={newAlumno.nombre}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, nombre: e.target.value })
                }
                className="border-purple-500/30 bg-purple-900/20 text-white placeholder:text-purple-300/50"
              />
            </Field>
            <Field>
              <FieldLabel className="text-purple-100">
                Apellido Paterno *
              </FieldLabel>
              <Input
                placeholder="Apellido paterno"
                value={newAlumno.apellidoPaterno}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, apellidoPaterno: e.target.value })
                }
                className="border-purple-500/30 bg-purple-900/20 text-white placeholder:text-purple-300/50"
              />
            </Field>
            <Field>
              <FieldLabel className="text-purple-100">
                Apellido Materno
              </FieldLabel>
              <Input
                placeholder="Apellido materno (opcional)"
                value={newAlumno.apellidoMaterno}
                onChange={(e) =>
                  setNewAlumno({ ...newAlumno, apellidoMaterno: e.target.value })
                }
                className="border-purple-500/30 bg-purple-900/20 text-white placeholder:text-purple-300/50"
              />
            </Field>
          </FieldGroup>
          <div className="mt-4 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="flex-1 border-purple-500/30 text-purple-200 hover:bg-purple-900/30 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddAlumno}
              disabled={!newAlumno.nombre || !newAlumno.apellidoPaterno}
              className="flex-1 bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50"
            >
              Agregar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
