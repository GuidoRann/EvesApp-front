import type { MaestraType } from '@/types/MaestraTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface MaestraStore {
  maestra: MaestraType | null;
  listaMaestras: MaestraType[];
  loading: boolean;

  setMaestra: ( maestra: MaestraType| null ) => void;
  setListaDeMaestras: ( maestras: MaestraType[] ) => void;
  setLoading: ( loading: boolean ) => void;

  clearAll: () => void;
}

export const useMaestraStore = create<MaestraStore>()(
  persist(
    ( set ) => ({
      maestra: null,
      listaMaestras: [],
      loading: false,

      setMaestra: ( maestra: MaestraType | null ) => set( { maestra } ),
        
      setListaDeMaestras: ( maestras: MaestraType[] ) => set( { listaMaestras: maestras } ),

      setLoading: ( loading: boolean ) => set( { loading } ),

      clearAll: () => set({
        maestra: null,
        loading: false,
      })
     }),
    { name: "maestraStore" }
  )
);