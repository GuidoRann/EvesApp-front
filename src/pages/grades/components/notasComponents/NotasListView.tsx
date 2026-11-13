
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  GraduationCap,
  Loader2
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useManagementNotas } from "../../hooks/useManagementNotas";
import { useGradoStore } from "@/stores/Grado.store";
import type { CreateListadoNotasDTO } from "@/types/NotaTypes";

const materias = [
  "Matemática",
  "Lengua",
  "Ciencias Sociales",
  "Ciencias Naturales"
];

const grades = ["NS", "S", "B", "MB", "E"];

type CalificacionAlumno = {
  alumnoId: string;
  nota: string;
};

type Calificaciones = Record<
  string,
  Record<string, CalificacionAlumno>
>;

export default function NotasListView() {
  const { grado } = useGradoStore();
  const alumnos = grado?.listaAlumnos ?? [];

  const plazos = grado?.divisionAnual
    ? ["Primer bimestre", "Segundo bimestre", "Tercer bimestre", "Cuarto bimestre"]
    : ["Primer trimestre", "Segundo trimestre", "Tercer trimestre"];

  const { gradoId } = useParams();
  const navigate = useNavigate();

  const { crearListaNotas } = useManagementNotas();

  const [isCreating, setIsCreating] = useState(false);

  const [materia, setMateria] = useState(materias[0]);
  const [plazo, setPlazo] = useState(plazos[0]);

  const [calificaciones, setCalificaciones] =
    useState<Calificaciones>({});

  // Contar alumnos que tienen una nota asignada
  const completed = useMemo(
    () =>
      Object.values(calificaciones[materia] ?? {}).filter(
        alumno => alumno.nota !== ""
      ).length,
    [calificaciones, materia]
  );

  function updateGrade(studentId: string, grade: string) {
    setCalificaciones(current => ({
      ...current,
      [materia]: {
        ...current[materia],
        [studentId]: {
          alumnoId: studentId,
          nota: grade
        }
      }
    }));
  }

  const handleSubmit = async () => {
    setIsCreating(true);

    try {
      const listadoNotas: CreateListadoNotasDTO = {
        plazo,
        notas: Object.fromEntries(
          Object.entries(calificaciones).map(([nombreMateria, alumnos]) => [
            nombreMateria,
            Object.values(alumnos)
          ])
        )
      };

      await crearListaNotas( listadoNotas );

    } catch (error) {
      console.error("Error al guardar las notas:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="min-h-dvh bg-[#100921] text-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-[#120a27] shadow-2xl shadow-black/30">

        <header className="relative overflow-hidden bg-linear-to-b from-[#4c1d95] via-[#3b0764] to-[#110a24] px-4 pb-6 pt-5">

          {/* Sparkles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute left-[20%] top-6 h-1 w-1 animate-pulse rounded-full bg-white" />
            <div className="absolute right-[30%] top-10 h-0.5 w-0.5 animate-pulse rounded-full bg-white" />
            <div className="absolute left-[60%] top-16 h-1 w-1 animate-pulse rounded-full bg-white" />
            <div className="absolute right-[15%] top-8 h-0.5 w-0.5 animate-pulse rounded-full bg-white" />
            <div className="absolute left-[10%] top-14 h-1 w-1 animate-pulse rounded-full bg-purple-300" />
          </div>

          <div className="relative flex items-center gap-4">
            <button
              onClick={() => navigate(`/grades/details/${gradoId}`)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Calificaciones
              </h1>
              <p className="mt-1 text-sm text-purple-200/70">
                Asigná una nota a cada alumno
              </p>
            </div>
          </div>

          <div className="relative mt-1 flex items-end justify-between py-1">
            <div className="flex items-end gap-2">
              <p className="text-sm text-purple-200/80">
                Notas asignadas
              </p>

              <p className="text-2xl font-bold">
                {completed}
                <span className="text-lg text-purple-200/60">
                  /{alumnos.length}
                </span>
              </p>
            </div>

            <GraduationCap
              className="mb-1 size-11 text-purple-200/70"
              aria-hidden="true"
            />
          </div>
        </header>

        <section className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-5 pt-5">

          {/* Plazo */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="plazo"
              className="text-sm font-semibold text-purple-200/80"
            >
              Período
            </label>

            <div className="relative">
              <select
                id="plazo"
                value={plazo}
                onChange={event => setPlazo(event.target.value)}
                className="w-full appearance-none rounded-xl border border-purple-400/25 bg-purple-950/60 px-4 py-3 pr-10 text-sm font-medium text-white outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/25"
              >
                {plazos.map(item => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#241044]"
                  >
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-purple-200/70" />
            </div>
          </div>

          {/* Materia */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="materia"
              className="flex items-center gap-2 text-sm font-semibold text-purple-200/80"
            >
              <BookOpen
                className="size-4 text-fuchsia-300"
                aria-hidden="true"
              />
              Materia
            </label>

            <div className="relative">
              <select
                id="materia"
                value={materia}
                onChange={event => setMateria(event.target.value)}
                className="w-full appearance-none rounded-xl border border-purple-400/25 bg-purple-950/60 px-4 py-3 pr-10 text-sm font-medium text-white outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/25"
              >
                {materias.map(item => (
                  <option
                    key={item}
                    value={item}
                    className="bg-[#241044]"
                  >
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-purple-200/70" />
            </div>
          </div>

          {/* Lista de alumnos */}
          <div className="overflow-hidden rounded-2xl border border-purple-400/20 bg-purple-950/30">
            <div className="border-b border-purple-300/10 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-purple-200/50">
                Alumnos · {materia}
              </p>
            </div>

            {alumnos.map((alumno, index) => (
              <div
                key={alumno.alumnoId}
                className="flex items-center gap-3 border-b border-purple-300/10 px-4 py-4 last:border-b-0"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-600/40 text-sm font-medium text-purple-100">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    {alumno.nombre}
                  </p>

                  <p className="mt-0.5 text-xs text-purple-200/50">
                    DNI: {alumno.numeroDocumento}
                  </p>
                </div>

                <div className="relative shrink-0">
                  <select
                    aria-label={`Nota de ${alumno.nombre}`}
                    value={
                      calificaciones[materia]?.[alumno.alumnoId]?.nota ?? ""
                    }
                    onChange={event =>
                      updateGrade(alumno.alumnoId, event.target.value)
                    }
                    className="h-10 w-26 appearance-none rounded-xl border border-fuchsia-400/35 bg-fuchsia-500/15 px-3 pr-7 text-center text-sm font-bold text-fuchsia-100 outline-none transition focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-300/30"
                  >
                    <option value="">Sin nota</option>

                    {grades.map(grade => (
                      <option
                        key={grade}
                        value={grade}
                        className="bg-[#241044]"
                      >
                        {grade}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-fuchsia-200/70" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Botón guardar */}
        <div className="border-t border-purple-500/10 p-4">
          <Button
            onClick={handleSubmit}
            disabled={isCreating}
            className="h-12 w-full bg-purple-500 font-semibold text-white hover:bg-purple-600"
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Enviar Notas"
            )}
          </Button>
        </div>

      </div>
    </main>
  );
}
