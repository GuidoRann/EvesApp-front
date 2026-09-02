import type { EscuelaDTO } from '@/types/EscuelaTypes';
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EscuelaStore {
  escuela: EscuelaDTO | null;
  listaDeEscuelas: EscuelaDTO[];

  setEscuela: ( escuela: EscuelaDTO ) => void;
  setListaDeEscuelas: ( escuelas: EscuelaDTO[] ) => void;
}

export const useEscuelaStore = create<EscuelaStore>()(
  persist(
    ( set ) => ({
      escuela: null,
      listaDeEscuelas: [],

      setEscuela: ( escuela: EscuelaDTO ) => set( { escuela } ),
      setListaDeEscuelas: ( escuelas: EscuelaDTO[] ) => set( { listaDeEscuelas: escuelas } ),
    }), 
    { name: "escuelaStore" }
  )
);
