import { supabase } from '@/lib/supabaseClient';
import AsistenciaService from '@/services/AsistenciaService';
import type { CreateAsistenciaDTO } from '@/types/AsistenciaTypes';

export const useManagementAsistencias = () => {

  const crearAsistencias = async ( asistencia: CreateAsistenciaDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      const response = await AsistenciaService.crearAsistencia( token, asistencia );

      return response.body
    } catch ( error ) {
      throw error;
    }
  };

  const obtenerAsistenciasPorFecha = async ( fecha: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await AsistenciaService.obtenerAsistenciasPorFecha( token, fecha );
    
    } catch ( error ) {
      throw error;
    }
  }

  return { 
    crearAsistencias,
    obtenerAsistenciasPorFecha
  }
};

