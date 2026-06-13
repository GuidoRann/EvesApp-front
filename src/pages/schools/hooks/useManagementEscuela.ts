import { supabase } from '@/lib/supabaseClient';
import { useManagementProfile } from '@/pages/profile/hooks/useManagementProfile';
import EscuelaService from '@/services/EscuelaService';
import { useEscuelaStore } from '@/stores/Escuela.store';
import type { CreateEscuelaDTO } from '@/types/EscuelaTypes';
import { toast } from 'sonner';

export const useManagementEscuelas = () => {
  const { setEscuela } = useEscuelaStore();
  const { fetchProfileInfo } = useManagementProfile();

  const createEscuela = async ( escuela: CreateEscuelaDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;
      
      const response = await EscuelaService.crearEscuela( token, escuela );

      if ( response ) {
        setEscuela( response.body );

        toast.success( 'Escuela creada exitosamente' );
      };
      
    } catch ( error ) {
      console.log( error );
      toast.error( 'Error al crear la escuela' );
    }
  };

  const obtenerEscuela = async ( escuelaId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await EscuelaService.obtenerEscuela( token, escuelaId );

      if ( response ) {
        toast.success( 'Escuela obtenida exitosamente' );
      };

    } catch ( error ) {
      console.log( error );
      toast.error( 'Error al obtener la escuela' );
    }
  };

  const unirmeAEscuela = async ( escuelaId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await EscuelaService.unirmeEscuela( token, escuelaId );

      if ( response ) {
        toast.success( 'Te has unido a la escuela exitosamente' );
      };

      await fetchProfileInfo();

    } catch ( error ) {
      console.log( error );
      toast.error( 'Error al unirme a la escuela' );
    }
  };

  const listarEscuelas = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await EscuelaService.listarEscuelas( token );

      if ( response ) {
        toast.success( 'Escuelas obtenidas exitosamente' );
      };

      return response.body
    } catch ( error ) {
      console.log( error );
      toast.error( 'Error al listar las escuelas' );
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
        toast.success( 'Escuela actualizada exitosamente' );
      };

    } catch ( error ) {
      console.log( error );
      toast.error( 'Error al actualizar la escuela' );
    }
  };

  const eliminarEscuela = async ( escuelaId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await EscuelaService.eliminarEscuela( token, escuelaId );

      if ( response ) {
        toast.success( 'Escuela eliminada exitosamente' );
      };

    } catch ( error ) {
      console.log( error );
      toast.error( 'Error al eliminar la escuela' );
    }
  };


  return { 
    unirmeAEscuela,
    createEscuela,
    obtenerEscuela,
    listarEscuelas,
    actualizarEscuela,
    eliminarEscuela
  };
}
