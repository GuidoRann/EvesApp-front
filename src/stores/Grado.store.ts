import type {AlumnoType} from "@/types/AlumnoTypes";
import type {GradoType} from "@/types/GradoTypes";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface GradoStore {
  grado: GradoType | null;
  loading: boolean;

  setGrado: ( grado: GradoType | null ) => void;

  setAlumnos: ( alumnos: AlumnoType[] ) => void;

  addAlumno: ( alumno: AlumnoType ) => void;
  updateAlumno: ( alumno: AlumnoType ) => void;
  deleteAlumno: ( alumnoId: string ) => void;

  clearAll: () => void;
}

export const useGradoStore = create<GradoStore>()(
  persist(
    ( set ) => ({
      grado: null,
      loading: false,

      setGrado: ( grado: GradoType | null ) => set({ grado }),

      setAlumnos: ( listaAlumnos: AlumnoType[] ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              listaAlumnos,
            },
          };
        }),

      addAlumno: ( alumno: AlumnoType ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              listaAlumnos: [...( state.grado.listaAlumnos ?? [] ), alumno ],
            },
          };
        }),

      updateAlumno: ( alumno: AlumnoType ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              listaAlumnos: ( state.grado.listaAlumnos ?? [] ).map(( a ) => ( a.alumnoId === alumno.alumnoId ? alumno : a )),
            },
          };
        }),

      deleteAlumno: ( alumnoId: string ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              listaAlumnos: ( state.grado.listaAlumnos ?? [] ).filter( ( a ) => a.alumnoId !== alumnoId ),
            },
          };
        }),

      clearAll: () =>
        set({
          grado: null,
          loading: false,
        }),
    }),
    { name: "grado-store" },
  ),
);
