import { supabase } from '@/lib/supabaseClient';
import MaestraService from '@/services/MaestraService';
import { useMaestraStore } from '@/stores/Maestra.store';
import type { updateMaestraDTO } from '@/types/MaestraTypes';

export const useManagementMaestra = () => {
  const { setMaestra, setListaDeMaestras } = useMaestraStore();

  const obtenerMaestra = async ( maestraId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      return await MaestraService.obtenerMaestra( token, maestraId );
    } catch ( error ) {
      throw error;
    }
  };

  const obtenerListaMaestras = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await MaestraService.listarMaestras( token );

      setListaDeMaestras( response.body );
      return 
    } catch ( error ) {
      throw error;
    }
  };

  const actualizarMaestra = async ( maestraId: string, maestra: updateMaestraDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await MaestraService.actualizarMaestra( token, maestraId, maestra );

      if ( response ) {
        setMaestra( response.body );
      };

      return response.body
    } catch ( error ) {
      throw error;
    }
  };

  const eliminarMaestra = async ( maestraId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      return await MaestraService.eliminarMaestra( token, maestraId );
    } catch ( error ) {
      throw error;
    }
  };

  return {
    obtenerMaestra,
    obtenerListaMaestras,
    actualizarMaestra,
    eliminarMaestra
  };
}