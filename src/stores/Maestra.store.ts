import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Maestra {
  maestraId: string;
  supabaseUserId: string;
  nombre: string;
  apellido: string;
  email: string;
}

interface MaestraStore {
  maestra: Maestra | null;
  listaDeMaestras: Maestra[];
  loading: boolean;

  // setters
  setMaestra: ( maestra: Maestra ) => void;

  // adds
  addNewMaestra: ( maestra: Maestra ) => void;
  
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
      setMaestra: ( maestra: Maestra ) => set( { maestra } ),
      
      // Add
      addNewMaestra: ( maestra: Maestra ) => 
        set(( state ) => ({ 
          listaDeMaestras: [ ...state.listaDeMaestras, maestra ]
         })),

      // Delete
      removeMaestra: ( maestraId: string ) => 
        set(( state ) => ({ 
          listaDeMaestras: state.listaDeMaestras.filter( maestra => maestra.maestraId !== maestraId )
         })),

      // Clear
      clearMaestra: () => set( { maestra: null } ),
    }),
    { name: "maestraStore" }
  )
);