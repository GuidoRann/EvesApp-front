import type { EscuelaType } from '@/types/EscuelaTypes';
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EscuelaStore {
  escuela: EscuelaType | null;
  listaDeEscuelas: EscuelaType[];

  setEscuela: ( escuela: EscuelaType ) => void;
  setListaDeEscuelas: ( escuelas: EscuelaType[] ) => void;
  addEscuela: ( escuela: EscuelaType ) => void;
}

export const useEscuelaStore = create<EscuelaStore>()(
  persist(
    ( set ) => ({
      escuela: null,
      listaDeEscuelas: [],

      setEscuela: ( escuela: EscuelaType ) => set( { escuela } ),
      setListaDeEscuelas: ( escuelas: EscuelaType[] ) => set( { listaDeEscuelas: escuelas } ),

      addEscuela: ( escuela: EscuelaType ) =>
        set( ( state ) => {
          const yaExiste = state.listaDeEscuelas.some(
            ( e ) => e.escuelaId === escuela.escuelaId
          );

          if ( yaExiste ) return state;

          return {
            listaDeEscuelas: [
              ...state.listaDeEscuelas,
              escuela
            ]
          };
        }),
    }), 
    { name: "escuelaStore" }
  )
);
