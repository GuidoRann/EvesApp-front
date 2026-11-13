import { supabase } from '@/lib/supabaseClient';
import NotaService from '@/services/NotaService';
import type { CreateListadoNotasDTO, CreateNotaDTO } from '@/types/NotaTypes';

export const useManagementNotas = () => {

  const crearNota = async ( nota: CreateNotaDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      const response = await NotaService.crearNota( token, nota );

      return response.body
    } catch ( error ) {
      throw error;
    }
  };

  const crearListaNotas = async ( notas: CreateListadoNotasDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await NotaService.crearListadoNotas( token, notas );
    
    } catch ( error ) {
      throw error;
    }
  }

  const obtenerNotasPorAlumno = async ( alumnoId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await NotaService.obtenerNotasPorAlumno( token, alumnoId );
    
    } catch ( error ) {
      throw error;
    }
  }

  const actualizarNota = async ( notaId: string, nota: CreateNotaDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await NotaService.actualizarNota( token, notaId, nota );
    
    } catch ( error ) {
      throw error;
    }
  }

  const eliminarNota = async ( notaId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await NotaService.eliminarNota( token, notaId );
    
    } catch ( error ) {
      throw error;
    }
  }

  return { 
    crearNota,
    crearListaNotas,
    obtenerNotasPorAlumno,
    actualizarNota,
    eliminarNota
  };
}