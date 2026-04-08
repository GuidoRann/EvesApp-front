import { useMaestraStore } from '@/stores/Maestra.store';
import type { Maestra } from '@/types/MaestraTypes';

export const useManagementMaestra = () => {
  const {
     setMaestra, 
     clearMaestra,
    } = useMaestraStore()

    const addMaestra = ( maestra: Maestra ) => setMaestra( maestra )
    const removeMaestra = () => clearMaestra()

    return {
        addMaestra,
        removeMaestra
    }
}