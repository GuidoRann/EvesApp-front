import MaestraService from '@/services/MaestraService';
import { useMaestraStore } from '@/stores/Maestra.store';

export const useManagementMaestra = () => {
  const {
     setMaestra, 
    } = useMaestraStore()

    const getOrCreateMaestra = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await MaestraService.obtenerOCrearMaestra( token );
            setMaestra( response.maestra );
        } catch (error) {
            console.log(error);
        }
    }

    const getMaestra = async ( maestraId : string ) => {
        const token = localStorage.getItem('token');

        try {
            const response = await MaestraService.obtenerMaestra( token, maestraId );
            setMaestra( response.maestra );
        } catch (error) {
            console.log(error);
        }
    }

    const getProfile = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await MaestraService.obtenerPerfil( token );
            setMaestra( response.maestra );
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getMaestra,
        getOrCreateMaestra,
        getProfile
    }
}