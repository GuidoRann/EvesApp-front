import type { MaestraDTO } from '@/types/MaestraTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface MaestraStore {
  maestra: MaestraDTO| null;
  loading: boolean;

  // setters
  setMaestra: ( maestra: MaestraDTO| null ) => void;

  // clears
  clearAll: () => void;
}

export const useMaestraStore = create<MaestraStore>()(
  persist(
    ( set ) => ({
      maestra: null,
      loading: false,

      // Setters
      setMaestra: ( maestra: MaestraDTO| null ) => set( { maestra } ),
      
      // Clear
      clearAll: () => set({
        maestra: null,
        loading: false,
      })
     }),
    { name: "maestraStore" }
  )
);