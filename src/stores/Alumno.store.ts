import type { AlumnoDetailType } from '@/types/AlumnoTypes';
import type { AsistenciaType } from '@/types/AsistenciaTypes';
import type { NotaType } from '@/types/NotaTypes';
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface AlumnoStore {
  alumno: AlumnoDetailType | null;
  loading: boolean;

  // Seccion Alumno
  setAlumno: ( alumno: AlumnoDetailType | null ) => void

  // Seccion Asistencia
  addAsistencia: ( asistencia: AsistenciaType ) => void
  updateAsistencia: ( asistencia: AsistenciaType ) => void
  deleteAsistencia: ( asistenciaId: string ) => void

  // Seccion Notas
  addNota: ( nota: NotaType ) => void
  updateNota: ( nota: NotaType ) => void
  deleteNota: ( notaId: string ) => void

  clearAll: () => void
}

export const useAlumnoStore = create<AlumnoStore>()(
  persist(
    (set) => ({
      alumno: null,

      asistencias: [],
      notas: [],

      loading: false,

      setAlumno: (alumno: AlumnoDetailType | null) => set({alumno}),

      addAsistencia: (asistencia: AsistenciaType) =>
        set( ( state ) => {
          if ( !state.alumno ) return state;

          return {
            alumno: {
              ...state.alumno,
              asistencias: [...( state.alumno.asistencias ?? [] ), asistencia ],
            },
          };
        }),

      updateAsistencia: (asistencia: AsistenciaType) =>
        set( ( state ) => {
          if ( !state.alumno ) return state;

          return {
            alumno: {
              ...state.alumno,
              asistencias: ( state.alumno.asistencias ?? [] ).map(( a: AsistenciaType ) => ( a.asistenciaId === asistencia.asistenciaId ? asistencia : a )),
            },
          };
        }),

      deleteAsistencia: (asistenciaId: string) =>
        set( ( state ) => {
          if ( !state.alumno ) return state;

          return {
            alumno: {
              ...state.alumno,
              asistencias: ( state.alumno.asistencias ?? [] ).filter( ( a: AsistenciaType ) => a.asistenciaId !== asistenciaId ),
            },
          };
        }),

      addNota: (nota: NotaType) =>
        set( ( state ) => {
          if ( !state.alumno ) return state;

          return {
            alumno: {
              ...state.alumno,
              notas: [...( state.alumno.notas ?? [] ), nota ],
            },
          };
        }),

      updateNota: (nota: NotaType) =>
        set( ( state ) => {
          if ( !state.alumno ) return state;

          return {
            alumno: {
              ...state.alumno,
              notas: ( state.alumno.notas ?? [] ).map(( n: NotaType ) => ( n.notaId === nota.notaId ? nota : n )),
            },
          };
        }),

      deleteNota: (notaId: string) =>
        set( ( state ) => {
          if ( !state.alumno ) return state;

          return {
            alumno: {
              ...state.alumno,
              notas: ( state.alumno.notas ?? [] ).filter( ( n: NotaType ) => n.notaId !== notaId ),
            },
          };
        }),

      clearAll: () => set(() => ({
        alumno: null,
        loading: false,
        asistencias: [],
        notas: [],
      }))
    }),
      {
        name: "alumno-store",
      },
    ),
  );
