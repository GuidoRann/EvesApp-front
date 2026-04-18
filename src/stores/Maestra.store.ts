import type { MaestraType } from '@/types/MaestraTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface MaestraStore {
  maestra: MaestraType | null;
  listaDeMaestras: MaestraType[];
  loading: boolean;

  // setters
  setMaestra: ( maestra: MaestraType ) => void;

  // adds
  addNewMaestra: ( maestra: MaestraType ) => void;
  
  // deletes
  removeMaestra: ( maestraId: string ) => void;

  // clears
  clearMaestra: () => void;
}

export const useMaestraStore = create<MaestraStore>()(
  persist(
    (set) => ({
      maestra: null,
      listaDeMaestras: [],
      loading: false,

      // Setters
      setMaestra: ( maestra: MaestraType ) => set( { maestra } ),
      
      // Clear
      clearMaestra: () => set( { maestra: null } ),
      
      // Add
      addNewMaestra: ( maestra: MaestraType ) => 
        set(( state ) => ({ 
          listaDeMaestras: [ ...state.listaDeMaestras, maestra ]
         })),

      // Delete
      removeMaestra: ( maestraId: string ) => 
        set(( state ) => ({ 
          listaDeMaestras: state.listaDeMaestras.filter( maestra => maestra.maestraId !== maestraId )
         })),
    }),
    { name: "maestraStore" }
  )
);