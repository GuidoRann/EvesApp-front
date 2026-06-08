import { supabase } from '@/lib/supabaseClient';
import EscuelaService from '@/services/EscuelaService';
import { useEscuelaStore } from '@/stores/Escuela.store';
import type { CreateEscuelaDTO } from '@/types/EscuelaTypes';
import { toast } from 'sonner';

export const useManagementEscuelas = () => {
  const { setEscuela } = useEscuelaStore();

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

      return await EscuelaService.obtenerEscuela( token, escuelaId );
    } catch ( error ) {
      console.log( error );
    }
  };

  const listarEscuelas = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;
      const response = await EscuelaService.listarEscuelas( token );

      return response.body
    } catch ( error ) {
      console.log( error );
    }
  };

  const actualizarEscuela = async ( escuelaId: string, escuela: CreateEscuelaDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;

      if ( !token ) return;

      const response = await EscuelaService.actualizarEscuela( token, escuelaId, escuela );
      setEscuela( response.body );
    } catch ( error ) {
      console.log( error );
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
    }
  };


  return { 
    createEscuela,
    obtenerEscuela,
    listarEscuelas,
    actualizarEscuela,
    eliminarEscuela
  };
}