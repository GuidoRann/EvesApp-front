import type { MaestraDTO } from '@/types/MaestraTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface MaestraStore {
  maestra: MaestraDTO | null;
  loading: boolean;

  setMaestra: ( maestra: MaestraDTO| null ) => void;

  clearAll: () => void;
}

export const useMaestraStore = create<MaestraStore>()(
  persist(
    ( set ) => ({
      maestra: null,
      loading: false,

      setMaestra: ( maestra: MaestraDTO | null ) => set( { maestra } ),
      
      clearAll: () => set({
        maestra: null,
        loading: false,
      })
     }),
    { name: "maestraStore" }
  )
);