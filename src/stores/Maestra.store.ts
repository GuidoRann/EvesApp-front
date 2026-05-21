import type { MaestraDTO } from '@/types/MaestraTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface MaestraStore {
  maestra: MaestraDTO| null;
  listaDeMaestras: MaestraDTO[];
  loading: boolean;

  // setters
  setMaestra: ( maestra: MaestraDTO| null ) => void;

  // adds
  addNewMaestra: ( maestra: MaestraDTO) => void;
  
  // deletes
  removeMaestra: ( maestraId: string ) => void;

  // clears
  clearAll: () => void;
}

export const useMaestraStore = create<MaestraStore>()(
  persist(
    ( set ) => ({
      maestra: null,
      listaDeMaestras: [],
      loading: false,

      // Setters
      setMaestra: ( maestra: MaestraDTO| null ) => set( { maestra } ),
      
      // Clear
      clearAll: () => set({
        maestra: null,
        listaDeMaestras: [],
        loading: false,
      }),
      
      // Add
      addNewMaestra: ( maestra: MaestraDTO) => 
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