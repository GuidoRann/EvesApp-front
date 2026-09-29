import { supabase } from '@/lib/supabaseClient';
import MaestraService from '@/services/MaestraService';
import { useMaestraStore } from '@/stores/Maestra.store';
import type { MaestraType } from '@/types/MaestraTypes';

export const useManagementProfile = () => {
  const {
      setMaestra, 
    } = useMaestraStore()

  const getOrCreateMaestra = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      await MaestraService.obtenerOCrearMaestra( token );
    } catch (error) {
      throw error;
    }
  };
  
  const fetchProfileInfo = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await MaestraService.obtenerPerfil( token );
      setMaestra( response.body );
    } catch (error) {
      throw error;
    }
  };

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

  const updateMaestra = async ( maestraId: string, maestra: MaestraType ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
  
      if ( !token ) return;
  
      const response =await MaestraService.actualizarMaestra( token, maestraId, maestra );
      setMaestra( response.body );
    } catch ( error ) {
      throw error;
    }
  };

  const eliminarMaestra = async ( maestraId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
  
      if ( !token ) return;
  
      await MaestraService.eliminarMaestra( token, maestraId );
    } catch ( error ) {
      throw error;
    }
  }

  return { 
    getOrCreateMaestra,
    fetchProfileInfo,
    obtenerMaestra,
    updateMaestra,
    eliminarMaestra
  };
}