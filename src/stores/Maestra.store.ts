import type { MaestraType } from '@/types/MaestraTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface MaestraStore {
  maestra: MaestraType | null;
  loading: boolean;

  setMaestra: ( maestra: MaestraType| null ) => void;

  clearAll: () => void;
}

export const useMaestraStore = create<MaestraStore>()(
  persist(
    ( set ) => ({
      maestra: null,
      loading: false,

      setMaestra: ( maestra: MaestraType | null ) => set( { maestra } ),
      
      clearAll: () => set({
        maestra: null,
        loading: false,
      })
     }),
    { name: "maestraStore" }
  )
);