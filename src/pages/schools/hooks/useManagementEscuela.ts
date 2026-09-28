import { supabase } from '@/lib/supabaseClient';
import { useManagementProfile } from '@/pages/profile/hooks/useManagementProfile';
import EscuelaService from '@/services/EscuelaService';
import { useEscuelaStore } from '@/stores/Escuela.store';
import type { CreateEscuelaDTO } from '@/types/EscuelaTypes';

export const useManagementEscuelas = () => {
  const { setEscuela, setListaDeEscuelas } = useEscuelaStore();
  const { fetchProfileInfo } = useManagementProfile();

  const crearEscuela = async ( escuela: CreateEscuelaDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await EscuelaService.crearEscuela( token, escuela );

      return response.body
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  };

  const unirmeAEscuela = async ( escuelaId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      await EscuelaService.unirmeEscuela( token, escuelaId );

      await fetchProfileInfo();

    } catch ( error ) {
      console.log( error );
      throw error;
    }
  };

  const obtenerEscuela = async ( escuelaId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      await EscuelaService.obtenerEscuela( token, escuelaId );


    } catch ( error ) {
      console.log( error );
      throw error;
    }
  };

  const listarEscuelas = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await EscuelaService.listarEscuelas( token );

      setListaDeEscuelas( response.body );
      return response.body
    } catch ( error ) {
      console.log( error );
      throw error;
    }
  };

  const actualizarEscuela = async ( escuelaId: string, escuela: CreateEscuelaDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await EscuelaService.actualizarEscuela( token, escuelaId, escuela );

      if ( response ) {
        setEscuela( response.body );
      };

    } catch ( error ) {
      console.log( error );
      throw error;
    }
  };

  const eliminarEscuela = async ( escuelaId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      await EscuelaService.eliminarEscuela( token, escuelaId );

    } catch ( error ) {
      console.log( error );
      throw error;
    }
  };

  return { 
    unirmeAEscuela,
    crearEscuela,
    obtenerEscuela,
    listarEscuelas,
    actualizarEscuela,
    eliminarEscuela
  };
}
