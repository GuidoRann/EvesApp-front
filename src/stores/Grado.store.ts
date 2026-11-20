import type {AlumnoType} from "@/types/AlumnoTypes";
import type {GradoType} from "@/types/GradoTypes";
import type { MaestraType } from '@/types/MaestraTypes';
import type { MateriaType } from '@/types/MateriaTypes';
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface GradoStore {
  grado: GradoType | null;
  titular: MaestraType | null;
  maestrasAdicionales : MaestraType[];
  loading: boolean;

  // Seccion Grado
  setGrado: ( grado: GradoType | null ) => void;

  // Seccion Alumnos
  addAlumno: ( alumno: AlumnoType ) => void;
  updateAlumno: ( alumno: AlumnoType ) => void;
  deleteAlumno: ( alumnoId: string ) => void;

  // Seccion Maestras
  addMaestra: ( maestra: MaestraType ) => void;
  updateMaestra: ( maestra: MaestraType ) => void;
  deleteMaestra: ( maestraId: string ) => void;

  // Seccion Materias
  addMateria: ( materia: MateriaType ) => void;
  updateMateria: ( materia: MateriaType ) => void;
  deleteMateria: ( materiaId: string ) => void;

  clearAll: () => void;
}

export const useGradoStore = create<GradoStore>()(
  persist(
    ( set ) => ({
      grado: null,

      titular: null,
      maestrasAdicionales : [],

      alumnos: [],
      materias: [],
      
      loading: false,

      setGrado: ( grado: GradoType | null ) => set({ grado }),

      // Seccion de alumnos

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

      // Seccion de maestras

      setMaestras: ( maestras: MaestraType[] ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              maestras,
            },
          };
        }),

      addMaestra: ( maestra: MaestraType ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              maestras: [...( state.grado.maestrasAdicionales ?? [] ), maestra ],
            },
          };
        }),

      updateMaestra: ( maestra: MaestraType ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              maestras: ( state.grado.maestrasAdicionales ?? [] ).map(( m ) => ( m.maestraId === maestra.maestraId ? maestra : m )),
            },
          };
        }),

      deleteMaestra: ( maestraId: string ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              maestras: ( state.grado.maestrasAdicionales ?? [] ).filter( ( m ) => m.maestraId !== maestraId ),
            },
          };
        }),

      // Seccion de materias

      setMaterias: ( materias: MateriaType[] ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              materias,
            },
          };
        }),

      addMateria: ( materia: MateriaType ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              materias: [...( state.grado.listaMaterias ?? [] ), materia ],
            },
          };
        }),

      updateMateria: ( materia: MateriaType ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              materias: ( state.grado.listaMaterias ?? [] ).map(( m ) => ( m.materiaId === materia.materiaId ? materia : m )),
            },
          };
        }),

      deleteMateria: ( materiaId: string ) =>
        set(( state ) => {
          if ( !state.grado ) return state;

          return {
            grado: {
              ...state.grado,
              materias: ( state.grado.listaMaterias ?? [] ).filter( ( m ) => m.materiaId !== materiaId ),
            },
          };
        }),

      // Seccion de limpieza

      clearAll: () =>
        set({
          grado: null,
          loading: false,
        }),
    }),
    { name: "grado-store" },
  ),
);
